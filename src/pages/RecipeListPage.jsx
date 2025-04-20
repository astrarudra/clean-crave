import React, { useEffect } from 'react';
import { 
  Container, 
  Box,
  CircularProgress,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useAppStore } from '../store';
import FilterBar from '../components/Recipe/FilterBar';
import HeroSection from '../components/Recipe/HeroSection';
import RecipeGrid from '../components/Recipe/RecipeGrid';
import RecipeSort from '../components/Recipe/RecipeSort';
import { Icon } from '@iconify/react';

/**
 * Page component for displaying the list of recipes.
 * Includes hero section, enhanced filtering options and a grid of RecipeCards.
 * Fetches data from the API on mount.
 */
const RecipeListPage = () => {
  const filteredRecipes = useAppStore(state => state.filteredRecipes);
  const setRecipes = useAppStore(state => state.setRecipes);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Fetch recipes from API on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://astrarudra.github.io/data/index.json');
        const data = await response.json();
        
        // Add image URLs to each recipe
        const recipesWithImages = data.recipes.map(recipe => ({
          ...recipe,
          image: `https://astrarudra.github.io/data/images/${recipe.id}.jpg`
        }));
        
        setRecipes(recipesWithImages);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, [setRecipes]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Note: filtering is handled by the store
    useAppStore.getState().setSearchTerm(event.target.value);
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Hero Section - using same style as Food Database */}
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
              icon="mdi:food-apple" 
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
              Healthy & Delicious Recipes
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
            Discover nutritious meals that taste amazing and support your wellness journey.
          </Typography>
          
          {/* Search bar */}
          <TextField
            fullWidth
            placeholder="Search for recipes by name, tags, or ingredients..."
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

          {/* Recipe Stats Cards */}
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
                    icon="mdi:food" 
                    style={{ width: 24, height: 24, color: theme.palette.primary.main, marginRight: 8 }} 
                  />
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {filteredRecipes.length}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total Recipes
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Icon 
                    icon="mdi:silverware-fork-knife" 
                    style={{ width: 24, height: 24, color: theme.palette.secondary.main, marginRight: 8 }} 
                  />
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {loading ? '...' : [...new Set(filteredRecipes.map(r => r.mealType))].length}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Meal Types
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Icon 
                    icon="mdi:leaf" 
                    style={{ width: 24, height: 24, color: theme.palette.success.main, marginRight: 8 }} 
                  />
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {loading ? '...' : [...new Set(filteredRecipes.map(r => r.dietType))].length}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Diet Types
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Paper>

      {/* Filter Section */}
      <Box sx={{ mb: 4 }}>
        <FilterBar />
      </Box>

      {/* Recipe Grid Section */}
      <Box sx={{ mb: 5 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            {/* Recipe Grid */}
            <RecipeGrid recipes={filteredRecipes} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default RecipeListPage; 