# React 核心概念

React 是一个用于构建用户界面（UI）的 JavaScript 库，用户界面由按钮、文本和图像等小单元内容构建而成。React 帮助你把它们组合成可重用、可嵌套的 组件。

React 的核心概念主要包括以下几点：

- 声明式编程：React 采用声明式编程范式，开发者只需关注应用的状态，并描述应用在某种状态下的 UI 表现，而无需手动操作 DOM。
- 组件化：React 将 UI 分割成独立的、可复用的组件，每个组件都有自己独立的状态和生命周期。
- JSX：JSX 是一种在 JavaScript 中书写 HTML 的语法扩展，它允许开发者使用类似 HTML 的语法编写 React 组件的结构。
- Props 和 State：Props 是组件外部传入的数据，是只读的；State 是组件内部维护的数据，可以通过 setState 方法更新，触发组件重新渲染。
- 组件生命周期：组件在创建、更新和卸载过程中会经历一系列的生命周期方法，开发者可以利用这些方法在合适的时机执行特定的操作。
- 单向数据流：React 提倡从顶层组件向下层组件单向传递数据和指令，这有助于保持应用的稳定性。
- 不可变数据：React 鼓励使用不可变数据，即一旦数据创建就不应更改，如需更新则通过创建新的数据副本实现。
- 虚拟 DOM：React 使用虚拟 DOM 技术，先将组件渲染为虚拟 DOM 树，然后再同步到真实的 DOM 树上，以提高渲染性能。
- React Router：React Router 是一个基于 React 的路由库，用于构建单页应用。
- Hooks：React Hooks 是 React 16.8 版本引入的新特性，它允许函数组件使用 State 和 Lifecycle 等 React 特性，而无需编写类组件。

## 一、声明式编程

React 推崇的是一种称为声明式编程的风格。与传统的命令式编程不同，声明式编程关注的是描述程序的最终状态，而不是程序的执行过程。换句话说，它告诉计算机“我想要什么结果”，而不是“我应该如何去做”。

### 声明式编程特点

声明式编程是一种编程范式，它的核心思想是让计算机明白你想要的是什么，而不是具体如何去实现。这种编程风格强调描述程序的目标结果是什么，而不是如何达成这个结果。

**特点**

- 抽象程度高：声明式编程隐藏了底层实现的复杂性，让开发者专注于问题域的表达。
- 易读性强：由于其表达的是意图而非过程，所以代码更加直观易懂。
- 灵活性好：因为不绑定特定的执行路径，声明式代码更容易适应变化。
- 性能优化潜力大：编译器或解释器可以根据上下文智能优化执行路径。

**优势**

- 简化复杂逻辑：在处理复杂问题时，声明式编程可以减少代码量，增强可读性。
- 更好的维护性：代码更接近自然语言，便于理解和维护。
- 潜在的性能提升：许多声明式编程环境背后有强大的优化引擎。

**劣势**

- 调试困难：由于缺乏明确的执行步骤，调试可能比命令式编程更具挑战性。
- 学习曲线：初学者可能需要更多时间来适应这种抽象的思维模式。

### 命令式编程特点

命令式编程是一种编程范式，它侧重于如何执行程序以完成特定任务。在这种范式下，程序是由一系列的命令组成的，这些命令定义了计算机在执行程序时需要遵循的具体步骤。

**特点**

- 过程导向：命令式编程关注程序的执行过程，即程序是如何一步一步运行的。
- 显式控制流：程序中的控制流是通过显式的命令来管理的，比如循环和条件语句。
- 变量赋值：在命令式编程中，变量可以被赋予不同的值，并且可以在程序运行过程中改变。
- 状态变化：程序的状态会随着命令的执行而不断变化。

**优势**

- 精确控制：命令式编程提供了对程序执行的精确控制，适合处理复杂逻辑。
- 易于理解：对于初学者来说，命令式编程的代码通常更易于理解，因为它更接近人类的思考方式。
- 调试方便：由于程序的执行过程是显式的，所以在调试时更容易定位问题。

**劣势**

