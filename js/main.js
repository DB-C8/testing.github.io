document.addEventListener('DOMContentLoaded', function() {
    // Menu Elements
    const menuBtn = document.querySelector('.menu-btn');
    const menuClose = document.querySelector('.menu-close');
    const fullscreenMenu = document.getElementById('fullscreenMenu');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Menu Toggle Functions
    function openMenu() {
        fullscreenMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        fullscreenMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Menu Button Event Listeners
    menuBtn.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    
    // Navigation Function
    function smoothScrollTo(element) {
        // Get header height for offset
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Calculate scroll position
        const elementTop = element.getBoundingClientRect().top;
        const offsetPosition = elementTop + window.pageYOffset - headerHeight;
        
        // Perform smooth scroll
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    // Handle Navigation Clicks
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (!targetSection) return;
            
            // Close menu first
            closeMenu();
            
            // Scroll to section after a brief delay to allow menu to close
            setTimeout(() => {
                smoothScrollTo(targetSection);
            }, 300);
        });
    });
    
    // Initialize Map
    initMap();
    
    // Initialize Infinite Scroll
    initInfiniteScroll();
    
    // Initialize FAQ
    initFAQ();
});

// Map Initialization
function initMap() {
    const map = L.map('map').setView([40.6084, -75.4702], 12);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const customIcon = L.icon({
        iconUrl: 'assets/images/map-pin.svg',
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48]
    });

    const locations = [
        {
            coords: [40.6179, -75.3787],
            title: "Venture X Bethlehem",
            address: "306 S New St, Bethlehem, PA 18015, United States"
        },
        {
            coords: [40.6023, -75.4714],
            title: "Venture X Allentown",
            address: "615 Waterfront Drive, Allentown, PA 18102"
        }
    ];

    locations.forEach(location => {
        L.marker(location.coords, {icon: customIcon})
            .bindPopup(`<strong>${location.title}</strong><br>${location.address}`)
            .addTo(map);
    });
}

// Infinite Scroll Initialization
function initInfiniteScroll() {
    const tracks = document.querySelectorAll('.scroll-content');
    tracks.forEach(track => {
        const items = track.innerHTML;
        track.innerHTML = items + items + items;
    });
}

// FAQ Initialization
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.classList.remove('active');
                }
            });
            
            if (isOpen) {
                answer.style.display = 'none';
                item.classList.remove('active');
            } else {
                answer.style.display = 'block';
                item.classList.add('active');
            }
        });
    });
}