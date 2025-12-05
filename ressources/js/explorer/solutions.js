(function(){
    const solutionsList = document.getElementById('solutionsGrid');
    if(!solutionsList) return;

const solutions = [
    // COLLECTIVITÉS
    {title:'Héberger localement des documents',aud:'collectivites',level:'avance',desc:'Mettre en place un serveur local (Nextcloud) pour stocker les données des élèves.'},
    {title:'Financer le reconditionnement',aud:'collectivites',level:'moyen',desc:'Allouer un budget annuel pour reconditionner les machines "obsolètes" avec Linux.'},
    {title:'Partenariat avec des associations',aud:'collectivites',level:'facile',desc:'Collaborer avec des ressourceries ou clubs informatiques locaux pour le réemploi du matériel.'},
    {title:'Politique d\'achat responsable',aud:'collectivites',level:'moyen',desc:'Privilégier l\'achat de matériel réparable, évolutif et compatible Linux.'},
    {title:'Former les techniciens au libre',aud:'collectivites',level:'moyen',desc:'Organiser des formations Linux et logiciels libres pour les administrateurs réseaux.'},
    {title:'Serveur de sauvegarde mutualisé',aud:'collectivites',level:'avance',desc:'Créer une infrastructure de sauvegarde partagée entre plusieurs établissements du territoire.'},
    {title:'Charte numérique territoriale',aud:'collectivites',level:'moyen',desc:'Adopter une charte engageant les établissements vers un numérique plus sobre et éthique.'},

    // ENSEIGNANTS
    {title:'Atelier "Journée sans cloud"',aud:'enseignants',level:'facile',desc:'Organiser une journée où la classe travaille uniquement avec des outils locaux et libres.'},
    {title:'Formations critique numérique',aud:'enseignants',level:'moyen',desc:'Séquences pédagogiques clé en main sur la sobriété numérique et les enjeux du libre.'},
    {title:'Migrer vers LibreOffice',aud:'enseignants',level:'facile',desc:'Utiliser LibreOffice pour tous les documents de cours et travaux d\'élèves.'},
    {title:'Utiliser Framasoft en classe',aud:'enseignants',level:'facile',desc:'Remplacer Google Docs par Framapad, Doodle par Framadate, etc.'},
    {title:'Projet "Linux facile" avec les élèves',aud:'enseignants',level:'moyen',desc:'Faire installer et tester Linux par les élèves sur de vieux ordinateurs, comme au lycée Carnot.'},
    {title:'Club informatique éco-responsable',aud:'enseignants',level:'moyen',desc:'Créer un club hebdomadaire dédié au reconditionnement et aux logiciels libres.'},
    {title:'Séquence sur l\'obsolescence programmée',aud:'enseignants',level:'facile',desc:'Cours ou débat sur les stratégies des Big Tech et les alternatives possibles.'},
    {title:'Utiliser des manuels libres',aud:'enseignants',level:'facile',desc:'Privilégier les ressources éducatives libres (Sésamath, Wikiversité, etc.).'},
    {title:'Créer une webradio avec des outils libres',aud:'enseignants',level:'moyen',desc:'Projet pédagogique utilisant Audacity, Mixxx et autres logiciels open source.'},
    {title:'Cartographie des dépendances numériques',aud:'enseignants',level:'facile',desc:'Activité où les élèves identifient tous les outils numériques qu\'ils utilisent quotidiennement.'},
    {title:'Escape game numérique éthique',aud:'enseignants',level:'moyen',desc:'Créer un jeu pédagogique avec H5P ou Xia pour sensibiliser aux enjeux NIRD.'},
    {title:'Correspondance inter-classes sans GAFAM',aud:'enseignants',level:'facile',desc:'Échanger avec une autre classe via Framalistes ou Discourse au lieu d\'emails propriétaires.'},

    // FAMILLES
    {title:'Réemploi et réparation',aud:'familles',level:'moyen',desc:'Apprendre à réparer et reconditionner les appareils au lieu de les jeter.'},
    {title:'Alternative gratuite à Microsoft Office',aud:'familles',level:'facile',desc:'Utiliser LibreOffice pour les devoirs des enfants, compatible avec tous les formats.'},
    {title:'Désabonnement progressif',aud:'familles',level:'facile',desc:'Identifier et annuler les abonnements numériques inutiles pour économiser.'},
    {title:'Atelier parent-enfant reconditionnement',aud:'familles',level:'moyen',desc:'Passer un week-end à nettoyer et réinstaller un ordinateur ensemble.'},
    {title:'Applications éducatives libres',aud:'familles',level:'facile',desc:'Utiliser GCompris, Scratch, Tux Paint pour l\'apprentissage des enfants.'},
    {title:'Bloquer la publicité ciblée',aud:'familles',level:'facile',desc:'Installer uBlock Origin pour protéger toute la famille du tracking publicitaire.'},
    {title:'Messagerie respectueuse',aud:'familles',level:'moyen',desc:'Passer de WhatsApp à Signal ou Telegram pour les discussions familiales.'},
    {title:'Charte numérique familiale',aud:'familles',level:'facile',desc:'Créer ensemble des règles d\'usage du numérique : temps d\'écran, outils privilégiés, etc.'},
    {title:'Don de matériel reconditionné',aud:'familles',level:'facile',desc:'Donner vos anciens appareils remis à neuf à des associations caritatives locales.'},
    {title:'Jeux vidéo open source',aud:'familles',level:'facile',desc:'Découvrir SuperTuxKart, Minetest, 0 A.D. et autres alternatives gratuites et libres.'},
    {title:'Cloud familial auto-hébergé',aud:'familles',level:'avance',desc:'Installer Nextcloud sur un Raspberry Pi pour votre propre cloud à la maison.'},

    // ALL
    {title:'Navigateur respectueux de la vie privée',aud:'all',level:'facile',desc:'Installer Firefox avec DuckDuckGo ou Qwant comme moteur de recherche par défaut.'},
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