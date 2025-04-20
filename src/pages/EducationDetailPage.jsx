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
  CardContent,
  useTheme,
  alpha,
  Avatar,
  Link
} from '@mui/material';
import { Icon } from '@iconify/react';
import ReactMarkdown from 'react-markdown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

  // Use state for markdown content and related articles
  const [articleContent, setArticleContent] = useState('');
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        
        // First fetch the index data
        const indexResponse = await fetch('https://astrarudra.github.io/data/index.json');
        if (!indexResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await indexResponse.json();
        
        // Try to find the article in different possible locations in the JSON
        let foundArticle = null;
        let articles = [];
        
        if (data.education) {
          articles = data.education;
          foundArticle = articles.find(article => article.id === educationId);
        } else if (data.articles) {
          articles = data.articles;
          foundArticle = articles.find(article => article.id === educationId);
        }
        
        // If we still don't have an article, log the data structure for debugging
        if (!foundArticle) {
          console.log('JSON data structure:', data);
          throw new Error('Article not found');
        }
        
        setArticle(foundArticle);
        
        // Now fetch the markdown content for this article
        try {
          const contentResponse = await fetch(`https://astrarudra.github.io/data/education/${educationId}.md`);
          if (!contentResponse.ok) {
            throw new Error('Content file not found');
          }
          const markdownContent = await contentResponse.text();
          setArticleContent(markdownContent);
        } catch (contentError) {
          console.error('Error fetching markdown content:', contentError);
          // Fallback content if MD file doesn't exist
          setArticleContent(`# ${foundArticle.title}\n\n${foundArticle.description}\n\n## Content Coming Soon`);
        }
        
        // Find related articles based on tags
        if (foundArticle.tags && foundArticle.tags.length > 0 && articles.length > 0) {
          const related = articles
            .filter(a => a.id !== educationId) // Exclude current article
            .filter(a => a.tags && a.tags.some(tag => foundArticle.tags.includes(tag)))
            .sort((a, b) => {
              // Count matching tags to sort by relevance
              const aMatches = a.tags.filter(tag => foundArticle.tags.includes(tag)).length;
              const bMatches = b.tags.filter(tag => foundArticle.tags.includes(tag)).length;
              return bMatches - aMatches;
            })
            .slice(0, 3); // Get top 3 related articles
          
          setRelatedArticles(related);
        }
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
            startIcon={<ArrowBackIcon />} 
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
    <Container maxWidth="md" sx={{ py: 3, mb: 6 }}>
      <Box>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/education')}
          sx={{ mb: 2 }}
        >
          Back to Learn
        </Button>
      </Box>

      {/* Article Header Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          mb: 4, 
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Decoration */}
        <Box 
          sx={{
            position: 'absolute',
            right: -50,
            top: -50,
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${theme.palette.primary.light}30, transparent 70%)`,
            borderRadius: '50%',
            zIndex: 0
          }}
        />

        {/* Article Image or Category Avatar */}
        <Box 
          sx={{ 
            width: '100%', 
            height: 220, 
            borderRadius: 2, 
            overflow: 'hidden',
            mb: 3,
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
            position: 'relative',
            background: categoryData.gradient,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'white',
              width: 120,
              height: 120,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }}
          >
            <Icon
              icon={categoryData.icon}
              style={{
                color: categoryData.color,
                width: 64,
                height: 64
              }}
            />
          </Avatar>
          
          {category && (
            <Chip
              label={category}
              size="small"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                bgcolor: 'rgba(255, 255, 255, 0.85)',
                color: categoryData.color,
                fontWeight: 500,
                border: `1px solid ${categoryData.color}`
              }}
            />
          )}
        </Box>
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 2,
              mt: 2
            }}
          >
            {title}
          </Typography>
          
          {/* Article Description */}
          {description && (
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                mb: 3,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 400
              }}
            >
              {description}
            </Typography>
          )}
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <Box sx={{ mb: 2 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    mr: 1,
                    mb: 1,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    '& .MuiChip-label': { fontWeight: 500 },
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Paper>

      {/* Article Content Grid */}
      <Grid container spacing={3}>
        {/* Article Content */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={2} 
            sx={{ 
              px: 4,
              pb: 4,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decoration */}
            <Box 
              sx={{
                position: 'absolute',
                right: -30,
                bottom: -30,
                width: 120,
                height: 120,
                background: `radial-gradient(circle, ${theme.palette.primary.light}20, transparent 70%)`,
                borderRadius: '50%',
                zIndex: 0
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {/* Render the markdown content */}
              <Box sx={{ 
                color: theme.palette.text.primary,
                fontSize: '1rem',
                lineHeight: 1.8,
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  mt: 4,
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                },
                '& h1': { fontSize: '1.8rem' },
                '& h2': { fontSize: '1.5rem' },
                '& h3': { fontSize: '1.3rem' },
                '& h4': { fontSize: '1.1rem' },
                '& p': { 
                  mb: 2,
                  fontSize: '1rem',
                  lineHeight: 1.8,
                },
                '& ul, & ol': {
                  pl: 3,
                  mb: 3,
                },
                '& li': {
                  mb: 1,
                },
                '& a': {
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
                '& blockquote': {
                  borderLeft: `4px solid ${theme.palette.divider}`,
                  pl: 2,
                  my: 2,
                  color: alpha(theme.palette.text.primary, 0.8),
                  fontStyle: 'italic',
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 1,
                  my: 2,
                },
                '& code': {
                  fontFamily: 'monospace',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  p: 0.5,
                  borderRadius: 0.5,
                  fontSize: '0.9rem',
                }
              }}>
                <ReactMarkdown>
                  {articleContent}
                </ReactMarkdown>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: '100px' }}>
            {/* Related Articles Card */}
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                mb: 3, 
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decoration */}
              <Box 
                sx={{
                  position: 'absolute',
                  left: -30,
                  top: -30,
                  width: 120,
                  height: 120,
                  background: `radial-gradient(circle, ${theme.palette.primary.light}10, transparent 70%)`,
                  borderRadius: '50%',
                  zIndex: 0
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    pb: 1,
                    borderBottom: `2px solid ${categoryData.color}`,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon 
                    icon="mdi:bookmark-multiple"
                    style={{
                      marginRight: 8,
                      color: categoryData.color
                    }}
                  />
                  Related Articles
                </Typography>
                
                <Box component="ul" sx={{ pl: 0, mt: 2, listStyleType: 'none' }}>
                  {relatedArticles.length > 0 ? (
                    relatedArticles.map((relatedArticle, index) => (
                      <Box 
                        component="li" 
                        key={relatedArticle.id}
                        sx={{
                          mb: 2,
                          pb: 2,
                          borderBottom: index < relatedArticles.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'
                        }}
                      >
                        <Link
                          component="button"
                          onClick={() => navigate(`/education/${relatedArticle.id}`)}
                          underline="none"
                          sx={{
                            fontWeight: 500,
                            color: 'inherit',
                            textAlign: 'left',
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
                              color: categoryData.color,
                              flexShrink: 0
                            }} 
                          />
                          {relatedArticle.title}
                        </Link>
                        {relatedArticle.tags && relatedArticle.tags.length > 0 && (
                          <Box sx={{ mt: 1, ml: 4 }}>
                            {relatedArticle.tags.slice(0, 2).map(tag => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                  mr: 0.5,
                                  mb: 0.5,
                                  fontSize: '0.7rem',
                                  height: 20,
                                  bgcolor: alpha(categoryData.color, 0.1),
                                  color: categoryData.color,
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      No related articles found.
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>

            {/* About Category Card */}
            <Paper 
              elevation={2} 
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
                This section provides articles about {category?.toLowerCase() || 'healthy eating'}, helping you understand key concepts and apply them to your health journey.
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
                Browse All {category || 'Articles'}
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EducationDetailPage; 