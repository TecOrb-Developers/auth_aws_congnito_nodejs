import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { errors } from '@constants';
import { cognitoConfig } from '../cognitoConfig';

const cognito = new CognitoIdentityServiceProvider({ region: cognitoConfig.region });


function signUp(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password, name, phoneNumber } = body;
            console.log(body,"body")
            const params = {
                ClientId: cognitoConfig.clientId,
                Username: email,
                Password: password,
                UserAttributes: [{ Name: 'name', Value: name }, { Name: 'phone_number', Value: "+916678756778" }]
            };
            const response = await cognito.signUp(params).promise();
            console.log('User signed up successfully:', response);
            resolve({ result: response })
        } catch (err) {
            console.error('Error signing up:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}

function resend(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { email } = body;
            const params = {
                ClientId: cognitoConfig.clientId,
                Username: email,
            };
            const response = await cognito.resendConfirmationCode(params).promise();
            console.log('Verification code resent successfully:', response);
            resolve({ result: response })
        } catch (err) {
            console.error('verification code resent error:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}
function confirm(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, code } = body;
            const params = {
                ClientId: cognitoConfig.clientId,
                ConfirmationCode: code,
                Username: email,
            };
            cognito.confirmSignUp(params, (err, data) => {
                if (err) {
                    console.error('Error confirming verification code:', err);
                    reject({ result: err })
                } else {
                    console.log('Verification code confirmed successfully:', data);
                    resolve({ result: data })
                }
            });
        } catch (err) {
            console.error('verification code resent error:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}
function login(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = body;
            const params = {
                AuthFlow: 'USER_PASSWORD_AUTH',   //USER_SRP_AUTH ,USER_PASSWORD_AUTH
                ClientId: cognitoConfig.clientId,
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password,
                },
            };
            const response:any = await cognito.initiateAuth(params).promise();
           // console.log('User authenticated successfully:', response);
            resolve({ result: response })
        } catch (err) {
            console.error('user login error:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}
function forgotPassword(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { email } = body;
            const params = {
                ClientId: cognitoConfig.clientId,
                Username: email,
            };
            const response = await cognito.forgotPassword(params).promise();
            console.log('Forgot password flow initiated successfully:', response);
            resolve({ result: response })
        } catch (err) {
            console.error('Forget password  error:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}

function resetPassword(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, code, newPassword } = body;
            const params = {
                ClientId: cognitoConfig.clientId,
                Username: email,
                ConfirmationCode: code,
                Password: newPassword,
            };
            cognito.confirmForgotPassword(params, (err, data) => {
                if (err) {
                    console.error('Error resetting password:', err);
                    reject({ result: err })
                } else {
                    console.log('Password reset successfully:', data);
                    resolve({ result: data })
                }
            });
        } catch (err) {
            console.error('Forget password  error:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}


function changePassword(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { oldPassword, newPassword ,token} = body;
            const params = {
                AccessToken:token  ,                 // 'USER_ACCESS_TOKEN',
                PreviousPassword: oldPassword,
                ProposedPassword: newPassword,
            };
            console.log(params,"par")
            const response = await cognito.changePassword(params).promise();
            console.log('Password changed successfully:', response);
            resolve({ result: response })
        } catch (err) {
            console.error('Password change  error:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}

function deleteUser(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { email } = body;
            const params = {
                UserPoolId: cognitoConfig.userPoolId,
                Username: email,
            };
            const response = await cognito.adminDeleteUser(params).promise();
            console.log('User deleted successfully:', response);
            resolve({ result: response })
        } catch (err) {
            console.error('User delete  error:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}

function signOut(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { deviceKey, type ,email} = body;
            const params = {
                UserPoolId: cognitoConfig.userPoolId,
                Username: email,
                DeviceKey: deviceKey,
              };
            const param = {
                UserPoolId: cognitoConfig.userPoolId,
                Username: email,
            };


            if (type === "Single Device") {
                cognito.adminUserGlobalSignOut(params, (err, data) => {
                    if (err) {
                      console.error('Error logging out user from device:', err);
                    } else {
                      console.log('User logged out from device successfully:', data);
                      resolve({ result: data })
                    }
                  });
            } else {
                const response = await cognito.adminUserGlobalSignOut(param).promise();
                console.log('User signed out successfully:', response);
                resolve({ result: response })
            }

        } catch (err) {
            console.error('User global logout  error:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}


function userList(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { pageSize, nextPageToken } = body;
            const params = {
                UserPoolId: cognitoConfig.userPoolId,
                // Limit: pageSize,
                // PaginationToken: nextPageToken,
            };
            const response = await cognito.listUsers(params).promise();
            console.log('Users:', response.Users);

            // // Check if there are more users to fetch
            // if (response.PaginationToken) {
            //   // Call the listUsers function recursively to fetch the next page of users
            //   await listUsers(pageSize, response.PaginationToken);
            // }
            console.log('Users:', response.Users);
            resolve({ result: response })

        } catch (err) {
            console.error('User list  error:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}

function disableUser(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, type } = body;
            const params = {
                UserPoolId: cognitoConfig.userPoolId,
                Username: email,
            };
            if (type === "Active") {
                cognito.adminEnableUser(params, (err, data) => {
                    if (err) {
                        console.error('User Enable error :', err);
                        reject({ result: err })
                    } else {
                        console.log('User Enable  successfully:', data);
                        resolve({ result: data })
                    }
                });
            } else {
                cognito.adminDisableUser(params, (err, data) => {
                    if (err) {
                        console.error('User disabled error :', err);
                        reject({ result: err })
                    } else {
                        console.log('User disabled successfully:', data);
                        resolve({ result: data })
                    }
                });
            }
        } catch (err) {
            console.error('Error disabling user:', err);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}

function refreshSession(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { refreshToken ,accessToken} = body;
            const params = {
                AuthFlow: 'REFRESH_TOKEN',
                ClientId: cognitoConfig.clientId,
                AuthParameters: {
                  REFRESH_TOKEN: refreshToken,
                },
                Session: accessToken,
              };
            
              cognito.initiateAuth(params, (err, data) => {
                if (err) {
                  console.error('Error refreshing session:', err);
                  reject({result:err})
                } else {
                  console.log('Session refreshed successfully:', data.AuthenticationResult);
                  resolve({ result: data.AuthenticationResult })
                }
              });
          
        } catch (err) {
            console.error('User list  error:', err.message);
            reject(new CustomError(err.message, StatusCodes.BAD_REQUEST))
        }
    });
}

// async function updateUserAttributes(username: string, attributes: { Name: string, Value: string }[]) {
//     const params = {
//       UserPoolId: cognitoConfig.userPoolId,
//       Username: username,
//       UserAttributes: attributes,
//     };

//     try {
//       const response = await cognito.adminUpdateUserAttributes(params).promise();
//       console.log('User attributes updated successfully:', response);
//     } catch (error) {
//       console.error('Error updating user attributes:', error);
//     }
//   }

// https://github.com/frsechet/cognito-user-pool/tree/master/src

// Export default
export default {
    signUp,
    resend,
    confirm,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    deleteUser,
    signOut,
    userList,
    disableUser,
    refreshSession

} as const;