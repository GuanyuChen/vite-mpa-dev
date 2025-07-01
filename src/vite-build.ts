import { createServer, defineConfig, type ViteDevServer } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { externalGlobals } from 'rollup-plugin-external-globals';
import { green, blue, yellow } from 'picocolors';
import type { BuildParams } from './types.js';

/**
 * Creates and starts a Vite development server for multi-page applications
 * @param params - Build parameters including entry points and configuration
 * @returns Promise that resolves when server is ready
 */
export async function startViteServer(params: BuildParams): Promise<ViteDevServer> {
  const { entryMapList, webappDirectory, port = 5173 } = params;

  console.log(blue('🚀 Starting Vite development server...'));

  try {
    const server = await createServer(
      defineConfig({
        server: {
          port,
          host: true,
          strictPort: false,
          open: false,
        },
        root: resolve(webappDirectory, 'static/src/'),
        publicDir: resolve(webappDirectory, 'static/src/public'),
        plugins: [
          react({
            // Include .jsx files
            include: /\.(jsx?|tsx?)$/,
          }),
          externalGlobals({
            'react-dom': 'ReactDOM',
            react: 'React',
            redux: 'Redux',
            'react-redux': 'ReactRedux',
            'redux-thunk': 'ReduxThunk',
          }),
        ],
        build: {
          // Generate manifest for production builds
          manifest: true,
          // Modern build target
          target: 'esnext',
          // Rollup options for multi-entry builds
          rollupOptions: {
            input: entryMapList.reduce((acc, entry, index) => {
              const entryName = `entry-${index}`;
              acc[entryName] = entry.input;
              return acc;
            }, {} as Record<string, string>),
          },
          // Better chunking strategy
          chunkSizeWarningLimit: 1000,
        },
        // Enhanced development experience
        esbuild: {
          target: 'esnext',
        },
        // CSS processing
        css: {
          devSourcemap: true,
        },
        // Dependency optimization
        optimizeDeps: {
          include: ['react', 'react-dom'],
        },
      })
    );

    await server.listen();

    // Enhanced server info display
    const info = server.config.logger.info;
    info(green('✅ Vite development server is ready!'));
    info(yellow(`📁 Serving files from: ${resolve(webappDirectory, 'static/src/')}`));
    info(yellow(`📊 Found ${entryMapList.length} entry point(s)`));

    server.printUrls();

    // Graceful shutdown handling
    const shutdown = async (): Promise<void> => {
      console.log(yellow('\n🛑 Shutting down development server...'));
      await server.close();
      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    return server;
  } catch (error) {
    console.error('❌ Failed to start Vite server:', error);
    throw error;
  }
}

/**
 * Builds the project for production
 * @param params - Build parameters
 */
export async function buildProject(params: BuildParams): Promise<void> {
  const { build } = await import('vite');
  const { entryMapList, webappDirectory } = params;

  console.log(blue('🏗️  Building project for production...'));

  try {
    await build(
      defineConfig({
        root: resolve(webappDirectory, 'static/src/'),
        publicDir: resolve(webappDirectory, 'static/src/public'),
        plugins: [
          react(),
          externalGlobals({
            'react-dom': 'ReactDOM',
            react: 'React',
            redux: 'Redux',
            'react-redux': 'ReactRedux',
            'redux-thunk': 'ReduxThunk',
          }),
        ],
        build: {
          outDir: resolve(webappDirectory, 'dist'),
          manifest: true,
          target: 'esnext',
          rollupOptions: {
            input: entryMapList.reduce((acc, entry, index) => {
              const entryName = `entry-${index}`;
              acc[entryName] = entry.input;
              return acc;
            }, {} as Record<string, string>),
          },
          minify: 'esbuild',
          sourcemap: true,
        },
      })
    );

    console.log(green('✅ Build completed successfully!'));
  } catch (error) {
    console.error('❌ Build failed:', error);
    throw error;
  }
}