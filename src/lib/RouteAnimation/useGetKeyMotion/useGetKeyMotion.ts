import { useMemo, useRef, useState } from "react"
import { useLocation, Location } from 'react-router-dom';
import { getListRoutes, listAllRoutesI, ItemsRoutes } from './helpers/getListRoutes';
export type { ItemsRoutes } from './helpers/getListRoutes';



const useGetKeyMotion = (routes:ItemsRoutes) => {
  const [state] = useState<{extendsRoutes: listAllRoutesI[]}>(() => {
    const extendsRoutes = getListRoutes(routes)
    return { extendsRoutes }  
  });
  
  const location = useLocation();
  const prevRouteRef = useRef<listAllRoutesI | null>(null);
  
  const findHandleDataRoute =  useMemo(() => findPage(state.extendsRoutes, location), [location]);
  prevRouteRef.current = findHandleDataRoute ? findHandleDataRoute : prevRouteRef.current;
  
  return {
    location,
    extendsRoutes: state.extendsRoutes,
    handleDataRoute: findHandleDataRoute
    ? findHandleDataRoute 
    : state.extendsRoutes[0] // { path: state.extendsRoutes[0].parentRelation, inx: -1 } //Добавлять из сохранённого общего стэйта 
  }
};

export { useGetKeyMotion } 

const findPage = (routes:listAllRoutesI[], location:Location<any>)  => routes.find(({ path, ...a }) => {
  const isStarInEnd =  path?.endsWith('*');
  if(isStarInEnd && path && path !== '/*'){
    path = path.replace('/*', '')
    return location.pathname.startsWith(path)
  }
  const p = path === '/*' ?  '/' === location.pathname : path === location.pathname
  return p
})

