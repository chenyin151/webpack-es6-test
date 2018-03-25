class E{
    constructor(){
        this.x = 1;
    }
}

class F extends E{

    constructor(){
        super();
        this.x = 3;
        // 这里的super.x在浏览器中直接运行就是this.x,但是在打包工具（webpack和babel）中
        // 存在问题，导致无法覆盖子类中的this.x,建议别这么用
        super.x = 6;
        console.log('F中this.x:\n'+this.x,'\nF中this:\n'+this);
    }
}
class A {
    static myMethod() {

    }
}
class B extends A {
    constructor() {
        super();
        console.log(super.valueOf() instanceof B);
    }
}

// 数组的继承
class MyArray extends Array{
    constructor(){
        super();
    }
}
//-------------------------------

// 带版本功能的数组
class VersionedArray extends Array {
    constructor(){
        super();
        this.history=[[]];
    }
    commit() {
        this.history.push(this.slice());
    }
    reverse1() {
        debugger
        console.log('reverse')
        this.splice(0, this.length,...this.history[this.history.length - 1]);
    }
}

// -----------------------------------------


class Test extends Array{
    constructor(){
        super();
    }
    commit(){

    }
}
export default class ClassTest2 {
    constructor() {
        new F();
        let b1 = new B();
        console.log('继承：', B.prototype.__proto__)
        Object.setPrototypeOf(B.prototype,A.prototype);
        Object.setPrototypeOf(B, A);
        const b = new B();
        // console.log('b:', b.myMethod());
        const arr = new MyArray();
        arr[0]=1;
        console.log('自定义数组：',arr.length);

        // 带版本功能的数组
        // const x = new VersionedArray();
        // x.push(1);
        // x.push(2);
        // console.log('x.history:',x.history);
        // x.reverse1();
        // console.log('x.history2:',x.history);
        // x.push(3);
        // console.log('x:',x);
        // console.log('x.history3:',x.history);
        // x.reverse();
        // console.log('x2:',x);
        // -------------------------------

        let c = new Test()
        c.commit();
    }
}
