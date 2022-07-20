const token =  localStorage.getItem("token")
console.log(token)
const userId = localStorage.getItem("userId")
console.log(userId)

const createTutorial = async (tutorial) => {
    const response = await fetch(`http://localhost:8080/v1/tutorials`, {
        method: "POST",
        headers: {
            
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tutorial)
    });
    
    const tutorials = await response.json();

    console.log(tutorials)
    
    if (tutorials.error) {
        window.location.href = "./login.html"
    }
    console.log(tutorials.userIdToken)

    console.log(tutorial)
    


    
}

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();

    

    let elements = e.target.elements

    let title = elements.title.value
    let content = elements.content.value
    let privateTutorial = elements.private.checked
    
    let newTutorial = {
        user_id: userId,
        title: title,
        content: content,
        private: privateTutorial
    }

    // console.log(privateTutorial)

    createTutorial(newTutorial)

    // title = ""
    // content = ""
    // privateTutorial = false

    document.querySelector("form").reset()
    
    setTimeout(() => window.location.href = "./my-tutorials.html", 650)
});

