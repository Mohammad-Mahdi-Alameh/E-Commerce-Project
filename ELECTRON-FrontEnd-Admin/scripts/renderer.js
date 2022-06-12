


let login_btn = document.getElementById("login");
let form = document.getElementById("login-form");
let column = document.getElementById("column");
let login_form_button = document.getElementById("btn-form-login");
let cancel = document.getElementById("btn-form-cancel");


login_btn.addEventListener("click", function (event) {


    event.preventDefault();
    popUpLoginForm();

});

login_form_button.addEventListener("click", function (event) {


    event.preventDefault();
    login();

});

cancel.addEventListener("click", function (event) {


    event.preventDefault();
    hideLoginForm();

});

function popUpLoginForm() {

    form.style.display = "block";
    column.style.display = "none";

}

function hideLoginForm() {

    form.style.display = "none";
    column.style.display = "block";

}

function login() {

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    if (username == "" || password == "") {

        alert("Please fill the missing fields!")
    }


    let data = new FormData();

    data.append('username', username);

    data.append('password', password);

    let url = 'http://127.0.0.1:8000/api/v1/user/login';

    axios({

        method: 'POST',

        url: url,

        data: data,

    })

        .then(function (response) {


            let result = response.data;

            let message = result.success;

            if (message === true) {

                let token = result.token;

                let is_admin = result.is_admin;

                localStorage.setItem("token", token);

                document.getElementById("username").value = "";

                document.getElementById("password").value = "";

                if (is_admin === "1")

                    alert("Welcome Admin!");

                else

                    alert("Sorry dear admin but you can't login from here !!")
            }

            else {

                if (message === false)

                    alert("Wrong Username or Password ! ");
            }

        });

}

