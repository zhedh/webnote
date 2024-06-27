# React 组件通信

在 React 中，组件之间的通信是非常重要的，它允许不同的组件能够相互交换数据和事件。

## React 组件通信方式

- Props & Callback Functions: 这是最常用的通信方式，父组件通过 props 将数据传递给子组件，子组件通过 props 访问这些数据；子组件通过调用从父组件传递下来的回调函数来与父组件通信。

- Context: 对于那些不直接相关的组件，可以使用 Context API 来共享状态，避免通过多层级的 props 传递。

- Redux: 对于大型应用，通常会使用 Redux 这样的状态管理库来集中管理应用的状态，并通过 connect 函数将状态映射到 React 组件。

- Portals: 使用 Portals 可以将子树渲染到父组件 DOM 树的不同位置，这也可以用于组件间的通信。

- Global Variables: 虽然不推荐，但也可以通过全局变量或内存变量来实现组件间的通信。

- Event Bubbling: 在 React 中，可以使用合成事件系统来实现事件的冒泡，从而在不同层级的组件之间传递事件。

- JS 自定义事件: 在 React 中，可以使用 JS 自定义事件，实现跨组件通信。

- Observer Pattern: 观察者模式可以用来实现组件间的通信，当一个组件的状态发生变化时，其他组件可以得到通知并作出响应。

- 消息订阅与发布: 类似于观察者模式，可以实现一个消息中心，组件可以订阅感兴趣的消息并在消息发布时收到通知。

### 1. Props & Callback

在 React 中，props 是实现组件间通信的一种基本方式，主要用于父组件向子组件传递数据。props 是组件的输入，它们是单向流动的，即从父组件流向子组件。

**父组件传递数据给子组件**

```jsx
// 父组件
function ParentComponent() {
  const message = 'Hello, World!'

  return <ChildComponent message={message} />
}

// 子组件
function ChildComponent(props) {
  return <p>{props.message}</p>
}
```

在这个例子中，ParentComponent 通过 message 属性向 ChildComponent 传递了一个字符串。ChildComponent 通过其 props 对象接收这个字符串，并将其渲染出来。

**子组件触发父组件中的函数**

```jsx
// 父组件
function ParentComponent() {
  const [count, setCount] = React.useState(0)

  const incrementCount = () => {
    setCount(count + 1)
  }

  return <ChildComponent increment={incrementCount} />
}

// 子组件
function ChildComponent(props) {
  return <button onClick={props.increment}>Increment</button>
}
```

在这个例子中，ParentComponent 定义了一个 incrementCount 函数，该函数用于更新状态 count。然后，它通过 increment 属性将这个函数传递给 ChildComponent。ChildComponent 在其按钮的点击事件处理器中调用这个函数，从而使得父组件的状态得以更新。

### 2.使用 Context API

Context API 提供了一种在组件树之间共享值的方式，无需通过每个组件手动传递 props。这对于全局数据（如当前认证用户、主题或首选语言）尤其有用。

以下是如何使用 Context API 来实现组件间通信的基本步骤：

**创建 Context：**

首先，你需要使用 React.createContext() 创建一个 Context 对象。

```javascript
const MyContext = React.createContext(defaultValue)
```

defaultValue 是当组件树中的组件没有匹配到 Provider 时使用的值。

**提供 Context 数据：**

然后，使用 Context 对象的 Provider 组件包裹你的组件树。你可以在 Provider 的 value 属性中传递想要共享的数据。

```javascript
function MyProviderComponent({ children }) {
  const [value, setValue] = useState('some value')

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  )
}
```

**消费 Context 数据：**
在需要访问 Context 数据的组件中，你可以使用 Context 对象的 Consumer 组件或者 useContext Hook。

使用 Consumer：

```javascript
function MyConsumerComponent() {
  return (
    <MyContext.Consumer>
      {({ value, setValue }) => (
        <div>
          Value: {value}
          <button onClick={() => setValue('new value')}>Change Value</button>
        </div>
      )}
    </MyContext.Consumer>
  )
}
```

使用 useContext Hook：

