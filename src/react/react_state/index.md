# React 状态管理

React 状态管理是构建大型单页应用（SPA）的关键环节，它涉及到组件间状态共享、数据流控制和应用性能优化等多个方面。

## 一、Local State

Local State，也就是局部状态，是指在一个组件内部维护的状态，这种状态是私有的，只能在该组件及其子组件中被访问和使用。

React 16.8 引入了 Hooks，它是一组 API 可以让函数组件使用 state 和其他 React 特性。useState 是 Hooks 中用于创建和管理组件状态的基本 Hook。

使用 hook 管理状态：

```jsx
function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    // username
    // password
    // ...
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>登录</button>
    </div>
  )
}
```

使用 this.state 管理状态：

```jsx
class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
  }

  changeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value })
  }

  changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value })
  }

  submit = () => {
    const { username, password } = this.state
    // ...
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.username}
          onChange={this.changeUsername}
        />
        <input
          type="password"
          value={this.state.password}
          onChange={this.changePassword}
        />
        <button onClick={this.submit}>登录</button>
      </div>
    )
  }
}
```

### 构建 state 原则

- 合并关联的 state
- 避免互相矛盾的 state
- 避免冗余的 state
- 避免重复的 state
- 避免深度嵌套的 state。深度分层的 state 更新起来不是很方便。如果可能的话，最好以扁平化方式构建 state。

### Local State 优劣

Local State 的主要优点是它简化了组件内部的逻辑，因为组件可以独立地更改和处理自己的数据。然而，当多个组件需要共享状态时，Local State 可能会导致代码重复和难以维护。在这种情况下，可以考虑使用 Context API 或其他全局状态管理解决方案。

## 二、Props and Local State

对于需要在多个组件间共享的状态，可以上层组件中定义状态，使用 props 向下传递，实现状态管理。

以下是一个通过 Props 和 State 管理状态的例子：

```tsx
// GoodsContainer.tsx
import { useCallback, useState } from 'react'
import GoodsSearch from './GoodsSearch'
import GoodsList from './GoodsList'

interface Goods {
  id: number
  name: string
}

const fetchGoodsData = async ({
  keyword,
}: {
  keyword: string
}): Promise<Goods[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const len = Math.floor(Math.random() * 20)
      resolve(
        Array.from({ length: len }).map((_, index) => ({
          id: index + 1,
          name: keyword + '商品' + (index + 1),
        }))
      )
    }, 500)
  })
}

function GoodsContainer() {
  const [keyword, setKeyword] = useState('')
  const [goodsRecords, setGoodsRecords] = useState<Goods[]>([])

  const getData = async (keyword: string) => {
    const data: Goods[] = await fetchGoodsData({ keyword })
    setGoodsRecords(data)
  }

  const handleSearch = useCallback((value: string) => {
    setKeyword(value)
    getData(value)
  }, [])

  return (
    <div>
      <GoodsSearch value={keyword} onSearch={handleSearch} />
      <GoodsList records={goodsRecords} />
    </div>
  )
}

export default GoodsContainer
```

在这个例子中，我们定义了一个名为 GoodsContainer 的容器组件，用于获取商品数据。这个组件有一个名为 keyword 和 goodsRecords 的状态，以及一个名为 handleSearch 的方法，用于更新 keyword 的值和搜索商品数据。

```jsx
import React, { useEffect, useState } from 'react'

interface Props {
  value: string
  onSearch: (value: string) => void
}

const GoodsSearch: React.FC<Props> = React.memo((props) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => props.onSearch(value)}>搜索</button>
    </>
  )
})

export default GoodsSearch
```

定义一个 GoodsSearch 商品搜索组件，用于接收用户输入和处理用户搜索事件。

```tsx
import React from 'react'

interface Props {
  records: { id: number; name: string }[]
}

const GoodsList: React.FC<Props> = React.memo((props) => {
  return (
    <ul>
      {props.records.map((record) => (
        <li key={record.id}>{record.name}</li>
      ))}
    </ul>
  )
})

export default GoodsList
```

商品列表组件用于渲染用户搜索商品结果。

## 三、使用 reducer 整合状态逻辑

useReducer 是 React Hooks 中的一个高级功能，它提供了一种更结构化的方式来处理和管理组件的状态。useReducer 允许开发者定义一个称为“reducer”的纯函数，该函数负责根据提供的“action”来更新状态。这种模式类似于 Flux 或 Redux 在全局应用状态管理中使用的方式，但 useReducer 将其封装在了 React 组件的上下文中。

