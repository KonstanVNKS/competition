document.addEventListener("DOMContentLoaded", function () {
            const messagePanier = document.getElementById("panier-message");
            const lignes = document.querySelectorAll("tbody tr");

            function getPanier() {
                return JSON.parse(localStorage.getItem("panier")) || [];
            }

            function savePanier(panier) {
                localStorage.setItem("panier", JSON.stringify(panier));
            }

            function getKey(item) {
                return `${item.type}|${item.sport}|${item.date}|${item.lieu}`;
            }

            function updateMessageGlobal() {
                const panier = getPanier();
                const totalArticles = panier.reduce((total, item) => total + item.quantite, 0);

                if (totalArticles > 0) {
                    messagePanier.style.display = "block";
                    messagePanier.innerHTML = `
                        <strong>${totalArticles} article(s) sélectionné(s)</strong><br>
                        <a href="panier.html" class="button small primary" style="margin-top:10px;">Aller au panier</a>
                    `;
                } else {
                    messagePanier.style.display = "none";
                    messagePanier.innerHTML = "";
                }
            }

            function syncLigneAvecPanier(ligne) {
                const reserverBtn = ligne.querySelector(".reserver-btn");
                const controls = ligne.querySelector(".quantite-controls");
                const quantiteSpan = ligne.querySelector(".quantite");

                const item = {
                    type: ligne.dataset.type,
                    sport: ligne.dataset.sport,
                    date: ligne.dataset.date,
                    lieu: ligne.dataset.lieu,
                    prix: parseFloat(ligne.dataset.prix)
                };

                const panier = getPanier();
                const key = getKey(item);
                const existe = panier.find(p => getKey(p) === key);

                if (existe && existe.quantite > 0) {
                    reserverBtn.style.display = "none";
                    controls.style.display = "inline-flex";
                    quantiteSpan.textContent = existe.quantite;
                } else {
                    reserverBtn.style.display = "inline-block";
                    controls.style.display = "none";
                    quantiteSpan.textContent = "1";
                }
            }

            lignes.forEach(ligne => {
                const reserverBtn = ligne.querySelector(".reserver-btn");
                const controls = ligne.querySelector(".quantite-controls");
                const plus = ligne.querySelector(".plus");
                const moins = ligne.querySelector(".moins");

                const itemBase = {
                    type: ligne.dataset.type,
                    sport: ligne.dataset.sport,
                    date: ligne.dataset.date,
                    lieu: ligne.dataset.lieu,
                    prix: parseFloat(ligne.dataset.prix)
                };

                reserverBtn.addEventListener("click", function () {
                    let panier = getPanier();
                    const key = getKey(itemBase);
                    const index = panier.findIndex(item => getKey(item) === key);

                    if (index === -1) {
                        panier.push({ ...itemBase, quantite: 1 });
                    } else {
                        panier[index].quantite = 1;
                    }

                    savePanier(panier);
                    syncLigneAvecPanier(ligne);
                    updateMessageGlobal();
                });

                plus.addEventListener("click", function () {
                    let panier = getPanier();
                    const key = getKey(itemBase);
                    const index = panier.findIndex(item => getKey(item) === key);

                    if (index === -1) {
                        panier.push({ ...itemBase, quantite: 1 });
                    } else {
                        panier[index].quantite += 1;
                    }

                    savePanier(panier);
                    syncLigneAvecPanier(ligne);
                    updateMessageGlobal();
                });

                moins.addEventListener("click", function () {
                    let panier = getPanier();
                    const key = getKey(itemBase);
                    const index = panier.findIndex(item => getKey(item) === key);

                    if (index !== -1) {
                        if (panier[index].quantite > 1) {
                            panier[index].quantite -= 1;
                        } else {
                            panier.splice(index, 1);
                        }
                    }

                    savePanier(panier);
                    syncLigneAvecPanier(ligne);
                    updateMessageGlobal();
                });

                syncLigneAvecPanier(ligne);
            });

            updateMessageGlobal();
        });