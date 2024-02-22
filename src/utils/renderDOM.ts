import Block from '../core/Block';

function renderDOM(query: string, block: Block) {
  const root = document.getElementById(query);

  const element = block.getContent();

  if (element) root?.appendChild(element);

  block.dispatchComponentDidMount();

  return root;
}

export default renderDOM;
