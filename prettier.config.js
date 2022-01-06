/*
 * @Description: 
 * @Author: Lx
 * @Date: 2021-07-16 14:40:57
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-26 18:17:01
 */
module.exports = {
  printWidth: 150, // 一行最多 100 字符
  tabWidth: 2, // 使用 2 个空格缩进
  useTabs: false, // 不使用缩进符，而使用空格
  semi: false, // 行尾需要有分号
  vueIndentScriptAndStyle: false, // 对Vue文件中<script>和<style>标签内的代码进行缩进
  singleQuote: true, // 单引号
  quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
  bracketSpacing: true, // 大括号内的首尾需要空格
  trailingComma: 'none', // 未尾分号
  jsxBracketSameLine: false,
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  arrowParens: 'avoid', // 箭头函数，只有一个参数的时候，是否需要括号
  insertPragma: false, // 使用默认的折行标准
  requirePragma: false,
  proseWrap: 'never', // 使用默认的折行标准
  htmlWhitespaceSensitivity: 'strict', // 根据显示样式决定 html 要不要折行
  endOfLine: 'lf', // 换行符使用 lf
  rangeStart: 0 // 每个文件格式化的范围是文件的全部内容
}
