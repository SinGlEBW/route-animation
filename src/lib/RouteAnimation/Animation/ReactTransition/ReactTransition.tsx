import React from "react"
import { FadeTransition, FadeTransitionProps } from './FadeTransition/FadeTransition';
import { SlideTransition, SlideTransitionProps } from './SlideTransition/SlideTransition';


export type FTProps = FadeTransitionProps & { mode?: 'fade' | never;  };
export type STProps = SlideTransitionProps & { mode?: 'slide' | never; direction: SlideTransitionProps['direction'] };


function ReactTransitionMemo({ mode = 'fade', ...props }:  STProps | FTProps) {

  return (
    mode === 'fade'
    ? <FadeTransition {...props as FTProps} />
    : <SlideTransition {...props as STProps} />  
  )
}

export const ReactTransition = React.memo(ReactTransitionMemo);
