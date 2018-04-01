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

// proxy对象是obj对象的原型，obj对象本身并没有time属性，
// 所以根据原型链，会在proxy对象上读取该属性，导致被拦截。
var proxy = new Proxy({},{
    get: function(target, property) {
        return 35;
    }
});
let obj2 = Object.create(proxy);
console.log('obj.time:',obj2.time);
// ---------------------------------------------------
/**
 * handler
 */
var handler = {
    get:function(target, name) {
        if (name === 'prototype') {
            return Object.prototype;
        }
        return 'Hello, ' + name;
    },
    isExtensible:function(){
        console.log('拦截isExtension')
        return true;
    },
    // 拦截 Proxy 实例作为函数调用的操作，
    // 比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
    apply: function(x,y) {
        return x+y;
    },
    // 拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
    construct: function(target, args) {
        return {value:args[1]};
    }
};
var fproxy = new Proxy(function(x,y) {
    return x + y;
},handler);
console.log(Object.isExtensible(fproxy));
console.log('fproxy(1,2):',fproxy(1,2));
console.log('new fproxy(1,2):',new fproxy(1,2));
console.log('fproxy.prototype:',fproxy.prototype = Object.prototype);
fproxy.a;

// 如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined
var person = {
    name: '张三'
}
var proxy=new Proxy(person, {
    // 这里的target就是目标对象，也就是person，property就是属性名
    get: function(target,property) {
    
        // target对象中是否存在property属性
        if(property in target) {
            return target[property];
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
})
console.log(proxy.name)
// ------------------------------------------------------------------

// get方法可以继承
let proto = new Proxy({foo:'chen'}, {
    get(target, propertyKey, receiver) {
        debugger
        console.log('GET ' + propertyKey);
        return target[propertyKey];
    }
});
let obj1 =Object.create(proto);
console.log('obj.foo:', obj1.foo,proto.foo);
// -------------------------------------------