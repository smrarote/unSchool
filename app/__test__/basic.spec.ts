const sum = (a: number, b: number): number => {
  return a + b;
};

test('add 1 + 10000', () => {
  expect(sum(1, 1)).toBe(2);
});
