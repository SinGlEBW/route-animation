export const getTransformStyles = (transformFn: string, max: string, isOpacity: boolean = false) => ({
  '& > .back-enter': {
    transform: `${transformFn}(-${max})`,
    ...(isOpacity && {opacity: 0})
  },
  '& > .back-enter-active': {
    transform: `${transformFn}(0)`,
    ...(isOpacity && {opacity: 1})
  },
  '& > .back-exit': {
    transform: `${transformFn}(0)`,
    ...(isOpacity && {opacity: 1})
  },
  '& > .back-exit-active': {
    transform: `${transformFn}(${max})`,
    ...(isOpacity && {opacity: 0})
  },

  '& > .forward-enter': {
    transform: `${transformFn}(${max})`,
    ...(isOpacity && {opacity: 0})
  },
  '& > .forward-enter-active': {
    transform: `${transformFn}(0)`,
    ...(isOpacity && {opacity: 1})
  },
  '& > .forward-exit': {
    transform: `${transformFn}(0)`,
    ...(isOpacity && {opacity: 1})
  },
  '& > .forward-exit-active': {
    transform: `${transformFn}(-${max})`,
    ...(isOpacity && {opacity: 0})
  }
});