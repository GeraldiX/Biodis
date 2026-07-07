// ======================================
// BIODIS v0.1
// script.js
// ======================================

// Espera a página carregar
window.onload = function () {

    // Esconde o login
    document.getElementById("loginBox").style.display = "none";

    // Depois de 3 segundos...
    setTimeout(function(){

        // Esconde a BIOS
        document.getElementById("boot").style.display = "none";

        // Mostra o login
        document.getElementById("loginBox").style.display = "block";

    },3000);

}


// Botão Entrar
function entrar(){

    let caixa = document.getElementById("loginBox");

    caixa.classList.add("glitch");

    setTimeout(function(){

        window.location.href="home.html";

    },400);

}