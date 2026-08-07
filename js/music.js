let Reproductor = {
    Artista: "",
    Titulo: "",
    Caratula: "",
    ruta: "",
    numero: 0,
    BtnAct: null
}
const audio = document.getElementById("audio");
const btnPlay = document.getElementById("btn-play-toggle");
const btnAnt = document.getElementById("btn-prev");
const btnSig = document.getElementById("btn-next");
const btnAle = document.getElementById("btn-shuffle");
const btnRep = document.getElementById("btn-repeat");
const btnRepUno = document.getElementById("btn-repeat-one");
const progres = document.getElementById("progress-bar");
const progressSd = document.getElementById("progress-slider");
const vol = document.getElementById("volume-slider");
const muted = document.querySelector(".volume-icon");
const time = document.getElementById("current-time");
const dur = document.getElementById("total-time");
const Artist = document.getElementById("current-artist");
const Title = document.getElementById("current-title");
const Caratula = document.getElementById("current-art");
const hvTime = document.getElementById("hover-tiempo");
const container = document.getElementById("player-bar");
const video = document.getElementById("player-video");
let shuffle = false;
const list = ["Las Muñequitas.mp3", "Neney Neney.mp3", "This is colombia.mp3", "Pico y Chao.mp3", "Moonlight.mp3", "YO QUIERO.mp3", "Mano al piso.mp3", "UNA BABY EN SANTIAGO.mp3", "Skokka.mp3", "MENTE POSITIVA.mp3", "PROVÓCATE.mp3", "DOS AMORES.mp3", "SORNERO.mp3", "AGUA BENDITA.mp3", "MACDONALDS.mp3", "ZOZO.mp3", "LUBRIDERM.mp3", "MERO TOTE.mp3", "QUE LE DE.mp3", "ANTIOQUIA.mp3", "CIGARRO.mp3", "ALO.mp3", "QUÉ LIO.mp3", "💕🧃 YOGURCITO.mp3", "SUPERSTAR.mp3", "Esclava.mp3", "444Remix.mp3", "Talento.mp3", "Hace Mucho Tiempo.mp3", "La Jumpa.mp3", "Me Prefieres A Mi.mp3", "Pa Que La Pases Bien.mp3", "Sigues con Él.mp3", "BAILE INoLVIDABLE.mp3", "BD NUEVAYOL.mp3", "Si VEO A TU MAMÁ.mp3", "Tu no metes cabra (Remix).mp3", "Cuando No Era Cantante.mp3", "Cuando No Era Cantante Remix.mp3", "SPOTISAVER.mp3", "Nunca Me Olvides.mp3", "Yandel 150.mp3", "La Monda.mp3", "Destino Final.mp3", "El Mejor Remix.mp3", "Vete.mp3", "Por Qué la Envidia.mp3", "Aventurero.mp3", "Guaro Remix.mp3", "Mi Venganza.mp3", "MLP.mp3", "Hasta La Madre.mp3", "Un Perro Enamorado.mp3"];
const carpeta1 = "/cheft-portafolio/audio-video/Reggeton/";
const carpeta2 = "/cheft-portafolio/audio-video/Popular/";
const videoList = ["Mr. Plata, El Americano 4KT - Las Muñequitas.mp4", "Neney Neney.mp4", "This Is Colombia.mp4", "PICO Y CHAO.mp4", "MOONLIGHT.mp4", "YO QUIERO.mp4", "MANO AL PISO.mp4", "UNA BABY EN SANTIAGO.mp4", "SKOKKA.mp4", "MENTE POSITIVA.mp4", "PROVOCATE.mp4", "DOS AMORES.mp4", "SORNERO.mp4", "AGUA BENDITA.mp4", "MACDONALDS.mp4", "ZOZO.mp4", "LUBRIDERM.mp4", "MERO TOTE.mp4", "QUE LE DE.mp4", "ANTIOQUIA.mp4", "CIGARRO.mp4", "ALÓ.mp4", "QUE LIO.mp4", "💕🧃 YOGURCITO REMIX.mp4", "SUPERSTAR.mp4", "Esclava Remix.mp4", "444Remix.mp4", "Talento.mp4", "Hace Mucho Tiempo.mp4", "La Jumpa.mp4", "Me Prefieres a Mi.mp4", "Pa Que La Pases Bien.mp4", "Sigues Con Él.mp4", "BAILE INoLVIDABLE.mp4", "NUEVAYoL.mp4", "SI VEO A TU MAMÁ.mp4", "TÚ NO METES CABRA.mp4", "Cuando No Era Cantante.mp4", "Cuando No Era Cantante Remix.mp4", "Brickell.mp4", "Nunca Me Olvides.mp4", "Yandel 150.mp4", "LA MONDA.mp4", null, null, null, null, null]
const videoCapt1 = "/cheft-portafolio/audio-video/Videos/Reggeton/"
const filas = document.querySelectorAll(".cancion-fila");
let inceActual = 0;

