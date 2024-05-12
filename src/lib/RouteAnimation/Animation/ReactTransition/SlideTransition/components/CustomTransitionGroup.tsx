import { styled } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import type { CommonTransitionProps } from '../../TransitionProps';
import { getTransformStyles } from './helpers/getTransformStyles';
import { getFadeStyles } from './helpers/getFadeStyles';

type Direction_OR = 'forward' | 'back' | 'undirected';

export interface CustomTransitionProps {
  direction: Direction_OR;
  isFadeSlide?:boolean
}

const getTransition = ({duration, isFadeSlide, easing}) => {
  return {
    transitionProperty: isFadeSlide ? 'transform, opacity' : 'transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing
  }
}

export const CustomTransitionGroup = styled(TransitionGroup, {
  shouldForwardProp: (prop) => {
    return !['isFadeSlide', 'easing', 'duration', 'direction', 'sx', 'sxItem'].includes(prop as string)
  }
})<CustomTransitionProps & Pick<CommonTransitionProps, 'duration' | 'easing' | 'sxItem'>>(({ duration, easing, sxItem = {}, direction, isFadeSlide = false }) => {
  return {
    display: 'grid',
    '& > .item': {
      overflow: 'hidden',
      gridArea: '1 / 1 / 2 / 2',
      // '&:not(:only-child)': {
      //   [`&.${direction}-enter-active, &.${direction}-exit-active`]: getTransition({duration, easing, isFadeSlide})
      // },
      [`&.${direction}-enter-active, &.${direction}-exit-active`]: getTransition({duration, easing, isFadeSlide}),
      // [`&.${direction}-appear-active`]: getTransition({duration, easing, isFadeSlide})
      ...sxItem,
    },
    '&.slide': {
      overflow: 'hidden',
      ...getTransformStyles('translateX', '100%', isFadeSlide)
    },
    // '&.slide-fade': {
    //   overflow: 'hidden',
    //   ...getTransformStyles('translateX', '100%', true)
    // },
    '&.vertical-slide': {
      overflow: 'hidden',
      ...getTransformStyles('translateY', '100%', isFadeSlide)
    },
    '&.rotate': {
      perspective: 2000,
      '& > .item': {
        backfaceVisibility: 'hidden'
      },
      ...getTransformStyles('rotateY', '180deg')
    },
    // '&.fade': {
    //   overflow: 'hidden',
    //   ...getFadeStyles()
    // }
  }
})


