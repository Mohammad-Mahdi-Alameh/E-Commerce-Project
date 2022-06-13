let login_btn = document.getElementById("login");
let login_form = document.getElementById("login-form");
let column = document.getElementById("column");
let login_form_button = document.getElementById("btn-form-login");
let cancel_login = document.getElementById("btn-login-form-cancel");
let successful_login = document.getElementById("successful_login");
let add_category_btn = document.getElementById("add_category");
let category_form = document.getElementById("category_form");
let cancel_add_category = document.getElementById("btn-category-form-cancel");
let form_add_category_btn = document.getElementById("btn-form-add-category");
let add_item_btn = document.getElementById("add_item");
let item_form = document.getElementById("item_form");
let cancel_add_item= document.getElementById("btn-item-form-cancel");
let form_add_item_btn = document.getElementById("btn-form-add-item");
let logout = document.getElementById("logout");
var token;

function checkToken() {
    token = localStorage.getItem("token")
    if (token) {

        column.style.display = "none";
        successful_login.style.display = "block";

    }
    else
        column.style.display = "block";

}
login_btn.addEventListener("click", function (event) {

    event.preventDefault();
    popUpLoginForm();

});

login_form_button.addEventListener("click", function (event) {


    event.preventDefault();
    login();

});

form_add_item_btn.addEventListener("click", function (event) {


    event.preventDefault();
    addItem();

});

form_add_category_btn.addEventListener("click", function (event) {


    event.preventDefault();
    addCategory();

});

logout.addEventListener("click", function (event) {


    event.preventDefault();
    logOut();

});

cancel_login.addEventListener("click", function (event) {


    event.preventDefault();
    hideLoginForm();

});

cancel_add_category.addEventListener("click", function (event) {


    event.preventDefault();
    hideAddCategoryForm();

});

cancel_add_item.addEventListener("click", function (event) {


    event.preventDefault();
    hideAddItemForm();

});

add_category_btn.addEventListener("click", function (event) {


    event.preventDefault();
    popUpAddCategoryForm();

});

add_item_btn.addEventListener("click", function (event) {


    event.preventDefault();
    popUpAddItemForm();

});







////
checkToken();
////

function popUpLoginForm() {

    login_form.style.display = "block";
    column.style.display = "none";

}

function hideLoginForm() {

    login_form.style.display = "none";
    column.style.display = "block";

}

function popUpAddCategoryForm() {


    successful_login.style.display = "none";
    category_form.style.display = "block";

}

function hideAddCategoryForm() {

    login_form.style.display = "none";
    column.style.display = "none";
    category_form.style.display = "none";
    successful_login.style.display = "block";

}

function  popUpAddItemForm() {
    successful_login.style.display = "none";
    login_form.style.display = "none";
    item_form.style.display="flex";
}

function  hideAddItemForm() {
    login_form.style.display = "none";
    item_form.style.display="none";
    successful_login.style.display = "block";
}

function login() {

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    if (username == "" || password == "") {

        alert("Please fill the missing fields!")
    } else {



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

                    if (is_admin === "1") {

                        login_form.style.display = "none";
                        column.style.display = "none";
                        successful_login.style.display = "block";


                    } else

                        alert("Sorry dear admin but you can't login from here !!")
                }

                else {

                    if (message === false)

                        alert("Wrong Username or Password ! ");
                }

            });

    }
}
function addCategory() {
    const name = document.getElementById("Category_Name").value;
    if (name == "") {

        alert("Please fill the missing fields!")
    } else {
        let data = new FormData();

        data.append('name', name);

        let url = 'http://127.0.0.1:8000/api/v1/admin/add_category';

        axios({

            method: 'POST',

            url: url,

            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") },

            data: data,

        })

            .then(function (response) {


                let result = response.data;

                let message = result.message;

                if (message === "Category added successfully") {

                    alert("Category added successfully, please check it in the user page (and very very sorry for this but i don't have much time till the moment to view it here so I can do the rest of the main features)!");

                }
                else {
                    alert("Category already exists or the name is too short, try again !")
                }
            });
    }
}

function logOut() {

    let url = 'http://127.0.0.1:8000/api/v1/admin/logout';

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
                successful_login.style.display="none";
                column.style.display="block";

            }
            else {
                alert("Unknown error occured, try again !")
            }
        });
}

function addItem() {


    
    const name = document.getElementById("Item_Name").value;
    const price = document.getElementById("Item_price").value;
    const trade_mark = document.getElementById("Item_trade_mark").value;
    const model = document.getElementById("Item_model").value;
    const image = document.getElementById("Item_image").value;
    const description = document.getElementById("Item_description").value;
    const usage = document.getElementById("Item_usage").value;
    const category_name = document.getElementById("Item_category_name").value;
    


    if (name == "" ||price == "" ||trade_mark == "" ||model == "" ||image == "" ||description == "" ||usage == "" ||category_name == "" ) {

        alert("Please fill the missing fields!")
    } else {
        let data = new FormData();

        data.append('name', name);
        data.append('price', price);
        data.append('trade_mark', trade_mark);
        data.append('model', model);
        data.append('image', image);
        data.append('description', description);
        data.append('usage', usage);
        data.append('category_name', category_name);
     

        let url = 'http://127.0.0.1:8000/api/v2/admin/add_item';

        axios({

            method: 'POST',

            url: url,

            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") },

            data: data,

        })

            .then(function (response) {


                let result = response.data;

                let message = result.message;

                if (message === "Item added successfully") {

                    alert("Item added successfully, please check it in the user page (and very very sorry for this but i don't have much time till the moment to view it here so I can do the rest of the main features )!");

                }
                else {
                    alert("There is no such category, try again !")
                }
            });
    }
}
