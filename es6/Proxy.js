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
        console.log('GET ' + propertyKey);
        return target[propertyKey];
    }
});
let obj1 =Object.create(proto);
console.log('obj.foo:', obj1.foo,proto.foo);
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
let arr = createArray('a','b','c');
console.log('arr[-1]',arr[-1]);
// -------------------------------------------------------------

// proxy链式调用
var pipe = (function(){
    return function(value) {
        var funcStack = [];
        var oproxy = new Proxy({}, {
            get: function(pipeObject, fnName) {
                if (fnName === 'get') {
                    return funcStack.reduce(function(val, fn) {
                        return fn(val);
                    },value);
                }
                funcStack.push(window[fnName]);
                return oproxy;
            }
        });
        return oproxy;
    }
}());
var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("")|0;
console.log('pipe:',pipe(3).double.pow.reverseInt.get);
// -------------------------------------------------------------

// 利用get
const dom = new Proxy({}, {
    get(target, property) {
    
        // 这个闭包函数用来创建一个DOM元素，并给这个元素设置属性值,

        return function(attrs = {},...children) {
            const el = document.createElement(property);
            // Object.keys返回数组中的数据，用for...of可以获取到数组中的每条数据,
            // 若是对象，则肯定是元素数据，若是string类型的，一定就是字面量，直接
            // 创建文本节点
            for (let prop of Object.keys(attrs)) {
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
// const el = dom.div();
const el = dom.div({},
    'Hello, my name is ',
    dom.a({href: '//example.com'}, 'Mark'),
    '. I like:',
    dom.ul({},
      dom.li({}, 'The web'),
      dom.li({}, 'Food'),
      dom.li({}, '…actually that\'s it')
    )
  );
  document.body.appendChild(el);
// -------------------------------------------------------------

// get方法的第三个参数receiver总是为当前的Proxy实例
const proxy3 = new Proxy({}, {
    get:function(target, property,receiver) {
        debugger;
        return receiver;
    }
});
console.log('proxy3.getReceiver:',proxy3.getReceiver === proxy3);
// -------------------------------------------------------------

// 如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错
const target1 = Object.defineProperties({},{
    foo: {
        value:123,
        writable:false,
        configurable:false
    }
})
const handler1 = {
    get(target, propKey){
        return 'abc'
    }
}
const proxy4=new Proxy(target1,handler1);
proxy4.foo;
// ------------------------------------------------------------

// set拦截器使用，可以接受四个参数，依次为目标对象、属性名、
// 属性值和 Proxy 实例本身，其中最后一个参数可选，我们可以通过Proxy
// 来实现数据的DOM绑定
let validator = {
    set:function(obj,prop,value) {
        // 若属性名为age,则进行类型判断，若不是Number类型则抛出异常，若
        // 值大于20，则抛出越界异常，若不是age属性则不进行检测，直接赋值
        if(prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }
        obj[prop] =value;
    }
}
let person = new Proxy({}, validator);
person.age=100;
console.log('person.age:',person.age);
person.age="young";
person.age=300;
// ------------------------------------------------------------

// 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，
// 表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写
const handler ={
    get(target,key) {
        invariant(key,'get');
        return target[key];
    },
    set(target,key,value) {
        invariant(key,'set');
        target[key]=value;
        return true;
    }
};
function invariant(key,action) {
    if(key[0]==='_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}
const target = {};
const proxy=new Proxy(target,handler);
proxy._proxy;
proxy._prop=c;
// ------------------------------------------------------------