- 代码冗长：对于一些简单的任务，命令式编程可能会导致代码过于冗长。
- 难以维护：随着程序规模的增长，命令式编程的代码可能会变得难以维护。
- 性能问题：如果不恰当地使用循环和条件语句，可能会导致程序的性能问题。

### React 为什么会使用声明式编程

React 采用声明式编程范式，是为了提供一个清晰、高效且灵活的框架，用于构建用户界面。它通过减少开发者对底层细节的关注，使开发者能够专注于构建高质量的 UI，同时利用 React 的高效渲染机制，保证了应用的性能和稳定性。

- 声明式编程的核心在于描述期望的结果，而不是详细说明实现步骤。React 鼓励开发者关注业务逻辑本身，而不是底层的 DOM 操作。
- 声明式编程有助于降低复杂性。在 React 中，当组件的状态发生变化时，React 会自动比较新旧状态，并仅更新必要的部分，从而减少不必要的渲染，提高性能。
- 声明式编程使得 React 组件具有高度的可预测性。由于 React 遵循单向数据流的原则，组件的状态变化只会沿着树形结构向下传播，这有助于开发者理解和跟踪数据的流向，从而更容易调试和优化应用程序。

## 二、组件化

**React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数。**

React 组件可以通过两种形式定义，一种是函数式组件，另一种是类式组件。函数式组件通常用于无状态组件，而类式组件则可以包含状态和生命周期方法。

自从 React 16.8 版本引入 Hook 机制后，允许函数组件使用 state 和其他 React 特性，无需使用类。Hooks 让函数组件能够拥有更多的功能和灵活性，同时也简化了组件的编写。

### 定义一个组件

定义函数

```js
function Profile() {}
```

添加标签

```js
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
}
```

导出组件

```js
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
}

export default Profile
```

### 使用组件

```js
import Profile from './Profile'

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      <Profile />
    </section>
  )
}
```

### 避坑指南

**1.组件的名称必须以大写字母开头。**

React 组件是常规的 JavaScript 函数，名称定义为小写并以小写方式引入时，React 将认为是普通的 html 标签，可能会导致渲染错误或其他问题。

```js
// Bad
function profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      {/* React 将 profile 识别为普通的 html 标签 */}
      {/* 可能会导致渲染错误或其他问题 */}
      <profile />
    </section>
  )
}
```

```js
// Good
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      <Profile />
    </section>
  )
}
```

**2.不要在组件里嵌套定义组件。**

原因如下：

- 影响性能，导致不必要的重新渲染。父组件每次更新都会导致子组件重新挂载。
- 可维护性低、不利于代码的组织、不利于代码复用、不利于测试。

