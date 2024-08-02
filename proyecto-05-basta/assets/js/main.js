const consignaList = [
    "Nombres de mujeres", "Colores", "Animales", "Nombres de hombres",
    "Hombres famosos", "Mujeres famosas", "Países", "Marcas", "Verduras", "Comidas", "Tu elijes",
    "Ríos", "Montañas", "Deportes", "Películas", "Programas de TV",
    "Libros", "Autores", "Cantantes", "Grupos musicales", "Profesiones",
    "Instrumentos musicales", "Partes del cuerpo", "Enfermedades",
    "Medios de transporte", "Frutas", "Ropa", "Muebles", "Electrodomésticos",
    "Herramientas", "Juguetes", "Plantas", "Flores", "Animales marinos",
    "Insectos", "Reptiles", "Aves", "Bebidas", "Postres", "Tu elijes",
    "Golosinas", "Cosas de la escuela",
    "Cosas de la oficina", "Juegos", "Aplicaciones móviles", "Países de Europa",
    "Países de Asia", "Países de África", "Países de América", "Países de Oceanía",
    "Continentes", "Tu elijes", "Islas", "Lenguas", "Monedas", "Festividades",
    "Religiones", "Mitos", "Leyendas", "Planetas", "Estrellas", "Constelaciones",
    "Géneros musicales", "Películas animadas", "Cosas en el cielo", "Cosas en el mar",
    "Cosas en el espacio", "Cosas en la tierra", "Cosas en la casa", "Cosas en la cocina",
    "Cosas en el baño", "Cosas en el dormitorio", "Cosas en la sala", "Cosas en el jardín",
    "Cosas en la calle", "Cosas en la playa", "Cosas en el parque", "Cosas en la escuela",
    "Cosas en el hospital", "Cosas en la tienda", "Cosas en el supermercado", "Cosas en el cine",
    "Cosas en el teatro", "Cosas en el museo", "Cosas en el zoológico", "Cosas en la granja",
    "Cosas en el aeropuerto", "Cosas en la estación de tren", "Tu elijes", "Cosas en el autobús",
    "Cosas en el taxi", "Cosas en el barco", "Cosas en el avión", "Cosas en la bicicleta", "Cosas en el coche",
    "Cosas en la moto", "Tipos de música", "Géneros literarios",
    "Estilos artísticos", "Tipos de danza", "Formas geométricas", "Tipos de clima", "Elementos químicos", "Cosas que hago en la mañana", "cosas para hacerle a una vieja", "cosas que no podria hacer un enano", "mentiras comunes", "Excusas por llegar tarde", "Apodos por partes del cuerpo", "Piropos de albañil", "Es un 10 pero", "Placas de crónica", "Frases de madre", "Te amo, pero…", "Lugares para esconder un cuerpo", "Frase de tóxica", "Formas extrañas de morir", "Consejo que te daría tu padre", "quien te parece lindo/a segun tu genero?", "Un loco te persigue, que haces", "Palabra de cuatro letras", "Perdí mi...", "Equipos de Futbol", "De chiquito me...", "Que no harías en esta vida?", "Nombre de banda inventado", "Papá quiero ser...", "Personaje Ficticio", "No tuviste infancia si no...", "ella no te ama porque...", "Excusas para abandonar a alguien", "Presidentes", "Canciones Argentinas", "Argentinos famosos", "no soy normal porque...", "Super héroes", "Palabra en inglés", "Cosas que hay en la habitación", "Mamá, quiero ser...", "Cuando me aburro...", "Cuando sea grande no quiero…", "Personajes de los Simpsons", "De chiquito me…", "Asesinos famosos", "Mandamiento Nro 11", "Perdí mi...", "Cosas para hacer en la cama", "Formas de hacerme llorar", "Placeres culposos", "Participantes de Gran Hermano", "Cosas que no entran por la puerta de una casa", "Excusas para no bañarme", 
];

let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let usedLetters = [];
let currentConsigna;
let currentLetter;
let blinkInterval;
let timer;

function showIntro() {
    setTimeout(() => {
        document.getElementById('intro').classList.add('hidden');
        showCard();
    }, 2000); 
}

function showCard() {
    currentConsigna = consignaList[Math.floor(Math.random() * consignaList.length)];
    document.getElementById('consigna').innerText = currentConsigna;
    document.getElementById('card').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('card').classList.add('hidden');
        startGame();
    }, 4000); 
}

function startGame() {
    document.getElementById('game').classList.remove('hidden');
    displayLetters();
}

function displayLetters() {
    const lettersContainer = document.getElementById('letters');
    lettersContainer.innerHTML = '';
    letters.forEach(letter => {
        const letterDiv = document.createElement('div');
        letterDiv.className = 'letter';
        letterDiv.innerText = letter;
        if (usedLetters.includes(letter)) {
            letterDiv.classList.add('invisible');
        }
        letterDiv.onclick = () => letterClicked(letter, letterDiv);
        lettersContainer.appendChild(letterDiv);
    });

    // Añadir el botón "Fin" como una "letra"
    const finButton = document.createElement('div');
    finButton.className = 'letter fin-button';
    finButton.innerText = 'Fin';
    finButton.onclick = resetGameForNewConsigna;
    lettersContainer.appendChild(finButton);
}

function letterClicked(letter, letterDiv) {
    if (usedLetters.includes(letter)) return;

    if (currentLetter) {
        currentLetter.classList.remove('blink', 'red-background');
        currentLetter.classList.add('invisible'); 
        clearInterval(blinkInterval);
        clearInterval(timer);
    }

    usedLetters.push(letter);
    currentLetter = letterDiv;
    currentLetter.classList.add('blink');
    let timeLeft = 10;

    blinkInterval = setInterval(() => {
        currentLetter.classList.toggle('red-background');
    }, 500);

    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(blinkInterval);
            clearInterval(timer);
            currentLetter.classList.remove('blink', 'red-background');
            currentLetter.classList.add('invisible'); 
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    document.body.classList.add('red-background');
}

document.addEventListener('click', () => {
    if (document.body.classList.contains('red-background')) {
        document.body.classList.remove('red-background');
        displayLetters();
    }
});

function resetGameForNewConsigna() {
    usedLetters = [];
    document.getElementById('game').classList.add('hidden');
    showCard();
}

showIntro();