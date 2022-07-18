var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
console.log(today)




const addUser = async (user) => {
    const response = await fetch(`http://localhost:8080/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json' 
        },
        body: JSON.stringify(user)
    })
};

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();

    let elements = e.target.elements;

    const user = {
        email: elements.email.value,
        password: elements.password.value,
        reg_timestamp: today
    }

    console.log(user)

    if(elements.email.value == "") {
        document.getElementById("error").textContent = "Email is required"
        document.getElementById("error").style.color = "red"
    }else if(elements.password.value == ""){
        document.getElementById("error").textContent = "Password is required"
        document.getElementById("error").style.color = "red"
    }else{

        addUser(user)

        elements.email.value = ""
        elements.password.value = ""
    
        window.location.href = "./login.html"

    }

    // addUser(user)

    // elements.email.value = ""
    // elements.password.value = ""

    // window.location.href = "./login.html"
})

document.getElementById("have").addEventListener("click", () => {
    // window.location.href = "./login.html"
    setTimeout(() => window.location.href = "./login.html", 650)
});

document.getElementById("offline").addEventListener("click", () => {
    // window.location.href = "./index.html"
    setTimeout(() => window.location.href = "./index.html", 650)
});


localStorage.clear()