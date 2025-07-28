import { Box } from '@mui/material';
import React from "react"
import { createPortal } from 'react-dom';

const BoxBlockSlideMemo = ({sx = {}, className = ''}) => {
  return createPortal(<Box className='blockSlide' sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 10000, ...sx}}/>, document.body, 'blockSlide')
};

export const BoxBlockSlide = React.memo(BoxBlockSlideMemo);
