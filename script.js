window.onload = function(){
    const buttonCreateRegistro = document.getElementById("createRegistro");
    const buttonCloseModal = document.getElementById("modal-close");
    const modal = document.getElementById("modal-container");
    const buttonCancelModal = document.getElementById("modal-button-cancel");

    //buttons
    buttonCreateRegistro.addEventListener("click", function(){
        modal.classList.add("open-modal")
    });

    const closeModal = () =>{
        modal.classList.remove("open-modal")
    }

    buttonCloseModal.addEventListener("click", () =>{
        closeModal()
    })

    buttonCancelModal.addEventListener("click", () =>{
        closeModal()
    })

    

    



}