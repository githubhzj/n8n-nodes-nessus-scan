# n8n-nodes-nessus-scan

这是一个用于对接 Nessus API 的自定义 n8n 节点。它支持以下功能：

1. **创建扫描**：为指定的 IP 地址创建新的漏洞扫描任务。
2. **获取扫描状态**：查询已有扫描任务的执行状态。

---

## 安装方式

<<<<<<< HEAD
1. 将 `n8n-nodes-nessus-scan` 文件夹放置到 n8n 的自定义节点目录中。
2. 重启 n8n 实例即可生效。
=======
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
>>>>>>> af5f9e1332c789e64034729e717e7b0a67054b25

---

## 所需凭证

使用本节点需要配置以下凭证信息：

| 凭证项 | 说明 | 示例 |
|--------|------|------|
| **Nessus URL** | Nessus 服务器的基础地址 | `https://<你的Nessus服务器>:8834` |
| **API Token** | Nessus API 令牌 | — |
| **Access Key** | Nessus 访问密钥 | — |
| **Secret Key** | Nessus 密钥 | — |

---

## 操作说明

### 🔹 创建扫描

| 参数 | 说明 |
|------|------|
| **IP 地址** | 扫描目标的 IP 地址 |
| **模板 ID** | 扫描模板的 UUID |
| **文件夹 ID** | 扫描任务保存的目标文件夹 ID |

### 🔹 获取扫描状态

| 参数 | 说明 |
|------|------|
| **扫描 ID** | 需要查询状态的扫描任务 ID |

---

## 使用示例

<<<<<<< HEAD
1. 在工作流中添加 Nessus 节点。
2. 选择所需操作（如「创建扫描」或「获取扫描状态」）。
3. 填写对应的参数信息。
4. 执行工作流即可。

---

## 注意事项

- ⚠️ 请确保 n8n 实例能够正常访问你的 Nessus 服务器。
- 🔐 请妥善保管敏感凭证信息，避免泄露。

---

## 许可证

=======
>>>>>>> af5f9e1332c789e64034729e717e7b0a67054b25
MIT
