

import React from 'react';
import { Button } from '@mui/material/';

const Statistics = ({ onClick }) => {
  return (
    <Button variant="contained" sx={{background: 'transparent', boxShadow: 'none'}} onClick={onClick}>
      Statistics
    </Button>
  );
};

export default Statistics;