$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            repawd: function(value) {
                var st = $('.reg-box [name=password]').val()
                if (st !== value) {
                    return '密码不一致'
                }
            }

        })
        // 发起调用注册请求
        // var layer = layui.layer
        // $('#reg-post').on('submit', function(e) {

    //     e.preventDefault()
    //     console.log(1);
    //     // res从接口返回的数据
    //     $.ajax({
    //         url: 'http://ajax.frontend.itheima.net/api/reguser',
    //         type: 'POST',
    //         data: {
    //             username: $('#reg-user').val(),
    //             password: $('#reg-password').val()
    //         },
    //         // 请求回来的回调函数:1 由后台(datatype)反馈出来的处理后数据 2 描述请求后的状态
    //         success: function(res) {
    //             console.log(res);
    //             if (res.status === 0) {
    //                 return layer.msg('注册成功');
    //             }
    //             layer.msg(res.message)
    //         }
    //     })
    //     return false
    // })

    $('#reg-post').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#reg-user').val(),
            password: $('#reg-password').val()

        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录')
        })
        $('#link_login').click()
    })

    // 发起登录请求
    //localStorage.setItem保存数据
    //localStorage.getItem读取数据
    //localStorage.removeItem删除数据
    //token相当于身份认证,用于邀请和登录系统

    $('#login-post').on('submit', function(e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg('登录失败');
                }
                localStorage.setItem('token', res.token)
                location.href = '/index.html'

            }
        })
    })



})