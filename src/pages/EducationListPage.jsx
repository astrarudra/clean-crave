import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Paper, 
  Divider, 
  CircularProgress,
  Button,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActionArea,
  alpha,
  Chip,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

/**
 * Page component for displaying the list of educational articles.
 */
const EducationListPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // Category configuration with icons and colors
  const categoryConfig = {
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
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://astrarudra.github.io/data/index.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // The JSON has educational articles in the "education" array
        if (data.education) {
          console.log('Found education data:', data.education);
          setArticles(data.education);
        } else if (data.articles) {
          setArticles(data.articles);
        } else {
          console.log('JSON data structure:', data);
          // For debugging: log the data structure to see available keys
          throw new Error('Education content not found in expected format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Get all categories
  const categories = ['all', ...Object.keys(categoryConfig)];
  
  // Update filtered articles based on category and search term
  useEffect(() => {
    let result = articles;
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(article => article.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(lowerCaseSearchTerm) || 
        (article.description && article.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm)))
      );
    }
    
    setFilteredArticles(result);
  }, [articles, activeCategory, searchTerm]);
  
  // For debugging: log articles array and check for mismatch in categories
  useEffect(() => {
    if (articles.length > 0) {
      console.log('Fetched articles:', articles);
      
      // Check if categories match
      const articleCategories = [...new Set(articles.map(a => a.category))];
      console.log('Categories in articles:', articleCategories);
      console.log('Categories in config:', Object.keys(categoryConfig));
      
      // Check if any article categories are not in our config
      const missingCategories = articleCategories.filter(cat => !Object.keys(categoryConfig).includes(cat));
      if (missingCategories.length > 0) {
        console.warn('Categories in data but not in config:', missingCategories);
      }
    }
  }, [articles]);
  
  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleArticleClick = (articleId) => {
    navigate(`/education/${articleId}`);
  };

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
          Loading educational content...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          Something went wrong
        </Typography>
        <Typography color="text.secondary">
          Error loading educational content: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Hero Section - Removed right side image */}
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
        
        <Box sx={{ 
          position: 'relative', 
          zIndex: 1,
          width: '100%' // Changed from partial width to full width
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Icon 
              icon="mdi:book-open-page-variant" 
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
              Learn & Educate
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
            Discover expert articles and resources to enhance your nutrition knowledge and support your health journey.
          </Typography>
          
          {/* Search bar */}
          <TextField
            fullWidth
            placeholder="Search for articles by title, description, or tags..."
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

          {/* Stats Cards */}
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
                    icon="mdi:file-document-multiple" 
                    style={{ width: 24, height: 24, color: theme.palette.primary.main, marginRight: 8 }} 
                  />
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {articles.length}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total Articles
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Icon 
                    icon="mdi:tag-multiple" 
                    style={{ width: 24, height: 24, color: theme.palette.secondary.main, marginRight: 8 }} 
                  />
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {categories.length - 1}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Categories
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Icon 
                    icon="mdi:filter-variant" 
                    style={{ width: 24, height: 24, color: theme.palette.warning.main, marginRight: 8 }} 
                  />
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {filteredArticles.length}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Filtered Results
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Paper>

      {/* Category Tabs */}
      <Paper 
        sx={{ 
          mb: 4, 
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: theme.shadows[2] 
        }}
      >
        <Tabs
          value={activeCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
            },
            '& .MuiTab-root': {
              minHeight: 48,
              textTransform: 'none',
              fontSize: '0.9rem',
              fontWeight: 500
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon icon="mdi:file-document-multiple" style={{ marginRight: 8, width: 20, height: 20 }} />
                All Articles
              </Box>
            } 
            value="all" 
          />
          {Object.keys(categoryConfig).map((category) => (
            <Tab 
              key={category} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon 
                    icon={categoryConfig[category].icon} 
                    style={{ 
                      marginRight: 8, 
                      width: 20, 
                      height: 20,
                      color: categoryConfig[category].color
                    }} 
                  />
                  {category}
                </Box>
              } 
              value={category} 
            />
          ))}
        </Tabs>
      </Paper>

      {/* Article Grid - Changed to Flex layout with 2 cards per row */}
      {filteredArticles.length > 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          margin: -1.5 // Negative margin to offset the padding of cards
        }}>
          {filteredArticles.map((article) => (
            <Box 
              key={article.id}
              sx={{ 
                width: { xs: '100%', md: '50%' }, 
                p: 1.5,
                boxSizing: 'border-box'
              }}
            >
              <Card 
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[8],
                  },
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <CardActionArea onClick={() => handleArticleClick(article.id)} sx={{ flexGrow: 1, height: '100%' }}>
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Category Icon/Avatar added before title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      {article.category && categoryConfig[article.category] && (
                        <Avatar 
                          sx={{ 
                            mr: 2, 
                            bgcolor: alpha(categoryConfig[article.category].color, 0.15),
                            color: categoryConfig[article.category].color,
                            width: 44,
                            height: 44,
                            borderRadius: '12px',
                            boxShadow: `0 2px 8px ${alpha(categoryConfig[article.category].color, 0.25)}`
                          }}
                        >
                          <Icon 
                            icon={categoryConfig[article.category].icon} 
                            width={22} 
                            height={22} 
                          />
                        </Avatar>
                      )}
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600,
                          mb: 0,
                          flex: 1,
                          lineHeight: 1.3
                        }}
                      >
                        {article.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        mb: 3,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.6
                      }}
                    >
                      {article.description}
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      mt: 'auto',
                      pt: 2,
                      borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`
                    }}>
                      {/* Tags moved to bottom left */}
                      <Box>
                        {article.tags && article.tags.slice(0, 2).map(tag => (
                          <Chip 
                            key={tag} 
                            label={tag} 
                            size="small" 
                            sx={{ 
                              mr: 0.5,
                              backgroundColor: alpha(
                                article.category && categoryConfig[article.category] 
                                  ? categoryConfig[article.category].color 
                                  : theme.palette.primary.main, 
                                0.1
                              ),
                              color: article.category && categoryConfig[article.category] 
                                ? categoryConfig[article.category].color 
                                : theme.palette.primary.dark,
                              fontWeight: 500,
                              '& .MuiChip-label': { px: 1 }
                            }} 
                          />
                        ))}
                      </Box>
                      
                      {/* Read Article button on right */}
                      <Button 
                        endIcon={<Icon icon="mdi:arrow-right" />}
                        sx={{
                          color: article.category && categoryConfig[article.category] 
                            ? categoryConfig[article.category].color 
                            : theme.palette.primary.main,
                          fontWeight: 600,
                          p: 0,
                          '&:hover': { 
                            background: 'transparent',
                            opacity: 0.9
                          }
                        }}
                      >
                        Read Article
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.7),
            border: `1px dashed ${theme.palette.divider}`
          }}
        >
          <Icon 
            icon="mdi:file-document-outline" 
            style={{ 
              width: 64, 
              height: 64, 
              marginBottom: 16,
              color: theme.palette.text.disabled 
            }} 
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No articles found
          </Typography>
          <Typography color="text.secondary" paragraph>
            Try adjusting your search or filter criteria
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default EducationListPage; 