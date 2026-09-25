// export const LEVEL_EXPERIENCE_REQUIREMENT_CONFIG =
export const LEVEL_EXPERIENCE_REQUIREMENT_CONFIG: {
  [k: number]: { entryExperience: number; experienceToNextLevel: number }
} = {
  1: { entryExperience: 0, experienceToNextLevel: 10 },
  2: { entryExperience: 10, experienceToNextLevel: 10 },
  3: { entryExperience: 30, experienceToNextLevel: 20 },
  4: { entryExperience: 53, experienceToNextLevel: 23 },
  5: { entryExperience: 81, experienceToNextLevel: 28 },
  6: { entryExperience: 128, experienceToNextLevel: 47 },
  7: { entryExperience: 194, experienceToNextLevel: 66 },
  8: { entryExperience: 293, experienceToNextLevel: 99 },
  9: { entryExperience: 413, experienceToNextLevel: 120 },
  10: { entryExperience: 563, experienceToNextLevel: 150 },
  11: { entryExperience: 700, experienceToNextLevel: 137 },
  12: { entryExperience: 800, experienceToNextLevel: 100 },
  13: { entryExperience: 900, experienceToNextLevel: 100 },
  14: { entryExperience: 1000, experienceToNextLevel: 100 },
  15: { entryExperience: 1100, experienceToNextLevel: 100 },
  16: { entryExperience: 1200, experienceToNextLevel: 100 },
  17: { entryExperience: 1300, experienceToNextLevel: 100 },
  18: { entryExperience: 1400, experienceToNextLevel: 100 },
  19: { entryExperience: 1500, experienceToNextLevel: 100 },
  20: { entryExperience: 1600, experienceToNextLevel: 100 },
  21: { entryExperience: 1700, experienceToNextLevel: 100 },
  22: { entryExperience: 1800, experienceToNextLevel: 100 },
  23: { entryExperience: 1900, experienceToNextLevel: 100 },
  24: { entryExperience: 2000, experienceToNextLevel: 100 },
  25: { entryExperience: 2100, experienceToNextLevel: 100 },
  26: { entryExperience: 2200, experienceToNextLevel: 100 },
  27: { entryExperience: 2300, experienceToNextLevel: 100 },
  28: { entryExperience: 2400, experienceToNextLevel: 100 },
  29: { entryExperience: 2500, experienceToNextLevel: 100 },
  30: { entryExperience: 2600, experienceToNextLevel: 100 },
  31: { entryExperience: 2700, experienceToNextLevel: 100 },
  32: { entryExperience: 2800, experienceToNextLevel: 100 },
  33: { entryExperience: 2900, experienceToNextLevel: 100 },
  34: { entryExperience: 3000, experienceToNextLevel: 100 },
  35: { entryExperience: 3100, experienceToNextLevel: 100 },
  36: { entryExperience: 3200, experienceToNextLevel: 100 },
  37: { entryExperience: 3300, experienceToNextLevel: 100 },
  38: { entryExperience: 3400, experienceToNextLevel: 100 },
  39: { entryExperience: 3500, experienceToNextLevel: 100 },
  40: { entryExperience: 3600, experienceToNextLevel: 100 },
}

// export const LEVEL_EXPERIENCE_REQUIREMENT_CONFIG = {
//     1: 0,
//     2: 10,
//     3: 30, // + 20
//     4: 53, // + 23
//     5: 81, // + 28
//     6: 128, // + 37
//     7: 194, // + 66
//     8: 293, // + 99
//     9: 413, // + 120
//     10: 563, // + 150
//     11: 700,
//     12: 800,
//     13: 900,
//     14: 1000,
//     15: 1100,
//     16: 1200,
//     17: 1300,
//     18: 1400,
//     19: 1500,
//     20: 1600,
//     21: 1700,
//     22: 1800,
//     23: 1900,
//     24: 2000,
//     25: 2100,
//     26: 2200,
//     27: 2300,
//     28: 2400,
//     29: 2500,
//     30: 2600,
//     31: 2700,
//     32: 2800,
//     33: 2900,
//     34: 3000,
//     35: 3100,
//     36: 3200,
//     37: 3300,
//     38: 3400,
//     39: 3500,
//     40: 3600,
// }

// const calculateExpPerLevel = () => {
//     const perLevelAndTotalMap = {}
//     Object.keys(LEVEL_EXPERIENCE_REQUIREMENT_CONFIG).forEach((levelOption, index) => {
//         console.log({ levelOption, leveloptiontype: typeof levelOption })

//         if (levelOption <= 1) {
//             perLevelAndTotalMap[levelOption] = { entryExperience: 0, experienceToNextLevel: 10 }
//         } else {
//             const experienceToNextLevel = LEVEL_EXPERIENCE_REQUIREMENT_CONFIG[levelOption] - LEVEL_EXPERIENCE_REQUIREMENT_CONFIG[levelOption - 1]
//             const entryExperience = LEVEL_EXPERIENCE_REQUIREMENT_CONFIG[levelOption]
//             perLevelAndTotalMap[levelOption] = {
//                 entryExperience,
//                 experienceToNextLevel,
//             }
//         }
//     })
//     console.log(JSON.stringify(perLevelAndTotalMap))
// }
