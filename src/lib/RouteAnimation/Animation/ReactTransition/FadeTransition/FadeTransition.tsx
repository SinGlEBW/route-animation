import React, { FC, useMemo } from "react";
import { CSSTransition, SwitchTransition, } from 'react-transition-group';
import { } from 'react-transition-group';
import { CommonTransitionProps } from '../TransitionProps';
import fadeStyle from './fade.module.scss';
import { Box, styled } from '@mui/material';
import cn from 'classnames';

export type FadeTransitionProps = CommonTransitionProps & {
  // extendsRoutes: never
};
/*
  TODO: На будущее добавить duration и timeout
*/

// const CustomCSSTransition = styled(CSSTransition)<Pick<CommonTransitionProps, 'easing' | 'duration'>>(({ duration, easing, classNames, ...a }) => {
 
//   return {
//     [`.${mode}`]: {
//       position: 'absolute',
//       left: '15px',
//       right: '15px',
//     },
//     [`.${classNames?.enter}`]: {
//       opacity: 0,
//       transform: 'scale(1.1)',
//     },
//     [`.${classNames}-enter-active`]: {
//       opacity: 1,
//       transform: 'scale(1)',
//       transition: `opacity ${duration}, transform ${duration}`,
//     },
//     [`.${classNames}-exit`]: {
//       opacity: 1,
//       transform: 'scale(1)',
//     },
//     [`.${classNames}-exit-active`]: {
//       opacity: 0,
//       transform: 'scale(0.9)',
//       transition: `opacity ${duration}, transform ${duration}`,
//     }
//   }
// })


const FadeTransitionMemo:FC<FadeTransitionProps> = ({ keyAnimation, duration = 300, children, classNameItem, sxItem,  ...props }) => {
  const mode = 'fade';

  
  return (
    <SwitchTransition >
      <CSSTransition
        key={keyAnimation}
        timeout={300}
        classNames={{
          exit: fadeStyle[`${mode}-exit`],
          exitActive: fadeStyle[`${mode}-exit-active`],
          exitDone: fadeStyle[`${mode}-exit-done`],
          enter: fadeStyle[`${mode}-enter`],
          enterActive: fadeStyle[`${mode}-enter-active`],
          enterDone: fadeStyle[`${mode}-enter-done`],
        }}
        {...props}
        unmountOnExit
      >
        {() => {
          return (
            <Box className={cn('item',fadeStyle[mode], classNameItem)} sx={sxItem}>
              {children}
            </Box>
          )
        }}
      </CSSTransition>
    </SwitchTransition>
  )
};

export const FadeTransition = React.memo(FadeTransitionMemo);
