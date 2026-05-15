"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NessusApi = void 0;
class NessusApi {
    constructor() {
        this.name = 'nessusApi';
        this.displayName = 'Nessus API';
        this.icon = { light: 'file:icon.svg', dark: 'file:icon.dark.svg' };
        this.documentationUrl = 'https://docs.tenable.com/nessus/Content/GettingStarted.htm';
        this.properties = [
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
}
exports.NessusApi = NessusApi;
