export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { message, email } = req.body;

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_k4tf12w",
        template_id: "template_5o02yu2",
        user_id: "-zBag0KNNj4ckPcD-", // sua public key do EmailJS
        template_params: {
          name: "Suporte",
          message,
          email, // deve bater com {{email}} ou {{reply_to}} no template
        }
      })
    });

    const data = await response.text();
    if (!response.ok) {
      return res.status(500).json({ error: "Falha no envio", details: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno" });
  }
}
