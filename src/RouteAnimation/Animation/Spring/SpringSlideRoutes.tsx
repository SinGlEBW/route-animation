import {
  animated,
  easings,
  useSpringRef,
  useTransition
} from '@react-spring/web';
import React, { FC, useMemo } from "react";
import { useLocation } from 'react-router-dom';

export type Direction_OR = 'forward' | 'back' | 'undirected';
interface SpringSlideRoutesProps {
  children: React.ReactNode;
  direction: Direction_OR,
  keyAnimation: string,
  onTransitionEnd?(): void
}

const SpringSlideRoutesMemo: FC<SpringSlideRoutesProps> = ({ children, direction, keyAnimation, onTransitionEnd }) => {
  
  console.dir(keyAnimation);

  const transitions = useTransition(children, {
    initial: {},
    from: { opacity: 0, transform: `translateX(${direction === 'forward' ? '100%' : '-100%'})` },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: `translateX(${direction !== 'forward' ? '100%' : '-100%'})` },
    config: {
      // mass: 3,
      friction: 20,
      // tension: 12,
      // clamp: true,
      easing: easings.steps(1)
    },
    expires: () => {
      onTransitionEnd && onTransitionEnd();
      return true;
    }
  })



  return (
    <>
      {transitions((style, item) => {
   
        return (
          <div key={keyAnimation} className='pos-rel'>
            <animated.div className={'flex fill'} style={{ ...style, position: 'absolute', top: 0, left: 0, right: 0 }}>
              {item}
            </animated.div>
          </div>
        )
      })}
    </>
  )
};

export const SpringSlideRoutes = React.memo(SpringSlideRoutesMemo);
