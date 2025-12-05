const but = document.getElementById("button_validation")

but.addEventListener("click",validateForm)

const users = [
    {
        login: "zoe",                        
        email: "zoe@example.com",
        password: "planet77",               
        age:20           
    },
    {
        login: "chloe",                       
        email: "chleo@mail.com",
        password: "rock5",                  
        age: 30            
    },

    {
        login: "martin",                
        email: "martin@domain.com",
        password: "blue9",                  
        age: 42           
    },
    {
        login: "christ45",             
        email: "chris45@stuff.net",
        password: "ember12",                
        age: 60             
    },

    {
        login: "maximilien",      
        email: "max3rd@random.org",
        password: "wolf7",                 
        age: 95      
    }     
];


function validateForm(){
    let hasFound = false
    for (const user of users){
        if(user.login===getLogin()&&user.email===getEmail()&&getIsPasswordValid()&&user.password===getPassword()&&user.age===getAgeForm()){
            alert("Vous Avez Réussi à vous connecter ! Toutes nos félicitations")
            hasFound = true
            break
        }
    }
    if(!hasFound){
        alert("Votre tentative de connection à échouer")
    }

}