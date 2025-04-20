import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import NoMealsIcon from '@mui/icons-material/NoMeals';

/**
 * Component displayed when no recipes match the search/filter criteria
 */
const NoResultsMessage = () => {
  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        py: 10, 
        px: 3,
        backgroundColor: 'background.paper',
        borderRadius: 4,
        border: '1px dashed',
        borderColor: 'divider',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.03)'
      }}
    >
      <NoMealsIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h5" color="text.secondary" gutterBottom fontWeight={600}>
        No recipes found matching your criteria.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
        Try different filters or search terms to find what you're looking for.
      </Typography>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={() => window.location.reload()}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default NoResultsMessage; 