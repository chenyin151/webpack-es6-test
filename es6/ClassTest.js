export class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        console.log('this.x,this.y',this.x,this.y);
    }
}
export class ColorPoint extends Point {
    constructor(x,y,color) {
        // 只有调用一下super,才能让父类的this应用于子类中,否则子类没有this
        super(x,y);
        this.color=color;
    }
    toString() {
        return this.color + ' ' + super.toString();
    }
}

export class A {
    static Hello() {
        console.log('Hello world');
    }
    constructor() {
        console.log('ClassA', this);
    }
}
// 可以把父类的静态属性一同继承过来
export class B extends A {
    constructor() {
        // 调用super会调用它的父类，此时父类的this指向子类，
        // 它只能用在子类的构造函数中，在其他地方调用会报错
        super();
    }
}

class C {
    constructor() {
        this.p = 2;
        console.log('C')
    }
}
C.prototype.x = 12;
class D extends C {
    get m(){
        // super指向父类的原型对象，只有在父类的原型对象上定义的属性用
        // super.xxx才能访问到，这里可以用super访问到C.prototype定义
        // 的属性，而不能直接访问到父类实例属性对象
        console.log('m',super.p,super.x)
        return super.p;
    }
}

class E {
    constructor() {
        this.x = 1;
        console.log('constructor:',this)
    }
    print() {
        console.log(this.x, this);
    }
}
class F extends E{
    constructor() {
        super();
        // 子类调用super，会导致父类中引入的this指向子类，父类方法中的
        // this也会指向子类,所以父类的print中的this.x=2
        this.x = 12;
    
        super.x = 3;
        console.log('super:',this.x,E,F.prototype.x,E.prototype.x);
    }
    m() {
        super.print();
    }
}

class G {
    constructor() {
        this.x = 1;
    }
}
class H extends G {
    constructor() {
        super();
        this.x=2;
        super.x=3;
        console.log('H',this.x,G.prototype);
    }
}

class Parent{
    static myMethod(msg) {
        console.log('static', msg);
    }
    myMethod(msg) {
        console.log('instance', msg);
    }
}
class Child extends Parent {
    static myMethod(msg) {
        super.myMethod(msg);
    }
    myMethod(msg) {
        super.myMethod(msg);
    }
}

export default class Main {
    constructor() {
        console.log('Hello')
        let d = new D();
        d.m;
        let f = new F();
        console.log(f.x)
        let h = new H();
        // f.m();
        Child.myMethod(1);
        var child = new Child()
        child.myMethod(2);
    }
}