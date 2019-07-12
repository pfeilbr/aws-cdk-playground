import cdk = require("@aws-cdk/core");
import glue = require("@aws-cdk/aws-glue");

export class GlueStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
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
