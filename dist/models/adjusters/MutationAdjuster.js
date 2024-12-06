import { Utils } from "../../utils/Utils.js";
import { MonsterCreation, MonsterReferenceSymbol } from "../../data/MonsterCreation.js";
import { AbilityScore } from "../../data/AbilityScores.js";
/// Used to mutate an actor by increasing or decreasing it's CR by
// intelligently adjusting it's object (changing values, adding items)
export default class MutationAdjuster {
    async apply(actor, context) {
        let output = [];
        let actorUpdate = {};
        // default to combatant #TODO maybe just fail instead?
        let monsterReferenceSymbol = "combatant";
        if (context.monsterReferenceSymbol) {
            monsterReferenceSymbol = MonsterReferenceSymbol[context.monsterReferenceSymbol];
        }
        // Current CR (`number`, 1/3 = `0.3333~`, 1/2 = `0.5`, etc)
        const currentCRNumber = actor.system.details.cr;
        let currentCR = Utils.CRforNumber(currentCRNumber);
        let targetCR = context.CR;
        const approximateCurrentMainRow = MonsterCreation.arrays[monsterReferenceSymbol].main[currentCR];
        const targetMainRow = MonsterCreation.arrays[monsterReferenceSymbol]
            .main[targetCR];
        // Set new name
        actorUpdate["name"] = "Mutated " + actor.name;
        // Set new CR
        actorUpdate["system.details.cr"] = Utils.numberForCR(context.CR);
        output.push(["Set CR to " + context.CR, ""]);
        // Set new HP
        const hpDiff = this.diffOf("HP", approximateCurrentMainRow, targetMainRow);
        const newHPValue = actor.system.attributes.hp.max + hpDiff;
        actorUpdate["system.attributes.hp.max"] = newHPValue;
        actorUpdate["system.attributes.hp.value"] = newHPValue;
        output.push(["Set HP to " + newHPValue, ""]);
        // Set new KAC
        this.applyDiffForKey("KAC", actor.system.attributes.kac.value, "system.attributes.kac.base", approximateCurrentMainRow, targetMainRow, actorUpdate, output);
        // Set new EAC
        this.applyDiffForKey("EAC", actor.system.attributes.eac.value, "system.attributes.eac.base", approximateCurrentMainRow, targetMainRow, actorUpdate, output);
        // Fort
        this.applyDiffForKey("fort", actor.system.attributes.fort.bonus, "system.attributes.fort.base", approximateCurrentMainRow, targetMainRow, actorUpdate, output);
        // Reflex
        this.applyDiffForKey("reflex", actor.system.attributes.reflex.bonus, "system.attributes.reflex.base", approximateCurrentMainRow, targetMainRow, actorUpdate, output);
        // Will
        this.applyDiffForKey("will", actor.system.attributes.will.bonus, "system.attributes.will.base", approximateCurrentMainRow, targetMainRow, actorUpdate, output);
        // Ability Scores
        this.applyAbilityScoreDiffAndInit(actor, approximateCurrentMainRow, targetMainRow, actorUpdate, output);
        // Update actor
        await actor.update(actorUpdate);
        return output;
    }
    // Private Methods
    // Helper which finds the diff between two main array rows on a specific key
    diffOf(key, from, to) {
        const toValue = to[key];
        const fromValue = from[key];
        return toValue - fromValue;
    }
    applyDiffForKey(key, existingValue, saveKeyPath, currrentRow, targetRow, actorUpdate, output) {
        const diff = this.diffOf(key, currrentRow, targetRow);
        const newValue = existingValue + diff;
        actorUpdate[saveKeyPath] = newValue;
        output.push([
            "Set " + key + " to " + newValue + " (from " + existingValue + ")",
            ""
        ]);
    }
    applyAbilityScoreDiffAndInit(actor, currrentRow, targetRow, actorUpdate, output) {
        // Find diffs
        let abilityDiffs = [
            targetRow.abilityMods[0] - currrentRow.abilityMods[0],
            targetRow.abilityMods[1] - currrentRow.abilityMods[1],
            targetRow.abilityMods[2] - currrentRow.abilityMods[2]
        ];
        // Apply diffs to top three ability scores
        let abilityTuples = [];
        for (const abilityScore in AbilityScore) {
            let abilityScoreKey = AbilityScore[abilityScore];
            abilityTuples.push([
                abilityScoreKey,
                actor.system.abilities[abilityScoreKey].mod
            ]);
        }
        // Sort ability scores
        abilityTuples.sort((first, second) => {
            if (first[1] < second[1])
                return 1;
            return -1;
        });
        // Applied to top three abilities
        for (let i = 0; i < 3; i++) {
            const abilityKey = abilityTuples[i][0];
            const existingMod = actor.system.abilities[abilityKey].mod;
            const newAbilityMod = existingMod + abilityDiffs[i];
            // Apply new initiative
            // If we've touched dex mod, set init to match
            if (abilityKey === AbilityScore.dexterity) {
                const currentInitiative = actor.system.attributes.init.total;
                const newInititatve = currentInitiative + abilityDiffs[i];
                actorUpdate["system.attributes.init.total"] = newInititatve;
                output.push([
                    "Set initiative to " +
                        newInititatve +
                        " (to match increase or decrease of the dexterity modifier)",
                    "Unless you increase it with the Improved Initiative feat, a graft, or an ad hoc adjustment, the NPC’s\n" +
                        "initiative bonus is equal to its Dexterity modifier."
                ]);
            }
            // New values applied
            actorUpdate["system.abilities." + abilityKey + ".base"] = newAbilityMod;
            output.push([
                "Set " +
                    abilityKey +
                    " mod to " +
                    newAbilityMod +
                    " (from " +
                    existingMod +
                    ")",
                ""
            ]);
        }
    }
}
//# sourceMappingURL=MutationAdjuster.js.map