原因分析参考[真的不可以在 React 组件内部嵌套定义子组件吗？](https://prinsss.github.io/react-unstable-nested-components/)

错误示例：

```js
// Bad
export default function Gallery() {
  // 永远不要在组件中定义组件
  function Profile() {
    // ...
  }
  // ...
}
```

在顶层声明组件：

```js
// Good

// 永远不要在组件中定义组件
function Profile() {
  // ...
}

export default function Gallery() {
  // ...
}
```

使用渲染函数：

```js
// Good

export default function Gallery() {
  const renderProfile = () => {
    // ...
  }

  // ...
}
```

## 三、属性（Props）

React 组件使用 props 来互相通信。每个父组件都可以提供 props 给它的子组件，从而将一些信息传递给它。props 可以是任何 JavaScript 值，包括对象、数组和函数。

属性传递：

```tsx
export default function Profile() {
  const person = {
    name: 'Lin Lanying',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  }

  return (
    <>
      <Avatar person={person} size={100} />
    </>
  )
}
```

属性接收：

```tsx
interface AvatarProps {
  person: {
    name: string
    imageUrl: string
  }
  size: number
}

function Avatar({ person, size }: AvatarProps) {
  return (
    <img
      className="avatar"
      src={person.imageUrl}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}
```

指定默认值：

```tsx
function Avatar({ person, size = 80 }: AvatarProps) {
  return (
    <img
      className="avatar"
      src={person.imageUrl}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}
```

JSX 传递子组件：

```tsx
import Avatar from './Avatar'

function Card({ children }) {
  return <div className="card">{children}</div>
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageUrl: 'YfeOqp2',
        }}
      />
    </Card>
  )
}
```

## 四、状态（State）

在 React 中，组件的状态（State）是用来存储组件内部数据的，它代表了组件的当前状态，并且是组件渲染时的数据依据。组件的状态是动态的，会随着程序的运行而改变。

使用示例：

```jsx
// 在类组件中
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 })
  }

  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 })
  }

  render() {
    return (
      <div>
        <p>Clicked: {this.state.count} times</p>
        <button onClick={this.handleDecrement}>-</button>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    )
  }
}
```

```jsx
// 在函数组件中
function Counter() {
  // 使用useState Hook来定义状态和对应的更新函数
  const [count, setCount] = useState(0) // 初始状态为0

  // 处理点击事件的函数
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1) // 递增计数器
  }

  return (
    <div>
      <p>You clicked me {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}
```

**组件状态的作用**

组件的状态是组件渲染结果的依据，它决定了组件应该如何渲染到用户界面上。当组件的状态发生变化时，React 会重新渲染组件，并更新 DOM 以反映这些变化。

**组件状态的定义**

- 在类组件中通过 this.state 属性进行定义
- 在函数组件中使用 useState

**组件状态的改变**

- 在类组件中通过 this.setState 属性进行定义
- 在函数组件中使用 useState 返回的更新状态的函数，如示例中的 setCount 方法

**组件状态与 props 的区别**

组件的状态是组件内部的属性，它是由组件自己维护的，并且可以随时间改变。而 props 是从外部传入组件的属性，它们通常是静态的，不能被组件内部的方法修改。

**组件状态的设计原则**

在设计组件状态时，应该确保状态能够代表组件 UI 的完整状态集，并且是所有用于 UI 变化的状态的集合，不包含任何多余的状态。这意味着，状态中的每一个变量都应该直接或间接地影响组件的渲染结果。

**组件状态的判断依据**

决定一个变量是否应该作为组件的状态时，可以考虑以下几个因素：

- 该变量是否是直接从父组件通过 props 传递进来的？
- 该变量在组件的生命周期内是否保持不变？
- 该变量是否可以由已有的 props 或 state 计算得出？
- 该变量是否在组件的 render 方法中被使用？

**组件状态的优化**

为了提高性能，可以使用 React.memo 包装函数组件或者让类组件继承 React.memo 来防止不必要的重新渲染。此外，还可以实现 shouldComponentUpdate 方法来控制组件的更新逻辑。

## 五、生命周期

对于类组件，React 组件的生命周期可以分为几个不同的阶段，每个阶段都有其特定的用途和方法调用。

![alt 组件生命周期](../assets/react_life_cycle.png)

**1.挂载阶段（Mounting）‌**

这个阶段发生在组件实例被创建并插入到 DOM 中的时候。具体的生命周期方法调用顺序如下：

- constructor()：在组件挂载之前，会首先调用构造函数。在这里，你可以进行一些初始化设置，例如绑定事件处理器，或者将 props 传递给 state。
- static getDerivedStateFromProps()：这个方法在组件实例被创建后，调用 render()方法之前被调用。它允许基于 props 来派生 state，但请注意，在 React 17 及以上版本中，推荐使用 useEffect 钩子和 useState 钩子代替。
- render()：这是 class 组件中唯一必须实现的方法。它返回一个 React 元素，React 会将其渲染到 DOM 上。
- componentDidMount()：在组件挂载完成后立即调用，通常在这里执行 DOM 操作，如发起网络请求或设置定时器等。

**更新阶段（Updating）‌**

当组件的 props 或 state 发生变化时，组件会进入更新阶段。更新阶段的调用顺序如下：

- static getDerivedStateFromProps()：同挂载阶段一样，在组件接收到新的 props 时被调用。
- shouldComponentUpdate()：这是一个允许组件决定是否继续更新流程的方法。如果返回 false，则后续的渲染和生命周期方法都不会调用。
- render()：同挂载阶段。
- getSnapshotBeforeUpdate()：在最新的一轮渲染输出到 DOM 之前被调用，可以用来捕获一些 DOM 信息，如滚动位置等。
- componentDidUpdate()：在组件更新完成并被渲染到 DOM 后调用，通常在这里执行基于更新结果的 DOM 操作。

**卸载阶段（Unmounting）‌**

当组件从 DOM 中移除时，会进入卸载阶段，此时只会调用 componentWillUnmount()方法，通常在这里进行清理操作，如取消网络请求、清除定时器、解绑事件处理器等，以防止内存泄漏。

## 六、单向数据流

React 采用了单向数据流的模式，这是一种在 JavaScript 框架中常见的设计理念。在这种模式下，数据从父组件流向子组件，也就是说，父组件负责提供数据（通过 props 传递），而子组件则消费这些数据。

特点：

- 数据的一致性。父组件通过 props 将数据传递给子组件，子组件就不能直接修改这些 props。
- 应用的响应性。子组件必须通过触发事件并调用回调函数来通知父组件进行修改数据。
- 状态的唯一性。在 React 中，每个组件都应该有一个单一的、可预测的来源来管理它的状态。这意味着如果一个组件的状态需要被多个地方访问或修改，那么这个状态应该被提升到最近的共同祖先组件中。

单向数据流设计的好处：

- 简化了组件之间的数据依赖关系，使得数据的流向变得清晰和可控。
- 确保数据的一致性，同时也避免了组件间的直接通信，保持了组件的独立性和可复用性。
- 确保了应用状态的变更可以被追踪和管理，使得状态管理变得更加直观和易于维护。

```jsx

function Child(props){
  return <div>
    <p>{props.count}</p>
    <button onClick={() => props.onChange(props.count+1)}>Increment</button>
  </div>,
}

function Father(){
  const [count, setCount] = useState(0)

  return <Child count={count} onChange={(value)=>setCount(value}/>
}
```

## 七、不可变数据

在 React 中，不可变数据是指那些一旦被创建就不可被修改的数据结构。这种数据结构的特点是，当你尝试修改它时，它会返回一个新的数据实例，而不是在原数据上进行修改。这种做法保证了数据的不变性，即数据在任何时候都可以被视为不可变的，从而使得 React 能够高效地进行虚拟 DOM 的比较和差异计算。

特点：

- 不变性：一旦创建，不可变数据不能被修改。任何对数据的修改都会产生一个新的数据实例，而不是在原数据上进行修改。
- 引用透明性：不可变数据的一个关键特点是引用透明性。这意味着如果你有两个引用指向同一个不可变数据实例，那么这两个引用是完全相等的。换句话说，你不能通过引用来区分两个相同的数据实例。
- 持久性：不可变数据是持久的。即使数据被修改了，原来的数据实例仍然会保留下来，不会被丢弃。这使得你可以很方便地回溯到之前的数据状态。
- 结构性共享：不可变数据支持结构性共享。这意味着如果你修改了数据的一部分，那么只有这部分数据会被修改，其他部分的数据仍然保持不变。这样可以大大节省内存空间，提高性能。
- 纯函数：不可变数据通常与纯函数一起使用。纯函数是一种只依赖于输入参数，并且没有副作用的函数。纯函数的一个重要特性是它们的输出只依赖于输入，而不会受到外部状态的影响。这使得纯函数非常适合于处理不可变数据。
- 易于并发：不可变数据使得并发编程变得更加容易。因为在不可变数据模型中，每次数据的修改都会产生一个新的数据实例，所以你可以放心地对数据进行读取和操作，而不必担心数据会在你不注意的时候被修改。
- 易于调试：不可变数据使得调试变得更加容易。因为每次数据的修改都会产生一个新的数据实例，所以你可以很容易地追踪到数据的变化历史，找出问题所在。
- 易于序列化：不可变数据易于序列化和反序列化。因为不可变数据是不可变的，所以你可以安全地将它转换为字符串或其他格式，然后再将其转换回来，而不必担心数据在这个过程中被修改。

作用：

- 提升性能：不可变数据允许 React 进行快速的虚拟 DOM 对比和差异计算，因为不需要担心数据在更新过程中被其他部分修改。这使得 React 的 diff 算法能够更高效地运行，从而提升了应用的性能和响应速度。
- 防止副作用：不可变数据避免了由于数据突变导致的副作用和难以追踪的错误。在传统的可变数据模型中，修改数据可能会影响到其他依赖于该数据的部分，导致难以预料的行为。而在不可变数据模型中，每次数据的修改都会产生一个新的数据实例，这样就隔离了修改的影响范围，降低了出现副作用的风险。
- 增强可预测性：不可变数据增强了代码的可预测性。因为数据在任何时候都可以被视为不可变的，所以你可以放心地对数据进行读取和操作，而不必担心数据会在你不注意的时候被修改。
- 方便调试：不可变数据也使得调试变得更加容易。因为每次数据的修改都会产生一个新的数据实例，所以你可以很容易地追踪到数据的变化历史，找出问题所在。
- 简化状态管理：不可变数据简化了状态管理。因为你不需要担心数据会被意外修改，所以你可以更加专注于如何管理和更新你的应用状态。
- 促进函数式编程：不可变数据促进了函数式编程风格的采用。函数式编程是一种强调无副作用和不可变性的编程范式，它与 React 的理念非常契合。
- 便于组件间通信：不可变数据使得组件间通信变得更加简单和安全。当你从一个组件传递数据到另一个组件时，你可以确保这些数据是不可变的，从而避免了数据在传递过程中的意外修改。
- 提升代码质量：不可变数据可以帮助你编写更干净、更可预测的代码。因为它强制你以一种更加声明式的方式来处理数据，所以你的代码会更加简洁和易读。
- 优化缓存策略：不可变数据可以优化缓存策略。因为每次数据的修改都会产生一个新的数据实例，所以你可以很容易地判断出一个数据是否已经被修改过，从而决定是否要更新缓存。
- 减少内存占用：不可变数据可以减少内存占用。因为每次数据的修改都会产生一个新的数据实例，所以你可以很容易地回收旧的数据实例，从而减少内存占用。

## 八、虚拟 DOM

**虚拟 DOM 是什么？**

React 的虚拟 DOM（Virtual DOM）是 React 框架中的一个核心概念，它是一个 JavaScript 对象，代表了 DOM 树的结构。虚拟 DOM 的设计目的是为了提升 Web 应用的渲染性能，通过在内存中维护一个轻量级的 DOM 表示，React 能够有效地减少对实际 DOM 的操作次数，从而提高应用的性能。

当 React 组件被渲染时，它会生成一个虚拟 DOM 树。这个过程通常涉及到 JSX（JavaScript XML）语法，这是一种 JavaScript 的语法扩展，允许开发者以声明性的方式编写 HTML 结构。当 JSX 代码被编译时，它会转化为 React 元素对象，这些对象代表了 DOM 结构的不同部分。

一旦虚拟 DOM 树被构建出来，React 会通过对比新旧虚拟 DOM 树，找出两者之间的差异，这个过程称为“Diffing”。React 会计算出最小的操作集，以便以最有效率的方式更新真实 DOM。

**虚拟 DOM 的优势？**

- 可预测性和高效性。内存中运行，不涉及浏览器的重绘和回流操作，因此在处理大量动态内容或复杂动画时，能够显著提高应用的性能。
- 跨平台。虚拟 DOM 还支持跨平台渲染，这意味着相同的 React 应用代码可以运行在不同的环境，如 Web、移动设备或桌面应用中。

**虚拟 DOM 的实现原理**

- React.render：负责将 React 元素渲染到 DOM 树上。
- legacyRenderSubtreeIntoContainer：负责子树的渲染。
- updateContainer：负责容器节点的更新。
- performSyncWorkOnRoot： 该函数则包含了三大核心处理流程：beginWork、completeWork 和 commit，这些步骤共同确保了虚拟 DOM 到真实 DOM 的高效转换。
