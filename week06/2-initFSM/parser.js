/*
 * @Description: 初始化一个状态机
 * @Author: 马润洲
 * @Date: 2020-05-15 08:27:17
 * @LastEditTime: 2020-05-15 08:53:49
 * @LastEditors: 马润洲
 */
// 状态机结束
const EOF = Symbol('EOF') // EOF： end of file
// 状态机-起始方法
function data(c) {
   
}

module.exports.parseHTML = function parseHTML(html) {
   let state = data
   
   for (let c of html) {
      state = state(c)
   }

   state = state(EOF)
}