import { Box } from '@mui/material';
import cn from 'classnames';
import React, { FC, ReactElement, cloneElement, createRef, useCallback, useContext, useEffect, useMemo, useRef, useState, } from "react";
import { CSSTransition, Transition, TransitionGroup, } from 'react-transition-group';
import { findDOMNode } from 'react-dom';

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
  // initAnim?: boolean
} & CommonTransitionProps & CustomTransitionProps;

/*
  TODO:  Если резкр вернуться назад переступив через несолько ссылок в режиме total-forward, то удаляется не весь стек
  1. Добавить сброс висящих элементов когда перескакиваем через роут
*/

const SlideTransitionMemo: FC<SlideTransitionProps> = (props) => {
  const {
    onEnter, onExited, animation = 'slide', duration = 300, easing = 'ease', typeAnimation = 'destroy',
    keyAnimation, direction, sx, classNameItem, isFadeSlide = false, extendsRoutes,
    sxItem = {}, handleDataRoute, children, ...p
  } = props;

  const configRef = useRef({
    prevPath: keyAnimation,
    deleteItem: null as any | null,
    touchedItems: [] as ReactElement<CSSTransitionProps>[]
  });

  const [showBoxBlockSlide, setStateShowBoxBlockSlide] = useState(false);
  // const [control, setControl] = useState({});


  const onSlideStart = () => {
    setStateShowBoxBlockSlide(true)
  }
  const onSlideEnd = () => {
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
              // debugger
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

    
      const isChild = (child?.props?.children as any)?.props?.children
      return cloneElement(child, { classNames: cn('item', classNameItem, direction), ...(isChild && {children: <Box sx={{overflow: 'hidden', ...sxItem}}>{(child.props as any)?.children}</Box>})});
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
    <>

      <CustomTransitionGroup
        className={`slide-routes ${animation}`}
        childFactory={childFactory as any}
        duration={duration}
        isFadeSlide={isFadeSlide}
        easing={easing}
        direction={direction}
        sx={sx}
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
          {children}
        </CSSTransition>
      </CustomTransitionGroup>
      {
        showBoxBlockSlide && <BoxBlockSlide />
      }
    </>
  )
};

export const SlideTransition = React.memo(SlideTransitionMemo);
