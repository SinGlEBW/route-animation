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


### Common props

| Prop       | Type                             | 
|------------|----------------------------------|
|`onExit`    |`CSSTransitionProps['onExit']`    |
|`onExited`  |`CSSTransitionProps['onExited']`  |
|`onExiting` |`CSSTransitionProps['onExiting']` |
|`onEnter`   |`CSSTransitionProps['onEnter']`   |
|`onEntered` |`CSSTransitionProps['onEntered']` |
|`onEntering`|`CSSTransitionProps['onEntering']`|   

### RouteAnimation mode = 'slide' (default 'fade')

| Prop          | Type    | Default | Description                                                                                      |
|---------------|---------|---------|--------------------------------------------------------------------------------------------------|
|`animation`    |`string` |`'slide'`| Animation effect type, `'slide'`, `'vertical-slide'`, or `'rotate'`                              |
|`isFadeSlide`  |`boolean`|`'false'`| Change visual animation `'slide'`, `'vertical-slide'`                                            |
|`duration`     |`number` |`200`    | `transition-duration` `ms`                                                                       |
|`timing`       |`string` |`'ease'` | `transition-timing-function`, one of `'ease'` `'ease-in'` `'ease-out'` `'ease-in-out'` `'linear'`|
|`typeAnimation`|`string` |`destroy`|  `destroy`, `no-destroy`, `total-forward`                                                        |



```html
<!-- typeAnimation total-forward    -->
<!--  next slide + 1  -->
<div class="slide-routes slide css-18xklii">
  <div class="item MuiBox-root css-0 forward-enter forward-enter-active"></div>
  <div class="item MuiBox-root css-0 forward-exit forward-exit-active"></div>
  <div class="item MuiBox-root css-0 forward-exit forward-exit-active"></div>
   <!-- total mount item -->
</div>
<!-- back slide -1 -->
<div class="slide-routes slide css-18xklii">
  <div class="item MuiBox-root css-0 back-enter back-enter-active"></div>
   <!-- total unmount item -->
</div>
```

## EXAMPLE
> [`CodeSandbox Route Animation`](https://codesandbox.io/p/sandbox/route-animation-7sysj6?file=%2Fsrc%2Findex.tsx)

