# ZeepLife

> ZeepLife（原小米运动）刷步
>
> 1. 下载安装`ZeepLife`，并使用邮箱注册登录
> 2. 登录`ZeepLife`后，点击`我的 > 第三方接入`，然后绑定`支付宝`或`微信`
> 3. 微信取消关注`华米科技`公众号
> 4. 部署前后端服务
> 5. 打开刷步页面，输入`账号`、`密码`、`步数`，点击`同步数据`即可
> 6. 如果步数不同步，可以试试`注销ZeepLife账号`再注册，重新绑定第三方APP

### 快速部署

> 运行前端服务

```shell
# cd 到 front 目录执行命令：
nohup python -m http.server 8080 >/dev/null 2>&1 &
```

> 运行后端服务

```shell
# cd 到 backend 目录执行命令：
nohup python app.py >/dev/null 2>&1 &
```

