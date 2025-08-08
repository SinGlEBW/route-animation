export const getFadeScale = ({duration = 300}) => {

  return ({
    overflow: 'hidden',
    [`&-enter`]: {
      opacity: 0,
      transform: 'scale(1.1)'
    },
    [`&-enter-active`]: {
      opacity: 1,
      transform: 'scale(1)',
      transition: `opacity ${duration}ms, transform ${duration}ms`
    },
    [`&-exit`]: {
      opacity: 1,
      transform: 'scale(1)'
    },
    [`&-exit-active`]: {
      opacity: 0,
      transform: 'scale(0.9)',
      transition: `opacity ${duration}ms, transform ${duration}ms`
    }
    // [`&.${animation}-enter`]: {
    //   opacity: 0,
    //   transform: 'scale(1.1)'
    // },
    // [`&.${animation}-enter-active`]: {
    //   opacity: 1,
    //   transform: 'scale(1)',
    //   transition: `opacity ${duration}ms, transform ${duration}ms`
    // },
    // [`&.${animation}-exit`]: {
    //   opacity: 1,
    //   transform: 'scale(1)'
    // },
    // [`&.${animation}-exit-active`]: {
    //   opacity: 0,
    //   transform: 'scale(0.9)',
    //   transition: `opacity ${duration}ms, transform ${duration}ms`
    // }
  })
}
