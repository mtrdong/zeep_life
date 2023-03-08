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
    if ($("#step").val()) {
		step = $("#step").val()
	}
    if ($("#account").val() == "") {
        xtip.alert("请输入账号", "e")
    } else if ($("#password").val() == "") {
		xtip.alert("请输入密码", "e")
	} else {
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
            xtip.load("同步中...")
        },
        success: function (a) {
            xtip.closeAll()
            if (a.code === 1) {
                setCookie("account", $("#account").val(), "d30")
                setCookie("password", $("#password").val(), "d30")
                setCookie("step", $("#step").val(), "d30")
                xtip.alert(a.message, "s")
            } else {
                xtip.alert(a.error, "e")
            }
        },
        error: function (a) {
            xtip.closeAll()
            xtip.alert("服务似乎出现了点小问题", "e")
        }
    })
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
    if (a == "s") {
        return b * 1000
    } else if (a == "h") {
        return b * 60 * 60 * 1000
    } else if (a == "d") {
        return b * 24 * 60 * 60 * 1000
    }
}

function randomStep(minStep, maxStep) {
    return parseInt(Math.random() * (maxStep - minStep + 1) + minStep,10)
}

function help() {
    layer.open({
        title: "使用帮助",
        content: "<div style='line-height: 32px'>" +
            "1. 下载安装Zeep Life，并使用邮箱注册登录<br>" +
            "2. 登录Zeep Life后，点击【我的 > 第三方接入】，然后绑定支付宝或微信<br>" +
            "3. 打开刷步页面，输入账号、密码、步数，点击【开始同步】即可<br>" +
            "4. 如果步数不同步，可尝试注销Zeep Life账号，重新注册登录，再重新绑定第三方APP" +
            "</div>"
    })
}
