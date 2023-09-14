export const CLASS_TYPE = {
  WARNING: 'warning',
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
  DEFAULT: 'default',
} as const;

export type ClassType = (typeof CLASS_TYPE)[keyof typeof CLASS_TYPE];
