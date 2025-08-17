import React, { FC, useMemo } from "react";
import { CSSTransition, SwitchTransition, } from 'react-transition-group';

import { CommonTransitionProps } from '../TransitionProps';

import { Box, styled } from '@mui/material';
import cn from 'classnames';
import { FadeContentAnimation } from './components/FadeContentAnimation';

export type FadeTransitionProps = CommonTransitionProps & {
  // extendsRoutes: never
};



const FadeTransitionMemo:FC<FadeTransitionProps> = ({ className, keyAnimation, duration = 300, direction, children, classNameItem, sxItem, extendsRoutes, handleDataRoute, onEnter, onEnd,  ...props }) => {
  const nameAnimation = 'fade-scale';
   const handleOnEnd = (node: HTMLElement) => {
    const { path, pathname } = handleDataRoute;
    onEnd && onEnd({
      direction,
      pathname,
      path,
      node
    });
  }
  
  return (
    <SwitchTransition >
      <CSSTransition
        key={keyAnimation}
        timeout={duration}
        classNames={cn(nameAnimation, className)} 

        {...props}
        onEnter={(node: HTMLElement, isAppearing: boolean) => {
          const idTimeout = setTimeout(() => {
            handleOnEnd(node);
            clearTimeout(idTimeout);
          }, duration)
          typeof onEnter === 'function' && onEnter(node, isAppearing)
        }}
        unmountOnExit
      >

        <FadeContentAnimation 
          className={nameAnimation}
          direction={direction}
          duration={duration}
          sx={sxItem}
          >

        {children}
        </FadeContentAnimation>
      </CSSTransition>
    </SwitchTransition>
  )
};

export const FadeTransition = React.memo(FadeTransitionMemo);





// const FadeTransitionMemo:FC<FadeTransitionProps> = ({ keyAnimation, duration = 300, children, classNameItem, sxItem,  ...props }) => {
//   const mode = 'fade';

  
//   return (
//     <SwitchTransition >
//       <CSSTransition
//         key={keyAnimation}
//         timeout={300}
//         classNames={{
//           exit: fadeStyle[`${mode}-exit`],
//           exitActive: fadeStyle[`${mode}-exit-active`],
//           exitDone: fadeStyle[`${mode}-exit-done`],
//           enter: fadeStyle[`${mode}-enter`],
//           enterActive: fadeStyle[`${mode}-enter-active`],
//           enterDone: fadeStyle[`${mode}-enter-done`],
//         }}
//         {...props}
//         unmountOnExit
//       >
//         {() => {
//           return (
//             <Box className={cn('item',fadeStyle[mode], classNameItem)} sx={sxItem}>
//               {children}
//             </Box>
//           )
//         }}
//       </CSSTransition>
//     </SwitchTransition>
//   )
// };

// export const FadeTransition = React.memo(FadeTransitionMemo);
