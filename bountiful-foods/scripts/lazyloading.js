// Get all imgs with data-src attribute
const divToLoad = document.querySelectorAll('article[data-class]');

// Optional parameters being set for the IntersectionObserver
const imgOptions = {
  threshold: 1,
  rootMargin: '0px 0px 50px 0px',
};

// Lazy Load Images
const loadImages = (article) => {
  const img = article.querySelector('img[data-src]');
  const src = img.getAttribute('data-src');
  const className = article.getAttribute('data-class');
  article.setAttribute('class', className);
  img.setAttribute('src', src);
  article.removeAttribute('data-class');
  img.removeAttribute('data-src');
};

// First check to see if Intersection Observer is supported
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (!item.isIntersecting) {
        return;
      } else {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  }, imgOptions);

  divToLoad.forEach((divEl) => {
    imgObserver.observe(divEl);
  });
} else {
  // Just load all images if not supported
  divToLoad.forEach((divEl) => {
    loadImages(divEl);
  });
}