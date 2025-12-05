const email_domain_textfield = document.getElementById('email_domain_text')
const email_text = document.getElementById('email_text')
const list = document.getElementById("email_domain")
list.addEventListener('change', function () {
  if (this.value === "custom") {
    email_domain_textfield.style.display = "inline"
  }else{
    email_domain_textfield.style.display = "none"
  }
});

function addCustomRandomPos(){
    
    const option = document.createElement("option");
    option.textContent = "personnalisé";
    option.value = "custom";

    let index = list.options.length * 0.4 + Math.random() * list.options.length * 0.55
    index = Math.floor(index)
    list.insertBefore(option, list.options[index]);
    
}

addCustomRandomPos()

function getEmail(){
  return  email_text.value+"@"+email_domain_textfield.value
}