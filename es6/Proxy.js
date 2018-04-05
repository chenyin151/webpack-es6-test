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

// 利用get
const dom = new Proxy({}, {
    get(target, property) {

        // 这个闭包函数用来创建一个DOM元素，并给这个元素设置属性值,

        return function(attrs = {}, ...children) {
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

// get方法的第三个参数receiver总是为当前的Proxy实例
const proxy3 = new Proxy({}, {
    get: function(target, property, receiver) {
        return receiver;
    }
});
console.log('proxy3.getReceiver:', proxy3.getReceiver === proxy3);
// -------------------------------------------------------------

// 如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错
const target1 = Object.defineProperties({}, {
    foo: {
        value: 123,
        writable: false,
        configurable: false
    }
})
const handler1 = {
    get(target, propKey) {
        return 'abc'
    }
}
const proxy4 = new Proxy(target1, handler1);
// proxy4.foo;
// ------------------------------------------------------------

// set拦截器使用，可以接受四个参数，依次为目标对象、属性名、
// 属性值和 Proxy 实例本身，其中最后一个参数可选，我们可以通过Proxy
// 来实现数据的DOM绑定
let validator = {
    set: function(obj, prop, value) {
        // 若属性名为age,则进行类型判断，若不是Number类型则抛出异常，若
        // 值大于20，则抛出越界异常，若不是age属性则不进行检测，直接赋值
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }
        obj[prop] = value;
    }
}
let person1 = new Proxy({}, validator);
person1.age = 100;
console.log('person.age:', person1.age);
// person1.age="young";
// Proxy.js:219 Uncaught TypeError: The age is not an integer
// person1.age=300;
// Proxy.js:222 Uncaught RangeError: The age seems invalid

// ------------------------------------------------------------

// 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，
// 表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写
const handler2 = {
    get(target, key) {
        invariant(key, 'get');
        return target[key];
    },
    set(target, key, value) {
        invariant(key, 'set');
        target[key] = value;
        return true;
    }
};

function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}
const target2 = {};
const proxy2 = new Proxy(target2, handler2);
// proxy2._proxy;
// proxy2._prop=c;
// Proxy.js:253 Uncaught Error: Invalid attempt to get private "_proxy" property
// ------------------------------------------------------------

// set的receiver就是调用方，也就是Proxy的实例对象
const handler3 = {
    set: function(obj, prop, value, receiver) {
        obj[prop] = receiver;
    }
}
const proxy5 = new Proxy({}, handler3);
proxy5.foo = 'bar';
console.log('proxy.foo==proxy:', proxy5.foo === proxy5);

const handler4 = {
    set: function(obj, prop, value, receiver) {
        obj[prop] = receiver;
    }
};
const proxy6 = new Proxy({}, handler4);
const myObj = {};
const myObj1 = {};
Object.setPrototypeOf(myObj1, proxy6);
Object.setPrototypeOf(myObj, proxy6);

myObj.foo = 'bar';
myObj1.foo1 = 'bar';
console.log('myObj.foo===myObj:', myObj.foo === myObj, myObj1.foo1 === myObj1);
// ------------------------------------------------------------

// 如果目标对象自身的某个属性，不可写或不可配置，那么set方法将不起作用。
const obj12 = {};
Object.defineProperty(obj12, 'foo', {
    value: 'bar',
    writable: false
});
const handler5 = {
    set: function(obj, prop, value, receiver) {
        obj[prop] = 'baz';
    }
}
const proxy7 = new Proxy(obj12, handler5);
proxy7.foo = 'baz';
console.log('proxy7.foo:', proxy7.foo);
// ------------------------------------------------------------


// apply方法拦截函数的调用、call和apply操作,当调用p(),它会被Proxy的apply拦截
var target = function() {
    return 'I am the target';
};
var handler = {
    apply: function() {
        return 'I am the proxy';
    }
};
var p = new Proxy(target, handler);
console.log('p():', p());
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
console.log('proxy8.call:', proxy8.call(null, 5, 6));
console.log('proxy8.apply:', proxy8.apply(null, [7, 8]));
// Reflect.apply也会被拦截
console.log('Reflect.apply:', Reflect.apply(proxy8, null, [9, 9]));
// ------------------------------------------------------------

// 执行in会触发has拦截，这个key就是in之前的查询参数
var handler = {
    has(target, key) {
        // 若查询参数前有_则返回false
        if (key[0] === '_') {
            return false;
        }
        // 检查这个key在target中是否存在
        return key in target;
    }
};
var target = { prop: 'foo', prop: 'foo' };
var proxy9 = new Proxy(target, handler);
console.log('_prop', 'prop' in proxy9);
// ------------------------------------------------------------

// 原对象不可配置或者禁止扩展，这时has拦截会报错
var obj11 = { a: 10 };
Object.preventExtensions(obj11);
var p = new Proxy(obj11, {
        has: function(target, prop) {
            return false;
        }
    })
    // console.log('a' in p);
    // 报错：Uncaught TypeError: 'has' on proxy: trap returned falsish 
    // for property 'a' but the proxy target is not extensible
    // ------------------------------------------------------------

// has拦截对for...in循环不生效
let stu1 = { name: '张三', score: 59 };
let stu2 = { name: '李四', score: 99 };
let handler11 = {
    has(target, prop) {
        if (prop === 'score' && target[prop] < 60) {
            console.log(`${target.name}不及格`);
            return false;
        }
        return prop in target;
    }
}
let oproxy1 = new Proxy(stu1, handler11);
let oproxy2 = new Proxy(stu2, handler11);
'score' in oproxy1;
'score' in oproxy2;
for (let a in oproxy1) {
    console.log(oproxy1[a]);
}
for (let b in oproxy2) {
    console.log(oproxy2[b]);
}
// ------------------------------------------------------------

// construct方法用于拦截new命令
// construct方法可以接受两个参数：
// target:目标对象
// args:构建函数的参数对象
// construct必须返回对象
var p = new Proxy(function() {}, {
    construct: function(target, args) {
        console.log('called:' + args.join(', '));
        return { value: args[0] * 10 };
    }
})
console.log('construct:', (new p(1, 2)).value);
// ------------------------------------------------------------

// deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false,
// 当前属性就无法被delete命令删除
var handler = {
    deleteProperty(target, key) {
        invariant(key, 'delete');
        return true;
    }
}
var target = { _prop: 'foo' };

var t2 = Object.defineProperty({}, 'foo', {
    configurable: false
})
var proxy = new Proxy(t2, handler);
// delete proxy.foo;
var t = { foo: '111' };
Object.preventExtensions(t); //加入preventExtensions就不能给对象新增新的属性，否则报错
// Object.defineProperty(t,'foo1',{
//     value:21
// })
console.log(t)
proxy = new Proxy(t, handler);
delete proxy.foo
    // ------------------------------------------------------------

// getOwnPropertyDescriptor拦截Object.getOwnPropertyDescriptor,返回
// 属性描述符
var handler = {
    getOwnPropertyDescriptor(target, key) {

        if (key[0] === '_') {
            return;
        }
        return Object.getOwnPropertyDescriptor(target, key);
    }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
console.log('descriptor1:', Object.getOwnPropertyDescriptor(proxy, 'wat'));
console.log('descriptor2:', Object.getOwnPropertyDescriptor(proxy, '_foo'));
console.log('descriptor3:', Object.getOwnPropertyDescriptor(proxy, 'baz'));
// ------------------------------------------------------------

// getPrototypeOf方法主要用来拦截获取对象原型,具体来说，拦截下面这些操作
// Object.prototype.__proto__
// Object.prototype.isPrototypeOf()
// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// instanceof
// etPrototypeOf方法的返回值必须是对象或者null，否则报错。另外，
// 如果目标对象不可扩展（extensible），getPrototypeOf方法必须返回目标对象的原型对象
var proto1 = {};
var p = new Proxy({}, {
    getPrototypeOf(target) {

        return proto1;
    }
})
console.log('getPrototypeOf:', Object.getPrototypeOf(p) === proto1);
// ------------------------------------------------------------

// isExtensible方法拦截Object.isExtensible操作,
// 注意：该方法只返回布尔值，不是布尔值的自动转为布尔值
// 这个方法有一个强限制，它的返回值必须与目标对象的isExtensible
// 属性保持一致，否则就会抛出错误

var t = {};
Object.preventExtensions(t)
var p = new Proxy(t, {
        isExtensible: function(target) {
            console.log('called');
            // 这里返回true或者false必须与目标对象的isExtensible值保持一致，否则报错
            return false;
        }
    })
    // Object.isExtensible(proxy) === Object.isExtensible(target)
console.log('isExtensible:', Object.isExtensible(p));
// ------------------------------------------------------------

// ownKeys方法用来拦截对象自身属性的读取操作,拦截以下操作：
// Object.getOwnPropertyNames()
// Object.getOwnPropertySymbols()
// Object.keys()

let target12 = {
    a: 1,
    b: 2,
    c: 3
}
let handler8 = {
    ownKeys(target12) {
        return ['a'];
    }
}
let proxy10 = new Proxy(target12, handler8);
console.log('keys:', Object.keys(proxy10));
// ------------------------------------------------------------

// 使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤，不会返回:
// 1.目标对象上不存在的属性
// 2.属性名为Symbol的值
// 3.不可遍历的属性
let target13 = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.for('secret')]: '4'
};
Object.defineProperty(target13, 'key', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 'static'
});
let handler9 = {
    // Symbol.for()首先在全局中搜索有没有以该参数作为名称的Symbol值，
    // 如果有，就返回这个Symbol值，否则就新建并返回一个以
    // 该字符串为名称的Symbol值。和直接的Symbol就点不同了
    ownKeys(target13) {
        return ['a', 'd', Symbol.for('secret'), 'key'];
    }
};
let proxy11 = new Proxy(target13, handler9);
console.log('Object.keys:', Object.keys(proxy11));
// ------------------------------------------------------------

