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

/**@desc sends email otp to user email*/
export const sendEmailOTP = async (user_email: string, otp: string) : Promise<Boolean>=> {
  try {
    const emailOTPTemplate = readFileSync(path.join(templateDir, 'Verify-otp-email.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailOTPTemplate);
    const mailSent: any = await mailTransporter.sendMail({
      from: `"📚 Keeper." ${process.env.EMAIL_FROM as string}`,
      to: user_email,
      subject: '🔒 Verify Email OTP || Keeper',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL as string,
        email_otp: otp,
        support_email: process.env.EMAIL_FROM as string,
      }),
    });
    if(!mailSent){
      return new Promise<Boolean>((resolve)=>{
        resolve(false);
      });
    }
    return new Promise<Boolean>((resolve)=>{
      resolve(true);
    });
  } catch (error) {
    console.log(`❌ Unable to send welcome email to the user (${user_email})`);
    return new Promise<Boolean>((resolve)=>{
      resolve(false);
    });
  }
};

/**@desc sends email subscription event with relevant info to user's email*/
export const sendEmailSubsMail = async (user_email: string, subPD: string) : Promise<Boolean>=> {
  try {
    const emailSubsTemplate = readFileSync(path.join(templateDir, 'Subsc-custom-email.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailSubsTemplate);
    const mailSent: any = await mailTransporter.sendMail({
      from: `"📚 Keeper." ${process.env.EMAIL_FROM as string}`,
      to: user_email,
      subject: '📝 Email Subscription || Keeper',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL as string,
        subsc_pd: subPD,
        support_email: process.env.EMAIL_FROM as string,
      }),
    });
    if(!mailSent){
      return new Promise<Boolean>((resolve)=>{
        resolve(false);
      });
    }
    return new Promise<Boolean>((resolve)=>{
      resolve(true);
    });
  } catch (error) {
    console.log(`❌ Unable to send subscription email to the user (${user_email})`);
    return new Promise<Boolean>((resolve)=>{
      resolve(false);
    });
  }
};

/**@desc sends bug report submitted by user to support/dev mail*/
export const sendBugReportMail = async (user_email: string, reportPD: string) : Promise<Boolean>=> {
  try {
    const emailReportTemplate = readFileSync(path.join(templateDir, 'Bug-report-email.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailReportTemplate);
    const mailSent: any = await mailTransporter.sendMail({
      from: `"📚 Keeper." ${process.env.EMAIL_FROM as string}`,
      to: process.env.EMAIL_FROM as string,
      subject: `🎈 Bug Report [by- ${user_email}] || Keeper`,
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL as string,
        bugreport: reportPD,
      }),
    });
    if(!mailSent){
      return new Promise<Boolean>((resolve)=>{
        resolve(false);
      });
    }
    return new Promise<Boolean>((resolve)=>{
      resolve(true);
    });
  } catch (error) {
    console.log(`❌ Unable to send bug report to support/dev team`);
    return new Promise<Boolean>((resolve)=>{
      resolve(false);
    });
  }
};