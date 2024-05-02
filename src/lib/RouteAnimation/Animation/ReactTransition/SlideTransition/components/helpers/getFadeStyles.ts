export const getFadeStyles = () => {
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
