const quiz = document.getElementById('miniQuiz');
const resultBox = document.getElementById('quizResult');
if(quiz){

    quiz.addEventListener('submit', function(e){
        e.preventDefault();
        const fd = new FormData(quiz);
        let score=0;
        for(let i=1;i<=5;i++){ score += parseInt(fd.get('q'+i),10); }


let label='';
        if(score<=3) label='Profil : Très dépendant — actions rapides recommandées.';
        else if(score<=6) label='Profil : Mixte — plusieurs leviers à activer.';
        else label='Profil : Résilient — renforcer et partager.';


resultBox.innerHTML = `<strong>${label}</strong><p>Score : ${score}/10</p><p><a class="btn" href="parcours.html">Voir le parcours conseillé</a></p>`;
    });}


const reset = document.getElementById('resetQuiz');
reset && reset.addEventListener('click', ()=>{ quiz.reset(); resultBox.innerHTML=''; });