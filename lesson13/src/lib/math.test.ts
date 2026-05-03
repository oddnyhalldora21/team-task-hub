import { add } from '../lib/math';

describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('adds a positive and negative number', () => {
    expect(add(10, -4)).toBe(6);
  });

  it('adds two zeros', () => {
    expect(add(0, 0)).toBe(0);
  });
});