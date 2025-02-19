// Add a check for mobile devices
function isMobile() {
    return window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
}

// Display a message if user is on mobile
function checkIfMobile() {
    if (isMobile()) {
        document.getElementById("mobile-message").style.display = "block"; // Display a message telling the user to play on PC
        // Instead of hiding the #game-container, you can target specific elements like word-container and score
        document.querySelectorAll(" #difficulty-container, #start-text,#best-score,#justt").forEach(el => el.style.display = "none");
    } else {
        document.getElementById("mobile-message").style.display = "none";
        // Show game content for PC
        document.querySelectorAll(" #start-text,#best-score,#justt").forEach(el => el.style.display = "block");
        document.getElementById("difficulty-container").style.display ="flex";
    }
}

// Call the check function on page load
window.addEventListener("load", checkIfMobile);

// Optionally: Run this check again on window resize (for responsive design)
window.addEventListener("resize", checkIfMobile);


let difficulity = "medium";

let bestScores = {
    easy: localStorage.getItem("bestScore_easy") || 0,
    medium: localStorage.getItem("bestScore_medium") || 0,
    hard: localStorage.getItem("bestScore_hard") || 0
};


function updateBestScore(finalScore) {
    if (finalScore > bestScores[difficulity]) {
        bestScores[difficulity] = finalScore;
        localStorage.setItem(`bestScore_${difficulity}`, finalScore); // Save new best score

        // Update UI
        document.getElementById("best-score-value").textContent = finalScore;
    }
}

function displayBestScore() {
    document.getElementById("best-score-value").textContent = bestScores[difficulity];
}

// Call this function when the game starts
displayBestScore();



let wordsEasy = [
"tree", "fish", "cake", "love", "moon", "door", "bird", "hand", "fire", "snow",
"time", "game", "star", "rain", "wind", "lake", "sand", "gold", "wave", "blue",
"frog", "rock", "leaf", "king", "bell", "song", "road", "book", "lamp", "rose",
"boat", "hope", "rice", "card", "tape", "wolf", "fire", "palm", "corn", "lamb",
"coin", "milk", "pink", "salt", "nest", "lion", "moon", "ship", "dart", "seed",
"jazz", "yarn", "ruby", "twig", "gift", "drum", "pearl", "gate", "sock", "rope",
"tank", "vine", "goat", "fair", "bead", "pear", "flax", "fern", "blue", "fork",
"haze", "warm", "cold", "nice", "fast", "slow", "high", "wide", "thin", "true",
"bold", "free", "kind", "brave", "soft", "hard", "deep", "dark", "good", "evil",
"rich", "poor", "wise", "happy", "loud", "calm", "dull", "pure", "wild", "zest",
"grip", "luck", "gale", "pact", "rain", "beam", "rust", "lint", "soot", "knot",
"clue", "glow", "tide", "whiz", "bump", "crab", "gulf", "whip", "slug", "lawn",
"hush", "ramp", "soak", "bark", "coal", "quay", "loft", "moss", "gaze", "howl",
"yawn", "plum", "rung", "pike", "dawn", "mule", "volt", "sway", "gild", "husk",
"fume", "snug", "yule", "mite", "pint", "hale", "oath", "quill", "sash", "twig",
"cusp", "lark", "mire", "fizz", "cork", "rift", "pore", "lurk", "peek", "jolt",
"tuft", "chop", "mend", "sift", "slab", "glow", "pram", "halo", "wisp", "reef",
"lamb", "barn", "mill", "fray", "toil", "gasp", "swim", "clap", "twit", "perk"
];
let wordsMedium = [
"planet", "stream", "purple", "banana", "guitar", "window", "silver", "hunter", "bridge", "flight",
"bubble", "forest", "pencil", "puzzle", "garden", "dancer", "singer", "friend", "castle", "rocket",
"glider", "school", "branch", "summer", "winter", "frozen", "shadow", "rabbit", "circus", "helmet",
"bishop", "temple", "crayon", "dragon", "feline", "breeze", "castle", "soccer", "farmer", "ticket",
"tunnel", "spider", "skater", "cookie", "basket", "ribbon", "magnet", "closet", "muffin", "pepper",
"button", "voyage", "pillow", "beacon", "safari", "zombie", "parrot", "comedy", "cactus", "dancer",
"rescue", "throne", "zodiac", "sphinx", "spirit", "scarab", "whisper", "wander", "violet", "topple",
"crunch", "goblin", "dagger", "blazer", "bandit", "gravel", "sunset", "canyon", "lizard", "mantis",
"pebble", "bishop", "hurdle", "mascot", "puzzle", "ranger", "safari", "hunger", "beacon", "monkey",
"breeze", "velvet", "rocket", "socket", "marble", "cobweb", "walnut", "picnic", "gloves", "gopher",
"potion", "sneeze", "shovel", "thrust", "shadow", "anklet", "goblet", "mystic", "puddle", "throne",
"piston", "gospel", "cyborg", "warped", "brandy", "glisten", "bunker", "scarab", "sizzle", "willow",
"blonde", "hazard", "cactus", "jumble", "lively", "muddle", "ranger", "tundra", "vacant", "wither",
"outfit", "helmet", "copper", "pencil", "spirit", "wallet", "zigzag", "trophy", "puzzle", "vortex",
"guitar", "castle", "cradle", "rescue", "sunset", "voyage", "wrinkle", "bomber", "cannon", "diving"
];
let wordsHard = [
"elephant", "mountain", "keyboard", "tropical", "dolphins", "diamond", "football", "airplane", "chimney", "whisper",
"triangle", "carousel", "tornado", "universe", "squirrel", "bizarre", "jasmine", "enchants", "sapphire", "journey",
"overcome", "miracles", "laughter", "velocity", "backbone", "treasure", "firework", "macaroni", "gangster", "mystical",
"relaxing", "blossoms", "unicorns", "absolute", "fantasy", "moonlight", "galaxies", "mermaids", "horizon", "harmonic",
"fireflies", "paradise", "campfire", "gracious", "warriors", "curiosity", "explorer", "momentum", "applause", "velocity",
"magician", "calypso", "symmetry", "whimsical", "painting", "radiance", "novelist", "bravery", "brilliant", "daylight",
"eclipse", "diligent", "fracture", "fantasia", "grateful", "twilight", "voyaging", "serenity", "fortress", "horizon",
"pioneers", "rainfall", "lightbulb", "envision", "marathon", "sculptor", "voyagers", "vibrancy", "delicate", "wavelength",
"butterfly", "avalanche", "candyman", "carousel", "tremor", "scouting", "elevator", "manifold", "ominous", "mystique",
"futurism", "imagineer", "parallel", "navigate", "pipeline", "abundant", "symphony", "splendid", "phenomenon", "landmark",
"snapshot", "spectral", "terrific", "foresight", "notebook", "backstage", "darkness", "orchestra", "drifting", "heritage",
"freezing", "shocking", "striking", "thriller", "abstract", "achieved", "crafting", "coloring", "gestures", "insights",
"landscape", "medieval", "midnight", "roadtrip", "spotless", "strength", "sunshine", "whirlpool", "wondrous", "zoology"
];


