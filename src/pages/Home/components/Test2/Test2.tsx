import { Box, Button } from '@mui/material';
import React, { useMemo } from "react"
import { RouteAnimation } from '../../../../lib';
import { NavLink, useLocation, useRoutes, type RouteObject } from 'react-router-dom';
const popupKeys = [
  'keyName1',
  'keyName2',
  'keyName3',
]
const Test2Memo = ({ parentRelation, keyName }) => {
  const dataChartsPath = {
    keyName1: '/chart-1',
    keyName2: '/chart-2',
    keyName3: '/chart-3',
  }
  // const pathChart = dataChartsPath[keyName];
  // const popupRoutes: RouteObject[] = [
  //   {
  //     path: pathChart + '/*',
  //     element: (
  //       <Box>
  //         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
  //           <SlideContainer
  //             parentRelation={parentRelation + pathChart}
  //             keyName={keyName}
  //           />
  //         </Box>
  //       </Box>
  //     ),
  //     handle: {
  //       parentRelation
  //     },
  //   }
  // ]

  const popupRoutes = useMemo(() => popupKeys.map((keyItem) => {
    const pathChart = dataChartsPath[keyItem];
    return  {
      path: pathChart + '/*',
      element: (
        <Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <SlideContainer
              parentRelation={parentRelation + pathChart}
              keyName={keyItem}
            />
          </Box>
        </Box>
      ),
      handle: {
        parentRelation
      },
    }
  }), [parentRelation,keyName]);

  const location = useLocation();
  const routes = useRoutes(popupRoutes, location);
  return (
    <Box sx={{ mt: 2 }}>
      <RouteAnimation itemsRoutes={popupRoutes} mode='slide'  >
        <>{routes}</>
      </RouteAnimation>
    </Box>
  )
}

export const Test2 = React.memo(Test2Memo);


const SlideContainer = ({ parentRelation, keyName }) => {
  const dataPath = {
    keyName1: {
      pathChart: '/chart-1',
      pathTable: '/table-1',
      pathExtendsTable: '/extendsTable-1'
    },
    keyName2: {
      pathChart: '/chart-2',
      pathTable: '/table-2',
      pathExtendsTable: '/extendsTable-2'
    },
    keyName3: {
      pathChart: '/chart-3',
      pathTable: '/table-3',
      pathExtendsTable: '/extendsTable-3'
    },
  }
  const { pathChart, pathTable, pathExtendsTable } = dataPath[keyName];
  const slideRoutes = [
    {
      index: true,
      element: (
        <>
          <p>Chart: {keyName}</p>
          <Button variant={'outlined'} component={NavLink} to={parentRelation + pathTable}>Next Table</Button>
        </>
      ),
      handle: { parentRelation },
    },
    {
      path: pathTable,
      element: (
        <>
          <p>Table: {keyName}</p>
          <Button variant={'outlined'} component={NavLink} to={parentRelation + pathExtendsTable}>Next Extends Table</Button>
          <Button variant={'outlined'} component={NavLink} to={parentRelation}>Back Chart</Button>
        </>
      ),
      handle: { parentRelation },
    },
    {
      path: pathExtendsTable,
      element: (
        <>
          <p>Extends Table: {keyName}</p>
          <Button variant={'outlined'} component={NavLink} to={parentRelation + pathTable}>Back Table</Button>
        </>
      ),
      handle: { parentRelation },
    },
  ]
  const location = useLocation();
  const routes = useRoutes(slideRoutes, location);
  return (
    <Box sx={{ mt: 2 }}>
      <RouteAnimation itemsRoutes={slideRoutes} mode='slide'  >
        <>{routes}</>
      </RouteAnimation>
    </Box>
  )

}
