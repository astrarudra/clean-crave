import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Link as MuiLink, 
  Box, 
  IconButton, 
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Avatar,
  Divider,
  useScrollTrigger
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Icon } from '@iconify/react';

/**
 * The main application header/navigation bar with enhanced styling.
 * Displays the site title and navigation links.
 */
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { text: 'Home', path: '/', icon: <Icon icon="mdi:home" style={{ fontSize: '1.25rem' }} /> },
    { text: 'Recipes', path: '/recipes', icon: <LocalDiningIcon fontSize="small" /> },
    { text: 'Food Database', path: '/food-database', icon: <Icon icon="mdi:food-apple" style={{ fontSize: '1.25rem' }} /> },
    { text: 'Learn', path: '/education', icon: <MenuBookIcon fontSize="small" /> },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return path !== '/' && location.pathname.startsWith(path);
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        px: 3, 
        py: 2,
        backgroundColor: 'primary.main',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ 
            bgcolor: 'white', 
            color: 'primary.main',
            width: 35,
            height: 35,
            mr: 1.5,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <RestaurantMenuIcon fontSize="small" />
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Clean Crave
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ py: 1, flexGrow: 1 }}>
        {navLinks.map((item) => (
          <ListItem 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: isActive(item.path) ? 'primary.main' : 'text.primary',
              textDecoration: 'none',
              py: 1.5,
              pl: 3,
              '&:hover': {
                backgroundColor: 'background.light'
              },
              backgroundColor: isActive(item.path) ? 'action.selected' : 'transparent',
              borderRight: isActive(item.path) ? '4px solid' : 'none',
              borderColor: 'primary.main',
              borderRadius: 0
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                mr: 2, 
                color: isActive(item.path) ? 'primary.main' : 'text.secondary' 
              }}>
                {item.icon}
              </Box>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: isActive(item.path) ? 600 : 500,
                  fontSize: '1rem'
                }} 
              />
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 3, bgcolor: 'background.light' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Healthy eating made delicious and easy
        </Typography>
      </Box>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={trigger ? 3 : 0}
      sx={{ 
        background: trigger 
          ? 'linear-gradient(to right, #009688, #00A896)' 
          : '#ffffff',
        color: trigger ? 'white' : 'text.primary',
        transition: 'all 0.2s ease-in-out',
        borderRadius: 0
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1.2 }}>
          {/* Logo/Brand */}
          <MuiLink 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: 'inherit', 
              textDecoration: 'none',
              '&:hover': {
                opacity: 0.9
              }
            }}
          >
            {trigger ? (
              <RestaurantMenuIcon sx={{ mr: 1.5, fontSize: 28 }} />
            ) : (
              <Avatar sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                width: 35,
                height: 35,
                mr: 1.5,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}>
                <RestaurantMenuIcon fontSize="small" />
              </Avatar>
            )}
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '0.01em'
              }}
            >
              Clean Crave
            </Typography>
          </MuiLink>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5 }}>
            {navLinks.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
                color={trigger ? 'inherit' : (isActive(item.path) ? 'primary' : 'inherit')}
                variant="text"
                sx={{ 
                  fontWeight: isActive(item.path) ? 600 : 500,
                  fontSize: '0.95rem',
                  position: 'relative',
                  px: 2,
                  py: 1,
                  borderRadius: 0,
                  mx: 0.5,
                  ...(isActive(item.path) 
                    ? {
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          width: '30%',
                          height: 3,
                          transform: 'translateX(-50%)',
                          backgroundColor: trigger ? 'white' : 'primary.main',
                          borderRadius: 0
                        }
                      } 
                    : {}),
                  ...(!trigger
                    ? {
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.04)'
                        }
                      }
                    : {
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.2)'
                        }
                      })
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton 
            color="inherit" 
            edge="end" 
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: '280px', boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header; 