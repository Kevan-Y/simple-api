import stoppable from 'stoppable';

import { logger } from './logger';
import { app } from './app';

const port = parseInt(process.env.PORT || '9000', 10);

// Start a server listening on this port
const server = () =>
  stoppable(
    app.listen(port, () => {
      logger.info({ port }, `Server started`);
    })
  );

export { server };
