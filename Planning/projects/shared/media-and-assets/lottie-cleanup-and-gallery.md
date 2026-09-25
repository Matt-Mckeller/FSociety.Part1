

**Last Updated:** 2025-10-17

Frontend code root which this project refers to: /Projects/ExpanseFrontend/

# Goals
# Current Status

## 2025-10-17 Progress
- Lottie Cleanup: Animation layer naming seemed to work quite well. Recoloring was working as well. Custom theme seemed better. Need to continue
- Gallery is built in wrong tech, ui isnt great, theres some color switching that is working for starter lotties before applying to all lotties. I started on a review process for getting reviews here too, probably need to just focus on renaming and getting a color theme config for each before jumping into the review aspect but I also don't necessarily want to lose it. 
- Theres a gallery project in /expansefrontend/gallery
    - Mostly displays all the existing lotties and allows color changing between themes. Is good
- Theres a lottie naming project in /expansefrontend/apps/playground/lottie-naming-tool 
    - This is more of an involved see it in action type of tool that allows for naming of each by layer manually while also seeing ai response. One at a time thing to make sure it works kind of deal.
- Theres also a tool for viewing individual lotties and switching colors for those, idk what the purpose of that one is http://localhost:3010/demo?theme=teal&mode=light
    - This might be a different approach which now utilizes a theme config rather than the auto replace code strategy i had
- Layer naming tool was working - successfully exports with name mapping for theming

# Insights
- Looks like the best place to look is the angel wings halo component itself, and track this back to understand whats going on and what exists then clean that up as a proof of concept
- Also will need to find prompts used and strategy used in the naming tool in order to create the flow for updating all the other animations

# Todos

## Immediate (Rocket Launch + Angel Wings POC)
1. Map exported lottie to themeable format
2. Verify exported theme mapping works for rocket launch animation
3. Generate color theme mappings for rocket launch
4. Update lottie naming tool to auto-create themes during export
5. Configure tool to export to correct directory location

## Next Steps
[x] Organize directory structure: each lottie in own folder with theme files
[x] Determine a pattern for organizing the lotties and whether we can benefit from a parent component or just keep utilizing external functions, either way make the themeing cleaner and more reusable / applicable to other lotties. Eventually will want a way to create a static vector export to be displayed initially at the right size for faster loading
[ ] Figure out how to get batch the lotties, finish themeing for all lotties in frontend repo
[ ] Add themes for all existing lotties
[ ] Get descriptions for each lottie and the animation flow that can be stored a long side the lottie as meta data for ai
[ ] Add descriptions for all existing lotties
[ ] Clean up

---

## Original Todos
- Animation themeing needs to be applied for each specific name rather than by color replacement 
- After proof of concept we will create a reusable parent component for the animations, possibly two variations, one that uses mui one that is more generic for standard hex colors or something

# End Goals
- All expanse current lottie animations are cleaned up, layered, and themed with the current mui color themes
- Able to view all lottie animations in a gallery
- Able to toggle colors and light/dark mode 
- Its ok if there is a need for improving/tweaking some of the theme settings for some of the lotties as long as the system is in place to support the animations
- Have a repeatable process for lottie files to be put in and have the layer names updated in batch and in a ui with manual editing


# Questions
- Should I start a new project or edit the existing one?

## Original Roadmap
- POC Themed
- POC Gallery with Layer Editing
- Apply Layer Edits to all
- Apply Theme to all

# Scope
- Not worrying about optimized versions of json yet, prefer full version of the json for now


# Notes
- Regarding auto color repalcement option: this will be included with the existing code that allows for auto replacement of color, theme will be preferred

## Batch Processing Flow
- Able to utilize process built by ui to automatically apply to all existing lotties, and able to view the lotties in the ui to see the current naming structure etc. May want to provide a description for each one myself though rather than relying on ai, perhaps its better to do it one by one. I can also categorize them or do something to figure out which ones are actually important and which are not
