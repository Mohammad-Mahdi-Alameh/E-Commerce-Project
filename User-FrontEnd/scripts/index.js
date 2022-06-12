////
window.onload = viewCategories;
////

let flex_container = document.getElementById("flex-container");


function viewCategories() {



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



