import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IExecuteFunctions,
} from 'n8n-workflow';

import axios, { AxiosRequestConfig } from 'axios';
import * as https from 'https';

export class Nessus implements INodeType {
    description: INodeTypeDescription = {
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

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const credentials = await this.getCredentials('nessusApi');

        const url = credentials.url as string;
        const apiToken = credentials.apiToken as string;
        const accessKey = credentials.accessKey as string;
        const secretKey = credentials.secretKey as string;

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
        const axiosConfig: AxiosRequestConfig = {
            headers,
            httpsAgent,
        };

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;

            if (operation === 'createScan') {
                const ip = this.getNodeParameter('ip', i) as string;
                const template = this.getNodeParameter('template', i) as string;
                const folderId = this.getNodeParameter('folderId', i) as number;

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
                    const createResponse = await axios.post(`${url}/scans`, payload, axiosConfig);
                    
                    console.log(`status : ${createResponse.status}\taction : create_scan`);
                    
                    // 提取新创建的扫描ID
                    const scanId = createResponse.data.scan.id;
                    
                    // 第二步：启动扫描
                    const launchUrl = `${url}/scans/${scanId}/launch`;
                    const launchResponse = await axios.post(launchUrl, {}, axiosConfig);
                    
                    console.log(`status : ${launchResponse.status}\taction : launch_scan`);
                    
                    // 合并响应数据
                    const combinedResult = {
                        created_scan: createResponse.data,
                        launched_scan: launchResponse.data,
                        scan_id: scanId
                    };
                    
                    returnData.push({ json: combinedResult });
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
                    throw new Error(`Nessus API error: ${errorMessage}`);
                }
            } else if (operation === 'getScanStatus') {
                const scanId = this.getNodeParameter('scanId', i) as number;

                try {
                    const response = await axios.get(`${url}/scans/${scanId}`, axiosConfig);
                    returnData.push({ json: response.data });
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
                    throw new Error(`Nessus API error: ${errorMessage}`);
                }
            }
        }

        return this.prepareOutputData(returnData);
    }
}