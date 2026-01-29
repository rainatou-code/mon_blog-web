// 1. INITIALISATION EMAILJS
(function() {
    // Remplacez par votre vraie clé publique EmailJS
    emailjs.init("VOTRE_PUBLIC_KEY"); 
})();

// 2. ATTENTE DU CHARGEMENT DU DOM (Une seule fois suffit)
document.addEventListener('DOMContentLoaded', () => {
    
    // --- PARTIE MENU BURGER ---
    const burger = document.getElementById('burger-menu');
    // Vérifiez que l'ID dans votre HTML est bien "nav-links"
    const nav = document.getElementById('nav-links');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // --- GESTION DU BOUTON FACTURE ---
    const btnFacture = document.getElementById('btn-facture');
    if (btnFacture) {
        btnFacture.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Génération de la facture en cours...");
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

            // Remplacez 'VOTRE_TEMPLATE_ID' par votre vrai ID
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
}); // Fermeture correcte du DOMContentLoaded