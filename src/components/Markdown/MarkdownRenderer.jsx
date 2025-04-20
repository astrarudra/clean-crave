import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Link as MuiLink, Box, Divider } from '@mui/material';

// Customize rendering of Markdown elements using MUI components
const markdownComponents = {
  h1: ({ ...props }) => <Typography variant="h1" gutterBottom {...props} />,
  h2: ({ ...props }) => <Typography variant="h2" gutterBottom {...props} />,
  h3: ({ ...props }) => <Typography variant="h3" gutterBottom {...props} />,
  h4: ({ ...props }) => <Typography variant="h4" gutterBottom {...props} />,
  h5: ({ ...props }) => <Typography variant="h5" gutterBottom {...props} />,
  h6: ({ ...props }) => <Typography variant="h6" gutterBottom {...props} />,
  p: ({ ...props }) => <Typography variant="body1" paragraph {...props} />,
  a: ({ ...props }) => <MuiLink {...props} />,
  ul: ({ ...props }) => <Box component="ul" sx={{ pl: 2, mb: 2 }} {...props} />,
  ol: ({ ...props }) => <Box component="ol" sx={{ pl: 2, mb: 2 }} {...props} />,
  li: ({ ...props }) => <Typography component="li" variant="body1" sx={{ mb: 0.5 }} {...props} />,
  blockquote: ({ ...props }) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: (theme) => `4px solid ${theme.palette.primary.light}`,
        pl: 2,
        my: 2,
        fontStyle: 'italic',
        color: 'text.secondary',
      }}
      {...props}
    />
  ),
  hr: ({ ...props }) => <Divider sx={{ my: 2 }} {...props} />,
  // Add more custom renderers as needed (e.g., for tables, code blocks)
  code: ({inline, className, children, ...props}) => {
    return !inline ? (
      <Box
        component="pre"
        sx={{
          backgroundColor: 'grey.100',
          p: 2,
          my: 2,
          borderRadius: 1,
          overflowX: 'auto',
          fontFamily: 'monospace'
        }}
        {...props}
      >
        <code>{children}</code>
      </Box>
    ) : (
      <Typography
        component="code"
        sx={{ backgroundColor: 'grey.100', px: 0.5, borderRadius: 1, fontFamily: 'monospace' }}
        {...props}
      >
        {children}
      </Typography>
    )
  }
};

/**
 * Renders Markdown content using ReactMarkdown, applying MUI styling.
 * @param {object} props
 * @param {string} props.content - The Markdown string to render.
 */
const MarkdownRenderer = ({ content }) => {
  if (!content) return null;

  return (
    <ReactMarkdown components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer; 