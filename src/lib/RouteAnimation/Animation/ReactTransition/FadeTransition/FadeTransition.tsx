import React, { FC } from "react";
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { CommonTransitionProps } from '../TransitionProps';
import fadeStyle from './fade.module.scss';


export type FadeTransitionProps = CommonTransitionProps;
/*
  TODO: На будущее добавить duration и timeout
*/
const FadeTransitionMemo:FC<FadeTransitionProps> = ({ keyAnimation, children, ...props }) => {
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
            <div className={fadeStyle[mode]}>
              {children}
            </div>
          )
        }}
      </CSSTransition>
    </SwitchTransition>
  )
};

export const FadeTransition = React.memo(FadeTransitionMemo);
