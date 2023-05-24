import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import userCognitoAuthController from '@controllers/user/cognito';
import { success } from '@constants';
import { cognitoverifyAuthToken} from "@utils/cognitoAuth";

console.log(cognitoverifyAuthToken,"auth")

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    signUp: '/signUp',
    resend: '/resend',
    confirm: '/confirm',
    login: '/login',
    forget: '/forget',
    passConfirm:'/passConfirm',
    change :'/change',
    delete:'/delete',
    signout:'/signout',
    list:'/list',
    disable:'/disable',
    refreshSession:'/refreshSession',



} as const;

/**
 * User SignUp
 */
router.post(p.signUp, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.signUp(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message: success.en.signupSuccessful });
});

router.post(p.login, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.login(req.body);
    return res.status(OK).send({ data, code: OK, message: success.en.loginSuccessful });
});

router.post(p.resend, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.resend(req.body);
    return res.status(OK).send({ data, code: OK, message:success.en.successful});
});
router.post(p.confirm, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.confirm(req.body);
    return res.status(OK).send({ data, code: OK, message:success.en.successful});
});
router.post(p.forget, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.forgotPassword(req.body);
    return res.status(OK).send({ data, code: OK, message:success.en.successful});
});
router.post(p.passConfirm, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.resetPassword(req.body);
    return res.status(OK).send({ data, code: OK, message:success.en.successful});
});
router.post(p.change, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.changePassword(req.body);
    return res.status(OK).send({ data, code: OK, message:success.en.successful});
});
router.post(p.delete, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.deleteUser(req.body);
    return res.status(OK).send({ data, code: OK, message:success.en.successful});
});
router.post(p.signout, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.signOut(req.body);
    return res.status(OK).send({ data, code: OK, message:success.en.successful});
});
router.post(p.list, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.userList(req.body);
    return res.status(OK).send({ data, code: OK, message:success.en.successful});
});
router.post(p.disable, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.disableUser(req.body);
    return res.status(OK).send({ data, code: OK, message:success.en.successful});
});
router.post(p.refreshSession, async (req: Request, res: Response) => {
    const data = await userCognitoAuthController.refreshSession(req.body);
    return res.status(OK).send({ data, code: OK, message:success.en.successful});
});
// Export default
export default router;
