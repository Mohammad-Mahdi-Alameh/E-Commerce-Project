let login = document.getElementById("login");

login.addEventListener("click", function(event){

    
    event.preventDefault();

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    if (username == "" || password == ""){

        alert("Please fill the missing fields!")
    }
    else{

    let data = new FormData();

    data.append('username', username);

    data.append('password', password);

    let url = 'http://127.0.0.1:8000/api/v1/user/login';
    

    axios({
   
        method: 'POST',
   
        url: url,
   
        data:data,
   
    })

    .then(function (response) {
   
        
        let result = response.data;
   
        let message = result.success;
               
        if(message === true){
              
            let token = result.token;
        
            let is_admin = result.is_admin;

            localStorage.setItem("token", token);

            document.getElementById("username").value = "";
   
            document.getElementById("password").value = "";
    
            if(is_admin === 0 )

                alert("Welcome User!");
            
            else
            
            alert("Sorry dear admin but you can't login from here !!")}
           
        else{

            if(message ===false)

            alert("Wrong Username or Password ! ");
        }
        
    });
        
    }

});

