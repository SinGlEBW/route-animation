import { Box, Button } from "@mui/material";
import React from "react";
import {
  NavLink,
  useLocation,
  useRoutes,
  type RouteObject,
} from "react-router-dom";

import { RouteAnimation } from "route-animation";
import { CONST_ROUTES_PRIVATE } from "../../../CONTS/CONST_ROUTES";
import { RenderCard } from '../../../components/RenderCard/RenderCard';



const itemsRoutes: RouteObject[] = [
  {
    index: true,
    path: "/",
    element: (
      <Box>
        <Button
          variant={"outlined"}
          component={NavLink}
          to={CONST_ROUTES_PRIVATE.PAGE_HOME + "1"}
        >
          Вперёд
        </Button>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <RenderCard title={"K1"} />
          <RenderCard title={"K2"} />
          <RenderCard title={"K3"} />
        </Box>
      </Box>
    ),
    handle: {
      parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME,
    },
  },
  {
    path: "/1",
    element: (
      <Box>
        <Button
          variant={"outlined"}
          component={NavLink}
          to={CONST_ROUTES_PRIVATE.PAGE_HOME}
        >
          Назад
        </Button>
        <Button
          variant={"outlined"}
          component={NavLink}
          to={CONST_ROUTES_PRIVATE.PAGE_HOME + "2"}
        >
          Вперёд
        </Button>
        <p>Страница расширенной 1</p>
      </Box>
    ),
    handle: {
      parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME,
    },
  },
  {
    path: "/2",
    element: (
      <Box>
        <Button
          variant={"outlined"}
          component={NavLink}
          to={CONST_ROUTES_PRIVATE.PAGE_HOME + "1"}
        >
          Назад
        </Button>
        <p>Страница расширенной 2</p>
      </Box>
    ),
    handle: {
      parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME,
    },
  },
];

const ExampleComponent1Memo = () => {
  const location = useLocation();
  const routes = useRoutes(itemsRoutes, location);

  return (
    <RouteAnimation
      itemsRoutes={itemsRoutes}
      mode="slide"
      typeAnimation="total-forward"
    >
      <>{routes}</>
    </RouteAnimation>
  );
};

export const ExampleComponent1 = React.memo(ExampleComponent1Memo);
