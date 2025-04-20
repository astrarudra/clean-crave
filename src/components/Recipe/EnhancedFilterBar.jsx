import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Chip,
  Stack,
  Button,
  Divider,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useAppStore } from '../../store';

/**
 * Enhanced filter bar component with more specific filters based on the updated data
 */
const EnhancedFilterBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mealType, setMealType] = useState('all');
  const [dietType, setDietType] = useState('all');
  const [maxTime, setMaxTime] = useState(60);
  const [showQuickOnly, setShowQuickOnly] = useState(false);
  
  const setFilters = useAppStore(state => state.setFilters);
  const applyFilters = useAppStore(state => state.applyFilters);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilters({ searchTerm: e.target.value });
    applyFilters();
  };
  
  const handleMealTypeChange = (e) => {
    setMealType(e.target.value);
    setFilters({ mealType: e.target.value === 'all' ? null : e.target.value });
    applyFilters();
  };
  
  const handleDietTypeChange = (e) => {
    setDietType(e.target.value);
    setFilters({ dietType: e.target.value === 'all' ? null : e.target.value });
    applyFilters();
  };
  
  const handleTimeChange = (e, newValue) => {
    setMaxTime(newValue);
    setFilters({ maxTime: newValue });
    applyFilters();
  };
  
  const handleQuickToggle = () => {
    const newValue = !showQuickOnly;
    setShowQuickOnly(newValue);
    setFilters({ quickOnly: newValue ? true : null });
    applyFilters();
  };
  
  const handleReset = () => {
    setSearchTerm('');
    setMealType('all');
    setDietType('all');
    setMaxTime(60);
    setShowQuickOnly(false);
    setFilters({
      searchTerm: '',
      mealType: null,
      dietType: null,
      maxTime: null,
      quickOnly: null
    });
    applyFilters();
  };
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 3,
        backgroundColor: 'background.paper'
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: { xs: 2, md: 0 } }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ width: '100%' }}
          >
            <FormControl sx={{ minWidth: 120, flex: 1 }}>
              <InputLabel id="meal-type-label">Meal Type</InputLabel>
              <Select
                labelId="meal-type-label"
                id="meal-type-select"
                value={mealType}
                label="Meal Type"
                onChange={handleMealTypeChange}
              >
                <MenuItem value="all">All Meals</MenuItem>
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 120, flex: 1 }}>
              <InputLabel id="diet-type-label">Diet Type</InputLabel>
              <Select
                labelId="diet-type-label"
                id="diet-type-select"
                value={dietType}
                label="Diet Type"
                onChange={handleDietTypeChange}
              >
                <MenuItem value="all">All Diets</MenuItem>
                <MenuItem value="vegan">Vegan</MenuItem>
                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                <MenuItem value="non-veg">Non-Vegetarian</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography id="time-slider-label" gutterBottom>
            Maximum Cooking Time: {maxTime} minutes
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Slider
              value={maxTime}
              onChange={handleTimeChange}
              aria-labelledby="time-slider-label"
              valueLabelDisplay="auto"
              min={5}
              max={60}
              marks={[
                { value: 10, label: '10m' },
                { value: 30, label: '30m' },
                { value: 60, label: '60m' },
              ]}
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 1, md: 3 } }}>
            <Chip
              icon={<RestaurantIcon />}
              label="Quick Recipes"
              color={showQuickOnly ? "primary" : "default"}
              variant={showQuickOnly ? "filled" : "outlined"}
              onClick={handleQuickToggle}
              sx={{ flex: 1 }}
            />
            
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleReset}
              sx={{ flex: 1 }}
              startIcon={<FilterAltIcon />}
            >
              Reset Filters
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EnhancedFilterBar; 