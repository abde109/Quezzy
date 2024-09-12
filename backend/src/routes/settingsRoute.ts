import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';

const settingsRoutes = express();

settingsRoutes.get('/', getSettings);
settingsRoutes.post('/', updateSettings);

export default settingsRoutes;