```javascript
import React, { useContext } from 'react'

function MyFunctionalComponent() {
  const { value, setValue } = useContext(MyContext)

  return (
    <div>
      Value: {value}
      <button onClick={() => setValue('new value')}>Change Value</button>
    </div>
  )
}
```

这样，你就可以在组件树中的任何地方通过 Context API 来共享和使用数据了。记住，当你使用 useContext Hook 时，React 会在组件重新渲染时自动订阅 context 的变化，所以你不需要担心订阅或取消订阅 context。

### 3.使用 Redux 状态管理库

Redux Toolkit（RTK）是官方推荐的 Redux 工具集，它简化了 Redux 的使用，并提供了一种更现代的方式来使用 Redux。以下是使用 Redux Toolkit 实现组件通信的基本步骤：

**安装 Redux Toolkit：**

在项目中安装 Redux Toolkit。

```bash
npm install @reduxjs/toolkit react-redux
```

**创建 Slice：**

Slice 是 Redux Toolkit 中的一个新概念，它是一个包含 Reducer、Actions 和 Hooks 的逻辑单元。

```javascript
// counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
```

**配置 Store：**

使用 configureStore 函数来配置 Store，它会自动合并你的 slice reducers。

```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export default store
```

**连接 React 和 Redux：**

使用 Provider 组件将 Redux Store 提供给 React 应用。

```jsx
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

**在组件中使用 Redux：**

使用 useSelector 钩子来读取状态，使用 useDispatch 钩子来分发 Actions。

```jsx
// Counter.js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './counterSlice'

function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}

export default Counter
```

通过以上步骤，你已经使用 Redux Toolkit 在 React 应用程序中实现了组件间的通信。现在，当你点击"Increment"或"Decrement"按钮时，计数器的值会相应地增加或减少，因为 Counter 组件通过 Redux Store 接收到了状态更新。

### 4.使用 Portals 简化组件间的通信

在 React 中，Portals 提供了一种将子节点渲染到父组件 DOM 树之外的 DOM 节点的功能。尽管 Portals 本身并不是为了组件间通信而设计的，但它们可以用来在某些情况下简化组件间的通信。

例如，如果你的应用中有一个模态框（Modal）组件，你可能希望将其渲染到 body 标签下，以便它能够覆盖在其他内容之上。这时，你可以使用 Portals 来实现这一点。同时，由于模态框通常需要与应用的其他部分进行交互（例如关闭模态框），Portals 可以帮助你在不改变组件层次结构的情况下实现这种交互。

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.body
  )
}

const App = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && (
        <Modal>
          <div>
            <p>This is a modal!</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default App
```

在这个例子中，Modal 组件使用 ReactDOM.createPortal 将内容渲染到 body 标签下。尽管 Modal 的内容在 DOM 结构上不在 App 组件的直接子节点中，但它仍然能够接收来自 App 组件的状态更新，因为它们共享相同的 React 上下文。

然而，对于更复杂的组件间通信需求，建议使用专门的状态管理库，如 Redux 或 MobX，或者使用 React 的 Context API 来传递数据。这些方法提供了更强大和灵活的方式来管理和共享应用的状态。

### 5.使用全局变量、内存变量

在 React 中，虽然不推荐频繁使用全局变量和内存变量来进行组件通信，但在某些特定场景下，这些方法仍然可以被用来实现组件间的状态共享。

**使用全局变量**

全局变量可以在应用的任何地方被访问和修改，因此可以用来在不同组件间共享状态。但是，这种方法容易导致状态难以追踪和维护，尤其是在大型应用中。

```jsx
// 在应用的入口文件中定义全局变量
window.appState = {
  sharedValue: 'initial value',
}

// 在组件A中读取全局变量
function ComponentA() {
  const sharedValue = window.appState.sharedValue
  return <div>{sharedValue}</div>
}

// 在组件B中修改全局变量
function ComponentB() {
  const handleClick = () => {
    window.appState.sharedValue = 'new value'
  }
  return <button onClick={handleClick}>Change Value</button>
}
```

**使用内存变量**

内存变量指的是在组件外部声明的变量，它们可以在组件间共享状态，但同样存在难以追踪和维护的问题。

