import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'HH:mm:ss' }),
        format.printf(({ timestamp, level, method, message, path, body, params, query }) => {
          return `[${timestamp}] ${level} ${method} ${path} (body: ${JSON.stringify(body)} ; params: ${JSON.stringify(
            params
          )} ; query: ${JSON.stringify(query)}) : ${message}`;
        })
      )
    })
  ]
});

export const infoLogger = ({ method, path, body, params, query }, _res, next) => {
  logger.info('', { method, path, body, params, query });
  next();
};

export const errorLogger = (
  { statusCode = 500, message = 'Internal Server Error' },
  { method, path, body, params, query },
  res,
  next
) => {
  logger.error(message, { method, path, body, params, query });
  res.status(statusCode).send({ error: message });
  next();
};

export const exceptionLogger = (message, error) => {
  logger.error(message, error);
};
