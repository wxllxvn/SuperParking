window.onload = function(){
    refreshRegistro()

}

const buttonCreateRegistro = document.getElementById("createRegistro");
const buttonCloseModal = document.getElementById("modal-close");
const modal = document.getElementById("modal-container");
const buttonCancelModal = document.getElementById("modal-button-cancel");

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


const updateRegister = (index, client) => {
    const dbClient = getLocalStorage("db_client")
    dbClient[index] = client
    setLocalStorage("db_client", dbClient)
}

const deleteRegister = (index) =>{
    const dbClient = getLocalStorage("db_client") 
    dbClient.splice(index, 1)
    setLocalStorage("db_client", dbClient)
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
    table.innerHTML = ''
    console.log(rowsRegister)
    dbClient.forEach(e => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${e.nomeCliente}</td>
            <td>${e.telefoneCliente}</td>
            <td>${e.horarioCliente}</td>
            <td>${e.placaCliente}</td>
            <td>${e.modeloCliente}</td>
            <td>
                <button class="edit-register">Editar</button>
                <button class="finish-register">Finalizar</button>
            </td>
        `
        table.appendChild(row)
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

const btnRegistrar = document.getElementById("modal-button-registrar").addEventListener("click", () => {
    if (isValid()){
        let n = document.getElementById("nome").value
        let t = document.getElementById("telefone").value
        let p = document.getElementById("placa").value
        let m = document.getElementById("modelo").value
        const newRegister = new ConstrutorRegister(n, t, p, m)
        createRegistro(newRegister)
        refreshRegistro()
    }
})   