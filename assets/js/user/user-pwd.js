$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepass: function(value) {
            var oldpwd = $('.layui-form-item [name=oldPwd]').val()
            if (value === oldpwd) {
                return '两次密码不能一致'
            }
        },
        repwd: function(value) {
            var newpwd = $('.layui-form-item [name=newPwd]').val()
            if (value !== newpwd) {
                return '请输入相同密码'
            }
        }
    })

    $('#jj').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新密码成功')
                $('#jj')[0].reset()
                localStorage.removeItem('token')
                location.href = '../../../index.html'
            }
        })
    })
})