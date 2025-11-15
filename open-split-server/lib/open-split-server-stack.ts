import * as api from "aws-cdk-lib/aws-apigateway";
import * as ddb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib/core";
import * as path from "path";
import { Construct } from "constructs";

export class OpenSplitServerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.exportDeploymentEnv(props!);

    const table = this.createDdbTable();

    const restFunction = this.createLambdaFunctionRest(table);
    this.createApiRest(restFunction);
  }

  /**
   * Creates the DynamoDB table used to store book records keyed by ISBN.
   */
  private createDdbTable(): ddb.Table {
    return new ddb.Table(this, "ddb-table", {
      tableName: `${this.stackName}-splits`,
      partitionKey: {
        name: "split_id",
        type: ddb.AttributeType.STRING,
      },
    });
  }
  /**
   * Provisions the Lambda function that backs the REST API endpoints.
   *
   * The function is configured with access to the DynamoDB table so it can
   * read book data.
   */
  private createLambdaFunctionRest(table: ddb.Table): lambda.Function {
    const lambdaCodePath = path.join(__dirname, "..", "lambda");
    
    const func = new lambda.Function(this, "create-split", {
      functionName: `${this.stackName}-create-split`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "create-split/handler.handle", 
      code: lambda.Code.fromAsset(lambdaCodePath),
      environment: { TABLE_NAME: table.tableName },
    });
  
    table.grantReadData(func);
    return func;
  }
       

  /**
   * Builds the API Gateway REST API and wires it to the provided Lambda
   * handler, exposing both the create-split POST and split lookup GET endpoints.
   */
  private createApiRest(apiFunction: lambda.Function) {
    const rest = new api.LambdaRestApi(this, "rest-api", {
      restApiName: `${this.stackName}-APIs`,
      handler: apiFunction,
      proxy: false,
      // todo : enable logging later with correct role permissions
      // deployOptions: {
      //   loggingLevel: api.MethodLoggingLevel.INFO,
      // },
    });

    const apiResource = rest.root.addResource("api");
    const v1Resource = apiResource.addResource("v1");

    const createSplit = v1Resource.addResource("create-split");
    const splitResource = v1Resource.addResource("splits").addResource("{splitId}");

    createSplit.addMethod("POST");
    splitResource.addMethod("GET");
    splitResource.addMethod("PUT");

    const createSplitUrl = rest.urlForPath(createSplit.path);
    const splitUrl = rest.urlForPath(splitResource.path);

    new cdk.CfnOutput(this, "create-split-endpoint", {
      value: createSplitUrl,
      exportName: "CreateSplitEndpoint",
    });

    new cdk.CfnOutput(this, "get-split-endpoint", {
      value: splitUrl,
      exportName: "GetSplitEndpoint",
    });

    new cdk.CfnOutput(this, "update-split-endpoint", {
      value: splitUrl,
      exportName: "UpdateSplitEndpoint",
    });

    return rest;
  }

  /**
   * Exports the deployment account and region so other stacks can import them.
   */
  private exportDeploymentEnv(props: cdk.StackProps) {
    new cdk.CfnOutput(this, "deployment-account", {
      value: props.env?.account!,
      exportName: "DeploymentAccount",
    });

    new cdk.CfnOutput(this, "deployment-region", {
      value: props.env?.region!,
      exportName: "DeploymentRegion",
    });
  }
}
