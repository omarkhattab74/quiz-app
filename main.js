const number = document.querySelector("#number")
const category = document.querySelector("#category")
const difficulty = document.querySelector("#difficulty")
const Type = document.querySelector("#Type")
const startBtn = document.querySelector(".startBtn")
const questions = JSON.parse(localStorage.getItem("questions")) || []
const questionTitle = document.querySelector(".questionTitle")
let i = 0
const nextBtn = document.querySelector(".nextBtn")
const previousBtn = document.querySelector(".previousBtn")
let this_Q_number = document.querySelector(".this-Q-number")
let li = ""
let radio = ""
const back = document.querySelector(".back")

if (document.querySelector(".all-Q-number")) {

    document.querySelector(".all-Q-number").innerHTML = questions.length
}
let allAnswer = []
const finishBtn = document.querySelector(".finishBtn")
let score = 0


async function getquestions() {



    const response = await fetch(`https://opentdb.com/api.php?amount=${number.value}&category=${category.value}&difficulty=${difficulty.value}&type=${Type.value}`, {
        method: "get"
    })
    const resault = await response.json()

    if (resault.results.length > 0) {
        window.location.replace("questions.html")
        localStorage.setItem("questions", JSON.stringify(resault.results))

    }



}
if (startBtn) {
    startBtn.addEventListener("click", () => {
        getquestions()
        
    })
}
if (questionTitle) {
    function firstQuestion() {
        let container = ""
        allAnswer = [...questions[0].incorrect_answers]
        let randomIndex = Math.floor(Math.random()*(allAnswer.length+1))
        allAnswer.splice(randomIndex,0,questions[0].correct_answer)
        

        questionTitle.innerHTML = questions[0].question
        this_Q_number.innerHTML = 1

        for (let index = 0; index < allAnswer.length; index++) {
            container += ` <label onclick="handleSelection(${index})" for=${allAnswer[index]}>
                <li class="bg-white p-2 my-2 rounded-xl hover:bg-blue-400 hover:text-white duration-200"> <input type="radio" name="answer" id=${allAnswer[index]}> ${allAnswer[index]}</li>
            </label>`

        }

        document.querySelector("ul").innerHTML = container
        li = document.querySelectorAll("li")
        radio = document.querySelectorAll("input[type=radio]")
    }
    firstQuestion()
}


function getNextQuestion() {
    let container = ""
    i++
    if (i === questions.length) {
        i = questions.length - 1
    }
    if (i < questions.length) {

        this_Q_number.innerHTML = i + 1
        questionTitle.innerHTML = questions[i].question
          allAnswer = [...questions[i].incorrect_answers]
        let randomIndex = Math.floor(Math.random()*(allAnswer.length+1))
        allAnswer.splice(randomIndex,0,questions[i].correct_answer)
        for (let index = 0; index < allAnswer.length; index++) {
            container += ` <label onclick="handleSelection(${index})" for=${allAnswer[index]}>
                <li class="bg-white p-2 my-2 rounded-xl hover:bg-blue-400 hover:text-white duration-200"> <input type="radio" name="answer" id=${allAnswer[index]}> ${allAnswer[index]}</li>
            </label>`

        }
        document.querySelector("ul").innerHTML = container
        li = document.querySelectorAll("li")
        radio = document.querySelectorAll("input[type=radio]")
    }
}

if (nextBtn) {

    nextBtn.addEventListener("click", () => {
        getNextQuestion()
        saveAnswerStyle()
        showFinish()
    })
}

function getPreviousQuestion() {
    let container = ""
    i--
    if (i < 0) {
        i = 0
    }
    if (i >= 0) {
        this_Q_number.innerHTML = (i + 2) - 1

        questionTitle.innerHTML = questions[i].question
          allAnswer = [...questions[i].incorrect_answers]
        let randomIndex = Math.floor(Math.random()*(allAnswer.length+1))
        allAnswer.splice(randomIndex,0,questions[i].correct_answer)
        for (let index = 0; index < allAnswer.length; index++) {
            container += ` <label onclick="handleSelection(${index})" for=${allAnswer[index]}>
                <li class="bg-white p-2 my-2 rounded-xl hover:bg-blue-400 hover:text-white duration-200"> <input type="radio" name="answer" id=${allAnswer[index]}> ${allAnswer[index]}</li>
            </label>`

        }
        document.querySelector("ul").innerHTML = container
        li = document.querySelectorAll("li")
        radio = document.querySelectorAll("input[type=radio]")
    }
}
if (previousBtn) {

    previousBtn.addEventListener("click", () => {
        getPreviousQuestion()
        saveAnswerStyle()
        showFinish()
    })
}

function handleSelection(index) {
    for (let i = 0; i < radio.length; i++) {
        if (i === index) {

            radio[i].setAttribute("checked", "true")
            li[i].classList.replace("bg-white", "bg-blue-400")
            li[i].classList.add("text-white", "true")

        } else {
            radio[i].removeAttribute("checked")
            li[i].classList.replace("bg-blue-400", "bg-white")
            li[i].classList.remove("text-white")

        }

    }
    saveAnswer()

}

function saveAnswer() {
    for (let x = 0; x < li.length; x++) {
        if (li[x].classList.contains("bg-blue-400")) {
            localStorage.setItem(`${i + 1}`,li[x].innerText)

        }


    }

}


function saveAnswerStyle() {
    for (let y = 0; y < li.length; y++) {
        if (localStorage.getItem(`${i + 1}`) === li[y].innerText) {
            radio[y].setAttribute("checked", "true")
            li[y].classList.replace("bg-white", "bg-blue-400")
            li[y].classList.add("text-white", "true")
        }

    }
}
saveAnswerStyle()

function showFinish() {
    if ((i + 1) === questions.length) {
        finishBtn.classList.remove("hidden")
        nextBtn.classList.add("hidden", "true")
    } else {
        finishBtn.classList.add("hidden", "true")
        nextBtn.classList.remove("hidden")

    }
}
if (finishBtn) {
    
    finishBtn.addEventListener("click", () => {
        accountScore()
    })
}

function accountScore() {
    for (let x = 0; x < questions.length; x++) {
        if (String(localStorage.getItem(`${x + 1}`)).trim() === String(questions[x].correct_answer).trim()) {
            score++


        } 

    }
    
    localStorage.setItem("score",JSON.stringify(score))
    window.location.replace("score.html")

}

if ( document.querySelector(".your")) {
    
    document.querySelector(".your").innerHTML = JSON.parse(localStorage.getItem("score"))
}
if ( document.querySelector(".total")) {
    
    document.querySelector(".total").innerHTML = questions.length
}

if (back) {
    
    back.addEventListener("click",()=>{
    localStorage.clear()
    window.location.replace("index.html")
    })
}







