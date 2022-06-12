let login = document.getElementById("login");
let form = document.getElementById("login-form");
let column = document.getElementById("column");
let login_form_button = document.getElementById("btn-form-login");
let cancel = document.getElementById("btn-form-cancel");

login.addEventListener("click", function(event){

    
    event.preventDefault();
    popUpLoginForm();

});

login.addEventListener("click", function(event){

    
    event.preventDefault();
    login();

});

cancel.addEventListener("click", function(event){

    
    event.preventDefault();
    hideLoginForm();

});

function popUpLoginForm(){

    form.style.display="block";
    column.style.display="none";

}

function hideLoginForm() {

    form.style.display="none";
    column.style.display="block";
    
}