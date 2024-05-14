import React, { useMemo, useState } from "react";
import { Box } from '@mui/material';

import { ExampleComponent1 } from './ExampleComponent1/ExampleComponent1';
import { ExampleComponent2 } from './ExampleComponent2/ExampleComponent2';



const HomeMemo = () => {
  return (
    <div className='home'>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolore, molestiae accusamus saepe qui minima esse suscipit quis possimus consequatur numquam.
      </p>
      <Box sx={{ mt: 2 }}>
        {/* <ExampleComponent1/> */}
        <ExampleComponent2/>
      </Box>
    </div>
  )
};

export const Home = React.memo(HomeMemo);

/*
   // {
      //   path: '/1',
      //   element: (
      //     <Box>
      //       <Button variant={'outlined'} component={NavLink} to={CONST_ROUTES_PRIVATE.PAGE_HOME}>Назад</Button>
      //       <Button variant={'outlined'} component={NavLink} to={CONST_ROUTES_PRIVATE.PAGE_HOME + '2'}>Вперёд</Button>
      //       <p>
      //         Страница расширенной 1
      //       </p>
  
      //     </Box>
      //   ),
      //   handle: {
      //     parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME
      //   }
      // },
      // {
      //   path: '/2',
      //   element: (
      //     <Box>
      //       <Button variant={'outlined'} component={NavLink} to={CONST_ROUTES_PRIVATE.PAGE_HOME + '1'}>Назад</Button>
      //       <p>
      //         Страница расширенной 2
      //       </p>
      //     </Box>
      //   ),
      //   handle: {
      //     parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME
      //   }
      // },
*/