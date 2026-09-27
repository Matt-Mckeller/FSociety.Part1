export function getLevelExperienceConfig(
  startLevel: number,
  levelCount: number,
): { level: number; entryExperience: number; experienceToNextLevel: number }[] {
  const levels: {
    level: number;
    entryExperience: number;
    experienceToNextLevel: number;
  }[] = [];

  if (startLevel < 1) {
    throw new Error('Start level must be at least 1');
  }

  const halfCount = Math.floor(levelCount / 2);
  let lowerBound = startLevel - halfCount;
  let upperBound = startLevel + halfCount;

  if (lowerBound < 1) {
    const adjustment = 1 - lowerBound;
    lowerBound += adjustment;
    upperBound += adjustment;
  }

  for (let level = lowerBound; level <= upperBound; level++) {
    const entryExperience = 100 * (level - 1);
    levels.push({
      level,
      entryExperience,
      experienceToNextLevel: 100,
    });
  }

  return levels;
}
export function getUserLevelFromExperience(experience: number): number {
  if (experience < 0) {
    throw new Error('Experience cannot be negative');
  }

  return Math.floor(experience / 100) + 1;
}
