import { Box, Portal } from '@mui/material';
import cn from 'classnames';
import React, { FC, ReactElement, cloneElement, useCallback, useMemo, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';

import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import type { listAllRoutesI } from '../../../useGetKeyMotion/helpers/getListRoutes';
import { CommonTransitionProps } from '../TransitionProps';
import { BoxBlockSlide } from './components/BoxBlockSlide';
import { CustomTransitionGroup, type CustomTransitionProps } from './components/CustomTransitionGroup';
import { useLocation } from 'react-router-dom';


export type SlideWithPopupProps = {
  isPopup: true;
  typeAnimation: 'destroy' | 'no-destroy';
  onPopup?: (status: boolean) => void;
};

export type SlideWithOutPopupProps = {
  isPopup?: false;
  typeAnimation?: 'destroy' | 'no-destroy' | 'total-forward';
};

type SlideTransitionBaseProps = {
  animation?: 'slide' | 'vertical-slide' | 'rotate'; // | 'fade';
} & CommonTransitionProps & Omit<CustomTransitionProps, 'isPopup'>;


export type SlidePopupProps = SlideWithPopupProps | SlideWithOutPopupProps;

export type SlideTransitionProps = SlideTransitionBaseProps & SlidePopupProps;



/*
  TODO:  Если резкр вернуться назад переступив через несолько ссылок в режиме total-forward, то удаляется не весь стек
  1. Добавить сброс висящих элементов когда перескакиваем через роут
*/



const SlideTransitionMemo: FC<SlideTransitionProps> = (props) => {
  const {
    isPopup = false,
    onEnter, onExited, animation = 'slide', duration = 300, easing = 'ease', typeAnimation = 'destroy',
    keyAnimation, direction, sx, classNameItem, isFadeSlide = false, extendsRoutes,
    sxItem = {}, handleDataRoute, children, className, onEnd, ...p
  } = props;

  const { onPopup } = props as SlideWithPopupProps;

  const location = useLocation();
  const configRef = useRef({
    prevPath: keyAnimation,
    deleteItem: null as any | null,
    touchedItems: [] as ReactElement<CSSTransitionProps>[],
    isOpenPopup: !children,
    isPopup,
    children
  });

  const [showBoxBlockSlide, setStateShowBoxBlockSlide] = useState(false);
  const [isOpenPopup, setOpenPopup] = useState(() => isPopup && !!children);

  configRef.current.children = children;
  configRef.current.isOpenPopup = isOpenPopup;
  configRef.current.isPopup = isPopup;

  const onSlideStart = () => {

    if (isPopup && configRef.current.children && !configRef.current.isOpenPopup) {

      setOpenPopup(true)
      onPopup && onPopup(true);
    }
    setStateShowBoxBlockSlide(true);
  }


  const handleOnEnd = (node: HTMLElement) => {
    const { direction, handleDataRoute: { path, pathname } } = props;
    props.onEnd && props.onEnd({
      direction,
      pathname,
      path,
      node
    });
  }

  const onSlideEnd = () => {
    if (isPopup && !configRef.current.children && configRef.current.isOpenPopup) {
      setOpenPopup(false);
      onPopup && onPopup(false);
    }
    setStateShowBoxBlockSlide(false)
  }

  const childFactory = useCallback(
    (child: ReactElement<CSSTransitionProps>, inx: number, touchedItems: ReactElement<CSSTransitionProps>[]) => {
      let isRender = child.props.in;

      // const cloneChild = cloneElement(child, { classNames: cn('item', classNameItem, direction),});
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

              // configRef.current.deleteItem = findTouchedItem
            }
          }
        }

        const isNotKeyInTheRoutes = !extendsRoutes.some(({ path }) => path === keyAnimation)
        if (isNotKeyInTheRoutes && childPath !== keyAnimation) {
          isRender = false
          // const idTimeout = setTimeout(() => {
          //   // const controlItem =  (cloneChild as any).ref.current;
          //   clearTimeout(idTimeout);
          // }, duration)
        }
      }


      const isChild = !!(child?.props?.children as any)?.props?.children
      return cloneElement(child, { classNames: cn('item', classNameItem, direction), ...(isChild && { children: <Box sx={{ overflow: 'hidden', ...sxItem }}>{(child.props as any)?.children}</Box> }) });
    },
    [typeAnimation, classNameItem, direction, handleDataRoute.path, extendsRoutes, keyAnimation]
  );

  const cssTransitionProps = useMemo(
    () => (typeAnimation === 'destroy' ? { timeout: duration } : {
      addEndListener(node, done) {

        const isBackEnter = node.classList.contains('back-enter');
        const isBackExit = node.classList.contains('back-exit');
        const isForwardEnter = node.classList.contains('forward-enter');
        const isForwardExit = node.classList.contains('forward-exit');


        if (isBackExit) {
          const isAnimationTotal = typeAnimation === 'total-forward';
          if (isAnimationTotal) {
            const idTimeout = setTimeout(() => {
              done();
              clearTimeout(idTimeout);
            }, duration)
          }
        }
      }
    }),
    [typeAnimation, duration]
  );

  
  return (
    <Portal disablePortal={!isPopup}>
      <CustomTransitionGroup
        className={cn({ ['popup-routes']: isPopup }, `slide-routes ${animation}`, className)}
        childFactory={childFactory as any}
        duration={duration}
        isFadeSlide={isFadeSlide}
        easing={easing}
        isPopup={isPopup}
        direction={direction}
        style={isPopup ? ({ height: isOpenPopup ? '100%' : "0%" }) : {}}
        sx={sx}
      // onTransitionEnd={onTransitionEnd}
      // sxItem={sxItem}
      // appear={initAnim}
      >
        <CSSTransition
          key={keyAnimation}
          path={keyAnimation}
          // nodeRef={() => <div></div>}

          {...cssTransitionProps}
          {...p}
          onEnter={(node: HTMLElement, isAppearing: boolean) => {

            onSlideStart();
            const idTimeout = setTimeout(() => {
              onSlideEnd();
              handleOnEnd(node);
              clearTimeout(idTimeout);
            }, duration)
            typeof onEnter === 'function' && onEnter(node, isAppearing)
          }}

          onExited={(node: HTMLElement) => {

            typeAnimation === 'destroy' && onSlideEnd();
            typeof onExited === 'function' && onExited(node)
          }}
          unmountOnExit
        >
          <>{children}</>
        </CSSTransition>
      </CustomTransitionGroup>
      {
        showBoxBlockSlide && <BoxBlockSlide />
      }
    </Portal>
  )
};

export const SlideTransition = React.memo(SlideTransitionMemo);
