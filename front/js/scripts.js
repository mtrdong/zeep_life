host = "http://127.0.0.1:8000"

$(document).ready(function () {
    if (getCookie("phoneNum") !== "" && getCookie("password") !== "") {
        $("#phoneNum").val(getCookie("phoneNum"))
        $("#password").val(getCookie("password"))
        $("#stepNum").val(getCookie("stepNum"))
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

function shuabuClick() {
    if ($("#phoneNum").val() == "") {
        xtip.alert("请输入账号", "e")
    } else if ($("#password").val() == "") {
		xtip.alert("请输入密码", "e")
	} else if ($("#stepNum").val() == "") {
		xtip.alert("请输入步数", "e")
	} else {
		login()
	}
}

function login() {
    $.ajax({
        url: host + "/mifit/",
        async: true,
        type: "post",
        data: {
            "account": $("#phoneNum").val(),
            "password": $("#password").val(),
            "steps": $("#stepNum").val()
        },
        beforeSend: function (a) {
            xtip.load("同步中...")
        },
        success: function (a) {
            xtip.closeAll()
            if (a.code === 1) {
                setCookie("phoneNum", $("#phoneNum").val(), "d30")
                setCookie("password", $("#password").val(), "d30")
                setCookie("stepNum", $("#stepNum").val(), "d30")
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
    var b = getsec(d)
    var e = new Date()
    e.setTime(e.getTime() + b * 1)
    document.cookie = a + "=" + escape(c) + ";expires=" + e.toGMTString()
}

function getsec(c) {
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
