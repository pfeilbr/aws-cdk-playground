const cdk = require("@aws-cdk/core");

const {
  CloudFrontToS3,
} = require("@aws-solutions-constructs/aws-cloudfront-s3");

class AwsCloudfrontS3Stack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new CloudFrontToS3(this, "test-cloudfront-s3", {});
  }
}

module.exports = { AwsCloudfrontS3Stack };
