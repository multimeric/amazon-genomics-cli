import { Construct } from "constructs";
import { JobDefinition, PlatformCapabilities } from "@aws-cdk/aws-batch-alpha";
import { createEcrImage } from "../../../util";
import { EngineJobDefinition } from "../engine-job-definition";
import { Engine, EngineProps } from "../engine";
import { Batch } from "../../batch";
import { FargatePlatformVersion } from "aws-cdk-lib/aws-ecs";

export interface SnakemakeEngineProps extends EngineProps {
  readonly engineBatch: Batch;
  readonly workerBatch: Batch;
}

const SNAKEMAKE_IMAGE_DESIGNATION = "snakemake";

export class SnakemakeEngine extends Engine {
  readonly headJobDefinition: JobDefinition;
  private readonly volumeName = "efs";
  private readonly engineMemoryMiB = 4096;

  constructor(scope: Construct, id: string, props: SnakemakeEngineProps) {
    super(scope, id);

    const { vpc, engineBatch, workerBatch } = props;
    const fileSystem = this.createFileSystem(vpc);
    const accessPoint = this.createAccessPoint(fileSystem);

    fileSystem.connections.allowDefaultPortFromAnyIpv4();
    fileSystem.grant(engineBatch.role, "elasticfilesystem:DescribeMountTargets", "elasticfilesystem:DescribeFileSystems");
    fileSystem.grant(workerBatch.role, "elasticfilesystem:DescribeMountTargets", "elasticfilesystem:DescribeFileSystems");
    this.headJobDefinition = new EngineJobDefinition(this, "SnakemakeHeadJobDef", {
      logGroup: this.logGroup,
      platformCapabilities: [PlatformCapabilities.FARGATE],
      container: {
        memoryLimitMiB: this.engineMemoryMiB,
        jobRole: engineBatch.role,
        executionRole: engineBatch.role,
        image: createEcrImage(this, SNAKEMAKE_IMAGE_DESIGNATION),
        platformVersion: FargatePlatformVersion.VERSION1_4,
        command: [],
        environment: {
          SM__AWS__FS: fileSystem.fileSystemId,
          SM__AWS__FSAP: accessPoint.accessPointId,
          SM__AWS__TASK_QUEUE: workerBatch.jobQueue.jobQueueArn,
        },
        volumes: [this.toVolume(fileSystem, accessPoint, this.volumeName)],
        mountPoints: [this.toMountPoint("/mnt/efs", this.volumeName)],
      },
    });
  }
}
