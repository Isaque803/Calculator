const container  = document.querySelector(".container")
const display = document.querySelector(".calc-display").querySelector("p")


let operetor 
let prevNumber = "0"
let currentNumber = ""
let hasOperetor = false

let currentTheme = 1

function toggleThemes(){
    currentTheme += 1
    switch(currentTheme){
        case 1:
            container.className = "container"
            break;
        case 2:
            container.className = "container theme02"
            break;
        case 3:
            container.className = "container theme03"
            break;
    }
    if (currentTheme > 2){
        currentTheme = 0
    }
}

addEventListener("click", () => maxNumbersDisplay())

function maxNumbersDisplay(){
    if (display.innerText.length < 22){
        display.innerText.length > 15 ? display.classList.add("max-number") : display.classList.remove("max-number")
        return false
    }else{
        return true
    }
}

function insertNumber(number){
    if (!/^[,0-9]+$/.test(display.innerText)){
        hasOperetor = true
    }

    if (/-?Infinity/gi.test(display.innerText)){
        prevNumber = ""
        hasOperetor = false
    }

    if (!maxNumbersDisplay()){
        if (display.innerText === "0" || /-?Infinity/gi.test(display.innerText)){
            display.innerText = number.toString()
        }else{
            display.innerText += number.toString()
        }
        !hasOperetor ? prevNumber += number : currentNumber += number
    }
}

function insertOperator(i){
    if (/-?Infinity/gi.test(display.innerText)){
        resetDisplay()
    }

    hasOperetor = true
    if (!maxNumbersDisplay()){
        if (!/[0-9]+[/x+-][0-9]+/g.test(display.innerText)){
            choiceOperation(i) 
            if (!/[//x+-]$/g.test(display.innerText)){
                display.innerText += operetor
            }else{
                display.innerText = display.innerText.slice(0, -1)
                display.innerText += operetor 
            }
        }
    }
}

function choiceOperation(op){
    switch(op){
        case 1:
            operetor = "+"
            break
        case 2:
            operetor = "-"
            break
        case 3:
            operetor = "/"
            break
        case 4:
            operetor = "x"
            break
    }
}

function insertDecimal(){
    if (!maxNumbersDisplay()){
        if (/[0-9]+$/g.test(display.innerText) && !/[,][0-9]+$/g.test(display.innerText)){
            display.innerText += ","
            !hasOperetor ? prevNumber += "," : currentNumber += ","
        }
    }
}

function calculateResult(){
    convertStringToNumber()
    switch(operetor){
        case "+":
            display.innerText = (prevNumber + currentNumber).toString().replace(".", ",")
            break
        case "-":
            display.innerText = (prevNumber - currentNumber).toString().replace(".", ",")
            break
        case "/":
            display.innerText = (prevNumber / currentNumber).toString().replace(".", ",")
            break
        case "x":
            display.innerText = (prevNumber * currentNumber).toString().replace(".", ",")
            break
    }

    if (display.innerText === "NaN" || /[0-9]+[,]$/.test(display.innerText)){
        display.innerText = prevNumber.toString().replace(".", ",")
    }
    
    prevNumber = display.innerText
    currentNumber = ""
    hasOperetor = false
}

function convertStringToNumber(){
    prevNumber = parseFloat(prevNumber.replace(",", "."))
    currentNumber = parseFloat(currentNumber.replace(",", "."))
}

function resetDisplay(){
    display.innerText = ""
    insertZero()
    hasOperetor = false
}

function deleteLastCaractere(){
    if (/-?Infinity/gi.test(display.innerText)){
        resetDisplay()
    }

    display.innerText = display.innerText.slice(0, -1)
    !hasOperetor ? prevNumber = prevNumber.slice(0, -1) : currentNumber = currentNumber.slice(0, -1)
    
    if (/^[,0-9]+$/.test(display.innerText)){
        hasOperetor = false
    }
    insertZero()
}

function insertZero(){
    if (display.innerText === ""){
        display.innerText = "0" 
        prevNumber = "0"
        currentNumber = ""
    }
}
