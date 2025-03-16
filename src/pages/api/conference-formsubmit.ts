import type { APIRoute } from 'astro';

export const prerender = false;
const debug = !true;

import nodemailer from 'nodemailer';

function anyEmpty(...params: string[]) {
	return params.some(val => val == '');
}

export const POST: APIRoute = async context => {
	const form = await context.request.formData();
	const f = (field: string) => form.get(field)?.toString() || '';

	const fullName = f('general-name');
	const email = f('general-email');
	const phone = f('general-phone');
	const organization = f('display-organization') || 'N/A';
	const message = f('general-message');

	if (anyEmpty(fullName, email))
		return new Response('Error 400. Input malformed.', { status: 400 });

	const fromAddr = import.meta.env.MAIL_FROM_ADDR;
	const toAddr = import.meta.env.MAIL_TO_ADDR;

	console.log(form.keys(), JSON.stringify(form.entries()));

	const mailBody = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New General Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333333; background-color: #f5f5f5;">
  <!-- Preheader text (not visible in the email but shows in inbox previews) -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    New general inquiry from ${fullName}
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 0;">

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:rgb(255, 255, 255); color:rgb(0, 0, 0);">
          <tr>
            <td style="padding: 40px 20px 20px 20px; text-align: left;">
                <img src="https://i.ibb.co/fsn4XG9/WCUCC-Logo-2.png" alt="WCUCC-Logo-2" border="0">
              <h1 style="margin: 0; font-size: 50px; font-weight: bold;">General Inquiry</h1>
            </td>
          </tr>
        </table>
        

        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 0 20px 30px 20px; font-size: 18px;">
              <p style="margin-top: 0; margin-bottom: 20px;">General inquiry details:</p>
              

              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                <tr>
                  <td width="40%" style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold;">Name:</td>
                  <td width="60%" style="padding: 10px; border-bottom: 1px solid #eeeeee;">${fullName}</td>
                </tr>
                <tr>
                  <td width="40%" style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold;">Organization:</td>
                  <td width="60%" style="padding: 10px; border-bottom: 1px solid #eeeeee;">${organization}</td>
                </tr>
                <tr>
                  <td width="40%" style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold;">Email:</td>
                  <td width="60%" style="padding: 10px; border-bottom: 1px solid #eeeeee;"><a href="mailto:${email}" style="color: #0055B7; text-decoration: underline;">${email}</a></td>
                </tr>
                <tr>
                  <td width="40%" style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold;">Phone:</td>
                  <td width="60%" style="padding: 10px; border-bottom: 1px solid #eeeeee;">${phone}</td>
                </tr>
              </table>
              

              <div style="margin-top: 20px;">
                <p style="font-weight: bold; margin-bottom: 5px;">Question:</p>
                <p style="margin-top: 0;">${message}</p>
              </div>
            </td>
          </tr>
        </table>
        

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:rgb(255, 255, 255); padding: 0 0 30px 0px">
          <tr>
            <td style="padding: 0 20px 10px 20px; text-align: left;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius: 4px; background-color:rgb(0, 119, 255); text-align: center;">
                    <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; font-family: Arial, sans-serif; font-size: 18px; color: #ffffff; text-decoration: none;">Reply to Inquiry</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
	`

	// WARN: Debug Guard
	if (debug)
		return new Response(
			`<div>Debug Mode. Mail Not Sent. Mail body displayed below.</div><div>${mailBody}</div>`,
			{
				headers: new Headers({
					'content-type': 'text/html;charset=UTF-8',
				}),
			}
		);

	const tptr = nodemailer.createTransport({
		// service: 'Gmail',
		host: import.meta.env.SMTP_SERVER,
		port: 587,
		secure: false,
		auth: {
			user: fromAddr,
			pass: import.meta.env.PB_MAIL_PW,
		},
	});

	const opts = {
		from: fromAddr,
		to: toAddr,
		subject: '[GI] - ' + fullName,
		html: mailBody,
		replyTo: email,
		headers: {
			'Content-Type': 'text/html',
		},
	};
	const info = await tptr.sendMail(opts);

	console.log(
		'Email sent for [WEB FORM]: general-formsubmit.ts ---' + info.messageId
	);

	return context.redirect('/conference/thankyou');
};
