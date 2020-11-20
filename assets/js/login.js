$(function () {
    // 点击注册去往注册页面,注册页面显示
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击登录去往注册页面,登录页面显示
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    });

    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('http://ajax.frontend.itheima.net/api/reguser',
            {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            function (res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('#link_login').click();
            })

    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault(),
            $.post('http://ajax.frontend.itheima.net/api/reguser', $(this).serialize(),
                function (res) {
                    if (res.status !== 0) {
                        return layer.msg('登陆失败')
                    }
                    layer.msg('登录成功')
                    // 登录成功之后返回的这个值很重要
                    // console.log(res.token);
                    localStorage.setItem('token', res.token)
                })
        // 登陆成功跳转到后台首页
        location.href = '/index.html'
    })
})
