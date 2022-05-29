//Global Elements
const counting = document.querySelector("#counter");
const likes = document.querySelector(".likes");
const minusButton = document.querySelector("#minus");
const plusButton = document.querySelector("#plus");
const heartButton = document.querySelector("#heart");
const pauseButton = document.querySelector("#pause");
const form = document.querySelector("#comment-form")
const submitComment = document.querySelector("#submit");
const comments = document.querySelector("#list");

//Making a counter that doesn't end
let intervalID = setInterval(counter, 1000);

function counter() {
    let currentNum = counting.textContent;

    let countingNumber = parseInt(currentNum, 10);
    countingNumber++;

    counting.textContent = countingNumber;
}

//Minus and Plus Buttons. Listen for click and then increment or decrement the counter.
minusButton.addEventListener("click", e => {
    let currentNum = counting.textContent;

    let counterNum = parseInt(currentNum, 10);
    counterNum--;

    counting.textContent = counterNum;
})

plusButton.addEventListener("click", e => {
    let currentNum = counting.textContent;

    let counterNum = parseInt(currentNum, 10);
    counterNum++;

    counting.textContent = counterNum;
})

//When like button is clicked, we create list element and add it to ul
heartButton.addEventListener("click", e => {
    const allLikes = document.querySelector(".likes").childNodes;
    const currentCount = counting.textContent;
    const found = Array.from(allLikes).find(element => element.getAttribute("data-num") === currentCount);
    
    if (found) {
        const elem = found;
        console.log(elem)
        const span = elem.querySelector("span");
        const spanString = span.textContent;
        let spanNum = parseInt(spanString, 10);
        elem.innerHTML = `${currentCount} has been liked <span>${++spanNum}</span> times`;
    }
    else {
        const newLine = document.createElement("li");
        newLine.setAttribute("data-num", `${currentCount}`);
        const content = `${currentCount} has been liked <span>1</span> times`;
        newLine.innerHTML = content;    
        likes.appendChild(newLine);
    }
})

//Add a comment
form.addEventListener("submit", e => {
    e.preventDefault();
    const line = document.createElement("p");

    line.textContent = document.querySelector("#comment-input").value;

    comments.appendChild(line);

    e.target.reset();
}) 

//Enable and Disable buttons using pause button. Also pause timer.
pauseButton.addEventListener("click", e => {
    if (e.target.textContent === " pause ") {
        //Changes button to "resume"
        e.target.textContent = " resume ";

        //Disables everything else 
        minusButton.setAttribute("disabled", "");
        plusButton.setAttribute("disabled", "");
        heartButton.setAttribute("disabled", "");
        submitComment.setAttribute("disabled", "");

        clearInterval(intervalID);
    }
    else if (e.target.textContent === " resume ") {
        //Changes button to "pause"
        e.target.textContent = " pause ";
    
        //Re-enable everything else 
        minusButton.removeAttribute("disabled");
        plusButton.removeAttribute("disabled");
        heartButton.removeAttribute("disabled");
        submitComment.removeAttribute("disabled");

        intervalID = setInterval(counter, 1000);
    }
})