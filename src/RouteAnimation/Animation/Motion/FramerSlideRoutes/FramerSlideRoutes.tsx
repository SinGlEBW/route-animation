import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { forwardRef } from "react"
import { AnimateRoutes } from './component/AnimateRoutes';

const FramerSlideRoutesMemo = ({direction, keyAnimation, children}) => {
  //Обернув компонент в отдельный компонент получили другое поведение
  console.dir(keyAnimation);
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.25, duration: 1 }}>
      <AnimatePresence mode={'sync'} initial={false} custom={direction.current}>
        <AnimateRoutes direction={direction} key={keyAnimation}>
          {children}
        </AnimateRoutes>
      </AnimatePresence>
    </MotionConfig>
  )
};

export const FramerSlideRoutes = FramerSlideRoutesMemo//React.memo();
