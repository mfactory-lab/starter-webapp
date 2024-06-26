# Starter Webapp

Starter Webapp is a robust and versatile template tailored for mFactory, designed to streamline the development of Vue 3 applications with Vite.
This template leverages a comprehensive technology stack to ensure an efficient and modern development experience:

- **Vue 3**: Progressive JavaScript framework for building user interfaces.
- **Vite**: Next-generation frontend tooling for fast and efficient builds.
- **TypeScript**: Enhances JavaScript with static types for improved code quality.
- **SCSS**: Advanced CSS preprocessor for better styling capabilities.
- **Quasar**: High-performance Vue.js framework for building responsive and feature-rich applications.
- **SSG (Static Site Generation)**: Generates static HTML at build time for improved performance and SEO.
- **PWA (Progressive Web App)**: Provides offline capabilities and enhanced user experiences.
- **WebfontDownload**: Ensures efficient loading of web fonts to improve site performance.
- **Linting and Formatting**: Integrated tools like ESLint, Prettier, and Oxlint for maintaining code quality and consistency.
- **Pnpm**: Fast, disk space efficient package manager for managing dependencies.

This template is optimized for both small and large-scale projects, offering a solid foundation for building high-quality,
maintainable web applications within the mFactory organization.
It integrates essential tools and best practices to provide a seamless development workflow,
ensuring your projects are efficient, scalable, and easy to maintain.

## Prerequisites

- [Node.js](https://nodejs.org/) (>=18.0.0)
- [pnpm](https://pnpm.io/) (>=9.0.0)

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/mfactory-lab/starter-webapp.git
   cd starter-webapp
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```

3. **Run the development server:**
   ```sh
   pnpm dev
   ```
   Open your browser and visit [http://localhost:3333](http://localhost:3333).

## Building for Production

To build the application for production, run:

```sh
pnpm build:ssg
```
This will create a `dist` directory with the production build.

## Contributing

If you have any suggestions or improvements, feel free to open an issue or create a pull request. We welcome contributions from the community!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
