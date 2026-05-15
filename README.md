# n8n-nodes-nessus-scan

This is a custom n8n node for interacting with the Nessus API. It allows you to:

1. **Create Scan**: Create a new vulnerability scan for a specific IP address.
2. **Get Scan Status**: Retrieve the status of an existing scan.

## Installation

1. Place the `n8n-nodes-nessus-scan` folder in your n8n custom nodes directory.
2. Restart your n8n instance.

## 安装node到你的环境
3. 以 n8n-nodes-checkpoint-main.zip 为例 
1. 上传自定义nodes文件到运行n8n的服务器上
2. 解压文件 unzip n8n-nodes-checkpoint-main.zip
3. 重命名 mv n8n-nodes-checkpoint-main n8n-nodes-checkpoint
4. 使用docker cp 命令将nodes解压后的所有文件放到指定目录下
docker cp n8n-nodes-checkpoint n8n:/home/node/.n8n/custom/
5. 重启n8n容器服务 docker restart n8n
6. 在前端创建workflow 添加node搜索checkpoint
7. 添加防火墙认证信息
8. 选择动作填写信息测试
如果需要进入容器内部查看文件：
docker exec -it n8n sh
cd .n8n/custom 进入自定义目录
ls 查看
exit 退出容器

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
