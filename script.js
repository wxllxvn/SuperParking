window.onload = function(){
    refreshRegistro()

}

const buttonCreateRegistro = document.getElementById("createRegistro");
const buttonCloseModal = document.getElementById("modal-close");
const modal = document.getElementById("modal-container");
const buttonCancelModal = document.getElementById("modal-button-cancel");
var geralIndex = 0
var d = new Date();

//buttons
buttonCreateRegistro.addEventListener("click", function(){
    modal.classList.add("open-modal")
});



const closeModal = () =>{
    modal.classList.remove("open-modal")
    clearInputsModal()
}

buttonCloseModal.addEventListener("click", () =>{
    closeModal()
})

buttonCancelModal.addEventListener("click", () =>{
    closeModal()
})

const clearInputsModal = () => {
    let modalNome = document.getElementById("nome")
    let modalTelefone = document.getElementById("telefone")
    let modalPlaca = document.getElementById("placa")
    let modalModelo = document.getElementById("modelo")
    modalNome.value = ""
    modalTelefone.value = ""
    modalPlaca.value = ""
    modalModelo.value = ""
}

//funcitios Register
function ConstrutorRegister(nome, tel, placa, modelo){
    this.nomeCliente = nome
    this.telefoneCliente = tel
    this.placaCliente = placa
    this.modeloCliente = modelo
    this.horarioCliente = new Date()
}

const getLocalStorage = (arr) => JSON.parse(localStorage.getItem(arr)) ?? [];
const setLocalStorage = (key, arr) => localStorage.setItem(key ,JSON.stringify(arr))

const createRegistro = (register) => {
    const dbRegister = getLocalStorage("db_client")
    dbRegister.push(register)
    setLocalStorage("db_client", dbRegister)
}

const fillFields = (client) => {
    document.getElementById("nome").value = client.nomeCliente
    document.getElementById("telefone").value = client.telefoneCliente
    document.getElementById("placa").value = client.placaCliente
    document.getElementById("modelo").value = client.modeloCliente
    modal.classList.add("open-modal")
}

const createEditClient = () => {
    let n = document.getElementById("nome").value
    let t = document.getElementById("telefone").value
    let p = document.getElementById("placa").value
    let m = document.getElementById("modelo").value
    const registerEdit = new ConstrutorRegister(n, t, p, m)
    return registerEdit
}

const returnClient = (index) =>{
    return getLocalStorage("db_client")[index]
}

const updateRegister = (index, newClient) => {
    let client = getLocalStorage("db_client")
    console.log(client[index])
    client.splice(index, 1, newClient)
    console.log(client)
    setLocalStorage("db_client", client)
    refreshRegistro()
}

const editClient = () => {
    if(isValid()){
        let n = document.getElementById("nome").value
        let t = document.getElementById("telefone").value
        let p = document.getElementById("placa").value
        let m = document.getElementById("modelo").value
        let finalClient = new ConstrutorRegister(n, t, p, m)
        return finalClient
    }
}




const deleteRegister = (index) =>{
    alert("Comfirmar a finalização do registro?")
    const dbClient = getLocalStorage("db_client") 
    dbClient.splice(index, 1)
    setLocalStorage("db_client", dbClient)
    refreshRegistro()
}


const tempCliente = {
    nome: "Solimar Marques Dos Santos",
    telefone: "11930960917",
    placa: "brca-1365",
    modelo: "camaro",
    horario: "21:30"
}

const refreshRegistro = () => {
    const dbClient = getLocalStorage("db_client") 
    const table = document.getElementById("table-register")
    const rowsRegister = document.getElementsByClassName("rows-register")
    let cont = 0
    table.innerHTML = ''
    dbClient.forEach(e => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${e.nomeCliente}</td>
            <td>${e.telefoneCliente}</td>
            <td>${e.horarioCliente}</td>
            <td>${e.placaCliente}</td>
            <td>${e.modeloCliente}</td>
            <td>
                <button class="edit-register" id="edit-${cont}">Editar</button>
                <button class="finish-register" id="finish-${cont}">Finalizar</button>
            </td>
        `
        table.appendChild(row)
        cont++
    });


}

const isValid = () => {
    let n = document.getElementById("nome").value
    let t = document.getElementById("telefone").value
    let p = document.getElementById("placa").value
    let m = document.getElementById("modelo").value
    if (n == '' || t == '' || p == '' || m == ''){
        return false
    } else{
        return true
    }
}

const editOrFinish = () => {
    if(event.target.type == "submit"){
        const dbClient = getLocalStorage("db_client")
        const [action, index] = event.target.id.split("-")

        if(action == "edit"){
            geralIndex = index
            document.getElementById("nome").dataset.index = "edit"
            fillFields(returnClient(index))
        }else if(action == "finish"){
            deleteRegister(index)
        }
    }
}

const btnRegistrar = document.getElementById("modal-button-registrar").addEventListener("click", () => {
    if(document.getElementById("nome").dataset.index == "register"){
        if (isValid()){
            let n = document.getElementById("nome").value
            let t = document.getElementById("telefone").value
            let p = document.getElementById("placa").value
            let m = document.getElementById("modelo").value
            const newRegister = new ConstrutorRegister(n, t, p, m)
            createRegistro(newRegister)
            refreshRegistro()
            closeModal()
        }
    }else{
        if(isValid()){
            let n = document.getElementById("nome").value
            let t = document.getElementById("telefone").value
            let p = document.getElementById("placa").value
            let m = document.getElementById("modelo").value
            let finalClient = new ConstrutorRegister(n, t, p, m)
            updateRegister(geralIndex, finalClient)
            document.getElementById("nome").dataset.index = "register"
            closeModal()
        }
    }
})  

const btnEditOrFinish = document.querySelector(".register")
btnEditOrFinish.addEventListener("click", editOrFinish)
