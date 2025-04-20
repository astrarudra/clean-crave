import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
} from '@mui/material';
import { Icon } from '@iconify/react';

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
      image: '/images/placeholder-recipe.jpg',
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
      image: '/images/food-database.jpg',
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
      image: '/images/education.jpg',
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
    <Box sx={{ overflowX: 'hidden' }}>
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
              }}
            >
              <Box
                component="img"
                src="/images/hero-image.png"
                alt="Healthy eating"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  borderRadius: '10px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  animation: 'float 5s ease-in-out infinite',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ 
            mb: 2, 
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
          }}
        >
          Discover What We Offer
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ 
            mb: 6, 
            maxWidth: '800px', 
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.15rem' },
          }}
        >
          Clean Crave provides all the tools you need to make healthy eating easy, 
          enjoyable, and educational.
        </Typography>

        <Grid container spacing={4}>
          {sections.map((section) => (
            <Grid item xs={12} md={4} key={section.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => theme.shadows[8],
                  },
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={section.image}
                  alt={section.title}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 3,
                  }}
                >
                  <Icon icon={section.icon} width={24} height={24} />
                </Box>
                <CardContent sx={{ flexGrow: 1, py: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {section.title}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>{section.description}</Typography>
                  <Box component="ul" sx={{ pl: 2, mt: 2 }}>
                    {section.features.map((feature) => (
                      <Typography
                        component="li"
                        key={feature}
                        sx={{
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '0.95rem',
                          '&::before': {
                            content: '""',
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'primary.light',
                            mr: 1.5,
                            ml: -2,
                          },
                        }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ px: 3, pb: 3 }}>
                  <Button
                    size="large"
                    onClick={() => handleNavigate(section.path)}
                    endIcon={<Icon icon="mdi:arrow-right" />}
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(107, 196, 166, 0.1)',
                      },
                    }}
                  >
                    Explore {section.title.split(' ')[0]}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Quote Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(107, 196, 166, 0.1)',
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                width: 60,
                height: 60,
                opacity: 0.2,
              },
              '&::before': {
                top: -20,
                left: 0,
                backgroundImage: 'url(/images/quote-left.svg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              },
              '&::after': {
                bottom: -20,
                right: 0,
                backgroundImage: 'url(/images/quote-right.svg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              },
            }}
          >
            <Typography
              variant="h4"
              component="blockquote"
              sx={{
                fontStyle: 'italic',
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

      {/* Call to Action Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: 'linear-gradient(to right, #ffffff, #f7f9f9, #ffffff)',
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 2,
              backgroundColor: 'white',
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.25rem' }
              }}
            >
              Start Your Healthy Eating Journey Today
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
            >
              Whether you're looking for new recipes, nutrition facts, or want to learn more about
              healthy eating, Clean Crave has everything you need to support your wellness goals.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => handleNavigate('/recipes')}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 