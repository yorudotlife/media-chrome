export function createTemplate(template) {
  const t = document.createElement('template');
  t.innerHTML = template;
  return t;
}
