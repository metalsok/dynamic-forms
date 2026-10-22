# Dynamic Forms

An Angular demo that builds reactive forms from JSON, with lazy-loaded field components and validation.

Built with Angular 22.2.3 and TypeScript 6.0.3. Use Node.js 24.19.0 (`nvm use`) or another version supported by the `engines` field in `package.json`.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

Tests use Vitest and jsdom, including the JSON-driven form integration test. To run them once:

```bash
npm test -- --watch=false
```

Use `npm test -- --watch` to rerun tests while editing.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
