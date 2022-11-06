$(function() {

    // 点击去注册按钮跳转到注册y页面
    $('#link_reg').on('click', function() {
            $('.login_box').hide()
            $('.reg_box').show()
        })
        // 点击去登录按钮跳转到登录页面
    $('#link_login').on('click', function() {
        $('.login_box').show()
        $('.reg_box').hide()


    })
    $('.login_box .icon-yanjing_yincang_o').on('click', function() {
        $('[name="password"]').attr('type', 'text')
        $('.icon-yanjing_xianshi_o').show()
        $(this).hide()
    })
    $('.login_box .icon-yanjing_xianshi_o').on('click', function() {
        $(' [name="password"]').attr('type', 'password')
        $('.icon-yanjing_yincang_o').show()
        $(this).hide()
    })


    $('.reg_box .icon-yanjing_yincang_o').on('click', function() {
        $('[name="reg_userpwd"]').attr('type', 'text')
        $('.icon-yanjing_xianshi_o').show()
        $(this).hide()
    })
    $('.reg_box .icon-yanjing_xianshi_o').on('click', function() {
            $('[name="reg_userpwd"]').attr('type', 'password')
            $('.icon-yanjing_yincang_o').show()
            $(this).hide()
        })
        // 表单验证
    let form = layui.form
    let layer = layui.layer
    form.verify({
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repssword: function(value) {
                let pwd = $(".reg_box [name='reg_userpwd']").val()
                if (pwd != value) {
                    return '两次密码不一致'
                }
            }
        })
        // 监听注册表单事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
                // 发起请求
            let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=reg_userpwd]').val() }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！')
                setTimeout(function() {
                    $('#link_login').click()
                    $('#form_reg input').val('')
                }, 3000)

            })

        })
        // 监听登录表单事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg('登入成功')
                    // 将登入成功后的token值存在本地
                localStorage.setItem('token', res.token)

                setTimeout(function() {
                    location.href = '/index.html'
                }, 3000)
            }

        })
    })
})