document.addEventListener('DOMContentLoaded', function () {

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Toggle active class for styling the header if needed
            this.classList.toggle('active');

            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Collapse
            } else {
                // Collapse all other open accordion items first (optional)
                document.querySelectorAll('.accordion-content').forEach(item => {
                    if (item !== content) { // don't collapse the current one yet
                        item.style.maxHeight = null;
                        item.previousElementSibling.classList.remove('active');
                    }
                });
                content.style.maxHeight = content.scrollHeight + "px"; // Expand
            }
        });
    });

    // --- Pagination ---
    // Basic example: log page number on click
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent page reload for '#' hrefs
            // Remove active class from all
            paginationLinks.forEach(pl => pl.classList.remove('active'));
            // Add active class to the clicked one
            this.classList.add('active');
            console.log('Navigated to page:', this.textContent);
            // Add your actual pagination logic here (e.g., fetching new content)
        });
    });


    // --- Toggle Switch ---
    // Example: Log state of toggle
    const toggleSwitch = document.getElementById('toggle-switch');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function() {
            console.log('Toggle switch is ' + (this.checked ? 'ON' : 'OFF'));
            // Add actions based on toggle state
        });
    }


    // --- Tooltip ---
    // The tooltip is mostly CSS-driven for hover.
    // JS might be needed for more complex scenarios (e.g., click-triggered, dynamic content).
    // For this example, CSS :hover handles it.

    // --- Date Picker ---
    // The native HTML5 date picker <input type="date"> requires no JS for basic functionality.
    // For custom date pickers, you would integrate a library here (e.g., Flatpickr, Pikaday).
    // Example: Log selected date
    const datePicker = document.getElementById('date-picker');
    if (datePicker) {
        datePicker.addEventListener('change', function() {
            console.log('Date selected:', this.value);
        });
    }

    // Footer: Update current year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Further JavaScript for other components (if needed) ---
    // Breadcrumbs: Usually static, but JS could generate them dynamically.
    // Navigation: JS can be used for responsive menus (hamburger icon on mobile).
    // Buttons, Link Text, Checkbox, Radio button, Text Input:
    //   JS is typically used for handling their events (e.g., form submission, click actions).

    // Example: Form submission
    const myForm = document.getElementById('myForm');
    if (myForm) {
        myForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission for this demo
            console.log('Form submitted!');
            const textInputValue = document.getElementById('text-input').value;
            console.log('Text Input Value:', textInputValue);
            // Add logic to collect other form data (checkboxes, radios, etc.)
        });
    }

});