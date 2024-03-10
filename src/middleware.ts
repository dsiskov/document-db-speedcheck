import * as expressCore from 'express-serve-static-core'
import cors from 'cors'
import helmet from 'helmet'
import { logger } from './app/util/logger'
import express, { NextFunction, Request, Response } from 'express'

interface ResponseError extends Error {
  status?: number
}

function applyMiddleware(app: expressCore.Express) {
  app.use(cors())
  app.use(helmet())
  app.use(errorHandling)
  app.use(express.json())
}

function errorHandling(
  err: ResponseError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(formatErrorStack(err))
  const statusCode = err.status || 500

  res.status(statusCode).json({
    error: {
      message: err.message,
    },
  })
}

function formatErrorStack(err: Error): string | undefined {
  return err.stack
    ?.split('\n')
    ?.map((line) => line.trim())
    ?.join('\n')
}

export default applyMiddleware
