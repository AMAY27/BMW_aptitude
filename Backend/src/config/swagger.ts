import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

export const setupSwagger = (app: Express) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const swaggerPath = path.join(__dirname, './swagger.json');
  const swaggerSpec = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

