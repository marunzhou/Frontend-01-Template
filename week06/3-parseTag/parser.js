/*
 * @Description: 解析标签
 * @Author: 马润洲
 * @Date: 2020-05-15 08:27:17
 * @LastEditTime: 2020-05-16 11:16:53
 * @LastEditors: 马润洲
 */
// 状态机结束
const EOF = Symbol('EOF') // EOF： end of file
let currentToken = null

// 状态机-起始方法
function data(c) {
   if (c === '<') {
      return tagOpen
   } else if (c === EOF) {
      // 返回dom对象
      return ;
   } else {
      return data;
   }
}

// < 开始标签
// /[a-zA-Z]> 开始标签
// /> 自闭合标签
function tagOpen(c) {
   if (c === '/') {
      return endTagOpen
   } else if (c.match(/[a-zA-Z]/)) {
      return tagName(c)
   }
}

// 标签结束
function endTagOpen(c) {
   if (c.match(/^[a-zA-z]$/)) {
      currentToken = {
         type: 'endTag',
         tagName: ""
      }
      return tagName(c)
   } else if (c === '>') {
      return data(c)
   } else if (c === EOF) {

   } else {
      
   }
}

function tagName(c) {
   // 属性的开始
   if (c.match(/^[\t\n\f]$/)) {
      return beforeAttributeName
   } else if (c === '/') {
      return selfClosingStartTag
   } else if (c.match(/^[a-zA-Z]$/)) {
      return tagName
   } else if (c === '>') {
      return data
   } else {
      return tagName
   }
}

function beforeAttributeName(c) {
   if (c.match(/^[\t\n\f]$/)) {
      return beforeAttributeName
   } else if (c === '>') {
      return data
   } else if (c === '=') {
      return beforeAttributeName
   } else {
      return beforeAttributeName
   }
}

function selfClosingStartTag(c) {
   if (c === '>') {
      currentToken.isSelfClosing = true
      return data
   } else if (c === EOF) {

   } else {

   }
}


module.exports.parseHTML = function parseHTML(html) {
   let state = data
   
   for (let c of html) {
      state = state(c)
   }

   state = state(EOF)
}