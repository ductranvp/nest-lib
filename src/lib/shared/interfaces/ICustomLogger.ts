import { ILogDetail } from './ILogDetail';

export interface ICustomLogger {
  /**
   * Write a 'log' level log.
   */
  log(data: string | ILogDetail): void;
  /**
   * Write a 'warn' level log.
   */
  warn(data: string | ILogDetail): void;
  /**
   * Write an 'error' level log.
   */
  error(data: string | ILogDetail): void;
}
