export interface CliOptions {
  webappDirectory?: string;
  port?: number;
}

export interface EntryConfig {
  input: string;
}

export interface BuildParams {
  entryMapList: EntryConfig[];
  webappDirectory: string;
  port?: number;
}

export interface ViteServerConfig {
  port: number;
  root: string;
  publicDir: string;
}