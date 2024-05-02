import React, { FC } from "react"
import { FadeTransition, FadeTransitionProps } from './FadeTransition/FadeTransition';
import { SlideTransition, SlideTransitionProps } from './SlideTransition/SlideTransition';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';


export type FTProps = FadeTransitionProps & {mode?: 'fade' | never; direction: SlideTransitionProps['direction'] };
export type STProps = SlideTransitionProps & {mode?: 'slide' | never  };



function ReactTransitionMemo({ mode = 'fade', ...props }:  STProps | FTProps) {

  return (
    mode === 'fade'
    ? <FadeTransition {...props as FTProps} />
    : <SlideTransition {...props as STProps} />  
  )
}

export const ReactTransition = React.memo(ReactTransitionMemo);
