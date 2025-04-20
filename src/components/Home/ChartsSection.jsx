import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const healthTrendsData = [
  { "year": 2000, "unhealthyEating": 65, "obesity": 30, "diabetes": 15, },
  { "year": 2005, "unhealthyEating": 68, "obesity": 35, "diabetes": 17, },
  { "year": 2010, "unhealthyEating": 72, "obesity": 42, "diabetes": 20, },
  { "year": 2015, "unhealthyEating": 75, "obesity": 45, "diabetes": 24, },
  { "year": 2020, "unhealthyEating": 78, "obesity": 47, "diabetes": 28, },
  { "year": 2023, "unhealthyEating": 83, "obesity": 50, "diabetes": 32, },
  { "year": 2025, "unhealthyEating": 92, "obesity": 65, "diabetes": 40, }
]

const healthBenefitsData = [
  { "name": "Heart Health", "value": 35 },
  { "name": "Immunity", "value": 25 },
  { "name": "Brain Fn", "value": 22 },
  { "name": "Gut Health", "value": 18 },
  { "name": "Bone Health", "value": 15 },
  { "name": "Mental Health", "value": 10 }
]

const diseaseImpactData = [
  { "name": "CVD", "unhealthy": 80, "healthy": 35 },
  { "name": "Diabetes", "unhealthy": 75, "healthy": 25 },
  { "name": "Cancer Risk", "unhealthy": 60, "healthy": 30 },
  { "name": "Inflammation", "unhealthy": 70, "healthy": 20 },
  { "name": "Stroke", "unhealthy": 65, "healthy": 25 },
  { "name": "Liver Disease", "unhealthy": 60, "healthy": 20 }
];

const habitsImpactData = [
  { name: 'Healthy Diet', impact: 85 },     // Nutrition is king – affects everything from body comp to hormones
  { name: 'Exercise', impact: 60 },         // Still huge, but less than diet if done in isolation
  { name: 'Sleep', impact: 70 },            // Underrated, crucial for recovery, metabolism, brain function
  { name: 'Stress Mng.', impact: 30 },           // Chronic stress ruins gains, digestion, hormones
  { name: 'Hydration', impact: 20 },        // Affects energy, skin, digestion – often overlooked
];

// Define consistent colors for all charts
const chartColors = {
  primary: '#6BC4A6',
  secondary: '#32936F',
  accent1: '#FF9800',
  accent2: '#F44336',
  accent3: '#2196F3',
  neutral: '#757575'
};

/**
 * A section showing health-related charts for the homepage
 */
