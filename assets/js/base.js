// indexOf('字符串值') 在一串字符串中检测是否出现字符串值,没有出现返回-1
$.ajaxPrefilter(function(option) {
    console.log(option.url);
    option.url = 'http://ajax.frontend.itheima.net' + option.url
    console.log(option.url.indexOf('/my/'));
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = { Authorization: localStorage.getItem('token') || '' }
    }
})