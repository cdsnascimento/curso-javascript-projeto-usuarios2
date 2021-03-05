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

/* 
 document.querySelectorAll("button").forEach(function(){
     this.addEventListener("click", function(){
        console.log("Clicou");
     });
 });
*/


let userController = new UserController("form-user-create","form-user-update", "table-users");
