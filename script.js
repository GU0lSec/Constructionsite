document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMsg = document.getElementById('empty-cart-msg');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Load cart from browser's local storage, or start empty if none exists
    let cart = JSON.parse(localStorage.getItem('lush_luxe_cart')) || [];

    // Immediately update the UI on page load so items show up right away
    updateCartUI();

    // Toggle Cart Drawer
    function toggleCart() {
        document.body.classList.toggle('cart-open');
    }

    if (cartBtn) cartBtn.addEventListener('click', toggleCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    // Save cart data to browser storage
    function saveCart() {
        localStorage.setItem('lush_luxe_cart', JSON.stringify(cart));
    }

    // Global Add to Cart Function
    window.addToCart = function (name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price: parseFloat(price), quantity: 1 });
        }
        saveCart(); // Save changes
        updateCartUI();

        if (!document.body.classList.contains('cart-open')) {
            toggleCart();
        }
    };

    // Update Cart UI & Render Items
    function updateCartUI() {
        const itemElements = cartItemsContainer.querySelectorAll('.cart-item-row');
        itemElements.forEach(el => el.remove());

        if (cart.length === 0) {
            emptyCartMsg.style.display = 'block';
            cartSubtotal.textContent = '$0.00';
            cartCount.textContent = '0';
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }

        emptyCartMsg.style.display = 'none';
        if (checkoutBtn) checkoutBtn.disabled = false;

        let totalItems = 0;
        let subtotal = 0;

        cart.forEach((item, index) => {
            totalItems += item.quantity;
            subtotal += item.price * item.quantity;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item-row';
            itemEl.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(138, 145, 117, 0.1); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--brand-olive);';
            itemEl.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                    <span style="color: var(--brand-cream); font-weight: 600; font-size: 0.9rem;">${item.name}</span>
                    <span style="color: var(--brand-sage); font-size: 0.85rem;">$${item.price.toFixed(2)} x ${item.quantity}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button onclick="window.changeQuantity(${index}, 1)" style="background: var(--brand-olive); color: var(--brand-cream); border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-weight: bold;">+</button>
                    <button onclick="window.changeQuantity(${index}, -1)" style="background: var(--brand-olive); color: var(--brand-cream); border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-weight: bold;">-</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartCount.textContent = totalItems;
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Global Quantity Handler
    window.changeQuantity = function (index, delta) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart(); // Save changes
        updateCartUI();
    };


    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
});

    // Secure Global Add to Cart Function with Hybrid Sizing Support
window.addToCart = function(name, price, dropdownId, customContainerId) {
    let selectedSize = "S";
    const dropdown = document.getElementById(dropdownId);
    
    if (dropdown) {
        selectedSize = dropdown.value;
    }

    // If custom size is selected, validate and compile millimeter data securely
    if (selectedSize === 'Custom') {
        const container = document.getElementById(customContainerId);
        if (container) {
            const inputs = container.querySelectorAll('.custom-mm-input');
            let customMeasurements = [];
            let isValid = true;

            inputs.forEach(input => {
                const val = parseFloat(input.value);
                if (isNaN(val) || val <= 0 || val > 30) {
                    isValid = false;
                }
                customMeasurements.push(val);
            });

            if (!isValid) {
                alert('Please enter valid millimeter measurements (1mm - 30mm) for all 10 fingers.');
                return;
            }
            selectedSize = `Custom [L: ${customMeasurements.slice(0,5).join(', ')} | R: ${customMeasurements.slice(5,10).join(', ')}]`;
        }
    }

    // Load, update, and save cart data securely via localStorage
    let cart = JSON.parse(localStorage.getItem('lush_luxe_cart')) || [];
    if (!Array.isArray(cart)) cart = [];

    const existingItem = cart.find(item => item.name === name && item.size === selectedSize);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: typeof name === 'string' ? name : 'Press-On Set',
            price: !isNaN(parseFloat(price)) ? parseFloat(price) : 0,
            size: typeof selectedSize === 'string' ? selectedSize : 'Standard',
            quantity: 1
        });
    }

    localStorage.setItem('lush_luxe_cart', JSON.stringify(cart));
    
    // Trigger UI refresh if updateCartUI function is available
    if (typeof updateCartUI === 'function') {
        updateCartUI();
    }

    // Open cart drawer if closed
    if (!document.body.classList.contains('cart-open')) {
        document.body.classList.add('cart-open');
    }
};