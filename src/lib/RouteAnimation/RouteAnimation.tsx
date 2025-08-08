import type { FC } from 'react';
import React, { useContext, useRef } from 'react';
import { useGetKeyMotion, ItemsRoutes } from './useGetKeyMotion/useGetKeyMotion';
import { ReactTransition, FTProps, STProps,  } from './Animation/ReactTransition/ReactTransition';
import { SlidePopupProps } from './Animation/ReactTransition/SlideTransition/SlideTransition';

import { useDirection } from './hook/useDirection';


type ExcludeCommonProps = 'direction' | 'keyAnimation' | 'extendsRoutes' | 'handleDataRoute';

type S = Omit<STProps, ExcludeCommonProps> & {
  direction?: Exclude<STProps['direction'], "undirected"> 
} & SlidePopupProps;

type F = Omit<FTProps, ExcludeCommonProps>

type RouteAnimationPropsCommon = S | F;
export type RouteAnimationProps =  RouteAnimationPropsCommon & { itemsRoutes: ItemsRoutes };

const RouteAnimationMemo: FC<RouteAnimationProps> = (props) => {
  const { itemsRoutes, children, direction: initDirection,  ...p } = props as RouteAnimationProps & { direction: S['direction']};
  const { handleDataRoute, extendsRoutes } = useGetKeyMotion(itemsRoutes);
  const direction = useDirection(handleDataRoute, initDirection);
 
  return (
    <>
      <ReactTransition 
        keyAnimation={handleDataRoute.path as string} 
        direction={direction}
        
        {...p} 
        {...({extendsRoutes, handleDataRoute})} >
        {children}
      </ReactTransition>
    </>
  )
}

export const RouteAnimation = React.memo(RouteAnimationMemo);



/*
  framer-motion с Routes

  1. Оборачивать Routes одним motion.div
  2. Нужно передать одинаковые key как motion.div так и Routes. (location.pathname т.к. location.key - генерируются новые и получается слайды стакаются, а нам этого не надо).
  3. В Routes использовать location={location.pathname} тогда один слайд будет заменять другим, а не по факту тыкнутый менять сам себя.
  AnimatePresence с Routes:
    initial={false} - отключает при загрузке страницы анимацию
    mode
      sync - держит 2 окна, друг под другом. Для слайда нужно заморочиться с position: 'absolute'
      wait - держать только одно окно. Одно ушло, другое создалось и пришло. Визуально мы не увидим переход с 2мя страницами
      popLayout - тут уже используется position: 'absolute'. страница идёт за страницей

*/