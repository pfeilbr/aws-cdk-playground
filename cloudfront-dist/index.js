"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudfront = require("@aws-cdk/aws-cloudfront");
const s3 = require("@aws-cdk/aws-s3");
const cdk = require("@aws-cdk/cdk");
class MyStack extends cdk.Stack {
    constructor(parent, name, props) {
        super(parent, name, props);
        const hostBucket = new s3.Bucket(this, 'HostBucket');
        new cloudfront.CloudFrontWebDistribution(this, 'HostDistro', {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: hostBucket
                    },
                    behaviors: [
                        { isDefaultBehavior: true }
                    ]
                }
            ]
        });
    }
}
class MyApp extends cdk.App {
    constructor(argv) {
        super(argv);
        new MyStack(this, 'SlinkDev');
    }
}
process.stdout.write(new MyApp(process.argv).run());
