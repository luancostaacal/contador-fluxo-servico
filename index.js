 const http = require("http");

const URL = "http://api.acalhomecenter.com.br:8086/ApiAcal/api/teste/fluxo";
const TOKEN = "Bearer mO1zXrxpsNesVkiSACigxRBLEdWMccu_-4zjZNuVWLQNJGntPzd_KRGN4Wfh27WB6WV07kuz11WJGiCft64Q_lNO2PTAS_tS3t2_g77uKsoCqBVSBAeNPUbrp8RhQjsEmJi5H8nuOenz8MvGfOhPq4U8hn8O6nv5YXoCQhxBRC_sD12ehCTOAuesk5lVQdqIpy86ovau1vrxQnQiTbp0Visu007duMWrYmOq2raIIQ";

const PORT = process.env.PORT || 10000;

async function chamarFluxo() {
    const agora = new Date().toLocaleString("pt-BR");

    try {
        console.log(`[${agora}] Chamando ${URL}`);

        const response = await fetch(URL, {
            method: "GET",
            headers: {
                Authorization: TOKEN,
                Accept: "application/json"
            }
        });

        const texto = await response.text();

        console.log(`[${agora}] Status: ${response.status}`);
        console.log(`[${agora}] Resposta: ${texto}`);

    } catch (err) {
        console.error(`[${agora}] Erro ao chamar API:`);
        console.error(err);
    }
}

const server = http.createServer((req, res) => {

    // Endpoint que será chamado pelo cron-job.org
    if (req.url === "/fluxo") {

        console.log(`[${new Date().toLocaleString("pt-BR")}] Cron acionou /fluxo`);

        // Dispara sem esperar terminar
        chamarFluxo();

        // Responde imediatamente
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            status: "executando",
            message: "Fluxo iniciado."
        }));

        return;
    }

    // Health check do Render
    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        status: "online"
    }));
});

server.listen(PORT, () => {
    console.log("======================================");
    console.log("Serviço iniciado");
    console.log(`HTTP ouvindo na porta ${PORT}`);
    console.log("Aguardando cron-job.org...");
    console.log("======================================");
});