// ownKeys拦截Object.getOwnPropertyNames()实例
var p = new Proxy({}, {
    ownKeys: function(target) {
        return ['a', 'b', 'c'];
    }
})
console.log('ownKeys:', Object.getOwnPropertyNames(p));
// ------------------------------------------------------------

// ownKeys必须返回的是字符串数组，因为它是键名
var obj = {};
var p = new Proxy(obj, {
        ownKeys: function(target) {
            return [123, true, undefined, null, {},
                []
            ];
        }
    })
    // Object.getOwnPropertyNames(p);
    // ------------------------------------------------------------

// 如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回，否则报错
var obj = {};
Object.defineProperty(obj, 'a', {
    configurable: false,
    enumerable: true,
    value: 10
})
var p = new Proxy(obj, {
        ownKeys: function(target) {
            return ['b'];
        }
    })
    // Object.getOwnPropertyNames(p);
    // ------------------------------------------------------------

// 如果目标对象是不可扩展的（non-extensition），这时ownKeys方法返回的数组之中，
// 必须包含原对象的所有属性，且不能包含多余的属性，否则报错
var obj = {
    a: 1
};
Object.preventExtensions(obj);
var p = new Proxy(obj, {
        ownKeys: function(target) {
            return ['a', 'b']
        }
    })
    // Object.getOwnPropertyNames(p);
    // ------------------------------------------------------------

