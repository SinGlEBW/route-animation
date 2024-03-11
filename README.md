# route-animation

## Add

```shell script
npm i route-animation
```
>## Condition for animation
>
> - you cannot use the children key for animation
>
> - To use animation in a nested route, you must additionally specify a star. 
>   **{ path: /pathRoute/*, ... }**
>
> - In Router v6, nested routes are specified in path without a parent route, so you need to specify
>   **{handle: { parentRelation: '/nameRoute' } ...}**
>  ------------------------------------------------------------------------------------------

## Use

```tsx
import React from "react"
import { useLocation, useRoutes } from 'react-router-dom'
import { Home, Posts, Settings } from './pages'
import { RouteAnimation } from 'route-animation'

/* Main Route */

const mainRoutes = [
  { path: '/', element: <Home /> },
  { path: '/posts', element: <Posts /> },
  { path: '/settings/*', element: <Settings /> }
  /* children: [] - no used*/
]

export function App() {
  const location = useLocation();
  const routes = useRoutes(mainRoutes, location);

  return (
    <>
      <div className={'content_app'} style={{ position: 'relative' }} >
        <RouteAnimation itemsRoutes={mainRoutes}>
          <>{routes}</>
        </RouteAnimation>
      </div>
    </>
  )
}
```


```tsx
const nestedRouter = [
  {
    path: '/1',
    element: (<div>Component1</div>),
    handle: { parentRelation: '/settings' },
  },
  {
    path: '/2', // /2/* for the next nesting of routes
    element: (<div>Component2</div>),
    handle: {
      parentRelation: '/settings'// /settings/2 for the next route attachment, specify the dependent router
    }
  }
]

const SettingsMemo = () => {
  const location = useLocation();
  const routes = useRoutes(nestedRouter, location);

  return (
    <div className='settings'>
      <Box>
        <Button component={NavLink} to={'/settings/1'} variant={'outlined'}>Начать</Button>
      </Box>
      <RouteAnimation itemsRoutes={itemsRoutes}>
        <>{routes}</>
      </RouteAnimation>
    </div>
  )
};
```



## API

| Prop        | Type       | Required | Default   | Description                                                                                                                                                                                                                       |
| ----------- | ---------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animation` | `string`   |          | `'slide'` | Animation effect type, `'slide'`, `'vertical-slide'`, or `'rotate'`                                                                                                                                                               |
| `duration`  | `number`   |          | `200`     | `transition-duration` in `ms`                                                                                                                                                                                                     |
| `timing`    | `string`   |          | `'ease'`  | `transition-timing-function`, one of `'ease'` `'ease-in'` `'ease-out'` `'ease-in-out'` `'linear'`                                                                                                                                 |
| `destroy`   | `boolean`  |          | `true`    | If `false`, prev page will still exits in dom, just invisible                                                                                                                                                                     |


## EXAMPLE
> [`CodeSandbox Route Animation`](https://codesandbox.io/p/sandbox/route-animation-7sysj6?file=%2Fsrc%2Findex.tsx)

