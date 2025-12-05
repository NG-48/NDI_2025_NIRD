(function(){
    const solutionsList = document.getElementById('solutionsGrid');
    if(!solutionsList) return;


const solutions = [
    {title:'Héberger localement les documents',aud:'collectivites',level:'hard',desc:'Mettre un serveur local pour données élèves.'},
    {title:'Atelier "Journée sans cloud"',aud:'enseignants',level:'easy',desc:'Activités prêtes à l’emploi.'},
    {title:'Réemploi et réparation',aud:'familles',level:'medium',desc:'Processus simples pour réparer le matériel.'},
    {title:'Formations critique numérique',aud:'enseignants',level:'medium',desc:'Séquences clé en main.'}
];


function renderSolutions(filterAud='all', filterLevel='all'){
    solutionsList.innerHTML='';
    solutions
        .filter(s=> (filterAud==='all'||s.aud===filterAud) && (filterLevel==='all'||s.level===filterLevel))
        .forEach(s=>{
            const li=document.createElement('li');
            li.innerHTML=`<h4>${s.title}</h4><p class="muted">${s.desc}</p><p class="tag">${s.level}</p>`;
            solutionsList.appendChild(li);
        });
}


renderSolutions();


const fa = document.getElementById('filterAudience');
    const fl = document.getElementById('filterLevel');
    fa && fa.addEventListener('change', ()=> renderSolutions(fa.value, fl.value));
    fl && fl.addEventListener('change', ()=> renderSolutions(fa.value, fl.value));
})();