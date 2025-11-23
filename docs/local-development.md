# Local Development

This project uses AWS SAM (Serverless Application Model) to run the backend locally.

## Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/) installed and configured.
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) installed.
- [Docker](https://www.docker.com/) installed and running.

## Running the API Locally

1.  **Build the project:**
    ```bash
    npm run build
    ```

2.  **Synthesize the CloudFormation template:**
    ```bash
    npm run synth
    ```
    This generates a `template.yaml` file in the root of the `open-split-server` directory.

3.  **Start the local API:**
    ```bash
    npm run local:api
    ```
    The API will be available at `http://127.0.0.1:3000`.

## Testing Endpoints

You can test the endpoints using `curl` or any API client.

**Create Split:**
```bash
curl -X POST http://127.0.0.1:3000/api/v1/create-split
```

**Get Split:**
```bash
curl http://127.0.0.1:3000/api/v1/splits/123
```
