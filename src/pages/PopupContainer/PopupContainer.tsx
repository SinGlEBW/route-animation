import { CONST_BY_PAGES, CONST_ROUTES_PRIVATE } from '@/CONTS/CONST_ROUTES';
import { useAppSelector } from '@/store/hooks';
import { appSelectors } from '@/store/reducers/app/app.store';
import { Box } from '@mui/material';
import React, { FC, ReactNode } from "react";
import { useLocation, useRoutes } from 'react-router-dom';
import { RouteAnimationCustom } from './RouteAnimationCustom';


const { PAGE_EXTENDS_INFO_POPUP } = CONST_ROUTES_PRIVATE;

interface ChartProps {}

const Chart: FC<ChartProps> = (props) => {
  const { keyName = 'boilerRoom', titleHeader, from='menu' } = useAppSelector(appSelectors.getActivitySlider);
  const { pathChart, pathTable, pathTableExtend, pathGallery, pathMap } = CONST_BY_PAGES[keyName][from];
console.dir(pathChart);

  const parentRelation =`${PAGE_EXTENDS_INFO_POPUP}/${keyName}/${from}`
  const itemsRoute = [
    {
      path: pathChart,
      element: (
        <>
          <h1>Chart: {pathChart}</h1>
        </>
      ),
      // handle: { parentRelation },
    },
  ]

  const routes = useRoutes(itemsRoute, location)
console.dir(routes);
  return  routes //<RouteAnimationCustom itemsRoutes={itemsRoute} typeAnimation='total-forward' />
}






export interface PopupContainerProps {
  children?: ReactNode;
}

const PopupContainerMemo: FC<PopupContainerProps> = (props) => {
  const { keyName = 'boilerRoom', titleHeader, from = 'menu' } = useAppSelector(appSelectors.getActivitySlider)
  const location = useLocation();
  const items = [
    {
      path: `/${keyName}/${from}/*`,
      element: (
        <Box sx={{ background: '#fff', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', }} >
          <Chart  />
        </Box>
      ),

      // handle: { parentRelation: `${PAGE_EXTENDS_INFO_POPUP}/${keyName}/${from}` },
    }
  ];

  const routes = useRoutes(items, location);


  return routes
};

export const PopupContainer = React.memo(PopupContainerMemo);
