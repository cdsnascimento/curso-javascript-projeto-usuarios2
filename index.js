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

function addLine(dataUser){

    console.log(dataUser);

    var tr = document.createElement("tr");

    document.getElementById("table-users").innerHTML = `
    
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
    
    `;        

}


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

     var objUser = new User(
                            user.name, 
                            user.gender, 
                            user.birth, 
                            user.coutry,
                            user.email,
                            user.password, 
                            user.photo, 
                            user.admin
                            )

     addLine(objUser);

 });


 