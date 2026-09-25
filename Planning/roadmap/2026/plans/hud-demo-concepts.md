working on the HUD and storybook components, building the foundation for multiple apps

Now, we need some way to deal with the container changing shape and moving around the ui when the bar expands in size, what options do we have? I see from the original Game/Components/ProfileStatusDisplay that we had Expandable Horizontal left and right, this seemed to work well. Also the Horizontal I like. We may want a version of this that is 1 small bar 1 large bar 1 small bar but otherwise keep the ascending stairs version with the largest bar on the bottom smallest on the top formatted right and the expandable horizontal left and right, prefering expanding right. They should maintain being SVGs so that they also work on mobile. 


Also, currently the containers are setup to be Profile Bar, Currency Bar, Experience Bar, but I want them to be more generic and able to be used for a variety of things. Including having multiple slots within the bar for displaying different things. i.e. within the currency bar we may want multiple currencies.

I still do want to see this implementation example.


# Goals
Further Iterate on the hud demo solidifying our concepts and preparing them for use for our website(s) and app page(s). 

I want to finalize at least 1 version but we probably will have at least 3 seperate versions depending on what we are doing etc, with a lot of overlap.

# Strategic Objectives
Organize and set up for modular support for a variety of directions while prioritizing getting usable components and hud for Presentations and Web (which in my view will be very similar things in the future).

# Details
Lets make a copy of the complete hud demo. We are going to work on this as the primary focus for a bit. 

# For all of these views:
Add minimap and minimap toggle button

Move the action buttons to the bottom middle where the current grid editing button is

Make a ui element above the minimap and next to the minimap button on the right side that has the grid view / standard layout view buttons. And improve the standard layout view button to look more like a standard layout button. Idk what the pin does right now but also put the light/dark mode on this action panel as well. Add an additional button that is the zoom and accessibility based actions

Also, add buttons and components for pulling up the view modes. We will have multiple view modes. Ways to view the content at different reading levels. And add buttons/auto notification suggestion alert buttons for being able to show interactive learning with the viewed content towards the users defined goals and other things. These should be components

I will want the 4eye status bar on the UI somehow, 

I really like the current header but also still need to incorporate the 4eye status bar, and somewhere / somehow the 4eye pushing progress bar, and the 4eye Chat Icon, although it may be slightly too saturated by default so we can bring it to live on hover and interactivity. I was also thinking that when the user gains a large amount of experience or something the 4eye character can pop out and push the progress bar from the logo but this might be distracting the user from their main task so we probably won't do this. Perhaps this is on experience hover or something. And maybe even 4eye pushing it isnt necessary but yeah. Something to experiment with and consider for the layout.

We will want a backpack icon and inventory page. 

And we will add rewards from interactions.

I want a page navigator like from the symbol-grid project that allows the user to explore a full list of the pages, probably adding in some additional navigation tools.

I also want a full screen navigator, full screen version of minimap for each site, how it looks may differ, instead of having a header we have an entire page of nav links, and more space and room for organization etc. But, also lists are op, so even this probably has list view and grid view. Color based support is also pretty cool. 

See special pages button from symbol grid, I definitely want this sort of example in storybook, and as a reusable component. 

Add language selection action button

Add an action bar for real time speech to text.
    One of the buttons on this should be a language selection for real time translation from and to

Organize view types for content together in the repository and have a secondary viewing area in storybook



# More ideas
Perhaps the status bar components are in the header, but they are in the smaller state where only the first version is displayed. Perhaps theres multiple sets. On interaction the bar expands.

Additional possibilities
On interaction with the top bar it drops down and displays another panel below it, maybe one larger square panel, maybe multiple panels, they align with the top panel at the sides and form different grid layouts.

Additional note, I like the "disabled state" as the sort of default styling. but likely improving the clipping of the center bar to the outside borders of the pill shape.

Also add spellbook screens with action buttons for transforming the content into different things, and different learning modalities. i.e. transform content into something visual 

Other actions that are like assess this content for quality and trustworthiness

And then have a suggested actions notification button similar to the other suggested notification button but different. This will suggest spells and sort spells by recommended.

For the primary spell / action orbs I want to see multiple layout options for this section of the page. i.e. some smaller some larger orbs, different counts, although most likely we stick with 4. And, I want to see a way of having a left side and right side or something a way to distinguish between actions that always exist and actions that change, maybe just a simple divider in the middle or other options you have

I like the concept of an action bar sliding in and out of another action bar


# Other notes

We can split this into multiple prompts and plans. I want them documented cleanly, organized, and i do not want my ideas lost or changed without specifically asking and clarifying

Similar styles may be used for glasses and vr headset integrations but is not the primary focus yet, will have to try glasses first before we get to this, but neuralink most likely yes

