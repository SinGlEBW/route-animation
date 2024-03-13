import React from "react"
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import fadeStyle from './fade.module.scss';

const FadeTransitionMemo = ({ keyAnimation, children }) => {
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
        unmountOnExit
      >
        {(state) => {
          console.dir(state);
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
