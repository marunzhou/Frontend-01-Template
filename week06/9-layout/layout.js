function getStyle(element) {
    if (!element.style) element.style = {}

    for (let prop in element.computedStyle) {
        let value = element.computedStyle[prop].value
        element.style[prop] = element.computedStyle[prop].value
        
        if (value.toString().match(/px$/) || value.toString().match(/[0-9.]+$/)) {
            element.style[prop] = parseInt(value)
        }
    }

    return element.style
}

function layout (element) {
    if (!element.computedStyle) return

    let elementStyle = getStyle(element)

    if (elementStyle.dispaly !== 'flex') return

    var items = element.children.filter(e => e.type === 'element')

    items.sort(function (a, b) {
        return (a.order || 0) - (b.order || 0)
    })

    let style = elementStyle

    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null
        }
    })

    if (!style.flexDirction || style.flexDirction === 'auto') {
        style.flexDirction = 'row'
    }
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch'
    }
    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start'
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap'
    }
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch'
    }

    var mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase
    
    // flexDircition
    if (style.flexDirction === 'row') {
        mainSize = 'width'
        mainStart = 'left'
        mainEnd = 'right'
        mainSign = +1
        mainBase = 0

        crossSize = 'height'
        crossStart = 'top'
        crossEnd = 'bottom'
    }
    if (style.flexDirction === 'row-reverse') {
        mainSize = 'width'
        mainStart = 'right'
        mainEnd = 'left'
        mainSign = -1
        mainBase = style[mainSize]

        crossSize = 'height'
        crossStart = 'top'
        crossEnd = 'bottom'
    }
    if (style.flexDirction === 'column') {
        mainSize = 'height'
        mainStart = 'top'
        mainEnd = 'bottom'
        mainSign = +1
        mainBase = 0

        crossSize = 'width'
        crossStart = 'left'
        crossEnd = 'right'
    }
    if (style.flexDirction === 'colunm-reverse') {
        mainSize = 'height'
        mainStart = 'bottom'
        mainEnd = 'top'
        mainSign = -1
        mainBase = style[mainSize]

        crossSize = 'width'
        crossStart = 'left'
        crossEnd = 'right'
    }

    // flexWrap https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
    if (style.flexWrap === 'wrap-reverse') { // 换行且反转
        let tmp = crossStart
        crossStart = crossEnd
        crossEnd = tmp
        crossSign = -1
    } else {
        crossBase = 0
        crossSign = +1
    }

    // isAutoMainSize
    var isAutoMainSize = false
    if (!style[mainSize]) {
        elementStyle[mainSize] = 0

        for (let i = 0; i < items.length; i++) {
            // let item = items[i]
            let itemStyle = getStyle(item[i])
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] != (void 0)) {
                elementStyle[mainSize] += itemStyle[mainSize]
            }
        }

        isAutoMainSize = true
    }

    

}
module.exports = layout