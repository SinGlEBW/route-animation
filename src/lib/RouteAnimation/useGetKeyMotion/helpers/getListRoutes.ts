import { RouteObject } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

type Handle =  {handle?: {parentRelation?: string}};
export interface listAllRoutesI extends Partial<Record<'id' | 'parentRelation' | 'relationToPath', string> & Handle & {path: string}>{
  index:number
}
export type ItemsRoutes = (RouteObject & Handle)[]
export const getListRoutes = (routes:ItemsRoutes) => {

  const listAllRoutes: listAllRoutesI[] = [];
  let parentRelation:string = '/';
  let relationToPath:string = '';
  let index = 0;
  
  const recursiveFindChildren = (arr:ItemsRoutes) => {

    for(let i = 0; i < arr.length; i++){
      const { id, path, children, handle } = arr[i];
      const p = path ? path : listAllRoutes[listAllRoutes.length - 1].path;

      // if(p?.endsWith('/*')){
      //   p = p.replace('/*', '');
      // }

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
    
      listAllRoutes.push({ 
        id: id ? id : uuid4(),
        index, 
        path: handle && handle?.parentRelation ? handle?.parentRelation + p : p, 
        handle, 
        parentRelation: handle && handle?.parentRelation ? handle?.parentRelation : parentRelation, 
        relationToPath 
      });
      index++;
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