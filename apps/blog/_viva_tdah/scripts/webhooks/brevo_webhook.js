// Brevo Webhook — VivaTDAH
// Recebe eventos do Brevo e permite roteamento futuro

module.exports = (req, res) => {
  const event = req.body || {};

  console.log("Brevo webhook recebido:", event.type || "unknown");

  // Placeholder para lógica futura
  // Ex: segmentação, scoring, logs

  res.status(200).json({ status: "ok" });
};
