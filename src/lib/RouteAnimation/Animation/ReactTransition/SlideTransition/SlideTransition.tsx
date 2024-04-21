import React, { FC, ReactElement, cloneElement, useCallback, useMemo } from "react"
import { Box, styled, type SxProps } from '@mui/material';
import { Navigate, NavigateProps, Route, RouteProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import cn from 'classnames';
import { CommonTransitionProps } from '../TransitionProps'

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
const getFadeStyles = () => {
  const  time = '300ms';
  return ({

  '& > .back-enter, & > .forward-enter': {
    opacity: 0,
    transform: 'scale(1.1)'
  },
  '& > .back-enter-active, & > .forward-enter-active': {
    opacity: 1,
    transform: 'scale(1)',
    transition: `opacity ${time}, transform ${time}`
  },
  '& > .back-exit, & > .forward-exit': {
    opacity: 1,
    transform: 'scale(1)',
    transition: `opacity ${time}, transform ${time}`
  },
  '& > .back-exit-active, & > .forward-exit-active': {
    opacity: 0,
    transform: 'scale(0.9)',
    transition: `opacity ${time}, transform ${time}`
  },
// .fade {
//   position: absolute;
//   left: 15px;
//   right: 15px;
// }

// .fade-enter {
//   opacity: 0;
//   transform: scale(1.1);
// }

// .fade-enter-active {
//   opacity: 1;
//   transform: scale(1);
//   transition: opacity $time, transform $time;
// }

// .fade-exit {
//   opacity: 1;
//   transform: scale(1);
// }

// .fade-exit-active {
//   opacity: 0;
//   transform: scale(0.9);
//   transition: opacity $time, transform $time;
// }
  })
}
const CustomTransitionGroup = styled(TransitionGroup)<StyledProps>(({ duration, timing, direction }) => {
  return {
    display: 'grid',
    '& > .item': {
      overflow: 'hidden',
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
    },
    '&.fade': {
      overflow: 'hidden',
      ...getFadeStyles()
    }
  }
})



export type SlideTransitionProps =  {
  destroy?: boolean;
  animation?: 'slide' | 'vertical-slide' | 'rotate';// | 'fade';
} & CommonTransitionProps & StyledProps;


const SlideTransitionMemo: FC<SlideTransitionProps> = (props) => {
  const { animation = 'slide', duration = 300, timing = 'ease', destroy = true, children, keyAnimation, direction, sx, classNameItem, sxItem,  ...p } = props;

  const childFactory = useCallback(
    (child: ReactElement<CSSTransitionProps>) =>
      cloneElement(child, { classNames: direction }),
    [direction]
  );

  const cssTransitionProps = useMemo(
    () => (destroy ? { timeout: duration } : { addEndListener() { console.dir('Добавлены Events'); } }),
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
        sx={sx}
      >
        <CSSTransition
          key={keyAnimation}
          {...cssTransitionProps}
          {...p}
        >
          {
            () => {
              return (
                <Box className={cn('item', classNameItem)} sx={sxItem}>
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
