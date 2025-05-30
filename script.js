document.addEventListener('DOMContentLoaded', function() {
    // Initialisation d'EmailJS
    // Vous devez remplacer cette valeur par votre clé publique EmailJS
    // Vous pouvez l'obtenir sur votre compte EmailJS dans Account > API Keys
    // Exemple : emailjs.init("abcdefghijklmnopqrst");
    emailjs.init("v1bV0bYR6nEVv-lsY");  // Remplacez 'public_key' par votre clé publique réelle
    // Année actuelle dans le footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Menu burger
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });

    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation au défilement
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Filtrage des projets
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active le bouton cliqué
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Données des projets (à remplacer par vos propres projets)
    const projectsData = [
       
        {
            title: "Application web de e-learning",
            description: "Plateforme où les apprenants et les formateurs se rencontrent",
            image: "assets/Landing Page.png",
            tags: ["Next JS", "MySQL", "UI/UX"],
            category: "web"
        },
        {
            title: "Gestionn des utilisateurs",
            description: "Application pour la gestion des utilisateurs (présence)",
            image: "assets/presence.png",
            tags: ["PHP"],
            category: "web"
        },
       
    ];

    // Remplir la grille de projets
    const projectsGrid = document.querySelector('.projects-grid');
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in';
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-progress .progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Déclencher l'animation lorsque la section est visible
    const skillsSection = document.querySelector('.skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    skillsObserver.observe(skillsSection);

    // Toast notification
    const toastContainer = document.querySelector('.toast-container');
    const toastCloseBtn = document.querySelector('.toast-close');
    
    function showToast() {
        toastContainer.classList.add('show');
        // Fermer automatiquement après 5 secondes
        setTimeout(() => {
            hideToast();
        }, 5000);
    }
    
    function hideToast() {
        toastContainer.classList.remove('show');
    }
    
    if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', hideToast);
    }
    
    // Envoi du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Afficher un indicateur de chargement
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            try {
                // Préparer le corps du message pour mailto
                const body = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                
                // Créer l'URL mailto
                const mailtoUrl = `mailto:freddyngaf@gmail.com?subject=${encodeURIComponent(subject || 'Message depuis le portfolio')}&body=${encodeURIComponent(body)}`;
                
                // Ouvrir le client email de l'utilisateur
                window.location.href = mailtoUrl;
                
                // Afficher le toast de succès
                setTimeout(() => {
                    // Réinitialiser le formulaire
                    this.reset();
                    
                    // Afficher le toast
                    document.querySelector('.toast-title').textContent = 'Email préparé';
                    document.querySelector('.toast-message').textContent = 'Votre client email a été ouvert avec votre message. Envoyez-le pour finaliser.';
                    showToast();
                    
                    // Réinitialiser le bouton
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            } catch (error) {
                console.error('Erreur:', error);
                
                // Modifier le message du toast pour indiquer l'erreur
                document.querySelector('.toast-title').textContent = 'Erreur';
                document.querySelector('.toast-message').textContent = 'Une erreur est survenue. Veuillez réessayer plus tard ou contacter directement par email.';
                showToast();
                
                // Réinitialiser le bouton
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});