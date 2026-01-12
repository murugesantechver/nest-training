import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import util from 'util';

@Injectable()
export class LoggerService implements NestLogger {
  log(message: string, meta?: unknown) {
    this.print('INFO', message, meta);
  }

  warn(message: string, meta?: unknown) {
    this.print('WARN', message, meta);
  }

  error(message: string, meta?: unknown) {
    this.print('ERROR', message, meta);
  }

  debug(message: string, meta?: unknown) {
    this.print('DEBUG', message, meta);
  }

  private print(level: string, message: string, meta?: unknown) {
    const time = new Date().toISOString();
    const isDev = process.env.NODE_ENV !== 'production';

    let logLine = `[${level}] ${time} ${message}`;

    if (meta) {
      const metaString = isDev
        ? util.inspect(meta, { depth: 2, colors: true, breakLength: Infinity })
        : JSON.stringify(meta);

      logLine += ` | ${metaString}`;
    }

    console.log(logLine);
  }
}
