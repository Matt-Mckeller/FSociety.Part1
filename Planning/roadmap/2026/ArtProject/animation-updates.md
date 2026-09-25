# Art Variations
2d & 3d Variations
Shape Variations


# Shapes
## Standard: Square, Triangle, Circle, Diamond
### Expanding Dual View
One Shape -> Bigger Shape
Configurable:
    Shape
    Location/Positioning
    Size Increase
    Outlines or Solids ( First & Second Shape )
Preconfigured Animations with
    Interactivity Type ( Scroll, Hover, Click )
## Expanding Bar
## Expanding Border

### Expanding Inversion
## 

# Icons

# Logo
## Logo Storybook
## Logo Variations

# Logo Transformations 

# Pushing Progress
## Goals
Remove 3 glitch from leg, although I kind of like it as a configurable feature
Add teleport animations
Improve Storybook UI for Interacting with the Component
Optionally adding dynamic displays for the stages of the animation timeline, and features by animation as a whole + section of the animation
Improve Animation for when the experience does not go to 100% Completion, i.e. 30% to 50%. The Character should pause briefly then teleport back to the start ( we will add intro and exit teleport animations as well ).
All in one UI screen for interacting with configurable settings, preset options for previewing
Improved view of the arm and leg movement in the celebration stage of the animation. Keeping the Diamond shape in the air
Keeping the effort Push as the default setting, and the forward lean active setting. Keeping the setting for oscilatting hands but not having it as the default

## Pushing Progress Reset


# Character
## Teleportation Entry Animation
## Teleportation Exit Animation

# Level Up Animation
# Halo
# Ground Portal Animation
# Ground Portal Animation


# Logo V5
Lets make a copy of the expanse logo v4 and update it to version 5. Lets make a plan, discuss, spend time thinking, get it perfect. 
I want to keep the features and everything from the current logo v4.

Here are the details:
I want the components of the logo to have improved organization and be configurable and modular themselves.
    For Example:
        I want better utilization of React Components and the file(s) so that the code is easier to read rather than just using svg elements move the svg elements into React Components with improved naming. I.e. 
            The Main Shape Component would be a shape component.
                It would have options for Orbital Rings ( that would be its own component, and multiple settings for different types )
            The smaller shape would be another version of the main shape component.
            The Arcs would be a Border Component. This would have multiple options too such as what angles the gaps are at, the number of gaps, the shape which the border traces. Also, perhaps we could combine the expanding concept for the rings from the expanding border box. 
            

        There are some problems with the storybook for the logo that need fixed: 
            I like the interactive playground but the interaction pieces aren't working as expected there and it could benefit from improved layout and organization. I.e. nothing happens when i hover over the logo on the interactive playground but it does work in the default storybook. These are the main 2 stories but I do like some example previews of different states of the logo as well. 

            I'd also like to add adjustable positioning for the start and end points of the rings, and adjustable angles for the position of the smaller shape and main shape.

        There are some problems with the logo that need fixed: The opacity options for the orbital rings are not working optimally. The max opacity of the orbital rings right now still is kind of hard to see, i'd like more control although I do like the current view sometimes.

        I want an additional option for the logo external rings to be shaped kind of like a comet, but curved and simple and softer lines. Rather than the curved somewhat boxy path element they currently are. 
        
        I want the border rings to also be able to be transformed into a halo shape and/or portal shape with some sort of 3d transformation state. These would be placed either above the characters head to look like a halo, or below the characters feet as a portal, or infront of the character as a portal. 

        I want presets for these

        I want a context and setting system that we will eventually hook up to a backend for controlling default states of the art etc.

        I want these components to have 2d and 3d togglable displays variants.

        I want these components to have animation options. I.e. the halo/portal could spin

        I want these components to have preset variants ( i.e. Halo, GroundPortal, CeilingPortal, ForwardFacing Portal, Backward Facing Portal )

        Question/concern
        The Coin Icon is a combination of the main shape and the border but with added additions. I do want it to also be able to utilize the different shapes, but would it be a good idea to reference the same main shape components etc? And should we combine this 3d transformation style functionality into the shape or is this enough to be kept seperate? I'd say it should probably be seperate but idk

# Coins

# Light & Darkness
I want the sun to be a circle with multiple arcs. 

I want the moon to be the same as the sun but with the arcs having a greatly reduced width and for the moon to be appearing over the front of the sun like an eclipse

# Core Shapes
Also usable for things like the theme color swatch, and can be updated.
Interactive with click to change settings for which shape is used where.

        