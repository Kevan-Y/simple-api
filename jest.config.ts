import path from 'path';
import dotenv from 'dotenv';

const envFile = path.join(__dirname, 'env.jest');

dotenv.config({ path: envFile });

console.log(`Using LOG_LEVEL=${process.env.LOG_LEVEL}. Use 'debug' in env.jest for more detail`);

export default {
  verbose: true,
  testTimeout: 5000,
};
