class UserController{

    constructor(formId, tableId){
        
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }

    onSubmit(){

        this.formEl.addEventListener("submit", (event)=>{

            event.preventDefault();  // cancela a ação padrão do voluntário que seria atalizar

            let values = this.getValues();

            let btnSubmit = this.formEl.querySelector("[type=submit]");

            btnSubmit.disable = true;

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
    
        tr.innerHTML = `
        
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? "Sim" : "Não"}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
    
    `;

        this.tableEl.appendChild(tr);
    
    }
}