// preventExtensions方法拦截Object.preventExtensions()。
// 该方法必须返回一个布尔值，否则会被自动转为布尔值。只有当对象
// 不可扩展的时候才能返回true,否则报错，若要使下面的不报错，在return
// 之前调用一下Object.preventExtensitions()
var p = new Proxy({}, {
    preventExtensions: function(target) {
        Object.preventExtensions(target);
        return true;
    }
})
Object.preventExtensions(p);
// ------------------------------------------------------------

// setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法,下面例子只要
// 修改对象的原型对象就会报错，只会返回Boolean值
var handler = {
    setPrototypeOf(target, proto) {
        throw new Error('Changing the prototype is forbidden');
    }
}
var proto1 = {};
var target = function() {};
var proxy = new Proxy(target, handler);
// Object.setPrototypeOf(proxy,proto1);
// ------------------------------------------------------------

// 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，
// 即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在
//  Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理
const target14 = {
    m: function() {
        console.log(this === proxy12);
    }
}
const handler10 = {};
const proxy12 = new Proxy(target14, handler10);
target14.m();
proxy12.m();

// 下面这个例子，target和Proxy的this不是一个对象，所以用，
// 所以用proxy.name是无法读取到target.name的内容,可以通过bind()
// 实现把proxy的this绑定到target的this中，这样proxy就可以访问target的
// 内容
const _name = new WeakMap();
class Person {
    constructor(name) {
        _name.set(this, name);
    }
    get name() {
        return _name.get(this);
    }
}
const jane = new Person('Jane');
console.log('jane.name:', jane.name);
const proxy13 = new Proxy(jane, {});
console.log('proxy.name', proxy13.name);

const target15 = new Date('2015-01-01');
const handler12 = {
    get(target, prop, receiver) {
        if (prop === 'getDate') {

            return target.getDate.bind(target);
        }
        return Reflect.get(target.prop);
    }
}
const proxy14 = new Proxy(target15, handler12);
console.log('getDate:', proxy14.getDate());
// ------------------------------------------------------------

// Proxy对象可以拦截目标对象的任意属性，这使得它很适合用来写Web服务客户端，
// createWebService会返回一个Proxy对象，当调用这个代理的employees方法会
// 触发代理的get拦截，它会返回一个Promise
const service = createWebService('http://example.com/data');
service.employees().then(json => {
    const employees = JSON.parse(json);
})

function createWebService(baseUrl) {
    return new Proxy({}, {
        get(target, propKey, receiver) {
            // httpGet会返回一个Promise对象
            return () => httpGet(baseUrl + '/' + propKey)
        }
    })
}
// ------------------------------------------------------------

//  Proxy.revocable方法返回一个可取消的Proxy实例
//  Proxy.revocable方法返回一个对象， 该对象的proxy属性是Proxy实例， 
//  revoke属性是一个函数， 可以取消Proxy实例。 上面代码中， 当执行revoke函数之后，
//  再访问Proxy实例， 就会抛出一个错误    
let target = {};
let handler = {};
let { proxy, revoke } = Proxy.revocable(target, handler);
proxy.foo = 123;
proxy.foo;
revoke();
proxy.foo;
// ------------------------------------------------------------