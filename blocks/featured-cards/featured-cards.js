export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'featured-cards-list';
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'featured-card';
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.querySelector('picture, img')) {
        div.className = 'featured-card-image';
      } else {
        div.className = 'featured-card-body';
      }
    });
    ul.append(li);
  });
  block.innerHTML = '';
  block.append(ul);
}