let currentWord = "";
let currentIndex = 0;
let wordContainer = document.getElementById("word-container");
let startText = document.getElementById("start-text");
let startLetters = document.querySelectorAll(".start-letter");
let scoreElement = document.getElementById("score-value");
let multiplierElement = document.getElementById("multiplier-value");
let timerElement = document.getElementById("timer-value");
let gameOverText = document.getElementById("game-over");
let restartBtn = document.getElementById("restart-btn");

let score = 0;
let typedStart = "";
let multiplier = 1;
let allCorrect = true;
let timeLeft = 30;
let timerInterval;




document.getElementById("easy-btn").addEventListener("click", function() {
    difficulity = "easy";
    setSelectedButton("easy");
    displayBestScore(); // Update best score display for selected difficulty

});
document.getElementById("medium-btn").addEventListener("click", function() {
    difficulity = "medium";
    setSelectedButton("medium");
    displayBestScore(); // Update best score display for selected difficulty

});
document.getElementById("hard-btn").addEventListener("click", function() {
    difficulity = "hard";
    setSelectedButton("hard");
    displayBestScore(); // Update best score display for selected difficulty

});

function setSelectedButton(selected) {
    document.getElementById("easy-btn").classList.remove("selected");
    document.getElementById("medium-btn").classList.remove("selected");
    document.getElementById("hard-btn").classList.remove("selected");

    document.getElementById(selected + "-btn").classList.add("selected");
}



document.addEventListener("keydown", (event) => {
    if (startText.style.display !== "none") {
        let expectedChar = "START"[typedStart.length]; 
        if (event.key.toUpperCase() === expectedChar) {
            startLetters[typedStart.length].classList.add("typed");
            typedStart += event.key.toUpperCase();
            if (typedStart === "START") {
                typedStart = "";

                startGame();
                typedStart = "";

            }
        } else {
            typedStart = "";
            startLetters.forEach(letter => letter.classList.remove("typed"));
        }
    }
});

function startGame() {
    startText.style.display = "none";
    document.getElementById("justt").style.display = "none";
    document.getElementById("difficulty-container").style.display = "none";
    wordContainer.style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("multiplier").style.display = "block";
    document.getElementById("timer").style.display = "block";
    gameOverText.style.display = "none";
    restartBtn.style.display = "none";
    
    document.addEventListener("keydown", handleTyping);
    generateWord();
    startTimer();
}

function generateWord() {
    if (difficulity == "easy") {
        currentWord = wordsEasy[Math.floor(Math.random() * wordsEasy.length)];

        
    }
    else if(difficulity == "medium"){
        currentWord = wordsMedium[Math.floor(Math.random() * wordsMedium.length)];

    }
    else{
        currentWord = wordsHard[Math.floor(Math.random() * wordsHard.length)];

    }
    currentIndex = 0;
    allCorrect = true;
    wordContainer.innerHTML = "";
    for (let letter of currentWord) {
        let span = document.createElement("span");
        span.textContent = letter;
        span.classList.add("letter");
        wordContainer.appendChild(span);
    }
}

function handleTyping(event) {
    if (event.key === "Backspace") return;
    let letters = document.querySelectorAll(".letter");
    if (currentIndex < currentWord.length) {
        if (event.key === currentWord[currentIndex]) {
            letters[currentIndex].classList.add("correct");
        } else {
            letters[currentIndex].classList.add("incorrect");
            allCorrect = false;
        }
        currentIndex++;
    }
    if (currentIndex === currentWord.length) {
        score += allCorrect ? 10 * multiplier : 0;
        multiplier = allCorrect ? multiplier + 1 : 1;
        scoreElement.textContent = score;
        multiplierElement.textContent = `x${multiplier}`;
        setTimeout(generateWord, 300);
    }
}

function startTimer() {
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById("final-score-value").textContent = score;

    document.removeEventListener("keydown", handleTyping);
    gameOverText.style.display = "block";
    restartBtn.style.display = "flex";
    document.getElementById("final-score").style.display = "block";
    document.getElementById("score").style.display = "none";
    document.getElementById("multiplier").style.display = "none";
    document.getElementById("timer").style.display = "none";
    wordContainer.style.display = "none";
    updateBestScore(score); 
}

function restartGame() {
    location.reload(); 

}
