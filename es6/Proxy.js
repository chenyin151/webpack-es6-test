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
// proxy4.foo;
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
let person1 = new Proxy({}, validator);
person1.age=100;
console.log('person.age:',person1.age);
// person1.age="young";
// Proxy.js:219 Uncaught TypeError: The age is not an integer
// person1.age=300;
// Proxy.js:222 Uncaught RangeError: The age seems invalid

// ------------------------------------------------------------

// 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，
// 表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写
const handler2 ={
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
const target2 = {};
const proxy2=new Proxy(target2,handler2);
// proxy2._proxy;
// proxy2._prop=c;
// Proxy.js:253 Uncaught Error: Invalid attempt to get private "_proxy" property
// ------------------------------------------------------------

// set的receiver就是调用方，也就是Proxy的实例对象
const handler3 = {
    set:function(obj,prop,value,receiver){
        obj[prop]=receiver;
    }
}
const proxy5 = new Proxy({}, handler3);
proxy5.foo='bar';
console.log('proxy.foo==proxy:',proxy5.foo===proxy5);

const handler4 = {
    set:function(obj, prop, value, receiver) {
        obj[prop] = receiver;
    }
};
const proxy6 = new Proxy({},handler4);
const myObj = {};
const myObj1 = {};
Object.setPrototypeOf(myObj1, proxy6);
Object.setPrototypeOf(myObj, proxy6);

myObj.foo='bar';
myObj1.foo1='bar';
console.log('myObj.foo===myObj:',myObj.foo===myObj, myObj1.foo1===myObj1);
// ------------------------------------------------------------

// 如果目标对象自身的某个属性，不可写或不可配置，那么set方法将不起作用。
const obj12 = {};
Object.defineProperty(obj12,'foo', {
    value:'bar',
    writable:false
});
const handler5 = {
    set:function(obj,prop,value,receiver) {
        obj[prop]='baz';
    }
}
const proxy7 = new Proxy(obj12,handler5);
proxy7.foo='baz';
console.log('proxy7.foo:',proxy7.foo);
// ------------------------------------------------------------


// apply方法拦截函数的调用、call和apply操作,当调用p(),它会被Proxy的apply拦截
var target =function(){
    return 'I am the target';
};
var handler = {
    apply:function(){
        return 'I am the proxy';
    }
};
var p = new Proxy(target, handler);
console.log('p():',p());
// ------------------------------------------------------------

// 执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截
var twice = {
//     在proxy中不管参数是以数组的形式还是参数列表的形式传入，
//     apply都会把它转变为类数组的对象
    apply(target, ctx, args) {
        
        // Reflect.apply(target,thisArgument,argumentsList)
        // target:目标函数
        // thisArgument:target函数调用时绑定的this对象
        // argumentsList:target函数调用时传入的实参列表，该函数应该是一个类数组的对象
        return Reflect.apply(...arguments) * 2;
    }
};
function sum(left, right) {
    
    return left + right;
}
var proxy8 = new Proxy(sum, twice);
// proxy8(1,2);
console.log('proxy8.call:',proxy8.call(null,5,6));
console.log('proxy8.apply:',proxy8.apply(null,[7,8]));
// Reflect.apply也会被拦截
console.log('Reflect.apply:',Reflect.apply(proxy8,null,[9,9]));
// ------------------------------------------------------------

// 执行in会触发has拦截，这个key就是in之前的查询参数
var handler = {
    has(target,key) {
        // 若查询参数前有_则返回false
        if(key[0] === '_'){
            return false;
        }
        // 检查这个key在target中是否存在
        return key in target;
    }
};
var target = {prop:'foo',prop:'foo'};
var proxy9 = new Proxy(target,handler);
console.log('_prop','prop' in proxy9);
// ------------------------------------------------------------

// 原对象不可配置或者禁止扩展，这时has拦截会报错
var obj11 = {a:10};
Object.preventExtensions(obj11);
var p=new Proxy(obj11,{
    has:function(target,prop){
        return false;
    }
})
console.log('a' in p);
// ------------------------------------------------------------

// has拦截对for...in循环不生效
let stu1 = {name:'张三',score:59};
let stu2 = {name:'李四',score:99};
let handler = {
    has(target,prop) {
        if(prop === 'score' && target[prop]<60){
            console.log(`${target.name}不及格`);
            return false;
        }
        return prop in target;
    }
}
let oproxy1 =new Proxy(stu1,handler);
let oproxy2=new Proxy(stu2,handler);
'score' in oproxy1;
'score' in oproxy2;
for(let a in oproxy1) {
    console.log(oproxy1[a]);
}
for(let b in oproxy2){
    console.log(oproxy2[b]);
}
// ------------------------------------------------------------