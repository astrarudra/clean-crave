import { createTheme } from '@mui/material/styles';
import { teal, grey } from '@mui/material/colors';

// Define a theme with a focus on health and clean aesthetics
const theme = createTheme({
  palette: {
    primary: {
      light: teal[300],
      main: '#009688', // Custom teal shade
      dark: teal[700],
      contrastText: '#fff'
    },
    secondary: {
      light: '#FFB74D', // Custom orange shade
      main: '#FF9800',
      dark: '#F57C00',
      contrastText: '#fff'
    },
    background: {
      default: '#FBFBFB',
      paper: '#ffffff',
      light: '#F5F7F8'
    },
    text: {
      primary: '#2D3748', // Darker blueGrey for better contrast
      secondary: '#4A5568',
      light: '#718096'
    },
    action: {
      hover: 'rgba(0, 150, 136, 0.04)', // Teal hover state
      selected: 'rgba(0, 150, 136, 0.08)'
    },
    divider: 'rgba(0, 0, 0, 0.06)',
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.75rem',
      fontWeight: 700, // Bolder
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      color: '#1A202C', // Even darker for headings
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
      marginTop: '1em',
      marginBottom: '0.5em',
      color: '#1A202C',
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      marginTop: '1em',
      marginBottom: '0.5em',
      lineHeight: 1.3,
      color: '#1A202C',
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1A202C',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#2D3748',
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
      color: '#4A5568',
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#2D3748',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#4A5568',
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: '0.03em',
      color: '#718096',
    },
  },
  shape: {
    borderRadius: 10, // Slightly more rounded corners
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.06)',
    '0px 6px 12px rgba(0,0,0,0.07)',
    '0px 8px 16px rgba(0,0,0,0.08)',
    '0px 10px 20px rgba(0,0,0,0.09)',
    '0px 12px 24px rgba(0,0,0,0.1)',
    // ... rest of the shadows array
    ...Array(18).fill(''),
  ],
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2D3748',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 25px rgba(0,0,0,0.1)',
          },
          borderRadius: 12
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          fontWeight: 500,
          transition: 'all 0.25s ease-in-out',
        },
        contained: {
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          }
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.06)',
          }
        },
        text: {
          '&:hover': {
            background: 'rgba(0, 150, 136, 0.06)',
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.75rem',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
          }
        },
        filled: {
          boxShadow: '0 2px 3px rgba(0,0,0,0.05)',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
        elevation2: {
          boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          transition: 'box-shadow 0.2s ease-in-out',
          '&.Mui-focused': {
            boxShadow: '0 0 0 3px rgba(0, 150, 136, 0.1)',
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: teal[300],
          }
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.06)',
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: '0.8em',
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${grey[400]} transparent`,
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: grey[400],
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          }
        }
      }
    }
  },
});

export default theme; 