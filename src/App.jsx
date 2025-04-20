import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Container } from '@mui/material';
import { Controller, useAppStore } from './store';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CallToAction from './components/Common/CallToAction';
import HomePage from './pages/HomePage';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import EducationListPage from './pages/EducationListPage';
import EducationDetailPage from './pages/EducationDetailPage';
import FoodDatabasePage from './pages/FoodDatabasePage';
import ScrollToTop from './components/Utils/ScrollToTop';

// Placeholder Pages
// const HomePage = () => <Container><Typography variant="h1">Home Page</Typography></Container>;
// const RecipeDetailPage = () => <Container><Typography variant="h1">Recipe Detail Page</Typography></Container>;
// const EducationPage = () => <Container><Typography variant="h1">Education Page</Typography></Container>;
// const EducationDetailPage = () => <Container><Typography variant="h1">Education Detail Page</Typography></Container>;

function App() {
  const isLoading = useAppStore((state) => state.isLoading);
  const error = useAppStore((state) => state.error);

  // Trigger initial data load on mount
  useEffect(() => {
    Controller.init();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />
      
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {isLoading ? (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center', 
              flexGrow: 1, 
              py: 8 
            }}
          >
            <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
            <Typography variant="h6" color="text.secondary">
              Loading delicious recipes...
            </Typography>
          </Box>
        ) : error ? (
          <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h5" color="error" gutterBottom>
              Something went wrong
            </Typography>
            <Typography color="text.secondary">
              Error loading application: {error}
            </Typography>
          </Container>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipeListPage />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />
            <Route path="/education" element={<EducationListPage />} />
            <Route path="/education/:educationId" element={<EducationDetailPage />} />
            <Route path="/food-database" element={<FoodDatabasePage />} />
            <Route 
              path="*" 
              element={
                <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom>
                    404 - Page Not Found
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 4 }}>
                    The page you're looking for doesn't exist or has been moved.
                  </Typography>
                  <Box>
                    <img 
                      src="/images/placeholder-recipe.jpg" 
                      alt="Not found" 
                      style={{ maxWidth: '100%', maxHeight: '300px', opacity: 0.7 }}
                    />
                  </Box>
                </Container>
              } 
            />
          </Routes>
        )}
      </Box>
      
      <CallToAction />
      <Footer />
    </Box>
  );
}

export default App; 