import React, { useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";
import { NavLink, RouteObject, useLocation, useRoutes } from "react-router-dom";

// import { RouteAnimation } from "route-animation";
import { CONST_ROUTES_PRIVATE } from '../../CONTS/CONST_ROUTES';
import { RenderCard } from '../../components/RenderCard/RenderCard';
import { RouteAnimation } from '../../lib';


const TestComponent = ({parentRelation}) => {
  const TestComponentRoutes: RouteObject[] = [
    {
      index: true,
      path: '/',
      element: (
        <Box>
          <Button variant={'outlined'} component={NavLink} to={parentRelation + '/11'}>Вперёд</Button>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <RenderCard />
            <RenderCard />
            <RenderCard />
          </Box>
        </Box>
      ),
      handle: {
        parentRelation
      },
    },
    {
      path: parentRelation + '/11',
      element: (
        <Box>
          <Button variant={'outlined'} component={NavLink} to={CONST_ROUTES_PRIVATE.PAGE_SETTINGS + '1'}>Назад</Button>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            йцуцйуцйу
          </Box>
        </Box>
      ),
      handle: {
        parentRelation
      },
    }
  ]
  const location = useLocation();
  const routes = useRoutes(TestComponentRoutes, location);
  return (
    <RouteAnimation itemsRoutes={TestComponentRoutes} mode='slide' typeAnimation='total-forward' >
      <>{routes}</>
    </RouteAnimation>
  )
}
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
        <Button variant={"outlined"} component={NavLink} to={"/settings"}>
          Закончить
        </Button>
      </Box>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      <RouteAnimation
        mode='slide'
        animation="slide"
        itemsRoutes={itemsRoutesForSlide2}
      >
        <>{routes}</>
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

const SettingsMemo = () => {
  const location = useLocation();
  const routes = useRoutes(settingsRoutes, location);

  useEffect(() => {
    console.dir("Render Settings");
    return () => {
      console.dir("Покинули Render Settings");
    };
  }, []);

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
          <>{routes}</>
        </RouteAnimation>
      </Box>
    </div>
  );
};

export const Settings = React.memo(SettingsMemo);
