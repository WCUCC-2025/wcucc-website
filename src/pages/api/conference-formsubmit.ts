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

	const fullName = f('general-name');
	const email = f('general-email');
	const phone = f('general-phone');
	const organization = f('display-organization');
	const message = f('general-message') || 'N/A';

	if (anyEmpty(fullName, email))
		return new Response('Error 400. Input malformed.', { status: 400 });

	const fromAddr = import.meta.env.MAIL_FROM_ADDR;
	const toAddr = import.meta.env.MAIL_TO_ADDR;

	console.log(
		form.keys().toArray(),
		JSON.stringify(form.entries().toArray())
	);

	const mailBody = `
	NEW GENERAL INQUIRY
	Name: ${fullName}
	Organization: ${organization}
	Respond to: ${email} (${phone})
	Message: ${message}
	`;

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
		subject: '[GQ] - ' + fullName,
		html: mailBody,
		replyTo: email,
		headers: {
			'Content-Type': 'text/html', // Add this header
		},
	};
	const info = await tptr.sendMail(opts);

	console.log(
		'Email sent for [WEB FORM]: general-formsubmit.ts ---' + info.messageId
	);

	//  WARN: REMOVE
	//        REDIRECT TO A THANK YOU PAGE
	return context.redirect('/conference/thankyou');
};
