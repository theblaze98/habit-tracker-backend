import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const timestamp = new Date().toISOString()
    let message = 'Internal server error'
    let status = HttpStatus.INTERNAL_SERVER_ERROR

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const res = exception.getResponse()
      if (typeof res === 'string') {
        message = res
      } else if (typeof res === 'object' && res !== null && 'message' in res) {
        const maybeMessage = (res as { message?: string | string[] }).message
        message = Array.isArray(maybeMessage)
          ? maybeMessage.join(', ')
          : (maybeMessage ?? message)
      }
    }

    console.error(`[${timestamp}] Error:`, exception)

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
      method: request.method,
      timestamp,
    })
  }
}
