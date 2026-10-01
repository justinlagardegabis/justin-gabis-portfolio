(() => {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;
  const cards = [...carousel.querySelectorAll('.work-card')];
  const dots = [...document.querySelectorAll('.carousel-dots button')];
  const count = document.getElementById('carousel-count');
  let index = 0;
  function render(next) {
    index = (next + cards.length) % cards.length;
    cards.forEach((card, i) => {
      const offset = i - index;
      card.style.transform = `perspective(900px) rotateY(${offset * -7}deg) translateZ(${Math.abs(offset) ? -Math.abs(offset) * 18 : 0}px)`;
      card.style.opacity = Math.abs(offset) > 1 ? '.52' : '1';
      card.style.borderColor = offset === 0 ? '#778451' : '';
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    if (window.matchMedia('(max-width: 600px)').matches) {
      carousel.style.transform = `translateX(${index * -100}%)`;
    } else if (window.matchMedia('(max-width: 850px)').matches) {
      carousel.style.transform = `translateX(${index * -244}px)`;
    } else {
      carousel.style.transform = 'none';
    }
  }
  document.querySelector('.carousel-control.prev').addEventListener('click', () => render(index - 1));
  document.querySelector('.carousel-control.next').addEventListener('click', () => render(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => render(i)));
  window.addEventListener('resize', () => render(index));
  render(0);
})();