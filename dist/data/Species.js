import { Grafts } from "./Grafts.js";
import Species from "../models/SpeciesModel.js";
import { Size } from "./Sizes.js";
import { UniversalCreatureRules } from "./universal creature rules/UniversalCreatureRules.js";
export const SpeciesList = {
    // A list of humanoid type species which will randomly be generated (generally for non-combat NPCs)
    humanoidSpecies: {
        android: new Species("android", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.android),
        dwarf: new Species("dwarf", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.dwarf, ["dwarven"]),
        drow: new Species("drow", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.elf, ["drow"]),
        elf: new Species("elf", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.elf, ["elven"]),
        gnome: new Species("gnome", [Size.small], Grafts.creatureType.humanoid, Grafts.creatureSubtype.gnome, ["gnome"]),
        gnoll: new Species("gnoll", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.gnoll, undefined, ["gnoll"]),
        hobgoblin: new Species("hobgoblin", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.goblinoid, ["goblin"]),
        human: new Species("human", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.human),
        halfOrc: new Species("half-orc", [Size.medium], Grafts.creatureType.humanoid, [Grafts.creatureSubtype.human, Grafts.creatureSubtype.orc], ["orc"]),
        halfElf: new Species("half-elf", [Size.medium], Grafts.creatureType.humanoid, [Grafts.creatureSubtype.human, Grafts.creatureSubtype.elf], ["elven"]),
        halfling: new Species("halfling", [Size.small], Grafts.creatureType.humanoid, Grafts.creatureSubtype.halfling, ["halfling"]),
        kasatha: new Species("kasatha", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.kasatha, ["kasatha"], undefined, [4]),
        lashunta: new Species("lashunta", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.lashunta, ["castrovelian"]),
        nuar: new Species("nuar", [Size.medium], Grafts.creatureType.monstrousHumanoid),
        skittermander: new Species("skittermander", [Size.small], Grafts.creatureType.humanoid, Grafts.creatureSubtype.skittermander, undefined, undefined, [6]),
        shirren: new Species("shirren", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.shirren, ["shirren"]),
        sro: new Species("sro", [Size.small, Size.medium], Grafts.creatureType.construct, Grafts.creatureSubtype.technological, undefined, undefined, [1, 2, 3, 4], [UniversalCreatureRules.integratedEquipment]),
        vesk: new Species("vesk", [Size.medium], Grafts.creatureType.humanoid, Grafts.creatureSubtype.vesk, ["vesk"]),
        ysoki: new Species("ysoki", [Size.small], Grafts.creatureType.humanoid, Grafts.creatureSubtype.ysoki, ["akiton", "ysoki"])
    }
};
// The version of sfrpg the player is using may not have the new species included in the Alien species Cards
// I've bundled them here temporarily, will be removed when this module migrates to 0.8.X as a minimum Foundry version
// (as the version of sfrpg which is compatible with 0.8.X will have these species)
export const BundledSpecies = {
    gnoll: {
        name: "Gnoll",
        type: "race",
        data: {
            description: {
                chat: "",
                gmnotes: "",
                short: "",
                value: "<p>Gnolls are hyena-headed humanoids with reputation as bloodthirsty raiders, scavengers, and cannibals. They are capable hunters who respect pwoer and strength over station or role, and most gnolls would believe their own survival takes precedence over any kind of morality.</p>\n<p><strong>Ability Adjustments </strong>+2 Str, +2 Con, -2 Int<br /><strong>Hit Points&nbsp;</strong>6</p>\n<h2>Size and Type</h2>\n<p>Gnolls are Medium humanoids with the gnoll subtype.</p>\n<h2>Self-Sufficient</h2>\n<p>Gnolls receive a +2 racial bonus to Surival checks.</p>\n<h2>Blindsense</h2>\n<p>Gnolls have blindsense (scent) with a range of 30 feet.</p>\n<h2>Darkvision</h2>\n<p>Gnolls can see up to 60 feet in the dark. See page 263 for more information.</p>\n<h2>Rugged Travel</h2>\n<p>Each time they move, gnolls can move through the first square of nonmagical difficult terrain at their normal speed.</p>\n<h2>Natural Weapons</h2>\n<p>Gnolls can attack with a special unarmed strike that deals lethal damage, doesn&rsquo;t count as archaic, and threatens squares. Gnoll gain a special version of the Weapon Specialization feat with this unarmed strike at 3rd level, allowing them to add 1&ndash;1/2 &times; their character level to their damage rolls for this unarmed strike (instead of just adding their character level, as usual).</p>\n<p>&nbsp;</p>",
                unidentified: ""
            },
            source: "ACD",
            type: "humanoid",
            modifiers: [
                {
                    name: "Self-sufficient",
                    modifier: "2",
                    type: "racial",
                    effectType: "skill",
                    valueAffected: "sur",
                    enabled: true,
                    source: "Racial",
                    notes: "Gnolls gain a +2 racial bonus to Survival checks.",
                    modifierType: "constant",
                    condition: "",
                    subtab: "misc",
                    max: 2,
                    _id: "58a26466-6333-4d6b-91f0-49ef03c52fb6"
                }
            ],
            hp: {
                value: 6,
                min: 1
            },
            abilityMods: {
                parts: [
                    [2, "str"],
                    [2, "con"],
                    [-2, "int"]
                ]
            },
            size: "medium",
            subtype: "gnoll",
            damage: {
                parts: []
            },
            critical: {
                parts: []
            }
        },
        flags: {},
        effects: []
    }
};
//# sourceMappingURL=Species.js.map