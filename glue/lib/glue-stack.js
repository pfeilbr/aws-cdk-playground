"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const glue = require("@aws-cdk/aws-glue");
class GlueStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const stack = this;
        const database = new glue.Database(stack, "MyDatabase", {
            databaseName: "my_database"
        });
        const ordinaryTable = new glue.Table(stack, "MyTable", {
            database,
            tableName: "my_table",
            columns: [
                {
                    name: "col1",
                    type: glue.Schema.STRING
                },
                {
                    name: "col2",
                    type: glue.Schema.STRING,
                    comment: "col2 comment"
                },
                {
                    name: "col3",
                    type: glue.Schema.array(glue.Schema.STRING)
                },
                {
                    name: "col4",
                    type: glue.Schema.map(glue.Schema.STRING, glue.Schema.STRING)
                },
                {
                    name: "col5",
                    type: glue.Schema.struct([
                        {
                            name: "col1",
                            type: glue.Schema.STRING
                        }
                    ])
                }
            ],
            partitionKeys: [
                {
                    name: "year",
                    type: glue.Schema.SMALL_INT
                }
            ],
            dataFormat: glue.DataFormat.Json
        });
    }
}
exports.GlueStack = GlueStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2x1ZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdsdWUtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBc0M7QUFDdEMsMENBQTJDO0FBRTNDLE1BQWEsU0FBVSxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3RDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRW5CLE1BQU0sUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFO1lBQ3RELFlBQVksRUFBRSxhQUFhO1NBQzVCLENBQUMsQ0FBQztRQUVILE1BQU0sYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQ3JELFFBQVE7WUFDUixTQUFTLEVBQUUsVUFBVTtZQUNyQixPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtpQkFDekI7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtvQkFDeEIsT0FBTyxFQUFFLGNBQWM7aUJBQ3hCO2dCQUNEO29CQUNFLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDNUM7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2lCQUM5RDtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQ3ZCOzRCQUNFLElBQUksRUFBRSxNQUFNOzRCQUNaLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07eUJBQ3pCO3FCQUNGLENBQUM7aUJBQ0g7YUFDRjtZQUNELGFBQWEsRUFBRTtnQkFDYjtvQkFDRSxJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO2lCQUM1QjthQUNGO1lBQ0QsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSTtTQUNqQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFsREQsOEJBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNkayA9IHJlcXVpcmUoXCJAYXdzLWNkay9jb3JlXCIpO1xuaW1wb3J0IGdsdWUgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLWdsdWVcIik7XG5cbmV4cG9ydCBjbGFzcyBHbHVlU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3Qgc3RhY2sgPSB0aGlzO1xuXG4gICAgY29uc3QgZGF0YWJhc2UgPSBuZXcgZ2x1ZS5EYXRhYmFzZShzdGFjaywgXCJNeURhdGFiYXNlXCIsIHtcbiAgICAgIGRhdGFiYXNlTmFtZTogXCJteV9kYXRhYmFzZVwiXG4gICAgfSk7XG5cbiAgICBjb25zdCBvcmRpbmFyeVRhYmxlID0gbmV3IGdsdWUuVGFibGUoc3RhY2ssIFwiTXlUYWJsZVwiLCB7XG4gICAgICBkYXRhYmFzZSxcbiAgICAgIHRhYmxlTmFtZTogXCJteV90YWJsZVwiLFxuICAgICAgY29sdW1uczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJjb2wxXCIsXG4gICAgICAgICAgdHlwZTogZ2x1ZS5TY2hlbWEuU1RSSU5HXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImNvbDJcIixcbiAgICAgICAgICB0eXBlOiBnbHVlLlNjaGVtYS5TVFJJTkcsXG4gICAgICAgICAgY29tbWVudDogXCJjb2wyIGNvbW1lbnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJjb2wzXCIsXG4gICAgICAgICAgdHlwZTogZ2x1ZS5TY2hlbWEuYXJyYXkoZ2x1ZS5TY2hlbWEuU1RSSU5HKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJjb2w0XCIsXG4gICAgICAgICAgdHlwZTogZ2x1ZS5TY2hlbWEubWFwKGdsdWUuU2NoZW1hLlNUUklORywgZ2x1ZS5TY2hlbWEuU1RSSU5HKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJjb2w1XCIsXG4gICAgICAgICAgdHlwZTogZ2x1ZS5TY2hlbWEuc3RydWN0KFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJjb2wxXCIsXG4gICAgICAgICAgICAgIHR5cGU6IGdsdWUuU2NoZW1hLlNUUklOR1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF0pXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBwYXJ0aXRpb25LZXlzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcInllYXJcIixcbiAgICAgICAgICB0eXBlOiBnbHVlLlNjaGVtYS5TTUFMTF9JTlRcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGRhdGFGb3JtYXQ6IGdsdWUuRGF0YUZvcm1hdC5Kc29uXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==