import React, { useState, useEffect } from 'react';
import { 
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useAppStore } from '../../store';

/**
 * Recipe sorting component that attaches to the sort button in RecipeGrid
 */
const RecipeSort = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const filteredRecipes = useAppStore(state => state.filteredRecipes);
  const setFilteredRecipes = useAppStore(state => state.setFilteredRecipes);
  
  // Helper function to calculate total time
  const getTotalTime = (recipe) => {
    return (parseInt(recipe.prepTime) || 0) + (parseInt(recipe.cookTime) || 0);
  };
  
  useEffect(() => {
    // Find the button element after component mount
    const sortButton = document.getElementById('recipe-sort-button');
    
    if (sortButton) {
      // Add click handler to the button
      const handleSortButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      
      sortButton.addEventListener('click', handleSortButtonClick);
      
      // Clean up function
      return () => {
        sortButton.removeEventListener('click', handleSortButtonClick);
      };
    }
  }, []);
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleSortChange = (sortBy) => {
    const sorted = [...filteredRecipes].sort((a, b) => {
      switch (sortBy) {
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'time-low': {
          return getTotalTime(a) - getTotalTime(b);
        }
        case 'time-high': {
          return getTotalTime(b) - getTotalTime(a);
        }
        case 'calories-low':
          return a.nutrition.calories - b.nutrition.calories;
        case 'calories-high':
          return b.nutrition.calories - a.nutrition.calories;
        case 'protein-high':
          return b.nutrition.protein - a.nutrition.protein;
        default:
          return 0;
      }
    });
    
    setFilteredRecipes(sorted);
    handleMenuClose();
  };
  
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem onClick={() => handleSortChange('rating-high')}>
        <ListItemIcon>
          <Icon icon="mdi:star" width={20} style={{ color: '#F9A825' }} />
        </ListItemIcon>
        <ListItemText>Highest Rated</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => handleSortChange('time-low')}>
        <ListItemIcon>
          <Icon icon="mdi:timer-outline" width={20} style={{ color: '#42A5F5' }} />
        </ListItemIcon>
        <ListItemText>Quickest Prep</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => handleSortChange('calories-low')}>
        <ListItemIcon>
          <Icon icon="mdi:fire" width={20} style={{ color: '#FF7043' }} />
        </ListItemIcon>
        <ListItemText>Lowest Calories</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => handleSortChange('calories-high')}>
        <ListItemIcon>
          <Icon icon="mdi:food" width={20} style={{ color: '#FF5722' }} />
        </ListItemIcon>
        <ListItemText>Highest Calories</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => handleSortChange('protein-high')}>
        <ListItemIcon>
          <Icon icon="openmoji:meat-on-bone" width={20} />
        </ListItemIcon>
        <ListItemText>Highest Protein</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default RecipeSort; 