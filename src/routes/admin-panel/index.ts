import { Router } from 'express';
import { Request, Response } from 'express';
import path from 'path';
const viewsDir = path.join(__dirname, '../../public/admin/views');

const baseRouter = Router();

/***********************************************************************************
 *                                  Front-end routes
 **********************************************************************************/
baseRouter.get('/', (_: Request, res: Response) => {
    res.redirect('/admin/login')
});

//***********Login Page*************//
baseRouter.get('/login', (_: Request, res: Response) => {
    res.sendFile('auth/login.html', { root: viewsDir });
});



export default baseRouter;