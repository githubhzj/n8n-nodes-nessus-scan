"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nessus = void 0;
const axios_1 = __importDefault(require("axios"));
const https = __importStar(require("https"));
class Nessus {
    constructor() {
        this.description = {
            displayName: 'Nessus',
            name: 'nessus',
            icon: 'file:icon.svg',
            group: ['transform'],
            version: 1,
            description: 'Interact with Nessus API',
            defaults: {
                name: 'Nessus',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'nessusApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    options: [
                        {
                            name: 'Create Scan',
                            value: 'createScan',
                        },
                        {
                            name: 'Get Scan Status',
                            value: 'getScanStatus',
                        },
                    ],
                    default: 'createScan',
                    description: 'The operation to perform.',
                },
                {
                    displayName: 'IP Address',
                    name: 'ip',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createScan'],
                        },
                    },
                    default: '',
                    placeholder: '192.168.1.1',
                    required: true,
                },
                {
                    displayName: 'Template ID',
                    name: 'template',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createScan'],
                        },
                    },
                    default: '',
                    required: true,
                },
                {
                    displayName: 'Folder ID',
                    name: 'folderId',
                    type: 'number',
                    displayOptions: {
                        show: {
                            operation: ['createScan'],
                        },
                    },
                    default: 0,
                    required: true,
                },
                {
                    displayName: 'Scan ID',
                    name: 'scanId',
                    type: 'number',
                    displayOptions: {
                        show: {
                            operation: ['getScanStatus'],
                        },
                    },
                    default: 0,
                    required: true,
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('nessusApi');
        const url = credentials.url;
        const apiToken = credentials.apiToken;
        const accessKey = credentials.accessKey;
        const secretKey = credentials.secretKey;
        // 创建一个忽略 SSL 证书验证的 HTTPS agent
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        const headers = {
            'Content-Type': 'application/json',
            'X-Api-Token': apiToken,
            'X-ApiKeys': `accessKey=${accessKey};secretKey=${secretKey}`,
        };
        // 配置 axios 请求选项
        const axiosConfig = {
            headers,
            httpsAgent,
        };
        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i);
            if (operation === 'createScan') {
                const ip = this.getNodeParameter('ip', i);
                const template = this.getNodeParameter('template', i);
                const folderId = this.getNodeParameter('folderId', i);
                const payload = {
                    uuid: template,
                    settings: {
                        name: `vuln_scan_for_${ip}`,
                        description: `vuln_scan_for_${ip}`,
                        enabled: true,
                        folder_id: folderId,
                        text_targets: ip,
                        agent_group_id: [],
                    },
                };
                try {
                    // 第一步：创建扫描
                    const createResponse = await axios_1.default.post(`${url}/scans`, payload, axiosConfig);
                    console.log(`status : ${createResponse.status}\taction : create_scan`);
                    // 提取新创建的扫描ID
                    const scanId = createResponse.data.scan.id;
                    // 第二步：启动扫描
                    const launchUrl = `${url}/scans/${scanId}/launch`;
                    const launchResponse = await axios_1.default.post(launchUrl, {}, axiosConfig);
                    console.log(`status : ${launchResponse.status}\taction : launch_scan`);
                    // 合并响应数据
                    const combinedResult = {
                        created_scan: createResponse.data,
                        launched_scan: launchResponse.data,
                        scan_id: scanId
                    };
                    returnData.push({ json: combinedResult });
                }
                catch (error) {
                    const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
                    throw new Error(`Nessus API error: ${errorMessage}`);
                }
            }
            else if (operation === 'getScanStatus') {
                const scanId = this.getNodeParameter('scanId', i);
                try {
                    const response = await axios_1.default.get(`${url}/scans/${scanId}`, axiosConfig);
                    returnData.push({ json: response.data });
                }
                catch (error) {
                    const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
                    throw new Error(`Nessus API error: ${errorMessage}`);
                }
            }
        }
        return this.prepareOutputData(returnData);
    }
}
exports.Nessus = Nessus;
