// utils/sanitizeHtml.js
import createDOMPurify from 'isomorphic-dompurify';

export function sanitizeHTML(html) {
  return createDOMPurify.sanitize(html);
}
