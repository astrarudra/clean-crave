import React from 'react';
import { 
  Container, 
  Typography, 
  Box
} from '@mui/material';

/**
 * Hero section component for the Recipe List page
 * Displays a title and description on the left and an image on the right
 */
const HeroSection = () => {
  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #009688 0%, #00796b 100%)',
        color: 'white',
        py: 5,
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '4px solid',
        borderColor: 'primary.light',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      {/* Decorative patterns */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.07,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.8) 0%, transparent 20%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.8) 0%, transparent 20%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.5) 0%, transparent 40%)
          `,
        }}
      />
      
      {/* Floating circles decoration */}
      <Box 
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)',
          zIndex: 0
        }}
      />
      
      <Box 
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)',
          zIndex: 0
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            minHeight: '300px',
            flexDirection: { xs: 'column', md: 'row' }
          }}
        >
          {/* Left side - Text content */}
          <Box sx={{ flex: 1, mb: { xs: 4, md: 0 } }}>
            <Typography 
              variant="h1" 
              sx={{ 
                color: 'white', 
                fontWeight: 800,
                mb: 2,
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                lineHeight: 1.1
              }}
            >
              Healthy & Delicious Recipes
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 400,
                mb: 4,
                opacity: 0.9,
                maxWidth: '90%',
                lineHeight: 1.6
              }}
            >
              Discover nutritious meals that taste amazing and support your wellness journey.
            </Typography>
          </Box>

          {/* Right side - Image */}
          <Box 
            component="img"
            src="https://astrarudra.github.io/data/images/clean-crave-banner.png"
            alt="Healthy meal"
            sx={{ 
              width: '250px',
              maxWidth: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection; 