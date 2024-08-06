const generateEmailTemplate = (type, data) => {
    switch (type) {
        case 'verification':
            return `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="background-color: #f2f2f2; padding: 10px;">Welcome to RUNO </h2>
                    <p>Hi ${data.name},</p>
                    <p>Thank you for signing up. Please use the following verification code to verify your email address:</p>
                    <h3 style="color: #4CAF50;">${data.token}</h3>
                    <p>If you did not sign up for this account, please ignore this email.</p>
                    <p>Best regards,</p>
                    <p>RUNO Dev Team</p>
                    <hr />
                    <footer style="text-align: center; font-size: 12px; color: #aaa;">
                        <p>&copy; ${new Date().getFullYear()} RUNO. All rights reserved.</p>
                        <p>Runo developers, Lahore, Punjab, Pakistan</p>
                    </footer>
                </div>
            `;
        // Add other cases for different email types
        default:
            return '<div>Hello</div>';
    }
};

export default generateEmailTemplate;

