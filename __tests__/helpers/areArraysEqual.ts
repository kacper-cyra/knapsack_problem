export function areArraysEqual<T>(expected: Array<T>, received: Array<T>): boolean {
  const arraysLength = expected.length;

  if (arraysLength !== received.length) return false;
  for (let index = 0; index < arraysLength; index++) {
    if (expected[index] !== received[index]) return false;
  }
  return true;
}
