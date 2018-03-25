class A1 {
    constructor(name) {
        console.log('Class A1 is invoked!');
        this.name = name || 'dreamapple';
    }
    getName() {
        console.log(this.name);
        return this.name;
    }
}

class B1 {
    constructor(age) {
        console.log('Class B1 is invoked!');
        this.age = age || 22;
    }
    getAge() {
        console.log(this.age);
        return this.age;
    }
}

// Reflect.construct若只有第一个参数，则实例化第一个参数，若有第一个和第三个参数
// 那么实例化分两步进行，把第一个参数的属性追加进新的实例中，把第三个参数的方法追加
// 进去，形成新的对象：
// class B1 {
//     constructor() {
//         this.name="happy";
//     }
//     getAge(){
//         console.log(this.age);
//         return this.age;
//     }
// }
let a1 = Reflect.construct(A1, ['happy']);
let b1 = Reflect.construct(A1, ['happy'], B1);
let c1 = Reflect.construct(B1,[1])
console.log('a1:',a1);
console.log('b1:',b1);
console.log('c1:',c1);