useReducer 参数：

**reducer 函数：**这是一个接收当前状态和一个动作（action）作为参数，并返回新状态的函数。
**初始状态：**组件的初始状态值
**可选的初始化参数：**用于计算初始值的函数，其执行结果作为初始值

```tsx
import { useReducer, useState } from 'react'

interface Todo {
  id: number
  title: string
  done: boolean
}

interface Action {
  type: string
  payload: Todo
}

/**
 * 编写 todo Reducer 函数，完善增删改逻辑
 */
const todoReducer = (state: Todo[], action: Action) => {
  const { type, payload } = action

  if (type === 'create') {
    return [...state, payload]
  }

  if (type === 'remove') {
    return state.filter((todo) => todo.id !== payload.id)
  }

  if (type === 'update') {
    const index = state.findIndex((todo) => todo.id === payload.id)
    state[index] = payload
    return [...state]
  }

  throw Error('未知 action：' + action.type)
}

let incrementId = 1 // 自增ID

const TodoList = () => {
  /**
   * 设置状态，并赋予初始值
   */
  const [todos, dispatch] = useReducer<typeof todoReducer, Todo[]>(
    todoReducer,
    [], // 默认初始值
    (todos) => [...todos, { id: 1, title: '第一个待办', done: false }] // 计算初始值函数，返回初始值，不传使用默认初始值
  )
  const [text, setText] = useState('')

  /**
   * 派发新增事件
   */
  const handleCreate = () => {
    incrementId = incrementId + 1
    dispatch({
      type: 'create',
      payload: { id: incrementId, title: text, done: false },
    })
  }

  /**
   * 派发删除事件
   */
  const handleRemove = (todo: Todo) => {
    dispatch({ type: 'remove', payload: todo })
  }

  /**
   * 派发更新事件
   */
  const handleDone = (checked: boolean, todo: Todo) => {
    dispatch({ type: 'update', payload: { ...todo, done: checked } })
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleCreate}>添加</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={(e) => handleDone(e.target.checked, todo)}
            />
            {todo.title}
            <button onClick={() => handleRemove(todo)}>删除</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoList
```

### useReducer 和 useState 对比

| 特性     | useState                   | useReducer                        |
| :------- | :------------------------- | :-------------------------------- |
| 简单性   | 简单直观，适用于单一状态值 | 较为复杂，适用于管理多个相关状态  |
| 使用场景 | 单个状态变量               | 多个相关状态或遵循复杂逻辑的状态  |
| 更新状态 | 直接调用更新函数           | 通过 dispatching actions 更新状态 |
| 初始状态 | 需要提供初始状态值         | 需要提供初始状态值                |
| 返回值   | 当前状态和更新函数的数组   | 当前状态和 dispatch 函数          |

### useReducer 使用场景

- 复杂状态逻辑：当你的组件状态逻辑变得复杂，尤其是当状态更新依赖于之前的 state 或多个 action 时，使用 useReducer 可以帮助你更好地组织和管理状态更新逻辑。
- 多个子值的状态：如果你的状态对象包含多个子值，而这些子值需要根据不同的 action 进行更新，useReducer 可以让你在一个地方集中处理所有的状态变化。
- 状态共享：当你需要在多个组件之间共享状态时，你可以将 useReducer 的 dispatch 函数通过 Context API 提供给子组件，这样所有子组件都可以通过 dispatch 函数来更新状态。
- 纯函数更新：useReducer 的 reducer 函数应该是纯函数，这意味着相同的输入总是产生相同的输出，这有助于避免副作用和不一致的状态更新。

### useReducer 注意事项

- **Reducer 必须是纯函数：**Reducer 函数应该是一个纯函数，这意味着它不应该有任何副作用，也不应该修改传入的参数。它应该根据当前的 state 和 action 计算出新的 state。

- **不要修改 state：**在 reducer 函数中，你不应该直接修改 state 对象。相反，你应该返回一个新的 state 对象。这是因为 React 依赖不可变性来检测状态变化。

- **处理默认情况：**在 reducer 函数中，应该有一个 default 情况来处理未知的 action 类型。如果没有处理未知 action，可能会导致运行时错误。

- **使用不可变数据结构：**在处理复杂的状态对象时，考虑使用不可变数据结构库，如 Immutable.js，这可以帮助你更容易地创建新的 state 对象，而不是修改现有的 state。