const ChartsSection = () => {
  const theme = useTheme();
  
  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 10, paddingTop: 1 }}>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{ 
          mb: 1, 
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 700,
        }}
      >
        Science of Healthy Eating
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
        Explore data-driven insights on the relationships between nutrition, health outcomes, and disease prevention.
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        margin: -1.5, // Negative margin to offset the padding of chart containers
      }}>
        {/* Health Trends Chart */}
        <Box sx={{ 
          width: { xs: '100%', md: '50%' },
          p: 1.5,
          boxSizing: 'border-box',
        }}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 2, md: 3 }, 
              height: '100%',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 1 }}>
              Health Trends Over Time
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Tracking the 20-year rise in obesity and diabetes rates alongside unhealthy eating patterns, showing the strong correlation between these factors.
            </Typography>
            <Box sx={{ height: 300, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={healthTrendsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis 
                    dataKey="year" 
                    tick={{ fill: theme.palette.text.secondary }}
                    tickLine={{ stroke: theme.palette.divider }}
                    axisLine={{ stroke: theme.palette.divider }}
                  />
                  <YAxis 
                    tick={{ fill: theme.palette.text.secondary }}
                    tickLine={{ stroke: theme.palette.divider }}
                    axisLine={{ stroke: theme.palette.divider }}
                    unit="%" 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                      borderRadius: 8,
                      boxShadow: theme.shadows[3]
                    }}
                    cursor={{ strokeDasharray: '3 3' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="unhealthyEating" 
                    name="Unhealthy Eating" 
                    stroke={chartColors.accent2} 
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                    animationDuration={1500}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="obesity" 
                    name="Obesity Rates" 
                    stroke={chartColors.accent1} 
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diabetes" 
                    name="Diabetes Rates" 
                    stroke={chartColors.accent3} 
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                    animationDuration={1500}
                    animationBegin={600}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>

        {/* Health Benefits Chart */}
        <Box sx={{ 
          width: { xs: '100%', md: '50%' },
          p: 1.5,
          boxSizing: 'border-box',
        }}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 2, md: 3 }, 
              height: '100%',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 1 }}>
              Health Benefits of Clean Eating
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              How different systems in your body benefit from a clean diet, showing the relative impact on various health markers.
            </Typography>
            <Box sx={{ height: 300, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthBenefitsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    <Cell fill={chartColors.primary} />
                    <Cell fill={chartColors.secondary} />
                    <Cell fill={chartColors.accent1} />
                    <Cell fill={chartColors.accent3} />
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Impact']}
                    contentStyle={{ 
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                      borderRadius: 8,
                      boxShadow: theme.shadows[3]
                    }}
                    animationDuration={300}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>

        {/* Disease Impact Chart */}
        <Box sx={{ 
          width: { xs: '100%', md: '50%' },
          p: 1.5,
          boxSizing: 'border-box',
        }}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 2, md: 3 }, 
              height: '100%',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 1 }}>
              Impact on Disease Risk
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Comparing disease risk between healthy and unhealthy diets, showing the significant risk reduction with better food choices.
            </Typography>
            <Box sx={{ height: 300, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={diseaseImpactData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis 
                    type="number" 
                    domain={[0, 100]} 
                    unit="%"
                    tick={{ fill: theme.palette.text.secondary }}
                    tickLine={{ stroke: theme.palette.divider }}
                    axisLine={{ stroke: theme.palette.divider }}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category"
                    tick={{ fill: theme.palette.text.secondary }}
                    tickLine={false}
                    axisLine={{ stroke: theme.palette.divider }}
                    width={100}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Risk Level']}
                    contentStyle={{ 
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                      borderRadius: 8,
                      boxShadow: theme.shadows[3]
                    }}
                    cursor={{ fill: alpha(theme.palette.action.hover, 0.1) }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="unhealthy" 
                    name="Unhealthy Diet" 
                    fill={chartColors.accent2}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {diseaseImpactData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={chartColors.accent2} 
                        fillOpacity={0.9}
                      />
                    ))}
                  </Bar>
                  <Bar 
                    dataKey="healthy" 
                    name="Healthy Diet" 
                    fill={chartColors.primary}
                    animationBegin={300}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {diseaseImpactData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={chartColors.primary} 
                        fillOpacity={0.9}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>

        {/* Habits Impact Chart - Using Radar Chart */}
        <Box sx={{ 
          width: { xs: '100%', md: '50%' },
          p: 1.5,
          boxSizing: 'border-box',
        }}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 2, md: 3 }, 
              height: '100%',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 1 }}>
              Healthy Habits Impact
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Ranking of lifestyle factors that most influence overall health, showing that nutrition is a foundational element for wellbeing.
            </Typography>
            <Box sx={{ height: 300, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} width={730} height={250} data={habitsImpactData}>
                  <PolarGrid stroke={theme.palette.divider} />
                  <PolarAngleAxis 
                    dataKey="name" 
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]}
                    tick={false}
                    tickCount={5} 
                    axisLine={false}
                  />
                  <Radar 
                    name="Health Impact" 
                    dataKey="impact" 
                    stroke={chartColors.primary} 
                    fill={chartColors.primary} 
                    fillOpacity={0.6}
                    animationDuration={1500}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Health Impact']}
                    contentStyle={{ 
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                      borderRadius: 8,
                      boxShadow: theme.shadows[3]
                    }}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ChartsSection; 