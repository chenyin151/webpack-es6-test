var obj = new Proxy({}, {
    get: function(target, key, receiver) {
        console.log(`getting ${key}!${receiver}`);
        return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver) {
        console.log(`setting ${key},${value}`);
        return Reflect.set(target, key, value, receiver);
    }
})
obj.count = 1;
console.log('proxy');

// var proxy = new Proxy()
// 如果handler没有设置任何拦截， 那就等同于直接通向原对象。
// handler是一个空对象， 没有任何拦截效果， 访问proxy就等同于访问target。
var target = {};
var handler = {
    get: function(target, key) {
        console.log('拦截类', target, key)
        return 12;
    }
};
var proxy1 = new Proxy(target, handler);
proxy1.a = 1;
console.log('proxy.a', proxy1.a);

// 置到object.proxy属性， 从而可以在object对象上调用。
var handler1 = {
    set: function(target, key) {
        console.log('拦截le')
    }
}
var object = { proxy: new Proxy(target, handler1) };
console.log(object.proxy.a = 1);
//------------------------------

// Proxy 实例也可以作为其他对象的原型对象。
// function Person(){};
// var p=new Person();
// Object.create(p)与new的区别：Object.create()实例出来的对象
// __proto__指向p这个对象，而new出来的对象直接指向Person的prototype
var proxy = new Proxy({}, {
    get: function(target, property) {
        return 35;
    }
});
let obj = Object.create(proxy);
obj.time;
//---------------------------------