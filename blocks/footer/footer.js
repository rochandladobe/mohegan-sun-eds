export default async function decorate(block) {
  const resp = await fetch('/footer.plain.html');
  if (!resp.ok) {
    block.innerHTML = `
      <div class="footer-content">
        <div class="footer-top">
          <a href="/" class="footer-logo">
            <img src="/icons/mohegan-sun-logo-white.png" alt="Mohegan Sun" width="150" height="80"/>
          </a>
        </div>
        <div class="footer-columns">
          <div class="footer-col">
            <h4>Company Info</h4>
            <ul>
              <li><a href="/responsible-gaming">Responsible Gaming</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
              <li><a href="/newsroom">Newsroom</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/mohegan-tribe">The Mohegan Indian Tribe</a></li>
              <li><a href="https://mohegan.com" target="_blank" rel="noopener">Mohegan</a></li>
              <li><a href="/social-responsibility">Social Responsibility</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="/hotels-spa">Hotel</a></li>
              <li><a href="/entertainment">Entertainment</a></li>
              <li><a href="/connecticut-sun">Connecticut Sun</a></li>
              <li><a href="/restaurants">Restaurants</a></li>
              <li><a href="/casino">Casino</a></li>
              <li><a href="/gift-cards">Gift Cards</a></li>
              <li><a href="/meetings">Meetings</a></li>
              <li><a href="/golf">Golf</a></li>
              <li><a href="/momentum/login">Momentum Login</a></li>
              <li><a href="/online-casino">Online Casino</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-social">
            <a href="https://www.facebook.com/MoheganSun" target="_blank" rel="noopener" aria-label="Facebook">Facebook</a>
            <a href="https://twitter.com/mohegansun" target="_blank" rel="noopener" aria-label="Twitter">Twitter</a>
            <a href="https://www.youtube.com/mohegansun" target="_blank" rel="noopener" aria-label="YouTube">YouTube</a>
            <a href="https://www.instagram.com/mohegansun" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
          </div>
          <p class="footer-legal">Must be 21 or older to gamble. Gambling Problem? Call 1-888-789-7777 or visit ccpg.org.</p>
          <p class="footer-copyright">© ${new Date().getFullYear()} Mohegan Sun. All Rights Reserved.</p>
        </div>
      </div>`;
    return;
  }
  block.innerHTML = await resp.text();
}
