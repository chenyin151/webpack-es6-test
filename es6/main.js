import { firstName, lastName as surname, o } from "./profile";
// import { area, circumference } from "./circle";
import * as circle from './circle';
import customName from './export-default'
console.log(firstName,surname);
o.firstName='chenyin';
console.log('o:',o);
console.log('圆面积：' + circle.area(4));
console.log('圆周长' + circle.circumference(14));
customName();
import add from './modules'
console.log('add:',add(2,2))
import defaultNum, { num } from './default-num'
console.log('default-num',defaultNum,num);
import MyClass from './MyClass';
import {add1} from './Forward'
let cls = new MyClass();
console.log('导出的类：', cls, add1(2,2));
import exp,* as math from './circleplus';
console.log('exp:',exp(2));
import * as constrants from './constrants';
// console.log('常量：',constrants.A);

