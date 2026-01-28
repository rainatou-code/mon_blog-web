// 1. INITIALISATION EMAILJS
(function() {
    // Utilisez votre Public Key
    emailjs.init("VOTRE_PUBLIC_KEY"); 
})();

// 2. ATTENTE DU CHARGEMENT DU DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // --- PARTIE MENU BURGER ---
    const burger = document.getElementById('burger-menu');
    const navList = document.getElementById('nav-list');

    if (burger && navList) {
        burger.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        // Fermer le menu si on clique sur un lien (très important sur mobile)
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    }

    // --- PARTIE FORMULAIRE DE COMMANDE ---
    const orderForm = document.getElementById('order-form');

    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let detailsCommande = "";
            const inputs = document.querySelectorAll('.qty');
            
            inputs.forEach(input => {
                const quantite = parseInt(input.value);
                if (quantite > 0) {
                    // Utilise l'attribut data-name de vos inputs
                    detailsCommande += `${input.getAttribute('data-name')} : ${quantite}\n`;
                }
            });

            if (detailsCommande === "") {
                alert("Veuillez choisir au moins un gâteau !");
                return;
            }

            const templateParams = {
                from_name: document.getElementById('client_name').value,
                from_email: document.getElementById('client_email').value,
                message: detailsCommande
            };

            // Utilisez vos identifiants réels
            emailjs.send('service_cmpcn5q', 'VOTRE_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    alert('Merci ! Votre commande a été envoyée avec succès.');
                    orderForm.reset(); 
                }, function(error) {
                    alert('Erreur lors de l\'envoi. Vérifiez vos IDs EmailJS.');
                    console.error('Erreur:', error);
                });
        });
    }
});