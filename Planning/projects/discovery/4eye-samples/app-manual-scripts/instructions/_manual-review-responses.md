Make a plan for the following:

Goal: Be able to easily view and interpret the response data from outputted json described as GEMINI_OUTPUT in a response data dashbaord where I can see all of the summarization, metadata, recommendations etc. 
Goal: Be able to easily view and see the visualizations from outputted json described as GEMINI_OUTPUT in a visualization dashboard and how they are used. 
Goal: To see the effectiveness of generating visualizations and uncover any problems in this process.
Goal: I want to assess the potential for the project (/Users/mm/Projects/Planning/projects/businesses/4eye/4eye_Edu.md) to work


Requirements
- Be able to easily see and understand every value from the GEMINI_OUTPUT effectively
- Generate code based on the returned recommended prompt responses in GEMINI_OUTPUT's Visualization section. The generated results should be stored in a separate html file and displayed in an iframe. Follow code generation instructions defined in CODE_GEN_INSTRUCTIONS. All visualizations should be generated as html pages utilizing components and packages then displayed as iframes in this visualization dashboard. Also including a link to the html file for full screen viewing.
An example of this includes: 
```json {

        "effectiveness": "very_high",
        "relativeEffectivenessWeight": 1,
        "recommendedToDisplay": true,
        "comparativeValueToOtherSuggestions": 1,
        "coreType": "MERMAID_FLOWCHART",
        "otherCoreType": null,
        "secondaryTypes": [
          "ANNOTATED_TEXT"
        ],
        "title": "From Protest to War: A Cause-and-Effect Flowchart",
        "reasonForSuggestion": "This content is a perfect example of a causal chain. A flowchart will visually reinforce the step-by-step escalation, making the logical progression from a single protest to the start of a war clear and easy to remember for students.",
        "promptForGeneration": "Create a vertical Mermaid flowchart for a 10th-grade history class illustrating the path from the Boston Tea Party to the start of the Revolution. Use the 'graph TD' syntax. Start with a node A[\"Protest: Boston Tea Party (Dec 1773)\"]. Connect it to B[\"British Response: Intolerable Acts (1774)\"]. From B, create an arrow to a subgraph labeled 'Key Punishments' containing two parallel nodes: B1[\"Boston Harbor Closed\"] and B2[\"Town Meetings Restricted\"]. Connect the subgraph to C[\"Colonial Reaction: Unification\"]. Connect C to D[\"Action: First Continental Congress (Sep 1774)\"]. Connect D to E[\"Outcome: Boycott & Military Prep\"]. Finally, connect E to F[\"Result: Battles of Lexington & Concord (April 1775)\"]. Style the nodes: Protest in blue, British Response in red, and Colonial Reaction/Outcome in green. Use clear, concise text for each node."
      }
```
The full type for this output can be found at AI_RESPONSE_TYPES

also when generating the suggested visualizations utilize the instructions here

GEMINI_OUTPUT=/Users/mm/Projects/Planning/projects/businesses/4eye/4eye_projects/samples/app-manual-scripts/output/gemini

CODE_GEN_INSTRUCTIONS=/Users/mm/Projects/Planning/projects/businesses/4eye/4eye_projects/samples/app-manual-scripts/instructions/instructions-visualization-code-gen.md

AI_RESPONSE_TYPES=/Users/mm/Projects/Planning/projects/businesses/4eye/4eye_projects/samples/app-manual-scripts/types/outputs.ts

OUTPUT_FOLDER=/Users/mm/Projects/Planning/projects/businesses/4eye/4eye_projects/samples/app-manual-scripts/output/gemini/dashboard

# Priorities
- Always prioritize accuracy of information
- Always test to make sure it works

# Testing
Autonomously test and make sure everything is working as expected

# Scope
- Generate every visualization for every suggeste dprompt in GEMINI_OUTPUT json files
- Generate visualizations for all with recommendedToDisplay: true and recommendedToDisplay: false but make it apparent which ones were true or false in the dashboard

# Performance
- Pagination & Lazy loading

# output locations
- Put the dashboard and generated visualizations in the OUTPUT_FOLDER

Any questions or concerns?
Suggestions for better options in terms of how to display the visualizations as embedded in the dashboard?
