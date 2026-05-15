import {
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class NessusApi implements ICredentialType {
    name = 'nessusApi';
    displayName = 'Nessus API';
    documentationUrl = 'https://docs.tenable.com/nessus/Content/GettingStarted.htm';
    properties: INodeProperties[] = [
        {
            displayName: 'Nessus URL',
            name: 'url',
            type: 'string',
            default: '',
            placeholder: 'https://<your-nessus-server>:8834',
            required: true,
        },
        {
            displayName: 'API Token',
            name: 'apiToken',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
        },
        {
            displayName: 'Access Key',
            name: 'accessKey',
            type: 'string',
            default: '',
            required: true,
        },
        {
            displayName: 'Secret Key',
            name: 'secretKey',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
        },
    ];
}