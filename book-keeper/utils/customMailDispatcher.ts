import Handlebars from 'handlebars';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import mailTransporter from './reusableMailTransporter';

/**pick up custom email templates from project dir in email-templates dir */
const templateDir: string = path.resolve(process.cwd(), 'email-templates');

/**@desc grab email template & compile with handlebars and dispatched confirm email with dynamic data to user */
export const sendVerificationRequest = ({ identifier, url }: any) => {
  const emailFile = readFileSync(path.join(templateDir, 'Sign-in-email.html'), {
    encoding: 'utf8',
  });
  const emailTemplate: any = Handlebars.compile(emailFile);
  mailTransporter.sendMail({
    from: `"📚 Keeper." ${process.env.EMAIL_FROM as string}`,
    to: identifier,
    subject: 'Your sign-in link for Keeper.',
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL as string,
      signin_url: url,
      email: identifier,
    }),
  });
};

/**@desc welcome email to user watchin newUser event in next-auth config when the sign in via magic email link/oauth google or github as a new user is created automatically */
export const sendWelcomeEmail = async ({ user }: any) => {
    const { email } = user;
  
    try {
      const welcomeTemplate = readFileSync(path.join(templateDir, 'Welcome-user-email.html'), {
        encoding: 'utf8',
      });
      const emailTemplate = Handlebars.compile(welcomeTemplate);
      await mailTransporter.sendMail({
        from: `"📚 Keeper." ${process.env.EMAIL_FROM as string}`,
        to: email,
        subject: 'Welcome to Keeper! 🎉',
        html: emailTemplate({
          base_url: process.env.NEXTAUTH_URL as string,
          support_email: process.env.EMAIL_FROM as string,
        }),
      });
    } catch (error) {
      console.log(`❌ Unable to send welcome email to user (${email})`);
    }
  };