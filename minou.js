document.addEventListener('DOMContentLoaded', () => {
    // Récupère les éléments du DOM
    const idImageInput = document.getElementById('idImageInput');
    const passwordImageInput = document.getElementById('passwordImageInput');
    const idImageContainer = document.getElementById('idImageContainer');
    const passwordImageContainer = document.getElementById('passwordImageContainer');
    const loginButton = document.getElementById('loginButton');
    const popup = document.getElementById('popup');
    const popupOk = document.getElementById('popupOk');

    // Variables pour stocker les données des images importées
    let importedIdImageDataUrl = '';
    let importedPasswordImageDataUrl = '';

    // Affiche l'image identifiant importée
    idImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            importedIdImageDataUrl = e.target.result;
            const img = document.createElement('img');
            img.src = importedIdImageDataUrl;
            img.width = 100;
            img.height = 100;
            img.style.border = "1px solid black";
            img.style.margin = "10px";
            idImageContainer.innerHTML = '<p>Image identifiant :</p>';
            idImageContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    // Affiche l'image mot de passe importée
    passwordImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            importedPasswordImageDataUrl = e.target.result;
            const img = document.createElement('img');
            img.src = importedPasswordImageDataUrl;
            img.width = 100;
            img.height = 100;
            img.style.border = "1px solid black";
            img.style.margin = "10px";
            passwordImageContainer.innerHTML = '<p>Image mot de passe :</p>';
            passwordImageContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    // Fonction pour hasher une image (en base64)
    async function hashImage(base64Image) {
        const base64Data = base64Image.split(',')[1];
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // Vérifie les images au clic sur "Se connecter"
    loginButton.addEventListener('click', async () => {
        if (!importedIdImageDataUrl || !importedPasswordImageDataUrl) {
            alert('Veuillez importer une image identifiant et une image mot de passe.');
            return;
        }

        // Récupère les utilisateurs depuis localStorage (simulation de users.json)
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Hash l'image mot de passe importée
        const inputPasswordHash = await hashImage(importedPasswordImageDataUrl);

        // Cherche un utilisateur correspondant
        const user = users.find(user =>
            user.userId === importedIdImageDataUrl &&
            user.passwordHash === inputPasswordHash
        );

        if (user) {
            popup.style.display = 'block'; // Affiche la pop-up de succès
        } else {
            alert('Identifiant ou mot de passe incorrect.');
            console.log("Utilisateurs enregistrés :", users);
            console.log("Identifiant importé :", importedIdImageDataUrl);
            console.log("Hash du mot de passe importé :", inputPasswordHash);
        }
    });

    // Ferme la pop-up au clic sur "OK"
    popupOk.addEventListener('click', () => {
        popup.style.display = 'none';
    });
});
