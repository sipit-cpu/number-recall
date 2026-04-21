let numbers = [];
let level = 3;
let score = 0;
let soundOn = true;
let language = "en";

let bestScore = localStorage.getItem("bestScore") || 0;
document.getElementById("best").innerText = bestScore;

// Variabel untuk menyimpan referensi timer agar bisa dibatalkan
let hideTimer;
let startTimer; // Tambahan untuk mencegah spam
let speechTimers = [];

function speak(text) {
    if (!soundOn) return;

    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = language === "id" ? "id-ID" : "en-US";
    speech.rate = 1.2;

    speechSynthesis.speak(speech);
}

function setLanguage(lang) {
    language = lang;
}

function toggleSound() {
    soundOn = !soundOn;

    if (!soundOn) {
        speechSynthesis.cancel();
    }

    document.getElementById("soundBtn").innerText =
        soundOn ? "🔊 Sound ON" : "🔇 Sound OFF";
}

function clearSpeechTimers() {
    speechTimers.forEach(t => clearTimeout(t));
    speechTimers = [];
}

function speakNumbers(numbers) {
    clearSpeechTimers();

    numbers.forEach((num, index) => {
        let timer = setTimeout(() => {
            speak(num.toString());
        }, 0 + index * 0);

        speechTimers.push(timer);
    });
}

function startGame() {
    // BERSIHKAN SEMUA TIMER SEBELUM MEMULAI
    speechSynthesis.cancel(); // Matikan suara yang sedang bicara
    clearSpeechTimers();      // Bersihkan antrian suara angka
    clearTimeout(hideTimer);  // Bersihkan timer penyembunyi angka
    clearTimeout(startTimer); // Bersihkan timer delay "Focus..." (PENTING)

    numbers = [];

    for (let i = 0; i < level; i++) {
        numbers.push(Math.floor(Math.random() * 10));
    }

    document.getElementById("numbers").innerText = "Focus...";
   

    // Simpan ke variabel startTimer agar bisa di-clear jika tombol di-klik lagi
    startTimer = setTimeout(() => {
        document.getElementById("numbers").innerText = numbers.join(" ");
        speakNumbers(numbers);
    }, 500);

    hideTimer = setTimeout(() => {
        document.getElementById("numbers").innerText = "???";
    }, level * 1000 + 2000);
}

function checkAnswer() {
    let input = document.getElementById("answer").value;
    let correct = numbers.slice().reverse().join("");
    let result = document.getElementById("result");

    speechSynthesis.cancel();

    if (input === correct) {
        score += 10;
        level++;

        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
        }

        document.getElementById("score").innerText = score;
        document.getElementById("best").innerText = bestScore;

        result.innerText = "Correct";
        result.style.color = "green";

        speak("Correct. Next level");

        setTimeout(() => {
            startGame();
        }, 1500);

    } else {
        result.innerText = "Wrong";
        result.style.color = "red";

        speak("Wrong answer");

        alert(`The correct answer is ${correct}`);

        score = 0;
        level = 3;

        document.getElementById("score").innerText = score;
    }

    document.getElementById("answer").value = "";

    setTimeout(() => {
        result.innerText = "";
    }, 1000);
}