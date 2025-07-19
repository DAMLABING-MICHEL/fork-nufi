const signUpBtn = document.getElementById('sign-up-btn');
const signInBtn = document.getElementById('sign-in-btn');
const mainContainer = document.getElementById('main-container');

if(!!signUpBtn && !! mainContainer) {
    signUpBtn.addEventListener('click', () => {
        mainContainer.classList.add("right-panel-active");
    });
}

if(!!signInBtn && !! mainContainer) {
    signInBtn.addEventListener('click', () => {
        mainContainer.classList.remove("right-panel-active");
    });
}

window.addEventListener('load', function() {
    const formType = document.getElementById('formType');
    if(formType?.value === 'register') {
        if(!!mainContainer) {
            mainContainer.classList.add("right-panel-active");
        }
    }
})

function handleSignupSubmit(e) {
    let error;
    const formData = new FormData(e.target);
    if(!formData.get("username") || !formData.get("password") || !formData.get("lastName")) {
        error = {
            title: 'Missing field',
            message: 'One or more of the following fields is not filled: Username, Password, Last name.'
        }
    }
    if(formData.get("password") !== formData.get("passwordConfirm")) {
        error = {
            title: 'Password mismatch',
            message: 'Password confirmation does not match the password.'
        }
    }
    if(!!error) {
        Swal.fire({
            toast: true,
            title: error.title,
            text: error.message,
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end"
        });
        e.preventDefault();
    }
}

function handleSigninSubmit(e) {
    const formData = new FormData(e.target);
    if(!formData.get("login") || !formData.get("password")) {
        Swal.fire({
            toast: true,
            title: 'Missing field',
            text: 'Please fill in your login and password',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end"
        });
        e.preventDefault();
    }
}