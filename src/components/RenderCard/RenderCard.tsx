import React from "react";
import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';

export const RenderCard = () => {
  return (
    <Card sx={{ width: 200 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}