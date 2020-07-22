# 本周学习单文件组件
## 尝试用sfc的方式实现组件化
### 如何写一个自己的单文件组件
#### loader编写
* 1、webpack配置
```js
module: {
        rules: [
            { 
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [[
                            "@babel/plugin-transform-react-jsx",
                            {pragma:"createElement"}
                        ]]
                    }
                }
            },
            {
                test: /\.view$/,
                use:{
                    loader: require.resolve("./myloader3.js")
                }
            }
        ]
    },
```
* 2、写一个入门loader
```js
// myloader
module.exports = function (source, map) {
    console.log("my loader is running!!!!!!!!!!!\n",this.resourcePath);
    return "";
}

//index.html
<body></body>
<script src="./main.js"></script>

//main.js
import {Carousel} from "./carousel.view"

//carousel.view
<template>
    <div>
        <img />
    </div>
</template>
<script>
export default {
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      let i = 1;
      while(i < 100) {
          i ++;
      }
      return this.message.split('').reverse().join('')
    }
  }
}
</script>
<style></style>
```
再回顾下前面学过的parser,parser的作用是什么？
parser就是解析html、css及js文件内的内容，最终形成一个dom树
// html里面如何处理<   

// parser的 作用就是解析view文件里的字符串



# 动画
### 先从一个动画示例说起
```js
<style>
    #el {
        width: 100px;
        height: 100px;
        background-color: skyblue;

    }
</style>
<div id="el"></div>
<script>
    let el = document.getElementById("el")
    el.style.transition = "ease 5s";

    function start(){
        el.style.transform = "translate(300px,300px)"
    }

    function stop() {
        el.style.transition = "none";
        el.style.transform = getComputedStyle(el).transform
    }

</script>
```
这个示例需要手动执行stop，这个示例就是要实现一个动画停止功能


```js
export class TimeLine {
    constructor(){
        this.animation = []
    }

    tick() {
        console.log("tick")
        requestAnimationFrame(() => this.tick())
    }

    start() {
        this.tick()
    }

    add(animation) {
        this.animation.push()
    }
}
```


## timingFunction
以time为入参，以progression为出参的函数值