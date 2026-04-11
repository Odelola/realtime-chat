# RealTime Chat

This is a quick boilerplate  to set up a project using React, React Query, Zustand, TypeScript, and Vite with essential configurations.


| Tool         | Purpose                                           |
| ------------ | ------------------------------------------------- |
| React        | A JavaScript library for building user interfaces |
| React Query  | Data synchronization library for React            |
| Zustand      | Minimalist state management                       |
| TypeScript   | Static typing for JavaScript                      |
| Vite         | Build tool and development server                 |

## Features

:white_check_mark: Faster build with Vite

:white_check_mark: State management using Zustand

:white_check_mark: Data fetching using React Query and Axios

:white_check_mark: TypeScript for static typing

:white_check_mark: Pre-configured with ESLint and Prettier for code linting and formatting

:white_check_mark: Includes example components to get started quickly

## Getting Started

### Clone the repository

```
git clone https://github.com/odelola/realtime-chat.git
cd realtime-chat
```

### Installing Dependencies

```
pnpm install
```

### Don't have pnpm install at https://pnpm.io/installation

### Running Locally

To run the project locally, simply execute:

```
pnpm dev
```

## Scripts

| Command       | Description                                                                  |
| ------------- | -----------------------------------------------------------------------------|
| `start`       | Run `build:css` then watch TailwindCSS and Vite concurrently                 |
| `watch:css`   | Watch for changes in `index.css` and output to `styles.css` using TailwindCSS|
| `build:css`   | Build CSS using TailwindCSS from `index.css` to `styles.css`                 |
| `build`       | Run TypeScript compiler, build CSS and then Vite build                       |
| `preview`     | Run Vite preview                                                             |
| `lint`        | Lint TypeScript files using ESLint                                           |
| `lint:fix`    | Fix linting issues in TypeScript files using ESLint                          |
| `format`      | Format `.ts`, `.tsx`, and `.json` files using Prettier                       |
| `test`        | Run Jest tests                                                               |
| `release`     | Run `standard-version` for versioning                                        |
| `commit`      | Use `git-cz` for commits                                                     |
| `prepare`     | Set up Husky for git hooks in a production environment                       |


## Project Structure

Here's a basic overview of the significant folders in the boilerplate:

```
├── public
└── src
    ├── components
    ├── features
    ├── hooks
    ├── lib
    ├── routes
    ├── store
    └── types
```

| Folder      | Description                                                                                          |
|-------------|------------------------------------------------------------------------------------------------------|
| **`src/`**   | Contains the main source code for the application.                                                   |
| `components/ui` | Reusable UI components, each in its own folder (e.g., button, input, spinner, header).            |
| `features`  | Feature-based modules, each with its own domain logic, pages, hooks, services, and types.             |
| `hooks`     | Shared custom React hooks that can be used across features.                                           |
| `lib`       | Miscellaneous utility functions, helpers, and other standalone pieces of logic.                       |
| `routes`    | Configuration and components related to routing in the application.                                   |
| `store`     | Zustand stores for state management.                                                                  |
| `types`     | Shared TypeScript types and interfaces.                                                               |
| **`public/`**   | Contains static assets like images, fonts, and the entry HTML file. Assets in this directory are served directly and are not processed by bundlers like Vite. |

### Features Folder Structure

The `src/features` directory is organized by feature/domain. Each feature contains its own:
- `pages/`: Page components for that feature (used in routing)
- `hooks/`: Feature-specific hooks
- `services/`: API calls and business logic for the feature
- `types/`: TypeScript types/interfaces for the feature
- (optionally) `validation/`, `test/`, etc. for feature-specific logic

Example:

```
src/features/articles/
  ├── hooks/
  ├── pages/
  ├── services/
  └── types/
```

