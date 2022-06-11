let button = document.getElementById("signup");

button.addEventListener("click", function(event){

    event.preventDefault();

    const first_name = document.getElementById("first_name").value;

    const last_name = document.getElementById("last_name").value;

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const dob = ""+document.getElementById("day").value+"-"+document.getElementById("month").value+"-"+document.getElementById("year").value;

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

    data.append('dob', dob);

    data.append('country', country);

    data.append('city', city);

    data.append('phone', phone);

    data.append('gender', selectedGender);

    let url = 'http://127.0.0.1:8000/api/v1/user/signup';

});