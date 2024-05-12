import { useContext, useMemo, useReducer, useRef, useState } from "react";
import { Location, UNSAFE_RouteContext, useInRouterContext, useLocation, useMatch, useMatches, useOutletContext } from 'react-router-dom';
import { ItemsRoutes, getListRoutes, listAllRoutesI } from './helpers/getListRoutes';
export type { ItemsRoutes } from './helpers/getListRoutes';

/*
  Если не использовать '/*' изначальной слайн резко отображает т.к. не меняется id.(path)
  Пример вместо отображения 1го элемента /setting/1 даже если мы не перешли на него. 
  Нужно попробовать задать  /setting/
*/




const useGetKeyMotion = (routes:ItemsRoutes) => {

  const [state] = useState<{extendsRoutes: listAllRoutesI[]}>(() => {
    const extendsRoutes = getListRoutes(routes)

    return { extendsRoutes }  
  });

  const location = useLocation();


  const { matches: parentMatches } = useContext(UNSAFE_RouteContext);
  const findHandleDataRoute =  useMemo(() => findPage(state.extendsRoutes, location), [location]);
  // debugger

  const parentPath = parentMatches.length ? parentMatches[0]?.route?.path : ''
  
  const returnData = {
    location,
    extendsRoutes: state.extendsRoutes,
    handleDataRoute: findHandleDataRoute
    ? findHandleDataRoute 
    : parentPath ? {path: parentPath, inx: -1} : state.extendsRoutes[0]// state.extendsRoutes[0] // { path: state.extendsRoutes[0].parentRelation, inx: -1 } //Добавлять из сохранённого общего стэйта 
  }
  // console.dir(returnData);

  // console.log('matches:', parentMatches);
  // console.log('routes:', routes);
  // console.log('state.extendsRoutes:', state.extendsRoutes);
  // console.log('findHandleDataRoute:', findHandleDataRoute);
  // console.log('returnData.handleDataRoute:', returnData.handleDataRoute);
  return returnData
};

export { useGetKeyMotion };

const findPage = (routes:listAllRoutesI[], location:Location<any>)  => routes.find(({ path, ...a }) => {
  const isStarInEnd =  path?.endsWith('*');
  if(isStarInEnd && path && path !== '/*'){
    path = path.replace('/*', '')
    return location.pathname.startsWith(path)
  }
  const p = path === '/*' ?  '/' === location.pathname : path === location.pathname
  return p
})

// const useGetKeyMotion = (routes:ItemsRoutes) => {
//   const [state] = useState<{extendsRoutes: listAllRoutesI[]}>(() => {
//     const extendsRoutes = getListRoutes(routes)
//     return { extendsRoutes }  
//   });
  
//   const location = useLocation();
//  // const prevRouteRef = useRef<listAllRoutesI | null>(null);
//     debugger
//   const findHandleDataRoute =  useMemo(() => findPage(state.extendsRoutes, location), [location]);
//  // prevRouteRef.current = findHandleDataRoute ? findHandleDataRoute : prevRouteRef.current;
  

//   const returnData = {
//     location,
//     extendsRoutes: state.extendsRoutes,
//     handleDataRoute: findHandleDataRoute
//     ? findHandleDataRoute 
//     :  { path: state.extendsRoutes[0].parentRelation, inx: -1 }// state.extendsRoutes[0] // { path: state.extendsRoutes[0].parentRelation, inx: -1 } //Добавлять из сохранённого общего стэйта 
//   }
//   console.dir(returnData);
//   return returnData
// };

// export { useGetKeyMotion };

// const findPage = (routes:listAllRoutesI[], location:Location<any>)  => routes.find(({ path, ...a }) => {
//   const isStarInEnd =  path?.endsWith('*');
//   if(isStarInEnd && path && path !== '/*'){
//     path = path.replace('/*', '')
//     return location.pathname.startsWith(path)
//   }
//   const p = path === '/*' ?  '/' === location.pathname : path === location.pathname
//   return p
// })

