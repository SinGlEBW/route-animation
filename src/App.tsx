import { Box, Container, Portal } from "@mui/material";
import { RouteObject, useLocation, useRoutes } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Home, Posts, Settings } from "./pages";

import { FooterNav } from "./components/FooterNav/FooterNav";
import { CONST_ROUTES_PRIVATE } from "./CONTS/CONST_ROUTES";
import { DashboardApp } from './DashboardApp';
import { RouteAnimation } from '@lib';
import { PopupContainer } from './pages/PopupContainer/PopupContainer';



const { PAGE_HOME, PAGE_POSTS, PAGE_SETTINGS, PAGE_EXTENDS_INFO_POPUP } = CONST_ROUTES_PRIVATE;

const mainItemsRoutes: RouteObject[] = [
  { path: PAGE_HOME + "/*", element: <Home /> }, // /* - working with v1.1.17
  { path: PAGE_POSTS, element: <Posts /> },
  { path: PAGE_SETTINGS + "/*", element: <Settings /> },
];

const popupItemsRoutes: RouteObject[] = [
  {
    path: PAGE_EXTENDS_INFO_POPUP + "/*",
    element: <PopupContainer />,
  }
]



export function App() {
  const location = useLocation();
  const mainRoutes = useRoutes(mainItemsRoutes, location);


  
  const popupRoutes = useRoutes(popupItemsRoutes, location);



  return (
    <>
      <DashboardApp
        HeaderContent={<Header />}
        children={
          (
            <div className={"content_app"} style={{ position: "relative", paddingBottom: "72px", }}>
              <Container sx={{ py: 1, position: "absolute", height: "100%", width: "100%" }}>
                <RouteAnimation
                  sx={{ height: "100%" }}
                  itemsRoutes={mainItemsRoutes}
                  mode="slide"
                  animation="slide"
                  isFadeSlide={true}
                  typeAnimation="total-forward"
                >
                 
                    {mainRoutes}
               
                </RouteAnimation>

                {/* <RouteAnimation
                  // onEnd={onEnd}
                  itemsRoutes={popupItemsRoutes}
                  mode="slide"
                  isPopup
                  onPopup={(status) => console.log(status)}
                  animation="slide"
                  isFadeSlide={true}
                  typeAnimation="destroy"
                >
                   {popupRoutes}
                </RouteAnimation> */}
              </Container>
            </div>
          )
        }
      />


      <FooterNav />
    </>
  );
}
