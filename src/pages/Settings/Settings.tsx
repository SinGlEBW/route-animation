import React, { useEffect } from "react"

import { Box, Button, Typography } from '@mui/material';
import { NavLink, RouteObject, useLocation, useRoutes } from 'react-router-dom';
import { RouteAnimation } from 'route-animation';







const itemsRoutesForSlide2: RouteObject[] = [
  {
    path: '/1',
    element: (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant={'outlined'} component={NavLink} to={'/settings/2/2'}>Вперёд</Button>
        </Box>
        <p>Lorem Slide3.</p>
      </Box>
    ),
    handle: { parentRelation: '/settings/2' },
  },
  {
    path: '/2',
    element: (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant={'outlined'} component={NavLink} to={'/settings/2'}>Закончить</Button>
        </Box>
        <p> Lorem Slide4.</p>
      </Box>
    ),
    handle: { parentRelation: '/settings/2' }
  },
]

export const Slide2 = () => {
  const location = useLocation();
  const routes = useRoutes(itemsRoutesForSlide2, location);
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant={'outlined'} component={NavLink} to={'/settings/1'}>Назад</Button>
        <Button variant={'outlined'} component={NavLink} to={'/settings/2/1'}>Вложенный роут</Button>
        <Button variant={'outlined'} component={NavLink} to={'/settings'}>Закончить</Button>
      </Box>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p>
      <RouteAnimation animation='vertical-slide' itemsRoutes={itemsRoutesForSlide2}>
        <>{routes}</>
      </RouteAnimation>
    </Box>
  )
}

const itemsRoutes: RouteObject[] = [
  {
    path: '/1',
    element: (
      <Box>
        <Button variant={'outlined'} component={NavLink} to={'/settings/2'}>Вперёд</Button>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis necessitatibus amet accusantium non hic vitae. Sunt amet adipisci dolor, pariatur eligendi repellendus commodi quae dolore sit tempora dolores velit culpa?
          Eveniet aut voluptatum quia cumque harum animi voluptate ducimus velit aspernatur quaerat et omnis saepe, at nulla, consectetur itaque natus quod, odit quibusdam deleniti suscipit quas quam sequi quisquam. Cupiditate.
          Nemo aspernatur eveniet accusantium.
        </p>
      </Box>
    ),
    handle: {
      parentRelation: '/settings'
    },
  },
  {
    path: '/2/*',
    element: <Slide2 />,
    handle: {
      parentRelation: '/settings'
    }
  },
]

const SettingsMemo = () => {
  const location = useLocation();
  const routes = useRoutes(itemsRoutes, location);

  useEffect(() => {
    console.dir('Render Settings');
    return () => {
      console.dir('Покинули Render Settings');
    }
  }, [])

  return (
    <div className='settings'>
      <Typography>Settings</Typography>
   
      <Box>
        <Button component={NavLink} to={'/settings/1'} variant={'outlined'}>Начать</Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <RouteAnimation itemsRoutes={itemsRoutes}>
          <>{routes}</>
        </RouteAnimation>
      </Box>
    </div>
  )
};

export const Settings = React.memo(SettingsMemo);


