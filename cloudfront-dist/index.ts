import cloudfront = require('@aws-cdk/aws-cloudfront');
import s3 = require('@aws-cdk/aws-s3');
import cdk = require('@aws-cdk/cdk');

class MyStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
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
    constructor(argv?: string[]) {
        super(argv);
        new MyStack(this, 'SlinkDev');
    }
}

process.stdout.write(new MyApp(process.argv).run());