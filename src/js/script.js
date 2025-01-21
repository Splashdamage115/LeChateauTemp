document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.contactsItem');
    const constructionText = document.querySelectorAll('.constructionText');
    const texts = [
        "Our full website is under construction.<br>Please check back later for updates!<br><br>Contact Us:<br>",
        "Notre site complet est en construction.<br>Veuillez revenir plus tard pour les mises à jour!<br><br>Contactez-nous:<br>"
    ];
    let index = 0;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fly-in');
            }
        });
    }, {
        threshold: 0.5
    });

    items.forEach(item => {
        observer.observe(item);
    });

    setInterval(() => {
        index = (index + 1) % texts.length;
        constructionText.forEach(text => {
            text.innerHTML = texts[index];
        });
    }, 5000);
});
