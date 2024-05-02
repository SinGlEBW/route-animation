import { Box } from '@mui/material';
import cn from 'classnames';
import React, { FC, ReactElement, cloneElement, useCallback, useMemo } from "react";
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { CommonTransitionProps } from '../TransitionProps';
import { CustomTransitionGroup, type CustomTransitionProps } from './components/CustomTransitionGroup';
import type { listAllRoutesI } from '../../../useGetKeyMotion/helpers/getListRoutes';




export type SlideTransitionProps = {
  animation?: 'slide' | 'vertical-slide' | 'rotate';// | 'fade';
  typeAnimation?: 'destroy' | 'no-destroy'; //| 'total-forward',
  extendsRoutes: listAllRoutesI[],
  handleDataRoute: listAllRoutesI
} & CommonTransitionProps & CustomTransitionProps;


const SlideTransitionMemo: FC<SlideTransitionProps> = (props) => {
  const { animation = 'slide', duration = 300, easing = 'ease', typeAnimation = 'destroy', children, keyAnimation, direction, sx, classNameItem, isFadeSlide = false, extendsRoutes, sxItem, handleDataRoute, ...p } = props;
 
  const childFactory = useCallback(
    (child: ReactElement<CSSTransitionProps>) => {
      console.dir(child);
      return cloneElement(child, { classNames: direction,  });
    },
    [direction]
  );

  const cssTransitionProps = useMemo(
    () => (typeAnimation === 'destroy' ? { timeout: duration } : { addEndListener(...e) {} }),
    [typeAnimation, duration]
  );

  // const isTotalForward = typeAnimation === 'total-forward';
  // console.dir(handleDataRoute);
  /*
    INFO: Опираться на nameEvent === 'exited' или onExited={} не можем т.к. компоненты не уничтожаются
    нужно смотреть на ивент 
  */
  return (
    <>
      <CustomTransitionGroup
        className={`slide-routes ${animation}`}
        childFactory={childFactory}
        duration={duration}
        isFadeSlide={isFadeSlide}
        easing={easing}
        direction={direction}
        sx={sx}
      >
        <CSSTransition
          key={keyAnimation}

          {...cssTransitionProps}
          {...p}
        >
          {
            (nameEvent) => {
              // console.dir(nameEvent);
              // const isExitEnd = nameEvent === 'exited';
              // let isDestroy = false
             
              // if (isTotalForward && isExitEnd) {
              
              //   isDestroy = true
              // }
              return  (
                <Box 
                // onTransitionEnd={(...e) => {
                //   console.dir(e)
                // }}
                className={cn('item', classNameItem)} sx={sxItem}>
                {children}
              </Box>
              )
              
            }
          }
        </CSSTransition>
      </CustomTransitionGroup>
    </>
  )
};

export const SlideTransition = React.memo(SlideTransitionMemo);
