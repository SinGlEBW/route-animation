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

const HomeMemo = () => {
  return (
    <div className="home">
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolore,
        molestiae accusamus saepe qui minima esse suscipit quis possimus
        consequatur numquam.
      </p>
      <Box sx={{ mt: 2 }}>
        {/* <ExampleComponent1 /> */}
        <ExampleComponent2 />
        {/*Look Error ComponentTest in ExampleComponent2*/}
      </Box>
    </div>
  );
};

export const Home = React.memo(HomeMemo);
