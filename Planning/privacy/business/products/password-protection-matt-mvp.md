# Overview
## Description
Information related to the password enclosure project which was initially just meant to be a setup for me to securely setup my computer, wifi, router, server, home automation, etc but expanded into some other things and a lot of learning. Multiple potential products exist within here and multiple potential expansions/variations and an entire business could potentially be built related to this.

## Products Specified Within This Document
- Structure Components(s) 
    - [CeilingBlock, WallBlock, FloorBlock, Door] ( Mvp )
    - [VentBlock, LightBlock, PowerBlock, WindowBlock] ( Mvp )
    - [Vents, Lights, PowerOutlet, Battery, PowerFilter] (Future)
- Projects
    Password Enclosure

# Other Todos
- Lets update these things to variables with descriptions like thickness, width, height, materials, layer stacking and figure out the data
- How to handle the doorway and the door -> 
    - worried about it pulling blocks apart when opening curtain, and it needs to completely close every time, and does it need specific blocks? extensions to the outside of the doorway? Or what? 2 Layers of Magnets? Metal instead of 2 magnets? Metal on the Curtain? Bendable metal? 
- Determine if ordering custom sized foam is an option and then just avoid the process for cutting all together
- determine optimal process for wrapping and getting things to smoothly fit together and not be wrinkled and to stay stuck together
- Organize information -> Readme with document descriptions/directory structure info
- Determine if custom size can be ordered for faraday cloth ( -> blanket )
    -> Alternative: combine?
- Do i need a second layer and/or an air gap for the thermal layer ( aluminum ? ), had a note about needing it for mylar
- Determine optimal magnet shape/length for given layout
    - Note that we can add plates behind teh magnet to improve resistance for the foam
- Assess if theres a risk of the magnet spinning in place which would cause problems with the connectivitiy

## Purchase List
- *Cutting Tool* Assuming some lazer cutter ( alternative: order custom sized foam cuts and wait on delivery ) if possible
- *Glue* if needed

# Design Detail: Ceiling Weight vs Wall Weight
- Ceiling weight probably more important to have be lighter and even stronger, heavier magnets on the walls is likely ok. Also potentially counter balanced weight against the felt on outside of wall blocks
- Quality Representation / Design Representation :|

## Mass Load Vinyl
Todo: add to layer stack as optional

# Additional Documentation / References
See `../business.md` for additional details regarding higher level business information that this project may expand into or started to expand into
See `./risks.md` for risks
See `./goals.md` for goals
See `./research/*` for relevant information about a variety of related topics
See `./patents.md` for details regarding patents and potential patents for the products listed here
See `./roadmap_password_enclosure.md` for some high level roadmapping
See `./FORMULA_RESEARCH_MASTER.md` for comprehensive formula research covering magnetic forces, EMF shielding, structural mechanics, foam properties, acoustic shielding, thermal insulation, and connection strength - **required reading before designing type system**

See `./variants-and-experiments.md` this actually will likely be merged into whatever structure I determine to use here

# Concepts
## Data
- Todo, create types? Or unnecessary

## Components
## Products
## Versions/Configuration
## Formulas
## Art
## Inventory/Stock
- ?
## Components
### Connectors
#### Magnets
- Polarization:
- Weight:
- Strength: 
- Size: 
- Type: Ceramic | Magnetic | Electric

### Materials
#### Structural Foam
Foamular Ignition temperature: ~600-700°F
Foamular is A class or class 1 fire rating, foamular safe for electrical use, floral foam not safe for electrical use 
Foamular may start to sink in on roof if container is too big but 5x3x3 is probably good 

#### Mass Load Vinyl
Requirement: Prevent sound from leaving the enclosure ( at least to the degree needed for protecting passwords and being able to reconstruct sound for vision )
- Need to research and determine the thickness needd, probably don't need full strength vinyl for the intended design of mvp, honestly probably don't need it at all actually
- And it adds $, can definitely use this for the tiers
- Can probably be added after, does not need to be an initial part of mvp, but do need to consider weight support

