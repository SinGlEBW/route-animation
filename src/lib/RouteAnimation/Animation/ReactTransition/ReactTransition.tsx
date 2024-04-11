import React, { FC } from "react"
import { FadeTransition, FadeTransitionProps } from './FadeTransition/FadeTransition';
import { SlideTransition, SlideTransitionProps } from './SlideTransition/SlideTransition';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';


export type FTProps = FadeTransitionProps & {mode?: 'fade' | never; direction: SlideTransitionProps['direction'] };
export type STProps = SlideTransitionProps & {mode?: 'slide' | never  };

let f: STProps

function ReactTransitionMemo({ mode = 'fade',  keyAnimation, children, ...props }:  STProps | FTProps) {

  return (
    mode === 'fade'
    ? <FadeTransition keyAnimation={keyAnimation} children={children} {...props} />
    : <SlideTransition keyAnimation={keyAnimation} children={children} {...props} />  
  )
}

export const ReactTransition = React.memo(ReactTransitionMemo);
