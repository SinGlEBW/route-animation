import React from "react"
import { AppBar,  Box, Tab, Tabs, } from '@mui/material';
import Home from '@mui/icons-material/Home';
import Lists from '@mui/icons-material/List';
import Settings from '@mui/icons-material/Settings';
import { NavLink, useLocation } from 'react-router-dom';
import { CONST_ROUTES_PRIVATE } from '../../CONTS/CONST_ROUTES';


const itemsTab = [
  { to: CONST_ROUTES_PRIVATE.PAGE_HOME, label: "Главная", icon: <Home /> },
  { to: CONST_ROUTES_PRIVATE.PAGE_POSTS, label: "Посты", icon: <Lists /> },
  { to: CONST_ROUTES_PRIVATE.PAGE_SETTINGS, label: "Настройки", icon: <Settings /> }
]



const FooterNavMemo = () => {
  const location = useLocation();

  const [value, setValue] = React.useState(() => {
    const chunkPath = location.pathname.split('/');
    const currentPath = chunkPath[1] ? '/' + chunkPath[1] : '/';
    const findInx = itemsTab.findIndex(({ to }) => currentPath === to);
    return findInx == -1 ? 0 : findInx;
  });


  return (
    <Box >
      <AppBar position="static" >
        <Tabs
          variant="fullWidth"
          value={value}
          indicatorColor="secondary"
          textColor='secondary'
          onChange={(_, newValue) => {
            setValue(newValue);
          }}

          aria-label="icon label tabs example"
        >
          {
            itemsTab.map((itemTapProp, inx) => (
              <Tab key={inx} component={NavLink} {...itemTapProp} />
            ))
          }
        </Tabs>
      </AppBar>
    </Box>
  )
};

export const FooterNav = React.memo(FooterNavMemo);
