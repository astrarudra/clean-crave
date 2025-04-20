import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tabs,
  Tab,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Card,
  CardContent
} from '@mui/material';
import { Icon } from '@iconify/react';

/**
 * Page component for displaying the food nutrition database
 */
const FoodDatabasePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categories, setCategories] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Fetch food data
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://astrarudra.github.io/data/foodIndex.json');
        if (!response.ok) {
          throw new Error('Failed to fetch food data');
        }
        const data = await response.json();
        setFoods(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(item => item.type))];
        setCategories(['all', ...uniqueCategories]);
        
        setFilteredFoods(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food data:', error);
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Filter foods based on search term and active category
  useEffect(() => {
    let result = foods;
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(food => food.type === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(food => 
        food.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        food.type.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    
    // Sort the results
    result = [...result].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredFoods(result);
    setPage(0); // Reset to first page when filters change
  }, [foods, searchTerm, activeCategory, sortConfig]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle category tab change
  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get a visual indicator for sort direction
  const getSortDirectionIcon = (name) => {
    if (sortConfig.key !== name) {
      return <Icon icon="mdi:sort" style={{ opacity: 0.3, width: 18, height: 18 }} />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon icon="mdi:sort-ascending" style={{ width: 18, height: 18 }} />
      : <Icon icon="mdi:sort-descending" style={{ width: 18, height: 18 }} />;
  };

  // Get nutritional metrics color based on value (high, medium, low)
  const getNutrientColor = (type, value) => {
    if (!value || value === '') return theme.palette.text.secondary;
    
    // Different scales for different nutrient types
    switch(type) {
      case 'cal':
        if (value > 300) return theme.palette.error.main;
        if (value > 150) return theme.palette.warning.main;
        return theme.palette.success.main;
      case 'protien': // Note: This is spelled as in the API response
        if (value > 15) return theme.palette.success.main;
        if (value > 5) return theme.palette.info.main;
        return theme.palette.text.secondary;
      case 'carbs':
        if (value > 30) return theme.palette.error.main;
        if (value > 15) return theme.palette.warning.main;
        return theme.palette.success.main;
      case 'fat':
        if (value > 15) return theme.palette.error.main;
        if (value > 5) return theme.palette.warning.main;
        return theme.palette.success.main;
      case 'fiber':
        if (value > 5) return theme.palette.success.main;
        if (value > 2) return theme.palette.info.main;
        return theme.palette.text.secondary;
      default:
        return theme.palette.text.primary;
    }
  };

  // Icons for different food types
  const getFoodTypeIcon = (type) => {
    switch(type) {
      case 'Beverages':
        return 'mdi:cup';
      case 'Dairy Products':
        return 'mdi:cheese';
      case 'Fruits':
        return 'mdi:fruit-cherries';
      case 'Vegetables':
        return 'mdi:carrot';
      case 'Grains/Cereals':
        return 'mdi:grain';
      case 'Proteins':
        return 'mdi:food-steak';
      case 'Sweet/Dessert':
        return 'mdi:cake';
      case 'Spice/Condiment':
        return 'mdi:shaker-outline';
      default:
        return 'mdi:food-apple';
    }
  };

  // Get color for food type
  const getFoodTypeColor = (type) => {
    switch(type) {
      case 'Beverages':
        return theme.palette.info.main;
      case 'Dairy Products':
        return theme.palette.primary.light;
      case 'Fruits':
        return theme.palette.success.main;
      case 'Vegetables':
        return theme.palette.success.dark;
      case 'Grains/Cereals':
        return theme.palette.warning.light;
      case 'Proteins':
        return theme.palette.error.light;
      case 'Sweet/Dessert':
        return theme.palette.secondary.main;
      case 'Spice/Condiment':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          mb: 5,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}30)`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{
            position: 'absolute',
            right: isMobile ? -50 : -20,
            top: isMobile ? -50 : -30,
            width: isMobile ? '150px' : '200px',
            height: isMobile ? '150px' : '200px',
            background: `radial-gradient(circle, ${theme.palette.primary.light}40, transparent 70%)`,
            borderRadius: '50%',
            zIndex: 0
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Icon 
              icon="mdi:food-apple-outline" 
              style={{ 
                color: theme.palette.primary.main, 
                width: isMobile ? 32 : 48, 
                height: isMobile ? 32 : 48,
                marginRight: 16
              }} 
            />
            <Typography 
              variant="h3" 
              component="h1" 
              fontWeight={700} 
              sx={{ 
                fontSize: { xs: '2rem', md: '2.5rem' },
                backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Food Nutrition Database
            </Typography>
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: '800px', 
              mb: 3, 
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.2rem' }
            }}
          >
            Browse our comprehensive database of food items with detailed nutritional information to help you make informed dietary choices.
          </Typography>
          
          {/* Search bar */}
          <TextField
            fullWidth
            placeholder="Search for foods by name or category..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            sx={{ 
              mb: 3,
              maxWidth: '600px',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:magnify" width={24} height={24} />
                </InputAdornment>
              ),
            }}
          />

          {/* Food Stats Cards */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2, 
            mb: 2
          }}>
            <Card sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Icon 
                    icon="mdi:database" 
                    style={{ width: 24, height: 24, color: theme.palette.primary.main, marginRight: 8 }} 
                  />
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {foods.length}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total Foods
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Icon 
                    icon="mdi:tag-multiple" 
                    style={{ width: 24, height: 24, color: theme.palette.secondary.main, marginRight: 8 }} 
                  />
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {categories.length - 1}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Categories
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Icon 
                    icon="mdi:filter-variant" 
                    style={{ width: 24, height: 24, color: theme.palette.warning.main, marginRight: 8 }} 
                  />
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {filteredFoods.length}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Filtered Results
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Paper>

      {/* Category Tabs */}
      <Paper 
        sx={{ 
          mb: 3, 
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: theme.shadows[2] 
        }}
      >
        <Tabs
          value={activeCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
            },
            '& .MuiTab-root': {
              minHeight: 48,
              textTransform: 'none',
              fontSize: '0.9rem',
              fontWeight: 500
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon icon="mdi:food-apple" style={{ marginRight: 8, width: 20, height: 20 }} />
                All Foods
              </Box>
            } 
            value="all" 
          />
          {categories.filter(c => c !== 'all').map((category) => (
            <Tab 
              key={category} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon 
                    icon={getFoodTypeIcon(category)} 
                    style={{ 
                      marginRight: 8, 
                      width: 20, 
                      height: 20,
                      color: getFoodTypeColor(category)
                    }} 
                  />
                  {category}
                </Box>
              } 
              value={category} 
            />
          ))}
        </Tabs>
      </Paper>

      {/* Food Table */}
      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          boxShadow: theme.shadows[2]
        }}
      >
        <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '35%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => requestSort('name')}>
                    Food Item
                    {getSortDirectionIcon('name')}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => requestSort('type')}>
                    Category
                    {getSortDirectionIcon('type')}
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'flex-end' }} onClick={() => requestSort('cal')}>
                    Calories
                    {getSortDirectionIcon('cal')}
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'flex-end' }} onClick={() => requestSort('protien')}>
                    Protein (g)
                    {getSortDirectionIcon('protien')}
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'flex-end' }} onClick={() => requestSort('carbs')}>
                    Carbs (g)
                    {getSortDirectionIcon('carbs')}
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'flex-end' }} onClick={() => requestSort('fat')}>
                    Fat (g)
                    {getSortDirectionIcon('fat')}
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'flex-end' }} onClick={() => requestSort('fiber')}>
                    Fiber (g)
                    {getSortDirectionIcon('fiber')}
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFoods
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((food) => (
                  <TableRow 
                    key={food.id}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: theme.palette.action.hover 
                      }
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography fontWeight={500}>{food.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        icon={<Icon icon={getFoodTypeIcon(food.type)} style={{ width: 16, height: 16 }} />}
                        label={food.type} 
                        size="small"
                        sx={{ 
                          backgroundColor: `${getFoodTypeColor(food.type)}20`,
                          color: getFoodTypeColor(food.type),
                          borderColor: getFoodTypeColor(food.type),
                          fontWeight: 500
                        }}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        fontWeight={500} 
                        color={getNutrientColor('cal', food.cal)}
                      >
                        {food.cal !== '' ? food.cal : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        fontWeight={500} 
                        color={getNutrientColor('protien', food.protien)}
                      >
                        {food.protien}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        fontWeight={500} 
                        color={getNutrientColor('carbs', food.carbs)}
                      >
                        {food.carbs}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        fontWeight={500} 
                        color={getNutrientColor('fat', food.fat)}
                      >
                        {food.fat}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        fontWeight={500} 
                        color={getNutrientColor('fiber', food.fiber)}
                      >
                        {food.fiber}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              
              {filteredFoods.length === 0 && (
                <TableRow style={{ height: 53 * 5 }}>
                  <TableCell colSpan={7} align="center">
                    <Box py={3}>
                      <Icon 
                        icon="mdi:food-off" 
                        style={{ 
                          width: 48,
                          height: 48,
                          marginBottom: 16,
                          color: theme.palette.text.disabled
                        }} 
                      />
                      <Typography variant="h6" color="textSecondary">
                        No food items found
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Try adjusting your search or filter criteria
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredFoods.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Legend */}
      <Paper 
        elevation={1} 
        sx={{ 
          mt: 3, 
          p: 2, 
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Nutritional Value Legend
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1.5 
          }}
        >
          <Chip
            size="small" 
            label="Low"
            sx={{ backgroundColor: `${theme.palette.success.main}30`, color: theme.palette.success.main }}
          />
          <Chip
            size="small" 
            label="Medium"
            sx={{ backgroundColor: `${theme.palette.warning.main}30`, color: theme.palette.warning.main }}
          />
          <Chip
            size="small" 
            label="High"
            sx={{ backgroundColor: `${theme.palette.error.main}30`, color: theme.palette.error.main }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Values are approximate and may vary based on preparation methods and sources. Nutrition values are provided per 100g serving.
        </Typography>
      </Paper>
    </Container>
  );
};

export default FoodDatabasePage; 