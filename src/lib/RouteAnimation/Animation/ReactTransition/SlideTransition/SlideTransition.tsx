import { Box } from '@mui/material';
import cn from 'classnames';
import React, { FC, ReactElement, cloneElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import type { listAllRoutesI } from '../../../useGetKeyMotion/helpers/getListRoutes';
import { CommonTransitionProps } from '../TransitionProps';
import { CustomTransitionGroup, type CustomTransitionProps } from './components/CustomTransitionGroup';
import { createPortal } from 'react-dom';
import { BoxBlockSlide } from './components/BoxBlockSlide';




export type SlideTransitionProps = {
  animation?: 'slide' | 'vertical-slide' | 'rotate';// | 'fade';
  typeAnimation?: 'destroy' | 'no-destroy' | 'total-forward',
  extendsRoutes: listAllRoutesI[],
  handleDataRoute: listAllRoutesI
  onSlideEnd?: () => void
} & CommonTransitionProps & CustomTransitionProps;

/*
  TODO: 
  1. Добавить сброс висящих элементов когда перескакиваем через роут
*/

const SlideTransitionMemo: FC<SlideTransitionProps> = (props) => {
  const { onEnter, onExited, animation = 'slide', duration = 300, easing = 'ease', typeAnimation = 'destroy', children, keyAnimation, direction, sx, classNameItem, isFadeSlide = false, extendsRoutes, sxItem, handleDataRoute, ...p } = props;
  const configRef = useRef({
    prevPath: keyAnimation,
    deleteItem: null as any | null,
    touchedItems: [] as ReactElement<CSSTransitionProps>[]
  });
  const [showBoxBlockSlide, setStateShowBoxBlockSlide] = useState(false);

  const onSlideStart = () => {
    setStateShowBoxBlockSlide(true)
  }
  const onSlideEnd = () => {
    setStateShowBoxBlockSlide(false)
  }

  const childFactory = useCallback(
    (child: ReactElement<CSSTransitionProps>, inx: number, touchedItems: ReactElement<CSSTransitionProps>[]) => {
      
      const isAnimationTotal = typeAnimation === 'total-forward';
      const childPath = child.props.path;
      if (isAnimationTotal) {
        const isCurrentComponent = childPath === handleDataRoute.path;
        configRef.current.touchedItems = touchedItems;
        if (isCurrentComponent && !configRef.current.deleteItem) {

          const findInxCurrentExtendsRoutes = extendsRoutes.findIndex((routes) => {
            const correctPach = routes.path?.endsWith('/') ? [...routes.path].slice(0, -1).join('') : routes.path;
            return childPath === correctPach;
          })
          const nextItemExtendsRoutes = extendsRoutes[findInxCurrentExtendsRoutes + 1];
          if (nextItemExtendsRoutes) {
            const findTouchedItem = touchedItems.find((touchItem) => touchItem.props.path === nextItemExtendsRoutes.path)
            if (findTouchedItem) {
              // debugger
              // configRef.current.deleteItem = findTouchedItem
            }
          }
        }
      }


      return cloneElement(child, { classNames: direction });
    },
    [direction, handleDataRoute, typeAnimation, configRef.current, keyAnimation]
  );

  const cssTransitionProps = useMemo(
    () => (typeAnimation === 'destroy' ? { timeout: duration } : {

      addEndListener(node, done) {
        const isBack = node.classList.contains('back-exit');
        const isForward = node.classList.contains('forward-exit');
     
        if (isBack || isForward) {
          const removeItem = () => {
            const isAnimationTotal = typeAnimation === 'total-forward';
            onSlideEnd();
            if (isBack) {
              isAnimationTotal && done();
            }
            // node.removeEventListener('transitionend', removeItem, false)
          }
          // node.addEventListener('transitionend', removeItem, false)
          const idTimeout = setTimeout(() => {
            removeItem()
            clearTimeout(idTimeout);
          }, duration)
        }
      }
    }),
    [typeAnimation, duration]
  );




  return (
    <>
      <CustomTransitionGroup
        className={`slide-routes ${animation}`}
        childFactory={childFactory as any}
        duration={duration}
        isFadeSlide={isFadeSlide}
        easing={easing}
        direction={direction}
        sx={sx}
      >
        <CSSTransition
          key={keyAnimation}
          path={keyAnimation}
          {...cssTransitionProps}
          {...p}
          onEnter={(node: HTMLElement, isAppearing: boolean) => {
            onSlideStart()
            typeof onEnter === 'function' && onEnter(node, isAppearing)
          }}
          onExited={(node: HTMLElement) => {
            typeAnimation === 'destroy' && onSlideEnd();

            typeof onExited === 'function' && onExited(node)
          }}
        >
          {
            (event, payload) => {

              return (
                <Box
                  id={payload?.path as string}
                  className={cn('item', classNameItem)} sx={sxItem}>
                  {children}
                </Box>
              )
            }
          }
        </CSSTransition>
      </CustomTransitionGroup>
      {
        showBoxBlockSlide && <BoxBlockSlide />
      }
    </>
  )
};

export const SlideTransition = React.memo(SlideTransitionMemo);
