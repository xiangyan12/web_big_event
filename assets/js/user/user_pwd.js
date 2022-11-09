$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return ('不能和旧密码一样！')
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return ('两次密码不一样！')
            }
        }
    })
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('res.message')
                }
                layer.msg('提交修改成功!')
                $(this)[0].reset()
            }

        })
    })
})