import NPCCreationContext from "../models/NPCCreationContext.js"
import { Utils } from "../utils/Uils.js"
import { Biography } from "../data/Biography.js"

export class BiographyFactory {
    // NOTE: Consider refactoring to only provide needed parameters and remove dependancy on `NPCCreationContext`
    public static makeBiography(actor, context: NPCCreationContext) {
        var biography: string = ""

        if (context.generatePersonality) {
            let personalityTraits = Biography.personalityTraits
            Utils.shuffleArray(personalityTraits)

            biography +=
                "<p>" +
                actor.name +
                " is a " +
                personalityTraits[0] +
                " " +
                context.race +
                " who identifies as " +
                context.gender +
                ".</p>"
        }

        biography += "<p><b>Created by Populator.</b></p>"
        return biography
    }
}
