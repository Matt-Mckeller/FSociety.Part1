

// Test longer inputs

# CDN & Okay'ed Technologies

# Visualization examples? Visualization Framework?
- Todo figure out which types of visualizations and how to handle this, probably don't need to do all of this myself yet, but need a way to filter and allow specific types, especially the most important ones, tbh they probably already exist somewhere else too?
- The visualizations being pre-generated may actually be a better idea? Then I can make sure they work and just provide data in a query string, but that may not be secure? but i could protect it behind a code
- Option: Pass an api key into prebuilt components  with custom settings for visualizations, url query param, have the components grab data from a token

// with additional context added from ai
// determine the starting and stopping points and whether its a 
// good time to generate a visualization or not
// determine intent of the speaker at various points in the dialog
// determine specific speakers at various points in the dialog

// add test cases to the prompt generation to be returned which should be tested for?
// instruct the model to format the text appropriately for learning ( although we need newlines etc too, so figureout the best way for this )

// Probably utilize context  in the planning 
// will need somewhere to execute the generation code with pre-installed dependencies, wait no i won't i'll use cdn
// probably can have the ai generate the html for it actually, but i need to place the html file somewhere
// probably can also have the visualization response include the context it needs

// eventually will want other optimizations but w.e.

// Handle internationaliation / different languages, input language and output language

// prioritize accuracy of details
// make sure the code is accessible
// generate instructions to be included with generation commands
// list of acceptible or preferred libraries to use for generation, only trustworthy sources

// Testing
    // Run playwright against the html file url to make sure it works as expected

// Prompt Summarization / visualization prompt
//   Wait for teacher to finish, find the appropriate time, 
//      or wait until theres an expected few seconds left to start generating and then wait to send
//   to generate the visualization prompt


// Question
    // Can i determine sentiment and tone from audio? how can i determine this?
    // Can i determine engagement level from audio? how can i determine this?
    // Can i determine confusion level from audio? how can i determine this?
    // Can i determine boredom level from audio? how can i determine this?
    // Can i determine excitement level from audio? how can i determine this?
    // Can i determine frustration level from audio? how can i determine this?
    // Can i determine curiosity level from audio? how can i determine this?
    // Can i determine interest level from audio? how can i determine this?
    // What else can i determine from audio, and where do i get it from / how much does it cost


// add flags for inappropriate behavior being detected and the severity of these behaviors such as fighting


// autonomously test the app and improve it 




Also potential to include gamification scripts for tracking interactivity with the content

Additional improvements from 
- teacher table of contents / lesson rubrics


# context improvements for prompt
    /** 
     * Optional contextual information that helps the visualization AI understand
     * the broader educational context, student needs, and surrounding content.
     * This ensures generated visualizations are maximally relevant and effective.
     */
    promptContext?: {
      /** Age/grade level of target audience for appropriate complexity */
      targetAudienceLevel?: string;
      
      /** Previous topics covered that this builds upon */
      priorContext?: string;
      
      /** Upcoming topics this prepares students for */
      futureContext?: string;
      
      /** Common student misconceptions to address through visualization */
      commonMisconceptions?: string[];
      
      /** Specific learning objectives this visualization should support */
      learningObjectives?: string[];
      
      /** Additional constraints or requirements for the visualization */
      constraints?: string;
    };


# Exploration ideas
- Specific size for the generated visualization outputs from prompts? 
-  A preview of the visualization should be displayed in the dashboard?
- Improvements for visualization display?
- **Prompt Learning** Display the prompt used to generate the component in the ui to teach kids
- **Display AI Data** Display optional data related to confidence of interpreted transcriptions, quality of data being presented, etc so they can further learn ai ( maybe later, maybe distracting, maybe only sometimes? )
- **likely high value scholarships/expanse diplomas** Advertising scholarships / expanse diplomas and character profiles etc ( although idk timing yet )
- **high value probably, experience tracking** Tracking how much a student explores / interacts & utilizing this as incentive towards more experience and more rewards and character leveling and scholarships and engagement reports and expanse scholarships ( although idk timing yet )
- **teach the ai** to help learn, ai will ask questions, etc. Can be a joint chat room
- **joint questions** -> what do you want to learn, group submission, surface most desired

# Marketing prompt
- AI Agent using the app targeted towards goals, records itself, has an avatar and voice. Used as marketing content

# Note: Expanse EDU
- Likely going to merge gamification ideas and roadmap from expanse edu into 4eye, can probably get going real fucking quick too.