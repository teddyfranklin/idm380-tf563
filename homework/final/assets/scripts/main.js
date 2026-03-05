// Retreive form elements
const form = document.querySelector('form');

const firstNameInput = document.getElementById('firstName');
const firstNameError = document.getElementById('firstName-error');
const lastNameInput = document.getElementById('lastName');
const lastNameError = document.getElementById('lastName-error');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const messageInput = document.getElementById('message');
const messageError = document.getElementById('message-error');

const submitButton = document.querySelector('.submitButton');

// DONT TOUCH THIS IT WORKS
// firstNameInput.addEventListener('blur', function() {
//     const value = firstNameInput.value.trim();
//     if (value === '') {
//         this.setAttribute('aria-invalid', 'true');
//         firstNameError.textContent = 'First name is required';
//         firstNameError.style.display = 'block';
//     }
// });

// destructuring a struct. seems simpler to do this in js than C.
const fields = [
    { input: firstNameInput, error: firstNameError, label: 'First name' },
    { input: lastNameInput,  error: lastNameError,  label: 'Last name' },
    //{ input: emailInput,     error: emailError,     label: 'Email' },
    { input: messageInput,   error: messageError,   label: 'Message' },
];

// this is inelegant but i have no understanding of another way to do it
function checkEmail() {
    const value = emailInput.value.trim();
    if (value === '') {
        emailInput.setAttribute('aria-invalid', 'true');
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
    } else if (emailInput.validity.typeMismatch) {
        emailInput.setAttribute('aria-invalid', 'true');
        emailError.textContent = 'Entered value needs to be an email address.';
        emailError.style.display = 'block';
    } else {
        emailInput.setAttribute('aria-invalid', 'false');
        emailError.textContent = '';
        emailError.style.display = 'none';
    }
}

// displays an error if a field is empty
fields.forEach(function({ input, error, label}) {
    input.addEventListener('blur', function() {
        const value = input.value.trim();
        if (value === '') {
            input.setAttribute('aria-invalid', 'true');
            error.textContent = label + ' is required' + '!';
            error.style.display = 'block';
        } else {
            input.setAttribute('aria-invalid', 'false');
            error.textContent = '';
            error.style.display = 'none';
        }
    });
});

emailInput.addEventListener("input", (checkEmail));
emailInput.addEventListener("blur", (checkEmail));


form.addEventListener('submit', function(event) {
    event.preventDefault();

    fields.forEach(function({ input }) {
        input.dispatchEvent(new Event('blur'));
    });
    checkEmail();

    const invalidFields = document.querySelectorAll('[aria-invalid="true"]');

    if (invalidFields.length > 0) {
        invalidFields[0].focus();
        return;
    }
});

// submitButton.addEventListener('click', function(event) {
//         if (invalidFields.length = 0) {
//         input.reset();
//         const successMessage = document.getElementById('success-message');
//         successMessage.textContent = 'Your message has been sent successfully!';
//         successMessage.style.display = 'block';
//     }
// });

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const invalidFields = document.querySelectorAll('[aria-invalid="true"]');
    
    if (invalidFields.length > 0) {
        // Stop submission, focus the first invalid field
        invalidFields[0].focus();
        return;
    }
        form.reset();
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = 'Your message has been sent successfully!';
        successMessage.style.display = 'block';

    // All fields valid, proceed with submission
    console.log('Form submitted successfully');
});