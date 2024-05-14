import React from "react";
import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';

export const RenderCard = ({title}) => {
  return (
    <Card sx={{ width: 100 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}