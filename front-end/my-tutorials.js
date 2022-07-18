const token =  localStorage.getItem("token")
console.log(token)
const userId = localStorage.getItem("userId")
console.log(userId)


if(token) {
    const getMyTutorials = async () => {
        const res = await fetch(`http://localhost:8080/v1/tutorials/user-tutorials/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const tutorials = await res.json();
        
        console.log(tutorials)
        
        document.getElementById("off").textContent = "ONLINE"
        document.getElementById("off").style.color = "green"
    
    tutorials.resp.forEach(tutorial => {
        let box = document.createElement("div");
        box.classList.add("box");
    
        document.querySelector(".mainContainer").append(box);
    
        let h3 = document.createElement("h3");

        let content = document.createElement("span");
        
        if(tutorial.private == 0){
        h3.innerHTML = `${tutorial.title} <br> <span class="free">Free tutorial</span>`
        }else{
            h3.innerHTML = `${tutorial.title} <br> <span class="private">Private</span>`
        }

        content.textContent = tutorial.content;
    
        box.append(h3, content)
    })          
    }
    getMyTutorials()

}else {
    window.location.href = "./login.html"
}

let newTutorialButton = document.getElementById("new-tutorial").addEventListener("click", ()=> {
    window.location.href = "./create-new-Tutorial.html"
})