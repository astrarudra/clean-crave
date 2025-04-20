import React from 'react';
import { 
  Grid, 
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

      <Grid 
        container 
        spacing={3}
        alignItems="stretch"
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
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              sx={{ 
                display: 'flex'
              }}
            >
              <RecipeCard recipe={recipe} />
            </Grid>
          </Fade>
        ))}
      </Grid>
    </>
  );
};

export default RecipeGrid; 