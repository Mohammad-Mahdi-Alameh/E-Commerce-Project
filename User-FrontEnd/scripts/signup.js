let button = document.getElementById("signup");

button.addEventListener("click", function (event) {

    event.preventDefault();

    const first_name = document.getElementById("first_name").value;

    const last_name = document.getElementById("last_name").value;

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const c_password = document.getElementById("confirm_password").value;

    const dob = "" + document.getElementById("day").value + "-" + document.getElementById("month").value + "-" + document.getElementById("year").value;

    const country = document.getElementById("country").value;

    const city = document.getElementById("city").value;

    const phone = document.getElementById("phone").value;

    const radioButtons = document.querySelectorAll('input[name="gender"]');

    let selectedGender;

    for (const radioButton of radioButtons) {

        if (radioButton.checked) {

            selectedGender = radioButton.value;

            break;

        }

    }

    let data = new FormData();

    data.append('first_name', first_name);

    data.append('last_name', last_name);

    data.append('username', username);

    data.append('password', password);

    data.append('c_password', c_password);

    data.append('dob', dob);

    data.append('country', country);

    data.append('city', city);

    data.append('phone', phone);

    data.append('gender', selectedGender);

    let url = 'http://127.0.0.1:8000/api/v1/user/signup';

    axios({

        method: 'POST',

        url: url,

        data: data,

    })

        .then(function (response) {

            let result = response.data;

            let message = result.message;

            if (message === 'User successfully registered') {

                let token = result.token;

                localStorage.setItem("token", token);

                document.getElementById("first_name").value = "";

                document.getElementById("last_name").value = "";

                document.getElementById("username").value = "";

                document.getElementById("password").value = "";

                document.getElementById("confirm_password").value = "";

                document.getElementById("day").value = "";

                document.getElementById("month").value = "";

                document.getElementById("year").value = "";

                document.getElementById("country").value = "";

                document.getElementById("city").value = "";

                document.getElementById("phone").value = "";

                for (const radioButton of radioButtons) {

                    radioButton.checked = false;
                }

                window.location.href = "../index.html";
                
            } else {
                if (message === "Validator Failed ! Check your submitted values again!") {

                    alert(message);
                }

            }

        });


});

