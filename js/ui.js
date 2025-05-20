document.addEventListener('DOMContentLoaded', function() {

    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Optional: Close other open accordions if you want only one open at a time
            // const currentlyActiveAccordionHeader = document.querySelector('.accordion-header.active');
            // if (currentlyActiveAccordionHeader && currentlyActiveAccordionHeader !== header) {
            //     currentlyActiveAccordionHeader.classList.remove('active');
            //     currentlyActiveAccordionHeader.nextElementSibling.style.maxHeight = 0;
            //     currentlyActiveAccordionHeader.nextElementSibling.style.padding = "0 15px";
            // }

            this.classList.toggle('active');
            const accordionContent = this.nextElementSibling;
            if (accordionContent.style.maxHeight && accordionContent.style.maxHeight !== "0px") {
                accordionContent.style.maxHeight = 0;
                accordionContent.style.paddingTop = "0";
                accordionContent.style.paddingBottom = "0";
            } else {
                accordionContent.style.paddingTop = "15px";
                accordionContent.style.paddingBottom = "15px";
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            }
        });
    });

    // Footer: Current Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear(); // Set to 2025 as per current date
    }

    // Toggle Switch Console Log (Example)
    const newsletterToggle = document.getElementById('newsletter-toggle');
    if (newsletterToggle) {
        newsletterToggle.addEventListener('change', function() {
            console.log("Newsletter toggle state:", this.checked);
        });
    }

    // Basic navigation active state (can be improved for more complex routing)
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active-nav');
        } else {
            link.classList.remove('active-nav');
        }
    });
     // Ensure active class is correctly set on page load based on URL
    if (document.getElementById('login-form')) {
        document.querySelector('.nav-links a[href="login.html"]')?.classList.add('active-nav');
    } else if (document.getElementById('register-form')) {
        document.querySelector('.nav-links a[href="register.html"]')?.classList.add('active-nav');
    } else if (document.getElementById('user-table')) {
         document.querySelector('.nav-links a[href="users.html"]')?.classList.add('active-nav');
    }


    // Tooltip focus handling (if you want tooltips to show on focus as well)
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger input, .tooltip-trigger button');
    tooltipTriggers.forEach(trigger => {
        const tooltip = trigger.parentElement.querySelector('.tooltip-text');
        if(tooltip){
            trigger.addEventListener('focus', () => {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
            });
            trigger.addEventListener('blur', () => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            });
        }
    });

    console.log("UI Enhancements Initialized (ui.js)");
});