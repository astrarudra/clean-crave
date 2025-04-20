# Clean Crave - Healthy Living & Nutrition App

![Clean Crave Logo](https://astrarudra.github.io/data/images/logo.png)

Welcome to the official repository for Clean Crave, a comprehensive application dedicated to promoting healthy eating and nutrition education. This React-based application offers a rich interface for exploring nutritious recipes, educational content on healthy living, and a detailed food nutrition database.

**Live Demo**: [Clean Crave App](https://astrarudra.github.io/clean-crave/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a8e71262-b91c-4365-acf3-391578e162cb/deploy-status)](https://app.netlify.com/sites/cleancrave/deploys)

![Screenshot of Clean Crave App](https://astrarudra.github.io/data/images/screenshot.jpg)

## About Clean Crave

Clean Crave is a sanctuary for health-conscious individuals seeking to make better dietary choices. Our application provides:

- **Nutritious Recipes**: A curated collection of healthy recipes with detailed cooking instructions
- **Nutrition Education**: Evidence-based articles on healthy eating and various diet approaches
- **Food Database**: Comprehensive nutritional information for a wide range of foods
- **Wellness Tools**: Track progress, learn about nutrition, and make informed dietary choices

Whether you're on a specific diet, trying to eat more healthfully, or simply curious about nutrition, Clean Crave provides a gateway to better eating habits and a healthier lifestyle.

## Features

- **📱 Responsive Design**: Fully optimized for all devices from mobile to desktop
- **🍽️ Recipe Management**: Browse, filter, and search through a diverse collection of healthy recipes
- **📊 Nutritional Information**: Detailed breakdown of calories, protein, carbs, and fat for each recipe and food item
- **🔍 Advanced Filtering**: Filter recipes and foods by various criteria including diet type, meal type, and nutritional content
- **📚 Educational Content**: Access evidence-based articles on nutrition and healthy eating
- **📈 Food Database**: Explore a comprehensive database of foods with their nutritional profiles
- **🌐 No Backend Required**: Static JSON data integration means no server setup needed
- **🔄 State Management**: Clean architecture with Zustand for efficient state management
- **🎨 Modern UI**: Material UI components for a clean, contemporary look and feel

## Technology Stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### Core Dependencies:
- **React**: JavaScript library for building user interfaces
- **Material UI (MUI)**: React component library for faster and easier web development
- **Zustand**: Minimalistic state management solution
- **React Router**: Declarative routing for React applications
- **Recharts**: Composable charting library for data visualization
- **@iconify/react**: Icon library integration for enhanced UI

### Browsers Tested
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
![Safari](https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Edge](https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white)

## Project Structure

```
clean-crave/
├── public/         # Static assets
├── src/
│   ├── assets/     # Static assets like images
│   ├── components/ # Reusable UI components 
│   │   ├── Home/   # Home page components
│   │   ├── Recipe/ # Recipe related components
│   │   ├── Education/ # Education related components
│   │   └── ...     # Other component categories
│   ├── hooks/      # Custom React hooks
│   ├── pages/      # Page-level components
│   ├── store/      # Zustand state management
│   ├── theme/      # MUI theme configuration
│   ├── utils/      # Utility functions
│   ├── App.jsx     # Main application component
│   └── main.jsx    # Application entry point
├── index.html      # HTML entry point
└── package.json    # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/clean-crave.git
   cd clean-crave
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Upcoming Features

Stay tuned for exciting developments and enhancements coming soon to Clean Crave:

- **Mobile App**: Development of a native mobile application for iOS and Android
- **Meal Planning**: Weekly meal planner with shopping list generation
- **User Accounts**: Personalized experience with saved favorites and custom meal plans
- **Progress Tracking**: Tools to track nutritional intake and health goals
- **Recipe Submission**: User-contributed recipes with nutritional analysis

## Contribution

We welcome contributions from the community! Here's how you can contribute:

1. **Fork the Repository**: Start by forking this repository
2. **Create a Branch**: `git checkout -b feature/AmazingFeature`
3. **Make Changes**: Implement your feature or bug fix
4. **Commit**: `git commit -m 'Add some AmazingFeature'`
5. **Push**: `git push origin feature/AmazingFeature`
6. **Open a Pull Request**: Submit your changes for review

Please ensure your code follows our coding standards and includes appropriate tests.

## Acknowledgments

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

- Hat tip to all the open-source libraries and tools that made this project possible
- Special thanks to the nutrition and culinary experts who contributed content
- Inspiration from leading health and nutrition resources

## License

This project is licensed under the MIT License - see the LICENSE file for details.
