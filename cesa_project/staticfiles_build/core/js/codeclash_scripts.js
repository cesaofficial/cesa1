// codeclash_scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion Functionality (existing code - UNCHANGED)
    document.querySelectorAll('[data-faq-toggle]').forEach(item => {
        item.addEventListener('click', () => {
            const faqId = item.getAttribute('data-faq-toggle');
            const content = document.querySelector(`[data-faq-content="${faqId}"]`);
            const arrow = document.querySelector(`[data-faq-arrow="${faqId}"]`);

            if (content.classList.contains('hidden')) {
                // Close all other open FAQs (optional, but good for single open accordion)
                document.querySelectorAll('[data-faq-content]').forEach(otherContent => {
                    if (otherContent !== content && !otherContent.classList.contains('hidden')) {
                        otherContent.classList.add('hidden');
                        document.querySelector(`[data-faq-arrow="${otherContent.getAttribute('data-faq-toggle')}"]`).classList.remove('rotate-180');
                    }
                });

                // Open the clicked FAQ
                content.classList.remove('hidden');
                arrow.classList.add('rotate-180');
            } else {
                // Close the clicked FAQ
                content.classList.add('hidden');
                arrow.classList.remove('rotate-180');
            }
        });
    });

    // --- Navbar Hamburger Menu Functionality (REMOVED as requested) ---
    // The previous code for hamburger menu is removed.
});