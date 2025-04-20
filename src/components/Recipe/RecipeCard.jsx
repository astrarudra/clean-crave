import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip, 
  Stack,
  CardActionArea,
  Tooltip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

/**
 * Card component for displaying a recipe preview
 * Optimized for a 3-column grid layout with enhanced nutrition info
 */
const RecipeCard = ({ recipe }) => {
  const { 
    id, 
    title, 
    prepTime, 
    cookTime, 
    servings,
    dietType,
    mealType,
    nutrition = {},
    rating
  } = recipe;

  // Construct the image URL using the recipe ID
  const imageUrl = `https://astrarudra.github.io/data/images/${id}.jpg`;
  
  // Calculate total time (prep + cook)
  const totalTime = (parseInt(prepTime) || 0) + (parseInt(cookTime) || 0);
  
  // Determine if recipe is quick (less than 20 minutes total)
  const isQuickRecipe = totalTime <= 20;
  
  // Get diet icon based on type
  const getDietIcon = () => {
    switch(dietType) {
      case 'vegan': return "mdi:leaf";
      case 'vegetarian': return "mdi:food-apple";
      default: return "mdi:food-steak";
    }
  };
  
  // Get diet icon color
  const getDietIconColor = () => {
    switch(dietType) {
      case 'vegan': return "#2e7d32"; // green[800]
      case 'vegetarian': return "#558b2f"; // lightGreen[800]
      default: return "#d32f2f"; // red[700]
    }
  };
  
  // Format rating for display (5-star scale)
  const formattedRating = (rating / 2).toFixed(1);
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <CardActionArea 
        component={RouterLink} 
        to={`/recipes/${id}`}
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100%'
        }}
      >
        <Box sx={{ position: 'relative', height: '100%' }}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={title}
            sx={{ 
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
          
          {/* Diet type indicator on left */}
          <Tooltip title={dietType === 'vegan' ? 'Vegan' : dietType === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}>
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 2
              }}
            >
              <Icon 
                icon={getDietIcon()} 
                width={22} 
                height={22} 
                style={{ color: getDietIconColor() }} 
              />
            </Box>
          </Tooltip>
          
          {/* Rating indicator as a chip */}
          <Chip
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" fontWeight={600} sx={{ mr: 0.5, color: 'white' }}>
                  {formattedRating}
                </Typography>
                <Icon icon="ph:star-fill" width={12} height={12} style={{ color: '#FFD700' }} />
              </Box>
            }
            size="small"
            sx={{ 
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontWeight: 'bold',
              height: 24,
              zIndex: 2
            }}
          />
          
          {/* Servings indicator on bottom left of image */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: 1,
              padding: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              zIndex: 2
            }}
          >
            <Icon 
              icon="hugeicons--serving-food" 
              width={16} 
              style={{ 
                color: 'white', 
                marginRight: 4 
              }} 
            />
            <Typography variant="caption" sx={{ color: 'white' }}>
              {servings} serving{servings !== 1 ? 's' : ''}
            </Typography>
          </Box>
          
          {/* Time indicator on bottom right of image */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: 1,
              padding: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              zIndex: 2
            }}
          >
            <Icon icon="mdi:clock-time-four-outline" width={16} style={{ color: 'white', marginRight: 4 }} />
            <Typography variant="caption" sx={{ color: 'white' }}>
              {totalTime} min
            </Typography>
          </Box>
        </Box>
        
        <CardContent sx={{ flex: 1, pb: 2 }}>
          {/* Tags and calories */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 1.5,
            }}
          >
            <Stack direction="row" spacing={1}>
              <Chip 
                label={mealType} 
                size="small" 
                color="primary" 
                sx={{ 
                  fontWeight: 500, 
                  fontSize: '0.7rem',
                  height: '22px'
                }} 
              />
              {isQuickRecipe && (
                <Chip 
                  label="Quick" 
                  size="small" 
                  color="secondary" 
                  sx={{ 
                    fontWeight: 500, 
                    fontSize: '0.7rem',
                    height: '22px'
                  }} 
                />
              )}
            </Stack>
            
            {/* Calories - moved to right of tags */}
            <Tooltip title="Calories">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon 
                  icon="mdi:fire" 
                  width={18} 
                  style={{ 
                    marginRight: 4, 
                    color: '#f57c00' // orange[700]
                  }} 
                />
                <Typography variant="body2" fontWeight={600} color="#f57c00">
                  {nutrition.calories} cal
                </Typography>
              </Box>
            </Tooltip>
          </Box>
          
          <Typography 
            component="div" 
            sx={{ 
              fontWeight: 600,
              mb: 1.5,
              fontSize: '1rem',
              lineHeight: 1.3
            }}
          >
            {title}
          </Typography>

          {/* Nutrition information with new icons in one row */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              backgroundColor: 'background.light',
              borderRadius: 1,
              py: 0.8,
              px: 2,
              mb: 1.5
            }}
          >
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Nutrition
            </Typography>
            
            <Stack 
              direction="row" 
              spacing={3}
            >
              <Tooltip title="Carbs">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon 
                    icon="noto:bread" 
                    width={18} 
                    style={{ marginRight: 4 }} 
                  />
                  <Typography variant="caption" fontWeight={500}>
                    {nutrition.carbs}g
                  </Typography>
                </Box>
              </Tooltip>
              
              <Tooltip title="Protein">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon 
                    icon="openmoji:meat-on-bone" 
                    width={18} 
                    style={{ marginRight: 4 }} 
                  />
                  <Typography variant="caption" fontWeight={500}>
                    {nutrition.protein}g
                  </Typography>
                </Box>
              </Tooltip>
              
              <Tooltip title="Fat">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon 
                    icon="fluent-emoji:cheese-wedge" 
                    width={18} 
                    style={{ marginRight: 4 }} 
                  />
                  <Typography variant="caption" fontWeight={500}>
                    {nutrition.fat}g
                  </Typography>
                </Box>
              </Tooltip>
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard; 