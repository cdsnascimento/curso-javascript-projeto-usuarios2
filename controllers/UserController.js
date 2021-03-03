class UserController{

    constructor(formId, tableId){
        
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();

    }

    onEdit(){

        let btnCancel = document.querySelector('#box-user-update .btn-cancel');

        btnCancel.addEventListener("click", e=>{
            this.hidePainelUpdate(); 
        });

        
    }

    onSubmit(){

        this.formEl.addEventListener("submit", (event)=>{

            event.preventDefault();  // cancela a ação padrão do voluntário que seria atalizar

            let btnSubmit = this.formEl.querySelector("[type=submit]");

            btnSubmit.disable = true;

            let values = this.getValues();

            if (!values) return false; 

            this.getPhoto().then(
                (content)=>{
                    values.photo = content;

                    this.addLine(values);

                    this.formEl.reset();

                    btnSubmit.disable = false;
                },
                (e)=>{
                    console.error(e);
                }
            );

        });
    }

    getPhoto(){

        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item=>{
                if (item.name === 'photo'){
                    return item;
                }
            });
    
            let file = elements[0].files[0];
    
            fileReader.onload = ()=>{
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (e)=>{
                reject(e);
            };

            if (file){
                fileReader.readAsDataURL(file);
            }else{
                resolve('dist/img/boxed-bg.jpg');
            }
            
        });


    }

    getValues(){

        let user = {};
        let frmIsValid = true;

        [...this.formEl.elements].forEach((field) => {

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                frmIsValid = false;
            }

            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }
            }else if (field.name == 'admin') {
                user[field.name] = field.checked;
            }else{
                user[field.name] = field.value;
            }
            
        });

        if(!frmIsValid){
            return false;
        }

        return new User(
                        user.name, 
                        user.gender, 
                        user.birth, 
                        user.country,
                        user.email,
                        user.password, 
                        user.photo, 
                        user.admin,
                        user.register
                        );
    }

    addLine(dataUser){
    
        let tr = document.createElement("tr");

        tr.dataset.user = JSON.stringify(dataUser);
    
        tr.innerHTML = `
        
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? "Sim" : "Não"}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
    
    `;

        let btnEdit = tr.querySelector(".btn-edit");

        btnEdit.addEventListener("click", e=>{

            let json = JSON.parse(tr.dataset.user);

            let formUpdate = document.querySelector("#form-user-update")

            for (let name in json){
                let field = formUpdate.querySelector("[name=" + name.replace("_","") + "]");
            
                if (field){
                    
                    switch (field.type) {
                        case 'file':
                            continue;
                            break;
                        case 'radio':
                            field = formUpdate.querySelector("[name=" + name.replace("_","") + "][value=" +  json[name] +"]");
                            field.checked = true;
                        case 'checkbox':
                            field.checked = json[name];
                            break;
                        default:
                            field.value = json[name];      
                    }

                    field.value = json[name];
                }
                
            }

            this.showPainelUpdate();

        });

        this.tableEl.appendChild(tr);

        this.updateCount();

    }

    showPainelUpdate(){
       
       let painelCreate = document.querySelector('#box-user-create');
       let painelUpdate = document.querySelector('#box-user-update')
       
       painelCreate.style.display = "none";
       painelUpdate.style.display = "block";

    }

    hidePainelUpdate(){
        let painelCreate = document.querySelector('#box-user-create');
        let painelUpdate = document.querySelector('#box-user-update')
        
        painelCreate.style.display = "block";
        painelUpdate.style.display = "none";

    }

    updateCount(){
        let numAdmin = 0;
        let numUsers = 0;

        [...this.tableEl.children].forEach( tr=>{

            numUsers++;

            let user = JSON.parse(tr.dataset.user);
            
            if (user._admin) numAdmin++;

        });

        document.getElementById("num-users").innerHTML = numUsers;
        document.getElementById("num-admin").innerHTML = numAdmin;
    }
}