#### Acoustic Foam
Requirement: Improve Internal noise reflection
Note: Can attach with magnets

## Protection
## Threats
## Structure
## Connecting
## Modular
## Blanket
## Detection / Log
- Alert tool, detect EM, can connect to keyed entry
## Door
### Design Considerations

### Door Variations
- Rollable with the little metal balls, garage door style
- Hinges
- Cloth/Curtain
- Sliding Up / Handles
- Locking
- Keyed / Passcode Entry
- Handles ( Vault Style )
- Depends on $

### Material
- Can actually be different than I was thinking
    - Interlocking pieces

### Risks/Design Considerations
- Opening outward = shear force
- Opening up = ux issue
- Needs to be able to successfully close as expected
- Needs to not get stuck
- Needs flush connection

### Close/Open Options/Mechanisms
- Magnets Primary strategy most likely
- Zippers?
- Wires?
- Two sided?
- Pull handles
- Wire Pulls

# MVP Selection ( Standard )
- Magnet Type: Neodymium

# Process

## Buying The Material
- Amazon for some
- Magnets need to be consistent and likely precise. Probably should order from a factory, they also need to have the appropriate polarization.
- Item List:

## Cutting The Material ( For Injection, [?And Shape], may not be needed, may order foam to size )
Best Option: Wire Cutter, Probably faster and better shape
    Concern: May not work because the foam is resistant to heat?...
-> Utility knife or saw does work though

Partial Cuts maybe sufficient

Cuts are near the end of the foam, needs to be very straight

Wondering if the Foamular makes a mess when its cut 
    -> Use hot wire cutter instead of a saw 


## Injecting Components
Goal: Be able to place magnets optimally in blocks
Ideal Requirements:
- Exact Size/Shape for the placement of the inserted Item
- Exact Depth for the placement of the inserted item
- Must be optimal temperature to melt the foam but not ignite it, so >240 degrees < 500 degrees farenheight
- Must Be applied at exact spacing on the foam
- Should not rely on human precision
- Must be able to support at least 2 inch thick foam
- Assumed depth of punched burn hole is unknown presumably < .5 inches

Question: Magnet rolling or changing position? Do we want to prevent this? Is it possible to prevent? If it was cylindrical would rolling actually be ok? Do we need to add the requirement that the magnet can not roll its position?

MVP Scope
- Human precision ok

### Injecting Magnets
Mvp strategy: Cut edges, burn small hole, glue edges back on, do it myself
Mid term strategy: Manual Labor @ Factory
Optimal Strategy: Get the foam custom poured/made with magnets injected from the very start, but would this require a custom factory etc or is there something existing that does this?

Alternative Strategies: Injecting magnets from a side drill hole

#### Glueing the block back together
Glue: TBD, recommended PL300 Foam Board Adhesive ? Or some spray would be ideal, will have to research

*Requirements* ( Mvp )
- Glue strength must not pull off with multiple magnets pulling against it, immediately nor over time
    - e6000 is super strong, like probably way overboard 
    - 3m hi strength 90 may work?
    - Was stated: Foam will tear first ~50-100 lbs Foam fails before glue
- Magnet must not be able to tear through the material
- Must keep the material perfectly flat in order to perfectly align with other magnets
- Based on the connectivity requirements we probably need to have each tile wrapped due to magnet placement requirements needing to be on the 
- Tiles must maintain perfect size shape, glue should not change the shape of the tiles ( i.e. it should not expand and push the added border outwards )
- The glue should work with both utilized materials
- Glue temperature, should at least support typical temperatures in buildings even those without ac

#### Attaching Material Layers
Tool(s): Staples/Spray Glue
Strategy Option: Every Layer or Each Layer By Itself


