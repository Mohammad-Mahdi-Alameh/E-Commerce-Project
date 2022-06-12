////
window.onload=viewCategories;
////

let flex_container=document.getElementById("flex-container");

function viewCategories() {
    
  
   
    var url = 'http://127.0.0.1:8000/api/v1/user/get_categories';

    axios({
   
        method: 'GET',
   
        url: url,
   
   
    })

    .then(function (response) {
   
        let result = response.data;
        
        var string="";

        result.forEach(element=>{
                string += '<div id="flex-item"><ul>'
                
                                +'<li>' + element.name + '</li>' 
                                
                                +'</ul></div>'
    });

flex_container.innerHTML=string; 


});

            
}