import { LEVEL_EXPERIENCE_REQUIREMENT_CONFIG } from "../levels.config"
import { ExperienceContextInterface } from "../types"
import { Level } from "../types"

// todo some of this will be moved to the backend
export class Experience implements ExperienceContextInterface {
  private _totalExperienceEarned = 0

  // private _experienceEventHistory: ExperienceEvent[] = []

  // get experienceEventHistory() {
  //   return this._experienceEventHistory
  // }

  get totalExperienceEarned() {
    return this._totalExperienceEarned
  }

  get currentLevel() {
    let calculatedLevel: Level = 1

    Object.keys(LEVEL_EXPERIENCE_REQUIREMENT_CONFIG).forEach(
      (levelOption, index) => {
        // @ts-ignore
        const expForLevel =
          LEVEL_EXPERIENCE_REQUIREMENT_CONFIG[levelOption].entryExperience
        if (this.totalExperienceEarned >= expForLevel) {
          // @ts-ignore
          calculatedLevel = levelOption
        }
      },
    )
    return parseInt(calculatedLevel as any, 10)
  }

  get remainingExperienceForCurrentLevel() {
    return this.totalExperienceForCurrentLevel - this.totalExperienceEarned
  }

  // Total experience required to reach the next level
  get totalExperienceForCurrentLevel() {
    return (
      LEVEL_EXPERIENCE_REQUIREMENT_CONFIG[this.nextLevel].entryExperience -
        LEVEL_EXPERIENCE_REQUIREMENT_CONFIG[this.currentLevel]
          .entryExperience || Infinity
    )
  }

  // todo, should I have this
  get previousLevel() {
    return this.currentLevel === 1 ? 1 : this.currentLevel - 1
  }

  get nextLevel() {
    return this.currentLevel + 1
  }

  get totalExperienceForPreviousLevel() {
    if (this.currentLevel === 1) {
      return 0
    }
    return LEVEL_EXPERIENCE_REQUIREMENT_CONFIG[this.currentLevel - 1]
      .entryExperience
    // let totalExperienceForPreviousLevel = 0

    // for (let levelIndex = 1; levelIndex < this.currentLevel; levelIndex++) {
    //   totalExperienceForPreviousLevel +=
    //     LEVEL_EXPERIENCE_REQUIREMENT_CONFIG[levelIndex].entryExperience
    // }
    // return totalExperienceForPreviousLevel || 0
  }

  get experienceRemainingForLevel() {
    return this.totalExperienceForCurrentLevel - this.totalExperienceEarned
  }

  // Experience into the current level
  get currentLevelExperience() {
    const entryExperience =
      this.currentLevel === 1
        ? 0
        : LEVEL_EXPERIENCE_REQUIREMENT_CONFIG[this.currentLevel].entryExperience
    return this.totalExperienceEarned - entryExperience
  }

  get experiencePercentage() {
    // current / total for next - total for previous level
    return (
      (this.currentLevelExperience / this.totalExperienceForCurrentLevel) * 100
    )
  }

  constructor({
    totalExperienceEarned,
    // experienceEventHistory,
  }: {
    totalExperienceEarned: number
    // experienceEventHistory?: ExperienceEvent[]
  }) {
    this._totalExperienceEarned = totalExperienceEarned
    // todo, security/bugs?
    // this._experienceEventHistory = experienceEventHistory || []
  }

  toJson(): ExperienceContextInterface {
    // @todo update to enumerable decorators
    // Object.defineProperties(this, {
    //   level: { enumerable: true },
    //   experienceToNextLevel: { enumerable: true },
    //   totalExperienceForNextLevel: { enumerable: true },
    //   previousLevel: { enumerable: true },
    //   totalExperienceForPreviousLevel: { enumerable: true },
    //   requiredExperienceForNextLevel: { enumerable: true },
    // })
    return {
      currentLevel: this.currentLevel,
      totalExperienceEarned: this.totalExperienceEarned,
      // remainingExperienceForCurrentLevel:
      //   this.remainingExperienceForCurrentLevel,
      currentLevelExperience: this.currentLevelExperience,
      totalExperienceForCurrentLevel: this.totalExperienceForCurrentLevel,
      previousLevel: this.previousLevel,
      nextLevel: this.nextLevel,
      // totalExperienceForPreviousLevel: this.totalExperienceForPreviousLevel,
      // experienceRemainingForLevel: this.experienceRemainingForLevel,
      experiencePercentage: this.experiencePercentage,
      // experienceEventHistory: [...this.experienceEventHistory],
    }
  }
}
