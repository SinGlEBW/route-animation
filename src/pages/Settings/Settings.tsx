import React, { useEffect, useState } from "react";

import { Box, Button, Dialog, Portal, Typography } from "@mui/material";
import { NavLink, RouteObject, useLocation, useRoutes } from "react-router-dom";

import { CONST_ROUTES_PRIVATE } from '../../CONTS/CONST_ROUTES';
import { RenderCard } from '../../components/RenderCard/RenderCard';
import { RouteAnimation } from '../../lib';



const itemsRoutesForSlide2: RouteObject[] = [
  {
    path: "/1",
    element: (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant={"outlined"} component={NavLink} to={"/settings/2/2"}>
            Вперёд
          </Button>
        </Box>
        <p>Lorem Slide3.</p>
      </Box>
    ),
    handle: { parentRelation: "/settings/2" },
  },
  {
    path: "/2",
    element: (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant={"outlined"} component={NavLink} to={"/settings/2"}>
            Закончить
          </Button>
        </Box>
        <p> Lorem Slide4.</p>
      </Box>
    ),
    handle: { parentRelation: "/settings/2" },
  },
];

export const Slide2 = () => {
  const location = useLocation();
  const routes = useRoutes(itemsRoutesForSlide2, location);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant={"outlined"} component={NavLink} to={"/settings/1"}>
          Назад
        </Button>
        <Button variant={"outlined"} component={NavLink} to={"/settings/2/1"}>
          Вложенный роут
        </Button>
        <Button variant={"outlined"} component={NavLink} to={"/settings/2/3"}>
          Popup
        </Button>
        <Button variant={"outlined"} component={NavLink} to={"/settings"}>
          Закончить
        </Button>
      </Box>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      <RouteAnimation
        mode='slide'
        animation="vertical-slide"
        itemsRoutes={itemsRoutesForSlide2}
      >
        {routes}
      </RouteAnimation>
    </Box>
  );
};

/*-----------------------------------------------------------------------------*/
const settingsRoutes: RouteObject[] = [
  {
    // index: true, 
    path: "/1",
    element: (
      <Box>
        <Button variant={"outlined"} component={NavLink} to={"/settings/2"}>
          Вперёд
        </Button>
        <Button variant={"outlined"} component={NavLink} to={"/settings"}>
          Назад
        </Button>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis
          necessitatibus amet accusantium non hic vitae. Sunt amet adipisci
          dolor, pariatur eligendi repellendus commodi quae dolore sit tempora
          dolores velit culpa? Eveniet aut voluptatum quia cumque harum animi
          voluptate ducimus velit aspernatur quaerat et omnis saepe, at nulla,
          consectetur itaque natus quod, odit quibusdam deleniti suscipit quas
          quam sequi quisquam. Cupiditate. Nemo aspernatur eveniet accusantium.
        </p>
      </Box>
    ),
    handle: {
      parentRelation: "/settings",
    },
  },
  {
    path: "/2/*",
    element: <Slide2 />,
    handle: {
      parentRelation: "/settings",
    },
  },
];


const Popup = (params) => {

  return (
    <Box sx={{background: '#456', height: '50%'}}>
      <Button variant={"outlined"} component={NavLink} to={"/settings/2"}>
        Назад
      </Button>
      <p>Popup</p>
    </Box>
  )
}


const popupItemsRoutes: RouteObject[] = [
  {
    path: "/2/3",
    element: <Popup />,
    handle: {
      parentRelation: "/settings",
    },
  },
];




const SettingsMemo = () => {
  const location = useLocation();
  const routes = useRoutes(settingsRoutes, location);
  const routesPopup = useRoutes(popupItemsRoutes, location);

 

 


  return (
    <div className="settings">
      <Typography>Settings</Typography>

      <Box>
        <Button component={NavLink} to={"/settings/1"} variant={"outlined"}>
          Начать
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <RouteAnimation itemsRoutes={settingsRoutes} mode="slide" typeAnimation='total-forward' >
          {routes}
        </RouteAnimation>
      </Box>
      <Portal container={document.body}>

      <RouteAnimation itemsRoutes={popupItemsRoutes} isPopup animation={'vertical-slide'} 
        mode="slide" typeAnimation='destroy' >
        {routesPopup}
      </RouteAnimation>
          </Portal>
    </div>
  );
};

export const Settings = React.memo(SettingsMemo);
