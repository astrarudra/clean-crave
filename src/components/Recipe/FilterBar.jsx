import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  InputAdornment,
  Chip,
  Button,
  Typography,
  Divider,
  Container
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useAppStore } from '../../store';

/**
 * Enhanced filter bar with toggleable quick filters using flexbox
 */
const FilterBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTimeFilter, setActiveTimeFilter] = useState(null);
  const [activeDietFilter, setActiveDietFilter] = useState(null);
  const [activeMealFilter, setActiveMealFilter] = useState(null);
  const [nutritionFilters, setNutritionFilters] = useState([]);
  
  const setFilters = useAppStore(state => state.setFilters);
  const applyFilters = useAppStore(state => state.applyFilters);
  const resetFilters = useAppStore(state => state.resetFilters);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilters({ searchTerm: e.target.value });
    applyFilters();
  };
  
  const handleTimeFilter = (minutes) => {
    // Toggle if the same button is clicked
    const newValue = activeTimeFilter === minutes ? null : minutes;
    setActiveTimeFilter(newValue);
    setFilters({ maxTime: newValue });
    applyFilters();
  };
  
  const handleDietFilter = (diet) => {
    // Toggle if the same button is clicked
    const newValue = activeDietFilter === diet ? null : diet;
    setActiveDietFilter(newValue);
    setFilters({ dietType: newValue });
    applyFilters();
  };
  
  const handleMealFilter = (meal) => {
    // Toggle if the same button is clicked
    const newValue = activeMealFilter === meal ? null : meal;
    setActiveMealFilter(newValue);
    setFilters({ mealType: newValue });
    applyFilters();
  };
  
  const handleNutritionFilter = (filterType) => {
    const newFilters = [...nutritionFilters];
    const index = newFilters.indexOf(filterType);
    
    // Toggle the filter
    if (index >= 0) {
      newFilters.splice(index, 1);
    } else {
      newFilters.push(filterType);
    }
    
    setNutritionFilters(newFilters);
    
    // Apply nutrition filters
    setFilters({
      highProtein: newFilters.includes('highProtein'),
      lowCarb: newFilters.includes('lowCarb'),
      lowCalorie: newFilters.includes('lowCalorie'),
    });
    
    applyFilters();
  };
  
  const handleReset = () => {
    setSearchTerm('');
    setActiveTimeFilter(null);
    setActiveDietFilter(null);
    setActiveMealFilter(null);
    setNutritionFilters([]);
    resetFilters();
  };
  
  // Helper to determine if a filter is active
  const isFilterActive = () => {
    return searchTerm || 
           activeTimeFilter || 
           activeDietFilter || 
           activeMealFilter ||
           nutritionFilters.length > 0;
  };
  
  // Fixed icon sizes - prevent size changes on resize
  const headerIconStyle = { marginRight: 8, width: 20, height: 20, flexShrink: 0 };
  const buttonIconStyle = { marginRight: 8, width: 18, height: 18, flexShrink: 0 };
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: { xs: 2, md: 4 }, 
        borderRadius: 3,
        backgroundColor: 'background.paper',
        width: '100%'
      }}
    >
      {/* Search bar - larger and more prominent */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search for recipes, tags, meal types..."
          value={searchTerm}
          onChange={handleSearch}
          variant="outlined"
          size="large"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="mdi:magnify" width={24} height={24} style={{ flexShrink: 0 }} />
              </InputAdornment>
            ),
            sx: { 
              fontSize: '1.1rem', 
              py: 0.5,
              borderRadius: 2
            }
          }}
          sx={{ 
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main',
                borderWidth: '2px'
              }
            }
          }}
        />
      </Box>
      
      <Divider sx={{ my: 2 }}>
        <Chip label="Quick Filters" variant="outlined" />
      </Divider>
      
      {/* Flexbox Filter Layout (2x2 on larger screens, 1x4 on mobile) */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: 3,
        mt: 2,
        width: '100%'
      }}>
        {/* Cook Time Filter */}
        <Box sx={{ 
          p: 2, 
          border: '1px solid',
          borderColor: 'divider', 
          borderRadius: 2,
          flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' },
          minWidth: { xs: '100%', sm: 'calc(50% - 12px)' }
        }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, mb: 2 }}>
            <Icon icon="mdi:clock-time-three-outline" style={{ ...headerIconStyle, color: "#2196f3" }} />
            Cook Time
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant={activeTimeFilter === 15 ? "contained" : "outlined"} 
              size="small" 
              color="primary"
              onClick={() => handleTimeFilter(15)}
              sx={{ flex: 1 }}
            >
              <Icon icon="mdi:timer-sand" style={{ ...buttonIconStyle }} />
              ≤15min
            </Button>
            <Button 
              variant={activeTimeFilter === 30 ? "contained" : "outlined"} 
              size="small" 
              color="primary"
              onClick={() => handleTimeFilter(30)}
              sx={{ flex: 1 }}
            >
              <Icon icon="mdi:timer-sand" style={{ ...buttonIconStyle }} />
              ≤30min
            </Button>
            <Button 
              variant={activeTimeFilter === 60 ? "contained" : "outlined"} 
              size="small" 
              color="primary"
              onClick={() => handleTimeFilter(60)}
              sx={{ flex: 1 }}
            >
              <Icon icon="mdi:timer-sand" style={{ ...buttonIconStyle }} />
              Any
            </Button>
          </Box>
        </Box>
        
        {/* Diet Type Filter */}
        <Box sx={{ 
          p: 2, 
          border: '1px solid',
          borderColor: 'divider', 
          borderRadius: 2,
          flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' },
          minWidth: { xs: '100%', sm: 'calc(50% - 12px)' }
        }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, mb: 2 }}>
            <Icon icon="mdi:food-drumstick-off" style={{ ...headerIconStyle, color: "#4caf50" }} />
            Diet Type
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant={activeDietFilter === 'vegetarian' ? "contained" : "outlined"} 
              size="small" 
              color="primary"
              onClick={() => handleDietFilter('vegetarian')}
              sx={{ flex: 1 }}
            >
              <Icon icon="mdi:food-apple" style={{ ...buttonIconStyle, color: "#4caf50" }} />
              Veg
            </Button>
            <Button 
              variant={activeDietFilter === 'vegan' ? "contained" : "outlined"} 
              size="small" 
              color="primary"
              onClick={() => handleDietFilter('vegan')}
              sx={{ flex: 1 }}
            >
              <Icon icon="mdi:leaf" style={{ ...buttonIconStyle, color: "#4caf50" }} />
              Vegan
            </Button>
            <Button 
              variant={activeDietFilter === 'non-veg' ? "contained" : "outlined"} 
              size="small" 
              color="primary"
              onClick={() => handleDietFilter('non-veg')}
              sx={{ flex: 1 }}
            >
              <Icon icon="mdi:food-steak" style={{ ...buttonIconStyle, color: "#f44336" }} />
              Non-Veg
            </Button>
          </Box>
        </Box>
        
        {/* Meal Type Filter */}
        <Box sx={{ 
          p: 2, 
          border: '1px solid',
          borderColor: 'divider', 
          borderRadius: 2,
          flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' },
          minWidth: { xs: '100%', sm: 'calc(50% - 12px)' }
        }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, mb: 2 }}>
            <Icon icon="mdi:silverware-fork-knife" style={{ ...headerIconStyle, color: "#ff9800" }} />
            Meal Type
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant={activeMealFilter === 'breakfast' ? "contained" : "outlined"} 
              size="small" 
              color="primary"
              onClick={() => handleMealFilter('breakfast')}
              sx={{ flex: 1 }}
            >
              <Icon icon="mdi:food-croissant" style={{ ...buttonIconStyle, color: "#ff9800" }} />
              Breakfast
            </Button>
            <Button 
              variant={activeMealFilter === 'lunch' ? "contained" : "outlined"} 
              size="small" 
              color="primary"
              onClick={() => handleMealFilter('lunch')}
              sx={{ flex: 1 }}
            >
              <Icon icon="mdi:food" style={{ ...buttonIconStyle, color: "#ff9800" }} />
              Lunch
            </Button>
            <Button 
              variant={activeMealFilter === 'dinner' ? "contained" : "outlined"} 
              size="small" 
              color="primary"
              onClick={() => handleMealFilter('dinner')}
              sx={{ flex: 1 }}
            >
              <Icon icon="mdi:food-turkey" style={{ ...buttonIconStyle, color: "#ff9800" }} />
              Dinner
            </Button>
          </Box>
        </Box>
        
        {/* Nutrition Filter */}
        <Box sx={{ 
          p: 2, 
          border: '1px solid',
          borderColor: 'divider', 
          borderRadius: 2,
          flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' },
          minWidth: { xs: '100%', sm: 'calc(50% - 12px)' },
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, mb: 2 }}>
            <Icon icon="mdi:nutrition" style={{ ...headerIconStyle, color: "#9c27b0" }} />
            Nutrition Goals
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-start' }}>
            <Button
              variant={nutritionFilters.includes('highProtein') ? "contained" : "outlined"}
              size="small"
              color="primary"
              onClick={() => handleNutritionFilter('highProtein')}
              sx={{ flex: 1 }}
            >
              <Icon icon="openmoji:meat-on-bone" style={{ ...buttonIconStyle, color: "#d32f2f" }} />
              High Protein
            </Button>
            <Button
              variant={nutritionFilters.includes('lowCarb') ? "contained" : "outlined"}
              size="small"
              color="primary"
              onClick={() => handleNutritionFilter('lowCarb')}
              sx={{ flex: 1 }}
            >
              <Icon icon="noto:bread" style={{ ...buttonIconStyle, color: "#795548" }} />
              Low Carb
            </Button>
            <Button
              variant={nutritionFilters.includes('lowCalorie') ? "contained" : "outlined"}
              size="small"
              color="primary"
              onClick={() => handleNutritionFilter('lowCalorie')}
              sx={{ flex: 1 }}
            >
              <Icon icon="mdi:fire" style={{ ...buttonIconStyle, color: "#f57c00" }} />
              Low Cal
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Reset button - only show if filters are active */}
      {isFilterActive() && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleReset}
            sx={{ mt: 1.5 }}
          >
            <Icon icon="mdi:filter-off" style={{ ...buttonIconStyle }} />
            Clear All Filters
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default FilterBar;
