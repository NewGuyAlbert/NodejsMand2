async function validateUser() {


    console.log("validate user...")

    const username = document.forms.signupform.username.value;
    const password = document.forms.signupform.password.value;
    const passwordRepeat = document.forms.signupform.passwordRepeat.value;

    console.log("user ", username, password, passwordRepeat)

    if (password.length < 8) {
        alert("Password should be more than 8 characters.");
        return false;
    }

    if (password !== passwordRepeat) {
        alert("Password is incorrect.");
        return false;
    }

    return true;
}