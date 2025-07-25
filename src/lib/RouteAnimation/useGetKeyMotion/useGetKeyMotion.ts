import { useContext, useMemo, useReducer, useRef, useState } from "react";
import { Location, UNSAFE_RouteContext, useInRouterContext, useLocation, useMatch, useMatches, useOutletContext, useParams, Params, useSearchParams, parsePath } from 'react-router-dom';
import { ItemsRoutes, getListRoutes, listAllRoutesI } from './helpers/getListRoutes';
export type { ItemsRoutes } from './helpers/getListRoutes';

/*
  Если не использовать '/*' изначальной слайд резко отображает т.к. не меняется id.(path)
  Пример вместо отображения 1го элемента /setting/1 даже если мы не перешли на него. 
  Нужно попробовать задать  /setting/
*/



export const useGetKeyMotion = (routes:ItemsRoutes) => {
  const { matches: parentMatches } = useContext(UNSAFE_RouteContext);
  const param = useParams();
  const location = useLocation();
  const [state] = useState<{extendsRoutes: listAllRoutesI[]}>(() => {
    const extendsRoutes = getListRoutes(routes);
    // console.dir(param);
    // console.dir(parentMatches);
    // console.dir(location);
    // if(param && parentMatches.length){
    //   const {["*"]: starParam, ...othersParams } = param;
    //   const entriesParams = Object.entries(othersParams);
    //   const findItemMatches = parentMatches.find(({pathnameBase}) => pathnameBase === location.pathname)
    //   if(findItemMatches){
    //     const pathWithParamString = findItemMatches.route.path;
    //     const a = parsePath(pathWithParamString as string);
    //   }
    // }
    // 
    return { extendsRoutes }  
  });

 
  const findHandleDataRoute =  useMemo(() => {
    const findItem = findPage(state.extendsRoutes, location, param);
    return findItem;
  }, [location]);
  

  const parentPath = parentMatches.length ? parentMatches[0]?.route?.path : ''
  
  const returnData = {
    location,
    extendsRoutes: state.extendsRoutes,
    handleDataRoute: findHandleDataRoute
    ? findHandleDataRoute 
    : parentPath ? {path: parentPath, inx: -1} : state.extendsRoutes[0]// state.extendsRoutes[0] // { path: state.extendsRoutes[0].parentRelation, inx: -1 } //Добавлять из сохранённого общего стэйта 
  }

  return returnData
};



const findPage = (routes:listAllRoutesI[], location:Location<any>, param:Params)  => routes.find(({ path, ...a }) => {
  
  const isStarInEnd =  path?.endsWith('*');
  if(isStarInEnd && path && path !== '/*'){
    path = path.replace('/*', '')
    return location.pathname.startsWith(path)
  }

  if(param){
    const {["*"]: starParam, ...othersParams } = param;

  }

  //Искать ключ в альтернативном пути который выглядит как /setting/:id
  /*
    В теории ключ один искать его имя в path
  */
  // const strRgx = /\/:\w+(\/)*$/ig;
  // const regExp = new RegExp(strRgx);
  
  // if(path && regExp.test(path)){
  //   path = path.replace(strRgx, '')
  //   return location.pathname.startsWith(path)
  // }

  const p = path === '/*' ?  '/' === location.pathname : path === location.pathname
  return p
})

const deleteEndSlash = (path) => {
  if(path === '/'){
    return path
  }
  if(path.endsWith('/')){
    return path.slice(0, -1)
  }
  return path
}