function Cancion(can, button) {
    const fila = button.closest(".cancion-fila");
    inceActual = Array.from(filas).indexOf(fila);
    const Titulo = filas[inceActual].querySelector(".cancion-title-text").textContent;
    const Art = filas[inceActual].querySelector(".cancion-art").textContent;
    const Car = filas[inceActual].querySelector("img").src;

    Reproductor.Artista = Art;
    Reproductor.Titulo = Titulo;
    Reproductor.Caratula = Car;
    Reproductor.ruta = can;
    Reproductor.BtnAct = button;

    Title.textContent = Titulo;
    Artist.textContent = Art;
    Caratula.src = Car;

    if (!can || !button){
        container.style.display = "none";
    }else{
        container.style.display = "flex";
    }
    if(videoList[inceActual] == null){
        video.src = "";
    }else{
        video.src = videoCapt1 + videoList[inceActual];
        video.play();
    }
    if (!can || !button) return;
    if (button.textContent === '⏸') {
        audio.pause();
        actualizarBtn();
    } else {
        audio.src = can;
        audio.play();
        actualizarBtn();
    }
    console.log(`Reproduciendo: ${Titulo} - ${Art} - ${Car}`);
};

btnAle.addEventListener('click', (e) => {
    if (!Reproductor.ruta) return;
    if (shuffle == false){
        shuffle = true;
        audio.loop = false;
        btnRepUno.classList.remove('active');
        btnRep.classList.remove("active");
        btnAle.classList.add("active");
        inceActual = Math.floor(Math.random() * list.length);
        RepAc()
    }else{
        shuffle = false;
        btnRep.classList.add("active");
        btnAle.classList.remove("active");
    }
});

btnPlay.addEventListener("click", (e) => {
    if (!Reproductor.ruta) return;
    if (audio.paused) {
        audio.play();
        actualizarBtn();
    } else {
        audio.pause();
        actualizarBtn();
    }
});

function actualizarBtn() {
    if (audio.paused) {
        btnPlay.textContent = '▶';
        Reproductor.BtnAct.textContent = '▶';
    }else {
        btnPlay.textContent = '⏸';
        Reproductor.BtnAct.textContent = '⏸';
    }
}

btnSig.addEventListener('click', (e)=>{
    if (!Reproductor.ruta) return;
    if (shuffle == true) {
        inceActual = Math.floor(Math.random() * list.length);
    } else {
        inceActual++;
        if (inceActual >= list.length) {
            inceActual = 0;
        }
    }
    RepAc();
});

audio.addEventListener('ended', ()=>{
    if (!Reproductor.ruta) return;
    if (shuffle == true) {
        inceActual = Math.floor(Math.random() * list.length);
    } else {
        inceActual++;
        if (inceActual >= list.length) {
            inceActual = 0;
        }
    }
    RepAc();
});

btnAnt.addEventListener('click', (e)=>{
    if (!Reproductor.ruta) return;
    inceActual--;
    if (inceActual < 0) {
        inceActual = list.length - 1;
    }
    RepAc();
});

