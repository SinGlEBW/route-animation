import { useMemo, useRef, useState } from "react"
import { useLocation, Location } from 'react-router-dom';
import { getListRoutes, listAllRoutesI, ItemsRoutes } from './helpers/getListRoutes';
export type { ItemsRoutes } from './helpers/getListRoutes';



const useGetKeyMotion = (routes:ItemsRoutes) => {
  const [state] = useState<{extendsRoutes: listAllRoutesI[]}>(() => {
    const extendsRoutes = getListRoutes(routes)
    // StateRoutes.set(extendsRoutes);
    // const saveExtendsRoutes = StateRoutes.get(); 
    return { extendsRoutes }  
  });

  const location = useLocation();
  const prevRouteRef = useRef<listAllRoutesI | null>(null);

  const findHandleDataRoute =  useMemo(() => findPage(state.extendsRoutes, location), [location]);
  prevRouteRef.current = findHandleDataRoute ? findHandleDataRoute : prevRouteRef.current;

  return {
    location,
    handleDataRoute: findHandleDataRoute 
    ? findHandleDataRoute 
    : { path: state.extendsRoutes[0].parentRelation, index: -1 } //Добавлять из сохранённого общего стэйта 
  }
};

export { useGetKeyMotion } 

const findPage = (routes:listAllRoutesI[], location:Location<any>)  => routes.find(({ path }) => {
  const isStarInEnd =  path?.endsWith('*');
  if(isStarInEnd && path){
    path = path.replace('/*', '')
    return location.pathname.startsWith(path)
  }
  return path === location.pathname
})


// class StateRoutes {
//   private static extendsRoutes:listAllRoutesI[] = [];
//   static set(routes:listAllRoutesI[]){
//     for (let i = 0; i < routes.length; i++) {
//       const { path } = routes[i];
//       const isRout = StateRoutes.extendsRoutes.some((item) => item.path === path);
//       if(!isRout){
//         StateRoutes.extendsRoutes.push({...routes[i], index: StateRoutes.extendsRoutes.length });
//       }
//     }
//   }
//   static get(){
//     return StateRoutes.extendsRoutes;
//   }
// }
