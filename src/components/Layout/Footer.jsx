import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Grid, IconButton, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

/**
 * The main application footer.
 * Displays site navigation, social links, and copyright information.
 */
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 'auto', // Pushes footer to the bottom
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand section */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <RestaurantMenuIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Clean Crave
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Delicious, nutritious recipes for your healthy lifestyle. Discover foods that nourish your body and delight your taste buds.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" color="primary" aria-label="facebook">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="instagram">
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="twitter">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="pinterest">
                <PinterestIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Quick Links
            </Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={RouterLink} to="/recipes" color="text.secondary" underline="hover">
                All Recipes
              </MuiLink>
              <MuiLink component={RouterLink} to="/education" color="text.secondary" underline="hover">
                Learn
              </MuiLink>
            </Box>
          </Grid>

          {/* Recipes Categories */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Categories
            </Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={RouterLink} to="/recipes?tag=vegan" color="text.secondary" underline="hover">
                Vegan
              </MuiLink>
              <MuiLink component={RouterLink} to="/recipes?tag=keto" color="text.secondary" underline="hover">
                Keto
              </MuiLink>
              <MuiLink component={RouterLink} to="/recipes?tag=vegetarian" color="text.secondary" underline="hover">
                Vegetarian
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' Clean Crave. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 