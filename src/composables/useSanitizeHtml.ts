import DOMPurify from 'dompurify';

export function useSanitizeHtml() {
  const sanitize = (dirty: string) => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'span'],
    });
  };

  return { sanitize };
}
