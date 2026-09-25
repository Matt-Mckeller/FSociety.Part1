**REVIEW REMINDERS DAILY PLS**

Along with the concept of promoting, to a sequence or to live lets add another concept of having goals associated with a particular sequence and scene, and have seeding turned into a UI with browsable elements. The prompt Scripts, Goals, and any seed goals and other text or references/assets are also visible associated with the scene/animation

Actually, the Concept of a sequence and story is actually already existing in the Report project, and spread out to the timeline project as well, it just wasn't animated yet. 
Additionally the timeline view in the command center could be a good way to view these.

actually lets save these implementations for later review ( but make sure they're saved well, like in a plan file next to marketing-video-see.md and titled with similar prefix )

And review the concepts from command center then move over to the 4eye ai chat page and implement these there to make everything work together smoothly

Lets add a high level entity concept object that is inheirited and have sub objects that extend that type for organization of the typing, and make some display screens for the entities adding the display screen for the entity to the 4eye chat screen

I want to have the entity types be inheritable and to have some sort of trait or commonality inheiritance label (from a type) but also saved associated with the entity. These would include things like references, asset type, etc. So actually this is a model I think? Anyway in the UI we will utilize these objects similarly and in shared locations/among shared views and components and need a way to categorize them as entities and then also have config settings for the entity types as to what they're allowed to do or not, like permissions, screens, being able to be placed on an action bar, etc

And a shared entity viewer screen to browse entities and see their associated data. But probably specific customizations/screen components or layouts for each entity type 

But another key component to this is that we will add project management entity types as well. So like

Legend → Campaign ↔ Storyline → Quest → Objective -> Action Flow

These should all be entities 


The screen selection aspect is going to be an important aspect of this, and which screens even exist is another. Or are screens not even screens but resizable widget components that can be moved around and resized like VS Code based on their container? I'm thinking some sort of Dashboard Component Container and a resizable panel system is a good thing to implement here and to make these components like that

Also I want to take company goals/pain points/value statements/data etc, the meta data high level stuff and have that associatable with every entity type with some sort of defined relationship. These would have relationships with pretty much everything that is an entity. Can we have a reusable system / table or something for this or do we need seperate tables for every single relationship type. Additional Meta Data Association: Timeline Variants & Versioningk

"""
- 4ear/plans/core/data-model-overview.md — cross-module entity relationships (currently open)
- 4eye/docs/planning/plans/core/data-model-overview.md — same structure for 4eye
- ExpanseFrontend/apps/4up/docs/architecture_diagram.md — Mermaid `erDiagram` at line 132
"""

Each entity should have its own symbol associated with it 

Questions, answers, score association


Actually the entity viewer and editor or whatever should probably be its own Tile in the App Or something, perhaps the technical page is where its setup. Then For screens we have 1 dynamic screen for ai chat but other specific use cases and screens should be different tiles we won’t worry about at the moment

Recommended Item Purchases/Shop, Shared

Plans: Quest, Project

Domains
    All
        Chat

    Learn
    Work
    Life
        Tiles/Screens
            Mood


List of all existing Components, Quests, Projects Sorted
Finalized Project Task Structure/Entities and Example Screens



# New Map Component: On Page Navigation Toggles
Conceptual: Some way to navigate to a bunch of sub pages in a spatial layout style that can be nested on a page. Similar to the existing Chat Page at the top, screen switching. Ehh maybe it doesnt need a reusable component but its a concept to keep using that aligns with the layout and navigation system. 
Example variant i want to see: 
    [] Option 1: Nav Bar With a Primary Icon and X# of smaller icons on the second row. Primary icon and text visible with a dropdown. When clicked to open the grid/container shape expands to a popover and the icons morph into position with words next to them in a fuller list. Possibly multiple icons.

# Feedback Output
# Feedback Input
# Input Feature Addition: Custom Click Panels
I want components to be able to provide some sort of registration with a click provider that will allow the component to have specific click actions it can register which will be shown when the user Right Clicks ( or other click but focus on this aspect as the primary ). Not all components will have this but some will, and it should override the default.


# Input Screens
Tinder Swipe Input Style + Advanced
Similar, perhaps up down left right or 111

# Lenses/Screens For Viewing and Inspecting Entities From Different Angles
Especially towards a particular objective. 
## Examples
i.e. would be more like Goal Focus Area: 
* Engagement
* Mental health
* etc.

## Details/Context
* Reason for this: The entities may become quite complex, and I want them to have their own page, but likely each entity will have a ton of actions and information to view so we need actions related to these as well. How the actions are input we have tons of options, we can discuss and clarify together.
* This would be for the planning entities but also the animation entities, and chat entities etc. Discussed earlier the way to group entity types. For this i picture it kind of like traits in php object models, being able to add specific features and actions and functionality to particular entities 
* This would allow us to show minimal details and keep the content slim while allowing deep dive into a full screen modal for the particular entity (similar to the map dialog, actually we should probably make this a reusable component too. The dialog can be closed. Whats a good name for this?). 
* Possibly related to click/inspect/analyze feature described below, possibly a seperate feature, depends. 
* Think about this while you're working. Also kind of just a form of acting

# Click Actions & Panel
Inspect/Analyze is a good combo naming here. Example: Inspect/Analyze Action would have a custom defined action such as show a dialog component, or open 4eye chat and talk, or something like that. Perhaps even a small dialog component popup on the screen with the char and just a small window or something. Idk tbh probably needs flexibility, think about it, discuss concisely. 
Each storyline would have its own roadmap that can be generated or manually edited, updated, etc



# Exploring PM tool options
storyline name vs what is currently there doesnt align, storyline , it would be a lens probably. Then we would show features related to that in a list view sorted by max engagement. Filterable to completed (docs) or in progress. And they definitely have as tate

Quests would then need to be ..

And actually tasks/tickets would probably be something else
Like, Components, Modules, Pages, or work types. Perhaps a Work Entity Type then the ticket can be classified as a thing? But then whats the heirarchy? and how would we render it and what would we show. For now just basic categorization and a screen for simple tasks and actions is good enough, but the word quest itself is too limiting I think? Or not? Nah, because I can have quest types and quest names. Like Quest: Food. But then we need some sort of chips and categorization like Daily review. And it would have its own screen with actions and requirements to complete, questions to answer.
And recommended quests for the day on a 
daily standup screen and work dashboard screen


# Reviews
*Details*: Reviewing existing apps that i worked on to see which pieces to move over, etc and gather context. Overall I'm wanting to combine many of the previous projects ( or at least concepts ) I've worked on or that I have into 4eye's hud and chat system. Taking notes here on what I would say are some of the most important pieces to get in right now.
Starter Projects: Command Center, Report
Second: Communication Planner, Profiles
Third:  

*Migration Strategy*: Idk, previously I migrated symbol grid and expanse frontend pieces and wondered if I should have just worked out of those projects but its much cleaner here so probably not. But some projects are actually quite complicated and massive, and need to be refined and cleaned up with updated information and strategy so the only real option is to migrate piece by piece.

### Command Center
Overall lots of good things here, including documentation etc which is pretty damn good
Need Some feedback on the quest Heirarchy and whether it supports planning properly or not. 
### Work Pages / Who Pages Content
This definitely belongs on the company/work page or somewhere. Honestly maybe even public 
http://localhost:3341/insights/compass

## Report (Life Documentation/Perspective)
The entities from the Report project are great, and probably need to be added in to the seeds and animation creation aspect / video and marketing aspects. Also associated with a USER / Profile ( and we have a user profile plan/project as well)
Events associated with user
Definitely want the symbol/patterns as a high priority in the controller
http://localhost:5173/symbols
The interpretations need to be used for videos and provided as guidance. They kind of align with perspective so maybe like interpretations/perspective is the label and symbol target there. Definitely an entity to include
Theories I like, its like the interpretation at a lower level, in the context of the report app it is something for which I am uncertain, but so is the interpretations. However, in terms of guidance for life/movie: Interpretations would be like Target Perspectives, versus perspectives being reviewed. Perhaps this is grouped with something like could be Theories/Targets & Vision. We definitely include interpretations, but maybe include theories too. Discuss.
Symbols 100% include. 
Connections 100% include. 
Communications 100% include. 

I'm thinking analysis appears on the action bar in terms of input so it would have like eye+some other symbol and color associated with the symbol. 
Connection Note: This kind of ties back into the spell system and action system and symbol grid system setup with the 9 buttons and color interchanging features


The organization for the sub views of entities etc from This documentation honestly isnt bad: http://localhost:3341/missions/storylines/4eye-ai-chat 
Where planning, development, and operations are tabs exploring links to other things in the project, a way to visually navigate. The screen has a specific AI Chat but idk if we need this aspect id rather incorporate this as a single button for ai that would send something to the ai chat like vscode does with highlighting code or files. We can implement this functionality later as part of the hud itself and chat

AGI Guidance
Character Creation -> Become who you want
RL Create


# Projects
## Report Integration + Gallery App Integration + Command Center Integration to 4eye Chat & Screens
Goals = Get new entities created, displayed, and managable in the Chat UI w/ screens for Animation Creation, Project Management
Similar to seeding system for code but upgraded to a UI and with the system mentioned above

## Navigation Improvements
Still in the other planning file somewhere we need to get that updated
but also adding in: What if the cards were moved to the arrows and turned into arrows, or color coordinated to link to the arrows? nah link together with the existing symbol but add the arrows for navigating with the card label and a symbol on the map full view screen itself too.

