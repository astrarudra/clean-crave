# Clean Crave - Healthy Recipe Blog

This project is a front-end-only recipe blog application built with React, Material UI (MUI), and Zustand for state management. It focuses on displaying health-conscious recipes and educational content loaded from local Markdown files.

## Features

*   **Markdown-Based Content:** Recipes and educational articles are rendered from `.md` files located in `src/data`.
*   **Recipe Display:** Shows recipe details including title, image, ingredients, instructions, prep/cook time, and servings.
*   **Nutritional Information:** Displays key nutritional data (calories, protein, carbs, fat) parsed from Markdown frontmatter.
*   **Filtering:** Allows users to filter recipes by dietary tags (e.g., vegan, keto) and search by title.
*   **Educational Content:** Features a separate section for articles on diets and healthy eating.
*   **Responsive Design:** Uses MUI components for a clean, modern, and responsive user interface.
*   **State Management:** Utilizes Zustand with an immer middleware and a controller pattern for managing application state.

## Tech Stack

*   **React:** JavaScript library for building user interfaces.
*   **Vite:** Fast front-end build tool.
*   **Material UI (MUI):** React component library for faster and easier web development.
*   **Zustand:** Minimalistic state management solution.
*   **React Router:** Declarative routing for React applications.
*   **React Markdown:** Renders Markdown as React components.
*   **Gray Matter:** Parses frontmatter from Markdown files.
*   **Immer:** Helper for working with immutable state.

## Project Structure

```
clean-crave/
├── public/         # Static assets
├── src/
│   ├── assets/     # Static assets like images (currently using placeholder paths)
│   ├── components/ # Reusable UI components (Layout, Recipe, Education, Markdown)
│   ├── data/       # Markdown content files
│   │   ├── recipes/
│   │   └── education/
│   ├── hooks/      # Custom React hooks (if any)
│   ├── pages/      # Page-level components corresponding to routes
│   ├── store/      # Zustand state management (store, controller, index)
│   ├── theme/      # MUI theme configuration
│   ├── utils/      # Utility functions (if any)
│   ├── App.jsx     # Main application component with routing setup
│   ├── index.css   # Global CSS (minimal usage)
│   └── main.jsx    # Application entry point
├── .gitignore
├── index.html
├── package.json
├── README.md       # This file
└── vite.config.js
```

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  Clone the repository (or ensure you are in the project directory):
    ```bash
    # git clone <repository-url>
    cd clean-crave
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running the Development Server

1.  Start the Vite development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
2.  Open your browser and navigate to the local URL provided (usually `http://localhost:5173`).

## How Content is Loaded

*   Recipe and educational content resides in `.md` files within `src/data/recipes` and `src/data/education` respectively.
*   Each file uses YAML frontmatter to define metadata (like `id`, `title`, `tags`, `nutrition`, `category`).
*   The `src/store/controller.js` uses Vite's `import.meta.glob` feature to dynamically import all `.md` files from these directories during the application's initialization (`Controller.init`).
*   `gray-matter` is used to parse the frontmatter and content from each file.
*   The parsed data is stored in the Zustand state.
