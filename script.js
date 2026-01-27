/**
 * Affiche une alerte avec les détails du gâteau
 */
function voirDetails(description) {
    alert("Détails du délice : \n\n" + description);
}

/**
 * Affiche le formulaire et le pré-remplit
 */
function commander(nomGateau) {
    const sectionForm = document.getElementById('formulaire-section');
    const inputGateau = document.getElementById('gateau-choisi');
    
    // Remplir le nom du gâteau
    inputGateau.value = nomGateau;
    
    // Afficher la section avec un petit effet
    sectionForm.classList.remove('hidden');
    
    // Faire défiler la page jusqu'au formulaire
    sectionForm.scrollIntoView({ behavior: 'smooth' });
}

// Message de bienvenue dans la console (pour vérifier que le script est lié)
console.log("Boutique Les Douceurs de Diallo chargée avec succès !");
