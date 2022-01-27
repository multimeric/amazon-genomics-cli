import { InstanceType } from "aws-"
import { ComputeResourceType } from "monocdk/aws-batch";

// https://github.com/aws-samples/aws-genomics-workflows/blob/master/src/templates/gwfcore/gwfcore-batch.template.yaml#L145-L180
// batch 'optimal' isn't optimal for genomics computation, these types have been tuned over several customer engagements
export const optimalInstanceTypes: { [key in ComputeResourceType]: string[] } = {
  [ComputeResourceType.ON_DEMAND]: [
    "c5.large",
    "c5.xlarge",
    "c5.2xlarge",
    "c5.4xlarge",
    "c5a.large",
    "c5a.xlarge",
    "c5a.2xlarge",
    "c5a.4xlarge",
    "c5n.large",
    "c5n.xlarge",
    "c5n.2xlarge",
    "c5n.4xlarge",
    "m5.large",
    "m5.xlarge",
    "m5.2xlarge",
    "m5.4xlarge",
    "m5a.large",
    "m5a.xlarge",
    "m5a.2xlarge",
    "m5a.4xlarge",
    "m5n.large",
    "m5n.xlarge",
    "m5n.2xlarge",
    "m5n.4xlarge",
    "r5.large",
    "r5.xlarge",
    "r5.2xlarge",
    "r5.4xlarge",
    "r5a.large",
    "r5a.xlarge",
    "r5a.2xlarge",
    "r5a.4xlarge",
    "r5n.large",
    "r5n.xlarge",
    "r5n.2xlarge",
    "r5n.4xlarge",
  ],
  [ComputeResourceType.SPOT]: [
    "c4.large",
    "c4.xlarge",
    "c4.2xlarge",
    "c4.4xlarge",
    "c5a.large",
    "c5a.xlarge",
    "c5a.2xlarge",
    "c5a.4xlarge",
    "c5.large",
    "c5.xlarge",
    "c5.2xlarge",
    "c5.4xlarge",
    "c5n.large",
    "c5n.xlarge",
    "c5n.2xlarge",
    "c5n.4xlarge",
    "m4.large",
    "m4.xlarge",
    "m4.2xlarge",
    "m4.4xlarge",
    "m5.large",
    "m5.xlarge",
    "m5.2xlarge",
    "m5.4xlarge",
    "m5a.large",
    "m5a.xlarge",
    "m5a.2xlarge",
    "m5a.4xlarge",
    "m5n.large",
    "m5n.xlarge",
    "m5n.2xlarge",
    "m5n.4xlarge",
    "r4.large",
    "r4.xlarge",
    "r4.2xlarge",
    "r4.4xlarge",
    "r5.large",
    "r5.xlarge",
    "r5.2xlarge",
    "r5.4xlarge",
    "r5a.large",
    "r5a.xlarge",
    "r5a.2xlarge",
    "r5a.4xlarge",
    "r5n.large",
    "r5n.xlarge",
    "r5n.2xlarge",
    "r5n.4xlarge",
  ],
  // TODO: Determine optimal instances for fargate when it's supported
  [ComputeResourceType.FARGATE]: [],
  [ComputeResourceType.FARGATE_SPOT]: [],
};

// These need to be manually updated as regions release new instance types
const unLaunchedInstanceTypesByRegion: { [key in string]: { [key in string]: boolean } } = {
  "us-west-1": { "m5n.large": true, "m5n.xlarge": true, "m5n.2xlarge": true, "m5n.4xlarge": true },
  "ap-south-1": { "m5n.large": true, "m5n.xlarge": true, "m5n.2xlarge": true, "m5n.4xlarge": true },
  "ap-northeast-2": { "m5n.large": true, "m5n.xlarge": true, "m5n.2xlarge": true, "m5n.4xlarge": true },
  "ap-northeast-3": {
    "m5n.xlarge": true,
    "r5n.2xlarge": true,
    "m5n.2xlarge": true,
    "r5n.large": true,
    "m5n.4xlarge": true,
    "r5n.4xlarge": true,
    "m5n.large": true,
    "c5n.large": true,
    "c5n.4xlarge": true,
    "c5n.2xlarge": true,
    "c5n.xlarge": true,
    "r5n.xlarge": true,
    "c5a.large": true,
    "c5a.xlarge": true,
    "c5a.2xlarge": true,
    "c5a.4xlarge": true,
    "m5a.large": true,
    "m5a.xlarge": true,
    "m5a.2xlarge": true,
    "m5a.4xlarge": true,
    "r5a.large": true,
    "r5a.xlarge": true,
    "r5a.2xlarge": true,
    "r5a.4xlarge": true,
  },
  "ap-southeast-2": { "m5n.large": true, "m5n.xlarge": true, "m5n.2xlarge": true, "m5n.4xlarge": true },
  "ca-central-1": { "m5n.large": true, "m5n.xlarge": true, "m5n.2xlarge": true, "m5n.4xlarge": true },
  "eu-west-2": { "m5n.large": true, "m5n.xlarge": true, "m5n.2xlarge": true, "m5n.4xlarge": true },
  "eu-west-3": {
    "c4.large": true,
    "c4.xlarge": true,
    "c4.2xlarge": true,
    "c4.4xlarge": true,
    "m4.large": true,
    "m4.xlarge": true,
    "m4.2xlarge": true,
    "m4.4xlarge": true,
    "m5n.large": true,
    "m5n.xlarge": true,
    "m5n.2xlarge": true,
    "m5n.4xlarge": true,
  },
  "eu-north-1": {
    "c4.large": true,
    "c4.xlarge": true,
    "c4.2xlarge": true,
    "c4.4xlarge": true,
    "m4.large": true,
    "m4.xlarge": true,
    "m4.2xlarge": true,
    "m4.4xlarge": true,
    "m5n.large": true,
    "m5n.xlarge": true,
    "m5n.2xlarge": true,
    "m5n.4xlarge": true,
    "r4.large": true,
    "r4.xlarge": true,
    "r4.2xlarge": true,
    "r4.4xlarge": true,
    "m5a.large": true,
    "m5a.xlarge": true,
    "m5a.2xlarge": true,
    "m5a.4xlarge": true,
    "r5a.large": true,
    "r5a.xlarge": true,
    "r5a.2xlarge": true,
    "r5a.4xlarge": true,
  },
  "sa-east-1": { "m5n.large": true, "m5n.xlarge": true, "m5n.2xlarge": true, "m5n.4xlarge": true },
};

export const getInstanceTypesForBatch = (instanceTypes: InstanceType[] | undefined, computeType: ComputeResourceType, region?: string): InstanceType[] => {
  if (instanceTypes && instanceTypes.length > 0) {
    return instanceTypes;
  }

  return optimalInstanceTypes[computeType]
    .filter((instanceType) => isInstanceTypeSupported(instanceType, region))
    .map((instanceType) => new InstanceType(instanceType.trim()));
};

const isInstanceTypeSupported = (instanceType: string, region?: string): boolean => {
  if (region !== undefined && unLaunchedInstanceTypesByRegion[region] !== undefined && unLaunchedInstanceTypesByRegion[region][instanceType]) {
    return false;
  }
  return true;
};
