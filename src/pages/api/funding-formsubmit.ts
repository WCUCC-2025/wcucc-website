import type { APIRoute } from 'astro';
// import sanitizeHtml from 'sanitize-html';

export const prerender = false;
const debug = !true;

import nodemailer from 'nodemailer';

function anyEmpty(...params: string[]) {
	return params.some(val => val == '');
}

export const POST: APIRoute = async context => {
	const form = await context.request.formData();
	const f = (field: string) => form.get(field)?.toString() || '';

	const fullName = f('full-name');
	const dispName = f('display-name');
	const pkg = f('package');
	const cont = f('contributions');
	const contributions = cont || 'N/A';
	const email = f('email');
	const phone = f('phone');
	const message = f('message') || 'N/A';
	const isNearUBC = f('near-ubc') == 'yes';

	if (anyEmpty(fullName, dispName, pkg, email, phone))
		return new Response('Error 400. Input malformed.', { status: 400 });

	const fromAddr = import.meta.env.MAIL_FROM_ADDR;
	const toAddr = import.meta.env.MAIL_TO_ADDR;

	console.log(
		form.keys().toArray(),
		JSON.stringify(form.entries().toArray())
	);

	const mailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #ffffff; min-width: 100%;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 100%; margin: 0 auto; background-color: #ffffff;">
                    <!-- Header -->
                    <tr>
                        <td align="left" style="padding: 20px; display: block;">
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 24px; line-height: 32px; color: #000000; margin: 0; font-weight: bold; display: block;">
                                Sponsorship Inquiry: Pallium Labs
                            </div>
                        </td>
                    </tr>

                    <!-- Basic Information Section -->
                    <tr>
                        <td align="left" style="padding: 20px; display: block;">
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 20px; line-height: 28px; color: #000000; margin: 0 0 20px 0; font-weight: bold; display: block;">
                                Basic Information
                            </div>
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #000000; margin: 0 0 10px 0; display: block;">
                                <strong>Name:</strong> %%FULLNAME%%
                            </div>
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #000000; margin: 0 0 10px 0; display: block;">
                                <strong>Display Name:</strong> %%DISPNAME%%
                            </div>
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #000000; margin: 0 0 10px 0; display: block;">
                                <strong>Package Selected:</strong> %%PACKAGE%%
                            </div>
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #000000; margin: 0 0 10px 0; display: block;">
                                <strong>Contributions:</strong> %%CONTRIBUTIONS%%
                            </div>
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #000000; margin: 0 0 10px 0; display: block;">
                                <strong>Located Near UBC:</strong> %%ISNEARUBC%%
                            </div>
                        </td>
                    </tr>

                    <!-- Contact Information Section -->
                    <tr>
                        <td align="left" style="padding: 20px; display: block;">
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 20px; line-height: 28px; color: #000000; margin: 0 0 20px 0; font-weight: bold; display: block;">
                                Contact Information
                            </div>
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #000000; margin: 0 0 10px 0; display: block;">
                                <strong>Email:</strong> %%EMAIL%%
                            </div>
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #000000; margin: 0 0 10px 0; display: block;">
                                <strong>Phone:</strong> %%PHONE%%
                            </div>
                        </td>
                    </tr>

                    <!-- Message Section -->
                    <tr>
                        <td align="left" style="padding: 20px; display: block;">
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 20px; line-height: 28px; color: #000000; margin: 0 0 20px 0; font-weight: bold; display: block;">
                                Message
                            </div>
                            <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #000000; margin: 0; display: block;">
                                %%MESSAGE%%
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

	//     const mailBody = `
	// NEW FUNDING INQUIRY
	// Name: ${fullName} (Display Name: ${dispName})
	// Package: ${pkg}
	// Contributions: ${contributions}
	// Respond to: ${email} (${phone})
	// Is Near UBC?: ${isNearUBC}
	// Message: ${message}
	// `;

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
		subject: '[SPNOPP] - ' + fullName,
		html: mailBody,
		replyTo: email,
		headers: {
			'Content-Type': 'text/html', // Add this header
		},
	};
	const info = await tptr.sendMail(opts);

	console.log(
		'Email sent for [WEB FORM]: funding-formsubmit.ts ---' + info.messageId
	);

	//  WARN: REMOVE
	//        REDIRECT TO A THANK YOU PAGE
	return context.redirect('/funding/thanks');
};
