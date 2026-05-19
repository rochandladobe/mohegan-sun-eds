export default async function decorate(block) {
  const resp = await fetch('/nav.plain.html');
  if (!resp.ok) {
    block.innerHTML = `
      <div class="nav-wrapper">
        <nav class="nav" id="nav" aria-expanded="false">
          <div class="nav-brand">
            <a href="/" aria-label="Mohegan Sun">
              <img src="/icons/mohegan-sun-logo.png" alt="Mohegan Sun" width="185" height="100"/>
            </a>
          </div>
          <div class="nav-sections">
            <ul>
              <li><a href="/hotels-spa">Hotels &amp; Spa</a></li>
              <li><a href="/entertainment">Entertainment</a></li>
              <li><a href="/offers">Offers</a></li>
              <li><a href="/dine-shop">Dine &amp; Shop</a></li>
              <li><a href="/casino">Casino</a></li>
              <li><a href="/momentum">Momentum</a></li>
              <li><a href="/meetings">Meetings</a></li>
              <li><a href="/golf">Golf</a></li>
            </ul>
          </div>
          <div class="nav-tools">
            <a href="/momentum/login" class="nav-tool">Login</a>
            <a href="/hotels-spa/reservations" class="nav-tool nav-cta">Book A Stay</a>
          </div>
          <button class="nav-hamburger" aria-label="Open navigation" aria-controls="nav" aria-expanded="false">
            <span class="nav-hamburger-icon"></span>
          </button>
        </nav>
      </div>`;
    const hamburger = block.querySelector('.nav-hamburger');
    const nav = block.querySelector('.nav');
    hamburger?.addEventListener('click', () => {
      const expanded = nav.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
    return;
  }
  const html = await resp.text();
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.innerHTML = html;
  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => { if (nav.children[i]) nav.children[i].classList.add(`nav-${c}`); });
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Open navigation');
  hamburger.innerHTML = '<span class="nav-hamburger-icon"></span>';
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav);
  block.append(wrapper);
}
