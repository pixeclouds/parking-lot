exports.getMailTemplate = (firstname, link) => {

    let template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Email Confirmation</title>
        <style>
            /* Add your email styles here */
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                font-size: 16px;
                color: #333333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 40px;
                background-color: #f2f2f2;
            }
            .logo {
                display: block;
                margin: 0 0 20px 0;
                text-align: center;
                font-size: 36px;
                font-weight: bold;
                color: #007bff;
            }
            .greeting {
                margin: 0 0 20px 0;
                font-size: 18px;
                font-weight: bold;
                text-align: left;
            }
            .message {
                margin: 0 0 20px 0;
                font-size: 16px;
                line-height: 1.5;
                text-align: left;
            }
            .button {
                display: block;
                padding: 12px 18px;
                margin: 0 auto;
                text-align: center;
                background-color: #007bff;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <span class="logo">ParkiT</span>
            <p class="greeting">Hi ${firstname},</p>
            <p class="message">Welcome to ParkiT. To complete your sign up, please verify your email.</p>
            <form method="GET" action="${link}">
                <button class="button" type="submit">Verify Email</button>
            </form>
        </div>
    </body>
    </html>`

    return template
}


