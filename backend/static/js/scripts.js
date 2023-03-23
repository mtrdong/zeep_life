var step = randomStep(18000, 20000)

$(document).ready(function () {
    $('#step').attr('placeholder', step)
    if (getCookie("account") !== "" && getCookie("password") !== "") {
        $("#account").val(getCookie("account"))
        $("#password").val(getCookie("password"))
        $("#step").val(getCookie("step"))
    }
})

function getCookie(b) {
    var a, c = new RegExp("(^| )" + b + "=([^;]*)(;|$)")
    if (a = document.cookie.match(c)) {
        return unescape(a[2])
    } else {
        return null
    }
}

function submitStep() {
    if (checkAccount() && checkPassword() && checkStep()) {
		login()
	}
}

function login() {
    $.ajax({
        url: "/submit",
        async: true,
        type: "post",
        data: {
            "account": $("#account").val(),
            "password": $("#password").val(),
            "step": step
        },
        beforeSend: function (a) {
            layer.load()
        },
        success: function (a) {
            layer.closeAll()
            if (a.code === 1) {
                setCookie("account", $("#account").val(), "d30")
                setCookie("password", $("#password").val(), "d30")
                setCookie("step", $("#step").val(), "d30")
                layer.alert(a.message, {icon: 1, skin: "layui-layer-radius"})
            } else {
                layer.alert(a.error, {icon: 2, skin: "layui-layer-radius"})
            }
        },
        error: function (a) {
            layer.closeAll()
            layer.alert("服务似乎出现了问题", {icon: 5, skin: "layui-layer-radius"})
        }
    })
}

function checkAccount() {
    var account = $("#account").val()
    if (!account) {
        layer.alert("请输入账号", {icon: 2, skin: "layui-layer-radius"})
        return false
    }
    var regex_phone = /^1[3456789]\d{9}$/
    var regex_email = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/
    if (!(regex_phone.test(account) || regex_email.test(account))) {
        layer.alert("账号格式错误", {icon: 2, skin: "layui-layer-radius"})
        return false
    }
    return true
}

function checkPassword() {
    var password = $("#password").val()
    if (!password) {
        layer.alert("请输入密码", {icon: 2, skin: "layui-layer-radius"})
        return false
    }
    return true
}

function checkStep() {
    var num = $("#step").val()
    if (num) {
        var regex_step = /^[1-9]\d*$/
        if (!regex_step.test(num)) {
            layer.alert("步数必须是正整数", {icon: 2, skin: "layui-layer-radius"})
            return false
        }
        step = num
    }
    return true
}

function setCookie(a, c, d) {
    var b = getSec(d)
    var e = new Date()
    e.setTime(e.getTime() + b * 1)
    document.cookie = a + "=" + escape(c) + ";expires=" + e.toGMTString()
}

function getSec(c) {
    var b = c.substring(1, c.length) * 1
    var a = c.substring(0, 1)
    if (a === "s") {
        return b * 1000
    } else if (a === "h") {
        return b * 60 * 60 * 1000
    } else if (a === "d") {
        return b * 24 * 60 * 60 * 1000
    }
}

function randomStep(minStep, maxStep) {
    return parseInt(Math.random() * (maxStep - minStep + 1) + minStep,10)
}

function help() {
    layer.alert(
        "<div style='line-height: 32px'>" +
        "1. 下载安装Zeep Life，并使用邮箱注册登录<br>" +
        "2. 登录Zeep Life后，点击【我的 > 第三方接入】，然后绑定支付宝或微信<br>" +
        "3. 打开刷步页面，输入账号、密码、步数，点击【开始同步】即可<br>" +
        "4. 如果步数不同步，可尝试注销Zeep Life账号，重新注册登录，再重新绑定第三方APP<br>" +
        "5. 注意，首次绑定需24小时后才会同步步数。另外，同步步数的时间建议在7~22点之间" +
        "</div>",
        {title: "使用帮助", btn: [], skin: "layui-layer-radius"}
    )
}
