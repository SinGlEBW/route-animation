import { RouteObject, useLocation, type RouteMatch } from "react-router-dom";
import { v4 as uuid4 } from "uuid";

type Handle = { handle?: { parentRelation?: string } };
export interface listAllRoutesI extends Partial<Record<"id" | "parentRelation" | "relationToPath", string> & Handle & { path: string }> {
  inx: number;
}

const getParentRelation = (path: string) => {
  let parentRelation = '/';
  if(path.endsWith('/*')){
    const p = path.replace('/*','')
    if(p){ parentRelation = p }
  }
  return parentRelation;
}

const getDefaultParentRelation  = (parentMatches: RouteMatch<string, RouteObject>[]) => {
  let parentRelation = '/'
  const findItemMatches = parentMatches[parentMatches.length - 1];
  if(findItemMatches){
    parentRelation = findItemMatches.pathnameBase;
  }
  return parentRelation;
}


export type ItemsRoutes = (RouteObject & Handle)[];
export const getListRoutes = (routes: ItemsRoutes, parentMatches: RouteMatch<string, RouteObject>[]) => {
  const listAllRoutes: listAllRoutesI[] = [];
  let parentRelation: string = "/";
  let relationToPath: string = "";
  let inx = 0;

  const recursiveFindChildren = (arr: ItemsRoutes) => {
    for (let i = 0; i < arr.length; i++) {
      const { id, path, children, handle, index } = arr[i];

      const isParentRelation = handle && (("parentRelation" in handle) as boolean);
      const isChildren = !!(children && children.length);

      let currentPath = "";
      let pathParentRelation = "";

      parentRelation = isParentRelation ? handle.parentRelation : getDefaultParentRelation(parentMatches)

      if (index) {
        // currentPath = isParentRelation ? getConnectPath(handle.parentRelation) : "/";
        currentPath = getConnectPath(parentRelation);
      } else {

        const pathRoute = path ? path : (listAllRoutes[listAllRoutes.length - 1].path as string);
      
        if (!parentRelation.endsWith("/") && !pathRoute.startsWith("/")) {
          pathParentRelation = parentRelation + "/" + pathRoute;
        } else {
          pathParentRelation = parentRelation + pathRoute;
        }

        currentPath = getConnectPath(pathParentRelation);
      }


      relationToPath = currentPath as string;

      if (!isChildren) {
        if (listAllRoutes.length) {
          const prevRelationToPage = listAllRoutes[listAllRoutes.length - 1].relationToPath;
          if (parentRelation === prevRelationToPage && parentRelation !== "/") {
            relationToPath = prevRelationToPage;
          }
        }
      }

      // const pathPayload = isParentRelation ? getConnectPath(handle?.parentRelation + p ) : p;


      const payloadPush = {
        id: id ? id : uuid4(),
        inx,
        path: currentPath,
        handle,
        parentRelation,
        relationToPath,
      };

    
      listAllRoutes.push(payloadPush);
      inx++;
      if (isChildren) {
        parentRelation = currentPath as string;
        recursiveFindChildren(children);
        parentRelation = "/";
      }
    }

  };

  recursiveFindChildren(routes);
  return listAllRoutes;
};

const getConnectPath = (path) => {
  const itemsPath = path.split("/");
  const filterItemsPath = itemsPath.filter((i) => i);
  const p = "/" + filterItemsPath.join("/");
  return p;
};

const getIndexPath = (parentRelation) => {
  return parentRelation ? getConnectPath(parentRelation) + "/" : "/";
};
