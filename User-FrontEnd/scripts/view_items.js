////
window.onload = viewItems;
////


let flex_container = document.getElementById("flex-container");




function viewItems() {
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
                    string="<img src="+"../assets/like.svg"+">";
                    like_no[i].innerHTML=string;
                    
                    
                });}
                
                
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
        