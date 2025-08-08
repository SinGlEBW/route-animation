import { AddBoxOutlined, Archive, CropLandscapeTwoTone, DeleteOutlineRounded } from '@mui/icons-material';
import { Dashboard, type DashboardProps } from 'rc-lib-ui';
import React, { FC, ReactNode } from "react";
import { CONST_ROUTES_PRIVATE } from './CONTS/CONST_ROUTES';
import { appActions } from './store/reducers/app/app.store';
import { store } from './store/store';


// { name: 'boilerRoom',  iconClassName: 'fa-cog gradient-blue', titleLink: 'ППР котельных' },
// { name: 'tsTP',  iconClassName: 'fa-cog gradient-blue', titleLink: 'ППР ЦТП' },
// { name: 'heatingNetworks',  iconClassName: 'fa-cog gradient-blue', titleLink: 'ППР тепловых сетей' }


const { PAGE_EXTENDS_INFO_POPUP } = CONST_ROUTES_PRIVATE;

const from = 'menu'
const saveNavigate = ({keyName, titleHeader}) => {
  store.dispatch(appActions.setActivitySlide({keyName, from, titleHeader}))
}
const listMenu = [
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'ППР котельных',
    path: `${PAGE_EXTENDS_INFO_POPUP}/boilerRoom/${from}/chart-DC1`,
    onClick: () => saveNavigate({keyName: 'boilerRoom', titleHeader:  'ППР котельных'})
  },
  {
    icon: <CropLandscapeTwoTone sx={{ width: 25 }} />,
    title: 'ППР ЦТП',
    path: `${PAGE_EXTENDS_INFO_POPUP}/tsTP/${from}/chart-DC2`,
    onClick: () => saveNavigate({keyName: 'tsTP', titleHeader:  'ППР ЦТП'})
  },
  {
    icon: <DeleteOutlineRounded sx={{ width: 25 }} />,
    title: 'ППР тепловых сетей',
    path: `${PAGE_EXTENDS_INFO_POPUP}/heatingNetworks/${from}/chart-DC3`,
    onClick: () => saveNavigate({keyName: 'heatingNetworks', titleHeader:  'ППР тепловых сетей'})
  },
  {
    icon: <AddBoxOutlined sx={{ width: 25 }} />,
    title: 'Технические устройства',
    path: `${PAGE_EXTENDS_INFO_POPUP}/exTechDevices/${from}/chart-DC4`,
    onClick: () => saveNavigate({keyName: 'exTechDevices', titleHeader:  'Технические устройства'})
  },

] as DashboardProps['listMenu']


export interface DashboardAppProps extends Omit<DashboardProps, 'listMenu'> {
  children?: ReactNode;
}

const DashboardAppMemo:FC<DashboardAppProps> = (props) => {
  return (
    <Dashboard

    // ref={dashboardControlRef}
    styleList='variant2'
    listMenu={listMenu}

    columnMenu={{
      initWidth: 280,
      minWidthColumn: {
        width: 53, //min 40
      },
      // position: "right",
    }}
    // HeaderContent={
    //   <header style={{ position: "fixed", zIndex: 1, width: "100%", backgroundColor: "#456789" }}>
    //     <Toolbar>
    //       <IconButton onClick={handleMenuToggle} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} children={<MenuIcon />} />
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} children={"App"} />
    //     </Toolbar>
    //   </header>
    // }
  
    statuses={{
      isHeaderDefault: true,
      isButtonCenterMenu: true,
      isHeaderResize: false
      // isScrollIndentation: true
      //isHeader: false, full off header
    }}
    {...props}
  />
  )
};

export const DashboardApp = React.memo(DashboardAppMemo);
