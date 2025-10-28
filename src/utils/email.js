/**
 * MOCK do serviço de envio de e-mail.
 * Em um ambiente de produção, isso seria substituído por uma biblioteca
 * como Nodemailer, configurada com credenciais SMTP do arquivo .env.
 */
const emailService = {
  /**
   * Simula o envio de um e-mail.
   * @param {object} options - As opções do e-mail.
   * @param {string} options.to - O destinatário.
   * @param {string} options.subject - O assunto.
   * @param {string} options.text - O corpo do e-mail em texto plano.
   * @returns {Promise<void>}
   */
  sendEmail: async ({ to, subject, text }) => {
    console.log("\n--- EMAIL ENVIADO (MOCK) ---");
    console.log(`Para: ${to}`);
    console.log(`Assunto: ${subject}`);
    console.log("----------------------------");
    console.log(text);
    console.log("----------------------------\n");

    // Retorna uma promessa resolvida para simular uma operação assíncrona.
    return Promise.resolve();
  },
};

module.exports = emailService;
