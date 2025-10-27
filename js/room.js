const hamburger = document.getElementById('hamburger');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('overlay');

    function toggleSidebar() {
        mobileSidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleSidebar);
    });