src(下层文件夹不能引用上层文件夹)

- `pages` 放组合而成的，页面、页面级组件（具有业务相关的数据）CSS 优先级：id 级
- `components` 可复用的业务代码的碎片（给基础组件加了样式或与业务相关的逻辑）
- `baseUI` 通用组件（基础组件）CSS 优先级：class 级
- `tools` 自定义工具，如 eventBus、uuid
- `helper` 有副作用的函数 （内部会有 hooks 版本，以供随意使用）
- `utils` 纯函数，操作 JS 变量用

组件css属性传递的是组件根节点上的样式