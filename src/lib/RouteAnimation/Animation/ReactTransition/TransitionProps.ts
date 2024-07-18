import type { SxProps } from '@mui/material';
import { ReactElement } from 'react';
import { Navigate, NavigateProps, Route, RouteProps, useRoutes } from 'react-router-dom';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export interface EventsTransitionProps {
  onExit?:CSSTransitionProps['onExit'];
  onExited?:CSSTransitionProps['onExited'];
  onExiting?:CSSTransitionProps['onExiting'];
  onEnter?:CSSTransitionProps['onEnter'];
  onEntered?:CSSTransitionProps['onEntered'];
  onEntering?:CSSTransitionProps['onEntering'];
}
type RouteElement = ReactElement<RouteProps, typeof Route>;
type ChildElement = RouteElement | ReactElement<NavigateProps, typeof Navigate>;

export interface CommonTransitionProps extends EventsTransitionProps{
  keyAnimation: string;
  children:  ReturnType<typeof useRoutes> //ChildElement | (ChildElement | undefined | null)[];
  sx?:SxProps;
  sxItem?:SxProps;
  classNameItem?:string;
  duration?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  
}