```jsx
// 在组件外部声明内存变量
let sharedValue = 'initial value'

// 在组件A中读取内存变量
function ComponentA() {
  return <div>{sharedValue}</div>
}

// 在组件B中修改内存变量
function ComponentB() {
  const handleClick = () => {
    sharedValue = 'new value'
  }
  return <button onClick={handleClick}>Change Value</button>
}
```

**注意**

尽管全局变量和内存变量在某些情况下可以用于组件通信，但它们并不推荐作为主要的通信方式。这是因为它们违反了 React 的单向数据流原则，并且可能导致状态难以追踪和维护。在大多数情况下，应该优先考虑使用 React 的 Context API、状态管理库（如 Redux）或者事件总线等更合适的方法来实现组件间的通信。

### 6.使用事件冒泡

在 React 中，可以使用合成事件系统来实现事件的冒泡，从而在不同层级的组件之间传递事件。

示例如下：

```jsx
const Son = () => {
  return <button>点击</button>
}

const Father = () => {
  const sayName = (name) => {
    console.log(name)
  }
  return (
    <div onClick={() => sayName('Jack')}>
      <Son />
    </div>
  )
}

export default Father
```

#### Q&S

**为什么 React 不推荐使用事件冒泡通信？**

- 可读性和可维护性：
  使用事件冒泡进行组件通信可能会导致代码的可读性和可维护性降低。事件冒泡使得事件的监听和处理分散在不同的组件中，这使得追踪事件流和理解组件间的交互变得更加困难。
- 命名空间污染：
  当多个组件或库都使用事件冒泡来进行通信时，可能会出现命名冲突。这是因为所有的事件监听器都是在同一个全局命名空间下注册的，这可能导致意外的行为或难以调试的错误。
- 性能问题：
  大量使用事件冒泡可能会导致性能问题。每次事件冒泡都会导致事件监听器被调用，如果监听器数量很多或者处理逻辑复杂，可能会影响应用的响应速度。
- 跨组件状态管理：
  事件冒泡通常用于跨组件的状态管理，但在 React 中，有更好的解决方案，如 Context API 和状态管理库（如 Redux）。这些工具提供了更加结构化和可预测的方式来管理和共享状态。
- React 的设计哲学：
  React 的设计哲学之一是单向数据流和组件状态的局部管理。这意味着每个组件应该尽可能独立，并且状态应该在组件内部或通过明确的 props 传递进行管理。使用事件冒泡违背了这一原则，因为它引入了一种隐式的、非局部的状态管理机制。
  测试难度：
  使用事件冒泡的代码通常更难以测试。因为事件监听器可能在应用的任何地方被触发，这增加了编写可靠测试用例的难度。

### 7.使用 JS 自定义事件

React 中也可以使用 JS 自定义事件实现通信，非必要不建议使用这种方式通信。

#### JS 自定义事件描述

在 JavaScript 中，自定义事件是一种允许你创建和触发自己的事件类型的机制。自定义事件可以用于组件之间的通信，或者在应用程序的不同部分之间传递信息。

以下是一个创建自定义事件的示例：

```js
// 初始化数据
const data = { a: 1, b: 2 }

// 创建自定义事件，用 detail 接收数据
const event = new CustomEvent('eventName', { detail: data })

// 监听自定义事件
document.addEventListener('eventName', (e) => {
  console.log(e.detail) // { a: 1, b: 2 }
})

// 事件派发
document.dispatchEvent(event)
```

#### JS 自定义事件实现 React 组件通信

下面是使用 JS 自定义事件修改选中人员的示例，子组件中修改选中人员，父组件中监听人员改变事件，更新人员信息。

