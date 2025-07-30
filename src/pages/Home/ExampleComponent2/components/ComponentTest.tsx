import { Box, Button } from "@mui/material";
import React, { useMemo } from "react";

import {
  NavLink,
  useLocation,
  useRoutes,
  type RouteObject,
} from "react-router-dom";
import { RouteAnimation } from '../../../../lib';
import { Other } from './Other';


const slideKeys = ["keyName1", "keyName2", "keyName3"] as const;
const ComponentTestMemo = ({ parentRelation, keyName }) => {
  const dataChartsPath = {
    keyName1: "/chart-1",
    keyName2: "/chart-2",
    keyName3: "/chart-3",
  };
  /*-------------------------------------------------------------------*/
  //INFO: Error >> Don't use it that way
  // const pathChart = dataChartsPath[keyName];
  // const popupRoutes: RouteObject[] = [
  //   {
  //     path: pathChart + "/*",
  //     element: (
  //       <Box>
  //         <Box
  //           sx={{
  //             mt: 2,
  //             display: "flex",
  //             justifyContent: "space-between",
  //             flexWrap: "wrap",
  //           }}
  //         >
  //           <SlideContainer
  //             parentRelation={parentRelation + pathChart}
  //             keyName={keyName}
  //           />
  //         </Box>
  //       </Box>
  //     ),
  //     handle: {
  //       parentRelation,
  //     },
  //   },
  // ];
  /*-------------------------------------------------------------------*/
  
  const slideRoutes = useMemo(
    () =>
      slideKeys.map((keyItem) => {
        const pathChart = dataChartsPath[keyItem];
        return {
          path: pathChart + "/*",
          element: (
            <Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <SlideContainer
                  parentRelation={parentRelation + pathChart}
                  keyName={keyItem}
                />
              </Box>
            </Box>
          ),
          handle: { parentRelation },
        };
      }),
    [parentRelation, keyName]
  );

  const location = useLocation();
  const routes = useRoutes(slideRoutes, location);
  return (
    <Box sx={{ mt: 2 }}>
      <RouteAnimation itemsRoutes={slideRoutes} mode="slide">
        {routes}
      </RouteAnimation>
    </Box>
  );
};

export const ComponentTest = React.memo(ComponentTestMemo);












const SlideContainer = ({ parentRelation, keyName }) => {
  const dataPath = {
    keyName1: {
      pathChart: "/chart-1",
      pathTable: "/table-1",
      pathExtendsTable: "/extendsTable-1",
    },
    keyName2: {
      pathChart: "/chart-2",
      pathTable: "/table-2",
      pathExtendsTable: "/extendsTable-2",
    },
    keyName3: {
      pathChart: "/chart-3",
      pathTable: "/table-3",
      pathExtendsTable: "/extendsTable-3",
    },
  };
  const { pathChart, pathTable, pathExtendsTable } = dataPath[keyName];


  const slideRoutes = [
    {
      index: true,
      // path: 'table-1',
      element: (
        <>
          <p>Chart: {keyName}</p>
          <Button
            variant={"outlined"}
            component={NavLink}
            to={parentRelation +  pathTable}
          >
            Next Table
          </Button>
        </>
      ),
      handle: {   action: 'index' },
    },


    // {
    //   path: `/other/*`,
    //   element: <Other parentRelation={parentRelation + '/other'} />,
    //   handle: { parentRelation: parentRelation, action: '/*' },
    // },
    {
      path: `/*`,
      element: <Other parentRelation={parentRelation} />,
      handle: {  action: '/*' },
    },


    // {
    //   path: pathTable,
    //   element: (
    //     <>
    //       <Header/>
    //       <p>Table: {keyName}</p>
    //       <Button
    //         variant={"outlined"}
    //         component={NavLink}
    //         to={parentRelation + pathExtendsTable}
    //       >
    //         Next Extends Table
    //       </Button>
    //       <Button variant={"outlined"} component={NavLink} to={parentRelation}>
    //         Back Chart
    //       </Button>
    //     </>
    //   ),
    //   handle: { parentRelation },
    // },
    // {
    //   path: pathExtendsTable,
    //   element: (
    //     <>
    //       <Header/>
    //       <p>Extends Table: {keyName}</p>
    //       <Button
    //         variant={"outlined"}
    //         component={NavLink}
    //         to={parentRelation + pathTable}
    //       >
    //         Back Table
    //       </Button>
    //     </>
    //   ),
    //   handle: { parentRelation },
    // },



  ];
  const location = useLocation();
  const routes = useRoutes(slideRoutes, location);


  return (
    <Box sx={{ mt: 2 }}>
      <RouteAnimation itemsRoutes={slideRoutes} mode="slide">
        {routes}
      </RouteAnimation>
    </Box>
  );
};
