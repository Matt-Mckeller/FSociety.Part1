# Lottie Layer Naming Tool

- Investigate the layer panel(Component Tree), I'm not sure if its displaying all levels of layers with infinite nesting or if its capped or working as expected. If it is report back and tell me what needs to be done
- Move the Animation name, description, and purpose into the edit screen. If these values are provided, pass them into the system prompt command and add them to the system prompt used for determining the layer names.
- Update the Component tree to be named Element Tree and references to it in the code. Goal is to improve understanding of what it actually is, not each layer is a component etc

# Reorganize the structure of the dynamic assets folder, component, and asset organization

Context: Right now there are a bunch of lottie anmiations in packages/dynamicAssets/Lotties and theyre in nested folders, the tsx components may or may not exist, and if they do the json files are split from the actual component. The directory structure is inconsistent and nested. Or, some assets rae at the root layer. Some assets are marked as archived, etc.
End goal:

- Everything is placed in the /lotties directory where the component and lottie json ( and other files ) are organized next to each other. The folders and related assets all have appropriate names
- Files that need reviewed or are junk or old files are placed in a /lotties/\_review folder

# Reusable theming components and functions and improved Component system plan

Goal: Have a more reusable and well architected solution for handling theming across many different lotties.
Questions: What options exist?
Requirements

- Determine a pattern for organizing the lotties and whether we can benefit from a parent component or just keep utilizing external functions
- Determine the best strategy for improving handling here
- Determine what needs to be done to improve the reusability aspect of the theming system
- Update the LayerConfig for the theme setting to remove the "Group" and "Layer" indexes, these are not currently used, also if this is included in the export from the lottie-naming-tool project, remove it there
- Eventually will want a way to create a static vector export to be displayed initially at the right size for faster loading. This seems like it may be related or reelvant.

# Generation

- May be better if generating an svg rather than a lottie then converting svg into lottie
