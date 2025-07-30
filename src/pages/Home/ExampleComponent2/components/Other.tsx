import { Box, Button } from '@mui/material';
import React, { FC, ReactNode } from "react"
import { NavLink, useLocation, useRoutes } from 'react-router-dom';
import { RouteAnimation } from '../../../../lib';

export interface OtherProps {
  children?: ReactNode;
  parentRelation: string
}

const OtherMemo:FC<OtherProps> = ({parentRelation}) => {
  const location = useLocation();

//"/home-slide/chart-1/other"
  const items = [{
    path: 'table-1',
    // index: true,
    element: (
      <>
        <Header />
        <p>Table: 1</p>
        <Button
          variant={"outlined"}
          component={NavLink}
          to={parentRelation + '/extendsTable-1'}
        >
          Next Extends Table
        </Button>
        <Button variant={"outlined"} component={NavLink} to={'/home-slide/chart-1'}>
          Back Chart
        </Button>
      </>
    ),
    handle: { action: 'table chart' },
  },
  {
    path: 'extendsTable-1',
    element: (
      <>
        <Header />
        <p>Extends Table: 1</p>
        <Button
          variant={"outlined"}
          component={NavLink}
          to={parentRelation + '/table-1'}
        >
          Back Table
        </Button>
      </>
    ),
    handle: { action: 'extends table chart' },
  }

]
  const routes = useRoutes(items, location);


  return (
    <>
      <p>Other</p>
      <Box sx={{ mt: 2 }}>
        <RouteAnimation itemsRoutes={items} mode="slide">
          {routes}
        </RouteAnimation>
      </Box>
    </>
  )
};

export const Other = React.memo(OtherMemo);

const Header = (params) => {
  return (
    <header>Header</header>
  )
}

