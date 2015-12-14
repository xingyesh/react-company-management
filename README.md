# react-company-management
It main use react,redux, material-ui, jquery(ajax,well be removed). webpack,babel,gulp build the project.

1. enviroment nodejs，npm。
2. npm install -g gulp
3. npm install。
4. gulp。build file and visit localhost:8000。

目前已知问题
   1.gulp 增加 dev，product 环境
   2.redux管理state，state还需要重构优化，应该把company 里面的几个重要的属性全部拆出来
   3.组件还能够继续重构细化
   4.在每个组件的 shouldComponentUpdate方法  增加 props判断，减少不必要的判断
   5.增加react-router，增加按需加载
   6.把jquery移除，使用fetch或者其他的方式处理ajax请求
