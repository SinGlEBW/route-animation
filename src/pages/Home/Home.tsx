import { Box, Button } from "@mui/material";
import React from "react";
import {
  NavLink,
  useLocation,
  useRoutes,
  type RouteObject,
} from "react-router-dom";

import { ExampleComponent1 } from "./ExampleComponent1/ExampleComponent1";
import { ExampleComponent2 } from "./ExampleComponent2/ExampleComponent2";
import { CONST_ROUTES_PRIVATE } from '@/CONTS/CONST_ROUTES';
import { PopupContainer } from '../PopupContainer/PopupContainer';
import { RouteAnimation } from '@/lib';


const { PAGE_HOME, PAGE_POSTS, PAGE_SETTINGS, PAGE_EXTENDS_INFO_POPUP } = CONST_ROUTES_PRIVATE;

const popupItemsRoutes: RouteObject[] = [
  {
    path: PAGE_EXTENDS_INFO_POPUP + "/*",
    element: <PopupContainer />,
  }
]

const HomeMemo = () => {
  const location = useLocation();
  // const popupPageRoutes = useRoutes(popupItemsRoutes, location);



  return (
    <div className="home">
      <h1>Home</h1>
      <Box sx={{ mt: 2 }}>
        {/* <ExampleComponent1 /> */}
        <ExampleComponent2 />
        {/* <ExampleComponent3 /> */}

      </Box>

      {/* {popupPageRoutes} */}
      {/* <RouteAnimation sx={{ zIndex: 100 }} itemsRoutes={popupItemsRoutes} isPopup={true} animation={'vertical-slide'} isFadeSlide={false}
        mode="slide" typeAnimation='destroy' >
        {popupPageRoutes}
      </RouteAnimation> */}

    </div>
  );
};

export const Home = React.memo(HomeMemo);
