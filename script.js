/* ==========================================================
   BIODIS
   script.js
   PARTE 1
   MATRIX • BIOS • BOOT • EFEITOS
========================================================== */

"use strict";

/* ==========================================================
   HELPERS
========================================================== */

const $ = (selector) => document.querySelector(selector);

const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

/* ==========================================================
   ELEMENTOS
========================================================== */

const canvas = $("#matrix");
const ctx = canvas ? canvas.getContext("2d") : null;

const biosWindow = $("#biosBoot");
const biosText = $("#biosText");

const loginWindow = $("#loginBox");

const bootSound = $("#bootSound");
const typeSound = $("#typeSound");

/* ==========================================================
   MATRIX
========================================================== */

let fontSize = 16;

let columns = 0;

let drops = [];

const chars =
"アァイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}#@$%&";

function resizeMatrix(){

    if(!canvas) return;

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);

    drops = [];

    for(let i=0;i<columns;i++){

        drops[i] = random(1,60);

    }

}

function drawMatrix(){

    if(!ctx) return;

    ctx.fillStyle = "rgba(2,6,10,0.08)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#38ff9c";

    ctx.font = fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){

        const text =
            chars.charAt(
                Math.floor(Math.random()*chars.length)
            );

        ctx.fillText(
            text,
            i*fontSize,
            drops[i]*fontSize
        );

        if(
            drops[i]*fontSize > canvas.height &&
            Math.random() > 0.975
        ){

            drops[i]=0;

        }

        drops[i]++;

    }

}

if(canvas){

    resizeMatrix();

    setInterval(drawMatrix,35);

    window.addEventListener(
        "resize",
        resizeMatrix
    );

}

/* ==========================================================
   BIOS
========================================================== */

const biosLines=[

"BIODIS BIOS VERSION 3.7",
"",
"CHECKING HARDWARE...",
"",
"[ OK ] CPU INITIALIZED",
"[ OK ] MEMORY TEST",
"[ OK ] GPU LINK",
"[ OK ] STORAGE ONLINE",
"[ OK ] DATABASE FOUND",
"[ OK ] NETWORK READY",
"[ OK ] SECURITY MODULE",
"[ OK ] CRYPTO ENGINE",
"[ OK ] BIO CORE",
"",
"LOADING DRIVERS...",
"",
"[ OK ] DNA ENGINE",
"[ OK ] RNA ENGINE",
"[ OK ] AI MODULE",
"[ OK ] LAB INTERFACE",
"",
"STARTING SERVICES...",
"",
"CONNECTING DATABASE...",
"",
"VERIFYING USER SPACE...",
"",
"INITIALIZING BIODIS...",
"",
"READY."

];

/* ==========================================================
   TYPEWRITER
========================================================== */

async function typeLine(text){

    if(!biosText) return;

    for(let i=0;i<text.length;i++){

        biosText.innerHTML += text.charAt(i);

        if(typeSound){

            try{

                typeSound.currentTime=0;
                typeSound.play();

            }catch(e){}

        }

        await sleep(
            random(10,28)
        );

    }

    biosText.innerHTML += "<br>";

    biosText.scrollTop =
    biosText.scrollHeight;

}

function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

/* ==========================================================
   BOOT
========================================================== */

async function startBoot(){

    if(!biosWindow) return;

    if(bootSound){

        try{

            bootSound.play();

        }catch(e){}

    }

    for(const line of biosLines){

        await typeLine(line);

        await sleep(
            random(25,70)
        );

    }

    await sleep(900);

    biosWindow.classList.add("hidden");

    if(loginWindow){

        loginWindow.classList.remove("hidden");

    }

}

/* ==========================================================
   GLITCH EVENT
========================================================== */

function randomGlitch(){

    const layer =
    document.querySelector(".glitch-layer");

    if(!layer) return;

    layer.style.opacity=".35";

    layer.style.transform=
    "translateX("+random(-12,12)+"px)";

    setTimeout(()=>{

        layer.style.opacity=".08";
        layer.style.transform="translateX(0px)";

    },120);

}

setInterval(

    randomGlitch,

    random(2500,6000)

);

