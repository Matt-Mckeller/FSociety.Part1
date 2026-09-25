
# Prompt ( Suggestion -> Claude Max Mode via Cursor )
Goal: Finding clarity through organization. Easier navigate through existing documentation and find what I'm looking for.
Resource Usage: Utilize max resources to the optimal benefit of best results here. use as much time thinking as needed
Lets make a plan to clean up and organize documentation in this repository. Especially around projects, roadmapping, and direction. Lets have interactive discussion to determine the best way to do this. Ask for clarification before and during the process. Feel free to ask information about each individual document or pieces of information in the documents.

Example Questions
- // todo

Requirements
- Do not lose information without asking, ideally maintain the original format of the text and original wording of the text in this phase. If you believe something should be removed or can be combined lets explore the options together and discuss.
- Do not add exessive detail to documents and create overly long reports. Theres already too much information, keep things concise. 

Suggestions
- Focus on folder organization, combining document combination, and improving directory structure. 
- Improving File names
- Improving Directory Structure
- Improving Folder Organization
- Combining Documents
- Splitting Documents
- Optionally utilizing archiving and moving files to an archive folder rather than completely removing them


Questions to explore
- Folder / Directory Layout and Architecture
- Most important files / top level files

# Areas of concern
## Major concerns
- Business, project, priorities, decision making, roadmapping etc in multiple different locations. i.e. /Users/mm/Projects/Planning/_ORIGINAL_DOCUMENTATION, /Users/mm/Projects/Planning/projects, /Users/mm/Projects/Planning/roadmap
- Priorities stated differently in different areas and many priorities likely outdated
- Expectations for what a business or project is being outdated but still documented in many areas, needing a single point of truth
- Setting priorities for projects and creating a simple easy to view roadmap and list of features for 4eye. 

## Moderate concerns
- Needing to clarify and add distinction between business and projects or apps. Things like marketing automation is sometimes referred to as 4up but actually is like shared code and projects and 4up is the business face. Although even this I'm not 100% certain about because some code won't be shared. Need to figure out how to do this.
- Needing concise details and highlights for things, too much information to take in. Too many projects.
- Outdated documentation that needs updated especially after we apply these updates

## Other concerns
- under utilized strategy folder, weird naming for folder and files in /Users/mm/Projects/Planning/strategy/business_data_all_entities 
- unused files, old unnecessary clutter
- Need to clarify the purpose of this repository and what should be included in here. My thoughts are that this should predominantly be focused on planning related things, priorities, roadmapping, high level documentation, business information, etc. However i do currently also have some other things like an experimental application(s) that i was working with for 4eye at /Users/mm/Projects/Planning/projects/businesses/4eye/4eye_projects/samples may want to move this up and out into another project perhaps an discovery folder or something in /Users/mm/Projects/Discovery

# Roadmap
- Phase 1: This repository / Planning Project located at /Users/mm/Projects/Planning
- Phase 2(OUT OF SCOPE FOR NOW, but we will revisit it): Additional repositories and other projects located at /Users/mm/Projects which will add more detail regarding the current state of projects, existing projects, and other documentation will exist in there
- Phase 3(OUT OF SCOPE FOR NOW): Process & Instruction Improvements


# Q & A
Q1: 4eye and 1 game are separate but with shared code, there will be a gamification framework code that will be shared among businesses, although there may be customization within the framework or on top of the framework for particular businesses. 4up = Marketing automation APP that people can use + service offerings, expanse services = APP that people can use to purchase code and learn, and service/consulting offerings

Q2: Sure, if you think its a good idea but theres a lot of interconection between the businesses. Like we talked about for 4up theres marketing automation tools but this will actually be used by all businesses, likely similar for gamification, and maybe some of the authentication but it depends. still trying to figure out the separation vs generic overlap

Q3: the _ORIGINAL_DOCUMENTATION folder is crucial. It has a ton of very important information and was the original documentation for many of these projects. its one of the primary focuses for what we are organizing and cleaning up and merging into the planning repo


