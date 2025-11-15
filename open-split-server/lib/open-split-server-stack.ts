import * as api from "aws-cdk-lib/aws-apigateway";
import * as ddb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

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
      tableName: `${this.stackName}-ddb-table`,
      partitionKey: {
        name: "isbn",
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
    const path = "codes/lambda/rest-function/src";

    const func = new lambda.Function(this, "rest-function", {
      functionName: `${this.stackName}-rest-function`,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: "handler.handle",
      code: lambda.Code.fromAsset(path),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    table.grantReadData(func);

    return func;
  }

  /**
   * Builds the API Gateway REST API and wires it to the provided Lambda
   * handler, exposing the `books` resource with a GET method.
   */
  private createApiRest(apiFunction: lambda.Function) {
    const rest = new api.LambdaRestApi(this, "rest-api", {
      restApiName: `${this.stackName}-APIs`,
      handler: apiFunction,
      proxy: false,
      deployOptions: {
        loggingLevel: api.MethodLoggingLevel.INFO,
      },
    });

    const resourceName = "books";
    const books = rest.root.addResource(resourceName);
    books.addMethod("GET");

    new cdk.CfnOutput(this, "api-endpoint", {
      value: `https://${rest.restApiId}.execute-api.${this.region}.amazonaws.com/prod/${resourceName}`,
      exportName: "APIGatewayEndpoint",
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
