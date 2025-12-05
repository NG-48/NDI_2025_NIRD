document.addEventListener('DOMContentLoaded', () => {
    // =======================
    // Génération image RGB
    // =======================
    function genererImageAleatoire() {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(100, 100);

        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = Math.floor(Math.random() * 256);     // R
            imageData.data[i + 1] = Math.floor(Math.random() * 256); // G
            imageData.data[i + 2] = Math.floor(Math.random() * 256); // B
            imageData.data[i + 3] = 255;                              // Alpha
        }

        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }

    // =======================
    // Variables
    // =======================
    let generatedImageDataUrl = '';
    const importedImageContainer = document.getElementById('importedImageContainer');
    const importInput = document.getElementById('importImageInput');
    const confirmButton = document.getElementById('confirmButton');

    // =======================
    // Bouton : GÉNÉRER IMAGE
    // =======================
    document.getElementById('generateImageButton').addEventListener('click', () => {
        const canvas = genererImageAleatoire();
        const container = document.getElementById('imageContainer');
        container.innerHTML = '';
        container.appendChild(canvas);
        generatedImageDataUrl = canvas.toDataURL("image/png");
        document.getElementById('downloadImageButton').style.display = "block";
    });

    // =======================
    // Bouton : TÉLÉCHARGER
    // =======================
    document.getElementById('downloadImageButton').addEventListener('click', () => {
        if (!generatedImageDataUrl) return;
        const link = document.createElement('a');
        link.href = generatedImageDataUrl;
        link.download = "mon-identifiant.png";
        link.click();
    });

    // =======================
    // Import image mot de passe
    // =======================
    importInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.width = 100;
            img.height = 100;
            img.style.border = "1px solid black";
            img.style.margin = "10px";
            importedImageContainer.innerHTML = "<p>Image sélectionnée :</p>";
            importedImageContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    // =======================
    // Fonction pour hasher une image (en base64)
    // =======================
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

    // =======================
    // Bouton : CONFIRMER
    // =======================
    confirmButton.addEventListener('click', async () => {
        if (!generatedImageDataUrl) {
            alert('Génère d’abord ton identifiant !');
            return;
        }
        if (!importInput.files[0]) {
            alert('Veuillez choisir une image mot de passe !');
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            const passwordImageDataUrl = reader.result;
            const passwordHash = await hashImage(passwordImageDataUrl);

            // Récupère les utilisateurs existants ou initialise un tableau vide
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Vérifie si l'identifiant existe déjà
            const userExists = users.some(user => user.userId === generatedImageDataUrl);
            if (userExists) {
                alert('Cet identifiant est déjà utilisé !');
                return;
            }

            // Ajoute le nouvel utilisateur
            users.push({
                userId: generatedImageDataUrl,
                passwordHash: passwordHash
            });

            // Sauvegarde dans localStorage (simulation de users.json)
            localStorage.setItem('users', JSON.stringify(users));
            alert('Utilisateur enregistré ! Vous pouvez maintenant vous connecter.');
            window.location.href = 'minou.html';
        };
        reader.readAsDataURL(importInput.files[0]);
    });
});
