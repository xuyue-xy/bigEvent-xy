$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    inuserinfo()

    function inuserinfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val("rr", res.data)
            }
        })
    }
    $('#btn-resert').on('click', function(e) {
        e.preventDefault()
        inuserinfo()
    })
    $('#yy').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(window.parent);
                top.window.parent.usery()
            }
        })
    })
})