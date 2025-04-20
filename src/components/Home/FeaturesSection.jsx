import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { Icon } from '@iconify/react';

/**
 * FeaturesSection component that displays the main features of the app
 * Uses flex layout with responsive behavior
 */
const FeaturesSection = ({ sections, onNavigate }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
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

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 3,
        mx: -1.5,
      }}>
        {sections.map((section) => (
          <Box 
            key={section.id}
            sx={{
              width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.333% - 24px)' },
              minWidth: { sm: '280px' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Card
              onClick={() => onNavigate(section.path)}
              className="feature-card"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.shadows[8],
                  '& .card-image': {
                    transform: 'scale(1.08)',
                  }
                },
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.8s forwards',
                animationDelay: `${0.1 * section.id.replace(/\D/g, '')}s`,
              }}
            >
              <Box sx={{ 
                position: 'relative',
                height: 350,
                background: section.id === 'recipes' 
                  ? 'linear-gradient(135deg, #e0f7fa 0%, #6BC4A6 100%)'
                  : section.id === 'food-database'
                  ? 'linear-gradient(135deg, #e8f5e9 0%, #81C784 100%)'
                  : 'linear-gradient(135deg, #fff3e0 0%, #FFCC80 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}>
                <Box 
                  sx={{
                    backgroundImage: section.id === 'recipes' 
                      ? 'radial-gradient(circle, rgba(0,188,212,0.1) 0%, rgba(3,169,244,0.05) 70%)' 
                      : section.id === 'food-database'
                      ? 'radial-gradient(circle, rgba(76,175,80,0.1) 0%, rgba(129,199,132,0.05) 70%)'
                      : 'radial-gradient(circle, rgba(255,152,0,0.1) 0%, rgba(255,183,77,0.05) 70%)',
                    position: 'absolute',
                    width: '120%',
                    height: '120%',
                    top: '-10%',
                    left: '-10%',
                    zIndex: 0
                  }}
                />
                <Box 
                  sx={{
                    position: 'absolute',
                    width: '40%',
                    height: '40%',
                    top: '5%',
                    left: '5%',
                    background: section.id === 'recipes' 
                      ? 'radial-gradient(circle, rgba(107,196,166,0.15) 0%, transparent 70%)' 
                      : section.id === 'food-database'
                      ? 'radial-gradient(circle, rgba(76,175,80,0.15) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(255,152,0,0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: 0
                  }}
                />
                <Box 
                  sx={{
                    position: 'absolute',
                    width: '30%',
                    height: '30%',
                    bottom: '10%',
                    right: '10%',
                    background: section.id === 'recipes' 
                      ? 'radial-gradient(circle, rgba(107,196,166,0.1) 0%, transparent 70%)' 
                      : section.id === 'food-database'
                      ? 'radial-gradient(circle, rgba(76,175,80,0.1) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(255,152,0,0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: 0
                  }}
                />
                <CardMedia
                  component="img"
                  className="card-image"
                  height="500"
                  image={section.image}
                  alt={section.title}
                  sx={{ 
                    width: '100%', 
                    objectFit: 'contain',
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                    transition: 'transform 0.5s ease'
                  }}
                />
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
              <CardActions sx={{ px: 3, pb: 3, mt: 'auto' }}>
                <Button
                  size="large"
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
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default FeaturesSection; 