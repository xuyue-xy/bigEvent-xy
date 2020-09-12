$(function() {
    var layer = layui.layer
    usery()

    function usery() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                } else {
                    renderAvatar(res.data)
                }
            },
            // complete: function(res) {
            //     console.log(res)
            //     if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token')
            //         location.href = '../../login.html'
            //     }
            // }
        })
    }
    // attr属性设置器
    //toUpperCase() 方法用于把字符串转换为大写
    //id具有唯一性,少用
    function renderAvatar(user) {
        var name = user.username || user.nickname
        $('#qq').html('欢迎' + name)
        console.log(user.user_pic);
        if (user.user_pic !== null) {
            $('.ww').hide()
            $('.layui-nav-img').attr('scr', user.user_pic).show()
        } else {
            $('.layui-nav-img').hide()
            var firstName = name[0].toUpperCase()

            console.log(firstName);
            $('.ww').html(firstName).show()
        }
    }
    // 退出 token清空 链接跳转登录
    var layer = layui.layer
    $('.ee').click(function(res) {

        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '../../login.html'
            layer.close(index);
        });
    })
})