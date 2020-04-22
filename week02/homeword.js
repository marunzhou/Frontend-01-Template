// 写一个正则表达式 匹配所有 Number 直接量
/**
    StringNumericLiteral ::: See 9.3.1
        StrWhiteSpaceopt
        StrWhiteSpaceopt StrNumericLiteral StrWhiteSpaceopt
    StrWhiteSpace ::: See 9.3.1
        StrWhiteSpaceChar StrWhiteSpaceopt
    StrWhiteSpaceChar ::: See 9.3.1
        WhiteSpace
        LineTerminator
    StrNumericLiteral ::: See 9.3.1
        StrDecimalLiteral
        HexIntegerLiteral
    StrDecimalLiteral ::: See 9.3.1
        StrUnsignedDecimalLiteral
        + StrUnsignedDecimalLiteral
        - StrUnsignedDecimalLiteral
    StrUnsignedDecimalLiteral ::: See 9.3.1
        Infinity
        DecimalDigits . DecimalDigitsopt ExponentPartopt
        . DecimalDigits ExponentPartopt
        DecimalDigits ExponentPartopt
    DecimalDigits ::: See 9.3.1
        DecimalDigit
        DecimalDigits DecimalDigit
    DecimalDigit ::: one of See 9.3.1
        0 1 2 3 4 5 6 7 8 9
    ExponentPart ::: See 9.3.1
        ExponentIndicator SignedInteger
    ExponentIndicator ::: one of See 9.3.1
        e E
    SignedInteger ::: See 9.3.1
        DecimalDigits
        + DecimalDigits
        - DecimalDigits
    HexIntegerLiteral ::: See 9.3.1
        0x HexDigit
        0X HexDigit
        HexIntegerLiteral HexDigit
    HexDigit ::: one of See 9.3.1
        0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F
 */

function isNumber(str) {
    // (\+\-|\-\+|\+|\-)? 正负
    // (\d+)?(.\d*)?([e|E](\+)?(\d*))? 匹配十进制，数字，浮点数， e, 
    // (\d+)? 可能不输入小数点左位数
    // 0x[0-9a-fA-F]+ 匹配十六进制数
    var res = /^(\s)*((\+\-)*|(\-\+)*|\+|\-)?((\d+)?(.\d*)?([e|E](\+)?(\d*))?|0x[0-9a-fA-F]+|Infinity)(\s)*$/.test(str)
    console.log(str, res)
    return res
}
var numberArr = ["1", ".1", "1.1", "1.1e1", "1.1e+1", "0xff12"]
var symbolArr = ['+', '-', '+-', '-+', '+-+-', '-+-+']
for(var val of numberArr) {
    symbolArr.map(str => {
        isNumber(str + val)
        isNumber('  ' + str + val + ' ')
    })
    isNumber("Infinity")
    isNumber(" Infinity ")
}

// 写一个 UTF-8 Encoding 的函数
function strToUtf8Encoding(text) {
    var encdoeStr = encodeURIComponent(text)
    var bytes = []

    for (var i = 0; i < encdoeStr.length; i++) {
        var str = encdoeStr[i]
        if (str === '%') {
            var hex = encdoeStr.slice(i + 1, i + 3)
            bytes.push(parseInt(hex, 16))
            i += 2
        } else {
            bytes.push(str.charCodeAt(0))
        }
    }

    return bytes
}

function decodeUtf8(text) {
    var encode = ""
    for (var i = 0; i < text.length; i++) {
        encdoe += '%' + text[i].toString(16)
    }

    return decodeURIComponent(encode)
}

// 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
/*
StringLiteral ::
    " DoubleStringCharactersopt "
    ' SingleStringCharactersopt '
DoubleStringCharacters ::
    DoubleStringCharacter DoubleStringCharactersopt
SingleStringCharacters ::
    SingleStringCharacter SingleStringCharactersopt
DoubleStringCharacter ::
    SourceCharacter but not one of " or \ or LineTerminator
    \ EscapeSequence
    LineContinuation
SingleStringCharacter ::
    SourceCharacter but not one of ' or \ or LineTerminator
    \ EscapeSequence
    LineContinuation
LineContinuation ::
    \ LineTerminatorSequence
EscapeSequence ::
    CharacterEscapeSequence
    0 [lookahead  DecimalDigit]
    HexEscapeSequence
    UnicodeEscapeSequence
CharacterEscapeSequence ::
    SingleEscapeCharacter
    NonEscapeCharacter
SingleEscapeCharacter :: one of
    ' " \ b f n r t v
NonEscapeCharacter ::
    SourceCharacter but not one of EscapeCharacter or LineTerminator
EscapeCharacter ::
    SingleEscapeCharacter
    DecimalDigit
    x
    u
HexEscapeSequence ::
    x HexDigit HexDigit
UnicodeEscapeSequence ::
    u HexDigit HexDigit HexDigit HexDigit
*/
// 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
function matchString(text) {
    // [^\"\n\r\u2028\u2029]
    // \(?:[\'\"\b\f\n\r\t\v\n\r\u2028\u2029]|\r\n)
    // \\x[0-9a-fA-F]{2} 匹配编码
    // \\u[0-9a-fA-F]{4} 匹配 Unicode 值
    // \\[^0-9ux\'\"\b\f\n\r\t\v\n\r\u2028\u2029]
    var reg = new RegExp("(?:[^\"\n\r\u2028\u2029]|\(?:[\'\"\b\f\n\r\t\v\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux\'\"\b\f\n\r\t\v\n\r\u2028\u2029])*")
    
    return text.match(reg)
}
