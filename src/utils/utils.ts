export const getParticle = (word: string): string => {
  if (!word) return '';
  const lastChar = word.charCodeAt(word.length - 1);
  const hasBatchim = (lastChar - 0xac00) % 28 !== 0;
  return hasBatchim ? '을' : '를';
};
