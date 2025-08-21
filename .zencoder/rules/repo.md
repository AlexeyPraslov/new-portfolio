---
description: Repository Information Overview
alwaysApply: true
---

# Portfolio Website Information

## Summary

This repository contains a portfolio website template for a web developer. It's a static website built with HTML, CSS (SCSS), and vanilla JavaScript. The site features a responsive design with a dark/light theme toggle, navigation menu, and contact dropdown functionality.

## Structure

-   **css/**: Contains compiled CSS files and source maps
-   **fonts/**: Custom font files (IBM Plex Sans in various weights)
-   **images/**: Website images and SVG sprite
-   **scss/**: SCSS source files organized in blocks and global components
    -   **blocks/**: Component-specific styles (header, about, skills, etc.)
    -   **global/**: Base styles, variables, mixins, and utilities
-   **HTML files**: Main content pages (index.html, about.html, portfolio.html, etc.)
-   **main.js**: JavaScript functionality for the website

## Language & Runtime

**Language**: HTML5, CSS3 (SCSS), JavaScript (ES6+)
**Build System**: Manual SCSS compilation (no build tool configuration found)
**Development Environment**: VSCode with spell checking configuration

## Key Features

-   Responsive design for various screen sizes
-   Dark/light theme toggle with localStorage persistence
-   Interactive navigation menu with active page highlighting
-   Contact dropdown menu
-   Structured component-based SCSS architecture

## SCSS Architecture

**Structure**:

-   Global styles: Normalize, fonts, variables, mixins, reboot, container
-   Component blocks: Header, theme toggle, about, skills, portfolio, works, contact

**Compilation**:

```bash
# Manual SCSS compilation required (no automated build process found)
# Possible command (if using sass CLI):
sass scss/style.scss css/style.css --style=compressed --source-map
```

## JavaScript Functionality

**Main Features**:

-   Burger menu toggle with animation
-   Theme switching (dark/light) with localStorage persistence
-   Contact dropdown menu
-   Active link highlighting based on current page
-   Overlay for closing menus when clicking outside

## Browser Compatibility

The website uses modern HTML5, CSS3, and ES6+ JavaScript features, suggesting compatibility with modern browsers. The inclusion of normalize.css indicates attention to cross-browser compatibility.

## SEO & Accessibility

-   Semantic HTML structure
-   Meta tags for SEO optimization
-   Schema.org structured data for better search engine visibility
-   ARIA attributes for improved accessibility
-   SVG icons with proper accessibility attributes
