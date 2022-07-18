



const token =  localStorage.getItem("token")
console.log(token)
const userId = localStorage.getItem("userId")
console.log(userId)
let all = document.getElementById("filter").value


if(token){
document.getElementById("but").id = "search"
}else {
    document.getElementById("but").id = "search2"
}


if(token) {
    const getTutorialsOn = async () => {
        const res = await fetch(`http://localhost:8080/v1/tutorials/online`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const tutorials = await res.json();
        
        console.log(tutorials)
        
        
        document.getElementById("off").textContent = "ONLINE"
        document.getElementById("off").style.color = "green"

        

        document.querySelector(".mainContainer").textContent = ""
    
    tutorials.resp.forEach(tutorial => {

        
        
    
     

     
     if(all == 0){  
        let box = document.createElement("div");
        box.classList.add("box");
       
        document.querySelector(".mainContainer").append(box);

        let tutorialOwner = document.createElement("div")
        tutorialOwner.innerHTML = tutorial.email
        tutorialOwner.style.color = "blue"
        tutorialOwner.style.fontWeight = "700"
    
        let h3 = document.createElement("h3");

        let content = document.createElement("p");
        
        if(tutorial.private == 0){
        h3.innerHTML = `${tutorial.title} <br> <span class="free">Free tutorial</span>`
        content.textContent = tutorial.content;
        }else if (tutorial.private == 1){
            h3.innerHTML = `${tutorial.title} <br> <span class="private">Private</span>`
            content.innerHTML = `<span class="private">Please subscribe to this user to see this title private content</span>`;


        }
       
        
    
        box.append(tutorialOwner, h3, content)
    }
    else if (all == tutorial.user_id){
        
        let box = document.createElement("div");
        box.classList.add("box");

        document.querySelector(".mainContainer").append(box);

        let tutorialOwner = document.createElement("div")
        tutorialOwner.innerHTML = tutorial.email
        tutorialOwner.style.color = "blue"
        tutorialOwner.style.fontWeight = "700"

        let h3 = document.createElement("h3");

        let content = document.createElement("p");
        
        if(tutorial.private == 0){
            h3.innerHTML = `${tutorial.title} <br> <span class="free">Free tutorial</span>`
            content.textContent = tutorial.content;
            }else if (tutorial.private == 1){
                h3.innerHTML = `${tutorial.title} <br> <span class="private">Private</span>`
                content.innerHTML = `<span class="private">Please subscribe to this user to see this title private content</span>`;
            }
            box.append(tutorialOwner, h3, content)
    }
    })          
    }
    getTutorialsOn()
    let button = document.getElementById("search")
            button.addEventListener("click", () => {
                
                all = document.getElementById("filter").value
                getTutorialsOn();
                console.log(all)
            });

            const getUsers = async () => {
                const res = await fetch(`http://localhost:8080/v1/auth`)
                const users = await res.json();
            
                
            
                users.forEach(user => {
                        
                    const option = document.createElement("option")
                    option.value = user.id
                    option.textContent = user.email
                    const select = document.getElementById("filter")
                    select.append(option)
                    
                })
    
                
            }
            getUsers()
    

}else {
    const getTutorialsOff = async () => {
        const res = await fetch(`http://localhost:8080/v1/tutorials/offline`)
        const tutorials = await res.json();
        // console.log(tutorials)

        document.querySelector(".mainContainer").textContent = ""

        tutorials.forEach(tutorial => {

            if(all == 0){
            let box = document.createElement("div");
            box.classList.add("box");
        
            document.querySelector(".mainContainer").append(box);

            let tutorialOwner = document.createElement("div")
            tutorialOwner.innerHTML = tutorial.email
            tutorialOwner.style.color = "blue"
            tutorialOwner.style.fontWeight = "700"
        
            let h3 = document.createElement("h3");
            
            let content = document.createElement("p");
            
            
            h3.innerHTML = `${tutorial.title} <br> <span class="free">Free tutorial</span>`
            
            
            content.textContent = tutorial.content;
        
            box.append(tutorialOwner, h3, content)
            }
            
            else if(all == tutorial.user_id){
                let box = document.createElement("div");
            box.classList.add("box");
                
            document.querySelector(".mainContainer").append(box);

            let tutorialOwner = document.createElement("div")
            tutorialOwner.innerHTML = tutorial.email
            tutorialOwner.style.color = "blue"
            tutorialOwner.style.fontWeight = "700"
        
            let h3 = document.createElement("h3");
            
            let content = document.createElement("p");
            
            
            h3.innerHTML = `${tutorial.title} <br> <span class="free">Free tutorial</span>`
            
            
            content.textContent = tutorial.content;

            // console.log(tutorial)
        
            box.append(tutorialOwner, h3, content)
            
            }

            console.log(all)
            console.log(tutorial.user_id)
            ///////////////////////////////////////////////////////////////////////////////////
        })
        console.log("asd")
}
getTutorialsOff()
let button = document.getElementById("search2")
            button.addEventListener("click", () => {
                
                all = document.getElementById("filter").value
                getTutorialsOff();
                
            });

            const getUsers = async () => {
                const res = await fetch(`http://localhost:8080/v1/auth`)
                const users = await res.json();
            
                
            
                users.forEach(user => {
                        
                    const option = document.createElement("option")
                    option.value = user.id
                    option.textContent = user.email
                    const select = document.getElementById("filter")
                    select.append(option)
                    
                })
    
                
            }
            getUsers()
}