#### Notes
- May want to burn a place for it, although does it burn?
    - Melts at 240 degrees, hot wire cutters do work, but does not ignite until 600-700 degrees
    - Hot wire cutters are specifically designed for XPS foam like Foamular.
- Heated Punch? 
    - Heated metal punch/brand works great. Heat to ~400-500°F and press into foam.
    - Needs to be exact to size, should not rely on human precision
    - There exists a dewalt tool for heating something to a specific temperature, but i'd prefer all in one
- Wood burning tool?
- Arduino controlled heated punch? I don't particularly want to deal with this at this moment but would be nice 

Other Things to include
- Fire extinguisher (safety!)

## Wrapping Blocks
Mvp Strategy: ?
Mid Term Strategy: ?
Optimal Strategy: ?

## Have
*Note* Can return or swap out items as needed if better options exist and theres reason
- Foam Insulation 8x4x0.5 (@https://www.homedepot.com/p/Owens-Corning-FOAMULAR-1-2-in-x-4-ft-x-8-ft-R-3-Square-Edge-Rigid-Foam-Board-Insulation-Sheathing-36L/100320356  3x)
    - Q: Air gap?
- Faraday Material Cloth ( 5x @https://www.amazon.com/dp/B0D8J7WCWP?ref=ppx_yo2ov_dt_b_fed_asin_title 43x130 )
- Mylar blankets ( 6 @ 55x82 @https://www.amazon.com/dp/B0CXHLFV67?ref=ppx_yo2ov_dt_b_fed_asin_title  )
- Duct Tape
- Some magnets

# Current vision for product/mvp 11/8/8:30pm

Detail:
Terahertz (THz) Imaging
What It Is:
Between microwave and infrared (0.1 - 10 THz)
May not be blocked? Thz is like 100-10000 ghz but requires close proximity ( meters ), or may be blocked by aluminum?

WIP: Thermal protection material gap needs, transparency into container or not, flooring / ability to stand, best options for wall support ( assumed to be velcro+command strips)
    (Transparency op1) Magnets could go on outside, foam on inside complete coverage of container, container sealed shut
    (Transparency op2) Velcro ( or some other method ) the foam into container so that it can be removed 
    Vision with thermal unlikely because it would have to be straight on, angles wouldnt really work
    - Magnetic acoustic foam attachment, alternative: velcro, magnets best

# Product
## Descriptions
Modular, lego style building blocks offering defense against observation from Thermal, Sound, and most forms of Light, Electromagnetic Waves. ( Excludes Ultra High Frequency Super Short Range variations such as XRay, but may include THz blocking, todo: add specific frequencies protected )

Product may have multiple variations depending on the audience

## Versions
- Self MVP Version for personal use
    - Not as worried about requirements for fan, not as concerned about safety but still concerned. 
    - Still aims to meet goals defined above
    - Can utilize existing previously purchased materials or buy new materials
    - Experimental but would be nice if I could use it as a proof of concept if I can get this to be something that is sellable and marketable. Primary intent is for me to have a safe password entry space to begin setup of my home observation system and server etc though.
    - Size is expected to be 5ft x 3ft x 3ft
- Sellable Version(s)
    - Can start completely fresh if needed

## Material Layer Stack ( Wall, Ceiling )
*External Attachment*
- Art Panels
- Acoustic Foam
*Outside to Inside*
[ Start of exterior barrier block ]
- Faraday Fabric
- Adhesive Spray
- Aluminum Foil
- Adhesive Spray
- (Optional) Mu Metal Foil
- Structural Foam
- (Optional)[inverse side of wraps: Mu Metal Foil]
- Adhesive Spray
- [inverse side of wraps: Aluminum Foil]
- Adhesive Spray
- [inverse side of wraps: Faraday Fabric]
- (Optional) MU Metal
- (Optional) Sound Proof Vinyl: Mass-Loaded Vinyl -> Soundproof ( .5-2lb/sqft? )
- (Optional) [Frame/structural support?]
[End of Exterior Block]
- Detached Acoustic Foam 
    - ( Optional Zip ) ?
    - Optional velcro attachment

## Material Layer Stack ( Floor )
Standard material layer stack with 1.5" Insulation foam and .5" eva foam or similar laid on top of it

## Magnet Types
### Default Magnet Type 1
- **Product**: B338 Neodymium Bar Magnet
- **Dimensions**: 3/16" × 3/16" × 1/2" (0.188" × 0.188" × 0.5")
- **Metric Dimensions**: 4.76mm × 4.76mm × 12.7mm
- **Material**: Neodymium (NdFeb)
- **Grade**: N42
- **Magnetization**: Through Thickness (magnetized through the 1/2" length)
- **Pull Force (Case 1)**: 2.78 lb (1.26 kg)
- **Pull Force (Case 2)**: 2.86 lb (1.3 kg)
- **Surface Field**: 6,457 Gauss
- **BH Max**: 42 MGOe
- **Br Max**: 13,200 Gauss
- **Max Operating Temp**: 176°F (80°C)
- **Coating**: Nickel-Copper-Nickel (Ni-Cu-Ni)
- **Weight**: 0.0339 oz (0.96 g)
- **Tolerances**: ±0.004" (±0.1mm)
- **Color**: Silver
- **Cost**: $0.97 each (1-24 qty), volume discounts available
- **Source**: https://www.kjmagnetics.com/b338-neodymium-block-magnet
- **Note**: Magnet type (Neodymium vs Ceramic) still being evaluated for cost optimization

## Layout Types
### Enclosure Layout Type 1
*Description*: Aimed at being a modular structure with varying lengths/widths but typically square/rectangular. 
*Details*: 
    - Blocks are 1' x 1' with 2" foam. 
    - Corners are filled with 2" x 2" smaller blocks.
    - Walls sit on the outside of the floor and ceiling.
    - Single Entryway, door is attached to an opening in blocks of one of the walls. Door type can be interchanged, can either be cloth/curtain style or one of the door options

### Block Layout Wall Type Standard A: 1' × 1' × 2" (Standard Wall/Ceiling Block)

#### Block Dimensions
- **Length**: 12" (face dimension)
- **Width**: 12" (face dimension)  
- **Depth/Thickness**: 2" (foam depth)
- **Shape**: Square block, modular building piece for walls and ceiling

#### Magnet Specifications
- **Magnet Type**: See Default Magnet Type 1 (3/16" × 3/16" × 1/2")
- **Magnet Count**: 8 total (4 per face)
- **Magnet Location**: One at each corner, 1/16" from all edges
- **Magnet Orientation**: 1/2" length pierces THROUGH the 2" foam depth (perpendicular to face)
- **Polarization Pattern**: Checkerboard arrangement ensures proper corner-to-corner attraction

#### Block Magnet Layout Diagrams

**Front Block Face (Looking straight at 12" × 12" Block):**
```
                               ↑
                        12" (Top Edge)
         1/16" From Edge            1/16" From Edge
                  ↓                         ↓
1/16" From Edge ┌─────────────────────────────┐  
        →       │                             │
                │  ●                       ●  │  ● = Magnet position
                │ (N)                     (S) │      (showing polarity)
                │ Top-left-front              |
                │                             │
       12"      │                             │        12"
  ← Left Edge   │                             │  → Right Edge
                │                             │
                │  ●                       ●  │
                │ (S)                     (N) │
                │          Bottom-right-front │
        →       │                             │ 
1/16" From Edge └─────────────────────────────┘
                 
                      12" (Bottom Edge)
                               ↓
```

**Back Block Face (Looking straight at 12" × 12" Block):**
```
                               ↑
                        12" (Top Edge)
         1/16" From Edge            1/16" From Edge
                  ↓                         ↓
1/16" From Edge ┌─────────────────────────────┐  
        →       │                             │
                │  ●                       ●  │  ● = Magnet position
                │ (N)                     (S) │      (showing polarity)
                │ Top-left-back               |
                │                             │
       12"      │                             │        12"
  ← Left Edge   │                             │  → Right Edge
                │                             │
                │  ●                       ●  │
                │ (S)                     (N) │
                │          Bottom-right-back  │
        →       │                             │ 
1/16" From Edge └─────────────────────────────┘
                 
                      12" (Bottom Edge)
                               ↓
```

**Left Side View - Magnet Orientation (Looking at block edge):**
```
        Front Face      Back Face
        ↓                      ↓
        ┌──────────────────────┐
        │ [N==S]        [S==N] │  ← Top-left-front & top-left-back
        │                      │     
        │                      │     
        │                      │     
        │                      │     
        │                      │     
        │                      │     
        │   2" Block Depth     │     through 2" depth
        │                      │
        │                      │
        │                      │
        │                      │
        │                      │
        │                      │
        │ [S==N]        [N==S] │  ← Bottom-left-front & bottom-left-back
        └──────────────────────┘
```

**Right Side View - Magnet Orientation (Looking at block edge)**
```
        Front Face      Back Face
        ↓                      ↓
        ┌──────────────────────┐
        │ [S==N]        [N==S] │  ← Top-right-front & top-right-back
        │                      │     
        │                      │     
        │                      │     
        │                      │     
        │                      │     
        │                      │     
        │   2" Block Depth     │     through 2" depth
        │                      │
        │                      │
        │                      │
        │                      │
        │                      │
        │                      │
        │ [N==S]        [S==N] │  ← Bottom-right-front & bottom-right-back
        └──────────────────────┘
```

**Top Side View - Magnet Positions (Looking down at block):**
```
  Back Edge →  ┌─────────────────────────────────────────┐  ← 12"
               │ [N]                               [S]   │  ← Top-left-back & top-right-back
               │ [|]                               [|]   │     (showing through-thickness)
               │ [S]                               [N]   │
2" Depth       │              12" Block Width            │
               │ [S]                               [N]   │
               │ [|]                               [|]   │  ← Top-left-front & top-right-front
               │ [N]                               [S]   │
Front Edge →   └─────────────────────────────────────────┘ 
```

**Bottom Side View - Magnet Positions (Looking up at block):**
```
  Front Edge → ┌─────────────────────────────────────────┐  ← 12"
               │ [S]                               [N]   │  ←  Bottom-left-front & bottom-right-front
               │ [|]                               [|]   │     (showing through-thickness)
               │ [N]                               [S]   │
2" Depth       │              12" Block Width            │
               │ [N]                               [S]   │
               │ [|]                               [|]   │  ← bottom-left-back & bottom-right-back
               │ [S]                               [N]   │
Back Edge →    └─────────────────────────────────────────┘
```

**How Blocks Connect:**
When two blocks are placed edge to edge, the checkerboard pattern ensures opposite poles meet:
- Block A corner: N-S
- Block B adjacent corner: S-N
- Result: **Attraction** (N attracts S)

This pattern maintains consistent attraction at all connection points.

## Block Types
### Wall Block
#### Magnet Placement / Layout
-> Layout Type A
#### Weight
### Ceiling Block
#### Magnet Placement / Layout
#### Weight
### Flooring Block
#### Magnet Placement / Layout
#### Weight
### Corner Piece
#### Magnet Placement / Layout
#### Weight
### ?DoorAnchor?
### ?Door?

## Door Options
- Probably a curtain as primary
- Actual door option possibly, magnetic henges?

## Connecting Panels
Requirements: need to make sure the boards stay connected and do not fall inwards. If material is coroplast is this a concern in 5x3x3?

Connected via screws ( < thickness of board > ) and brackets (word?)
Corner structural connectors

Bug: gets heavier, is structural support needed? If using magnets and smaller coroplast may be a better proof that the actual container would work

Alternative: utilize magnets for proof of concept, attached via some tool ( cost more, probably unnecessary, adds time, I think magnets being embedded in the plastic would be better ). 

#### Structural/Shaping Material
Not entirely determined. 
Default: Foamular/XPS Foam, 
Other Options
- Wood ( But Mold / Water doesnt work, but regardless the standard foam shouldnt get wet either, and can warp, so not a good option )
- Foam: Foamular / XPS, Ideally Blue but depends on if they are different
- Floor Foam: Something Softer, doesnt crack, 
    - Perhaps eva foam or similar on top of some material like plywood or a lightweight firm plastic ( or alternative cheaper foam ) base
- Floor Rubber: Lay over the floor foam to protect it, likely similarly connected tiles
- Not wood -> wet/warp/changes shape with humidity
- Must not change shape with temperature standard temperatures like < 165 and > -30 ( or be very negligible and wont impact structure )
    - If this is a concern we can discuss
- 

#### Thickness: 
2 in


# Cost Breakdown
## Product Versions ( Configuration Settings )
### MVP ( Round 1 )
### (Future) Economy A
- Goal: Make it as effective as possible when used properly, not as good of user experience, riskier setup, may come apart or be difficult to take down
- Connecting pieces: No magnets, probably skewers ( or some sort of T shaped tool that expands out? or curved tool like _} )
    - Holes made for piping rods through ( ceiling )
- Todo
### (Future) Standard A: Home
- Magnets
- Maybe skewers too? Idk Will have to test/ask, do they provide structural support etc?
- 2" Foam

### (Future) Standard B: Travel
- Magnets
- Maybe skewers too? Idk Will have to test/ask, do they provide structural support etc?
- Thinner Foam, Smaller Sizes?
- Suitcases? idk if this would work though, its pretty fucking big most likely

### (Future) Premium A

# Standard Enclosure Sizes
## 5x3x3 
## Cost Estimates / Needs
### Mu Metal
??? Not verified but Cost: ~30-50$~/sq ft × 78 sq ft = 💰💰💰 ( seems to be better not on amazon? idk, would need to research )
Also supposedly heavy, like 50-100 lbs, idk if accurate
~ 0.316 pounds per cubic inch @ 0.004 ( 0.002 is lighteste )

### Magnets
Many suppliers (like TAP Plastics, local sign shops) will cut to size
( CONCERN, DOES NOT FIT PERFECTLY TOGETHER, NEED DIFFERENT SIZES MOST LIKELY )
(30 1 Ft Wall Cubes ) 2 Side Panels: 5ft × 3ft x 2 inch (60" × 36" x 2")
(30 1 Ft Wall Cubes ) 2 End Panels: 3ft × 3ft (36" × 36" x 2")
(15 1 Ft Ceiling Cubes ) 1 Top Panel: 5ft × 3ft (60" × 36" x 2")
(15 1 ft Floor Cubes ) 1 Floor Panel: 5ft × 3ft (60" × 36" x 2")
(20 1 ft tall corner pieces ) 4 corner Panels 1 ft x 2 inch x 2 inch 
= [60 Wall Cubes, 15 Floor Cubes, 15 Ceiling Cubes, 5 Corner Cubes]
Wall Cube Magnets: 8 Magnet Spots Per
Floor Cube Magnets: 8 Magnet Spots Per + 4 Metal Bracket Pieces Per
Ceiling Cube Magnets: 8 Magnet Spots Per + 4 Metal Bracket Pieces Per
Corner Cubes: 4 Magnet Spots Per

Total Magnets Needed = (60 * 8) + (15 * 8) + (15 * 8)  + (20 * 4)
= 800 Magnets
Estimated cost per magnet?

Total Weight per Block = 
~ .25 lbs Foamular
~ 1-2 lbs Noise Resistant Felt
~ Negligible Magnet Weight
~ 
Magnet Weights:
Magnet Weight at The C8 ceramic magnet with dimensions of 1-7/8" L x 7/8" W x 3/8" H would weigh approximately 0.11 pounds ( large, pull force 4 lb, ~1$ per)



# Magnets & Layout for Enclosures
- Determine optimal block sizes(s) and understand how to design modular blocks that can fit most furniture shape needs
    **Shape: Square ( Primary/Only Shape )**
    - Length/Width Options: 1", 3", 6", 12" ( Default = 12" )
    - Thickness Option(s): 2"
    - Should all be able to connect to each other to build the enclosure

Alright lets make a plan to do the following
## Goals
- Design Layout for pieces ( potentially visualize or draw or something? Focus on the 12" but can also design for other pieces to make sure it will work )
- Hole size, Hole depth, Magnet Count
- Calculate math for magnet placement/strength

## Steps
- I want to see visually how much strength the magnets have as range increases

- Calculate cost for magnets

Gap between magnets: May be able to put a styrofoam gap between magnets or something to space them, is that better than stacking? Or do i also need to stack?

## Increasing Pull Distance
Key Rule: To maximize your distance, use a magnet-to-magnet attraction.

## Concern: Shear force vs pull force on magnets
- Are you trying to resist a sliding (shear) force? You need much more! Shear force is only about 15-25% of the direct pull force.

Example: If a magnet has a $10lb direct pull, it might only resist $2lb of shear force before sliding.


* **At $0mm gap (contact):** $10lb (pulling on thick steel)
* **At $1mm gap:** The force might drop to **$3lb**
* **At $2mm gap:** The force might drop to **$1.2lb**
* **At $5mm gap:** The force might be only **$0.2lb**

As you can see, the force disappears very quickly.

To get a precise answer for your project, I need to know:

1.  **What is the minimum force (in lbs or kg) you need to hold your materials together?**
2.  **Will you be using one magnet and a steel plate, or two magnets attracting each other?**

## Squish on foam
Is a concern
- Can put Reinforcement Washers infront of the magnet to prevent this (BEST for your project)
- Steel?
┌─────────────────────────┐
│   Foam Surface          │
│                         │
│    [Magnet]             │  ← 0.875 sq in contact
│  ╱           ╲          │
│ [Steel Washer]          │  ← 4-6 sq in (distributes force)
│                         │
│    Foam Interior        │
└─────────────────────────┘
or steel washer infront of it?
It may have a higher attraction to the washer behind it than the magnet infront of it? Interesting

Item: Steel Fender Washers
Size: 2" OD × 1" ID × 1/16" thick
Purpose: Distribute magnet force over larger area
Cost: ~$0.25 each
Where: Home Depot, Amazon
Search: "2 inch fender washer steel"

## Placement
- Suggested 1/4 inch away, may be able to do 1/8 inch with the washer method


## Magnet Size / Force
Size: 1" L × 7/8" W × 1/8" H (25.4mm × 22mm × 3mm)
? Pull Force: 11.7 lbs (when touching)

Force Distribution:
- Without washer: 13.4 PSI (will compress)
- With 2" washer: 2.3 PSI (foam safe!) -> sideways? may be able to use a rectangle instead?
Can get a mounting plate or something and screw the magnet on to the mounting plate so that it keeps its position. May be better to get a mounting plate with a little gap in it thats a perfect shape for the magnet to avoid needing the drill hole in the magnet ( adds price ), although maybe able to use ceramic with this strategy tbh, but they weigh more, probably safer to go neodymium then have someone do math/design to figure out cheapest etc

Concern: placement of magnet on steel strip, and how does the magnetic field apply to it and calulations etc, or does it even matter, do i evedn need the plate
I probably need the backing plate, to prevent forward pull into the 1/8 inch distance from surface thing

# Design: Password Protection Enclosure Layout
```
[wall][ceiling ][wall]
[wall][interior][wall]
[wall][floor   ][wall]
```
