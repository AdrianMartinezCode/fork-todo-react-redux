import * as logger from './logger-service';
import * as todos from './todos-api-client';
import * as mappers from './mappers/currencies.mappers';

export default {
  logger,
  api: {
    todos,
  },
  mappers,
};
