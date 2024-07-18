import { useRef } from 'react';
import type { listAllRoutesI } from '../useGetKeyMotion/helpers/getListRoutes';
//INFO: Добавить в route-animation

export const useDirection = (handleDataRoute: listAllRoutesI) => {
  const prevRouteRef = useRef<typeof handleDataRoute | null>(null);
  const direction = useRef('forward');//undirected

  /*--------------------------------------------------------------*/

  if (handleDataRoute && prevRouteRef.current?.path && prevRouteRef.current.path !== handleDataRoute.path) {
    const indexDiff = handleDataRoute.inx - prevRouteRef.current.inx;
    if (indexDiff > 0) {
      direction.current = 'forward';
    } else if (indexDiff < 0) {
      direction.current = 'back';
    } else if (indexDiff === 0) {
    
      direction.current = 'undirected';
      // direction.current = 'forward';
    }
  }

  prevRouteRef.current = handleDataRoute;
  return direction.current;
}