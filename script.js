let amigos = document.getElementById('amigos')
let divButtons = document.getElementById('buttons')
let btnSortear = document.getElementById('sortear')
let naoSorteados = []
let amigoSecreto = {}
let participanteInicial


btnSortear.onclick = e => {
    participanteInicial = amigos.value.split(',')[0]
    naoSorteados = amigos.value.split(',')
    naoSorteados.splice(0, 1)
    divButtons.innerHTML = ""
    amigoSecreto = {}
    if(naoSorteados.length < 2){
        alert("Digite no minimo 3!")
    }else if(possuiNomesRepetidos(naoSorteados)){
        alert("Possui nomes repetidos!")
    }else{
        recursiveSecretFriend(participanteInicial)
    }

    console.log(amigoSecreto)
}

function recursiveSecretFriend(pessoa) {
    let numeroSorteado = Math.ceil(Math.random() * (naoSorteados.length)) - 1
    while (naoSorteados[numeroSorteado] == pessoa) {
        numeroSorteado = Math.ceil(Math.random() * (naoSorteados.length)) - 1
    }
    amigoSorteado = naoSorteados[numeroSorteado]

    amigoSecreto[pessoa] = amigoSorteado

    
    if (naoSorteados.length == 1) {
        naoSorteados.splice(numeroSorteado, 1)
        amigoSecreto[amigoSorteado] = participanteInicial
        renderButtons()
    } else {
        naoSorteados.splice(numeroSorteado, 1)
        recursiveSecretFriend(amigoSorteado)
    }
}

function renderButtons() {
    for (let pessoa in amigoSecreto) {
        let btn = document.createElement('button')
        btn.innerText = pessoa
        btn.onclick = e => {
            console.log(pessoa)
            gerarArquivo(pessoa, amigoSecreto[pessoa])
        }
        divButtons.appendChild(btn)
    }
}

function possuiNomesRepetidos(nomes) {
    const conjuntoNomes = new Set(nomes);
    return nomes.length !== conjuntoNomes.size;
}

function gerarArquivo(pessoa, amigoSecretoPessoa) {
    console.log(pessoa)
    let br = ".";
    for (let i = 0; i < 100; i++) {
        br += '<br>';
    }
    const conteudoArquivo = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Amigo secreto</title>
    </head>
    <body>
    <h1>Olá ${pessoa}, para descobrir quem é seu amigo secreto você deve rolar até embaixo. Se você não for ${pessoa}, por gentileza feche o arquivo e o apague, conto com sua honestidade${br}</h1>
    <h1 style='text-align: center;'>=========>${amigoSecretoPessoa}<=========</h1>
    </body>
    </html>
    `;

    // Criar um Blob (Binary Large Object) com o conteúdo do arquivo
    const blob = new Blob([conteudoArquivo], { type: 'text/plain' });

    // Criar um objeto URL a partir do Blob
    const url = URL.createObjectURL(blob);

    // Criar um link de download
    const linkDownload = document.createElement('a');
    linkDownload.href = url;
    linkDownload.download = `${pessoa}.html`;

    // Adicionar o link ao corpo do documento
    document.body.appendChild(linkDownload);

    // Acionar o clique no link
    linkDownload.click();

    // Remover o link do corpo do documento
    document.body.removeChild(linkDownload);

    // Limpar o objeto URL
    URL.revokeObjectURL(url);
}