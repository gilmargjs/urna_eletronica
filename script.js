//capturando o span com as informações

//varivel de controle de interface
let seuvotopara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

//etapas

//variavelde ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];
function comecarEtapa() {
    //pegando as informações do arquivo etapas
    let etapa = etapas[etapaAtual];

    //variavel 
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i == 0) {
            numeroHtml += '<div class="d-1-numero pisca"></div>'

        } else {
            numeroHtml += '<div class="d-1-numero"></div>'

        }

    }

    //retirando a mensagem inicial
    seuvotopara.style.display = 'none';
    //inerindo o titulo
    cargo.innerHTML = etapa.titulo;
    //tirando a descrição
    descricao.innerHTML = '';
    //desativando o aviso
    aviso.style.display = 'none';

    numeros.innerHTML = numeroHtml;
    lateral.innerHTML = '';
};

function atualizaInterface() {
    let etapa = etapas[etapaAtual];

    //Buscar Candidato
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        //adicionando o candidato
        candidato = candidato[0];
        //inserindo o voto valido
        seuvotopara.style.display = "block";
        //preenchimento das informações dos candidatos
        descricao.innerHTML = `Nome:${candidato.nome}<br/>Partido:${candidato.partido}<br/>`;
        aviso.style.display = 'block';

        let fotoHtml = '';

        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotoHtml += ` <div class="d-1-imagem small"><img src="imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`

            } else {
                fotoHtml += ` <div class="d-1-imagem"><img src="imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotoHtml;
    } else {
        //configurando o vot nulo
        seuvotopara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}


//pegando o click no botão
function clicou(n) {
    let elNumero = document.querySelector('.d-1-numero.pisca');
    //verificar se numero é diferente null
    if (elNumero != null) {
        //colocando o numero na tela
        elNumero.innerHTML = n;
        //concatenando os numeros
        numero = `${numero}${n}`;

        //retirando a classe pisca
        elNumero.classList.remove('pisca');

        //adicionando a classe pisca ao proximo número
        if (elNumero.nextElementSibling != null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
};
//configuração do botão voto em branco
function branco() {
    numero = '';
    votoBranco = true;
    seuvotopara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    lateral.innerHTML = '';
};

function corrige() {
    comecarEtapa();
};

function confirme() {

    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        //confirmando o voto em branco
        votoConfirmado = true;
        //adicionando o voto em branco a lista de votos
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto:'branco'
        });    
    } else if (numero.length === etapa.numeros) {
        //confirmando o vot nulo
        votoConfirmado = true;
        //adicionando o voto a lista votos
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto:numero
        });    }

    if (votoConfirmado) {
        //passar a etapa para a proxima (prefeito)
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
        
        }

    }
}

comecarEtapa();