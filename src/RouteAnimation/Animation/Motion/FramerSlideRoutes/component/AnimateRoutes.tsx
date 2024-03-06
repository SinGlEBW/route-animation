import React, { forwardRef } from "react";
import { motion } from 'framer-motion';

const slideVariants = {
  hiddenRight: { x: window.innerWidth, opacity: 0 },
  hiddenLeft: { x: -window.innerWidth, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  }
}

const variants = {
  enter: (direction) => { console.dir(`enter ${direction}}` )
    console.dir();
    return direction !== 'back' ? slideVariants.hiddenRight : slideVariants.hiddenLeft;
  },
  animate: (direction) => { //console.dir(`animate ${direction}}` )
    return slideVariants.visible
  },
  exit: (direction) => { console.dir(`exit ${direction}}` )
    return direction !== 'forward' ? slideVariants.hiddenRight : slideVariants.hiddenLeft;
  }
}


const AnimateRoutesMemo = forwardRef<any, any>(({ direction, children }, ref) => {
  /*Имеет временами самопроизвольное исчезновение уходящего(exit) слайда, а так же после окончания может ещё раз отработать анимация */
  return (
    <motion.div
      ref={ref}
      custom={direction}
      style={{ height: '100%',position: 'absolute', top: 0 }}
      variants={variants}
      initial={'enter'}//Где начать
      animate={'animate'}//К чему придти
      exit={'exit'}//Куда уйти
    >
      {children}
    </motion.div>
  )
})
export const AnimateRoutes = React.memo(AnimateRoutesMemo);