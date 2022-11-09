$(function() {
    getUserInfo()
        // 获取用户基本信息
    let layer = layui.layer
        // 退出按钮
    $('#btnlogin').on('click', function() {
        // 提示用户确认退出
        layer.confirm('是否退出登入？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清除本地存储
            localStorage.removeItem('token')
                // 2. 退出页面
            location.href = 'login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            renderAvatar(res.data)

        },
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('tokern')
        //             // location.href = '/login/html'
        //     }
        // }


    })
}
// 渲染用户信息

function renderAvatar(user) {
    // 获取昵称
    let name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.txt_avatar').hide()
    } else {
        // 渲染文字头像
        let first = name[0].toUpperCase()
        $('.txt_avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}