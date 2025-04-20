import React from 'react';
import { 
  Box, 
  Typography, 
  Divider,
  Fade,
  Button
} from '@mui/material';
import RecipeCard from './RecipeCard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NoResultsMessage from './NoResultsMessage';
import RecipeSort from './RecipeSort';
import { Icon } from '@iconify/react';

/**
 * Component for displaying a grid of recipe cards
 * Shows 3 cards per row and includes a heading
 */
const RecipeGrid = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return <NoResultsMessage />;
  }
  
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RestaurantIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 28 }} />
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
              Our Recipes
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              Showing {recipes.length} delicious recipes
            </Typography>
          </Box>
        </Box>
        
        {/* Sort Button - More Prominent */}
        <Button
          variant="contained"
          color="primary"
          id="recipe-sort-button"
          aria-label="Sort recipes"
          sx={{ 
            height: 40, 
            minWidth: 0,
            width: 40,
            fontWeight: 600,
            boxShadow: 2,
            borderRadius: '50%',
            padding: 0
          }}
        >
          <Icon icon="mdi:sort" width={24} height={24} />
        </Button>
      </Box>
      <Divider sx={{ mb: 4 }} />
      
      {/* Hidden RecipeSort component to handle the actual sorting */}
      <Box>
        <RecipeSort />
      </Box>

      <Box 
        sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          margin: '-12px', // Compensate for item padding
          alignItems: 'stretch'
        }}
      >
        {recipes.map((recipe, index) => (
          <Fade 
            in={true} 
            key={recipe.id}
            style={{ 
              transitionDelay: `${index * 50}ms`,
              transitionDuration: '400ms'
            }}
          >
            <Box 
              sx={{ 
                width: '100%',
                padding: '12px', // Equivalent to spacing={3}
                display: 'flex',
                '@media (min-width: 600px)': {
                  width: '50%', // 6/12 columns for sm screens
                },
                '@media (min-width: 900px)': {
                  width: '33.333%', // 4/12 columns for md screens
                }
              }}
            >
              <RecipeCard recipe={recipe} />
            </Box>
          </Fade>
        ))}
      </Box>
    </>
  );
};

export default RecipeGrid; 