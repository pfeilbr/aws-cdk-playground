const { expect, matchTemplate, MatchStyle } = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const KitchenSinkCdk = require("../lib/kitchen-sink-stack");

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new KitchenSinkCdk.KitchenSinkCdkStack(app, "MyTestStack");
  // THEN
  expect(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.NO_REPLACES
    )
  );
});
