/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always', // Kiểm tra và đóng các thẻ HTML void (không có nội dung) dưới dạng tự đóng (ví dụ: <br />)
          normal: 'always', // Kiểm tra và đóng các thẻ HTML thông thường (có nội dung) dưới dạng tự đóng (ví dụ: <div />)
          component: 'always' // Kiểm tra và đóng các thẻ Vue component dưới dạng tự đóng (ví dụ: <TasksPage />)
        },
        svg: 'always', // Kiểm tra và đóng các thẻ SVG dưới dạng tự đóng (ví dụ: <svg />)
        math: 'always' // Kiểm tra và đóng các thẻ MathML dưới dạng tự đóng (ví dụ: <math />)
      }
    ],
    'vue/no-setup-props-destructure': 'off'
    // Các luật khác
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
