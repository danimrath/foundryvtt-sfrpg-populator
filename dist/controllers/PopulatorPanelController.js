import { Races } from "../data/Races.js";
import { NPCFactory } from "../factories/NPCFactory.js";
import NPCCreationContext from "../models/NPCCreationContext.js";
import { Grafts } from "../data/Grafts.js";
import { CreatureTypeGenerationOptions } from "../data/Generator.js";
import { Subtype, Type } from "../data/Types.js";
export default class PopulatorPanelController extends Application {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "populator-panel",
            classes: ["sfrpg"],
            template: "modules/foundryvtt-sfrpg-populator/templates/PopulatorPanel.html",
            width: 300,
            height: 350,
            minimizable: true,
            resizable: true,
            title: "Populator",
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "description"
                }
            ]
        });
    }
    /**
     * Retrieves Data to be used in rendering template.
     *
     * @param options
     * @returns {Promise<Object>}
     */
    getData(options = {}) {
        return mergeObject(super.getData(), {
            options: options,
            isGM: game.user.isGM,
            NPCRaces: Races.nonCombatantRaces,
            supportedCreatureTypes: CreatureTypeGenerationOptions
        });
    }
    /**
     * Adds any event listeners to the application DOM
     * @param {JQuery<HTMLElement>} html The root HTML of the application window
     * @protected
     */
    activateListeners(html) {
        // Listener for when a day is clicked
        ;
        html
            .find(".npcGenerationButton")
            .on("click", this.npcGenerationButtonClicked.bind(this));
        html
            .find(".monsterGenerationButton")
            .on("click", this.monsterGenerationButtonClicked.bind(this));
    }
    /**
     * Click event when a users clicks on the NPC button
     * @param {Event} e The click event
     */
    async npcGenerationButtonClicked(e) {
        let npcRaceSelectValue = this.element
            .find("#npcRaceSelect")
            .find(":selected")
            .val();
        let selectedRace = npcRaceSelectValue;
        // Settings
        const defaultCR = game.settings.get("foundryvtt-sfrpg-populator", "defaultCR");
        const dynamicTokenImages = game.settings.get("foundryvtt-sfrpg-populator", "dynamicTokenImages");
        // Context
        let context = new NPCCreationContext();
        context.CR = defaultCR;
        // Validates selected race name
        if (Races.nonCombatantRaces[selectedRace]) {
            context.race = selectedRace;
        }
        context.tokenOptions.dynamicImage = dynamicTokenImages;
        await NPCFactory.makeNonHostile(context);
        ui.notifications.info("NPC created.", { permanent: false });
    }
    /**
     * Click event when a users clicks on the Monster button
     * @param {Event} e The click event
     */
    async monsterGenerationButtonClicked(e) {
        var _a;
        let monsterTypeSelectValue = this.element
            .find("#monsterTypeSelect")
            .find(":selected")
            .val();
        let selectedType = monsterTypeSelectValue;
        // Settings
        const defaultCR = game.settings.get("foundryvtt-sfrpg-populator", "defaultCR");
        const dynamicTokenImages = game.settings.get("foundryvtt-sfrpg-populator", "dynamicTokenImages");
        // Context
        let context = new NPCCreationContext();
        context.CR = defaultCR;
        // Validates selected type
        if (Grafts.creatureType[selectedType]) {
            let generatorOption = CreatureTypeGenerationOptions[selectedType];
            let typeKey = Type[generatorOption.type];
            context.creatureTypeGraft = Grafts.creatureType[typeKey];
            // TODO: For now we just use the 1st (and only) subttype associated with type
            if (((_a = generatorOption.subtypes) === null || _a === void 0 ? void 0 : _a.length) == 1) {
                let subtypeKey = Subtype[generatorOption.subtypes[0]];
                context.creatureSubtypeGrafts = [
                    Grafts.creatureSubtype[subtypeKey]
                ];
            }
            context.universalCreatureRules =
                generatorOption.universalCreatureRules;
        }
        await NPCFactory.makeHostile(context);
        ui.notifications.info("NPC created.", { permanent: false });
        // Open monster wizard panel
        //let monsterWizardPanelController = new MonsterWizardPanel1Controller(new NPCCreationContext());
        //monsterWizardPanelController.render(true);
    }
}
//# sourceMappingURL=PopulatorPanelController.js.map