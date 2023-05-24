import { Router } from 'express';

import authRoute from './auth';
import cognitoAuthROute from './cognito';



// Export the base-router

const baseRouter = Router();

// Setup routers
baseRouter.use('/auth', authRoute)
baseRouter.use('/cognito', cognitoAuthROute)


// Export default.
export default baseRouter;