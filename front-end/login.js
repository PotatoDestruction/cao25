const login = async (login) => {
    const response = await fetch(`http://localhost:8080/v1/auth/login`, {
     method: "POST",
     headers : {
         "Content-type": "application/json"
     },
     body: JSON.stringify(login)
    });

    const data = await response.json();
 
    console.log(data)
 
    if(data.error) {
     document.getElementById("error").textContent = data.error
     document.getElementById("error").style.color = "red"
     return
    }
 
    localStorage.setItem("token", data[0].token)
    localStorage.setItem("userId", data[1].id)
    console.log(data[0].token)

    window.location.href = "./index.html"
 //    window.open("../../../../index.html", "_self")
 };


 document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();

    document.getElementById("error").textContent = "";

    const elements = e.target.elements
    // console.log(elements)

    login({
        email: elements.email.value,
        password: elements.password.value
    });
});

document.getElementById("offline").addEventListener("click", () => {
    // window.location.href = "./index.html"
    setTimeout(() => window.location.href = "./index.html", 650)
});


localStorage.clear()