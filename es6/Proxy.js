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
var proxy = new Proxy({}, {
    get: function(target, property) {
        return 35;
    }
});
let obj2 = Object.create(proxy);
console.log('obj.time:', obj2.time);
// ---------------------------------------------------
/**
 * handler
 */
var handler = {
    get: function(target, name) {
        if (name === 'prototype') {
            return Object.prototype;
        }
        return 'Hello, ' + name;
    },
    isExtensible: function() {
        console.log('拦截isExtension')
        return true;
    },
    // 拦截 Proxy 实例作为函数调用的操作，
    // 比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
    apply: function(x, y) {
        return x + y;
    },
    // 拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
    construct: function(target, args) {
        return { value: args[1] };
    }
};
var fproxy = new Proxy(function(x, y) {
    return x + y;
}, handler);
console.log(Object.isExtensible(fproxy));
console.log('fproxy(1,2):', fproxy(1, 2));
console.log('new fproxy(1,2):', new fproxy(1, 2));
console.log('fproxy.prototype:', fproxy.prototype = Object.prototype);
fproxy.a;

// 如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined
var person = {
    name: '张三'
}
var proxy = new Proxy(person, {
    // 这里的target就是目标对象，也就是person，property就是属性名
    get: function(target, property) {

        // target对象中是否存在property属性
        if (property in target) {
            return target[property];
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
})
console.log(proxy.name)
    // ------------------------------------------------------------------

// get方法可以继承
let proto = new Proxy({ foo: 'chen' }, {
    get(target, propertyKey, receiver) {
        console.log('GET ' + propertyKey);
        return target[propertyKey];
    }
});
let obj1 = Object.create(proto);
console.log('obj.foo:', obj1.foo, proto.foo);
// -------------------------------------------

// createArray会创建数组，把值push到数组中，然后设置代理来拦截get操作
// 当数组索引为-1的时候读取数组最后的值，否则正常读取
function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            let index = Number(propKey);
            if (index < 0) {
                propKey = String(target.length + index);
            }
            return Reflect.get(target, propKey, receiver);
        }
    }
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}
let arr = createArray('a', 'b', 'c');
console.log('arr[-1]', arr[-1]);
// -------------------------------------------------------------

// proxy链式调用
var pipe = (function() {
    // 执行pipe(3)会执行下面的函数并返回Proxy
    return function(value) {
        var funcStack = [];
        var oproxy = new Proxy({}, {
            get: function(pipeObject, fnName) {
                debugger;
                if (fnName === 'get') {
                    // Array.reduce(callbackFn, [initialValue]),callbackFn函数包含4个参数：
                    // preValue: 上一次调用回调返回的值， 或者是提供的初始值（ initialValue），在
                    // 这里就是val,fn(val)返回的值就成为了下次val的值
                    // curValue: 数组中当前被处理的数组项, 在这里就是fn
                    // index: 当前数组项在数组中的索引值
                    // array: 调用 reduce() 方法的数组，当指定了initialValue，那么，第一次
                    // preValue就等于initialValue,当执行一次，
                    // funcStack.reduce会依次执行数组中的方法,它会把上次执行的结果传入下次执行的
                    // 方法中
                    return funcStack.reduce(function(val, fn) {
                        return fn(val);
                    }, value);
                }
                // 存储double pow reverseInt方法到funStack中，然后把这个
                // Proxy实例返回出去用来读取下一个属性
                funcStack.push(window[fnName]);

                return oproxy;
            }
        });
        return oproxy;
    }
}());
var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;
console.log('pipe:', pipe(3).double.pow.reverseInt.get);
// -------------------------------------------------------------

// 下面的例子则是利用get拦截，实现一个生成各种 DOM 节点的通用函数dom
const dom = new Proxy({}, {
    get(target, property) {
        return function(attrs = {}, ...children) {
            const el = document.createElement(property);
            for (let prop of Object.keys[attrs]) {
                el.setAttribute(prop, attrs[prop]);
            }
            for (let child of children) {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }
                el.appendChild(child);
            }
            return el;
        }
    }
});
const el = dom.div({},
    'Hello, my name is ',
    dom.a({ href: '//example.com' }, 'Mark'),
    '. I like:',
    dom.ul({},
        dom.li({}, 'The web'),
        dom.li({}, 'Food'),
        dom.li({}, '…actually that\'s it')
    )
);
document.body.appendChild(el);
// -------------------------------------------------------------