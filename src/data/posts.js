export const posts = [
  {
    id: 1,
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    date: "2023-06-12",
    excerpt: "React is a popular JavaScript library for building user interfaces. This post will guide you through the basics of React.",
    content: `
      # Getting Started with React

      React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.

      ## Why React?

      - Component-Based: Build encapsulated components that manage their own state, then compose them to make complex UIs.
      - Declarative: React makes it painless to create interactive UIs. Design simple views for each state in your application.
      - Learn Once, Write Anywhere: You can develop new features in React without rewriting existing code.

      ## Setting Up Your First React App

      The easiest way to start with React is to use Create React App. It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production.

      \`\`\`bash
      npx create-react-app my-app
      cd my-app
      npm start
      \`\`\`
    `,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    slug: "tailwind-css-tips-and-tricks",
    title: "Tailwind CSS Tips and Tricks",
    date: "2023-06-18",
    excerpt: "Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.",
    content: `
      # Tailwind CSS Tips and Tricks

      Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center, and rotate-90 that can be composed to build any design, directly in your markup.

      ## Why Tailwind?

      - Rapid UI development
      - Consistent design system
      - Mobile-first approach
      - Customizable

      ## Getting Started with Tailwind

      Install Tailwind via npm:

      \`\`\`bash
      npm install -D tailwindcss
      npx tailwindcss init
      \`\`\`

      ## Useful Tips

      ### 1. Use the JIT mode

      Tailwind CSS v3.0 introduced Just-in-Time mode by default, which generates your styles on-demand instead of at build time.

      ### 2. Custom Variants

      You can create your own variants to target specific states:

      \`\`\`js
      // tailwind.config.js
      module.exports = {
        theme: {
          extend: {
            // ...
          },
        },
        variants: {
          extend: {
            backgroundColor: ['active'],
            textColor: ['visited'],
          }
        },
        plugins: [],
      }
      \`\`\`
    `,
    image: "https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1952&q=80"
  },
  {
    id: 3,
    slug: "vite-vs-create-react-app",
    title: "Vite vs Create React App",
    date: "2023-07-02",
    excerpt: "Comparing Vite and Create React App for modern React development. Which one should you choose?",
    content: `
      # Vite vs Create React App

      When starting a new React project, you have several options for setting up your development environment. Two popular choices are Vite and Create React App (CRA). Let's compare them.

      ## Create React App

      CRA has been the standard tool for bootstrapping React applications for years:

      - Stable and mature
      - Abstracts away configuration
      - Slower build times for larger projects
      - No built-in SSR support

      ## Vite

      Vite is a newer build tool that focuses on speed:

      - Lightning-fast startup and hot module replacement
      - Built with modern JavaScript in mind
      - Leaner production builds
      - More flexible configuration
      - Better developer experience

      ## Performance Comparison

      Vite generally outperforms CRA in development mode, especially for larger applications. This is because Vite leverages native ES modules and only compiles the code that changes when you make edits.

      ## Which One to Choose?

      - Choose CRA if you want a stable, battle-tested solution with less configuration
      - Choose Vite if you want faster development experience and don't mind using a newer tool
    `,
    image: "https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];
