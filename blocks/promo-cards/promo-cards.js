export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'promo-cards-list';
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'promo-card';
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.querySelector('picture, img')) {
        div.className = 'promo-card-image';
      } else {
        div.className = 'promo-card-body';
      }
    });
    ul.append(li);
  });
  block.innerHTML = '';
  block.append(ul);
}
