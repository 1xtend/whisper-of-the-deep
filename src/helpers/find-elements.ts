// Get element by data attribute. If you have "data-hero", provide just "hero"
export function findElement<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector(`[data-${ selector }]`);
}

export function findElementById<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

export function findElements<T extends HTMLElement>(selector: string): T[] {
  const nodeList: NodeListOf<T> = document.querySelectorAll(`[data-${ selector }]`);
  return nodeList.length > 0 ? Array.from(nodeList) : [];
}