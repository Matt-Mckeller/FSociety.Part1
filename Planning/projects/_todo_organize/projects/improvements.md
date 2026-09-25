review the code organization, suggest structural improvements for folder layout etc in this monorepo. are there any problems with the monorepo setup?

Continue developing lottie and components for the content generation that will create high quality images and assets. THey should be multi purpose and also allow me to improve my lotties and get them setup to work for multiple color themes. Ideally they look good in all my selected color themes

// After Finishing animation updates
Create single frame still exports for the animations that are loaded when the page loads then switch over to the animated version when the page finishes loading

strategy for initial load of animation showing 1 frame or perhaps a screenshot ( although ideally svg ) of the lottie so we can display that rather than needing to download the entire lottie to improve page load speed, but lets develop a plan for this

create comprehensive documentation and a repository instructions that lists important files, create a plan for doing this

# Lottie Naming Project Improvements

## General ideas

Adding additional context for the system prompt that describes the purpose of the animation?
Seems to not be included in the current prompt but is part of hte user prompt?
Determining what the difference is between the user and system prompt and why the ysstem prompt is not being used

Is component names what we should be using? perhaps element names is more accurately descriptive. Seems we are using this in the prompts and in the page / components themselves but really elements or something may be a better term
Why are we specifying a max tokens of 8000

Improving the categories of the feedback areas etc

claudeClient -> userPrompt & systemPrompt are not being used properly at the moment. This needs to be updated to actually include the system prompt and for the user prompt focus on adding additional purpose and context to the system prompt. The user prompt is currently meant to add additional context for accuracy. Perhaps a better name for this would be inputContext ? It seems like this is also adding context on the current lottie element structure.

## Improving animation parsing

- Add inputs for the description of the animation that is passed to ai to help with the naming of layers
- Improving layout / organization of layers etc, targeted towards a goal like animation
- Improving minification
- Suggested layers for animation, suggested animation types, taking the lottie and animating it / changing how its animated
- Multiple name options for the elements, choose from best or something
- Split up naming into structural and grouping, colored, animation etc
- Screenshots, pipelines, playwright integration options,
- Human interaction
- Layers able to have their color changed and change color in the rendered animation or able to highlight the layer with a stroke or something when the layer is toggled but probably a color change aspect, potentially multiple colors at once

## Additional animation pipelines

- Suggestions + Human feedback & Guidance -> Re-edit
- Themeing updates
- For larger animations running through the naming prompt again specifically for layers which have not yet been named if the context cap was reached
- Accessibility / contrast
- Can cache the lottie file input and add additional pipeline stages for the timeline, and recommendations
- theme_relevance: 0-100, does this animation reflect the brands purpose, design intents, vision, goals, etc
- Identifying layers/elements which are not correctly labeled or not recoloring appropriately

## Additional requirements ( lottie naming / image analysis )

- Knowing which pieces of the animation should remain the same color would be good ( like hands and face skin color )
- Knowing which pieces are skin color may be beneficial if I want to create a system for updating displayed skin color
- Additional instructions specific to each asset may be good like for the rocket launch keep the window backgrounds as white instead of recoloring
- may update or apply some tagging system and allow for viewing in the gallery, potentially an expansion of the variant system and coloring or even art variations based on the theme, but for now limit to just
- Eventually probably going to make the lottie json file be exported rather than themed dynamically for faster loading etc
- May want to investigate having items listed as optionally being colored differently or something? idk the schema could be improved more for the lottie aninmation themes but also its already alot, not overly worried about it, probably wont be overly useful for a while
- Perhaps we should update to allow the user to specify the problem if there is one, such as "Element A" is not mapping as expected or "Element currently labeled as B is mis labled" or "Element C has not been labeled" and the job of the prompt or script we are trying to create is to debug the issue and fix it when being provided with a unified schema and minified json version of the current lottie animation the returned response should be the correct path and layer after having verified the issue and detected it and proved that it is now working. Potentially we even allow for input of a particular area of the screen which the defect occurs in.
- Possible improved meta data for animations, and tagging

```json
{
  "id": "angel-wings-halo",
  "name": "AngelWingsHalo",
  "displayName": "Angel Wings & Halo",
  "category": "Religious",
  "description": "Angel wings spreading with glowing halo above",
  "tags": ["angel", "wings", "halo", "religious", "celestial", "divine"],
  "path": "components/Religious/AngelWingsHalo",
  "dataPath": "lotties/AngelWingsHalo/AngelWingsHalo.json",
  "version": "1.0.0",
  "themeable": true,
  "themeableComponents": [
    "WingLeftFeatherFill",
    "WingRightFeatherFill",
    "HaloRingFill",
    "HaloInnerGlowFill"
  ],
  "status": "active"
}
```

## Exports

- Export as typescript, utilize convert theme to typesciprt
- Add themes as part of the export process

## Possible but complex? Maybe requires people

- Updating animations to utilize the expanse character or similar artstyles
- Algorithmic theming based on a provided hex color, probably better to just use ai though

# Lottie Components

- Export updated json files of the lottie for improved performance also minify these files further

## Questions

Should I be using the ai backend instead of the frontend claude client thing? Can I make it generic enough to support all the ais?
Should it be? Is this too much in one place?
For now I am targetting just getting it to work.

# Lottie Project Ideas

Expanding on things that I have already started such as a better data format, options for generation, better tagging, better recommendations, better analysis, accessibility, data that can be used for generating it, etc. Started a project folder in /docs/lottie-project

# Art Improvements

- Rocket launch animation ( and other animations ) updated to fit expanse character style
- Variation for keeping a primary color and only adding a secondary, i.e. for rocket launch animation keeping the rocket red and changing the color of the people

# Repository importing / exporting

- Apps are importing or exporting more than they need, i.e. when importing expanse.ui/dynamic-assets we are getting every asset. And in next.config.mjs for the playground project we are importing expanse.ui rather than specific components we need. Need to investigate the best way to resolve and improve this also need to understand the impact

```

# More Lotties! And themed!

- Other categories exist but also tagging and other areas like
  Education, Space, Religious, Emotion, Development, Collaboration, Game, Gestures, Royal, Technology

```

# unorganized ideas

- can add interactivity and chat history while communicating with claude to edit the lotties

- improve color extraction to double chck against lottie, had it but didn't want to mess with making sure it was correct
