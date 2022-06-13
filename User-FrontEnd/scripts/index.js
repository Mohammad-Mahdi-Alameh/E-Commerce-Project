////
window.onload = viewCategories;
////

let flex_container = document.getElementById("flex-container");

let logout=document.getElementById("signout");

logout.addEventListener("click", function (event) {


    event.preventDefault();
    logOut();

});

function logOut() {

    let url = 'http://127.0.0.1:8000/api/v1/user/logout';

    axios({

        method: 'POST',

        url: url,

        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") },

    })

        .then(function (response) {


            let result = response.data;

            let message = result.status;

            if (message === "success") {

                localStorage.removeItem("token");
                login.style.display="none";
                signup.style.display="none";
                logout.style.display="block";

            }
            else {
                alert("Unknown error occured, try again !")
            }
        });
}

function viewCategories() {
    token = localStorage.getItem("token")
    if (token) {

        let signup = document.getElementById("signup");
        let login = document.getElementById("login");
        let signout = document.getElementById("signout");

        signup.style.display = "none";
        login.style.display="none";
        signout.style.display="block";

    }




    var url = 'http://127.0.0.1:8000/api/v1/user/get_categories';

    axios({

        method: 'GET',

        url: url,


    })

        .then(function (response) {

            let result = response.data;

            var string = "";

            result.forEach(element => {
                string += '<div class="flex-item" id=' + element.name + '><ul class="zoom">'

                    + '<li>' + element.name + '</li>'

                    + '</ul></div>';

            });

            flex_container.innerHTML = string;
            let flex_items = document.getElementsByClassName("flex-item");
            for (let i = 0; i < flex_items.length; i++) {

                // flex_items[i].addEventListner("click",viewItems);
                flex_items[i].addEventListener("click", function (event) {

                    // console.log(this);
                    event.preventDefault();
                    var category_name = this.id;
                    // console.log(category_name);
                    window.location.href = "./pages/view_items.html?category_name=" + category_name;

                });
            }
        });
}



