import React, { type FC } from "react";
import { useLocation, useRoutes } from 'react-router-dom';
import { RouteAnimation, type SlideTransitionProps,  } from '@lib';
// import {  } from '@lib/Animation/ReactTransition/SlideTransition/SlideTransition';
// import { SlideTransitionProps } from 'route-animation/dist/RouteAnimation/Animation/ReactTransition/SlideTransition/SlideTransition';

interface RouteAnimationCustomProps {
  itemsRoutes: any[];
  typeAnimation?: SlideTransitionProps['typeAnimation'];
  duration?: SlideTransitionProps['duration']
}

const RouteAnimationCustomMemo: FC<RouteAnimationCustomProps> = ({ itemsRoutes, typeAnimation = 'total-forward', ...props }) => {
  const location = useLocation();
  const routes = useRoutes(itemsRoutes, location)
  return (
    <RouteAnimation
      className=''
      itemsRoutes={itemsRoutes}
      mode='slide'
      sx={{ height: '100%', width: '100%' }}
      typeAnimation={typeAnimation}
      sxItem={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
      {...props as any}>
      {routes}
    </RouteAnimation>
  )
};

export const RouteAnimationCustom = React.memo(RouteAnimationCustomMemo);
