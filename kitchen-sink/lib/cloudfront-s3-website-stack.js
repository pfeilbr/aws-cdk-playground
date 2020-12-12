const cdk = require("@aws-cdk/core");
const cloudfront = require("@aws-cdk/aws-cloudfront");
const origins = require("@aws-cdk/aws-cloudfront-origins");
const s3 = require("@aws-cdk/aws-s3");
const s3deploy = require("@aws-cdk/aws-s3-deployment");
const path = require("path");

class CloudFrontS3WebsiteCdkStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      versioned: true,
    });

    // create a CDN to deploy your website

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
      },
      defaultRootObject: "index.html",
    });

    // Prints out the web endpoint to the terminal

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.domainName,
    });

    new cdk.CfnOutput(this, "DistributionURL", {
      value: `https://${distribution.domainName}`,
    });

    // housekeeping for uploading the data in bucket

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [
        s3deploy.Source.asset(
          path.join(__dirname, "../assets/cloudfront-s3-website")
        ),
      ],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}

module.exports = { CloudFrontS3WebsiteCdkStack };