```jsx
import { useEffect, useState } from 'react'

// 定义子组件
function Son() {
  const options = [
    { id: 1, name: 'Bob', age: 19 },
    { id: 2, name: 'Ailis', age: 18 },
    { id: 3, name: 'Kevin', age: 16 },
  ]

  // 用户操作修改人员，派发自定义事件，传递人员信息
  const handleChange = (e) => {
    const item = options.find((i) => i.id === +e.target.value)
    const event = new CustomEvent('customEvent', { detail: item })
    document.dispatchEvent(event)
  }

  return (
    <select onChange={handleChange}>
      {options.map((o) => (
        <option value={o.id}>
          {o.name}（{o.age}）
        </option>
      ))}
    </select>
  )
}

function Father() {
  const [user, setUser] = useState({})

  useEffect(() => {
    // 监听自定义事件，获取变更后的人员信息
    document.addEventListener('customEvent', listener)

    return () => {
      // 组件卸载时移除监听事件
      document.removeEventListener('customEvent', listener)
    }
  }, [])

  // 事件处理函数
  const listener = (e) => {
    setUser(e.detail)
  }

  return (
    <>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <Son />
    </>
  )
}

export default Father
```

React 组件通信在实际项目中如何应用？
如何选择合适的 React 组件通信方式？
React 组件通信的性能影响如何？

### 8.使用观察者模式实现通信

观察者模式一般至少有一个可被观察的对象 Subject ，可以有多个观察者去观察这个对象。二者的关系是通过被观察者主动建立的，被观察者至少要有三个方法——添加观察者、移除观察者、通知观察者。
当被观察者将某个观察者添加到自己的观察者列表后，观察者与被观察者的关联就建立起来了。此后只要被观察者在某种时机触发通知观察者方法时，观察者即可接收到来自被观察者的消息。

使用观察者模式实现 React 组件通信的基本步骤：

1. **创建被观察者对象**
2. **创建被观察者对象**
3. **被观察者对象触发通知观察者**

以下是使用观察者模式实现组件通信的例子：

```tsx
import { ChangeEventHandler, useEffect, useState } from 'react'

class Subject<T = any> {
  observerList: Observer[]

  constructor() {
    this.observerList = []
  }

  /**
   * 添加观察者
   */
  addObserver(observer: Observer) {
    this.observerList.push(observer)
  }

  /**
   * 移除观察者
   */
  removeObserver(observer: Observer) {
    this.observerList = this.observerList.filter(
      (o) => o.name !== observer.name
    )
  }

  /**
   * 主动通知观察者
   */
  notifyObservers(data: T) {
    this.observerList.forEach((o) => {
      o.listen(data)
    })
  }
}

class Observer<T = any> {
  name: string
  callback: (data: T) => void

  constructor(name: string, callback: (data: T) => void, subject: Subject) {
    this.name = name
    this.callback = callback

    if (subject) {
      subject.addObserver(this)
    }
  }

  listen(data: T) {
    this.callback(data)
  }
}

const subject = new Subject()

function Son() {
  const options = [
    { id: 1, name: 'Bob', age: 19 },
    { id: 2, name: 'Ailis', age: 18 },
    { id: 3, name: 'Kevin', age: 16 },
  ]

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const item = options.find((i) => i.id === +e.target.value)
    subject.notifyObservers(item)
  }

  return (
    <select onChange={handleChange}>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}（{o.age}）
        </option>
      ))}
    </select>
  )
}

function Father() {
  const [user, setUser] = useState({
    name: '',
    age: undefined,
  })

  useEffect(() => {
    const observer = new Observer(
      'userObserver',
      (data) => setUser(data),
      subject
    )

    return () => {
      subject.removeObserver(observer)
    }
  }, [])

  return (
    <>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <Son />
    </>
  )
}

export default Father
```

### 9.使用发布订阅模式实现通信

观察者模式可以通过多种方式实现组件之间的通信。一种常见的方法是使用自定义事件系统，另一种方法是使用第三方库如 events 模块。

JS 自定义事件实现 React 组件通信使用的也是发布订阅模式。

使用发布订阅模式实现 React 组件通信的基本步骤：

1. **创建事件发射器（Event Emitter）‌：**
   你可以使用 Node.js 内置的 events 模块来创建一个事件发射器，或者使用其他类似功能的库。
2. **在组件中订阅事件：**
   在你的 React 组件中，你可以订阅感兴趣的事件，并提供一个回调函数来处理这些事件。
3. **在组件中触发事件：**
   在其他组件中，你可以触发事件，并将数据作为事件的负载传递。

以下是使用事件触发器实现组件通信的例子：

