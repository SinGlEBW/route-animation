import { RouteObject } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

type Handle =  {handle?: {parentRelation?: string}};
export interface listAllRoutesI extends Partial<Record<'id' | 'parentRelation' | 'relationToPath', string> & Handle & {path: string}>{
  inx:number
}
export type ItemsRoutes = (RouteObject & Handle)[]
export const getListRoutes = (routes:ItemsRoutes) => {

  const listAllRoutes: listAllRoutesI[] = [];
  let parentRelation:string = '/';
  let relationToPath:string = '';
  let inx = 0;
  
  
  const recursiveFindChildren = (arr:ItemsRoutes) => {
  
    for(let i = 0; i < arr.length; i++){
      const { id, path, children, handle, index } = arr[i]
     
      
      const isParentRelation = handle && 'parentRelation' in handle as boolean;
      let currentPath = '';// index ? isParentRelation ? getConnectPath(handle.parentRelation) : '/' : path ? path : listAllRoutes[listAllRoutes.length - 1].path;
    
      if(index){
        currentPath = isParentRelation ? getConnectPath(handle.parentRelation) : '/';
      }else{
          
        const p = path ? path : listAllRoutes[listAllRoutes.length - 1].path as string;
        currentPath = isParentRelation ? getConnectPath(handle.parentRelation + p) : p
        // currentPath = isParentRelation ? getConnectPath(handle.parentRelation) + p : p
      }

      const isChildren = !!(children && children.length);
   
      relationToPath = currentPath as string;
      if(!isChildren){
        if(listAllRoutes.length){
          const prevRelationToPage = listAllRoutes[listAllRoutes.length - 1].relationToPath
          if(parentRelation === prevRelationToPage && parentRelation !== '/'){
            relationToPath = prevRelationToPage;
          }
        }
      }

    
      // const pathPayload = isParentRelation ? getConnectPath(handle?.parentRelation + p ) : p;

      // if(currentPath == '//'){
     

      // }

      const payloadPush = { 
        id: id ? id : uuid4(),
        inx, 
        path: currentPath, 
        handle, 
        parentRelation: isParentRelation ? handle?.parentRelation : parentRelation, 
        relationToPath 
      }
      listAllRoutes.push(payloadPush);
      inx++;
      if(isChildren){
        parentRelation = currentPath as string;
        recursiveFindChildren(children);
        parentRelation = '/';
      }
    }
  }
  recursiveFindChildren(routes);
  return listAllRoutes;
}

const getConnectPath = (path) => {
  // debugger
  const itemsPath = path.split('/');
  const filterItemsPath = itemsPath.filter((i) => i);
  const p = '/' + filterItemsPath.join('/');
  return p;
}

const getIndexPath = (parentRelation) => {
  return parentRelation ? getConnectPath(parentRelation) + '/'  : '/'
}


/*
    const recursiveFindChildren = (arr:ItemsRoutes) => {
    
    for(let i = 0; i < arr.length; i++){
      const { id, path, children, handle, index } = arr[i];
    
      const p = index ? handle?.parentRelation ? handle.parentRelation : '/' : path ? path : listAllRoutes[listAllRoutes.length - 1].path;


      const isChildren = !!(children && children.length);
   
      relationToPath = p as string;
      if(!isChildren){
        if(listAllRoutes.length){
          const prevRelationToPage = listAllRoutes[listAllRoutes.length - 1].relationToPath
          if(parentRelation === prevRelationToPage && parentRelation !== '/'){
            relationToPath = prevRelationToPage;
          }
        }
      }
      const payloadPush = { 
        id: id ? id : uuid4(),
        inx, 
        path: handle && handle?.parentRelation ? getConnectPath(handle?.parentRelation + p ) : p, 
        handle, 
        parentRelation: handle && handle?.parentRelation ? handle?.parentRelation : parentRelation, 
        relationToPath 
      }
      listAllRoutes.push(payloadPush);
      inx++;
      if(isChildren){
        parentRelation = p as string;
        recursiveFindChildren(children);
        parentRelation = '/';
      }
    }
  }
  recursiveFindChildren(routes);
  return listAllRoutes;
}
*/