function RepAc(){
    const Titulo = filas[inceActual].querySelector(".cancion-title-text").textContent;
    const Art = filas[inceActual].querySelector(".cancion-art").textContent;
    const Car = filas[inceActual].querySelector("img").src;
    const botonFila = filas[inceActual].querySelector(".cancion-hover");
    let ruta;

    Reproductor.Artista = Art;
    Reproductor.Titulo = Titulo;
    Reproductor.Caratula = Car;
    Reproductor.BtnAct.textContent = "▶";
    Reproductor.BtnAct = botonFila;

    Title.textContent = Titulo;
    Artist.textContent = Art;
    Caratula.src = Car;
    const finRegge = 43;
    if (inceActual < finRegge){
        ruta = carpeta1 + list[inceActual];
    }else{
        ruta = carpeta2 + list[inceActual];
    }
    Reproductor.ruta = ruta;
    audio.src = ruta;
    audio.play();
    actualizarBtn();
    if(videoList[inceActual] == null){
        video.src = "";
    }else{
        video.src = videoCapt1 + videoList[inceActual];
        video.play();
    }
};

btnRep.addEventListener('click', (e)=>{
    if (!Reproductor.ruta) return;
    if (audio.loop == false){
        audio.loop = true;
        shuffle = false;
        audio.play();
        console.log("bucle activado");
        btnRepUno.style.display = "flex";
        btnRep.classList.remove('active');
        btnAle.classList.remove("active");
        btnRepUno.classList.add('active');
    }
});

btnRepUno.addEventListener('click', (e)=>{
    if (!Reproductor.ruta) return;
    if (audio.loop == true){
        audio.loop = false;
        shuffle = false;
        console.log("bucle desactivado");
        btnRepUno.style.display = "none";
        btnRepUno.classList.remove('active');
        btnAle.classList.remove("active");
        btnRep.classList.add("active");
    }
});

audio.addEventListener('timeupdate', () => {
    const min = Math.floor(audio.currentTime / 60);
    const seg = Math.floor(audio.currentTime % 60);
    const minTx = String(min).padStart(2, "0");
    const segTx = String(seg).padStart(2, "0");
    time.textContent = minTx + ":" + segTx;
    const minFal = Math.floor(audio.duration / 60);
    const segFal = Math.floor(audio.duration % 60);
    const minFaltx = String(minFal).padStart(2, "0");
    const segFaltx = String(segFal).padStart(2, "0");
    dur.textContent = minFaltx + ":" + segFaltx;
    const porcentaje = (audio.currentTime * 100) / audio.duration;
    progres.style.width = porcentaje + "%";
    progressSd.value = porcentaje;
});

progressSd.addEventListener('input', (e)=>{
    if (!Reproductor.ruta) return;
    const port = (progressSd.value / 100) * audio.duration;
    audio.currentTime = port;
});

progressSd.addEventListener('mousemove', (e)=>{
    const med = progressSd.getBoundingClientRect();
    const postRel = e.clientX - med.left;
    const prHover = (postRel / med.width) * 100;
    const prt = (prHover / 100) * audio.duration
    const prHoverseg = Math.floor(prt % 60);
    const prHovermin = Math.floor(prt / 60);
    const prHoversegTx = String(prHoverseg).padStart(2, "0");
    const prHoverminTx = String(prHovermin).padStart(2, "0");
    hvTime.textContent = prHoverminTx + ":" + prHoversegTx;
    hvTime.style.display = "flex";
});

progressSd.addEventListener('mouseleave', () => {
    hvTime.style.display = "none";
});

vol.addEventListener('input', (e)=>{
    if (!Reproductor.ruta) return;
    audio.volume = vol.value;
    if(vol.value == 0){
        muted.textContent = "🔇";
        audio.muted = true;
    }else{
        muted.textContent = "🔊"
        audio.muted = false;
    }
});

muted.addEventListener('click', (e)=>{
    if (!Reproductor.ruta) return;
    if (audio.muted == false){
        muted.textContent = "🔇";
        audio.muted = true;
        vol.value = 0;
    }else{
        muted.textContent = "🔊"
        audio.muted = false;
        vol.value = 1;
    }
});