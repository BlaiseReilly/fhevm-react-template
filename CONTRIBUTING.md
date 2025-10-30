# Contributing to FHEVM Universal SDK

Thank you for your interest in contributing to the FHEVM Universal SDK! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node version, OS, etc.)
- Code samples if applicable

### Suggesting Enhancements

We welcome feature requests! Please:
- Check if the feature has already been requested
- Provide a clear use case
- Explain how it benefits users
- Consider implementation complexity

### Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/fhevm-react-template.git
   cd fhevm-react-template
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed
   - Ensure all tests pass

5. **Test Your Changes**
   ```bash
   npm test
   npm run build:all
   ```

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add feature: description of your changes"
   ```

7. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Link any related issues

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Use meaningful variable names

### Project Structure

```
packages/fhevm-sdk/     # Core SDK package
examples/               # Example applications
templates/              # Template projects
docs/                   # Documentation
```

### TypeScript

- Use strict mode
- Avoid `any` types when possible
- Export types alongside implementations
- Document complex types

### Testing

- Write unit tests for new features
- Ensure tests are deterministic
- Mock external dependencies
- Aim for >80% code coverage

### Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for APIs
- Include code examples
- Update migration guides if needed

## Commit Message Guidelines

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(sdk): add support for euint256 type
fix(hooks): resolve useFHEVM initialization race condition
docs(readme): update installation instructions
```

## Adding a New Framework Adapter

To add support for a new framework (e.g., Vue, Svelte):

1. Create adapter in `packages/fhevm-sdk/src/adapters/`
2. Export from appropriate entry point
3. Add example in `examples/`
4. Add template in `templates/`
5. Update documentation
6. Add tests

Example structure:
```typescript
// packages/fhevm-sdk/src/adapters/vue.ts
export const useFHEVM = () => {
  // Vue-specific implementation
};
```

## Adding New Encryption Types

To add support for new encryption types:

1. Update types in `packages/fhevm-sdk/src/types/`
2. Add validation logic
3. Update SDK core functions
4. Add tests
5. Update documentation
6. Add examples

## Release Process

Maintainers handle releases:

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create release tag
4. Publish to npm
5. Create GitHub release

## Getting Help

- **Documentation:** Check the [docs/](./docs/) folder
- **Issues:** Search [existing issues](https://github.com/BlaiseReilly/fhevm-react-template/issues)
- **Discussions:** Join [GitHub Discussions](https://github.com/BlaiseReilly/fhevm-react-template/discussions)
- **Discord:** [Zama Community](https://discord.gg/zama)

## Development Setup

### Prerequisites

- Node.js ≥18.0.0
- npm ≥9.0.0
- Git

### Local Development

```bash
# Clone repository
git clone https://github.com/BlaiseReilly/fhevm-react-template.git
cd fhevm-react-template

# Install dependencies
npm install

# Build SDK
npm run build:sdk

# Run examples
npm run dev:nextjs-basic
npm run dev:nextjs-privacy

# Run tests
npm test

# Format code
npm run format

# Lint code
npm run lint
```

### Testing Against Local SDK

When developing SDK changes, test against examples:

```bash
# In packages/fhevm-sdk
npm run build

# In examples/nextjs-basic
npm install
npm run dev
```

## Code Review Process

All contributions go through code review:

1. Automated checks must pass (tests, lint, build)
2. At least one maintainer approval required
3. Address review feedback promptly
4. Squash commits before merging (if requested)

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Acknowledged in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Don't hesitate to ask questions:
- Open an issue with the `question` label
- Start a discussion on GitHub
- Reach out on Discord

Thank you for contributing to FHEVM Universal SDK!
