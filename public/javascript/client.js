const text = document.querySelector(".fancy");
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";
for (let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;

    if (char === splitText.length) {
        complete();
        return;
    }

    function complete() {
        clearInterval(timer);
        timer = null;
    }
}
/* Text Animation Tutorial bron: https://www.youtube.com/watch?v=GUEB9FogoP8 */

/* Form validation https://www.youtube.com/watch?v=ps0-JAQENXI */


const form = document.querySelector("form[name='toevoeg-form']");
const nameInput = document.querySelector("input[name='naam']");

nameInput.isValid = () => !!nameInput.value;

const inputFields = [nameInput];



let shouldValidate = false;
let isFormValid = false;

const validateInputs = () => {
    console.log("we are here");
    if (!shouldValidate) return;

    isFormValid = true;
    inputFields.forEach((input) => {
        input.classList.remove("invalid");
        input.nextElementSibling.classList.add("hide");

        if (!input.isValid()) {
            input.classList.add("invalid");
            isFormValid = false;
            input.nextElementSibling.classList.remove("hide");
        }
    });
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    shouldValidate = true;
    validateInputs();
    if (isFormValid) {

    }
});

inputFields.forEach((input) => input.addEventListener("input", validateInputs));