import pino, { LoggerOptions } from 'pino';

const options: LoggerOptions = { level: process.env.LOG_LEVEL || 'info' };

if (options.level === 'debug') {
  options.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

export const logger = pino(options);
