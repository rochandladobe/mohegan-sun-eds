export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    [...row.children].forEach((col) => {
      if (col.querySelector('picture, img')) {
        col.className = 'teaser-image';
      } else {
        col.className = 'teaser-body';
      }
    });
  });
}
