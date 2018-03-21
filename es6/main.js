import { firstName, lastName as surname, o } from "./profile";
// import { area, circumference } from "./circle";
import * as circle from './circle';
circle.foo='333';
circle.area1=function(){};
console.log('动态修改：',circle.foo,circle);

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
console.log('导出的类是：', cls, add1(2,2));
import exp,* as math from './circleplus';
console.log('exp:',exp(2));
import * as constrants from './constrants';
// console.log('常量：',constrants.A);

import crc321 from './crc32';
console.log('crc32',crc321)

import add2 from './modules'
console.log('add1',add2)
import {each as forEach} from './foreach'
console.log('foreach',forEach)

