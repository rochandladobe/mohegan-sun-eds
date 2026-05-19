export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      col.className = 'columns-col';
      const pic = col.querySelector('picture');
      if (pic && pic.closest('div') === col.firstElementChild) {
        col.firstElementChild.className = 'columns-col-image';
      }
    });
  });
}
