export const mockSlowConnection = (delay: number = 2000) => {
  const now = performance.now();
  while (performance.now() - now < delay) {
    // just want to show loader for a short while for a better user experience
  }
};
