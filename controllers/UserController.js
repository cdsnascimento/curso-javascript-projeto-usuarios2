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
            this.showHidePainel(); 
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
                        user.register, 
                        user.coutry,
                        user.email,
                        user.password, 
                        user.photo, 
                        user.admin
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
            console.log(JSON.parse(tr.dataset.user));

            this.showHidePainel();

        });

        this.tableEl.appendChild(tr);

        this.updateCount();

    }

    showHidePainel(){
       
       let painelCreate = document.querySelector('#box-user-create');
       let painelUpdate = document.querySelector('#box-user-update')
       
        if (painelCreate.style.display == "none") {
            painelCreate.style.display = "block";
            painelUpdate.style.display = "none";
        } else {
            painelCreate.style.display = "none";
            painelUpdate.style.display = "block";
        }
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