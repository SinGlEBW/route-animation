import { styled } from '@mui/material';
import { ReactNode } from "react";
import type { CommonTransitionProps } from '../../TransitionProps';
import { getFadeScale } from './getFadeScale';

export interface FadeContentAnimationProps {
  children?: ReactNode;
}


// $time: 300ms;

// .fade {
//   position: absolute;
//   display: grid;
//   overflow: hidden;
// }

// .fade-enter {
//   opacity: 0;
//   transform: scale(1.1);
// }

// .fade-enter-active {
//   opacity: 1;
//   transform: scale(1);
//   transition: opacity $time, transform $time;
// }

// .fade-exit {
//   opacity: 1;
//   transform: scale(1);
// }

// .fade-exit-active {
//   opacity: 0;
//   transform: scale(0.9);
//   transition: opacity $time, transform $time;
// }



export const FadeContentAnimation = styled('div', {
  shouldForwardProp: (prop) => {
    return !['easing', 'duration', 'direction', 'sx', 'sxItem'].includes(prop as string)
  }
})<FadeContentAnimationProps & Pick<CommonTransitionProps, 'direction' | 'duration' | 'easing' | 'sxItem'>>(({ duration = 300, easing, sxItem = {},  direction }) => {
  return {
    display: 'grid',
   
   '&.fade-scale': {
      position: 'absolute',
      ...getFadeScale({duration})
    },
  }
})

