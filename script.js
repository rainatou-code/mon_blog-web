(function() {
    emailjs.init("n4owbaQG5VOp2JrO7"); 
})();

document.addEventListener('DOMContentLoaded', () => {
    // MENU BURGER
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-links');
    if (burger && nav) {
        burger.addEventListener('click', () => nav.classList.toggle('active'));
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