- **合理组织 action 类型：**当你的应用变得更大时，可能会有很多不同的 action 类型。考虑将 action 类型定义为常量，并将它们放在单独的文件中，以便更好地组织和管理。

- **避免在 reducer 中做过多工作：**Reducer 应该专注于根据 action 更新 state。如果有更复杂的逻辑，考虑将其移到 action 创建函数或其他辅助函数中。

- **测试 reducer 函数：**由于 reducer 是纯函数，它们很容易进行单元测试。确保为你的 reducer 编写测试，以确保其行为符合预期。

- **使用 useReducer 的第三个参数：**如果需要，可以使用 useReducer 的第三个参数来调度初始 action。这在你需要在组件挂载后立即执行某些操作时很有用。

### Q&A

**Reducer 为什么必须是存函数？**

主要原因是为了维护应用的稳定性和可维护性。

reducer 的作用是根据当前的 state 和一个 action 来计算出新的 state。为了保证每次计算出的新 state 都是可预测的，reducer 必须是一个纯函数。这样可以确保无论何时何地，只要给定相同的 state 和 action，reducer 都会返回相同的 newState。

如果 reducer 不是纯函数，它可能会产生副作用（比如修改传入的 state），或者依赖于外部状态（比如全局变量），这将导致 Redux 的状态管理变得不可预测，从而引发各种问题，如状态不一致、难以调试等。

## 四、使用 Context API

我们通常会通过 props 将信息从父组件传递到子组件。但是，如果必须通过许多中间组件向下传递 props，或是在应用中的许多组件需要相同的信息，传递 props 会变的十分冗长和不便。Context 允许父组件向其下层无论多深的任何组件提供信息，而无需通过 props 显式传递。

### 为什么要使用 Context API

当业务需要在组件树中深层传递参数以及需要在组件间复用相同的参数时，传递 props 就会变得很麻烦。最近的根节点父组件可能离需要数据的组件很远，状态提升 到太高的层级会导致 “逐层传递 props” 的情况。

### Context API 使用示例

**1.准备数据**

```ts
// data.ts
export const STORE_LIST = [
  {
    id: 1,
    name: '罗森静安大宁店',
  },
  {
    id: 2,
    name: '世纪联华南京西路店',
  },
  {
    id: 3,
    name: '华润万家紫金豪庭分店',
  },
]

export const COUPON_LIST = [
  {
    id: 1,
    name: '维达满减券',
    coverImage: 'http://dummyimage.com/120x600',
    amount: 100,
    floorAmount: 5000,
    platform: 1,
  },
  {
    id: 2,
    name: '蒙牛满20减2优惠券',
    coverImage: 'http://dummyimage.com/120x600',
    amount: 200,
    floorAmount: 2000,
    platform: 1,
  },
  {
    id: 3,
    name: '滴滴出行满减券',
    coverImage: 'http://dummyimage.com/120x600',
    amount: 300,
    floorAmount: 3000,
    platform: 1,
  },
  {
    id: 4,
    name: '汉堡特价券',
    coverImage: 'http://dummyimage.com/120x600',
    amount: 100,
    floorAmount: 5000,
    platform: 2,
  },
]
```

**2.创建 Context 对象**

```tsx
// query_context.ts
import React, { Dispatch } from 'react'
import { STORE_LIST } from './data'
import { CouponQueryAction, CouponQueryState } from './type'

export const INIT_COUPON_QUERY: CouponQueryState = {
  platform: 1,
  store: STORE_LIST[0],
}

const QueryContext = React.createContext([
  INIT_COUPON_QUERY,
  (action: CouponQueryAction) => console.log(action),
] as [CouponQueryState, Dispatch<CouponQueryAction>])

export default QueryContext
```

```ts
// type.ts
export type CouponQueryState = {
  platform: 1 | 2 // 1=微信券，2=支付宝券

  // 门店信息
  store: {
    id: number
    name: string
  }
}

export type CouponQueryAction =
  | { type: 'updateBrand'; payload: { id: number; name: string } }
  | { type: 'updatePlatform'; payload: 1 | 2 }
  | { type: 'updateStore'; payload: { id: number; name: string } }

export interface CouponRecord {
  id: number
  name: string
  coverImage: string
  amount: number
  floorAmount: number
  platform: 1 | 2
}
```

