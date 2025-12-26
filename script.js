/* --- 1. THEME TOGGLE (Light/Dark) --- */
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Change icon based on mode
    themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

/* --- 2. DYNAMIC GREETING (For Index Page) --- */
const greetingElement = document.getElementById('greeting');
if (greetingElement) {
    const hour = new Date().getHours();
    let greet = "Habari"; // Default Swahili Hello
    
    if (hour < 12) greet = "Habari ya Asubuhi";       // Good Morning
    else if (hour < 18) greet = "Habari ya Mchana";   // Good Afternoon
    else greet = "Habari ya Jioni";                   // Good Evening

    greetingElement.innerText = `${greet}, Welcome to Nairobi Drip.`;
    
    // Add Date
    const dateEl = document.getElementById('date-display');
    if(dateEl) dateEl.innerText = new Date().toDateString();
}

/* --- 3. CURRENCY CONVERTER (KES <-> USD) --- */
let isUSD = false;
const EXCHANGE_RATE = 129; // 1 USD = 129 KES (Approx)

function toggleCurrency() {
    isUSD = !isUSD;
    const btn = document.getElementById('currency-toggle');
    const prices = document.querySelectorAll('.price');

    // Update Button Text
    btn.textContent = isUSD ? 'USD ($)' : 'KES (Sh)';

    // Update All Prices
    prices.forEach(price => {
        const kesValue = parseInt(price.getAttribute('data-kes'));
        
        if (isUSD) {
            // Convert to USD
            const usdValue = (kesValue / EXCHANGE_RATE).toFixed(2);
            price.innerText = `$${usdValue}`;
        } else {
            // Revert to KES format
            price.innerText = `KES ${kesValue.toLocaleString()}`;
        }
    });
}

/* --- 4. CART LOGIC --- */
let cart = 0;
function addToCart() {
    cart++;
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart;
    
    // Pulse Animation
    cartCount.parentElement.style.transform = "scale(1.1)";
    setTimeout(() => {
        cartCount.parentElement.style.transform = "scale(1)";
    }, 200);
}

/* --- 5. FORM VALIDATION (Contact Page) --- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email');
        const error = document.getElementById('email-error');
        
        // Regex for simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value)) {
            error.style.display = "block";
            error.innerText = "Please enter a valid email address.";
            email.style.borderColor = "#e74c3c";
        } else {
            error.style.display = "none";
            email.style.borderColor = "#ccc";
            alert("Asante! We have received your message.");
            contactForm.reset();
        }
    });
}