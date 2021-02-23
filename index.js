/* 
form basica para selecionar os elementos de um formulario e/ou pagina

let name = document.querySelector("#exampleInputName")
let gener = document.querySelectorAll("#form-user-create [name=gender]:checked")
let birth = document.querySelector("#exampleInputBirth")
let country = document.querySelector("#exampleInputCountry")
let email = document.querySelector("#exampleInputEmail")
let password = document.querySelector("#exampleInputPassword")
let photo = document.querySelector("#exampleInputFile")
 */

var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};


/* 
 document.querySelectorAll("button").forEach(function(){
     this.addEventListener("click", function(){
        console.log("Clicou");
     });
 });
*/


 document.getElementById("form-user-create").addEventListener("submit", function(event){
    event.preventDefault();  // cancela a ação padrão do voluntário que seria atalizar
    fields.forEach(function (field, index) {

        if (field.name == "gender") {
            if (field.checked) {
                user[field.name] = field.value;
            }
        }else {
            user[field.name] = field.value;
        }
        
     });

     console.log(user);
 });


 