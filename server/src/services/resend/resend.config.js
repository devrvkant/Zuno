import { Resend } from "resend";

import { config } from "../../config/env.js";

const senderEmail = config.senderEmail;
const senderName = "Zuno";  // App name

export const sender = `${senderName} <${senderEmail}>`;

export const resend = new Resend(config.resendApiKey);
