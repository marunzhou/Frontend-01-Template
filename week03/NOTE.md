# 每周总结可以写在这里
## 宿主对象
由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定，
我们最常见的宿主就是浏览器。

在 console 面板打印出 window 的所有属性, 会显示超出1000个，但这些属性不是都来自javascript语言，有一部分是来浏览器，以及用户创建的对象。

像 web api, bom对象，dom对象是由浏览器提供的宿主对象。


## 内置对象
> JavaScript 标准内置对象: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects

内置对象与宿主无关，由ECMAScript实现提供的对象。可分为原生对象和固有对象


### 原生对象
能够通过语言本身的构造器创建的对象称作原生对象
```
// 从上面的“JavaScript 标准内置对象”链接中获取到87个原生对象
let nativeObject = [
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray
]
```
### 固有对象
固有对象，我的理解是原生对象的子集，[具体可看ecma262文档](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-well-known-intrinsic-objects)

在《重学前端》中也贴了这样一段代码利用广度搜索的方式来查看所有的属性和getter/setter，获取到所有的固有对象，会认为固有对象是原生对象的子集，也是因为此处是在原生对象nativeObject进行搜寻。
```

var set = new Set();
var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect];
objects.forEach(o => set.add(o));

for(var i = 0; i < objects.length; i++) {
    var o = objects[i]
    for(var p of Object.getOwnPropertyNames(o)) {
        var d = Object.getOwnPropertyDescriptor(o, p)
        if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
            if(!set.has(d.value))
                set.add(d.value), objects.push(d.value);
        if( d.get )
            if(!set.has(d.get))
                set.add(d.get), objects.push(d.get);
        if( d.set )
            if(!set.has(d.set))
                set.add(d.set), objects.push(d.set);
    }
}
```

### 特殊行为的对象
> https://tc39.es/ecma262/#sec-immutable-prototype-exotic-objects [以下内容参考9.4章节]

- 对象Array/String/Arguments, 拥有下标 length 属性
- 外来对象不可改变Object.prototype
```
Object.prototype = { a: 1 } // 代码不生效
// 上面的代码对Object.prototype 进行重新赋值，是不生效的
Object.prototype.a = 1 // 代码生效
``` 
-  Bound Function Exotic Objects
bind 后的 function，他的 caller 会一直指向 bind 的对象，需注意bind的首参会被转化为Object(argument)
```
function test() { console.log(this) }
test() // { ...window }
var bindObj = test.bind({a: 1})
bindObj() // {a:1}
var bindNull = test.bind(null)
bindNull() // {}
var bindNum = test.bind(1)
bindNum() // Number{1}
```
- Module Namespace Exotic Objects
模块的 namespace 对象：我理解这是用来模块化操作的，常用的import, require。winter推荐只使用 import。
- Integer-Indexed Exotic Objects 【这一块没搞清楚场景】
类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊

###### 参考资料
- [文章：javascript的三大对象](https://segmentfault.com/a/1190000011467723#item-3)
- [javascript 标准内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)
- [webAPI](https://developer.mozilla.org/zh-CN/docs/Web/API)