import { createServer } from 'http';
import app from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 5000;

const server = createServer(app);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
