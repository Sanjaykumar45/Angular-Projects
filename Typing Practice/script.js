
// const textApiURL = "https://api.quotable.io/random?minLength=200&maxLength=350";
// const textSection = document.getElementById("quote");
// const userInput = document.getElementById("quote-input");
// let quote = "";
// let time = 60;
// let timer = "";
// let mistakes = 0;

// const generateText = async () => {
//     const response = await fetch(textApiURL);

//     let data = await response.json();
//     quote = data.content;

//     let arr = quote.split("").map((value) =>{
//         return"<span class='quote-chars'>" + value + "</span>";
//     });

//     textSection.innerHTML += arr.join("");
// };

// userInput.addEventListener("input", ()=>{
//     let quoteChars = document.querySelectorAll(".quote-chars");

//     quoteChars = Array.from(quoteChars);

//     let userInputChars = userInput.value.split("");

//     quoteChars.forEach((char, index)=>{
//         if(char.innerText == userInputChars[index]){
//             char.classList.add("success");
//         }
//         else if(userInputChars[index] == null){
//             if (char.classList.contains("success")) {
//                 char.classList.remove("success");
//             }
//             else{
//                 char.classList.remove("fail");
//             }
//         }
//         else{
//             if(!char.classList.contains("fail")){
//                 mistakes += 1;
//                 char.classList.add("fail");
//             }
//             document.getElementById("mistakes").innerText = mistakes;
//         }
//         let check = quoteChars.every((element) => {
//             return element.classList.contains("success");
//         });
//         if(check){
//             displayResult();
//         }
//     });
// });

// function updateTimer(){
//     if(time == 0){
//         displayResult();
//     }
//     else{
//         document.getElementById("timer").innerText = --timer + "s";
//     }
// }

// const timeReduce = () =>{
//     time = 60;
//     timer = setInterval(updateTimer, 1000);
// };

// const displayResult = ()=>{
//     document.querySelector(".result").style.display = "block";
//     clearInterval(timer);
//     document.getElementById("stop-test").style.display = "none";
//     userInput.disabled = true;
//     let timeTaken = 1;
//     if(timer !=0){
//         timeTaken = (60 - time) / 100;
//     }
//     document.getElementById("wpm").innerText = (userInput.value.length/s/timeTaken).toFixed(2) + " wpm";
//     document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + " %";
// };

// const startTest = () =>{
//     mistakes = 0;
//     timer = "";
//     userInput.disabled = false;
//     timeReduce();
//     document.getElementById("start-test").style.display = "none";
//     document.getElementById("stop-test").style.display = "block";
// };

// window.onload = () =>{
//     userInput.value = "";
//     document.getElementById("start-test").style.display = "block";
//     document.getElementById("stop-test").style.display = "none";
//     userInput.disabled = true;
//     generateText();
// }

const textSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

// Fallback quotes in case API is not working
const fallbackQuotes = [
  "The only way to do great work is to love what you do. When you love what you're doing, it no longer feels like work. Passion and dedication lead to extraordinary results.",

"Life is what happens when you're busy making other plans. Sometimes, we get so focused on the future that we miss the beauty of the present. Embrace every moment.",

"The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well. True fulfillment comes from the positive impact we leave on others.",

"In the end, we will remember not the words of our enemies, but the silence of our friends. Friendship is about the quiet moments, the times when support is given without words.",

"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. Authenticity is a powerful and rare trait that can never be imitated.",

"You must be the change you wish to see in the world. If we want a better world, it begins with our own actions. Small changes in ourselves can lead to a massive shift in the world.",

"Do not go where the path may lead, go instead where there is no path and leave a trail. Dare to be different, to take risks, and create your own unique journey.",

"Success is not final, failure is not fatal: It is the courage to continue that counts. Life is a series of ups and downs; it's the perseverance to keep moving forward that truly matters.",

"It does not matter how slowly you go as long as you do not stop. Progress may seem slow at times, but persistence is key. Every step forward counts, no matter how small.",

"The only limit to our realization of tomorrow is our doubts of today. Self-doubt can hold us back, but if we trust in our abilities, there's no limit to what we can achieve.",

"The best way to predict your future is to create it. Rather than waiting for things to happen, take control of your life and shape the future you desire.",

"Success usually comes to those who are too busy to be looking for it. When you're focused on the process and putting in the work, success often comes naturally.",

"Believe you can and you're halfway there. Confidence is a powerful force. Once you believe in your ability to succeed, you're already on the path to achieving your goals.",

"The harder you work for something, the greater you'll feel when you achieve it. Effort and dedication lead to a deeper sense of accomplishment and pride in your work.",

"Don’t watch the clock; do what it does. Keep going. Time is constantly moving forward, and so should you. Keep working, keep growing, and the results will follow."
];

// Generate text either from API or fallback quotes
const generateText = async () => {
    let data = {};
    try {
        const response = await fetch("https://api.quotable.io/random?minLength=200&maxLength=350");
        data = await response.json();
        quote = data.content;
    } catch (error) {
        // Fallback to a random quote from the predefined set
        quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    }

    // Display the quote with individual characters
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    });

    textSection.innerHTML = arr.join("");
};

userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);
    let userInputChars = userInput.value.split("");

    quoteChars.forEach((char, index) => {
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
        } else if (userInputChars[index] == null) {
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        } else {
            if (!char.classList.contains("fail")) {
                mistakes += 1;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });
        if (check) {
            displayResult();
        }
    });
});

function updateTimer() {
    if (time == 0) {
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}

const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (timer != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / timeTaken).toFixed(2) + " wpm";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + " %";
};

const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    generateText();
};