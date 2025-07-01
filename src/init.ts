import { verifyParams, initParams } from './utils.js';
import { startViteServer } from './vite-build.js';
import type { CliOptions } from './types.js';

/**
 * Initializes the development server with the provided options
 * @param options - CLI options for server configuration
 */
export async function init(options: CliOptions): Promise<void> {
  try {
    // Validate input parameters
    verifyParams(options);
    
    // Initialize build parameters
    const buildParams = await initParams(options);
    
    // Start the Vite development server
    await startViteServer(buildParams);
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    process.exit(1);
  }
}