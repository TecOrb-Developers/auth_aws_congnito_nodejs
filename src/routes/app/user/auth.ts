import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import userAuthController from '@controllers/user/auth';
import { success } from '@constants';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    login: '/login',
    signUp: '/sign-up',
    check: '/check-account'
   

} as const;

/**
 * User SignUp
 */
router.post(p.signUp,  async (req: Request, res: Response) => {
    const data = await userAuthController.signUp(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.signupSuccessful});
});

/**
 * Mark account Verified
 */
router.post(p.check,  async (req: Request, res: Response) => {
    const data = await userAuthController.checkAccount(req.body);
    return res.status(OK).send({ data, code: OK, message: data.isUser ? success.en.accountExists: success.en.noSuchAccountExist });
});

/**
 * User Login
 */
router.post(p.login, async (req: Request, res: Response) => {
    const data = await userAuthController.login(req.body);
    return res.status(OK).send({ data, code: OK, message: success.en.loginSuccessful });
});


// Export default
export default router;
