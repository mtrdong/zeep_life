# mifit

> 小米运动刷步
>
> 1. 下载安装小米运动APP，并通过手机号注册登录
> 2. 登录小米运动APP后，点击 我的 - 第三方接入，然后绑定 支付宝 或 微信
> 3. 微信取消关注 华米科技 公众号
> 4. 部署前后端服务
> 5. 打开刷步页面，输入账号、密码、步数，点击 同步数据 即可

### 快速部署

> 运行前端服务

```shell
# cd 到 index.html 文件所在目录执行命令：
nohup python -m http.server 8080 >/dev/null 2>&1 &
```

> 运行后端服务

```shell
# cd 到 manage.py 文件所在目录执行命令：
nohup python manage.py runserver 8000 >/dev/null 2>&1 &
```

