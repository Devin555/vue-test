/**
 * Created by F1333553 on 2018/1/29.
 */
import Vue from 'vue'

Vue.directive('hello', {
    bind(el,binding) {  // el是指令所绑定的元素
        console.log('指令第一次绑定到元素上执行，只调用一次，可执行初始化操作');
        el.style.color = 'red';
        console.log(binding)
        console.log(binding.value)
    },
    inserted() {
        console.log('被绑定元素插入到DOM中执行')
    },
    update() {
        console.log('当被绑定元素所在模板更新是调用')
    },
    componentUpdated() {
        console.log('被绑定元素所在模板完成一次更新周期时调用')
    },
    unbind() {
        console.log('指令与元素解绑是调用一次')
    }
});
//传入一个简单函数 ，bind和update时都会执行
Vue.directive('wbs',function () {
    console.log('wbs9252')
})