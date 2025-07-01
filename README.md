# vite-mpa-dev

A modern Vite-based multi-page-application development tool built with TypeScript and the latest frontend technologies.

## 🚀 Features

- ⚡ **Lightning Fast**: Built on Vite 5.x for ultra-fast development and builds
- 🔥 **Hot Module Replacement**: Instant updates during development
- 📦 **Multi-Page Support**: Automatically discovers and serves multiple entry points
- 🎯 **TypeScript Ready**: Full TypeScript support with modern ESM modules
- 🧪 **Modern Testing**: Vitest for fast and reliable testing
- 📱 **React 18**: Latest React with Fast Refresh support
- 🛠️ **Developer Experience**: Beautiful CLI with colored output and progress indicators
- 🏗️ **Production Ready**: Optimized builds with modern bundling strategies

## 📋 Requirements

- Node.js >= 18.0.0
- pnpm, npm, or yarn

## 🔧 Installation

```bash
npm install -g vite-mpa-dev
```

## 🎯 Usage

### Development Server

Start the development server with auto-discovery of entry points:

```bash
# Modern CLI
vite-mpa-dev dev -w ./my-webapp

# With custom port
vite-mpa-dev dev -w ./my-webapp -p 8080

# Legacy CLI (backward compatible)
vite-mpa-dev -w ./my-webapp -p 8080
```

### Production Build

Build your application for production:

```bash
vite-mpa-dev build -w ./my-webapp
```

### Project Structure

Your webapp should follow this structure:

```
my-webapp/
├── static/
│   └── src/
│       ├── js/
│       │   ├── app1/
│       │   │   └── main.js     # Entry point 1
│       │   ├── app2/
│       │   │   └── main.jsx    # Entry point 2
│       │   └── admin/
│       │       └── main.ts     # Entry point 3
│       └── public/             # Static assets
└── dist/                       # Build output
```

### Entry Points

The tool automatically discovers entry points by looking for files named:
- `main.js`
- `main.jsx`
- `main.ts`
- `main.tsx`

## 🛠️ Development

### Prerequisites

```bash
node --version  # >= 18.0.0
npm --version   # or pnpm/yarn
```

### Setup

```bash
# Clone the repository
git clone https://github.com/GuanyuChen/muti-vite-dev.git
cd muti-vite-dev

# Install dependencies
npm install

# Start development
npm run dev
```

### Scripts

```bash
npm run dev          # Run in development mode
npm run build        # Build for production
npm run test         # Run tests
npm run test:coverage # Run tests with coverage
npm run lint         # Lint code
npm run lint:fix     # Fix lint issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Technology Stack

- **Build Tool**: Vite 5.x
- **Language**: TypeScript 5.x
- **Framework**: React 18.x
- **Testing**: Vitest
- **Linting**: ESLint 9.x
- **Formatting**: Prettier 3.x
- **CLI**: Commander.js 12.x
- **Module System**: ESM (ES Modules)

## 🗺️ Roadmap

- [x] ✅ Vite multi-entry compilation
- [x] ✅ TypeScript support
- [x] ✅ Modern ESM modules
- [x] ✅ Vitest testing framework
- [x] ✅ Enhanced CLI with subcommands
- [x] ✅ React 18 with Fast Refresh
- [ ] 🔄 Legacy browser support configuration
- [ ] 🔄 Auto-insertion of resource tags
- [ ] 🔄 Enhanced parameter validation
- [ ] 🔄 Custom port parameter support
- [ ] 🔄 HMR performance logging
- [ ] 🔄 CSS/Images/Sprite/Icon font compilation
- [ ] 🔄 CI/CD pipeline
- [ ] 🔄 Docker support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues

If you encounter any issues, please report them on [GitHub Issues](https://github.com/GuanyuChen/muti-vite-dev/issues).
