/*
 * @Description: 查找 abababx
 * @Author: 马润洲
 * @Date: 2020-05-15 11:45:01
 * @LastEditTime: 2020-05-15 16:26:26
 * @LastEditors: 马润洲
 */

function start (c) {
    if (c === 'a') {
        return foundA1
    }
}

function foundA1(c) {
    if (c === 'b') {
        return foundB1
    }
}
function foundB1(c) {
    if (c === 'a') {
        return foundA2
    }
}
function foundA2(c) {
    if (c === 'b') {
        return foundB2
    }
}
function foundB2(c) {
    if (c === 'a') {
        return foundA3
    }
}
function foundA3(c) {
    if (c === 'b') {
        return foundB3
    }
}
function foundB3(c) {
    if (c === 'x') {
        return foundX
    }
}
function foundX(c) {    
    return end()
}
function end() {
    return true
}
// abababx
function matchStr(str) {
    let state = start
    // state('c')
    for (let c of str) {
        state = state(c)
    }

    return state()
}
console.log(matchStr('abababx'))