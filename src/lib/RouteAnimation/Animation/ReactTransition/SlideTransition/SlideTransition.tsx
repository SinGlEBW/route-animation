import React, { FC, ReactElement, cloneElement, useCallback, useMemo } from "react"
import { styled } from '@mui/material';
import { Navigate, NavigateProps, Route, RouteProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import cn from 'classnames';

type Direction_OR = 'forward' | 'back' | 'undirected';
interface StyledProps {
  direction: Direction_OR;
  timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  duration?: number;
}

const getTransformStyles = (transformFn: string, max: string) => ({
  '& > .back-enter': {
    transform: `${transformFn}(-${max})`,
  },
  '& > .back-enter-active': {
    transform: `${transformFn}(0)`
  },
  '& > .back-exit': {
    transform: `${transformFn}(0)`
  },
  '& > .back-exit-active': {
    transform: `${transformFn}(${max})`
  },
  '& > .forward-enter': {
    transform: `${transformFn}(${max})`
  },
  '& > .forward-enter-active': {
    transform: `${transformFn}(0)`
  },
  '& > .forward-exit': {
    transform: `${transformFn}(0)`
  },
  '& > .forward-exit-active': {
    transform: `${transformFn}(-${max})`
  }
});

const CustomTransitionGroup = styled(TransitionGroup)<StyledProps>(({ duration, timing, direction }) => {
  return {
    display: 'grid',
    '& > .item': {
      gridArea: '1 / 1 / 2 / 2',
      '&:not(:only-child)': {
        [`&.${direction}-enter-active, &.${direction}-exit-active`]: {
          transition: `transform ${duration}ms ${timing}`
        }
      }
    },
    '&.slide': {
      overflow: 'hidden',
      ...getTransformStyles('translateX', '100%')
    },
    '&.vertical-slide': {
      overflow: 'hidden',
      ...getTransformStyles('translateY', '100%')
    },
    '&.rotate': {
      perspective: 2000,
      '& > .item': {
        backfaceVisibility: 'hidden'
      },
      ...getTransformStyles('rotateY', '180deg')
    }
  }
})

type RouteElement = ReactElement<RouteProps, typeof Route>;
type ChildElement = RouteElement | ReactElement<NavigateProps, typeof Navigate>;
export interface SlideTransitionProps extends StyledProps {
  keyAnimation: string;
  children: ChildElement | (ChildElement | undefined | null)[];
  destroy?: boolean;
  animation?: 'slide' | 'vertical-slide' | 'rotate';
}

const SlideTransitionMemo: FC<SlideTransitionProps> = (props) => {
  const { animation = 'slide', duration = 200, timing = 'ease', destroy = true, children, keyAnimation, direction } = props;

  const childFactory = useCallback(
    (child: ReactElement<CSSTransitionProps>) =>
      cloneElement(child, { classNames: direction }),
    [direction]
  );

  const cssTransitionProps = useMemo(
    () => (destroy ? { timeout: duration } : { addEndListener() { } }),
    [destroy, duration]
  );
   
  return (
    <>
      <CustomTransitionGroup
        className={`slide-routes ${animation}`}
        childFactory={childFactory}
        duration={duration}
        timing={timing}
        direction={direction}
      >
        <CSSTransition
          key={keyAnimation}

          {...cssTransitionProps}
        >
          {
            () => {
              return (
                <div className={cn('item')}>
                  {children}
                </div>
              )
            }
          }
        </CSSTransition>
      </CustomTransitionGroup>
    </>
  )
};

export const SlideTransition = React.memo(SlideTransitionMemo);
