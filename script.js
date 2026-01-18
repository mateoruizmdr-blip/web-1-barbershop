document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Time Slots
    const timeSelect = document.getElementById('time');
    const startTime = 10 * 60; // 10:00 AM in minutes
    const endTime = 20 * 60;   // 08:00 PM in minutes
    const interval = 15;       // 15 minutes

    if (timeSelect) {
        for (let i = startTime; i <= endTime; i += interval) {
            const hours = Math.floor(i / 60);
            const minutes = i % 60;
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

            const option = document.createElement('option');
            option.value = timeString;
            option.textContent = timeString;
            timeSelect.appendChild(option);
        }
    }

    // 2. Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation is handled by HTML5 'required' attributes

            // Get values
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            // Show Custom Modal
            const modal = document.getElementById('bookingModal');
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalDate').textContent = date;
            document.getElementById('modalTime').textContent = time;

            modal.classList.add('show');

            // Close logic
            const closeModal = () => {
                modal.classList.remove('show');
                bookingForm.reset();
            };

            document.querySelector('.close-modal').onclick = closeModal;
            document.getElementById('closeModalBtn').onclick = closeModal;

            // Close if click outside
            window.onclick = (event) => {
                if (event.target == modal) {
                    closeModal();
                }
            };
        });
    }

    // 3. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 4. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    /* Simple mobile menu implementation - could be improved with animation classes in CSS */
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // 5. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.service-card, .section-title, .gallery-item, .booking-container, .location-content');

    // Add reveal class initially
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Shop Status Indicator
    const checkStatus = () => {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, ...
        const hour = now.getHours();

        const statusDiv = document.getElementById('shopStatus');
        const statusText = statusDiv.querySelector('.status-text');

        let isOpen = false;

        // Mon-Fri: 10-20
        if (day >= 1 && day <= 5) {
            if (hour >= 10 && hour < 20) isOpen = true;
        }
        // Sat: 10-15
        else if (day === 6) {
            if (hour >= 10 && hour < 15) isOpen = true;
        }
        // Sun: Closed

        statusDiv.className = 'status-indicator ' + (isOpen ? 'open' : 'closed');
        statusText.textContent = isOpen ? 'ABIERO AHORA' : 'CERRADO AHORA';

        if (!isOpen) {
            const nextOpen = (day === 6 || day === 0) ? "Lunes a las 10:00" : "Mañana a las 10:00";
            // Optional: Add next open info if needed, for now just Closed is fine or keep simple
        }
    };

    if (document.getElementById('shopStatus')) {
        checkStatus();
        setInterval(checkStatus, 60000); // Check every minute
    }

    // 7. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // 8. Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// 9. Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Wait for fade out
    }, 1000); // Minimum display time

    // 10. Cookie Banner
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');

    // Check if previously accepted
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000); // Show after 2 seconds
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            cookieBanner.classList.remove('show');
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }
});
