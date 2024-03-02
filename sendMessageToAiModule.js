// sendMessageToGPT.js

// Retorna uma reposta do chat gpt
const sendMessageToChatGpt = async (userExpectation, contentWebSite) => {
    const apiKeyChaGpt = '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';
    const endpoint = "https://api.openai.com/v1/chat/completions";
    
    const content = `Você irá analisar o conteúdo de uma página web 
    e verificar se esse conteúdo ensina o que o usuário deseja aprender. 
    O usuário irá dizer sua expectativa e logo depois o conteúdo de uma 
    página web. Sua resposta deve ser clara e objetiva, não 
    complique nada, inclusive crie em tópicos o que ele irá aprender ali. 
    Forneça um feedback de quanto o usuário irá aprender
    sobre o determinado assunto estudando apenas aquela página, por exemplo
    , você irá aprender 20% do assunto aqui, pois você precisará buscar aprender
    também tal coisa, etc. Quero que você também indique o que o usuário deverá
    aprender a seguir para poder prosseguir com os estudos sobre o assunto, por exemplo
    se o usuário estiver interessado em como aprender a fazer origami sugira conteúdos
    complementares para ele seguir estudando e saber o que estudar a seguir. Sobre 
    a aparência e a emoção do texto, use emojis e seja amigável, por exemplo, se usuário
    estiver procurando aprender sobre como editar fotos com Canva use emojis de pincel e sorrisos.
        
    Resumindo: Você deve fornecer uma explicação do que ele irá aprender ali naquela página,
    e depois especificar tudo em tópicos bem detalhados para não haver dúvidas, ser amigável usando emojis,
    usar emojis que tenham a ver com o tema, dizer quanto ele irá aprender sobre o assunto naquela página e 
    dizer qual o próximo passo na aprendizagem e recomendar onde ele pode encontrar os próximos conteúdos 
    para seguir. Não resuma as coisas, detalhe tudo bem ao usuário.`;

    const input = [
        { role: 'system', content: content },
        { role: 'user', content: userExpectation },
        { role: 'user', content: contentWebSite }
    ];

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${apiKeyChaGpt}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: input
            })
        });

        const data = await response.json();
        const reponseModelAI = data.choices[0].message.content;
        return reponseModelAI;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};

module.exports = sendMessageToChatGpt;
