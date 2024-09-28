// Get element by data attribute. If you have "data-hero", provide just "hero"
export function findElement<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector(`[data-${ selector }]`);
}

export function findElementById<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}