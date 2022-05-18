const sgMail = require('@sendgrid/mail')

export async function sendEmail ({ html, emailTo, subject }): Promise<void> {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: emailTo,
        from: 'testauthent@yandex.ru',
        subject,
        html,
    }

    try {
        await sgMail.send(msg)
    } catch (err) {
        throw new Error(err)
    }
}
