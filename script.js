document.getElementById("simulador-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const ingresos = parseFloat(document.getElementById("ingresos").value);
  const objetivo = document.getElementById("objetivo").value;
  const monto = parseFloat(document.getElementById("montoObjetivo").value);
  const meses = parseInt(document.getElementById("meses").value);

  const prompt = `Actuá como asesor financiero. El usuario tiene ingresos mensuales de $${ingresos}, quiere lograr el objetivo "${objetivo}" que cuesta $${monto} en ${meses} meses. Generá un plan claro y realista.`;

  try {
    const response = await fetch("/api/generar-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt }) // 👈 esto es CLAVE
    });

    const data = await response.json();
    document.getElementById("resultado").innerText = data.resultado || "Error al generar plan.";
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    document.getElementById("resultado").innerText = "Error de conexión.";
  }
});
