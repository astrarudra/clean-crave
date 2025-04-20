import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  TextField,
  InputAdornment
} from '@mui/material';
import { Icon } from '@iconify/react';

/**
 * A reusable call-to-action component that appears on multiple pages
 * to encourage users to subscribe or take action.
 */
const CallToAction = () => {
  return (
    <Box 
      sx={{
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(135deg, #6BC4A6 0%, #32936F 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '20%',
          height: '20%',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: '8%',
          width: '15%',
          height: '15%',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
        }}
      />
      
      <Container maxWidth="md">
        <Box 
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Typography 
            variant="h2" 
            component="h2"
            color="white"
            sx={{ 
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Start Your Healthy Eating Journey Today
          </Typography>
          
          <Typography 
            variant="h6" 
            color="white" 
            sx={{ 
              opacity: 0.9,
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Get daily tips, recipes, and motivation delivered straight to your inbox.
            We're committed to helping you achieve your health goals.
          </Typography>
          
          <Paper
            elevation={4}
            sx={{
              p: { xs: 1, sm: 2 },
              maxWidth: '550px',
              mx: 'auto',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              borderRadius: 2,
            }}
          >
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  backgroundColor: 'white',
                  '& fieldset': { border: 'none' },
                },
                mb: { xs: 2, sm: 0 },
                mr: { xs: 0, sm: 2 }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="mdi:email-outline" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              disableElevation
              sx={{
                py: 1.5,
                px: 3,
                whiteSpace: 'nowrap',
                fontWeight: 600,
                minWidth: { xs: '100%', sm: 'auto' }
              }}
            >
              Subscribe
            </Button>
          </Paper>
          
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block', 
              mt: 2, 
              color: 'white',
              opacity: 0.7
            }}
          >
            We respect your privacy. Unsubscribe at any time.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CallToAction; 