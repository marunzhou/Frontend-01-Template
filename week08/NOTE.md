# css

## At-rule
at-rule 由一个 @ 关键字和后续的一个区块组成，如果没有区块，则以分号结束
## qualified rule
qualified rule 主要是由选择器和声明区块构成。声明区块又由属性和值构成

## css-选择器
![选择器](https://static001.geekbang.org/resource/image/8b/7c/8bdd0a249ab1dbf8b854b2decd7eb87c.png)

## css-优先级算法

四个维度： [行内, id, class, tagName]

## css-单位

- CSS 范围的关键字：initial，unset，inherit，任何属性都可以的关键字。
- 字符串：比如 content 属性。
- URL：使用 url() 函数的 URL 值。
- 整数 / 实数：比如 flex 属性。
- 维度：单位的整数 / 实数，比如 width 属性。
- 百分比：大部分维度都支持。
- 颜色：比如 background-color 属性。
- 图片：比如 background-image 属性。
- 2D 位置：比如 background-position 属性。
- 函数：来自函数的值，比如 transform 属性。

CSS 支持一批特定的计算型函数
- calc()
- max()
- min()
- clamp()
- toggle()
- attr()

## match方法

```
function match(selector, element) {
    if (!selector || !element.attributes ) return false
    let selectors = []
    let res = true
    selector.split(' ').reverse().forEach(item => {
        selectors.push(matchSelector(item))
    });

    for (let i = 0; i < selectors.length; i++) {
        if (!res) break
        let item = selectors[i]
        for (let p in item) {
            if (item[p].length === 0) continue
            if (p === 'tagName' && !item[p].includes(element.tagName)) {
                res = false
                break
            } else if (!item[p].every(val => element.attributes.class.value.split(' ').includes(val))) {
                res = false
                break
            }
        }
    }

    console.log(res)
    return res;
}

// 将selector转化为 { tagName, class, id }
function matchSelector(selector) {
    const regs = {
        tagName: /^[\w]+/,
        class: /\.([\w\d-])+/g,
        id: /\#[\w\d-]+/g
    }
    const res = {
        tagName: [],
        class: [],
        id: []
    }

    for (let p in regs) {
        let match = selector.match(regs[p])
        if (Array.isArray(match)) {
            match.forEach((item, index) => {
                match[index] = item.replace(/^[\.\#]/, '')
            })
            res[p] = match
        }
    }
    console.log(res)

    return res
}

match("div #id.class", document.getElementById("id"));
```