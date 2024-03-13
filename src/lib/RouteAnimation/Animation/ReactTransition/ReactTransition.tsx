import React, { FC } from "react"
import { FadeTransition } from './FadeTransition/FadeTransition';
import { SlideTransition, SlideTransitionProps } from './SlideTransition/SlideTransition';


export interface ReactTransitionProps extends SlideTransitionProps {
  mode?: 'slide' | 'fade';
  keyAnimation: string;
}

const ReactTransitionMemo: FC<ReactTransitionProps> = ({ mode = 'fade', direction, keyAnimation, children, ...props }) => {
  //TODO: Сделать динамическую передачу пропсов
  return (
    mode === 'fade'
    ? <FadeTransition keyAnimation={keyAnimation} children={children}/>
    : <SlideTransition keyAnimation={keyAnimation} direction={direction}  children={children} {...props}/>  
  )
};

export const ReactTransition = React.memo(ReactTransitionMemo);
