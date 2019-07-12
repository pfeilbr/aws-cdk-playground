"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const kinesis = require("@aws-cdk/aws-kinesis");
const aws_lambda_event_sources_1 = require("@aws-cdk/aws-lambda-event-sources");
class ApigLambdaKinesisLambdaStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const stream = new kinesis.Stream(this, "MySteam");
        const apilambdaFn = new lambda.Function(this, "APIHandler", {
            code: new lambda.AssetCode("lambdas"),
            handler: "api.handler",
            timeout: cdk.Duration.seconds(5),
            runtime: lambda.Runtime.NODEJS_10_X,
            environment: {
                STREAM_NAME: stream.streamName
            }
        });
        stream.grantWrite(apilambdaFn);
        const streamlambdaFn = new lambda.Function(this, "StreamHandler", {
            code: new lambda.AssetCode("lambdas"),
            handler: "stream.handler",
            timeout: cdk.Duration.seconds(5),
            runtime: lambda.Runtime.NODEJS_10_X
        });
        streamlambdaFn.addEventSource(new aws_lambda_event_sources_1.KinesisEventSource(stream, {
            batchSize: 1,
            startingPosition: lambda.StartingPosition.LATEST
        }));
        const api = new apigateway.RestApi(this, "service01", {
            restApiName: "service01"
        });
        const items = api.root.addResource("service01");
        // const getAllIntegration = new apigateway.LambdaIntegration(getAllLambda);
        // items.addMethod('GET', getAllIntegration);
        const apilambdaFnIntegration = new apigateway.LambdaIntegration(apilambdaFn);
        items.addMethod("POST", apilambdaFnIntegration);
        //addCorsOptions(items);
    }
}
exports.ApigLambdaKinesisLambdaStack = ApigLambdaKinesisLambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpZy1sYW1iZGEta2luZXNpcy1sYW1iZGEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGlnLWxhbWJkYS1raW5lc2lzLWxhbWJkYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFzQztBQUN0QyxzREFBdUQ7QUFDdkQsOENBQStDO0FBQy9DLGdEQUFpRDtBQUNqRCxnRkFBdUU7QUFHdkUsTUFBYSw0QkFBNkIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN6RCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbkQsTUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDMUQsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDckMsT0FBTyxFQUFFLGFBQWE7WUFDdEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLFdBQVcsRUFBRTtnQkFDWCxXQUFXLEVBQUUsTUFBTSxDQUFDLFVBQVU7YUFDL0I7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ2hFLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1NBQ3BDLENBQUMsQ0FBQztRQUVILGNBQWMsQ0FBQyxjQUFjLENBQzNCLElBQUksNkNBQWtCLENBQUMsTUFBTSxFQUFFO1lBQzdCLFNBQVMsRUFBRSxDQUFDO1lBQ1osZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU07U0FDakQsQ0FBQyxDQUNILENBQUM7UUFFRixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNwRCxXQUFXLEVBQUUsV0FBVztTQUN6QixDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRCw0RUFBNEU7UUFDNUUsNkNBQTZDO1FBRTdDLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQzdELFdBQVcsQ0FDWixDQUFDO1FBQ0YsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUNoRCx3QkFBd0I7SUFDMUIsQ0FBQztDQUNGO0FBOUNELG9FQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjZGsgPSByZXF1aXJlKFwiQGF3cy1jZGsvY29yZVwiKTtcbmltcG9ydCBhcGlnYXRld2F5ID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1hcGlnYXRld2F5XCIpO1xuaW1wb3J0IGxhbWJkYSA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtbGFtYmRhXCIpO1xuaW1wb3J0IGtpbmVzaXMgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLWtpbmVzaXNcIik7XG5pbXBvcnQgeyBLaW5lc2lzRXZlbnRTb3VyY2UgfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYS1ldmVudC1zb3VyY2VzXCI7XG5pbXBvcnQgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5cbmV4cG9ydCBjbGFzcyBBcGlnTGFtYmRhS2luZXNpc0xhbWJkYVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBraW5lc2lzLlN0cmVhbSh0aGlzLCBcIk15U3RlYW1cIik7XG5cbiAgICBjb25zdCBhcGlsYW1iZGFGbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJBUElIYW5kbGVyXCIsIHtcbiAgICAgIGNvZGU6IG5ldyBsYW1iZGEuQXNzZXRDb2RlKFwibGFtYmRhc1wiKSxcbiAgICAgIGhhbmRsZXI6IFwiYXBpLmhhbmRsZXJcIixcbiAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDUpLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBTVFJFQU1fTkFNRTogc3RyZWFtLnN0cmVhbU5hbWVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0cmVhbS5ncmFudFdyaXRlKGFwaWxhbWJkYUZuKTtcblxuICAgIGNvbnN0IHN0cmVhbWxhbWJkYUZuID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIlN0cmVhbUhhbmRsZXJcIiwge1xuICAgICAgY29kZTogbmV3IGxhbWJkYS5Bc3NldENvZGUoXCJsYW1iZGFzXCIpLFxuICAgICAgaGFuZGxlcjogXCJzdHJlYW0uaGFuZGxlclwiLFxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoNSksXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTBfWFxuICAgIH0pO1xuXG4gICAgc3RyZWFtbGFtYmRhRm4uYWRkRXZlbnRTb3VyY2UoXG4gICAgICBuZXcgS2luZXNpc0V2ZW50U291cmNlKHN0cmVhbSwge1xuICAgICAgICBiYXRjaFNpemU6IDEsIC8vIGRlZmF1bHRcbiAgICAgICAgc3RhcnRpbmdQb3NpdGlvbjogbGFtYmRhLlN0YXJ0aW5nUG9zaXRpb24uTEFURVNUXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBhcGkgPSBuZXcgYXBpZ2F0ZXdheS5SZXN0QXBpKHRoaXMsIFwic2VydmljZTAxXCIsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiBcInNlcnZpY2UwMVwiXG4gICAgfSk7XG5cbiAgICBjb25zdCBpdGVtcyA9IGFwaS5yb290LmFkZFJlc291cmNlKFwic2VydmljZTAxXCIpO1xuICAgIC8vIGNvbnN0IGdldEFsbEludGVncmF0aW9uID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24oZ2V0QWxsTGFtYmRhKTtcbiAgICAvLyBpdGVtcy5hZGRNZXRob2QoJ0dFVCcsIGdldEFsbEludGVncmF0aW9uKTtcblxuICAgIGNvbnN0IGFwaWxhbWJkYUZuSW50ZWdyYXRpb24gPSBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihcbiAgICAgIGFwaWxhbWJkYUZuXG4gICAgKTtcbiAgICBpdGVtcy5hZGRNZXRob2QoXCJQT1NUXCIsIGFwaWxhbWJkYUZuSW50ZWdyYXRpb24pO1xuICAgIC8vYWRkQ29yc09wdGlvbnMoaXRlbXMpO1xuICB9XG59XG4iXX0=