the strategy/business_data_all_entities/ contains crucial information that apply to all of my businesses. 

q4: lets actually move it to projects/planning/discovery for now

q5: option b works

q6: Those files like features, roadmap, marketing etc will get too big too quick. They at least need to be folders with more inside but actually theres a list in this repository somewhere describing a potential template and layout. reference that and use that. See if you can find it, may be related to project management, may have templates associated with it. Lets discuss what you find and incorporate the new structure for this aspect. I do like the /projects organization structure though and separation between the business and projects. We will see if this works. I also like the /roadmap directory. We probably also need to include priorities in there somehow and move the different roadmap details into there somehow, again there may be details regarding the directory structure somewhere but this was before i had a clearer vision regarding /projects

The phased approach needs updated based on the above information but i like clarifying business definitions, and creating business profiles

Users/mm/Projects/Planning/
│
├── README.md (updated - clear entry point)
├── NAVIGATION.md (updated - how to find everything)
│
├── businesses/                          ← NEW: Single source of truth for all businesses
│   ├── README.md                        ← Overview, priorities, God Tier vs others
│   ├── _templates/
│   │   ├── business-overview-template.md
│   │   ├── epic-template.md
│   │   └── feature-template.md
│   │
│   ├── 4eye/                            ← AI-powered learning platform
│   │   ├── README.md                    ← Overview, vision, current status
│   │   ├── goals.md                     ← Business goals & success metrics
│   │   ├── roadmap.md                   ← High-level roadmap & milestones
│   │   ├── product/                     ← Product details
│   │   │   ├── README.md                ← Product overview
│   │   │   ├── epics/                   ← Using full planning structure
│   │   │   │   ├── 01-ai-tutor/
│   │   │   │   │   ├── epic.md
│   │   │   │   │   └── features/
│   │   │   │   │       ├── 01-chat-interface.md
│   │   │   │   │       └── 02-avatar-personality.md
│   │   │   │   ├── 02-visualizations/
│   │   │   │   └── 03-real-time-class/
│   │   │   └── features-index.md        ← Quick reference of all features
│   │   ├── marketing/
│   │   │   ├── README.md                ← Marketing overview
│   │   │   ├── target-audiences.md
│   │   │   ├── channels.md
│   │   │   ├── content-strategy.md
│   │   │   └── go-to-market.md
│   │   ├── business/
│   │   │   ├── README.md
│   │   │   ├── business-model.md
│   │   │   ├── monetization.md
│   │   │   ├── competitive-analysis.md
│   │   │   └── risks.md
│   │   ├── technical/
│   │   │   ├── README.md
│   │   │   ├── architecture.md
│   │   │   ├── tech-stack.md
│   │   │   └── infrastructure.md
│   │   └── decisions/                   ← 4eye-specific decisions
│   │       └── decision-log.md
│   │
│   ├── 1game/                           ← Gamification for education (separate from 4eye)
│   │   ├── README.md
│   │   ├── goals.md
│   │   ├── roadmap.md
│   │   ├── product/
│   │   ├── marketing/
│   │   ├── business/
│   │   ├── technical/
│   │   └── decisions/
│   │
│   ├── expanse-work/                    ← Gamification for work
│   │   └── [same structure as above]
│   │
│   ├── 4up/                             ← Marketing automation app + services
│   │   └── [same structure]
│   │
│   └── expanse-services/                ← Code marketplace + consulting
│       └── [same structure]
│
├── projects/                            ← Shared infrastructure & tech projects
│   ├── README.md                        ← What goes here vs businesses/
│   ├── _templates/                      ← Using execution templates
│   │   ├── project-overview-template.md
│   │   ├── project-tasks-template.md
│   │   ├── project-status-template.md
│   │   └── project-decisions-template.md
│   │
│   ├── shared-infrastructure/           ← Cross-business tech
│   │   ├── authentication/
│   │   │   ├── overview.md
│   │   │   ├── tasks.md
│   │   │   ├── status.md
│   │   │   └── decisions.md
│   │   ├── ai-agents/
│   │   ├── asset-marketplace/
│   │   └── user-profiles/
│   │
│   ├── marketing-automation/            ← The tech that powers 4up
│   │   ├── overview.md
│   │   ├── tasks.md
│   │   ├── status.md
│   │   └── decisions.md
│   │
│   ├── gamification-engine/             ← Shared by 4eye, 1game, expanse-work
│   │   ├── overview.md
│   │   ├── architecture.md
│   │   └── customization-guide.md       ← How each business customizes it
│   │
│   ├── discovery/                       ← Experimental & POC work
│   │   ├── README.md
│   │   └── 4eye-samples/                ← Moved from businesses/4eye/4eye_projects/samples/
│   │       └── [317 files moved here]
│   │
│   └── archived/                        ← Old/completed projects
│
├── roadmap/                             ← Keep existing structure, enhance
│   ├── README.md
│   ├── primary-roadmap.md               ← MASTER roadmap (enhanced)
│   ├── priorities.md                    ← NEW: Current priorities across all businesses
│   ├── VISION.md                        ← Keep (enhanced with clearer goals)
│   ├── business-priorities.md           ← NEW: God Tier vs others, interconnections
│   ├── 2025/                            ← Keep existing time-based structure
│   │   └── [existing structure]
│   ├── 2026/
│   └── _templates/                      ← Keep existing templates
│
├── strategy/                            ← Strategic foundation
│   ├── README.md                        ← Clarify purpose
│   ├── vision-and-values.md             ← High-level vision (from roadmap/VISION.md)
│   ├── success-metrics.md               ← How you measure success
│   ├── brand-and-design-system/         ← RENAMED from business_data_all_entities
│   │   ├── README.md
│   │   ├── PURPOSE_AND_GOALS.md
│   │   ├── MATTHEW_DATA.md
│   │   ├── PURPOSE_DATA.md
│   │   ├── DESIGN_DATA.md
│   │   ├── SOFTWARE_DATA.md
│   │   └── examples/
│   └── business-strategy/               ← NEW: Cross-business strategy
│       ├── umbrella-strategy.md         ← How businesses connect
│       ├── shared-resources.md
│       └── synergies.md
│
├── execution/                           ← Keep as-is (active work tracking)
│   ├── README.md
│   ├── active-projects/
│   ├── backlog.md
│   └── blocked.md
│
├── _ARCHIVE/                            ← NEW: Organized archive
│   ├── README.md                        ← What's here and why
│   ├── original-documentation/          ← Moved from _ORIGINAL_DOCUMENTATION
│   │   ├── README.md                    ← Index of what was extracted where
│   │   ├── extraction-log.md            ← Track what was moved to new structure
│   │   ├── expanse-services-docs/       ← Keep as reference
│   │   ├── ExpanseEduDocs/              ← Keep as reference
│   │   └── self-docs/                   ← Keep as reference
│   ├── old-planning-attempts/           ← Move previous cleanup attempts
│   │   └── PlanMergingAndCleanup_Phase1/
│   └── outdated-files/                  ← Files identified as outdated
│
├── alignment/                           ← Keep existing structure
├── reflection/                          ← Keep existing structure
├── journal/                             ← Keep existing structure
├── dashboards/                          ← Keep existing structure
├── marketing/                           ← Keep? Or move to businesses/?
├── money/                               ← Keep existing
└── scripts/   

re:
Updated directory structure looks better, but the projects folder will need a similar nested structure to support growth. 

I like marketing being separate

there may be other shared infrastructure and pieces such as the ui components, lotties, themes, logging, etc. theres other mentions of it as you go through 

document this plan in markdown files before we begin

Q1: looks good
q2: 4eye
q3: c

q4 timelines are unlikely to be accurate tbh

q5 start after the documenting of this plan in a markdown file



Additional add on: need to stop for each business and review the goals document before producing other docs

Also note that i have an architecture docuemtn started at /Users/mm/Projects/Planning/user/technology-and-architecture/architecture-and-technology-foundations.md