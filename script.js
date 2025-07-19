document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const categoryFilter = document.getElementById('category-filter');
    const cartCount = document.getElementById('cart-count');
    const productModal = document.getElementById('product-modal');
    const closeModalBtn = document.querySelector('.close-button');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalCategory = document.getElementById('modal-category');
    const sizeSelect = document.getElementById('size-select');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');

    let cart = []; // For simplicity, cart is stored in memory. For real app, use localStorage or backend.

    // --- Product Data ---
    // IMPORTANT: REPLACE THESE IMAGE URLS WITH YOUR ACTUAL IMAGE URLS ************
    // You will need to upload your images to an image hosting service (like ImgBB, Cloudinary, etc.)
    // and then use the direct links here. Googleusercontent links are just placeholders.
    const products = [
        {
            id: 'tshirt-001',
            name: 'फ्री फायर बैटल टी-शर्ट',
            description: 'गेमर्स के लिए डिज़ाइन की गई उच्च गुणवत्ता वाली फ्री फायर थीम वाली टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/1',
            price: 499,
            category: 'men',
            sizes: ['S', 'M', 'L', 'XL']
        },
        {
            id: 'tshirt-002',
            name: 'कॉफी लवर टी-शर्ट',
            description: 'कॉफी के प्रति अपने प्यार को व्यक्त करने के लिए आरामदायक सूती टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/2',
            price: 399,
            category: 'unisex',
            sizes: ['S', 'M', 'L']
        },
        {
            id: 'tshirt-003',
            name: 'बटरफ्लाई ड्रीम्स टी-शर्ट',
            description: 'महिलाओं के लिए नाजुक तितली डिज़ाइन वाली स्टाइलिश और हल्की टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/3',
            price: 450,
            category: 'women',
            sizes: ['XS', 'S', 'M']
        },
        {
            id: 'tshirt-004',
            name: 'ट्रैवल एंथुसिएस्ट टी-शर्ट',
            description: 'उन लोगों के लिए आदर्श जो घूमना पसंद करते हैं। आरामदायक फिट।',
            image: 'http://googleusercontent.com/file_content/4',
            price: 520,
            category: 'unisex',
            sizes: ['M', 'L', 'XL']
        },
        {
            id: 'tshirt-005',
            name: 'फनी कैट टी-शर्ट',
            description: 'मज़ेदार कैट ग्राफिक वाली प्यारी टी-शर्ट। बच्चों और कैट लवर्स के लिए।',
            image: 'http://googleusercontent.com/file_content/5',
            price: 300,
            category: 'kids',
            sizes: ['4Y', '6Y', '8Y']
        },
        {
            id: 'tshirt-006',
            name: 'एब्स्ट्रेक्ट आर्ट टी-शर्ट',
            description: 'पुरुषों के लिए आधुनिक एब्स्ट्रेक्ट प्रिंट वाली अनोखी टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/6',
            price: 550,
            category: 'men',
            sizes: ['M', 'L', 'XL', 'XXL']
        },
        {
            id: 'tshirt-007',
            name: 'योग और मेडिटेशन टी-शर्ट',
            description: 'शांत और आरामदायक, योग और मेडिटेशन अभ्यास के लिए उत्तम।',
            image: 'http://googleusercontent.com/file_content/7',
            price: 480,
            category: 'women',
            sizes: ['S', 'M', 'L']
        },
        {
            id: 'tshirt-008',
            name: 'साइंस geek टी-शर्ट',
            description: 'साइंस के प्रति उत्साही लोगों के लिए कूल ग्राफिक टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/8',
            price: 420,
            category: 'unisex',
            sizes: ['S', 'M', 'L', 'XL']
        },
        {
            id: 'tshirt-009',
            name: 'डायनासोर बच्चे की टी-शर्ट',
            description: 'छोटे बच्चों के लिए प्यारा डायनासोर डिज़ाइन। नरम और टिकाऊ।',
            image: 'http://googleusercontent.com/file_content/9',
            price: 280,
            category: 'kids',
            sizes: ['2Y', '4Y', '6Y']
        },
        {
            id: 'tshirt-010',
            name: 'माउंटेन एडवेंचर टी-शर्ट',
            description: 'पहाड़ों के प्रेमियों के लिए प्रेरित टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/10',
            price: 500,
            category: 'men',
            sizes: ['M', 'L', 'XL']
        },
        {
            id: 'tshirt-011',
            name: 'फ्लॉवर पावर टी-शर्ट',
            description: 'महिलाओं के लिए जीवंत फूलों के प्रिंट वाली फैशनेबल टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/11',
            price: 470,
            category: 'women',
            sizes: ['S', 'M', 'L', 'XL']
        },
        {
            id: 'tshirt-012',
            name: 'पॉजिटिव वाइब्स टी-शर्ट',
            description: 'सकारात्मक संदेश के साथ आरामदायक टी-शर्ट। हर किसी के लिए।',
            image: 'http://googleusercontent.com/file_content/12',
            price: 380,
            category: 'unisex',
            sizes: ['S', 'M', 'L']
        },
        {
            id: 'tshirt-013',
            name: 'स्पेस एक्सप्लोरर टी-शर्ट',
            description: 'बच्चों के लिए आकाशीय पिंडों के डिज़ाइन वाली शैक्षिक टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/13',
            price: 320,
            category: 'kids',
            sizes: ['6Y', '8Y', '10Y']
        },
        {
            id: 'tshirt-014',
            name: 'गेमर जोन टी-शर्ट',
            description: 'गेमर्स के लिए परफेक्ट, कूल गेमिंग ग्राफिक के साथ।',
            image: 'http://googleusercontent.com/file_content/14',
            price: 490,
            category: 'men',
            sizes: ['M', 'L', 'XL']
        },
        {
            id: 'tshirt-015',
            name: 'सॉफ्ट पेस्टल टी-शर्ट',
            description: 'महिलाओं के लिए न्यूनतम डिज़ाइन और नरम पेस्टल रंगों में।',
            image: 'http://googleusercontent.com/file_content/15',
            price: 400,
            category: 'women',
            sizes: ['XS', 'S', 'M', 'L']
        },
        {
            id: 'tshirt-016',
            name: 'म्यूजिक लवर टी-शर्ट',
            description: 'जो संगीत पसंद करते हैं, उनके लिए स्टाइलिश संगीत नोट डिज़ाइन।',
            image: 'http://googleusercontent.com/file_content/16',
            price: 410,
            category: 'unisex',
            sizes: ['S', 'M', 'L']
        },
        {
            id: 'tshirt-017',
            name: 'रोबोटिक किड्स टी-शर्ट',
            description: 'छोटे इंजीनियरों के लिए मज़ाकिया रोबोट डिज़ाइन।',
            image: 'http://googleusercontent.com/file_content/17',
            price: 310,
            category: 'kids',
            sizes: ['4Y', '6Y', '8Y']
        },
        {
            id: 'tshirt-018',
            name: 'फिटनेस एंथुसिएस्ट टी-शर्ट',
            description: 'जिम जाने वालों और फिटनेस के प्रति उत्साही लोगों के लिए।',
            image: 'http://googleusercontent.com/file_content/18',
            price: 530,
            category: 'men',
            sizes: ['M', 'L', 'XL', 'XXL']
        },
        {
            id: 'tshirt-019',
            name: 'बोहेमियन स्पिरिट टी-शर्ट',
            description: 'महिलाओं के लिए बोहेमियन-प्रेरित प्रिंट वाली अद्वितीय टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/19',
            price: 460,
            category: 'women',
            sizes: ['S', 'M', 'L']
        },
        {
            id: 'tshirt-020',
            name: 'कॉमिक बुक टी-शर्ट',
            description: 'कॉमिक बुक प्रशंसकों के लिए मजेदार और रंगीन डिज़ाइन।',
            image: 'http://googleusercontent.com/file_content/20',
            price: 440,
            category: 'unisex',
            sizes: ['M', 'L']
        },
        {
            id: 'tshirt-021',
            name: 'पैटर्न एनिमल टी-शर्ट',
            description: 'बच्चों के लिए प्यारा और पैटर्न वाला एनिमल ग्राफिक।',
            image: 'http://googleusercontent.com/file_content/21',
            price: 290,
            category: 'kids',
            sizes: ['2Y', '4Y', '6Y']
        },
        {
            id: 'tshirt-022',
            name: 'सफ़ेद बेसिक टी-शर्ट',
            description: 'हर अलमारी के लिए एक आवश्यक सादी सफ़ेद टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/22',
            price: 250,
            category: 'unisex',
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'tshirt-023',
            name: 'काली बेसिक टी-शर्ट',
            description: 'हर अलमारी के लिए एक आवश्यक सादी काली टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/23',
            price: 250,
            category: 'unisex',
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'tshirt-024',
            name: 'ग्रे बेसिक टी-शर्ट',
            description: 'हर अलमारी के लिए एक आवश्यक सादी ग्रे टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/24',
            price: 250,
            category: 'unisex',
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'tshirt-025',
            name: 'ब्लू बेसिक टी-शर्ट',
            description: 'हर अलमारी के लिए एक आवश्यक सादी नीली टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/25',
            price: 250,
            category: 'unisex',
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'tshirt-026',
            name: 'ग्रीन बेसिक टी-शर्ट',
            description: 'हर अलमारी के लिए एक आवश्यक सादी हरी टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/26',
            price: 250,
            category: 'unisex',
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'tshirt-027',
            name: 'येलो बेसिक टी-शर्ट',
            description: 'हर अलमारी के लिए एक आवश्यक सादी पीली टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/27',
            price: 250,
            category: 'unisex',
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'tshirt-028',
            name: 'पिंक बेसिक टी-शर्ट',
            description: 'हर अलमारी के लिए एक आवश्यक सादी गुलाबी टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/28',
            price: 250,
            category: 'unisex',
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'tshirt-029',
            name: 'रेड बेसिक टी-शर्ट',
            description: 'हर अलमारी के लिए एक आवश्यक सादी लाल टी-शर्ट।',
            image: 'http://googleusercontent.com/file_content/29',
            price: 250,
            category: 'unisex',
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        }
    ];

    function displayProducts(filterCategory = 'all') {
        productGrid.innerHTML = ''; // Clear existing products
        const filteredProducts = filterCategory === 'all' ? products : products.filter(product => product.category === filterCategory);

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button class="btn view-details-btn" data-id="${product.id}">विवरण देखें</button>
            `;
            productGrid.appendChild(productCard);
        });

        addEventListenersToViewDetailsButtons();
    }

    function addEventListenersToViewDetailsButtons() {
        document.querySelectorAll('.view-details-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const product = products.find(p => p.id === productId);
                if (product) {
                    showProductModal(product);
                }
            });
        });
    }

    function showProductModal(product) {
        modalImg.src = product.image;
        modalImg.alt = product.name;
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;
        modalCategory.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        modalPrice.textContent = `₹${product.price}`;

        // Clear previous sizes and add new ones
        sizeSelect.innerHTML = '';
        product.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });

        // Set current product data for Add to Cart button
        addToCartBtn.dataset.productId = product.id;
        addToCartBtn.dataset.productName = product.name;
        addToCartBtn.dataset.productPrice = product.price;

        productModal.style.display = 'block'; // Show the modal
    }

    closeModalBtn.addEventListener('click', () => {
        productModal.style.display = 'none'; // Hide the modal
    });

    // Close modal if clicked outside
    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    addToCartBtn.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId;
        const productName = event.target.dataset.productName;
        const productPrice = event.target.dataset.productPrice;
        const selectedSize = sizeSelect.value;

        if (selectedSize) {
            const item = {
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                size: selectedSize,
                quantity: 1
            };
            addItemToCart(item);
            alert(`${productName} (Size: ${selectedSize}) added to cart!`);
            productModal.style.display = 'none'; // Hide modal after adding to cart
        } else {
            alert('Please select a size!');
        }
    });

    buyNowBtn.addEventListener('click', () => {
        alert('Buy Now functionality is for demo purposes only. Please add to cart first!');
    });


    function addItemToCart(item) {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id && cartItem.size === item.size);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity++;
        } else {
            cart.push(item);
        }
        updateCartCount();
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    categoryFilter.addEventListener('change', (event) => {
        displayProducts(event.target.value);
    });

    // Initial display of products
    displayProducts();
});
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const cartCountSpan = document.getElementById('cart-count');
    const categoryFilter = document.getElementById('category-filter');

    // Modal elements
    const productModal = document.getElementById('product-modal');
    const closeModalButton = productModal.querySelector('.close-button');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalCategory = document.getElementById('modal-category');
    const modalPrice = document.getElementById('modal-price');
    const sizeSelect = document.getElementById('size-select');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    let products = [
        {
            id: 1,
            name: "फ्री फायर बैटल टी-शर्ट",
            description: "प्रीमियम कॉटन से बनी आरामदायक टी-शर्ट, गेमर्स के लिए बेहतरीन।",
            price: 899, // Unisex
            image: "https://via.placeholder.com/300x300/FF5733/FFFFFF?text=FreeFire",
            category: "unisex",
            sizes: ["S", "M", "L", "XL"]
        },
        {
            id: 2,
            name: "कॉफ़ी लवर टी-शर्ट",
            description: "कॉफ़ी प्रेमियों के लिए स्टाइलिश डिज़ाइन।",
            price: 899, // Unisex
            image: "https://via.placeholder.com/300x300/A0522D/FFFFFF?text=Coffee",
            category: "unisex",
            sizes: ["S", "M", "L", "XL"]
        },
        {
            id: 3,
            name: "बटरफ्लाई ड्रीम्स टी-शर्ट",
            description: "ख़ूबसूरत बटरफ्लाई डिज़ाइन वाली टी-शर्ट।",
            price: 899, // Women
            image: "https://via.placeholder.com/300x300/87CEEB/FFFFFF?text=Butterfly",
            category: "women",
            sizes: ["S", "M", "L"]
        },
        {
            id: 4,
            name: "ट्रैवल एंथुसिऐस्ट टी-शर्ट",
            description: "घूमने के शौकीनों के लिए एकदम सही।",
            price: 899, // Unisex
            image: "https://via.placeholder.com/300x300/32CD32/FFFFFF?text=Travel",
            category: "unisex",
            sizes: ["M", "L", "XL"]
        },
        {
            id: 5,
            name: "फनी कैट टी-शर्ट",
            description: "क्यूट और फनी बिल्ली का डिज़ाइन।",
            price: 599, // Kids
            image: "https://via.placeholder.com/300x300/FFD700/000000?text=FunnyCat",
            category: "kids",
            sizes: ["S", "M", "L"]
        },
        {
            id: 6,
            name: "एब्स्ट्रैक्ट आर्ट टी-शर्ट",
            description: "आधुनिक कला से प्रेरित अद्वितीय डिज़ाइन।",
            price: 899, // Unisex
            image: "https://via.placeholder.com/300x300/6A5ACD/FFFFFF?text=AbstractArt",
            category: "unisex",
            sizes: ["L", "XL", "XXL"]
        },
        {
            id: 7,
            name: "योग और मेडिटेशन टी-शर्ट",
            description: "शांत और आरामदायक, योग सत्रों के लिए।",
            price: 899, // Women
            image: "https://via.placeholder.com/300x300/98FB98/000000?text=Yoga",
            category: "women",
            sizes: ["S", "M", "L"]
        },
        {
            id: 8,
            name: "साइंस गीक टी-शर्ट",
            description: "विज्ञान प्रेमियों के लिए कूल ग्राफिक टी।",
            price: 899, // Men
            image: "https://via.placeholder.com/300x300/4682B4/FFFFFF?text=Science",
            category: "men",
            sizes: ["M", "L", "XL"]
        },
        {
            id: 9,
            name: "माउंटेन एडवेंचर टी-शर्ट",
            description: "पहाड़ों और एडवेंचर के शौकीनों के लिए।",
            price: 899, // Unisex
            image: "https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Mountain",
            category: "unisex",
            sizes: ["M", "L", "XL", "XXL"]
        },
        {
            id: 10,
            name: "पॉजिटिव वाइब्स टी-शर्ट",
            description: "सकारात्मक ऊर्जा के लिए प्रेरणादायक कोट।",
            price: 899, // Women
            image: "https://via.placeholder.com/300x300/FFC0CB/000000?text=PositiveVibes",
            category: "women",
            sizes: ["S", "M", "L"]
        },
        {
            id: 11,
            name: "स्पेस एक्सप्लोरर टी-शर्ट",
            description: "ब्रह्मांड के प्रेमियों के लिए अद्वितीय डिज़ाइन।",
            price: 599, // Kids
            image: "https://via.placeholder.com/300x300/4B0082/FFFFFF?text=Space",
            category: "kids",
            sizes: ["S", "M"]
        },
        {
            id: 12,
            name: "गेमर ज़ोन टी-शर्ट",
            description: "गेमर्स के लिए विशेष डिज़ाइन, उच्च गुणवत्ता।",
            price: 899, // Men
            image: "https://via.placeholder.com/300x300/00CED1/FFFFFF?text=Gamer",
            category: "men",
            sizes: ["M", "L", "XL"]
        },
        {
            id: 13,
            name: "सॉफ्ट पेस्टल टी-शर्ट",
            description: "हल्के रंगों में आरामदायक और स्टाइलिश।",
            price: 899, // Women
            image: "https://via.placeholder.com/300x300/E6E6FA/000000?text=Pastel",
            category: "women",
            sizes: ["S", "M", "L"]
        },
        {
            id: 14,
            name: "म्यूजिक लवर टी-शर्ट",
            description: "संगीत प्रेमियों के लिए एक आदर्श विकल्प।",
            price: 899, // Unisex
            image: "https://via.placeholder.com/300x300/DA70D6/FFFFFF?text=Music",
            category: "unisex",
            sizes: ["S", "M", "L", "XL"]
        },
        {
            id: 15,
            name: "रोबोटिक किड्स टी-शर्ट",
            description: "बच्चों के लिए रोबोट थीम वाली मज़ेदार टी-शर्ट।",
            price: 599, // Kids
            image: "https://via.placeholder.com/300x300/7B68EE/FFFFFF?text=RobotKid",
            category: "kids",
            sizes: ["XS", "S"]
        },
        {
            id: 16,
            name: "पैटर्न एनिमल टी-शर्ट",
            description: "अद्वितीय पशु पैटर्न के साथ स्टाइलिश टी-शर्ट।",
            price: 899, // Unisex
            image: "https://via.placeholder.com/300x300/F0E68C/000000?text=AnimalPattern",
            category: "unisex",
            sizes: ["M", "L"]
        },
        {
            id: 17,
            name: "सफेद बेसिक टी-शर्ट",
            description: "रोजमर्रा के उपयोग के लिए क्लासिक सफेद टी-शर्ट।",
            price: 899, // Unisex
            image: "https://via.placeholder.com/300x300/FFFFFF/000000?text=WhiteBasic",
            category: "unisex",
            sizes: ["S", "M", "L", "XL", "XXL"]
        },
        {
            id: 18,
            name: "रेड बेसिक टी-शर्ट",
            description: "कैजुअल लुक के लिए जीवंत लाल टी-शर्ट।",
            price: 899, // Unisex
            image: "https://via.placeholder.com/300x300/FF0000/FFFFFF?text=RedBasic",
            category: "unisex",
            sizes: ["S", "M", "L", "XL", "XXL"]
        }
    ];

    let cart = [];

    function renderProducts(filteredProducts = products) {
        productGrid.innerHTML = ''; // Clear existing products
        // Sort products by price in ascending order before rendering
        filteredProducts.sort((a, b) => a.price - b.price); 

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button class="btn view-details" data-id="${product.id}">विवरण देखें</button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    function updateCartCount() {
        cartCountSpan.textContent = cart.length;
    }

    // Event listener for category filter
    categoryFilter.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === 'all') {
            renderProducts();
        } else {
            const filtered = products.filter(product => product.category === selectedCategory);
            renderProducts(filtered);
        }
    });

    // Event listener for product card clicks (for modal)
    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details')) {
            const productId = parseInt(event.target.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
                modalImg.src = product.image;
                modalImg.alt = product.name;
                modalTitle.textContent = product.name;
                modalDescription.textContent = product.description;
                modalCategory.textContent = product.category;
                modalPrice.textContent = `₹${product.price}`;

                sizeSelect.innerHTML = ''; // Clear previous sizes
                product.sizes.forEach(size => {
                    const option = document.createElement('option');
                    option.value = size;
                    option.textContent = size;
                    sizeSelect.appendChild(option);
                });

                // Set current product ID to add to cart button
                addToCartBtn.dataset.productId = product.id;

                productModal.style.display = 'flex'; // Show modal
            }
        }
    });

    // Close modal when close button is clicked
    closeModalButton.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    // Add to cart functionality
    addToCartBtn.addEventListener('click', () => {
        const productId = parseInt(addToCartBtn.dataset.productId);
        const selectedSize = sizeSelect.value;
        const productToAdd = products.find(p => p.id === productId);

        if (productToAdd && selectedSize) {
            cart.push({ ...productToAdd, selectedSize });
            updateCartCount();
            alert(`${productToAdd.name} (${selectedSize} size) कार्ट में जोड़ा गया!`);
            productModal.style.display = 'none'; // Close modal after adding
        } else {
            alert('कृपया साइज़ चुनें।');
        }
    });

    // Initial render of products
    renderProducts();
    updateCartCount();
});
