const pages = [
    { name: "Accueil", url: "index.html" },
    { name: "Skeleton", url: "skeleton.html" },
    { name: "Patinage artistique", url: "patinage.html" },
    { name: "Luge", url: "luge.html" },
    { name: "Bobsleigh", url: "bobsleigh.html" },
    { name: "Ski nordique", url: "skinordique.html" },
    { name: "Athletes emblematiques", url: "athletes.html" },
    { name: "Programme", url: "programme.html" },
    { name: "Tickets", url: "billetterie.html" },
    { name: "Infos", url: "supInfo.html" },
    { name: "A propos", url: "a_propos.html" },
    { name: "Contact", url: "contact.html" },
    { name: "Mentions légales", url: "legalmention.html" },
    { name: "Se connecter", url: "login.html" },
    { name: "Mon profil", url: "page-utilisateur.html" },
    { name: "Panier", url: "panier.html" },
    { name: "Commandes", url: "historique-commandes.html" },
    { name: "Confirmation commande", url: "confirmation_commande.html" },
];

document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".search-input");
    const results = document.querySelector(".search-results");

    if (!input || !results) return;

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        results.innerHTML = "";
        if (query.length < 2) return;

        const matches = pages.filter(p => p.name.toLowerCase().includes(query));
        matches.forEach(p => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${p.url}">${p.name}</a>`;
            results.appendChild(li);
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-item")) results.innerHTML = "";
    });
});