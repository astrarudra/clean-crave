import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Paper,
    Chip,
    Divider,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    useTheme,
    Avatar,
    LinearProgress,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Icon } from '@iconify/react';
import { alpha } from '@mui/material/styles';

/**
 * Page component for displaying the details of a single recipe.
 * Fetches recipe data based on the ID from the URL parameter.
 * Enhanced to display recipe data from JSON format.
 */
const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // Fetch recipe directly from the new JSON endpoint
        const response = await fetch(`https://astrarudra.github.io/data/recipe/${recipeId}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe: ${response.statusText}`);
        }
        
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  // Toggle step completion
  const toggleStepCompletion = (stepIndex) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  // Loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error || !recipe) {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center" sx={{ mt: 5 }}>
          {error || "Recipe not found."}
        </Typography>
        <Box textAlign="center" mt={2}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/recipes')}>
            Back to Recipes
          </Button>
        </Box>
      </Container>
    );
  }

  // Get diet type icon
  const getDietTypeIcon = (type) => {
    switch(type) {
      case 'vegetarian':
        return <Icon icon="mdi:food-apple" />;
      case 'vegan':
        return <Icon icon="mdi:leaf" />;
      case 'non-veg':
        return <Icon icon="mdi:food-steak" />;
      default:
        return <Icon icon="mdi:food" />;
    }
  };

  // Get diet type color
  const getDietTypeColor = (type) => {
    switch(type) {
      case 'vegetarian':
        return theme.palette.success.main;
      case 'vegan':
        return theme.palette.success.dark;
      case 'non-veg':
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  // Get meal type icon
  const getMealTypeIcon = (type) => {
    switch(type) {
      case 'breakfast':
        return <Icon icon="mdi:food-croissant" />;
      case 'lunch':
        return <Icon icon="mdi:food" />;
      case 'dinner':
        return <Icon icon="mdi:food-turkey" />;
      case 'snack':
        return <Icon icon="mdi:cookie" />;
      default:
        return <Icon icon="mdi:silverware-fork-knife" />;
    }
  };

  // Group ingredients by whether they are toppings or not
  const mainIngredients = recipe.ingredients.filter(ing => !ing.isTopping);
  const toppings = recipe.ingredients.filter(ing => ing.isTopping);

  // Calculate total cooking time
  const totalTime = (parseInt(recipe.prepTime) || 0) + (parseInt(recipe.cookTime) || 0);

  return (
    <Container maxWidth="md" sx={{ py: 3, mb: 6 }}>
      <Box>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/recipes')}
          sx={{ mb: 2 }}
        >
          Back to Recipes
        </Button>
      </Box>

      {/* Recipe Header Section */}
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

          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 2
            }}
          >
            {recipe.title}
          </Typography>
          
          {/* Recipe Description */}
          {recipe.description && (
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                mb: 3,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 400
              }}
            >
              {recipe.description}
            </Typography>
          )}

          {/* Diet Type Badge */}
          {recipe.dietType && (
            <Chip
              icon={getDietTypeIcon(recipe.dietType)}
              label={recipe.dietType.charAt(0).toUpperCase() + recipe.dietType.slice(1)}
              size="small"
              sx={{
                mb: 4,
                bgcolor: `${getDietTypeColor(recipe.dietType)}20`,
                color: getDietTypeColor(recipe.dietType),
                borderColor: getDietTypeColor(recipe.dietType),
                fontWeight: 500,
                border: '1px solid'
              }}
            />
          )}

        {/* Recipe Image */}
        <Box 
          sx={{ 
            width: '100%', 
            height: 600, 
            borderRadius: 2, 
            overflow: 'hidden',
            mb: 3,
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
            position: 'relative'
          }}
        >
          <img
            src={`https://astrarudra.github.io/data/images/${recipeId}.jpg`}
            alt={recipe.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          
          {/* Meta Info Grid: Time, Servings, Meal Type */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            {/* Cook Time */}
            <Box sx={{ flex: { xs: '0 0 calc(50% - 8px)', sm: '0 0 calc(33.333% - 11px)' } }}>
              <Card 
                elevation={0} 
                sx={{ 
                  height: '100%', 
                  bgcolor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Time
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {totalTime} min
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            
            {/* Servings */}
            <Box sx={{ flex: { xs: '0 0 calc(50% - 8px)', sm: '0 0 calc(33.333% - 11px)' } }}>
              <Card 
                elevation={0} 
                sx={{ 
                  height: '100%', 
                  bgcolor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalDiningIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Servings
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            
            {/* Meal Type */}
            {recipe.mealType && (
            <Box sx={{ flex: { xs: '0 0 100%', sm: '0 0 calc(33.333% - 11px)' } }}>
              <Card 
                elevation={0} 
                sx={{ 
                  height: '100%', 
                  bgcolor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getMealTypeIcon(recipe.mealType)}
                    <Box sx={{ ml: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Meal Type
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                        {recipe.mealType}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            )}
          </Box>
          
          {/* Nutritional Info Cards */}
          {recipe.nutrition && Object.keys(recipe.nutrition).length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2
                }}
              >
                <Icon 
                  icon="mdi:chart-box" 
                  style={{ 
                    marginRight: 8, 
                    color: theme.palette.primary.main,
                    width: 24,
                    height: 24
                  }} 
                />
                Nutrition (per serving)
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                {recipe.nutrition.calories !== undefined && (
                  <Card 
                    sx={{ 
                      bgcolor: `${theme.palette.error.main}10`, 
                      border: `1px solid ${theme.palette.error.light}`,
                      flex: 1,
                      minWidth: '100px'
                    }}
                    elevation={0}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Icon 
                          icon="mdi:fire" 
                          style={{ 
                            marginRight: 8, 
                            color: theme.palette.error.main,
                            width: 20,
                            height: 20
                          }} 
                        />
                        <Typography color="error.main" variant="body2" fontWeight={500}>
                          Calories
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={700} sx={{ ml: 0.5 }}>
                        {recipe.nutrition.calories} kcal
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                
                {recipe.nutrition.protein !== undefined && (
                  <Card 
                    sx={{ 
                      bgcolor: `${theme.palette.success.main}10`, 
                      border: `1px solid ${theme.palette.success.light}`,
                      flex: 1,
                      minWidth: '100px'
                    }}
                    elevation={0}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Icon 
                          icon="openmoji:meat-on-bone" 
                          style={{ 
                            marginRight: 8, 
                            color: theme.palette.success.main,
                            width: 20,
                            height: 20
                          }} 
                        />
                        <Typography color="success.main" variant="body2" fontWeight={500}>
                          Protein
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={700} sx={{ ml: 0.5 }}>
                        {recipe.nutrition.protein}g
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                
                {recipe.nutrition.carbs !== undefined && (
                  <Card 
                    sx={{ 
                      bgcolor: `${theme.palette.warning.main}10`, 
                      border: `1px solid ${theme.palette.warning.light}`,
                      flex: 1,
                      minWidth: '100px'
                    }}
                    elevation={0}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Icon 
                          icon="noto:bread" 
                          style={{ 
                            marginRight: 8, 
                            color: theme.palette.warning.main,
                            width: 20,
                            height: 20
                          }} 
                        />
                        <Typography color="warning.main" variant="body2" fontWeight={500}>
                          Carbs
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={700} sx={{ ml: 0.5 }}>
                        {recipe.nutrition.carbs}g
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                
                {recipe.nutrition.fat !== undefined && (
                  <Card 
                    sx={{ 
                      bgcolor: `${theme.palette.info.main}10`, 
                      border: `1px solid ${theme.palette.info.light}`,
                      flex: 1,
                      minWidth: '100px'
                    }}
                    elevation={0}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Icon 
                          icon="fluent-emoji:cheese-wedge" 
                          style={{ 
                            marginRight: 8, 
                            color: theme.palette.info.main,
                            width: 20,
                            height: 20
                          }} 
                        />
                        <Typography color="info.main" variant="body2" fontWeight={500}>
                          Fat
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={700} sx={{ ml: 0.5 }}>
                        {recipe.nutrition.fat}g
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Recipe Content Grid */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Ingredients Card */}
        <Box>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              mb: 3,
              position: 'relative',
              overflow: 'hidden',
              width: '100%'
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
                background: `radial-gradient(circle, ${theme.palette.primary.light}20, transparent 70%)`,
                borderRadius: '50%',
                zIndex: 0
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                <Icon 
                  icon="mdi:cart-outline" 
                  style={{ 
                    marginRight: 8, 
                    color: theme.palette.primary.main,
                    width: 24,
                    height: 24
                  }} 
                />
                Ingredients
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {/* Main Ingredients Column */}
                <Box sx={{ flex: { xs: '0 0 100%', md: '0 0 calc(50% - 8px)' } }}>
                  <List sx={{ width: '100%', bgcolor: 'background.paper', py: 0 }}>
                    {mainIngredients.map((ingredient, index) => (
                      <ListItem 
                        key={`${ingredient.name}-${index}`}
                        sx={{ 
                          px: 0, 
                          py: 0.7,
                          borderBottom: index < mainIngredients.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <FiberManualRecordIcon sx={{ fontSize: '0.6rem', color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1">
                              {ingredient.quantity && ingredient.quantity !== 0 ? `${ingredient.quantity} ` : ''}
                              {ingredient.unit && ingredient.unit !== 'to taste' ? `${ingredient.unit} ` : ''}
                              <strong>{ingredient.name}</strong>
                              {ingredient.preparation ? `, ${ingredient.preparation}` : ''}
                              {ingredient.notes ? ` (${ingredient.notes})` : ''}
                              {ingredient.optional ? ' (optional)' : ''}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                
                {/* Toppings Column */}
                {toppings && toppings.length > 0 && (
                  <Box sx={{ flex: { xs: '0 0 100%', md: '0 0 calc(50% - 8px)' } }}>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight={600} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 1
                      }}
                    >
                      <Icon 
                        icon="mdi:silverware-fork-knife" 
                        style={{ 
                          marginRight: 8, 
                          color: theme.palette.secondary.main,
                          width: 18,
                          height: 18
                        }} 
                      />
                      Toppings & Garnishes
                    </Typography>
                    
                    <List sx={{ width: '100%', bgcolor: 'background.paper', py: 0 }}>
                      {toppings.map((topping, index) => (
                        <ListItem 
                          key={`topping-${index}`}
                          sx={{ 
                            px: 0, 
                            py: 0.7,
                            borderBottom: index < toppings.length - 1 ? `1px dashed ${theme.palette.divider}` : 'none'
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <FiberManualRecordIcon sx={{ fontSize: '0.6rem', color: theme.palette.secondary.main }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body1">
                                {topping.quantity && topping.quantity !== 0 ? `${topping.quantity} ` : ''}
                                {topping.unit && topping.unit !== 'to taste' ? `${topping.unit} ` : ''}
                                <strong>{topping.name}</strong>
                                {topping.preparation ? `, ${topping.preparation}` : ''}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Instructions Card */}
        <Box>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              width: '100%'
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
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 600,
                  mb: 3
                }}
              >
                <Icon 
                  icon="mdi:clipboard-list-outline" 
                  style={{ 
                    marginRight: 8, 
                    color: theme.palette.primary.main,
                    width: 24,
                    height: 24
                  }} 
                />
                Instructions
              </Typography>
              
              {/* Progress Bar */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Progress
                  </Typography>
                  <Typography variant="body2" fontWeight={600} color="primary.main">
                    {Object.values(completedSteps).filter(Boolean).length} of {recipe.instructions.length} steps
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(Object.values(completedSteps).filter(Boolean).length / recipe.instructions.length) * 100}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      backgroundColor: theme.palette.success.main,
                      transition: 'transform 0.4s ease'
                    },
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }} 
                />
              </Box>
              
              {/* Instructions List */}
              <List sx={{ width: '100%', py: 0 }}>
                {recipe.instructions.map((instruction, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    onClick={() => toggleStepCompletion(index)}
                    sx={{
                      mb: 2,
                      p: 2,
                      cursor: 'pointer',
                      borderRadius: 1,
                      transition: 'all 0.2s ease',
                      border: `1px solid ${completedSteps[index] ? theme.palette.success.main : theme.palette.divider}`,
                      backgroundColor: completedSteps[index]
                        ? alpha(theme.palette.success.light, 0.15)
                        : alpha(theme.palette.primary.light, 0.05),
                      '&:hover': {
                        boxShadow: theme.shadows[2],
                        borderColor: completedSteps[index]
                          ? theme.palette.success.main
                          : theme.palette.primary.main
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          fontSize: '1rem',
                          fontWeight: 600,
                          mr: 2,
                          bgcolor: completedSteps[index]
                            ? theme.palette.success.main 
                            : theme.palette.primary.light
                        }}
                      >
                        {completedSteps[index] ? <CheckCircleIcon fontSize="small" /> : instruction.step}
                      </Avatar>
                      <Box>
                        <Typography 
                          variant="subtitle1" 
                          fontWeight={600}
                          sx={{ 
                            textDecoration: completedSteps[index] ? 'line-through' : 'none',
                            color: completedSteps[index] ? theme.palette.text.secondary : theme.palette.text.primary,
                            mb: 1
                          }}
                        >
                          Step {instruction.step}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color={completedSteps[index] ? 'text.disabled' : 'text.secondary'}
                          sx={{ textDecoration: completedSteps[index] ? 'line-through' : 'none' }}
                        >
                          {instruction.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </List>
              
              <Box sx={{ mt: 3, mb: 1, p: 2, bgcolor: `${theme.palette.success.main}10`, borderRadius: 1 }}>
                <Typography 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontWeight: 600,
                    color: theme.palette.success.dark
                  }}
                >
                  <CheckCircleIcon sx={{ mr: 1, color: theme.palette.success.main }} />
                  Click on each step to mark it as completed!
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      
      {/* Recipe Rating */}
      {recipe.rating && (
        <Paper 
          elevation={2} 
          sx={{ 
            mt: 3, 
            p: 3, 
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(58, 65, 111, 0.2)' : 'rgba(245, 247, 255, 1)',
            border: `1px solid ${theme.palette.primary.light}20`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexDirection: 'column' }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Recipe Rating
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {[...Array(10)].map((_, i) => (
                <Icon 
                  key={i}
                  icon={i < recipe.rating ? "mdi:star" : "mdi:star-outline"}
                  style={{ 
                    color: i < recipe.rating ? theme.palette.warning.main : theme.palette.action.disabled,
                    width: 28,
                    height: 28
                  }}
                />
              ))}
            </Box>
            <Typography variant="h5" fontWeight={700} color="primary.main">
              {recipe.rating}/10
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default RecipeDetailPage; 