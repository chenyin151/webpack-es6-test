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

var o={};
Object.defineProperty(o,'a',{get:function(){return 1;},configurable:true});
// Object.defineProperty(o,'a',{configurable: true});
// Object.defineProperty(o,'a',{enumerable:true});
Object.defineProperty(o,'a',{set:function(){}});
// Object.defineProperty(o,'a',{value:12});
console.log(o.a);
delete o.a;
console.log(o.a);

// 自存档对象
function Archiver() {
    var temperature=null;
    var archive=[];

    Object.defineProperty(this,'temperature',{
        get:function(){
            console.log('get!');
            return temperature;
        },
        set:function(value) {
            temperature=value;
            archive.push({val:temperature});
        }
    });
    this.getArchive=function(){
        return archive;
    }
}
var arc=new Archiver();
arc.temperature;
arc.temperature=11;
arc.temperature=13;
console.log('getArchive:',arc.getArchive());
