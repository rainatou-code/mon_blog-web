(function() {
    emailjs.init("n4owbaQG5VOp2Jr07"); 
})();

document.addEventListener('DOMContentLoaded', () => {
    // MENU BURGER
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-links');
    if (burger && nav) {
        burger.addEventListener('click', () => nav.classList.toggle('active'));

        // --- GESTION DU FORMULAIRE DE CONTACT ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const btn = document.getElementById('btn-contact');
        btn.innerText = "Envoi en cours...";

        const contactParams = {
            from_name: document.getElementById('user_name').value,
            from_email: document.getElementById('user_email').value,
            message: document.getElementById('user_message').value
        };

        // Utilisez le MÊME service ID, mais créez un NOUVEAU template ID sur EmailJS pour les messages
        emailjs.send('service_cmpcn5q', 'template_d59cxxm', contactParams)
            .then(function() {
                alert('Votre message a été envoyé avec succès !');
                contactForm.reset();
                btn.innerText = "Envoyer le message";
            }, function(error) {
                alert("Erreur lors de l'envoi.");
                console.error('Erreur:', error);
                btn.innerText = "Envoyer le message";
            });
    });
}
    }

    // FORMULAIRE DE COMMANDE
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let detailsCommande = "";
            const inputs = document.querySelectorAll('.qty');
            
            inputs.forEach(input => {
                const quantite = parseInt(input.value);
                if (quantite > 0) {
                    // On récupère le nom exact du gâteau ici
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

            // Bouton en mode "chargement"
            const btn = document.getElementById('btn-facture');
            btn.innerText = "Envoi en cours...";
            btn.disabled = true;

            emailjs.send('service_cmpcn5q', 'template_qthsf3n', templateParams)
                .then(function() {
                    alert('Commande envoyée ! Vérifiez votre boîte mail.');
                    orderForm.reset();
                    btn.innerText = "Générer la Facture & Envoyer";
                    btn.disabled = false;
                }, function(error) {
                    alert('Erreur technique. Vérifiez votre console.');
                    console.error('Erreur EmailJS:', error);
                    btn.disabled = false;
                });
        });
    }
});


// --- GESTION DU BOUTON RETOUR EN HAUT ---
const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
    // Afficher le bouton quand on descend de 300px
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    // Action de remonter au clic
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Remontée fluide
        });
    });
}