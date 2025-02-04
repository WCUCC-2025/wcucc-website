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
NEW FUNDING INQUIRY 
Name: ${fullName} (Display Name: ${dispName})
Package: ${pkg} 
Contributions: ${contributions}
Respond to: ${email} (${phone})
Is Near UBC?: ${isNearUBC}
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
        subject: '[WEB FORM] - ' + fullName,
        text: mailBody,
        replyTo: email,
    };
    const info = await tptr.sendMail(opts);

    console.log(
        'Email sent for [WEB FORM]: funding-formsubmit.ts ---' + info.messageId
    );

    //  WARN: REMOVE
    //        REDIRECT TO A THANK YOU PAGE
    return context.redirect('/funding/thanks');
};
