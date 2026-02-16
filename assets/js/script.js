// Function to load CSV and render content (e.g., for Academy, Blog, or FAQ pages)
function loadCSV(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header
            const items = rows.map(row => {
                const cols = row.split(',');
                return {
                    name: cols[0],
                    price: cols[1],
                    duration: cols[2],
                    shortDesc: cols[3],
                    pageLink: cols[4]
                };
            });
            callback(items);
        });
}

// Function to load FAQ CSV and render as table
function loadFAQ(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header
            const faqs = rows.map(row => {
                const cols = row.split(',');
                return {
                    question: cols[0],
                    answer: cols[1]
                };
            });
            callback(faqs);
        });
}

// Tab functionality for "What Do We Do" and Portfolio sections
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Slider functionality for testimonials
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (slides.length > 0) {
        const totalSlides = slides.length;
        currentSlide = (index + totalSlides) % totalSlides;
        document.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Load content on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load programs on academy.html
    if (document.getElementById('programs-container')) {
        loadCSV('assets/data/programs.csv', (programs) => {
            const container = document.getElementById('programs-container');
            programs.forEach(program => {
                const card = document.createElement('div');
                card.className = 'program-card';
                card.innerHTML = `
                    <h3>${program.name}</h3>
                    <p>${program.shortDesc}</p>
                    <p>Duration: ${program.duration}</p>
                    <p>Price: ₦${program.price}</p>
                    <a href="${program.pageLink}" class="btn btn-primary">View Details</a>
                `;
                container.appendChild(card);
            });
        });
    }
    // Load blog on blog.html (redirects to Medium)
    if (document.getElementById('blog-container')) {
        loadCSV('assets/data/blog.csv', (posts) => {
            const container = document.getElementById('blog-container');
            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'blog-card';
                card.innerHTML = `
                    <img src="${post.image}" alt="${post.title}">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="${post.link}" class="btn btn-primary">Read on Medium</a>
                `;
                container.appendChild(card);
            });
        });
    }
    // Load FAQ on about.html
    if (document.getElementById('faq-container')) {
        loadFAQ('assets/data/faq.csv', (faqs) => {
            const tbody = document.querySelector('#faq-container tbody');
            faqs.forEach(faq => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${faq.question}</td>
                    <td>${faq.answer}</td>
                `;
                tbody.appendChild(row);
            });
        });
    }
    // Initialize slider on homepage
    if (document.querySelector('.slider')) {
        showSlide(0);
    }
});

// Function to load consultation solutions CSV and render cards (up to 6)
function loadSolutions(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header
            const solutions = rows.map(row => {
                const cols = row.split(',');
                return {
                    title: cols[0],
                    description: cols[1],
                    results: cols[2],
                    whatWeDid: cols[3],
                    rating: parseInt(cols[4]),
                    pdfLink: cols[5]
                };
            }).slice(0, 6); // Limit to 6 items
            callback(solutions);
        });
}

// Load solutions on consultation.html
document.addEventListener('DOMContentLoaded', () => {
    // Existing code...
    if (document.getElementById('solutions-container')) {
        loadSolutions('assets/data/consultation-solutions.csv', (solutions) => {
            const container = document.getElementById('solutions-container');
            solutions.forEach(solution => {
                const stars = '★'.repeat(solution.rating) + '☆'.repeat(5 - solution.rating);
                const card = document.createElement('div');
                card.className = 'solution-card';
                card.innerHTML = `
                    <h3>${solution.title}</h3>
                    <p><strong>Description:</strong> ${solution.description}</p>
                    <p><strong>Results:</strong> ${solution.results}</p>
                    <p><strong>What We Did:</strong> ${solution.whatWeDid}</p>
                    <div class="rating">${stars}</div>
                    <a href="${solution.pdfLink}" class="btn btn-primary" download>Read Report</a>
                `;
                container.appendChild(card);
            });
        });
    }
    // Existing code...
});