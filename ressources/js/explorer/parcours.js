const steps = document.querySelectorAll('.step-list li');
if(steps.length>=0){
    steps.forEach((li)=>{
        const btn = li.querySelector('[data-action="next"]');
        if(btn){ btn.addEventListener('click', ()=>{ goToNext(li); }); }
    });
}





function goToNext(li){
    const next = li.nextElementSibling;
    if(next){
        li.classList.remove('active');
        next.classList.add('active');
        const fb = document.getElementById('parcoursFeedback');
        fb && (fb.textContent='Bonne idée — passe à l’étape suivante !');
    }
}


const ideas = document.getElementById('ideas');
const plan = document.getElementById('plan');
if(ideas && plan){
    ideas.innerHTML = '<div draggable="true" class="drg">Rationaliser stockage</div><div draggable="true" class="drg">Réparer / réemployer</div><div draggable="true" class="drg">Ateliers de sobriété</div>';


document.querySelectorAll('.drg').forEach(d=>{
    d.addEventListener('dragstart', (e)=>{ e.dataTransfer.setData('text/plain', d.textContent); });
});


plan.addEventListener('dragover', (e)=> e.preventDefault());
    plan.addEventListener('drop', (e)=>{
        e.preventDefault();
        const t=e.dataTransfer.getData('text/plain');
        const p=document.createElement('div');
        p.textContent=t;
        p.className='plan-item';
        plan.appendChild(p);
    });


const gen = document.getElementById('generatePlan');
    gen && gen.addEventListener('click', ()=>{
        const items=[...plan.querySelectorAll('.plan-item')].map(n=>n.textContent);
        alert('Plan généré:' + items())
    });
}


const badgeBtn = document.getElementById('claimBadge');
badgeBtn && badgeBtn.addEventListener('click', ()=> alert('Bravo — votre badge NIRD vous attend !'));