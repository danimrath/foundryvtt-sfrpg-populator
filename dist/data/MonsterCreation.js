export const MonsterCreation = {
    arrays: {
        // Expert Arrays
        expert: {
            main: {
                "1/3": { CR: "1/3", EAC: 10, KAC: 11, fort: 0, reflex: 0, will: 2, HP: 6, abilityMods: [3, 1, 0], masterSkill: { count: 3, mod: 7 }, goodSkill: { count: 2, mod: 3 } },
                "1/2": { CR: "1/2", EAC: 10, KAC: 11, fort: 0, reflex: 0, will: 3, HP: 12, abilityMods: [3, 2, 1], masterSkill: { count: 3, mod: 9 }, goodSkill: { count: 2, mod: 4 } },
                "1": { CR: "1", EAC: 11, KAC: 12, fort: 1, reflex: 1, will: 4, HP: 17, abilityMods: [4, 2, 1], masterSkill: { count: 3, mod: 10 }, goodSkill: { count: 2, mod: 5 } },
                "2": { CR: "2", EAC: 13, KAC: 14, fort: 1, reflex: 1, will: 5, HP: 23, abilityMods: [4, 2, 1], masterSkill: { count: 3, mod: 12 }, goodSkill: { count: 2, mod: 7 } }
            },
            attack: {
                "1/3": { high: 2, low: 0, energy: "1d4", kinetic: "1d4", standard: "1d4 + @abilities.str.mod" },
                "1/2": { high: 4, low: 2, energy: "1d4", kinetic: "1d4", standard: "1d4 + @abilities.str.mod" },
                "1": { high: 6, low: 4, energy: "1d4+1", kinetic: "1d4+1", standard: "1d4 + 1 + @abilities.str.mod" },
                "2": { high: 8, low: 6, energy: "1d4+2", kinetic: "1d4+2", standard: "1d4 + 2 + @abilities.str.mod" }
            }
        }
    }
};
//# sourceMappingURL=MonsterCreation.js.map