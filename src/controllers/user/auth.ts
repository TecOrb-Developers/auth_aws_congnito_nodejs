import { userModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
const jwt = require('jsonwebtoken');
import { errors } from '@constants';
const _ = require('lodash');

/**
 * user SignUp
 * 
 * @param user 
 * @returns 
 */
function signUp(user: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { role } = user;
            const userData: any = await userModel.create(user)
            const token: string = jwt.sign({
                id: userData.id,
                role,
                userId: userData._id
            }, process.env.JWT_SECRET_TOKEN, { expiresIn: '30d' })

            resolve({
                token,
                name: userData.name,
                email: userData.email,
                _id: userData._id
            })
        } catch (err) {
            console.log(err)
            if (err.code == 11000) {
                reject(new CustomError(errors.en.accountAlreadyExist, StatusCodes.BAD_REQUEST))
            }
            reject(err)
        }
    });
}

/**
 * user signIn.
 * @returns 
 */
function login(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { phoneNumber, countryCode, role } = body;
            const userData: any = await userModel.findOne({
                phoneNumber,
                countryCode,
                role
            })
            if (!userData) {
                reject(new CustomError(errors.en.noSuchAccountExist, StatusCodes.BAD_REQUEST))
            } else if (!userData.isPhoneVerified) {
                if (role == 'Role')
                    reject(new CustomError(errors.en.accountUnverified, StatusCodes.UNAUTHORIZED))
                else
                    reject(new CustomError(errors.en.accountUnverifiedAdmin, StatusCodes.UNAUTHORIZED))
            }
            if (userData.isActive == false) {
                reject(new CustomError(errors.en.accountBlocked, StatusCodes.UNAUTHORIZED))
            }

            const token: string = jwt.sign({
                id: userData.id,
                role
            }, process.env.JWT_SECRET_TOKEN, { expiresIn: '30d' })
            resolve({
                token,
                name: userData.name,
                image: userData?.image,
                email: userData.email,
                _id: userData._id
            })
        } catch (err) {
            reject(err)
        }
    });
}

/**
 * user Account verification
 * 
 * @param user 
 * @returns 
 */
function checkAccount(user: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { phoneNumber, countryCode, role } = user;
            const userData: any = await userModel.findOne({
                phoneNumber,
                countryCode,
                role
            })
            if (!userData) {
                resolve({
                    isUser: false,

                })
            } else {
                if (userData.isActive) {
                    resolve({
                        isUser: true,
                    })
                } else {
                    reject(new CustomError(errors.en.accountBlocked, StatusCodes.UNAUTHORIZED))
                }
            }
        } catch (err) {
            reject(err)
        }
    });
}




// Export default
export default {
    login,
    signUp,
    checkAccount,

} as const;
