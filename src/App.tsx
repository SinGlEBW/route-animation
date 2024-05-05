import React from 'react';
import { Container } from '@mui/material'
import { RouteObject, useLocation, useRoutes } from 'react-router-dom'

import { Home, Posts, Settings } from './pages'
import { Header } from './components/Header/Header'

import { FooterNav } from './components/FooterNav/FooterNav'
import { CONST_ROUTES_PRIVATE } from './CONTS/CONST_ROUTES'
import { RouteAnimation } from './lib';
// import {  } from 'route-animation';




const itemsRoutes: RouteObject[] = [
  { path: CONST_ROUTES_PRIVATE.PAGE_HOME + '/*', element: <Home /> },
  { path: CONST_ROUTES_PRIVATE.PAGE_POSTS, element: <Posts /> },
  { path: CONST_ROUTES_PRIVATE.PAGE_SETTINGS + '/*', element: <Settings /> }
]

export function App() {
  const location = useLocation();
  const routes = useRoutes(itemsRoutes, location);

  return (
    <>
      <Header />
      <div className={'content_app'} style={{ position: 'relative' }} >
        <Container sx={{ py: 1, position: 'relative' }}>
          <RouteAnimation itemsRoutes={itemsRoutes}  mode='slide' animation='slide' typeAnimation='no-destroy'  isFadeSlide={true}  >
            <>{routes}</>
          </RouteAnimation>
        </Container>
      </div>
      <FooterNav />
    </>
  )
}

