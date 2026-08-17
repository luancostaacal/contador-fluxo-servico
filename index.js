const URL = "http://apihomol.acalhomecenter.com.br:8087/ApiAcal/api/teste/fluxo";
const TOKEN = "Bearer mO1zXrxpsNesVkiSACigxRBLEdWMccu_-4zjZNuVWLQNJGntPzd_KRGN4Wfh27WB6WV07kuz11WJGiCft64Q_lNO2PTAS_tS3t2_g77uKsoCqBVSBAeNPUbrp8RhQjsEmJi5H8nuOenz8MvGfOhPq4U8hn8O6nv5YXoCQhxBRC_sD12ehCTOAuesk5lVQdqIpy86ovau1vrxQnQiTbp0Visu007duMWrYmOq2raIIQ";  
const INTERVALO = 5 * 60 * 1000; // 5 minutos

async function chamarFluxo() {
    const agora = new Date().toLocaleString("pt-BR");

    try {
        console.log(`[${agora}] Chamando ${URL}`);

        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": TOKEN,
                "Accept": "application/json"
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

(async () => {
    console.log("======================================");
    console.log("Serviço iniciado");
    console.log("Executando a cada 5 minutos");
    console.log("======================================");

    await chamarFluxo();

    setInterval(chamarFluxo, INTERVALO);
})();