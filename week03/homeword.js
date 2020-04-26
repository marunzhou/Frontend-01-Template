function converStringToNumber(str, x = 10) {
    var strArr = str.split('')
    var number = 0, fraction = 1, i = 0, len = strArr.length, sign = 1
    // 符号部分 +-
    if (["+", "-"].includes(strArr[0])) {
        i++
        sign = strArr[0] === '-' ? -1 : 1
    }
    // 整数部分
    while(i < len && strArr[i] != '.') {
        number = number * x
        number += strArr[i].codePointAt(0) - "0".codePointAt(0)
        i++
    }
    // 小数部分
    if (strArr[i] === '.') {
        i++

        while(i < len) {
            fraction = fraction / x
            // console.log(number, fraction)
            number += (strArr[i].codePointAt(0) - "0".codePointAt(0)) * fraction
            i++
        }
    }
    
    console.log(number * sign)
    return number * sign
}
converStringToNumber("0")
converStringToNumber("100")
converStringToNumber("-100")
converStringToNumber("01.101")
converStringToNumber("100.0123")

console.log('_____________converNumberToString___________')

function converNumberToString(number, x = 10) {
    var initeger = Math.floor(Math.abs(number))
    var fraction = parseFloat((number - initeger).toFixed(10))
    var sign = Math.sign(number)
    var string = ''
    
    if (number === 0) {
        return string += number
    }
    while (initeger > 0) {
        string = initeger % x + string
        initeger = Math.floor(initeger / x)
    }
    if (fraction > 0) {
        string += '.'
        while(fraction > 0) {
            string += Math.floor(fraction * 10)
            fraction = parseFloat((fraction * x - Math.floor(fraction * x)).toFixed(10))
        }
    }
    console.log(sign === -1 ? '-' + string : string)
    return sign === -1 ? '-' + string : string
}
converNumberToString(100.0211)
converNumberToString(-1)
console.log(converNumberToString(0))