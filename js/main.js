// Mostrar e sumir as páginas
function showPage(id) {
    const ids = ["jogar", "sobre", "ajuda", "menu", "opcoes"]
    const idsWithoutCurrentId = ids.filter(item => item != id)
    const pageToOpen = document.getElementById(id)

    for (let item of idsWithoutCurrentId) {
        const el = document.getElementById(item)
        el.style.display = "none" 
    }
    pageToOpen.style.display = "flex"
}

// Carrosel da página sobre
function carousel(direction) {
    const ids = ["fabricio", "sara", "renato", "diego", "maria"]
    let currentIndex = 0
    for (let id of ids) {
        const currentElement = document.getElementById(id)
        if (currentElement.style.display == "flex") {
            currentIndex = ids.indexOf(id)
        }
    }
    let nextIndex = 0    
    if (direction == "prev" && currentIndex > 0) {
        nextIndex = currentIndex - 1
    } else if (direction == "next" && currentIndex < ids.length - 1){
        nextIndex = currentIndex + 1
    } else {
        return
    }
    const personToDisplay = document.getElementById(ids[nextIndex])
    const previousPerson = document.getElementById(ids[currentIndex])
    previousPerson.style.display = "none"
    personToDisplay.style.display = "flex"
}

// PALAVRAS SECRETAS
const palavras = ["JAVASCRIPT", "FUNÇÃO", "PARÂMETRO", "VARIÁVEL", "CONSTANTE", "LOOP", "ARRAY"];

let palavraSelecionada = "";
let letrasCertas = [];
let letrasErradas = [];
let tentativasRestantes = 6;

function showPage(pageId) {
    const pages = ['menu', 'jogar', 'ajuda', 'sobre', 'opcoes'];
    pages.forEach(id => {
        document.getElementById(id).style.display = id === pageId ? 'flex' : 'none';
    });

    if (pageId === 'jogar') {
        iniciarJogo();
    }
}

// Iniciar novo jogo
function iniciarJogo() {
    palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
    letrasCertas = [];
    letrasErradas = [];
    tentativasRestantes = 6;

    atualizarPalavra();
    atualizarLetrasErradas();
    atualizarBoneco();

    const input = document.querySelector(".entradaLetra input");

    input.disabled = false;

    input.value = "";
    input.focus();
}

// Atualiza exibição da palavra
function atualizarPalavra() {
    const display = palavraSelecionada.split('').map(letra =>
        letrasCertas.includes(letra) ? letra : "_"
    ).join(" ");

    document.querySelector(".palavras").textContent = display;
}

// Atualiza letras erradas
function atualizarLetrasErradas() {
    document.querySelector(".letrasErradas").textContent =
        "Letras erradas: " + letrasErradas.join(", ");
}

// Mostra partes do boneco
function atualizarBoneco() {
    const partes = [
        ".cabeca", ".tronco",
        ".braco.esquerdo", ".braco.direito",
        ".perna.esquerda", ".perna.direita"
    ];

    partes.forEach((seletor, index) => {
        document.querySelector(seletor).style.display =
            index < (6 - tentativasRestantes) ? "block" : "none";
    });
}

// Processa a letra tentada
function tentarLetra(event) {
    event.preventDefault()

    const form = new FormData(event.target)
    const letra = form.get('letra').toUpperCase()
    const isLetterRegex = /^[A-Za-zÀ-ÿ]+$/

    if (!isLetterRegex.test(letra) || !letra || letrasCertas.includes(letra) || letrasErradas.includes(letra)) {
        event.target.children[1].value = "";

        return;
    }

    if (palavraSelecionada.includes(letra)) {
        letrasCertas.push(letra);
    } else {
        letrasErradas.push(letra);
        tentativasRestantes--;
    }

    event.target.children[1].value = "";
    event.target.children[1].focus();

    atualizarPalavra();
    atualizarLetrasErradas();
    atualizarBoneco();

    verificarFimDeJogo();
}

// Verifica vitória ou derrota
function verificarFimDeJogo() {
    const ganhou = palavraSelecionada.split('').every(l => letrasCertas.includes(l));
    if (ganhou) {
        setTimeout(() => {
            if (window.confirm("Parabéns! Você venceu!")) {
                iniciarJogo();
            } else {
                window.location.reload()
            }
        }, 100);
    } else if (tentativasRestantes <= 0) {
        setTimeout(() => {
            if (window.confirm(`Você perdeu! A palavra era: ${palavraSelecionada}. Deseja continuar?`)) {
                iniciarJogo();
            } else {
                window.location.reload()
            }
            iniciarJogo();
        }, 100);
    }
}

// Ao carregar página, limpa boneco
document.addEventListener("DOMContentLoaded", () => {
    atualizarBoneco();
});