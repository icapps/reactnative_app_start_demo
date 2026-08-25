export function compareSemver(version1: string, version2: string) {
  const firstVersionParts = parseVersionParts(version1);
  const secondVersionParts = parseVersionParts(version2);
  const length = Math.max(firstVersionParts.length, secondVersionParts.length);

  for (let index = 0; index < length; index++) {
    const firstPart = firstVersionParts[index] ?? 0;
    const secondPart = secondVersionParts[index] ?? 0;

    if (firstPart > secondPart) {
      return 1;
    }
    if (firstPart < secondPart) {
      return -1;
    }
  }

  return 0;
}

// Ignores prerelease/build metadata (e.g. '1.2.3-beta') and treats non-numeric segments as 0
function parseVersionParts(version: string): number[] {
  const [core] = version.split(/[-+]/);

  return core.split('.').map((part) => {
    const parsed = Number(part);
    return Number.isNaN(parsed) ? 0 : parsed;
  });
}
