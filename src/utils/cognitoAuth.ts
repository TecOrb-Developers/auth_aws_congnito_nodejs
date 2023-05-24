import StatusCodes from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { errors } from '@constants'
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { cognitoConfig } from '../controllers/cognitoConfig';

const cognito = new CognitoIdentityServiceProvider({ region: cognitoConfig.region });

const cognitoverifyAuthToken = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: errors.en.noToken,
            message: errors.en.noToken,
            code: StatusCodes.UNAUTHORIZED
        })
    }

    const params = {
        AccessToken: token,
    };

    cognito.getUser(params, (err, data) => {
        if (err) {
            console.error('Error verifying access token:', err);
            return res.status(401).json({ error: 'Invalid access token' });
        }

        // Store the user data in the request object for further processing
        req.user = data.UserAttributes;
        next();
    });
}



export {
    cognitoverifyAuthToken,

}