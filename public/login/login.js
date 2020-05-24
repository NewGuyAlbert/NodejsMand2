const queryString = window.location.search;
if(queryString)
    alert("Username or password incorrect");

function validateUser() {

    console.log("validate user...")

    const username = document.forms.loginform.username.value;
    const password = document.forms.loginform.password.value;

    if (!username || !password) {
        alert("Username or password should not be empty.")
        return false;
    }  
    if (password.length < 8) {
        alert("Password should be more than 8 characters.");
        return false;
    } 

    return true;
}