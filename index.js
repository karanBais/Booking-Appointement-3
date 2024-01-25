function handelForm(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const number = event.target.number.value;
    const appointement = event.target.appointement.value;

    const Userdetails = {
         name,
         email,
        number,
        appointement
    }
    // Storing in Local Storage
    localStorage.setItem(`${Userdetails.email}`, JSON.stringify(Userdetails))

    // Uploading to Cloude
    axios.post('https://crudcrud.com/api/f541a80d9fec462fba9b7537347c92ce/appointementData', Userdetails)
        .then((res) => {
            showUserData(res.data)
        })
        .catch(error => console.error(error))

}
// Getting details from crud-crud in window
window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/f541a80d9fec462fba9b7537347c92ce/appointementData')
    .then( (res) => {
        console.log(res)
        for(var i=0; i<res.data.length; i++){
            showUserData(res.data[i])
        }
    })
    .catch( (error) => {console.log(error)})
})

// Show data on screen

function showUserData(Userdetails) {
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("number").value = ""
    document.getElementById("appointement").value = ""

    // if(localStorage.getItem(Userdetails.email) !== null){
    //     remove
    // }

    const storage = document.querySelector(".storage")
    const newLi = document.createElement("li");
    newLi.id = `${Userdetails.id}`
    newLi.innerHTML = (`${Userdetails.name} - ${Userdetails.email} - ${Userdetails.number} - ${Userdetails.appointement}`)
    
    storage.appendChild(newLi)


    const editbtn = document.createElement("button")
    editbtn.innerHTML = "Edit";
    newLi.appendChild(editbtn);

    editbtn.onclick = function () {
        localStorage.removeItem(Userdetails.email);
        newLi.remove();

        document.getElementById("name").value = name;
        document.getElementById("email").value = email;
        document.getElementById("number").value = number;
        document.getElementById("appointement").value = appointement;
    }

    
    const deletebtn = document.createElement("button")
    deletebtn.innerHTML = "Delete"
    newLi.appendChild(deletebtn)

    deletebtn.onclick = function () {
        newLi.remove();
        localStorage.removeItem(Userdetails.email)
    }
}



inputReset()


function inputReset() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("number").value = "";
    document.getElementById("appointement").value = "";
}