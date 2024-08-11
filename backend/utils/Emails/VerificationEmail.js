import generateEmailTemplate from "../generateEmailTemplate.js";
import sendEmail from "../sendEmail.js";

export const sendSignUpEmail = async(name,email,token)=>{
    const signUpMessage = generateEmailTemplate('signup', {
        name,
        token
    });

    await sendEmail({
        email,
        subject: 'Email Verification',
        message: `Your verification code is ${token}. Please use this code to verify your account.`, // Text content
        html: signUpMessage  // HTML content
    });
}


export const sendVerificationEmail=async(name,email)=>{
    
    const verificationMessage = generateEmailTemplate('Welcome',{
        name,
        email

    })

    await sendEmail({
        email,
        subject:'Welcome',
        message:'Welcome to RUNO',
        html:verificationMessage
    })

}


export const  sendPasswordResetEmail = async(name,email,url)=>{
    console.log(url);
    const resetMessage = generateEmailTemplate('Reset',{
        name,
        email,
        url

    })

    await sendEmail({
        email,
        subject:'Reset Password',
        message:'Reset Password Request',
        html:resetMessage
    })


}
