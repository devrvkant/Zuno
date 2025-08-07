export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - Zuno</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: oklch(0.985 0 0);
      background-color: oklch(0.141 0.005 285.823);
      margin: 0;
      padding: 20px;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: oklch(0.21 0.006 285.885);
      border-radius: 0.625rem;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      border: 1px solid oklch(1 0 0 / 10%);
    }
    
    .header {
      background: linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.29 0.012 265));
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 50%, oklch(0.488 0.243 264.376) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, oklch(0.29 0.012 265) 0%, transparent 50%);
      opacity: 0.3;
    }
    
    .logo {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
      position: relative;
      z-index: 1;
    }
    
    .header-subtitle {
      font-size: 16px;
      opacity: 0.9;
      font-weight: 300;
      position: relative;
      z-index: 1;
    }
    
    .content {
      padding: 40px 30px;
      background-color: oklch(0.21 0.006 285.885);
    }
    
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: oklch(0.985 0 0);
    }
    
    .message {
      font-size: 16px;
      color: oklch(0.705 0.015 286.067);
      margin-bottom: 30px;
      line-height: 1.8;
    }
    
    .verification-section {
      background: linear-gradient(135deg, oklch(0.274 0.006 286.033), oklch(0.21 0.006 285.885));
      border-radius: 0.625rem;
      padding: 30px;
      margin: 30px 0;
      text-align: center;
      border: 1px solid oklch(1 0 0 / 10%);
    }
    
    .verification-label {
      font-size: 14px;
      color: oklch(0.705 0.015 286.067);
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .verification-code {
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 8px;
      color: oklch(0.92 0.004 286.32);
      background: linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.29 0.012 265));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 20px oklch(0.488 0.243 264.376 / 30%);
      margin: 10px 0;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }
    
    .expiry-notice {
      background-color: oklch(0.274 0.006 286.033);
      border-radius: 0.625rem;
      padding: 20px;
      margin: 25px 0;
      border-left: 4px solid oklch(0.488 0.243 264.376);
    }
    
    .expiry-notice .icon {
      font-size: 20px;
      margin-right: 10px;
    }
    
    .security-note {
      font-size: 14px;
      color: oklch(0.705 0.015 286.067);
      margin-top: 25px;
      padding: 15px;
      background-color: oklch(0.274 0.006 286.033);
      border-radius: 0.625rem;
    }
    
    .footer {
      background-color: oklch(0.274 0.006 286.033);
      padding: 25px 30px;
      text-align: center;
      border-top: 1px solid oklch(1 0 0 / 10%);
    }
    
    .footer-text {
      font-size: 14px;
      color: oklch(0.705 0.015 286.067);
    }
    
    .brand-signature {
      margin-top: 20px;
      font-weight: 600;
      color: oklch(0.985 0 0);
    }
    
    @media (max-width: 640px) {
      body {
        padding: 10px;
      }
      
      .email-container {
        border-radius: 0;
        margin: 0;
      }
      
      .header, .content, .footer {
        padding: 25px 20px;
      }
      
      .logo {
        font-size: 24px;
      }
      
      .verification-code {
        font-size: 28px;
        letter-spacing: 6px;
      }
      
      .verification-section {
        padding: 20px;
      }
    }
    
    @media (max-width: 480px) {
      .verification-code {
        font-size: 24px;
        letter-spacing: 4px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <div class="logo">Zuno</div>
      <div class="header-subtitle">Secure Email Verification</div>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <p class="greeting">Hello there!</p>
      
      <p class="message">
        Thank you for signing up for Zuno! To complete your account setup and ensure the security of your account, 
        please verify your email address using the verification code below.
      </p>
      
      <div class="verification-section">
        <div class="verification-label">Your Verification Code</div>
        <div class="verification-code">{verificationCode}</div>
      </div>
      
      <div class="expiry-notice">
        <span class="icon">⏰</span>
        <strong>Important:</strong> This verification code will expire in 15 minutes for security reasons.
      </div>
      
      <p class="message">
        Simply enter this code on the verification page to complete your registration and start using Zuno.
      </p>
      
      <div class="security-note">
        <strong>Security Notice:</strong> If you didn't create an account with Zuno, please ignore this email. 
        Your email address will not be added to our system without verification.
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        This is an automated security message. Please do not reply to this email.
      </p>
      <div class="brand-signature">
        The Zuno Team
      </div>
    </div>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to {{COMPANY_NAME}}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: oklch(0.985 0 0);
            background-color: oklch(0.141 0.005 285.823);
            margin: 0;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: oklch(0.21 0.006 285.885);
            border-radius: 0.625rem;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            border: 1px solid oklch(1 0 0 / 10%);
        }
        
        .header {
            background: linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.29 0.012 265));
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 40%, oklch(0.488 0.243 264.376) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, oklch(0.29 0.012 265) 0%, transparent 50%);
            opacity: 0.4;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
        }
        
        .header-subtitle {
            font-size: 18px;
            opacity: 0.9;
            font-weight: 300;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 40px 30px;
            background-color: oklch(0.21 0.006 285.885);
        }
        
        .welcome-title {
            font-size: 28px;
            font-weight: 600;
            color: oklch(0.985 0 0);
            margin-bottom: 20px;
            text-align: center;
        }
        
        .welcome-message {
            font-size: 16px;
            color: oklch(0.705 0.015 286.067);
            margin-bottom: 30px;
            text-align: center;
            line-height: 1.8;
        }
        
        .features {
            background: linear-gradient(135deg, oklch(0.274 0.006 286.033), oklch(0.21 0.006 285.885));
            border-radius: 0.625rem;
            padding: 30px;
            margin: 30px 0;
            border: 1px solid oklch(1 0 0 / 10%);
        }
        
        .features-title {
            font-size: 20px;
            font-weight: 600;
            color: oklch(0.985 0 0);
            margin-bottom: 20px;
            text-align: center;
        }
        
        .feature-list {
            list-style: none;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            font-size: 16px;
            color: oklch(0.705 0.015 286.067);
        }
        
        .feature-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.29 0.012 265));
            border-radius: 50%;
            margin-right: 15px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px oklch(0.488 0.243 264.376 / 30%);
        }
        
        .feature-icon::after {
            content: "✓";
            color: white;
            font-size: 12px;
            font-weight: bold;
        }
        
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.29 0.012 265));
            color: oklch(0.985 0 0);
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 0.625rem;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px oklch(0.488 0.243 264.376 / 30%);
            border: 1px solid oklch(1 0 0 / 10%);
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px oklch(0.488 0.243 264.376 / 40%);
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, oklch(1 0 0 / 10%), transparent);
            margin: 30px 0;
        }
        
        .closing-message {
            background-color: oklch(0.274 0.006 286.033);
            border-radius: 0.625rem;
            padding: 25px;
            margin: 25px 0;
            border-left: 4px solid oklch(0.488 0.243 264.376);
        }
        
        .footer {
            background-color: oklch(0.274 0.006 286.033);
            padding: 30px;
            text-align: center;
            border-top: 1px solid oklch(1 0 0 / 10%);
        }
        
        .footer-text {
            font-size: 14px;
            color: oklch(0.705 0.015 286.067);
            margin-bottom: 15px;
        }
        
        .brand-signature {
            margin-top: 20px;
            font-weight: 600;
            color: oklch(0.985 0 0);
            font-size: 16px;
        }
        
        @media (max-width: 640px) {
            body {
                padding: 10px;
            }
            
            .email-container {
                border-radius: 0;
                margin: 0;
            }
            
            .header, .content, .footer {
                padding: 25px 20px;
            }
            
            .logo {
                font-size: 24px;
            }
            
            .welcome-title {
                font-size: 22px;
            }
            
            .cta-button {
                padding: 14px 28px;
                font-size: 14px;
            }
            
            .features {
                padding: 20px;
            }
        }
        
        @media (max-width: 480px) {
            .welcome-title {
                font-size: 20px;
            }
            
            .feature-item {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">{{COMPANY_NAME}}</div>
            <div class="header-subtitle">Welcome to the family!</div>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <h1 class="welcome-title">🎉 Welcome aboard, {{USER_NAME}}!</h1>
            
            <p class="welcome-message">
                Thank you for creating your account with {{COMPANY_NAME}}! We're thrilled to have you join our community. 
                Your email has been successfully verified, and you're all set to explore everything we have to offer.
            </p>
            
            <div class="features">
                <h3 class="features-title">What's next?</h3>
                <ul class="feature-list">
                    <li class="feature-item">
                        <div class="feature-icon"></div>
                        <span>Explore and start using our powerful web application</span>
                    </li>
                    <li class="feature-item">
                        <div class="feature-icon"></div>
                        <span>Connect with others and discover amazing features</span>
                    </li>
                    <li class="feature-item">
                        <div class="feature-icon"></div>
                        <span>Need help? Reach out to us at <strong>{{SUPPORT_EMAIL}}</strong></span>
                    </li>
                </ul>
            </div>
            
            <div class="cta-section">
                <a href="{{APP_URL}}" class="cta-button">Get Started Now</a>
            </div>
            
            <div class="divider"></div>
            
            <div class="closing-message">
                <p class="welcome-message">
                    If you have any questions or need help getting started, don't hesitate to reach out to our support team. 
                    We're here to make your experience with {{COMPANY_NAME}} as smooth and enjoyable as possible.
                </p>
                
                <p class="welcome-message">
                    <strong>Best regards,</strong><br>
                    The {{COMPANY_NAME}} Team
                </p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                You're receiving this email because you recently created an account with {{COMPANY_NAME}}.
            </p>
            
            <div class="brand-signature">
                The {{COMPANY_NAME}} Team
            </div>
        </div>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful - Zuno</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: oklch(0.985 0 0);
      background-color: oklch(0.141 0.005 285.823);
      margin: 0;
      padding: 20px;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: oklch(0.21 0.006 285.885);
      border-radius: 0.625rem;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      border: 1px solid oklch(1 0 0 / 10%);
    }
    
    .header {
      background: linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.29 0.012 265));
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 50%, oklch(0.488 0.243 264.376) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, oklch(0.29 0.012 265) 0%, transparent 50%);
      opacity: 0.3;
    }
    
    .logo {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
      position: relative;
      z-index: 1;
    }
    
    .header-subtitle {
      font-size: 16px;
      opacity: 0.9;
      font-weight: 300;
      position: relative;
      z-index: 1;
    }
    
    .content {
      padding: 40px 30px;
      background-color: oklch(0.21 0.006 285.885);
    }
    
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: oklch(0.985 0 0);
    }
    
    .message {
      font-size: 16px;
      color: oklch(0.705 0.015 286.067);
      margin-bottom: 30px;
      line-height: 1.8;
    }
    
    .success-section {
      background: linear-gradient(135deg, oklch(0.26 0.013 105), oklch(0.21 0.006 285.885));
      border-radius: 0.625rem;
      padding: 30px;
      margin: 30px 0;
      text-align: center;
      border: 1px solid oklch(1 0 0 / 10%);
    }
    
    .success-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, oklch(0.26 0.013 105), oklch(0.488 0.243 264.376));
      color: oklch(0.985 0 0);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin-bottom: 20px;
      box-shadow: 0 0 20px oklch(0.26 0.013 105 / 30%);
    }
    
    .success-title {
      font-size: 24px;
      font-weight: 600;
      color: oklch(0.985 0 0);
      margin-bottom: 10px;
    }
    
    .success-message {
      color: oklch(0.705 0.015 286.067);
      font-size: 16px;
    }
    
    .security-tips {
      background-color: oklch(0.274 0.006 286.033);
      border-radius: 0.625rem;
      padding: 25px;
      margin: 25px 0;
      border-left: 4px solid oklch(0.488 0.243 264.376);
    }
    
    .security-tips h3 {
      color: oklch(0.985 0 0);
      margin-bottom: 15px;
      font-size: 18px;
    }
    
    .security-tips ul {
      list-style: none;
      padding: 0;
    }
    
    .security-tips li {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: oklch(0.705 0.015 286.067);
    }
    
    .security-tips li::before {
      content: "🔒";
      margin-right: 10px;
      font-size: 14px;
    }
    
    .warning-notice {
      background-color: oklch(0.704 0.191 22.216 / 10%);
      border: 1px solid oklch(0.704 0.191 22.216 / 30%);
      border-radius: 0.625rem;
      padding: 20px;
      margin: 25px 0;
    }
    
    .warning-notice .icon {
      font-size: 20px;
      margin-right: 10px;
    }
    
    .footer {
      background-color: oklch(0.274 0.006 286.033);
      padding: 25px 30px;
      text-align: center;
      border-top: 1px solid oklch(1 0 0 / 10%);
    }
    
    .footer-text {
      font-size: 14px;
      color: oklch(0.705 0.015 286.067);
    }
    
    .brand-signature {
      margin-top: 20px;
      font-weight: 600;
      color: oklch(0.985 0 0);
    }
    
    @media (max-width: 640px) {
      body {
        padding: 10px;
      }
      
      .email-container {
        border-radius: 0;
        margin: 0;
      }
      
      .header, .content, .footer {
        padding: 25px 20px;
      }
      
      .logo {
        font-size: 24px;
      }
      
      .success-icon {
        width: 50px;
        height: 50px;
        font-size: 24px;
      }
      
      .success-title {
        font-size: 20px;
      }
      
      .security-tips {
        padding: 20px;
      }
    }
    
    @media (max-width: 480px) {
      .success-section {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <div class="logo">Zuno</div>
      <div class="header-subtitle">Security Confirmation</div>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <p class="greeting">Hello there!</p>
      
      <p class="message">
        We're writing to confirm that your password has been successfully reset for your Zuno account.
      </p>
      
      <div class="success-section">
        <div class="success-icon">✓</div>
        <div class="success-title">Password Reset Complete</div>
        <div class="success-message">
          Your account is now secured with your new password.
        </div>
      </div>
      
      <div class="warning-notice">
        <span class="icon">⚠️</span>
        <strong>Important:</strong> If you did not initiate this password reset, please contact our support team immediately.
      </div>
      
      <div class="security-tips">
        <h3>Security Recommendations</h3>
        <ul>
          <li>Use a strong, unique password that you haven't used elsewhere</li>
          <li>Enable two-factor authentication if available</li>
          <li>Avoid using the same password across multiple sites</li>
          <li>Consider using a password manager for better security</li>
        </ul>
      </div>
      
      <p class="message">
        Thank you for helping us keep your Zuno account secure. If you have any questions or concerns, 
        don't hesitate to reach out to our support team.
      </p>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        This is an automated security message. Please do not reply to this email.
      </p>
      <div class="brand-signature">
        The Zuno Team
      </div>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Zuno</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: oklch(0.985 0 0);
      background-color: oklch(0.141 0.005 285.823);
      margin: 0;
      padding: 20px;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: oklch(0.21 0.006 285.885);
      border-radius: 0.625rem;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      border: 1px solid oklch(1 0 0 / 10%);
    }
    
    .header {
      background: linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.29 0.012 265));
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 50%, oklch(0.488 0.243 264.376) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, oklch(0.29 0.012 265) 0%, transparent 50%);
      opacity: 0.3;
    }
    
    .logo {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
      position: relative;
      z-index: 1;
    }
    
    .header-subtitle {
      font-size: 16px;
      opacity: 0.9;
      font-weight: 300;
      position: relative;
      z-index: 1;
    }
    
    .content {
      padding: 40px 30px;
      background-color: oklch(0.21 0.006 285.885);
    }
    
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: oklch(0.985 0 0);
    }
    
    .message {
      font-size: 16px;
      color: oklch(0.705 0.015 286.067);
      margin-bottom: 30px;
      line-height: 1.8;
    }
    
    .reset-section {
      background: linear-gradient(135deg, oklch(0.274 0.006 286.033), oklch(0.21 0.006 285.885));
      border-radius: 0.625rem;
      padding: 30px;
      margin: 30px 0;
      text-align: center;
      border: 1px solid oklch(1 0 0 / 10%);
    }
    
    .reset-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.29 0.012 265));
      color: oklch(0.985 0 0);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin-bottom: 20px;
      box-shadow: 0 0 20px oklch(0.488 0.243 264.376 / 30%);
    }
    
    .reset-button {
      display: inline-block;
      background: linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.29 0.012 265));
      color: oklch(0.985 0 0);
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 0.625rem;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px oklch(0.488 0.243 264.376 / 30%);
      border: 1px solid oklch(1 0 0 / 10%);
      margin: 10px 0;
    }
    
    .reset-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px oklch(0.488 0.243 264.376 / 40%);
    }
    
    .expiry-notice {
      background-color: oklch(0.274 0.006 286.033);
      border-radius: 0.625rem;
      padding: 20px;
      margin: 25px 0;
      border-left: 4px solid oklch(0.704 0.191 22.216);
    }
    
    .expiry-notice .icon {
      font-size: 20px;
      margin-right: 10px;
    }
    
    .alternative-section {
      background-color: oklch(0.274 0.006 286.033);
      border-radius: 0.625rem;
      padding: 20px;
      margin: 25px 0;
      border: 1px solid oklch(1 0 0 / 10%);
    }
    
    .alternative-section h3 {
      color: oklch(0.985 0 0);
      margin-bottom: 10px;
      font-size: 16px;
    }
    
    .alternative-section p {
      color: oklch(0.705 0.015 286.067);
      font-size: 14px;
      word-break: break-all;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      background-color: oklch(0.21 0.006 285.885);
      padding: 10px;
      border-radius: 0.325rem;
      border: 1px solid oklch(1 0 0 / 10%);
    }
    
    .security-note {
      background-color: oklch(0.274 0.006 286.033);
      border-radius: 0.625rem;
      padding: 20px;
      margin: 25px 0;
      border-left: 4px solid oklch(0.488 0.243 264.376);
    }
    
    .footer {
      background-color: oklch(0.274 0.006 286.033);
      padding: 25px 30px;
      text-align: center;
      border-top: 1px solid oklch(1 0 0 / 10%);
    }
    
    .footer-text {
      font-size: 14px;
      color: oklch(0.705 0.015 286.067);
    }
    
    .brand-signature {
      margin-top: 20px;
      font-weight: 600;
      color: oklch(0.985 0 0);
    }
    
    @media (max-width: 640px) {
      body {
        padding: 10px;
      }
      
      .email-container {
        border-radius: 0;
        margin: 0;
      }
      
      .header, .content, .footer {
        padding: 25px 20px;
      }
      
      .logo {
        font-size: 24px;
      }
      
      .reset-icon {
        width: 50px;
        height: 50px;
        font-size: 24px;
      }
      
      .reset-button {
        padding: 14px 28px;
        font-size: 14px;
      }
      
      .reset-section {
        padding: 20px;
      }
    }
    
    @media (max-width: 480px) {
      .reset-section {
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <div class="logo">Zuno</div>
      <div class="header-subtitle">Password Reset Request</div>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <p class="greeting">Hello there!</p>
      
      <p class="message">
        We received a request to reset your password for your Zuno account. If you didn't make this request, 
        you can safely ignore this email and your password will remain unchanged.
      </p>
      
      <div class="reset-section">
        <div class="reset-icon">🔑</div>
        <p class="message">
          To reset your password, click the button below:
        </p>
        <a href="{resetURL}" class="reset-button">Reset My Password</a>
      </div>
      
      <div class="expiry-notice">
        <span class="icon">⏰</span>
        <strong>Important:</strong> This password reset link will expire in 1 hour for security reasons.
      </div>
      
      <div class="alternative-section">
        <h3>Having trouble with the button?</h3>
        <p>Copy and paste this link into your browser:</p>
        <p>{resetURL}</p>
      </div>
      
      <div class="security-note">
        <strong>Security Note:</strong> If you believe your account has been compromised or if you continue 
        to receive unwanted password reset emails, please contact our support team immediately.
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        This is an automated security message. Please do not reply to this email.
      </p>
      <div class="brand-signature">
        The Zuno Team
      </div>
    </div>
  </div>
</body>
</html>
`;
