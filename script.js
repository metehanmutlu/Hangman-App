const canvas = document.getElementById('hangman-canvas');
const context = canvas.getContext('2d');
const wrong_letters = document.getElementById('wrong-letters')
const alert_box = document.getElementsByClassName('alert-box')[0];
const all_letters = document.getElementsByClassName('letter');
const popup_container = document.getElementById('popup-container');
const play_again = document.getElementById('play-again');
const popup = document.getElementsByClassName('popup')[0];
const success_message = document.getElementById('success-message');
clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

Draw = (part) => {
    switch (part) {
        case 'gallows':
            context.strokeStyle = 'white';
            context.lineWidth = 4;
            context.beginPath();
            context.moveTo(80, 200);
            context.lineTo(5, 200);
            context.moveTo(40, 200);
            context.lineTo(40, 5)
            context.moveTo(38, 5)
            context.lineTo(100, 5)
            context.moveTo(98, 5)
            context.lineTo(98, 25)
            context.stroke();
            break;
        case 'head':
            context.lineWidth = 3;
            context.beginPath();
            context.arc(100, 45, 20, 0, Math.PI * 2, true);
            context.closePath()
            context.stroke();
            break;
        case 'body':
            context.beginPath();
            context.moveTo(100, 65);
            context.lineTo(100, 140);
            context.stroke();
            break;
        case 'rightArm':
            context.beginPath();
            context.moveTo(100, 90);
            context.lineTo(130, 70);
            context.stroke();
            break;
        case 'leftArm':
            context.beginPath();
            context.moveTo(100, 90);
            context.lineTo(70, 70);
            context.stroke();
            break;
        case 'rightLeg':
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(120, 170);
            context.stroke();
            break;
        case 'leftLeg':
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(80, 170);
            context.stroke();
            break;
    }
}

const parts = [
    'gallows',
    'head',
    'body',
    'rightArm',
    'leftArm',
    'rightLeg',
    'leftLeg'
];

const words = [
    'çilek',
    'elma',
    'armut',
    'kiraz',
    'vişne',
    'mandalina',
    'portakal',
    'turunç',
    'kumkat',
    'ayva',
    'kivi',
    'üzüm',
    'erik',
    'alıç',
    'hurma',
    'karadut',
    'frambuaz',
    'kavun',
    'karpuz',
    'kayısı',
    'muz',
    'şeftali',
    'dut',
    'kuşburnu',
    'karınca',
    'antilop',
    'anakonda',
    'karıncayiyen',
    'arı',
    'kelebek',
    'kuş',
    'yarasa',
    'ayı',
    'kunduz',
    'boğa',
    'çita',
    'civciv',
    'deve',
    'karga',
    'kedi',
    'tavuk',
    'timsah',
    'eşşek',
    'köpek',
    'yunus',
    'güvercin',
    'ördek',
    'fil',
    'kartal',
    'balık',
    'kurbağa',
    'burak',
    'şahin',
    'tilki',
    'hüseyin',
]

let step = 1;
Draw(parts[0])

let usedLetters = [];

// next.addEventListener('click', function (e) {
//     Draw(parts[step++])
//     if (parts[step] === undefined) e.target.disabled = true;
// });



randomWord = () => {
    const word_index = Math.floor(Math.random() * (words.length));
    const word = words[word_index];
    const letters = document.getElementById('letters');
    for (let i = 0; i < word.length; i++) {
        const letter = document.createElement('span');
        letter.setAttribute('class', 'letter');
        letters.appendChild(letter)
    }
    console.log(word);
    return word_index;
}

let word_index = randomWord();


play_again.addEventListener('click', (e) => {
    clearCanvas()
    step = 1
    Draw(parts[0])
    const letters = document.getElementById('letters');
    letters.innerHTML = '';
    word_index = randomWord();
    wrong_letters.textContent = '';
    usedLetters = [];
    popup_container.style.display = 'none';
    popup.style.backgroudColor = 'green';
    success_message.textContent = 'Kazandınız!'
});


alertBox = () => {
    if (!alert_box.classList.contains('show')) {
        alert_box.classList.add('show');
        console.log('alert box visible');
        setTimeout(() => {
            if (alert_box.classList.contains('show')) {
                alert_box.classList.remove('show');
                console.log('alert box invisible');
            }
        }, 2000);
        // alert_box.addEventListener('transitionend', (e) => {
        //     if (e.propertyName === 'transform') {
        //         setTimeout(() => {
        //             if (alert_box.classList.contains('show')) {
        //                 alert_box.classList.remove('show');
        //                 console.log('alert box invisible');
        //             }
        //         }, 2000);
        //     }
        // })
    }
}

const isFinished = () => {
    let finished = true;
    for (let i = 0; i < all_letters.length; i++) {
        const letter = all_letters[i];
        if (letter.innerText === '') {
            finished = false;
        }
    }
    return finished;

}

isCorrect = (key) => {
    if (usedLetters.includes(key)) alertBox();
    if (usedLetters.indexOf(key) === -1) usedLetters.push(key)
    wrong_letters.textContent = String(usedLetters);
    const word = words[word_index];
    const letters = document.getElementById('letters');
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        if (letter === key) {
            letters.children[i].textContent = key;
        }
    }
    if (isFinished()) popup_container.style.display = 'flex';
}

isWrong = (key) => {
    const word = words[word_index];
    if (usedLetters.includes(key)) alertBox();
    if (usedLetters.indexOf(key) === -1) {
        usedLetters.push(key)
        Draw(parts[step++])
        if (parts[step] === undefined) {
            success_message.innerHTML = `Maalesef Kaybettiniz! <br> Doğru Kelime: ${word}`;
            popup_container.style.display = 'flex';
            popup.style.backgroundColor = 'tomato';
        }
    }
    wrong_letters.textContent = String(usedLetters);

}

document.addEventListener('keypress', (event) => {
    const key = event.key;
    const word = words[word_index];
    const isIn = word.indexOf(key);
    (isIn !== -1) ? isCorrect(key) : isWrong(key);
})