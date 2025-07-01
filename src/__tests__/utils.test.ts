import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { verifyParams, initParams, getChildrenDirList, logMessage } from '../utils.js';
import type { CliOptions } from '../types.js';

describe('verifyParams', () => {
  it('should throw error when options is undefined', () => {
    expect(() => verifyParams(undefined as any)).toThrow('Options is required');
  });

  it('should throw error when webappDirectory is missing', () => {
    expect(() => verifyParams({})).toThrow('-w webappDirectory is required');
  });

  it('should throw error when webappDirectory does not exist', () => {
    const options: CliOptions = {
      webappDirectory: '/non/existent/path',
    };
    expect(() => verifyParams(options)).toThrow('/non/existent/path does not exist');
  });

  it('should throw error when port is invalid', () => {
    const options: CliOptions = {
      webappDirectory: __dirname,
      port: NaN,
    };
    expect(() => verifyParams(options)).toThrow('Port must be a valid number between 1-65535');
  });

  it('should throw error when port is out of range', () => {
    const options: CliOptions = {
      webappDirectory: __dirname,
      port: 70000,
    };
    expect(() => verifyParams(options)).toThrow('Port must be a valid number between 1-65535');
  });

  it('should pass validation with valid options', () => {
    const options: CliOptions = {
      webappDirectory: __dirname,
      port: 3000,
    };
    expect(() => verifyParams(options)).not.toThrow();
  });

  it('should pass validation without port', () => {
    const options: CliOptions = {
      webappDirectory: __dirname,
    };
    expect(() => verifyParams(options)).not.toThrow();
  });
});

describe('initParams', () => {
  let tempDir: string;
  let jsDir: string;

  beforeEach(() => {
    // Create temporary directory structure
    tempDir = join(tmpdir(), `vite-mpa-test-${Date.now()}`);
    jsDir = join(tempDir, 'static', 'src', 'js');
    mkdirSync(jsDir, { recursive: true });
  });

  afterEach(() => {
    // Clean up temporary directory
    if (existsSync(tempDir)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('should find main.js entry files', async () => {
    // Create test entry files
    const entryDir = join(jsDir, 'app1');
    mkdirSync(entryDir, { recursive: true });
    writeFileSync(join(entryDir, 'main.js'), 'console.log("app1");');

    const entryDir2 = join(jsDir, 'app2');
    mkdirSync(entryDir2, { recursive: true });
    writeFileSync(join(entryDir2, 'main.jsx'), 'console.log("app2");');

    const result = await initParams({ webappDirectory: tempDir });

    expect(result.webappDirectory).toBe(tempDir);
    expect(result.entryMapList).toHaveLength(2);
    expect(result.entryMapList[0].input).toContain('main.js');
    expect(result.entryMapList[1].input).toContain('main.jsx');
  });

  it('should handle directory with no entry files', async () => {
    const result = await initParams({ webappDirectory: tempDir });

    expect(result.webappDirectory).toBe(tempDir);
    expect(result.entryMapList).toHaveLength(0);
  });

  it('should include port in result when provided', async () => {
    const result = await initParams({ 
      webappDirectory: tempDir, 
      port: 8080 
    });

    expect(result.port).toBe(8080);
  });

  it('should throw error when webappDirectory is missing', async () => {
    await expect(initParams({})).rejects.toThrow('webappDirectory is required');
  });
});

describe('getChildrenDirList', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = join(tmpdir(), `vite-mpa-legacy-test-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
  });

  afterEach(() => {
    if (existsSync(tempDir)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('should find main entry files recursively', () => {
    // Create nested structure
    const subDir = join(tempDir, 'sub', 'nested');
    mkdirSync(subDir, { recursive: true });
    
    writeFileSync(join(tempDir, 'main.js'), 'console.log("root");');
    writeFileSync(join(subDir, 'main.jsx'), 'console.log("nested");');
    writeFileSync(join(tempDir, 'other.js'), 'console.log("other");');

    const entryList: string[] = [];
    getChildrenDirList(tempDir, entryList);

    expect(entryList).toHaveLength(2);
    expect(entryList.some(path => path.endsWith('main.js'))).toBe(true);
    expect(entryList.some(path => path.endsWith('main.jsx'))).toBe(true);
  });

  it('should handle empty directory', () => {
    const entryList: string[] = [];
    getChildrenDirList(tempDir, entryList);
    expect(entryList).toHaveLength(0);
  });

  it('should handle non-existent directory gracefully', () => {
    const entryList: string[] = [];
    getChildrenDirList('/non/existent/path', entryList);
    expect(entryList).toHaveLength(0);
  });
});

describe('logMessage', () => {
  it('should log message without throwing', () => {
    // Basic smoke test - actual console output testing would require more setup
    expect(() => logMessage('Test message')).not.toThrow();
    expect(() => logMessage('Warning message', 'warn')).not.toThrow();
    expect(() => logMessage('Error message', 'error')).not.toThrow();
  });
});