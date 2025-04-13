import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  it('should return the number as string if less than 1000', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(5)).toBe('5');
    expect(formatNumber(50)).toBe('50');
    expect(formatNumber(500)).toBe('500');
  });

  it('should return "1k" for 1000', () => {
    expect(formatNumber(1000)).toBe('1k');
  });

  it('should return "1.1k" for 1100', () => {
    expect(formatNumber(1100)).toBe('1.1k');
  });

  it('should return "9.9k" for 9900', () => {
    expect(formatNumber(9830)).toBe('9.8k');
    expect(formatNumber(9890)).toBe('9.9k');
    expect(formatNumber(9900)).toBe('9.9k');
  });

  it('should return "1M" for 1000000', () => {
    expect(formatNumber(1000000)).toBe('1M');
  });

  it('should return "1.xM" for 1X00000', () => {
    expect(formatNumber(1100000)).toBe('1.1M');
    expect(formatNumber(1500000)).toBe('1.5M');
  });
});
