function validateUser() {


    console.log("validate user...")

    const username = document.forms.signupform.username.value;
    const email = document.forms.signupform.email.value;
    const password = document.forms.signupform.password.value;
    const passwordRepeat = document.forms.signupform.passwordRepeat.value;

    console.log("user: ", username, password, passwordRepeat)

    //re is for email validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email).toLowerCase())) {
        alert("Email not valid");
        return false;
    }

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