/* ==========================================================
   FLOATING LIGHT
========================================================== */

setInterval(()=>{

    document.body.style.filter=
    "brightness("+
    (0.96+Math.random()*0.08)
    +")";

},450);

/* ==========================================================
   START
========================================================== */

window.addEventListener(

    "load",

    ()=>{

        startBoot();

    }

);
/* ==========================================================
   BIODIS
   script.js
   PARTE 2
   LOGIN • AUTENTICAÇÃO • HOME • LOGOUT
========================================================== */

/* ==========================================================
   ELEMENTOS
========================================================== */

const loginForm = $("#loginForm");

const inputUser = $("#user");

const inputPassword = $("#password");

const statusText = $("#statusText");

const successSound = $("#successSound");

const logoutButton = $("#logout");

/* ==========================================================
   USUÁRIOS
   (substitua pelos seus depois)
========================================================== */

const USERS = [

    {
        user: "admin",
        password: "admin"
    },

    {
        user: "biodis",
        password: "1234"
    }

];

/* ==========================================================
   STATUS
========================================================== */

function setStatus(message){

    if(statusText){

        statusText.textContent = message;

    }

}

/* ==========================================================
   LOGIN
========================================================== */

if(loginForm){

    loginForm.addEventListener(

        "submit",

        function(event){

            event.preventDefault();

            const user =
            inputUser.value.trim();

            const password =
            inputPassword.value;

            if(user === "" || password === ""){

                setStatus(
                    "Preencha usuário e senha."
                );

                return;

            }

            const found =
            USERS.find(item =>

                item.user === user &&
                item.password === password

            );

            if(!found){

                setStatus(
                    "Credenciais inválidas."
                );

                inputPassword.value = "";

                inputPassword.focus();

                return;

            }

            setStatus(
                "Autenticando..."
            );

            if(successSound){

                try{

                    successSound.currentTime = 0;

                    successSound.play();

                }catch(e){}

            }

            sessionStorage.setItem(

                "BIODIS_LOGIN",

                "true"

            );

            sessionStorage.setItem(

                "BIODIS_USER",

                user

            );

            setTimeout(()=>{

                window.location.href="home.html";

            },900);

        }

    );

}

/* ==========================================================
   PROTEÇÃO DA HOME
========================================================== */

if(

    document.body.classList.contains("home-page")

){

    const logged =

    sessionStorage.getItem(

        "BIODIS_LOGIN"

    );

    if(logged !== "true"){

        window.location.href="index.html";

    }

}

/* ==========================================================
   LOGOUT
========================================================== */

if(logoutButton){

    logoutButton.addEventListener(

        "click",

        ()=>{

            sessionStorage.removeItem(

                "BIODIS_LOGIN"

            );

            sessionStorage.removeItem(

                "BIODIS_USER"

            );

            window.location.href="index.html";

        }

    );

}

/* ==========================================================
   ANIMAÇÃO DAS BARRAS
========================================================== */

const bars =

document.querySelectorAll(

    ".progress span"

);

bars.forEach(bar=>{

    const width =

    bar.style.width;

    bar.style.width="0";

    setTimeout(()=>{

        bar.style.transition=

        "width 2s ease";

        bar.style.width=width;

    },300);

});

/* ==========================================================
   EFEITO HOVER DOS CARDS
========================================================== */

document

.querySelectorAll(".card")

.forEach(card=>{

    card.addEventListener(

        "mousemove",

        function(e){

            const rect =

            this.getBoundingClientRect();

            const x =

            e.clientX - rect.left;

            const y =

            e.clientY - rect.top;

            this.style.background=

            `radial-gradient(circle at ${x}px ${y}px,
            rgba(0,255,180,.10),
            rgba(5,12,20,.92) 65%)`;

        }

    );

    card.addEventListener(

        "mouseleave",

        function(){

            this.style.background=

            "rgba(6,13,21,.88)";

        }

    );

});

/* ==========================================================
   RELÓGIO (caso exista)
========================================================== */

const clock = $("#clock");

function updateClock(){

    if(!clock) return;

    const now = new Date();

    clock.textContent =

        now.toLocaleTimeString(

            "pt-BR"

        );

}

