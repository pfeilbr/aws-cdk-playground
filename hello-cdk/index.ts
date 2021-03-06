import cdk = require('@aws-cdk/cdk');
import s3 = require('@aws-cdk/aws-s3');

class MyStack extends cdk.Stack {
    constructor(parent: cdk.App, id: string, props?: cdk.StackProps) {
        super(parent, id, props);

        new s3.Bucket(this, 'MyFirstBucket', {
            versioned: true
        });        
    }
}

class MyApp extends cdk.App {
    constructor(argv: string[]) {
        super(argv);

        new MyStack(this, 'hello-cdk');
    }
}

process.stdout.write(new MyApp(process.argv).run());