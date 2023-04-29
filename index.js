// TODO: Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

// TODO: Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click", toggleDarkMode);

let signNowButton = document.getElementById("sign-now-button");

// Step 1: Refactor your code to use objects for petition submission
const addSignature = (person) => {
  if (person.name.trim().length >= 2 && person.country.trim().length >= 2 && person.email.trim().length >= 2 && person.email.includes('@') && person.email.includes('.')) {
    const newSignature = `🖊️ ${person.name} from ${person.country} supports this.`;
    const newSignatures = document.querySelector(".signatures");
    const newSignatureParagraph = document.createElement("p");
    newSignatureParagraph.textContent = newSignature;
    newSignatures.appendChild(newSignatureParagraph);

    const counter = document.querySelector("#counter");
    counter.remove();

    count = count + 1;

    const newCounter = document.createElement("p");
    newCounter.id = "counter";
    newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

    const signatures = document.querySelector(".signatures");
    signatures.appendChild(newCounter);
    toggleModal(person);

  }
}

let count = 3;

const validateForm = () => {
  let containsErrors = false;

  const petitionInputs = document.getElementById("sign-petition").elements;
  const email = document.getElementById('email');

  // Create person object
  const person = {
    name: petitionInputs[0].value,
    country: petitionInputs[1].value,
    email: email.value
  }

  // Loop through all inputs
  for (let i = 0; i < petitionInputs.length; i++) {
    const input = petitionInputs[i];

    // Check if the input is empty or has less than 2 characters
    if (input.value.trim().length < 2) {
      input.classList.add('error');
      containsErrors = true;
    } else {
      input.classList.remove('error');
    }
  }

  // Check if email is empty or invalid
  if (email.value.trim() === '' || !email.value.includes('@') || !email.value.includes('.')) {
    email.classList.add('error');
    containsErrors = true;
  } else {
    email.classList.remove('error');
  }

  if (!containsErrors) {
    addSignature(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
  }
}

signNowButton.addEventListener('click', validateForm);

// Remove the duplicate event listener
// signNowButton.addEventListener('click', addSignature);

// new code 4/17
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
};

let revealableContainers = document.querySelectorAll('.revealable');

function reveal() {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

document.getElementById('reduce-motion').addEventListener('click', reduceMotion);

function reduceMotion() {
  animation.transitionDuration = '0s';
  animation.transitionProperty = 'none';

  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    revealableContainers[i].style.transitionProperty = animation.transitionProperty;
  }
}




let scaleFactor = 1;
const modalImage = document.querySelector('#thanks-modal img');

function scaleImage() {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}

function toggleModal(person) {
  const modal = document.querySelector('#thanks-modal');
  const modalContent = document.querySelector('#modal-text-container p');
  // Set the modal to display
  modal.style.display = "flex";

  // Set the text content of the modal
  modalContent.textContent = `Thank you so much ${person.name} ! ${person.country} Represent!`;

  // Animate the image within the modal
  let intervalId = setInterval(scaleImage, 500);

  // Hide the modal after a few seconds
  setTimeout(() => {
    clearInterval(intervalId);
    modal.style.display = "none";
  }, 4000);
}
const closeModalBtn = document.querySelector('#close-modal-btn');

function closeModal() {
  const modal = document.querySelector('#thanks-modal');
  modal.style.display = 'none';
}
closeModalBtn.addEventListener('click', closeModal);