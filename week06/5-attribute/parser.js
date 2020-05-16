/*
 * @Description: 解析标签
 * @Author: 马润洲
 * @Date: 2020-05-15 08:27:17
 * @LastEditTime: 2020-05-16 15:27:50
 * @LastEditors: 马润洲
 */
// 状态机结束
const EOF = Symbol('EOF') // EOF： end of file
let currentToken = null
let currentAttribute = null

function emit(token) {
   // if (token.type != 'text') {
      console.log(token)
   // }
}
// 状态机-起始方法
function data(c) {
   if (c === '<') {
      return tagOpen
   } else if (c === EOF) {
      // 返回dom对象
      emit({
         type: "EOF"
      })
      return ;
   } else {
      emit({
         type: "text",
         content: c
      })
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
      currentToken = {
         type: 'startTag',
         tagName: ''
      }
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
   if (c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName
   } else if (c === '/') {
      return selfClosingStartTag
   } else if (c.match(/^[a-zA-Z]$/)) {
      currentToken.tagName += c//.toLowerCase()
      return tagName
   } else if (c === '>') {
      // 标签名获取结束
      emit(currentToken)
      return data
   } else {
      return tagName
   }
}

function beforeAttributeName(c) {
   if (c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName
   } else if (c === '/' || c === '>' || c === EOF) {
      return afterAttributeName(c)
   } else if (c === '=') {
      
   } else {
      currentAttribute = {
         name: '',
         value: ''
      }
      return attributeName
   }
}

// 处理属性名
function attributeName(c) {
   // / 自闭合标签; > 闭合标签
   if (c.match(/^[\t\n\f ]$/) || c === '/' || c == '>' || c == EOF) {
      return afterAttributeName(c)
   } else if (c === '=') {
      return beforeAttributeValue
   } else if (c == "\u0000") { // 这是空格 " "

   } else if (c == "\"" || c == "'" || c == "<") {
   } else {
      currentAttribute.name += c
      return attributeName
   }
}
function beforeAttributeValue(c) {
   if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c == EOF) {
      return beforeAttributeValue
   } else if (c === '"') {
      return doubleQuoteAttributeValue
   } else if (c === "\'") {
      return singleQuoteAttributeValue
   } else if (c === '>') {
      
   } else {
      return unquoteAttributeValue(c)
   }
}
function doubleQuoteAttributeValue(c) {
   if (c === "\"") {
      currentToken[currentAttribute.name] = currentAttribute.value
      return afterQuoteAttributeValue
   } else if (c == "\u0000") {

   } else if (c === EOF) {

   } else {
      currentAttribute.value += c
      return doubleQuoteAttributeValue
   }
}
function singleQuoteAttributeValue(c) {
   if (c === "\'") {
      currentToken[currentAttribute.name] = currentAttribute.value
      return afterQuoteAttributeValue
   } else if (c == "\u0000") {

   } else if (c === EOF) {

   } else {
      currentAttribute.value += c
      return singleQuoteAttributeValue
   }
}
function afterQuoteAttributeValue(c) {
   if (c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName
   } else if (c === '/') {
      return isSelfClosing
   } else if (c === '>') {
      currentToken[currentAttribute.name] = currentAttribute.value
      emit(currentToken)
      return data
   } else if (c === EOF) {

   } else {
      currentAttribute.value += c
      return doubleQuoteAttributeValue
   }
}
function unquoteAttributeValue(c) {
   if (c.match(/^[\t\n\f ]$/)) {
      currentToken[currentAttribute.name] = currentAttribute.value
      return beforeAttributeName
   } else if (c === '/') {
      currentToken[currentAttribute.name] = currentAttribute.value
      return isSelfClosing
   } else if (c === '>') {
      currentToken[currentAttribute.name] = currentAttribute.value
      emit(currentToken)
      return data
   } else if (c == "\u0000") {

   } else if (c === "\"" || c === "\'" || c === "<" || c === "=" || c === "`") {

   } else if (c === EOF) {

   } else {
      currentAttribute.value += c
      return unquoteAttributeValue
   }
}

function attributeValue(c) {}

function afterAttributeName(c) {
   if (c.match(/^[\t\n\f ]$/) || c === '/' || c == EOF) {
      return attributeName
   } else if ( c === '>') {
      return data
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
      console.log(state, c)
      state = state(c)
   }

   state = state(EOF)
}