if(clock){

    updateClock();

    setInterval(

        updateClock,

        1000

    );

}
/* ==========================================================
   BIODIS
   script.js
   PARTE 3
   FINALIZAÇÃO • EFEITOS • UX
========================================================== */

/* ==========================================================
   GLITCH NO LOGO
========================================================== */

const logo = document.querySelector(".logo");

if (logo) {

    setInterval(() => {

        logo.style.transform =
            `translate(${random(-2,2)}px,${random(-2,2)}px)`;

        setTimeout(() => {

            logo.style.transform = "translate(0,0)";

        }, 80);

    }, 5000);

}

/* ==========================================================
   PARALLAX SUAVE DO FUNDO
========================================================== */

const gradient = document.querySelector(".bg-gradient");

document.addEventListener("mousemove", (event) => {

    if (!gradient) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 20;
    const y = (event.clientY / window.innerHeight - 0.5) * 20;

    gradient.style.transform =
        `translate(${x}px,${y}px) scale(1.05)`;

});

/* ==========================================================
   EFEITO NOS PERSONAGENS
========================================================== */

document.querySelectorAll(".character img").forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transition = ".35s";

        img.style.transform = "scale(1.04)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "";

    });

});

/* ==========================================================
   ENTER NO LOGIN
========================================================== */

if (inputUser && inputPassword) {

    inputUser.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            inputPassword.focus();

        }

    });

}

/* ==========================================================
   FOCUS AUTOMÁTICO
========================================================== */

window.addEventListener("load", () => {

    if (inputUser && !loginWindow?.classList.contains("hidden")) {

        inputUser.focus();

    }

});

/* ==========================================================
   TECLA ESC
========================================================== */

document.addEventListener("keydown", (e) => {

    if (e.key !== "Escape") return;

    if (document.body.classList.contains("home-page")) {

        if (confirm("Encerrar sessão?")) {

            sessionStorage.removeItem("BIODIS_LOGIN");
            sessionStorage.removeItem("BIODIS_USER");

            window.location.href = "index.html";
        }

    }

});

/* ==========================================================
   TÍTULO PISCANDO
========================================================== */

const originalTitle = document.title;

let titleTimer = null;

window.addEventListener("blur", () => {

    titleTimer = setInterval(() => {

        document.title =
            document.title === originalTitle
                ? "◉ BIODIS ONLINE"
                : originalTitle;

    }, 1200);

});

window.addEventListener("focus", () => {

    clearInterval(titleTimer);

    document.title = originalTitle;

});

/* ==========================================================
   ESTRELAS DIGITAIS
========================================================== */

function createSpark() {

    const spark = document.createElement("div");

    spark.style.position = "fixed";
    spark.style.width = "2px";
    spark.style.height = "2px";
    spark.style.borderRadius = "50%";
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "15";

    spark.style.background = "#7ffff3";

    spark.style.left =
        Math.random() * window.innerWidth + "px";

    spark.style.top =
        Math.random() * window.innerHeight + "px";

    spark.style.opacity = ".9";

    document.body.appendChild(spark);

    let opacity = 0.9;

    const timer = setInterval(() => {

        opacity -= 0.03;

        spark.style.opacity = opacity;

        if (opacity <= 0) {

            clearInterval(timer);

            spark.remove();

        }

    }, 35);

}

setInterval(createSpark, 250);

/* ==========================================================
   USUÁRIO LOGADO
========================================================== */

const storedUser =
    sessionStorage.getItem("BIODIS_USER");

const subtitle =
    document.querySelector(".home-subtitle");

if (storedUser && subtitle) {

    subtitle.innerHTML =
        "BIOLOGICAL DATA INTEGRATED SYSTEM<br>" +
        "USUÁRIO: <strong>" +
        storedUser.toUpperCase() +
        "</strong>";

}

/* ==========================================================
   MENSAGEM FINAL
========================================================== */

console.clear();

console.log("%cBIODIS",
    "color:#52ffb8;font-size:32px;font-weight:bold;");

console.log(
    "Biological Data Integrated System iniciado."
);

console.log(
    "Todos os módulos carregados."
);
