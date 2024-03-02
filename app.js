const scraping = require('./scrapingModule');
const sendMessageToAIModel = require('./sendMessageToAiModule');

scraping('main')
    .then(data => {
        const contentWebSite = JSON.stringify(data)
        const userExpectation = 'Desejo aprender a fazer sistemas de login robustos com jwt';
        sendMessageToAIModel(userExpectation, contentWebSite)
            .then(responseAi => console.log(responseAi))
            .catch(error => console.error('Ocorreu um erro na reposta do modelo de ai', error));
    })
    .catch(error => console.error('Erro ao fazer o web scraping', error));
