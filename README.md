# n8n-nodes-nessus-scan

This is a custom n8n node for interacting with the Nessus API. It allows you to:

1. **Create Scan**: Create a new vulnerability scan for a specific IP address.
2. **Get Scan Status**: Retrieve the status of an existing scan.

## Installation

1. Place the `n8n-nodes-nessus-scan` folder in your n8n custom nodes directory.
2. Restart your n8n instance.

## Credentials

This node requires the following credentials:

- **Nessus URL**: The base URL of your Nessus server (e.g., `https://<your-nessus-server>:8834`).
- **API Token**: Your Nessus API token.
- **Access Key**: Your Nessus access key.
- **Secret Key**: Your Nessus secret key.

## Operations

### Create Scan

- **IP Address**: The target IP address for the scan.
- **Template ID**: The UUID of the scan template.
- **Folder ID**: The folder ID where the scan will be saved.

### Get Scan Status

- **Scan ID**: The ID of the scan to retrieve the status for.

## Example Usage

1. Add the Nessus node to your workflow.
2. Select the operation (e.g., `Create Scan` or `Get Scan Status`).
3. Provide the required parameters.
4. Execute the workflow.

## Notes

- Ensure your Nessus server is accessible from the n8n instance.
- Handle sensitive credentials securely.

## License

MIT