function validateUser() {


    console.log("validate user...")

    const username = document.forms.signupform.username.value;
    const password = document.forms.signupform.password.value;
    const passwordRepeat = document.forms.signupform.passwordRepeat.value;

    console.log("user ", username, password, passwordRepeat)
    if(username == "") {
        alert("Username should not be empty");
        return false;
    }

    if (password.length < 8) {
        alert("Password should be more than 8 characters.");
        return false;
    }

    if (password !== passwordRepeat) {
        alert("Passwords do not match");
        return false;
    }

    return true;
}