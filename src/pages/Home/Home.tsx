import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from "react";
import { NavLink, useLocation, useRoutes, type RouteObject } from 'react-router-dom';

import { CONST_ROUTES_PRIVATE } from '../../CONTS/CONST_ROUTES';
import { RouteAnimation } from '../../lib';
import { RenderCard } from '../../components/RenderCard/RenderCard';





const itemsHomeRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <Box>
        <Button variant={'outlined'} component={NavLink} to={CONST_ROUTES_PRIVATE.PAGE_HOME + '1'}>Вперёд</Button>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <RenderCard />
          <RenderCard />
          <RenderCard />
        </Box>
      </Box>
    ),
    handle: {
      parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME
    },
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
    handle: {
      parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME
    }
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
    handle: {
      parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME
    }
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
        <RouteAnimation itemsRoutes={itemsHomeRoutes} mode='slide' typeAnimation='total-forward' duration={500} >
          <>{routes}</>
        </RouteAnimation>
      </Box>
    </div>
  )
};

export const Home = React.memo(HomeMemo);
