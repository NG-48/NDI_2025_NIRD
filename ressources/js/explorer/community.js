(function(){
const contrib = document.getElementById('contribForm');
if(!contrib) return;


contrib.addEventListener('submit', (e)=>{
e.preventDefault();
const status = document.getElementById('contribStatus');
status.textContent='Merci ! Votre ressource a été enregistrée (simulation).';
contrib.reset();
});
})();