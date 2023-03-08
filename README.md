# Zeep Life

> Zeep Life（原小米运动）刷步
>
> 1. 下载安装`Zeep Life`，并使用邮箱注册登录
> 2. 登录`Zeep Life`后，点击`我的 > 第三方接入`，然后绑定`支付宝`或`微信`
> 3. 微信取消关注`华米科技`公众号
> 4. 安装依赖并运行服务
> 5. 打开刷步页面，输入`账号`、`密码`、`步数`，点击`开始同步`即可
> 6. 如果步数不同步，可尝试`注销Zeep Life账号`，重新注册登录，再重新绑定第三方APP

### 运行服务

> 安装依赖

```shell
# cd 到项目根目录执行命令：
pip install -r requirements.txt
```

> 运行服务

```shell
# cd 到 backend 目录执行命令：
nohup python app.py > app.log 2>&1 &
```