**3.创建 reducer 对象**

```ts
// query_reducer.ts
import { CouponQueryAction, CouponQueryState } from './type'

function queryReducer(
  state: CouponQueryState,
  action: CouponQueryAction
): CouponQueryState {
  switch (action.type) {
    case 'updatePlatform':
      return {
        ...state,
        platform: action.payload,
      }

    case 'updateStore':
      return {
        ...state,
        store: action.payload,
      }

    default:
      return {
        ...state,
      }
  }
}

export default queryReducer
```

**4.创建一个 Provider 组件，这个组件会包裹住 QueryContext 的组件树**

```tsx
// index.tsx
import { useReducer } from 'react'
import QueryContext, { INIT_COUPON_QUERY } from './query_context'
import queryReducer from './query_reducer'
import CouponStore from './components/CouponStore'
import CouponPlatform from './components/CouponPlatform'
import CouponList from './components/CouponList'

const CouponContainer = () => {
  const [query, dispatchQuery] = useReducer(queryReducer, INIT_COUPON_QUERY)

  return (
    <QueryContext.Provider value={[query, dispatchQuery]}>
      <CouponStore />
      <CouponPlatform />
      <CouponList />
    </QueryContext.Provider>
  )
}

export default CouponContainer
```

**5.修改和使用 QueryContext**

```tsx
// CouponStore.tsx
import React, { ChangeEvent, useCallback, useContext } from 'react'
import QueryContext from '../query_context'
import { STORE_LIST } from '../data'

const CouponStore = React.memo(() => {
  const [query, dispatch] = useContext(QueryContext)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const item = STORE_LIST.find((i) => +e.target.value === i.id)
      dispatch({ type: 'updateStore', payload: item! })
    },
    [dispatch]
  )

  return (
    <div>
      <select value={query.store.id} onChange={handleChange}>
        {STORE_LIST.map((store) => (
          <option value={store.id}>{store.name}</option>
        ))}
      </select>
    </div>
  )
})

export default CouponStore
```

```tsx
// CouponPlatform.tsx
import React, { useContext } from 'react'
import QueryContext from '../query_context'

const PLATFORM_OPTIONS = [
  {
    label: '微信',
    value: 1,
  },
  {
    label: '支付宝',
    value: 2,
  },
]

const CouponPlatform = React.memo(() => {
  const [query, dispatch] = useContext(QueryContext)

  const handleChange = (value: 1 | 2) => {
    dispatch({ type: 'updatePlatform', payload: value })
  }

  const activeStyle = {
    color: '#fff',
    background: 'green',
  }

  return (
    <div>
      {PLATFORM_OPTIONS.map((platform) => (
        <button
          style={platform.value === query.platform ? activeStyle : {}}
          onClick={() => handleChange(platform.value as 1 | 2)}
        >
          {platform.label}
        </button>
      ))}
    </div>
  )
})

export default CouponPlatform
```

```tsx
// CouponList.tsx
import React, { useContext, useEffect, useState } from 'react'
import { COUPON_LIST } from '../data'
import QueryContext from '../query_context'
import { CouponRecord } from '../type'
import CouponItem from './CouponItem'

const fetchData = (query: { platform: 1 | 2 }) => {
  return new Promise<CouponRecord[]>((resolve) => {
    setTimeout(() => {
      const data = COUPON_LIST.filter(
        (coupon) => coupon.platform === query.platform
      )
      resolve(data as CouponRecord[])
    }, 500)
  })
}

const CouponList = React.memo(() => {
  const [query] = useContext(QueryContext)
  const [records, setRecords] = useState<CouponRecord[]>([])

  useEffect(() => {
    fetchData({ platform: query.platform }).then((data) => setRecords(data))
  }, [query.platform])

  return (
    <ul>
      {records.map((record) => (
        <li key={record.id}>
          <CouponItem coupon={record} />
        </li>
      ))}
    </ul>
  )
})

export default CouponList
```

