import { useSanitizeHtml } from '@/composables/useSanitizeHtml';

const { sanitize } = useSanitizeHtml();

describe('useSanitizeHtml', () => {
  // ✅ Allowed content
  it('should allow <p> tag', () => {
    expect(sanitize('<p>This is allowed</p>')).toBe('<p>This is allowed</p>');
  });

  it('should allow <b>, <i>, <em>, <strong>, <span> tags', () => {
    const dirty =
      '<b>Bold</b> <i>Italic</i> <em>Emphasized</em> <strong>Strong</strong> <span>Span</span>';
    expect(sanitize(dirty)).toBe(dirty);
  });

  it('should allow nested allowed tags', () => {
    const dirty = '<p><strong>Bold in paragraph</strong></p>';
    expect(sanitize(dirty)).toBe(dirty);
  });

  // ❌ Disallowed or dangerous content
  it('should remove <script> tags', () => {
    expect(sanitize('<script>alert("XSS")</script>')).toBe('');
  });

  it('should remove <a> tags completely', () => {
    expect(sanitize('<a href="https://example.com">Click me</a>')).toBe(
      'Click me',
    );
  });

  it('should remove <img> tags', () => {
    expect(sanitize('<img src="test.jpg" />')).toBe('');
  });

  it('should remove <div onclick="alert(1)"> and keep only inner text', () => {
    expect(sanitize('<div onclick="alert(1)">Click me</div>')).toBe('Click me');
  });

  it('should strip javascript: href from removed <a> tag', () => {
    expect(sanitize('<a href="javascript:alert(\'XSS\')">Danger</a>')).toBe(
      'Danger',
    );
  });

  it('should remove <iframe> tags', () => {
    expect(sanitize('<iframe src="http://evil.com"></iframe>')).toBe('');
  });

  it('should remove <style> tags with CSS-based attack', () => {
    expect(
      sanitize(
        '<style>body { background: url("javascript:alert(1)") }</style>',
      ),
    ).toBe('');
  });

  it('should remove <svg> with embedded <script>', () => {
    expect(sanitize('<svg><script>alert("XSS")</script></svg>')).toBe('');
  });

  // 🤯 Malformed or unclosed HTML
  it('should handle unclosed tags and close them safely', () => {
    expect(sanitize('<p><strong>Oops')).toBe('<p><strong>Oops</strong></p>');
  });

  it('should handle malformed nested HTML', () => {
    expect(sanitize('<p><em>Broken')).toBe('<p><em>Broken</em></p>');
  });

  it('should handle random broken tags', () => {
    expect(sanitize('<span><i>Test')).toBe('<span><i>Test</i></span>');
  });
});
