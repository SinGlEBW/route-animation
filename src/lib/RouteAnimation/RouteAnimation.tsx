import type { FC } from 'react';
import React, { useContext, useRef } from 'react';
import { useGetKeyMotion, ItemsRoutes } from './useGetKeyMotion/useGetKeyMotion';
import { ReactTransition, FTProps, STProps,  } from './Animation/ReactTransition/ReactTransition';
import { UNSAFE_RouteContext, useLocation } from 'react-router-dom';
import { useDirection } from './hook/useDirection';


type S = Omit<STProps, 'direction' | 'keyAnimation' | 'extendsRoutes' | 'handleDataRoute'> & {
  itemsRoutes: ItemsRoutes
};
type F = Omit<FTProps, 'direction' | 'keyAnimation'> & {
    itemsRoutes: ItemsRoutes
};

export type RouteAnimationProps =  S | F;


function RouteAnimationMemo(props:RouteAnimationProps) {
  const { itemsRoutes, children, ...p } = props;

  const { handleDataRoute, extendsRoutes } = useGetKeyMotion(itemsRoutes);
  const direction = useDirection(handleDataRoute);

//   const prevRouteRef = useRef<typeof handleDataRoute | null>(null);
//   const direction = useRef<STProps['direction']>('forward');//undirected

// /*--------------------------------------------------------------*/

//   if (handleDataRoute && prevRouteRef.current?.path && prevRouteRef.current.path !== handleDataRoute.path) {
//     const indexDiff = handleDataRoute.inx - prevRouteRef.current.inx;
//     if (indexDiff > 0) {
//       direction.current = 'forward';
//     } else if (indexDiff < 0) {
//       direction.current = 'back';
//     } else if (indexDiff === 0) {
//       debugger
//       direction.current = 'undirected';
//       // direction.current = 'forward';
//     }
//   }

//   prevRouteRef.current = handleDataRoute;

  return (
    <>
      <ReactTransition 
        keyAnimation={handleDataRoute.path as string} 
        direction={direction}
        {...p} 
        {...(p.mode === 'slide' && {extendsRoutes, handleDataRoute} as any)} >
        <>{children}</>
      </ReactTransition>
    </>
  )
}

export const RouteAnimation = React.memo(RouteAnimationMemo);









/*
    const inxPage = getIndexPage(handleDataRoute);
  const [page, setPage] = useState({
    numberPage: inxPage,
    direction: !inxPage ? 'right' : 'left',
    pageInfo: handleDataRoute
  });

  useEffect(() => {

  }, [location])

  const setDirection = (prevNumberPage, handleDataRoute) => {
    const numberPage = getIndexPage(handleDataRoute);

    const payloadState = {
      numberPage,
      direction: prevNumberPage > numberPage ? 'right' : 'left',
      pageInfo: handleDataRoute
    }
    return payloadState
  }
*/

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