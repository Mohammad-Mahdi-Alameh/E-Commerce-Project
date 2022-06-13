////
window.onload = viewItems;
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
                window.location.href = "../index.html";

            }
            else {
                alert("Unknown error occured, try again !")
            }
        });
}




function viewItems() {

    token = localStorage.getItem("token")
    if (token) {

        let signup = document.getElementById("signup");
        let login = document.getElementById("login");
        let signout = document.getElementById("signout");

        signup.style.display = "none";
        login.style.display="none";
        signout.style.display="block";

    }




    let urlString = window.location.href;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    for (var pair of queryString.entries()) {
        console.log(pair[1]);
    }

    var url = 'http://127.0.0.1:8000/api/v1/user/get_items/' + pair[1];

    axios({

        method: 'GET',

        url: url,


    })

        .then(function (response) {

            let result = response.data;

            var string = "";

            result.forEach(element => {

                string += '<div class="flex-item" id=' + element.id + '><ul class="zoom">'

                    + '<li>' + element.name + '</li>'
                    + '<li>' + element.price + '</li>'
                    + '<li>' + element.trade_mark + '</li>'
                    + '<li>' + element.model + '</li>'
                    + '<li>' + element.image + '</li>'
                    + '<li>' + element.description + '</li>'
                    + '<li>' + element.usage + '</li>'
                    + '<li><a class="like-no" href=""><img src="../assets/dislike.svg" ></a></li>'


                    + '</ul></div>';

            });

            flex_container.innerHTML = string;

            let like_no = document.getElementsByClassName("like-no");
            for (let i = 0; i < like_no.length; i++) {

                // flex_items[i].addEventListner("click",viewItems);
                like_no[i].addEventListener("click", function (event) {

                    // console.log(this);
                    event.preventDefault();
                    var token = localStorage.getItem("token")
                    if (token) {
                        string = "<img src=" + "../assets/like.svg" + ">";
                        like_no[i].innerHTML = string;
                    } else

                        window.location.href = "../pages/login.html";


                });
            }


        });


}

function checkToken() {
    token = localStorage.getItem("token")
    if (token) {

        column.style.display = "none";
        successful_login.style.display = "block";

    }
    else
        column.style.display = "block";

}





