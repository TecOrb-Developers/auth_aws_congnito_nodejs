import { Router } from 'express';
import userRoute from './user';


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/user', userRoute)

// Export default.
export default baseRouter;
