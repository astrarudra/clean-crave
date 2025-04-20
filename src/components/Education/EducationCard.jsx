import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

/**
 * A card component to display a preview of an educational article.
 * Shows category, title, and excerpt with a modern design.
 * Links to the full article detail page.
 * @param {object} props
 * @param {object} props.item - The educational item data object.
 */
const EducationCard = ({ item }) => {
  const { id, title, category, excerpt } = item;
  const theme = useTheme();

  // Category icon mapping
  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'Nutrition Basics':
        return 'mdi:food-apple';
      case 'Meal Planning':
        return 'mdi:calendar-text';
      case 'Wellness':
        return 'mdi:meditation';
      case 'Diet Trends':
        return 'mdi:trending-up';
      default:
        return 'mdi:book-open-variant';
    }
  };

  // Category color mapping
  const getCategoryColor = (categoryName) => {
    switch (categoryName) {
      case 'Nutrition Basics':
        return theme.palette.success.main;
      case 'Meal Planning':
        return theme.palette.info.main;
      case 'Wellness':
        return theme.palette.warning.main;
      case 'Diet Trends':
        return theme.palette.secondary.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        borderRadius: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: theme.shadows[2],
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        }
      }}
    >
      <CardActionArea 
        component={RouterLink} 
        to={`/education/${id}`} 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start' 
        }}
      >
        {/* Category badge at the top */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 10
          }}
        >
          <Chip 
            icon={
              <Icon 
                icon={getCategoryIcon(category)} 
                style={{ color: 'white', width: 16, height: 16 }} 
              />
            }
            label={category || 'Learn'}
            size="small"
            sx={{ 
              bgcolor: getCategoryColor(category),
              color: 'white',
              fontWeight: 500,
              '& .MuiChip-icon': {
                color: 'white'
              }
            }}
          />
        </Box>

        {/* Card content */}
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            width: '100%', 
            pt: 5, // Space for the floating category chip
            pb: 2
          }}
        >
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 600, 
              color: theme.palette.text.primary,
              mb: 1.5,
              lineHeight: 1.4,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2, // Limit to 2 lines
            }}
          >
            {title}
          </Typography>
          
          {excerpt && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                lineHeight: 1.5,
                mb: 2
              }}
            >
              {excerpt}
            </Typography>
          )}
          
          {/* Read more link */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'flex-end',
              mt: 'auto',
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
          >
            Read more
            <Icon 
              icon="mdi:arrow-right" 
              style={{ 
                marginLeft: 4, 
                width: 16, 
                height: 16,
                transition: 'transform 0.2s',
              }} 
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EducationCard; 