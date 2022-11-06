$.ajaxPrefilter(function(options) {
    options.url = 'http://big-event-api-t.itheima.net' + options.url
    console.log(options.url);
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    options.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('tokern')
            location.href = '/login/html'
        }
    }



})