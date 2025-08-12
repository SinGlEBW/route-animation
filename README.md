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
>   **{handle: { parentRelation: '/nameRoute' } ...}**//It is not necessary to transmit
>  ------------------------------------------------------------------------------------------

## Use 

### Example 1
```tsx
//...
import { RouteAnimation } from 'route-animation'

// Main Route

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
          {routes}
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
    // handle: { parentRelation: '/settings' },
  },
  {
    path: '/2', // /2/* for the next nesting of routes
    element: (<div>Component2</div>),
    // handle: {
    //   parentRelation: '/settings'// /settings/2 for the next route attachment, specify the dependent router
    // }
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
        {routes}
      </RouteAnimation>
    </div>
  )
};
```


### Example 2
```tsx
const mainRoutes: RouteObject[] = [
  { path: '/*', element: <Home /> },
  { path: CONST_ROUTES_PRIVATE.PAGE_POSTS, element: <Posts /> },
  { path: CONST_ROUTES_PRIVATE.PAGE_SETTINGS + '/*', element: <Settings /> }
]

export function App() {
  const location = useLocation();
  const routes = useRoutes(mainRoutes, location);

  return (
    <div className={'content_app'} style={{ position: 'relative' }} >
      <Container sx={{ py: 1, position: 'relative' }}>
        <RouteAnimation itemsRoutes={mainRoutes}  mode='slide' animation='slide' typeAnimation='no-destroy' isFadeSlide={true}  >
          {routes}
        </RouteAnimation>
      </Container>
    </div>
  )
}
  
```

```tsx
// Home
const RenderCard = (params) => {
  return (
    <Card sx={{width: 200}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const itemsHomeRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <Box>
        <Button variant={'outlined'} component={NavLink} to={CONST_ROUTES_PRIVATE.PAGE_HOME + '1'}>Вперёд</Button>
        <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <RenderCard />
          <RenderCard />
          <RenderCard />
        </Box>
      </Box>
    ),
    // handle: {
    //   parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME // home = /
    // },
  },
  {
    path: '/1',
    element: (
      <Box>
        <Button variant={'outlined'} component={NavLink} to={CONST_ROUTES_PRIVATE.PAGE_HOME}>Назад</Button>
        <Button variant={'outlined'} component={NavLink} to={CONST_ROUTES_PRIVATE.PAGE_HOME + '2'}>Вперёд</Button>
        <p>
          Страница расширенной 1
        </p>
      </Box>
    ),
    // handle: {
    //   parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME
    // }
  },
  {
    path: '/2',
    element: (
      <Box>
        <Button variant={'outlined'} component={NavLink} to={CONST_ROUTES_PRIVATE.PAGE_HOME + '1'}>Назад</Button>
        <p>
          Страница расширенной 2
        </p>
      </Box>
    ),
    // handle: {
    //   parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME
    // }
  },
]


const HomeMemo = () => {
  const location = useLocation();
  const routes = useRoutes(itemsHomeRoutes, location);

  return (
    <div className='home'>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolore, molestiae accusamus saepe qui minima esse suscipit quis possimus consequatur numquam.
      </p>
      <Box sx={{ mt: 2 }}>
        <RouteAnimation itemsRoutes={itemsHomeRoutes} mode='slide' typeAnimation='total-forward' >
          {routes}
        </RouteAnimation>
      </Box>
    </div>
  )
};

export const Home = React.memo(HomeMemo);
```

### Example 3

```tsx
const Popup = (params) => {

  return (
    <Box sx={{background: '#fff', height: '100%'}}>
      <Button variant={"outlined"} component={NavLink} to={"/settings"}>
        Назад
      </Button>
      <p>Popup</p>
    </Box>
  )
}


const popupItemsRoutes: RouteObject[] = [
  {
    path: "/2/3",
    element: <Popup />,
    // handle: {
    //   parentRelation: "/settings",
    // },
  },
];



const Settings = () => {
  const location = useLocation();
  const routes = useRoutes(settingsRoutes, location);
  const routesPopup = useRoutes(popupItemsRoutes, location);

  return (
    <div className="settings">
      <Typography>Settings</Typography>
      <Box>
        <Button component={NavLink} to={"/settings/2/3"} variant={"outlined"}>
          Popup
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <RouteAnimation itemsRoutes={settingsRoutes} mode="slide" typeAnimation='total-forward' >
          {routes}
        </RouteAnimation>
      </Box>
      
      <RouteAnimation 
        itemsRoutes={popupItemsRoutes} 
        isPopup={true} 
        animation={'vertical-slide'} 
        mode="slide" 
        typeAnimation='destroy' 
        onPopup={(status) => console.log(status)} >
        {routesPopup}
      </RouteAnimation>


    </div>
  );
};
```


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





## API


### Common props

| Prop       | Type                                 | 
|------------|--------------------------------------|
|`onExit`    |`CSSTransitionProps['onExit']`        |
|`onExited`  |`CSSTransitionProps['onExited']`      |
|`onExiting` |`CSSTransitionProps['onExiting']`     |
|`onEnter`   |`CSSTransitionProps['onEnter']`       |
|`onEntered` |`CSSTransitionProps['onEntered']`     |
|`onEntering`|`CSSTransitionProps['onEntering']`    |   
|`onSlideEnd`|`used if no-destroy or total-forward `|   
|`sx`        |`mui SxProps`|   
|`sxItem`    |`mui SxProps`|   

### RouteAnimation mode = 'slide' (default 'fade')

| Prop          | Type                      | Default         | Description                                                                                      |
|---------------|---------------------------|-----------------|--------------------------------------------------------------------------------------------------|
|`animation`    |`string`                   |`'slide'`        | Animation effect type, `'slide'`, `'vertical-slide'`, or `'rotate'`                              |
|`isFadeSlide`  |`boolean`                  |`false`          | Change visual animation `'slide'`, `'vertical-slide'`                                            |
|`duration`     |`number`                   |`200`            | `transition-duration` `ms`                                                                       |
|`timing`       |`string`                   |`'ease'`         | `transition-timing-function`, one of `'ease'` `'ease-in'` `'ease-out'` `'ease-in-out'` `'linear'`|
|`typeAnimation`|`string`                   |`'destroy'`      |  `destroy`, `no-destroy`, `total-forward`                                                        |
|`direction`    |`string`                   |`'forward'`      |  `forward`, `back`                                                                               |
|`isPopup`      |`boolean`                  |`false`          |  Transfers the route to the body                                                                 |
|`onPopup`      |`(status: boolean) => void`|`undefined`      |  If isPopup is true, you can use onPopup                                                         |





## EXAMPLE. (Also check out the ExampleComponent components on the CodeSandbox)
> [`Route Animation`](https://codesandbox.io/p/sandbox/route-animation-7sysj6?file=%2Fsrc%2Findex.tsx)

