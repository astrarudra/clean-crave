import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Divider, 
  Button, 
  CircularProgress, 
  Chip,
  Grid,
  Card,
  useTheme,
  alpha,
  Avatar
} from '@mui/material';
import { Icon } from '@iconify/react';

/**
 * Page component for displaying the details of a single educational article.
 * Fetches article data based on the ID from the URL parameter.
 */
const EducationDetailPage = () => {
  const { educationId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  // Category configuration with icons and colors - same as in EducationListPage
  const categoryConfig = {
    'Healthy Eating Basics': {
      icon: 'mdi:silverware-fork-knife',
      color: '#4CAF50',
      gradient: 'linear-gradient(45deg, #4CAF50, #81C784)'
    },
    'Meal Planning': {
      icon: 'mdi:calendar-check',
      color: '#FF9800',
      gradient: 'linear-gradient(45deg, #FF9800, #FFB74D)'
    },
    'Diet Education': {
      icon: 'mdi:food-apple',
      color: '#F44336',
      gradient: 'linear-gradient(45deg, #F44336, #E57373)'
    },
    'Nutrition Fundamentals': {
      icon: 'mdi:flask',
      color: '#2196F3',
      gradient: 'linear-gradient(45deg, #2196F3, #64B5F6)'
    },
    'Wellness': {
      icon: 'mdi:meditation',
      color: '#9C27B0',
      gradient: 'linear-gradient(45deg, #9C27B0, #CE93D8)'
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://astrarudra.github.io/data/index.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // Try to find the article in different possible locations in the JSON
        let foundArticle = null;
        
        if (data.education) {
          console.log('Found education data:', data.education);
          foundArticle = data.education.find(article => article.id === educationId);
        } else if (data.articles) {
          foundArticle = data.articles.find(article => article.id === educationId);
        }
        
        // If we still don't have an article, log the data structure for debugging
        if (!foundArticle) {
          console.log('JSON data structure:', data);
          throw new Error('Article not found');
        }
        
        setArticle(foundArticle);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [educationId]);

  // Handle loading state
  if (isLoading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="70vh"
      >
        <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
        <Typography variant="h6" color="text.secondary">
          Loading article...
        </Typography>
      </Box>
    );
  }

  // Handle error state
  if (error || !article) {
    return (
      <Container maxWidth="md">
        <Box my={4} textAlign="center">
          <Icon 
            icon="mdi:file-alert" 
            style={{ 
              width: 64, 
              height: 64, 
              marginBottom: 16,
              color: theme.palette.error.main 
            }} 
          />
          <Typography variant="h5" color="error" gutterBottom>
            {error || 'Article not found'}
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Icon icon="mdi:arrow-left" />} 
            onClick={() => navigate('/education')}
            sx={{ mt: 2 }}
          >
            Back to Learn
          </Button>
        </Box>
      </Container>
    );
  }

  const { title, category, description, tags } = article;
  const categoryData = categoryConfig[category] || {
    icon: 'mdi:book-open-variant',
    color: theme.palette.primary.main,
    gradient: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
  };

  return (
    <Box>
      {/* Hero Section with Gradient Background */}
      <Box
        sx={{
          background: categoryData.gradient,
          py: { xs: 6, md: 8 },
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
            width: '15%',
            height: '15%',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '5%',
            left: '8%',
            width: '20%',
            height: '20%',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
          }}
        />

        <Container maxWidth="md">
          <Box mb={2} display="flex" alignItems="center">
            <Button
              variant="outlined"
              startIcon={<Icon icon="mdi:arrow-left" />}
              onClick={() => navigate('/education')}
              sx={{
                color: 'white',
                borderColor: 'white',
                mb: 3,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white',
                },
              }}
            >
              Back to Learn
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: 'white',
                width: { xs: 48, md: 64 },
                height: { xs: 48, md: 64 },
                mr: 2,
              }}
            >
              <Icon
                icon={categoryData.icon}
                style={{
                  color: categoryData.color,
                  width: { xs: 28, md: 36 },
                  height: { xs: 28, md: 36 },
                }}
              />
            </Avatar>
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: 'white',
                  opacity: 0.9,
                  letterSpacing: 1,
                  fontWeight: 500,
                }}
              >
                {category}
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                {title}
              </Typography>
            </Box>
          </Box>

          {tags && tags.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    mr: 1,
                    mb: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '& .MuiChip-label': { fontWeight: 500 },
                  }}
                />
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card 
              elevation={0} 
              sx={{ 
                p: { xs: 2, sm: 3, md: 4 },
                mb: 4,
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              {/* Article Lead Paragraph */}
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 500,
                  color: alpha(theme.palette.text.primary, 0.9),
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}
              >
                {description}
              </Typography>

              <Divider sx={{ mb: 4 }} />

              {/* Article Content - In a real app, this would parse and display the actual content */}
              <Typography 
                variant="body1"
                sx={{ 
                  color: theme.palette.text.primary,
                  '& p': { mb: 2 },
                  fontSize: '1rem',
                  lineHeight: 1.8
                }}
              >
                <p>This is where the full article content would be displayed. In a real application, this would fetch and render the complete article content.</p>
                
                <p>The content could be structured with headers, paragraphs, lists, images, and other rich media elements. For demonstration purposes, we're showing placeholder content.</p>
                
                <Typography variant="h5" sx={{ my: 3, fontWeight: 600 }}>Section Heading</Typography>
                
                <p>Each section of the article would be well-formatted with appropriate headings, paragraphs, and visual elements to ensure readability and engagement.</p>
                
                <p>The content would provide detailed information on the topic, with evidence-based insights and practical advice that readers can apply to their daily lives.</p>
                
                <Typography variant="h5" sx={{ my: 3, fontWeight: 600 }}>Key Takeaways</Typography>
                
                <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                  <li style={{ marginBottom: '10px' }}>Important point about {category.toLowerCase()}</li>
                  <li style={{ marginBottom: '10px' }}>Practical advice that readers can implement</li>
                  <li style={{ marginBottom: '10px' }}>Scientific evidence supporting the recommendations</li>
                  <li style={{ marginBottom: '10px' }}>Resources for further learning on this topic</li>
                </ul>
                
                <p>To implement this fully, you would need to store the complete article text in your data source and create a component to render it properly.</p>
              </Typography>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: '100px' }}>
              {/* Related Articles Card */}
              <Card 
                elevation={0} 
                sx={{ 
                  p: 3,
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    pb: 1,
                    borderBottom: `2px solid ${categoryData.color}`
                  }}
                >
                  Related Topics
                </Typography>
                
                <Box component="ul" sx={{ pl: 0, mt: 2, listStyleType: 'none' }}>
                  {[1, 2, 3].map((i) => (
                    <Box 
                      component="li" 
                      key={i}
                      sx={{
                        mb: 2,
                        pb: 2,
                        borderBottom: i < 3 ? `1px solid ${theme.palette.divider}` : 'none'
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          '&:hover': { color: categoryData.color },
                        }}
                      >
                        <Icon 
                          icon="mdi:chevron-right" 
                          style={{ 
                            marginRight: 8, 
                            marginTop: 4,
                            color: categoryData.color 
                          }} 
                        />
                        Example related article title {i} about {category.toLowerCase()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Card>

              {/* About Category Card */}
              <Card 
                elevation={0} 
                sx={{ 
                  p: 3,
                  mb: 3,
                  borderRadius: 2,
                  background: alpha(categoryData.color, 0.05),
                  border: `1px solid ${alpha(categoryData.color, 0.2)}`
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: categoryData.color,
                      mr: 2
                    }}
                  >
                    <Icon 
                      icon={categoryData.icon} 
                      style={{ 
                        color: 'white', 
                        width: 20, 
                        height: 20 
                      }} 
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    About {category}
                  </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  This section provides articles about {category.toLowerCase()}, helping you understand key concepts and apply them to your health journey.
                </Typography>
                
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ 
                    mt: 2, 
                    color: categoryData.color,
                    borderColor: categoryData.color,
                    '&:hover': {
                      borderColor: categoryData.color,
                      backgroundColor: alpha(categoryData.color, 0.1),
                    }
                  }}
                  onClick={() => navigate('/education')}
                >
                  Browse All {category} Articles
                </Button>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EducationDetailPage; 