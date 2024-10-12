# React 双缓冲机制

## 双缓冲机制概念

React 双缓存机制指的是同时维护两棵虚拟 DOM 树（Fiber 树），即 current 树和 workInProgress 树，以优化渲染性能。

- current 树：代表当前屏幕上显示的内容的 Fiber 树，它是上一次渲染周期的结果。
- workInProgress 树：在内存中构建的新 Fiber 树，包含即将渲染的内容。在这棵树上，React 会进行新的渲染工作，包括对新 props 和 state 的处理，以及可能的 DOM 更新。

## 工作原理

**1.初始化**

当 React 应用启动时，它会创建一棵 Fiber 树，这棵树代表了当前屏幕上显示的内容。这棵树被称为 current 树。

**2.开始新的渲染周期**

当组件的状态发生变化时，React 会开始一个新的渲染周期。这时，它不会直接在 current 树上进行修改，而是创建一棵新的 Fiber 树，这棵树被称为 workInProgress 树。

**3.构建 workInProgress 树**

在workInProgress树上，React会根据新的props和state来计算出新的虚拟DOM。这个过程可能会涉及到对子组件的递归处理。

**4.比较和更新**

React会比较workInProgress树和current树的不同，然后计算出需要更新的最小集合。这个过程被称为“diffing”。

**5.提交更改**

当workInProgress树构建完成后，React会将这些更改提交到真实的DOM上。这个过程被称为“commit”阶段。

**6.切换角色**

一旦workInProgress树上的更改被提交，它就会成为新的current树，而原来的current树则会被丢弃。

**7.中断和恢复**

如果在构建workInProgress树的过程中，JavaScript线程变得繁忙，React可以选择暂停渲染工作，优先处理用户的交互事件。当线程空闲时，React可以从中断的地方恢复渲染工作。
