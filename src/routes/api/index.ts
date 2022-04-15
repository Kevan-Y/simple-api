import express from 'express';

import * as get from './get';

const router = express.Router();

// Define GET /v1/ping
router.get('/ping', get.pong);

export { router };
