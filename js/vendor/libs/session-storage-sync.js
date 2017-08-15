/**
 * 解决浏览器多标签页sessionStorage不能共享的问题
 * 思路：监听storage事件，页面加载时将sessionStorage临时写入localStorage
 * 参考http://www.tuicool.com/articles/UZrUnmq
 */ 
(function () {

    if (!sessionStorage.length) {
        // 这个调用能触发目标事件，从而达到共享数据的目的
        localStorage.setItem('getSessionStorage', Date.now());
    };

    // 该事件是核心
    window.addEventListener('storage', function (event) {
        if (event.key == 'getSessionStorage') {
            // 已存在的标签页会收到这个事件
            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
            localStorage.removeItem('sessionStorage');

        } else if(event.key == 'sessionStorage' && !sessionStorage.length) {
            // 新开启的标签页会收到这个事件
            var data  
            try{
                data = JSON.parse(event.newValue)
            }catch(ex){
                data = null
            }

            if(data){

                for (key in data) {
                    sessionStorage.setItem(key, data[key]);
                }
            }
        }
    });
})();