```tsx
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'

type CallbackFuction = (data: any) => void

/**
 * 定义监听触发器
 */
class EventEmitter {
  events: { [name: string]: CallbackFuction[] }
  constructor() {
    this.events = {}
  }

  /**
   * 订阅事件
   * @param name
   * @param callback
   */
  subscribe(name: string, callback: CallbackFuction) {
    this.events[name]
      ? this.events[name].push(callback)
      : (this.events[name] = [callback])
  }

  /**
   * 取消订阅
   * @param name
   * @param callback
   * @returns
   */
  unsubscribe(name: string, callback: CallbackFuction) {
    if (!this.events[name]) return
    this.events[name] = this.events[name].filter((c) => c !== callback)
  }

  /**
   * 触发事件
   * @param name
   * @param data
   * @returns
   */
  emit(name: string, data: any) {
    if (!this.events[name]) return
    this.events[name].forEach((callback) => {
      callback(data)
    })
  }

  /**
   * 清空事件
   */
  cleanup() {
    this.events = {}
  }
}

const eventEmitter = new EventEmitter()

function Son() {
  const options = [
    { id: 1, name: 'Bob', age: 19 },
    { id: 2, name: 'Ailis', age: 18 },
    { id: 3, name: 'Kevin', age: 16 },
  ]

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const item = options.find((i) => i.id === +e.target.value)
    eventEmitter.emit('updateUser', item)
  }

  return (
    <select onChange={handleChange}>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}（{o.age}）
        </option>
      ))}
    </select>
  )
}

function Father() {
  const [user, setUser] = useState({
    name: '',
    age: undefined,
  })

  useEffect(() => {
    eventEmitter.subscribe('updateUser', handleUpdateUser)

    return () => {
      eventEmitter.unsubscribe('updateUser', handleUpdateUser)
    }
  }, [])

  /**
   * 必须用 useCallback 包裹订阅事件
   * 否则组件重新渲染时 handleUpdateUser 指向的事件不是同一个，取消订阅事件将失效
   */
  const handleUpdateUser = useCallback((data: any) => {
    setUser(data)
  }, [])

  const handleCancel = () => {
    eventEmitter.unsubscribe('updateUser', handleUpdateUser)
  }

  return (
    <>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <Son />
      <button onClick={handleCancel}>取消订阅</button>
    </>
  )
}

export default Father
```

## 在 React 中如何选择组件通信方式

在 React 中选择组件通信方式时，可以根据以下几个因素来决定：

**1.组件的层级关系**

- 父子组件通信: 通常使用 props 进行数据的向下传递。
- 子父组件通信: 使用回调函数，子组件调用父组件传递下来的函数来传递数据。
- 跨级组件通信: 可以使用 Context API 或者 Redux 等状态管理库。
- 非嵌套组件通信: 可以使用 Context API、全局状态管理库或者消息订阅与发布机制。

**2.数据流量**

- 单向数据流: React 推崇单向数据流，即从父组件到子组件的数据传递，适合使用 props。
- 双向数据绑定: 如果需要在子组件中修改父组件的状态，可以使用回调函数或者受控组件。

**性能考虑**

- 如果组件树很深，频繁地通过 props 传递数据可能会导致性能问题，这时可以考虑使用 Context API 或者 Redux。
- 对于简单的状态共享，Context API 可能是更好的选择，因为它比引入 Redux 这样的外部库更加轻量。

**项目复杂度**

- 对于小型或中型项目，简单的 props 和回调函数可能就足够了。
- 对于大型项目，可能需要引入 Redux 或 MobX 这样的状态管理库来更好地管理应用状态。

**团队习惯和偏好**

- 团队成员可能对某些通信方式更熟悉，选择大家都熟悉的通信方式可以提高开发效率。

**可维护性和可扩展性**

- 选择的通信方式应该使得代码易于理解和维护，同时在未来添加新功能时也能保持良好的扩展性。

**尽可能使用 React 生态的通信方式**

- 便于理解，提升可读性和可维护性
- 使用其他方式，如全局变量 JS 自定义事件等，违背 React 设计哲学
- 全局变量污染、会产生性能问题
- 会使得代码程序难以测试
