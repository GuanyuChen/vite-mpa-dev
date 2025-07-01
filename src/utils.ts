import { resolve } from 'node:path';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { glob } from 'fast-glob';
import { red, green, yellow } from 'picocolors';
import type { CliOptions, EntryConfig, BuildParams } from './types.js';

/**
 * Validates CLI parameters
 * @param options - CLI options to validate
 * @throws {Error} When validation fails
 */
export function verifyParams(options: CliOptions): void {
  if (!options) {
    throw new Error('Options is required');
  }

  const { webappDirectory, port } = options;

  if (!webappDirectory) {
    throw new Error('-w webappDirectory is required');
  }

  if (!existsSync(webappDirectory)) {
    throw new Error(`${webappDirectory} does not exist`);
  }

  if (port !== undefined && (isNaN(port) || port < 1 || port > 65535)) {
    throw new Error(`Port must be a valid number between 1-65535, got: ${port}`);
  }
}

/**
 * Initializes build parameters from CLI options
 * @param options - CLI options
 * @returns Build parameters with entry map list
 */
export async function initParams(options: CliOptions): Promise<BuildParams> {
  const { webappDirectory, port } = options;
  
  if (!webappDirectory) {
    throw new Error('webappDirectory is required');
  }

  console.log(green('🔍 Scanning for entry points...'));

  const entryDirectory = resolve(webappDirectory, 'static/src/js');
  
  // Use fast-glob for better performance and modern pattern matching
  const entryFiles = await glob(['**/main.{js,jsx,ts,tsx}'], {
    cwd: entryDirectory,
    absolute: true,
  });

  if (entryFiles.length === 0) {
    console.warn(yellow('⚠️  No entry files found. Looking for main.js, main.jsx, main.ts, or main.tsx files.'));
  }

  const entryMapList: EntryConfig[] = entryFiles.map(file => ({
    input: file,
  }));

  console.log(green('✅ Found entry points:'));
  entryMapList.forEach((entry, index) => {
    console.log(`  ${index + 1}. ${entry.input}`);
  });

  return {
    entryMapList,
    webappDirectory,
    port,
  };
}

/**
 * Legacy function for getting child directories (kept for compatibility)
 * @deprecated Use glob patterns with fast-glob instead
 */
export function getChildrenDirList(dir = '', entryList: string[] = []): void {
  try {
    const list = readdirSync(dir);

    for (const item of list) {
      const fullPath = resolve(dir, item);
      const isFile = statSync(fullPath).isFile();

      if (isFile) {
        // Look for main entry files
        if (/main\.(js|jsx|ts|tsx)$/.test(item)) {
          entryList.push(fullPath);
        }
      } else {
        getChildrenDirList(fullPath, entryList);
      }
    }
  } catch (error) {
    console.error(red(`Error scanning directory ${dir}:`), error);
  }
}

/**
 * Logs a formatted message with timestamp
 */
export function logMessage(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = `[${timestamp}]`;
  
  switch (level) {
    case 'info':
      console.log(green(prefix), message);
      break;
    case 'warn':
      console.warn(yellow(prefix), message);
      break;
    case 'error':
      console.error(red(prefix), message);
      break;
  }
}