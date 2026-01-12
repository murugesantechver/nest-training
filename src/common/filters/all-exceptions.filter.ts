import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../../infrastructure/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // 🔥 Extract REAL error details for logs
    const errorForLog =
      exception instanceof Error
        ? {
            name: exception.name,
            message: exception.message,
            stack: exception.stack,
            // Sequelize & other libs attach extra fields
            ...(exception as any),
          }
        : exception;

    // ✅ FULL ERROR LOG (for developers)
    this.logger.error('Unhandled exception', {
      method: request.method,
      url: request.url,
      statusCode: status,
      body: request.body,
      params: request.params,
      query: request.query,
      error: errorForLog,
    });

    // 🛡 SAFE RESPONSE (for clients)
    const responseMessage = isHttpException
      ? (exception.getResponse() as any)?.message || exception.message
      : 'Internal server error';

    response.status(status).json({
      success: false,
      statusCode: status,
      message: responseMessage,
    });
  }
}
