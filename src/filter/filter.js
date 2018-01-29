/**
 * Created by F1333553 on 2018/1/26.
 */
import Vue from 'vue'


//全局过滤器
Vue.filter("addzero",(data) => {
    return data + 2
});

//data为数据，n为过滤器传递的参数
Vue.filter("number",(data,n) => {
    return data.toFixed(n)
});
