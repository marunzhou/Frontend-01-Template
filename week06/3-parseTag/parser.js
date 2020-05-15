/*
 * @Description: 解析标签
 * @Author: 马润洲
 * @Date: 2020-05-15 08:27:17
 * @LastEditTime: 2020-05-15 09:35:09
 * @LastEditors: 马润洲
 */
// 状态机结束
const EOF = Symbol('EOF') // EOF： end of file
// 状态机-起始方法
function data(c) {
   if (c === '<') {
      return tagOpen(c)
   } else if (c === EOF) {
      // 返回dom对象
   } else {
      return data;
   }
}

// < 开始标签
// /|> 闭合标签
function tagOpen(c) {
   // 标签名的开始
   if (c.match(/[a-zA-Z]/)) {
      return tagName(c)
   }
}

function tagName(c) {
   // 属性的开始
   if (c.match(/[\s\t\f]/)) {
      return beforeAttributeName(c)
   } else if (c === '>' || c === '/') {
      return endTagOpen(c)
   } else {
      return tagName(c)
   }
}
// 标签结束
function endTagOpen(c) {
   if (c === '/') {
      return endTagOpen(c)
   } else if (c === '>') {
      return data(c)
   }
}

function beforeAttributeName(c) {
   if (c.match(/[a-zA-Z_\-]/)) {
      return beforeAttributeName(c)
   }
}

function selfClosingStartTag(c) {
   
}


module.exports.parseHTML = function parseHTML(html) {
   let state = data
   
   for (let c of html) {
      state = state(c)
   }

   state = state(EOF)
}