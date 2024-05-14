import { Box, Button } from "@mui/material";
import React, { useMemo, useState } from "react";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { RouteAnimation } from "route-animation";
import { CONST_ROUTES_PRIVATE } from "../../../CONTS/CONST_ROUTES";
import { ComponentTest } from "./components/ComponentTest";

const ExampleComponent2Memo = () => {
  const [state, setState] = useState({ keyName: "" });

  const location = useLocation();
  const itemsRoutes = useMemo(() => {
    return [
      //   {
      //     index: true,
      //     element: (
      //       <Box></Box>
      //     ),
      //     handle: {
      //       parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME,
      //     },
      //   },
      {
        path: CONST_ROUTES_PRIVATE.POPUP_SLIDE + "/*",
        element: (
          <Box>
            <p>Popup keyName: ({state.keyName})</p>
            <ComponentTest
              parentRelation={CONST_ROUTES_PRIVATE.POPUP_SLIDE}
              keyName={state.keyName}
            />
          </Box>
        ),
        handle: {
          parentRelation: CONST_ROUTES_PRIVATE.PAGE_HOME,
        },
      },
    ];
  }, [state, location.pathname]);

  const routes = useRoutes(itemsRoutes, location);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          border: 1,
          borderColor: "primary.main",
          p: 2,
        }}
      >
        <Button variant={"outlined"} component={NavLink} onClick={() => setState({ keyName: "keyName1" })} to={CONST_ROUTES_PRIVATE.POPUP_SLIDE + "/chart-1"}>Popup1</Button>
        <Button variant={"outlined"} component={NavLink} onClick={() => setState({ keyName: "keyName2" })} to={CONST_ROUTES_PRIVATE.POPUP_SLIDE + "/chart-2"}>Popup2</Button>
        <Button variant={"outlined"} component={NavLink} onClick={() => setState({ keyName: "keyName3" })} to={CONST_ROUTES_PRIVATE.POPUP_SLIDE + "/chart-3"}>Popup3</Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <RouteAnimation itemsRoutes={itemsRoutes} mode="slide">
          <>{routes}</>
        </RouteAnimation>
      </Box>
    </>
  );
};

export const ExampleComponent2 = React.memo(ExampleComponent2Memo);