```tsx
// CouponItem.tsx
import React, { useContext } from 'react'
import { CouponRecord } from '../type'
import QueryContext from '../query_context'

interface Props {
  coupon: CouponRecord
}

const share = (options: {
  platform: 1 | 2
  couponId: number
  storeId: number
}) => {
  console.log(options)
  // TODO 分享逻辑
  // ...
}

const CouponItem: React.FC<Props> = React.memo((props) => {
  const { coupon } = props
  const [query] = useContext(QueryContext)

  const handleShare = () =>
    share({
      platform: query.platform,
      storeId: query.store.id,
      couponId: coupon.id,
    })

  return (
    <div>
      <h4>{coupon.name}</h4>
      <p>
        <span>{coupon.amount / 100}元</span>
        &nbsp;
        <small>满{coupon.floorAmount / 100}元可用</small>
      </p>
      <button onClick={handleShare}>分享</button>
    </div>
  )
})

export default CouponItem
```

### 注意事项

- 当 Provider 的 value 发生变化时，所有消费该 context 的组件都会重新渲染。
- 如果没有匹配的 Provider，Consumer 或 useContext 将返回传递给 createContext 的 defaultValue。
- 尽量避免在 Provider 中传递大型对象或复杂数据结构，因为这可能导致不必要的重新渲染。

### Q & S

**Context API 如何确保数据更新的**

当 Context 中的某个值发生改变时，所有使用了该 Context 的组件通常都会重新渲染，这是因为 React 的 Context API 是基于订阅模式的。当一个组件通过 useContext 钩子订阅了某个 Context 时，只要这个 Context 的值发生变化，订阅了它的所有组件都会重新渲染，无论它们是否真正使用了那个变化的值。

## 使用第三方状态管理库

- Redux：
  - 描述：Redux 是一个流行的 JavaScript 状态管理库，它可以与 React 一起使用来管理应用的状态。Redux 提供了一个单一的全局状态容器，通过纯函数（reducers）来描述状态的变化。
  - 特点：强调可预测的状态容器，具有时间旅行调试、强大的社区支持和丰富的中间件生态。
- MobX：
  - 描述：MobX 是一个简单、可扩展的状态管理库，它通过响应式编程范式自动追踪依赖关系并在状态变化时触发更新。
  - 特点：易于理解和集成，适合于复杂的数据结构和动态视图。
- Zustand：
  - 描述：Zustand 是一个轻量级的状态管理库，它提供了一个简单的 API 来创建和使用全局状态。
  - 特点：小巧、快速，支持 TypeScript，易于使用。
- Jotai：
  - 描述：Jotai 是一个极简的状态管理库，它提供了声明式的 API 来管理应用状态。
  - 特点：简单易用，支持 TypeScript，没有中间件或复杂的概念。
- XState：
  - 描述：XState 是一个状态机库，它可以用来管理复杂的状态逻辑，尤其是在有限状态机或状态图的场景下。
  - 特点：强大的状态机模型，适合复杂的状态转换逻辑。

### 如何选择状态管理库

**1.项目规模和复杂度：**

- 对于小型或中等规模的项目，可能不需要一个完整的状态管理库，React 的 Context API 可能就足够了。
- 对于大型或复杂的项目，可能需要一个更加强大的状态管理解决方案，如 Redux 或 MobX。

**2.团队熟悉度：**

- 如果团队成员已经熟悉某个库，那么继续使用该库可以提高开发效率和减少学习成本。
- 如果团队不熟悉任何状态管理库，可以考虑选择一个学习曲线较低的库，如 Zustand 或 Jotai。

**3.性能要求：**

- 如果应用对性能有较高要求，可以选择一个性能优化较好的库，如 Redux 或 Recoil。
- 对于不太关心性能的场景，可以选择一个更易用的库，如 MobX 或 Unstated。

**4.社区支持和文档：**

- 一个活跃的社区和完善的文档可以在遇到问题时提供帮助。Redux 和 MobX 都有很大的社区支持和丰富的文档。
- 新兴的库可能社区较小，但可能提供更现代的 API 和更好的开发体验。

**5.API 设计和易用性：**

- 选择一个 API 设计简洁、易于理解的库可以减少开发中的困惑和提高效率。
- 一些库提供了更多的抽象和简化的 API，如 Zustand 和 Jotai。

**6.类型支持：**

- 如果项目使用 TypeScript，选择一个提供良好类型支持的库会很有帮助。大多数现代的状态管理库都支持 TypeScript。

**7.中间件和插件系统：**

- 如果需要中间件来处理异步操作、日志记录或其他高级功能，Redux 可能是最佳选择，因为它有一个成熟的中间件生态系统。
- 如果不需要复杂的中间件，可以选择一个更简单的库。

**8.测试友好性：**

- 选择一个便于测试的状态管理库可以提高代码质量和未来的维护性。
