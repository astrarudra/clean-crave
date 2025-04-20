import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import FeaturesSection from '../components/Home/FeaturesSection';
import ChartsSection from '../components/Home/ChartsSection';

/**
 * Home page component that showcases the three main sections of the app:
 * Recipes, Food Database, and Learn
 */
const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Main sections of the app
  const sections = [
    {
      id: 'recipes',
      title: 'Healthy Recipes',
      path: '/recipes',
      icon: 'mdi:food-apple',
      image: 'https://astrarudra.github.io/data/images/babycooking.png',
      description: 'Discover delicious and nutritious recipes that support your health goals.',
      features: [
        'Filter by dietary preferences',
        'Sort by nutrition values',
        'Quick & easy meal ideas',
        'Seasonal favorites'
      ]
    },
    {
      id: 'food-database',
      title: 'Food Database',
      path: '/food-database',
      icon: 'mdi:database',
      image: 'https://astrarudra.github.io/data/images/fooddb.png',
      description: 'Explore our comprehensive food database with nutritional information.',
      features: [
        'Detailed nutrition facts',
        'Food comparisons',
        'Ingredient analysis',
        'Search by nutrient content'
      ]
    },
    {
      id: 'learn',
      title: 'Learn & Educate',
      path: '/education',
      icon: 'mdi:book-open-variant',
      image: 'https://astrarudra.github.io/data/images/foodedu.png',
      description: 'Expand your knowledge about nutrition and healthy eating habits.',
      features: [
        'Evidence-based articles',
        'Nutrition science explained',
        'Healthy eating guides',
        'Meal planning tips'
      ]
    }
  ];

  return (
    <Box sx={{ 
      overflowX: 'hidden',
      '@keyframes fadeInUp': {
        from: {
          opacity: 0,
          transform: 'translateY(20px)'
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)'
        }
      },
      '@keyframes float': {
        '0%, 100%': {
          transform: 'translateY(0)'
        },
        '50%': {
          transform: 'translateY(-10px)'
        }
      },
      '@keyframes fadeIn': {
        from: {
          opacity: 0
        },
        to: {
          opacity: 1
        }
      }
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6BC4A6 0%, #32936F 100%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '-5%',
            right: '-5%',
            width: '20%',
            height: '20%',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '30%',
            height: '30%',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h1"
                color="white"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 700,
                  mb: 2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  animation: 'fadeIn 0.8s ease-out',
                }}
              >
                Eat Clean, Feel Better
              </Typography>
              <Typography
                variant="h2"
                color="white"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 400,
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: '600px',
                  lineHeight: 1.5,
                }}
              >
                Your comprehensive guide to healthy eating with delicious recipes, nutritional information, and educational resources.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleNavigate('/recipes')}
                  sx={{
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Explore Recipes
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => handleNavigate('/food-database')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Browse Foods
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '300px',
                  height: '300px',
                  display: 'flex',
                  justifyContent: 'center', 
                  alignItems: 'center',
                  animation: 'float 5s ease-in-out infinite',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    zIndex: 0
                  }
                }}
              >
                <Icon 
                  icon="mdi:food-apple-outline" 
                  style={{ 
                    width: '180px', 
                    height: '180px', 
                    color: 'white',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                    position: 'relative',
                    zIndex: 1
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <FeaturesSection sections={sections} onNavigate={handleNavigate} />

      {/* Quote Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(107, 196, 166, 0.1)',
          py: 10,
          my: 5,
        }}
      >
        <Container>
          <Box
            sx={{
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Typography
              variant="h4"
              component="blockquote"
              sx={{
                fontWeight: 500,
                lineHeight: 1.5,
                mb: 3,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              "Let food be thy medicine and medicine be thy food."
            </Typography>
            <Typography
              variant="h6"
              component="cite"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              — Hippocrates
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Charts Section */}
      <ChartsSection />

    </Box>
  );
};

export default HomePage; 