const navLinks= document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    //toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu")
});

//close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click() );

//close menu when the nav link is clicked
navLinks.forEach(link =>{
    link.addEventListener("click", () => menuOpenButton.click());
});

//=============================================
//facalities carousel
//=============================================
const images = document.querySelectorAll(".carousel img");
let index = 0;
const prevBtn = document.querySelector(".carousel .prev");
const nextBtn = document.querySelector(".carousel .next");
const carousel = document.querySelector(".carousel");
let autoSlide;

//show image by index 
function showImage(i) {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
}

// next / prev functions
function nextImage() {
    index = (index + 1) % images.length;
    showImage(index);
}
function prevImage() {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
}

// auto-slide every 5s
function startAutoSlide() {
    autoSlide = setInterval(nextImage, 5000);
}
function stopAutoSlide() {
    clearInterval(autoSlide);
}

// reset timer after manual click
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// manual controls
nextBtn.addEventListener("click", () => {
    nextImage();
    resetAutoSlide();
});
prevBtn.addEventListener("click", () => {
    prevImage();
    resetAutoSlide();
});

// pause auto-slide on hover
carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);

// start when page loads
startAutoSlide();

// Blog and News
// Load blog and news data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const blogContainer = document.getElementById('blog-container');
    const newsContainer = document.getElementById('news-container');

    // Sort blogs by date (newest first)
    data.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    data.blogs.forEach(blog => {
      const blogHTML = `
        <div class="blog-post">
          ${blog.image ? `<img src="${blog.image}" alt="${blog.title}" class="post-image">` : ''}
          <h3 class="post-title">${blog.title}</h3>
          <p class="post-date">Published on ${blog.date}</p>
          <p class="post-content">${blog.content}</p>
          <a href="${blog.link}" target="_blank" rel="noopener noreferrer" class="read-more-btn">Read More</a>
        </div>
      `;
      blogContainer.innerHTML += blogHTML;
    });

    // Sort news by date (newest first)
    data.news.sort((a, b) => new Date(b.date) - new Date(a.date));
    data.news.forEach(news => {
      const newsHTML = `
        <div class="news-post">
          <h3 class="post-title">${news.title}</h3>
          <p class="post-date">Published on ${news.date}</p>
          <p class="post-content">${news.content}</p>
          <a href="${news.link}" target="_blank" rel="noopener noreferrer" class="read-more-btn">Read More</a>
        </div>
      `;
      newsContainer.innerHTML += newsHTML;
    });
  })
  .catch(error => console.error('Error loading content:', error));