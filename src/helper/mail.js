import nodemailer from 'nodemailer';
import { smtpHost, smtpPort, smtpUser, smtpPass } from '../config/const.config.js';
export const mailer = 
nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: smtpUser,
        pass: smtpPass,
    },

});
