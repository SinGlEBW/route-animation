import { useRef } from 'react';
import type { listAllRoutesI } from '../useGetKeyMotion/helpers/getListRoutes';
import type { Direction_OR } from '../Animation/ReactTransition/SlideTransition/components/CustomTransitionGroup';


export const useDirection = (handleDataRoute: listAllRoutesI, initDirection: Omit<Direction_OR, "undirected"> = 'forward') => {
  const prevRouteRef = useRef<typeof handleDataRoute | null>(null);
  const direction = useRef<Direction_OR>(initDirection as Direction_OR);//undirected

  /*--------------------------------------------------------------*/

  if (handleDataRoute && prevRouteRef.current?.path && prevRouteRef.current.path !== handleDataRoute.path) {
    const indexDiff = handleDataRoute.inx - prevRouteRef.current.inx;
    if (indexDiff > 0) {
      direction.current = initDirection as Direction_OR;
    } else if (indexDiff < 0) {
      direction.current =  initDirection === "forward" ? "back" : "forward";
    } else if (indexDiff === 0) {
    
      direction.current = 'undirected' as any;
      // direction.current = 'forward';
    }
  }

  prevRouteRef.current = handleDataRoute;
  return direction.current as Direction_OR
}