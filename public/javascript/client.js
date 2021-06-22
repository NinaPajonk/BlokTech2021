/* Text Animation Tutorial bron: https://www.youtube.com/watch?v=GUEB9FogoP8 */
// const text = document.querySelector(".fancy");
// const strText = text.textContent;
// const splitText = strText.split("");
// text.textContent = "";
// for (let i = 0; i < splitText.length; i++) {
//     text.innerHTML += "<span>" + splitText[i] + "</span>";
// }

// let char = 0;
// let timer = setInterval(onTick, 50);

// function onTick() {
//     const span = text.querySelectorAll('span')[char];
//     span.classList.add('fade');
//     char++;

//     if (char === splitText.length) {
//         complete();
//         return;
//     }

//     function complete() {
//         clearInterval(timer);
//         timer = null;
//     }}


/* Form validation https://www.youtube.com/watch?v=ps0-JAQENXI */


const form = document.querySelector("form[name='toevoeg-form']");
const nameInput = document.querySelector("input[name='naam']");
const noNameInputError = document.querySelector(".error")
const symbolenInputError = document.querySelector(".symbolen")
const prijsInput = document.querySelector("input[name='prijs']");
const noPrijsInput = document.querySelector(".noPrijs")


nameInput.addEventListener('blur', (e) => {
    e.preventDefault()

    if (nameInput.value === '') {
        console.log(noNameInputError)
        noNameInputError.style.display = "block"

    } else if (!/[A-zÀ-ž- ]+/.test(nameInput.value)) {
        // console.log('Denk aan de patterns')
        symbolenInputError.style.display = "block"
    } else {
        noNameInputError.style.display = "none"
        symbolenInputError.style.display = "none"
    }

})

prijsInput.addEventListener('blur', (e) => {
    e.preventDefault()

    if(prijsInput.value === ''){
        console.log('wat is je prijs')
        noPrijsInput.style.display = "block"
    }
    else {
        noPrijsInput.style.display = "none"
    }
})


