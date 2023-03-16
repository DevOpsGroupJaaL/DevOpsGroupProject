import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

// Set the AWS Region.
const REGION = "eu-central-1";
const creds = {
    accessKeyId: "ASIA3LKH3GFGOKGDZMNJ",
    secretAccessKey: "qvKMbXHBrWJacVlLVqxlwdv/LlnVhhBPQ8pOIgi9",
    sessionToken: "IQoJb3JpZ2luX2VjEFEaDGV1LWNlbnRyYWwtMSJHMEUCICta5S9CdsSqeTQQGYhgolS/7jJGXILsfPu9T8+wueDqAiEA7tN0woIWyj1TgyrFbnIsquGjxUqNQ6GS8p7vRVRGNqQq9wIIGhAAGgw3ODAyMjQxMTUwMjAiDNXteZgP6mVaAe8qxyrUAs7STRxaTmCpvrz44WxtTylRz9I4BGBrf3+TvandUti5NaMC3N9QQXfr6Fy+4fzfpsBhQf5aJg0sz1aFb7fftr2PKIBJuhmEcW2yCu38Cl0+2e9Y+ep9cvxenfrx1lvvMML1gTnyzaMVsOaLH4aitC3J5ddriSX3lix7+Ytgeufogr44s5clrT3UKzuTMSYGHcafIFck9UhOO7ZozeNoxXYdbKCkByaKysa61RwgVjwgu9AcWagAbMHSwYQvpHNyZ60qlPUirzqKoGB5IuM3gYXdbmEoIFNCdrmTwUUu4NnP4v75kEOoE+0X7kcurdyqI2POpVGacsgDZgyxc6fOY1D1OVNzo2+cKEJkIKrrmvNdK8OTfhkMfaDDULzbeoh9UW1W/nHge4rKm+fHaqHYbOcZGWtmN5HytZ1PsCB9FdzUwDWR72y2y6aRlnxdcyko/I8ELdcw9JnNoAY6pwFbJ+ik7cBvkn/tJ/nvXlzJiGQl3oDe2xBMBUyoHBIReKjyV/dXTMRFfnmATA4iHW7er7OJ2iPugqB7GeTnxPmVuWaHgVN7J5T1K8skNJZbKeXsYb2BEvQyqLr2aWBiUaTCij7YzUWGfs+/MC/lHtsK2VK496/DQWFa0DRxPZnV0qeUixeC633QP9nV08CjLwnXd8OvqiBF22vBPFXAlR6HpYRtJsxc2A=="
};
    // Create an Amazon S3 service client object.
const cognitoClient = new CognitoIdentityProviderClient({ region: REGION , credentials: creds});


export { cognitoClient };

