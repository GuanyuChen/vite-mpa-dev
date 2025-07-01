#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { init } from './init.js';
import { buildProject } from './vite-build.js';
import { initParams } from './utils.js';
import { green, blue } from 'picocolors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packagePath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));

const program = new Command();

program
  .name('vite-mpa-dev')
  .description('A modern Vite-based multi-page-application development tool')
  .version(packageJson.version);

program
  .command('dev')
  .description('Start development server')
  .option('-w, --webapp-directory <path>', 'Path to webapp directory')
  .option('-p, --port <number>', 'Development server port', '5173')
  .action(async (options) => {
    console.log(blue('🎯 Starting development mode...'));
    await init({
      webappDirectory: options.webappDirectory,
      port: options.port ? parseInt(options.port, 10) : undefined,
    });
  });

program
  .command('build')
  .description('Build for production')
  .option('-w, --webapp-directory <path>', 'Path to webapp directory')
  .action(async (options) => {
    console.log(blue('🏗️  Starting production build...'));
    try {
      const params = await initParams({
        webappDirectory: options.webappDirectory,
      });
      await buildProject(params);
      console.log(green('✅ Production build completed!'));
    } catch (error) {
      console.error('❌ Build failed:', error);
      process.exit(1);
    }
  });

// Legacy support for old CLI interface
program
  .option('-w, --webapp-directory <path>', 'Path to webapp directory (legacy)')
  .option('-p, --port <number>', 'Development server port (legacy)', '5173')
  .action(async (options) => {
    // If no command specified, default to dev mode for backward compatibility
    if (!process.argv.includes('dev') && !process.argv.includes('build')) {
      console.log(blue('🎯 Starting development mode (legacy CLI)...'));
      await init({
        webappDirectory: options.webappDirectory,
        port: options.port ? parseInt(options.port, 10) : undefined,
      });
    }
  });

program.parse();