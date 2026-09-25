If theres a gap, the wave may get through but it won't carry enough information back to reconstruct


# Foam Block Wrapping Plan
Additional Options I'm thinking about
  - Wrapping before connecting the foam
  - Half wrap one side, then wrap again, then corners should be taken care of even if theres a gap on the corners, perhaps I could wrap with the corners off center in this style?

Could do a kickstarter too and promise an enclosure for donations > $x
Can also do an initial product sale with specified tolerance

**"roller could be sufficient if"**
You accept ±0.5mm variation instead of ±0.1mm
I just don't understand how the vacuum sealing process would work, how does the air escape

Re: Pillow case attachment rather than glued on? ugh might be better for corners/edges
w.e. just need to make it work

# Learning / Discovery
Tools exist that I can use
i.e. UMKC Innovation lab ()
Hammerspacehobby ( cnc router, laser cutters )

May not even need fabric cut, probably can order fabric / use existing fabric, although its slightly too thin / not wide enough, but can probably overlap and be fine? ehhh idk wait 8ft is too long anyway does need cut

Do I need someone to apply the fabric for me? or should i do it myself
also what about the aluminum, do they have bigger sheets somewhere 
And can i get it perfectly flat or do i need a shop for this

Actually if its all in one then it wont be the same for a picture, sigh ok can still do this

Would it actually be better to have a sticky side to the paper / attach it to something that is sticky? how does upholstery for ars work

Instead of a vacuum use a roller?

Vacuum bagging would have to happen immediately after spray though i think, so perhaps rolling is better

I feel like the roller is fine


# Context 
project file found at `/Users/mm/Projects/Planning/privacy/business/products/password-protection-matt-mvp.md`

## Two Wrapping Strategies

### Strategy A: Double-Wrap (Horizontal + Vertical) - SIMPLER

**Method:** Wrap block twice with rectangular strips (once horizontally, once vertically), vacuum bag to compress flat

**Why this is easier:**
- ✅ No complex cuts (just rectangles)
- ✅ No 45° notches to measure
- ✅ No jig needed
- ✅ Faster (cut rectangular strips vs cross patterns)
- ✅ Wrinkles get compressed by vacuum bag anyway

**Pattern needed:**
- Horizontal wrap: 14" × 16" rectangle (covers 12" + 2" + 2" sides, with 2" overlap on ends)
- Vertical wrap: 14" × 16" rectangle (perpendicular to first wrap)
- Total: 2 rectangles per block

**Process:** Wrap → Wrap again perpendicular → Vacuum bag (presses everything flat)

### Strategy B: Cross Pattern with 45° Miter Notches - MORE PRECISE

**Method:** Pre-cut cross pattern with 45° corner notches, applied using wrapping jig, vacuum bagged for perfect smoothness

**Why this is more complex:**
- ❌ Requires 45° angle cuts
- ❌ Needs cutting template
- ❌ More time per pattern
- ✅ Slightly less fabric overlap (minor cost savings)
- ✅ Cleaner aesthetics (no double layer thickness)

### Strategy C: Half-Wrap Method - SIMPLEST

**Method:** Wrap top half → Wrap bottom half → Corners automatically covered by overlap

**Why this might work:**
- ✅ Even simpler than double-wrap
- ✅ No corner gaps (overlaps cover all edges)
- ✅ Same 14"×16" rectangles (2 per block)
- ⚠️ Corners have 2-3 layer thickness (extra bulk)
- ⚠️ Need to position wraps off-center to ensure corner coverage

**Pattern approach:**
- First wrap: Position 14"×16" so it covers top face + 2" down all sides
- Second wrap: Position 14"×16" to cover bottom face + 2" up all sides
- Overlap zone: 4" band around middle where both wraps meet
- Corners: Triple layer (top wrap + bottom wrap + overlap)

**Concern:** More fabric bunching at corners, but vacuum bag should compress flat

---

## Equipment & Materials

### Materials ($540 + foam cost)
- **XPS foam blocks:** 60× 12"×12"×2" (purchased separately - see main product plan for foam sourcing)
- **EMF shielding fabric:** 26 yards @ $12-15/yard = $312-390
  - Option 1: Mission Darkness TitanRF (80-100 dB, copper-nickel-silver, $25/yard premium)
  - Option 2: RFID blocking fabric (70-90 dB, copper-nickel, $12-15/yard, **RECOMMENDED for cost**)
  - Option 3: Nickel-copper ripstop (80-100 dB, military-grade, $18/yard)
- **Aluminum foil:** Heavy-duty 500ft roll = $60
- **3M Super 77 adhesive:** 6 cans = $90
- **Aluminum foil tape:** 2" wide, 4 rolls = $60
- **Cutting template:** Aluminum sheet (1/8" thick, 18"×18") = $30 (**RECOMMENDED** - durable, won't burn)

### Equipment ($1,900 total - Production Quality with Budget CNC)

**Foam Cutting:**
- **CNC Router Options:**
  - **MINIMUM: SainSmart Genmitsu 4030-PRO** = $800-1,000 (15.7"×15.7" work area, fits 12"×12" blocks)
  - **Premium: Shapeoko 4 or BobsCNC Evo 4** = $1,500-2,200 (16"×16"+ work area, heavy-duty)
  - **Your block needs 12"×12" bed minimum** (15"+ recommended for clamping space)
  **Budget CNC Comparison ($500-1,000 range):**

  | Spec | FoxAlien Masuter Pro | Genmitsu 4040-PRO MAX | Your Needs |
  |------|---------------------|----------------------|------------|
  | **Price** | $549 | $940 | Budget-conscious |
  | **X×Y bed** | 15.75"×15.75" ✅ | 15.7"×15.7" ✅ | 12"×12" blocks fit both |
  | **Z-height** | 2.36" ❌ | 3.07" ✅ | 2" blocks + clearance |
  | **Spindle** | 60W (weak) ❌ | 710W ✅ | Foam cutting needs power |
  | **Motors** | NEMA 17 open-loop | NEMA 17/23 | Adequate for foam |
  | **Motion** | Belt XY, rail Z | Linear rails Z | Rails better |
  | **Quality** | Entry-level hobby | Mid-tier hobby | Need reliable |

  **Verdict:** Genmitsu 4040-PRO MAX = Best budget choice. FoxAlien lacks Z-clearance (can't fit 2" blocks + bit) and underpowered spindle.
  
- **What CNC router does:**
  - Cuts foam blocks to exact size (±0.2mm)
  - Mills magnet pockets (3/16"×3/16"×1/2" deep, ±0.05mm)
  - Mills backing plate recesses (0.25" deep)
  - **Better than hot wire:** Router does ALL operations (cutting + pockets + recesses)
  - Hot wire ONLY cuts foam (can't mill pockets)

- **Work area needed:** 12"×12" minimum for your blocks (most $500-800 routers have 12"×12" to 16"×16" beds)
- **Optional: Vacuum table add-on** = $200-400 (holds foam flat during cutting, not required)

**Fabric Cutting (Machine-Based):**
- **Option A: Hot knife + aluminum template** = $330
  - Electric hot knife ($300) follows aluminum template edge
  - Aluminum template guides cutting path (no hand-tracing)
  - Cuts AND seals fabric edges (no fraying)
  - Cuts exact 45° notches following template
  - ±0.5mm accuracy
  - **Why aluminum template:** Won't burn/melt from hot knife heat (hardboard would char after ~10 uses)
  
- **Option B: Affordable laser cutter** = $300-500 (if bed size fits)
  - **Problem:** 17.25"×17.25" pattern too large for budget lasers
  - Budget lasers (K40, Ortur): 8"×12" or 12"×20" bed max
  - Would need $2,000+ laser (40W+, 24"×36" bed) for full pattern
  - **OR** rent makerspace laser ($50/hr × 3hr = $150 for all 60)
  
- **Option C: Rent makerspace laser** = $150 one-time
  - Upload cross pattern CAD file
  - 2-3 min per pattern × 60 = 2-3 hours
  - Perfectly repeatable, no template needed
  - **Best if makerspace nearby**

**Wrapping Precision:**
- **DIY wrapping jig:** 20"×20" MDF + 4 corner clamps = $75
  - Must accommodate 17.25"×17.25" cross pattern + working space
  - Holds block centered during wrapping
  - Ensures consistent fold angles
  - Hands-free operation
- **Vacuum bagging kit:** Pump + bags = $150-200
  - **Option 1:** [US Composites Vacuum Bagging Kit](https://www.uscomposites.com/vacuum-bagging-kit.html) ($120-180) or [Fiberglass Coatings Vacuum Starter Kit](https://www.fiberglasscoatings.com) ($150-200)
    - Includes: Vacuum pump, 24"×36" bags, breather cloth, sealant tape
    - Designed for composites laminating (exactly your use case)
  - **Option 2:** Repurpose jumbo vacuum storage bags + shop vac = $30-50 (budget option)
    - [HIBAG 10 Jumbo Vacuum Storage Bags](https://www.amazon.com/dp/B0BYDGNBCK) ($20-25)
    - [Vacbird 20-Pack with Pump](https://www.amazon.com/dp/B0973DGD8P) ($30-40)
    - Size: 40"×31" (easily fits 17.25"×17.25" pattern)
  - **Option 3:** DIY with materials = $80
    - [6mil Polyethylene Vacuum Bagging Film](https://www.amazon.com/s?k=vacuum+bagging+film+6+mil) (24"×50' roll, $20-30)
    - [Vacuum Seal Tape](https://www.amazon.com/s?k=vacuum+seal+tape) (double-sided tacky, $20-25)
    - [Breather Fabric/Release Film](https://www.fiberglasscoatings.com) ($15-20)
    - Use existing shop vacuum
  - 14.7 PSI compression (2,116 lbs on 12"×12" face)
  - Presses fabric perfectly flat (±0.1mm smoothness)
  - 10 min per block under vacuum

**Quality Control:**
- Digital calipers + measuring tools = $200
- Heat press (uniform adhesive bonding) = $150
- HDPE backing plates (60×) = $180

**Alternative: Automated Wrapping (if you want machine to do the work):**
- **Cold laminating roller machine** = $300-800
  - [Vevor 25" Cold Laminator](https://www.amazon.com/dp/B07H2FJK9V) ($300-400)
  - Feeds foam + fabric through rollers
  - Applies uniform pressure automatically
  - Problem: Only does flat lamination (won't fold arms up around block)
  - **Verdict:** Won't work for 3D cube wrapping, only for flat sheets
- **Shrink wrap machine** = $500-2,000
  - Heat-shrinks plastic around objects
  - Problem: Shrink wrap ≠ fabric lamination (completely different process)
  - **Verdict:** Wrong tool for fabric/foam bonding
- **No affordable machine exists for automated fabric cube wrapping**
  - Industrial solutions (box wrapping machines) = $10,000+
  - Your best option: Jig + vacuum bag = semi-automated, still requires manual folding

---

## CNC Router vs Hot Wire

**Your question: "If I have CNC router, does it use hot wire?"**

**No - CNC router uses spinning cutting bit (like Dremel), not hot wire.**

**CNC Router (RECOMMENDED):**
- ✅ Cuts foam (5-10 min per block)
- ✅ Mills exact magnet pockets (±0.05mm depth)
- ✅ Mills backing plate recesses
- ✅ Routes wire channels
- ✅ Cuts HDPE/aluminum backing plates
- ✅ **One machine, all operations**
- ❌ Creates dust (need vacuum attachment)
- **Cost:** $500-1,000 (budget), $1,500-2,200 (premium)
- **Your 12"×12"×2" blocks fit most $500+ routers**

**CNC Hot Wire:**
- ✅ Cuts foam only (2-3 min per block)
- ✅ No dust
- ❌ CANNOT mill pockets or recesses
- ❌ CANNOT cut backing plates
- ❌ Requires separate tools for magnet holes
- **Cost:** $500

**Verdict:** CNC router is better for your project (magnet pockets + backing plates critical for flush fit)

---

## Cross Pattern Template Specifications

### Pattern Dimensions (12"×12"×2" block)

```
         2.5" arm length
              ↓
        ┌─────────┐
        │         │
     ╱──┘    2    └──╲   ← 45° miter notch, 2.5" deep
    ╱                 ╲
   ┌───────────────────┐
   │                   │
   │    1    C    3    │  ← Center: 12.25" × 12.25"
   │                   │  ← Arms: 12.25" wide × 2.5" long
   └───────────────────┘
    ╲                 ╱
     ╲──┐    4    ┌──╱   ← 45° notches at all 8 corners
        │         │
        └─────────┘

Total pattern size: 17.25" × 17.25"
Fit 3 patterns across 44" wide fabric
```

**Why 45° miter notches work:**
- Foam corners are 90°
- Two arms meet at each corner = 90° ÷ 2 = 45° each
- When folded upward, notch edges meet perfectly (no gap, no overlap)
- Same principle as picture frame miters

**Miter joint detail:**
```
BEFORE FOLD:                    AFTER FOLD:

  Arm edge                       │╲ Arm 2
      ╲ 45°                      │ ╲ Perfect
       ╲___                      │  ╲ edge-to-edge
       │                         │   │ Arm 1
       │                         │   │
    Center                      Foam corner

No bunching, no gaps
```

---

## Wrapping Process

### Strategy A: Double-Wrap (8 min per block)

**1. Foam Preparation (CNC Router)** - same as Strategy B

**2. Fabric Cutting (Simple Rectangles - 14" × 16")**

**Automated/Machine Options:**

- **Option A: Fabric cutting machine** = $200-400
  - [Cricut Maker 3](https://www.amazon.com/dp/B09F3XBPM5) ($380) - cuts up to 12"×24", would need to cut in two passes or reposition
  - [Brother ScanNCut SDX125E](https://www.amazon.com/dp/B07KQNZF6K) ($350) - cuts up to 12"×24"
  - Problem: 14" width exceeds 12" max width on most machines
  - **Verdict:** Won't work for 14"×16" without repositioning (defeats automation purpose)

- **Option B: Rotary fabric cutter on cutting mat** = $50-80
  - [Olfa 45mm Rotary Cutter](https://www.amazon.com/dp/B00AXVPQ7C) ($25) + [24"×36" Self-Healing Mat](https://www.amazon.com/dp/B000YZ7B3K) ($30) + [Metal Ruler 18"](https://www.amazon.com/dp/B00006IBNG) ($15)
  - Clamp ruler, roll blade along edge (much faster than scissors)
  - ~30 seconds per cut vs 2-3 min with scissors
  - 120 rectangles = ~1 hour vs 3-4 hours with scissors
  - **Verdict:** Best manual option (fast, precise, affordable)

- **Option C: Hot knife (straight edge)** = $30-50
  - [Chandler Tool Hot Knife](https://www.amazon.com/dp/B07PHDVZMV) ($35)
  - Cuts AND seals edges (no fraying)
  - Use metal ruler as guide
  - ~45 seconds per cut (slower to heat through)
  - 120 rectangles = ~1.5 hours
  - **Verdict:** Good if you want sealed edges

- **Option D: Electric fabric shears** = $40-60
  - [Black+Decker Electric Scissors](https://www.amazon.com/dp/B00FZPDYAI) ($40)
  - Faster than manual scissors, but still requires tracing/guiding
  - ~1 min per rectangle
  - 120 rectangles = ~2 hours
  - **Verdict:** Middle ground between scissors and rotary

- **Option E: Guillotine paper cutter (modified for fabric)** = $60-150
  - [Swingline ClassicCut 15" Trimmer](https://www.amazon.com/dp/B00006IAUP) ($60)
  - Can cut up to 15 sheets paper, or 2-3 layers fabric
  - Clamp fabric, pull blade = perfect straight cuts
  - Max width: 15" (fits your 14" dimension!)
  - ~15 seconds per cut
  - 120 rectangles = ~30 min
  - **Verdict: BEST OPTION** - fast, repeatable, affordable

- **Option F: Laser cutter** = $300-600 (budget) or $2,000-5,000 (professional)
  
  **Budget lasers (won't work for 14"×16"):**
  - [K40 Laser](https://www.amazon.com/s?k=k40+laser+cutter) ($300-400) - 8"×12" bed - TOO SMALL
  - [Ortur Laser Master 3](https://www.amazon.com/dp/B0B7T2Z5V5) ($500) - 15"×15" bed (diode laser, slow on fabric)
  - [xTool D1 Pro](https://www.amazon.com/dp/B0B2SSDM6F) ($1,000) - 17"×17" bed - FITS but expensive for rectangles
  
  **What YOU could use for this project:**
  - **Makerspace rental**: $50-100/month membership + $5-10/hour machine time
  - Upload 14"×16" rectangle template
  - Laser cuts perfectly straight, sealed edges
  - ~10 seconds per cut, 120 rectangles = 20 min total cutting
  - **Verdict:** If makerspace nearby, BEST option (fastest + sealed edges)
  
  **What else laser cutter is useful for:**
  - ✅ Cutting HDPE backing plates (12"×12" with magnet holes)
  - ✅ Cutting aluminum foil precisely (no tears)
  - ✅ Engraving alignment marks on foam
  - ✅ Cutting acrylic/wood jigs and fixtures
  - ✅ Prototyping custom block shapes
  - ❌ Cutting foam itself (melts/catches fire - use CNC router instead)
  
  **If you buy one ($500-1,000 range):**
  - Look for 16"×16"+ bed minimum
  - 5-10W diode laser (fabric/paper) or 40W+ CO2 (faster, cleaner)
  - xTool D1 Pro or similar = $800-1,000
  - Reusable for other projects (enclosures, templates, fixtures)

**Recommended: Guillotine trimmer ($60) for speed, or makerspace laser ($50-100) if available nearby**

- Cut 14" × 16" rectangles (no angles, no notches)
- 2 rectangles per block (horizontal + vertical wrap)
- Cut 2 patterns: aluminum foil + shielding fabric

**3. First Wrap (Horizontal)**
- Place 14" × 16" fabric on table
- Place foam block in center (12"×12" face down)
- Spray adhesive on exposed sides
- Fold long edges over top (2" overlap on each end)
- **Don't press yet** - position loosely

**4. Second Wrap (Vertical, perpendicular)**
- Rotate block 90°
- Place second 14" × 16" fabric
- Spray adhesive on remaining exposed sides
- Fold long edges over (crosses first wrap at 90°)
- **Don't press yet** - position loosely

**IMPORTANT:** Work fast (complete both wraps within 3 min) so glue is still wet when vacuum is applied

**5. Vacuum Bagging (While Glue Is Still Wet)**
- **CRITICAL:** Apply vacuum BEFORE glue dries (within 2-3 min of spraying)
- 3M Super 77 stays tacky for ~5 min, allowing fabric repositioning
- Vacuum pressure (2,116 lbs) presses fabric INTO wet adhesive
- Fabric conforms to foam surface, adhesive fills any micro-gaps
- Glue cures under constant pressure = no air pockets
- 10 min under vacuum (adhesive sets)
- **If glue dries first:** Fabric frozen in place, vacuum can't reposition it

**6. Sealing**
- Apply foil tape over seams if needed
- Inspect for gaps

**Total time: 8 min** (faster than cross pattern - no jig, simpler cuts)

---

### Strategy C: Half-Wrap (7 min per block)

**1. Foam Preparation (CNC Router)** - same as other strategies

**2. Fabric Cutting** - same 14" × 16" rectangles

**3. First Half-Wrap (Top + Sides)**
- Place 14" × 16" fabric on table
- Position foam block so top face is covered + 2" extends down all 4 sides
- Spray adhesive on top face and upper 2" of all sides
- Fold fabric down over edges
- **Don't press yet** - position loosely

**4. Second Half-Wrap (Bottom + Sides)**
- Place second 14" × 16" fabric under block
- Position to cover bottom face + 2" extends up all 4 sides
- Spray adhesive on bottom face and lower 2" of all sides
- Fold fabric up over edges
- Creates 4" overlap zone around middle where both wraps meet
- **Corners automatically covered** by overlapping folds

**5. Vacuum Bagging** - same as Strategy A (while glue wet)

**6. Sealing** - inspect corners, may need tape if gaps

**Advantage:** Corners can't have gaps because both wraps overlap there

**Disadvantage:** Triple-layer thickness at corners (top + bottom + overlap) might create bulk

**Total time: 7 min** (slightly faster positioning than perpendicular wraps)

---

### Strategy B: Cross Pattern (10 min per block)

**1. Foam Preparation (CNC Router)**

**Magnet Pocket Drilling - How It Works:**

**Setup:**
- Block lies **flat** on CNC bed (12"×12" face DOWN, other 12"×12" face UP)
- CNC drills **straight down from top surface** into the 2" thickness
- Pocket locations: **8 corners of the top 12"×12" face**
- Pocket depth: **1/2" down into the 2" thickness** (leaves 1.5" foam structure below)

**Why this works:**
- CNC Z-axis mills straight down (not sideways) - standard milling operation
- 2" block thickness provides plenty of depth for 1/2" pockets
- Magnets sit flush in corners of top face
- No side-drilling or special fixtures needed

**Z-axis clearance check:**
- Genmitsu 4040-PRO MAX: **3.07" (78mm) Z-axis height**
- Your block height: **2" (50.8mm)**
- Clearance: 3.07" - 2" = **1.07" above block** ✅
- Drilling depth needed: Only 1/2" into block = **easy clearance**

**Work area requirement:**
- Your block: 12"×12" footprint when lying flat
- Budget CNC bed: 12"×7" (Genmitsu 3018) = ❌ **TOO SMALL**
- **MINIMUM: Genmitsu 4040-PRO MAX: 15.7"×15.7"×3.07" = ✅ Fits perfectly** ($800-1,000)

**Verdict:** Standard top-down milling. Block lies flat, CNC drills down 1/2" into 2" thickness at 8 corners. Need $800+ CNC with 15"×15"+ bed.

### 2. Fabric Cutting (Hot Knife - Machine Method)
- Clamp aluminum template on cutting surface
- Place fabric under template
- Hot knife follows template edge (machine cuts, no hand-tracing)
- Blade melts + seals edges simultaneously (no fraying)
- Cut 2 patterns per block: 1 aluminum foil, 1 shielding fabric
- Stack: foam → aluminum → fabric

### 3. Wrapping (Jig-Assisted)
- Place foam block in wrapping jig (corner clamps hold centered)
- Position cross pattern centered over block
- Spray 3M Super 77 on foam (full coverage, 30 sec tacky)
- Fold sequence: Left arm (1) → Right arm (3) → Top arm (2) → Bottom arm (4)
- Arms meet edge-to-edge at corners (45° notches align perfectly)
- All 4 arm tips overlap at BackBlockFace center (2"×2" area, OK to be messy)

### 4. Vacuum Bagging (How It Works)

**The Physics:**
- **Atmospheric pressure = 14.7 PSI** (pounds per square inch) at sea level
- Normally, air pressure pushes equally from all directions (you don't feel it)
- **Remove air from bag** = pressure only pushes DOWN on block (from outside)
- Result: **2,116 lbs of force** pressing on your 12"×12" face (12×12 = 144 sq in × 14.7 PSI)

**Step-by-step process:**
1. **Place wrapped block in vacuum bag**
   - Bag is clear plastic (so you can see block)
   - Block sits on breather cloth (allows air to escape evenly)
   - Optional: Release film between block and bag (prevents sticking)

2. **Seal the bag**
   - Fold bag opening over sealant tape (creates airtight seal)
   - Leave one small opening for vacuum pump hose

3. **Pull vacuum** (remove air)
   - Vacuum pump sucks air out through hose
   - Bag collapses around block like shrink wrap
   - Atmospheric pressure (14.7 PSI) now presses DOWN uniformly
   - **Wrinkles in fabric get compressed completely flat**

4. **Wait 10 minutes** (glue cures under pressure)
   - 3M Super 77 adhesive sets during this time
   - Constant pressure = perfect bond, no air bubbles
   - Fabric becomes smooth as glass (±0.1mm)

5. **Release vacuum, remove block**
   - Turn off pump, open bag
   - Block comes out with perfectly flat surface
   - No wrinkles, no bubbles, consistent thickness

**Why this works better than hand pressure:**
- **Hand pressing:** Maybe 10-20 lbs force, uneven, misses spots
- **Vacuum bagging:** 2,116 lbs force, perfectly uniform, reaches every surface
- **Result:** Professional-grade smoothness impossible to achieve by hand

### 5. Sealing
- Apply 2" aluminum foil tape over 4 arm seams
- Tape bridges any micro-gaps (adds 15-30 dB shielding)
- Thickness: 0.15mm (negligible vs ±5mm tolerance)

---

## Wrapping Jig Design (DIY $60)

**Purpose:** Tool for perfectly folding fabric around cube

```
Top view:                    Side view:

    ┌────●────┐                  ●
    │         │                  │
    │  [FOAM] │             ┌────┴────┐
    │  BLOCK  │             │  FOAM   │
    │         │             │  BLOCK  │
    └────●────┘             └─────────┘
         
    4 corner clamps         Base plate holds
    hold block centered     block at reference edges
```

**Components:**
- 14"×14" MDF base plate ($10)
- 4× spring-loaded corner clamps ($20)
- Aluminum angle reference edges ($10)
- Rubber feet ($5)
- Assembly hardware ($15)

**How it helps:**
- Block can't shift during glue application
- Arms fold at exactly 90° (jig sides guide angle)
- Cross pattern stays centered
- Hands free to squeegee/press fabric
- **Every block positioned identically (±0.5mm)**

**Build time:** 2 hours (simple woodworking)

---

## Vacuum Bagging with Cross Pattern

**Your question: "Why is vacuum bagging needed?"**

### The Problem Without Vacuum Bagging

When you wrap fabric around foam and use spray adhesive:

**Air bubbles form:**
- Fabric doesn't contact foam uniformly
- Spray adhesive creates tiny gaps (±0.5-2mm)
- Air trapped between layers
- **Result:** Bumpy, uneven surface

**Wrinkles at folds:**
- Cross pattern arms create wrinkles when folded up
- 4 arms converging at corners = fabric bunching
- Hand pressure can't reach all areas uniformly
- **Result:** ±1-3mm thickness variation (blocks won't stack flat)

**Poor adhesive bond:**
- Glue only bonds where fabric touches foam
- Air pockets = weak spots that can peel
- Inconsistent pressure = inconsistent bond strength
- **Result:** Fabric may separate over time

### What Vacuum Bagging ACTUALLY Solves

**Perfect contact (ONLY if glue is still wet):**
- 2,116 lbs of uniform pressure (14.7 PSI × 144 sq in)
- **Presses fabric DOWN into wet adhesive** (not just onto surface)
- Adhesive flows around fabric fibers, filling micro-gaps
- Wrinkles get pressed flat WHILE glue is repositionable
- **Result:** Glass-smooth surface where fabric covers (±0.1mm)

**The key timing:**
- Spray adhesive → Position fabric → **Immediately vacuum bag** (within 2-3 min)
- If you wait for glue to dry first, vacuum can't fix wrinkles (fabric is stuck)
- 3M Super 77 has ~5 min working time before it sets

**Critical understanding:**
- Vacuum bag presses fabric **perpendicular to surface** (straight down)
- It does NOT stretch fabric **parallel to surface** (sideways to cover more area)
- **Your cross pattern MUST be cut correctly first**
- Vacuum only makes that correctly-cut pattern perfectly flat

**Wrinkle compression:**
- Atmospheric pressure **presses wrinkles flat** (doesn't stretch fabric to fit)
- Fabric that's already properly sized gets pressed down firmly
- Cross pattern arms (already cut to correct size) pressed tight against sides
- **Key:** Pattern geometry must be CORRECT first - vacuum just eliminates air/wrinkles in that correct pattern
- **Result:** Blocks stack perfectly flat (±0.2mm tolerance achieved)

**Maximum adhesive bond:**
- Glue cures under constant pressure
- Fabric pressed into adhesive layer uniformly
- No weak spots, no potential for peeling
- **Result:** Permanent, professional-quality bond

### Could You Skip It?

**Yes, but:**
- ❌ Surface won't be smooth (±1-3mm bumps/wrinkles)
- ❌ Blocks won't stack precisely (gaps between blocks)
- ❌ EMF shielding reduced (air gaps = signal leakage)
- ❌ Fabric may peel over time (weak adhesive bond)
- ❌ Looks amateur instead of professional

**For personal MVP testing:** Maybe skip it, accept rough finish
**For actual product:** Vacuum bagging is essential for quality

**The honest answer:** You're aiming for ±5mm tolerance across entire structure. Without vacuum bagging, EACH BLOCK has ±1-3mm variation = tolerances stack up = structure won't work.

**Workflow:**
- Cross pattern (correct geometry) → Jig (correct positioning) → Vacuum (perfect smoothness)

---

## Quality Standards

**Target tolerances:**
- Foam block size: ±0.2mm (CNC router)
- Magnet pocket depth: ±0.05mm (flush magnets)
- Backing plate fit: ±0.1mm (no tilt/shift)
- Wrap smoothness: ±0.1mm (vacuum bagged)
- Block-to-block consistency: ±0.2mm (every block identical)
- Assembly gap: 0.2-0.5mm (minimal EMF leakage)
- Shielding effectiveness: 85-95 dB

**5 smooth faces achieved:**
- TopBlockFace, BottomBlockFace, LeftBlockFace, RightBlockFace, FrontBlockFace: Perfectly smooth (±0.1mm)
- BackBlockFace: 4 arm overlaps meet at center (2"×2" area, messy OK)

---

## Time & Cost Summary

**Strategy A (Double-Wrap): $1,250-2,350**
- Materials: $540 (same)
- CNC router: $800-1,500 (foam + magnet pockets)
- Fabric cutting: **$50-80** (rotary cutter setup or guillotine trimmer)
- Wrapping jig: **$0** (no jig needed!)
- Vacuum kit: $150 (or $50 budget bags)
- QC tools: $200
- **Total: $1,290-2,430** (saves $300-400 vs cross pattern)

**Strategy B (Cross Pattern): $2,000-3,400**
- Materials: $540
- CNC router: $800-1,500
- Hot knife + template: $330 (45° angle cuts)
- Wrapping jig: $75 (alignment tool)
- Vacuum kit: $150 (or $50 budget)
- QC tools: $200
- **Total: $1,705-2,705** (more complex, higher cost)

**Strategy A Time (60 blocks): 19-21 hours**
- CNC router setup: 2 hours
- Cut 60 foam blocks (CNC): 6 hours
- Cut 120 rectangles: 
  - Guillotine trimmer: 0.5 hours (fastest)
  - Rotary cutter: 1 hour (precise)
  - Hot knife: 1.5 hours (sealed edges)
- Double-wrap 60 blocks: 8 hours (8 min each with vacuum)
- Seal seams: 2 hours
- Inspect: 1 hour
- **Total: 19.5-21 hours** (saves 8-10 hours vs cross pattern)

**Strategy B Time (60 blocks): 29 hours**
- Make template: 1 hour
- CNC router setup: 2 hours
- Cut 60 foam blocks (CNC): 6 hours
- Cut 60 cross patterns (hot knife): 6 hours
- Wrap 60 blocks (jig + vacuum): 12 hours
- Seal seams: 2 hours
- **Total: 29 hours**

**Result (both strategies):** 60 production-quality blocks, ±0.2mm consistency, 85-95 dB shielding

---

## Budget Comparison: What You Get

| Budget | $1,000 | $2,000 | $5,000 |
|--------|--------|--------|--------|
| **Foam cutting** | Hand-cut with hot wire | CNC hot wire (auto) | **Budget CNC router ($500)** | **Premium CNC router ($1,500)** |
|--------|--------|--------|--------|--------|
| **Magnet pockets** | Manual drilling (±2mm) | Manual drilling (±1mm) | **CNC milled (±0.1mm)** | **CNC milled (±0.05mm, perfectly flush)** |
| **Backing plates** | ❌ None | ✅ HDPE plates | ✅ HDPE + CNC-milled recess | ✅ HDPE + CNC-milled recess |
| **Fabric cutting** | Scissors/rotary cutter | Hot knife (sealed edges) | Hot knife (sealed edges) | Hot knife (sealed edges) |
| **Wrapping tool** | DIY jig | DIY jig | DIY jig | DIY jig |
| **Vacuum bagging** | ❌ Skip | ❌ Skip | **✅ Yes** | **✅ Yes** |
| **Foam tolerance** | ±2-3mm | ±0.5mm | **±0.3mm** | **±0.2mm** |
| **Magnet flush fit** | ❌ Protrude ±2mm | ⚠️ Almost flush ±1mm | **✅ Mostly flush ±0.1mm** | **✅ Perfectly flush ±0.05mm** |
| **Block consistency** | ±5mm variation | ±1mm variation | **±0.3mm** | **±0.2mm** |
| **Shielding** | 70-80 dB | 75-85 dB | **80-90 dB** | **85-95 dB** |
| **Work time (60 blocks)** | 40 hours | 32 hours | **30 hours** | **29 hours** |
| **Total cost** | $1,000 | $2,000 | **$2,700** | **$3,800** |
| **When to choose** | Personal MVP, OK with gaps | Better quality, testing | **Best value** | Premium/manufacturing |

**Key differences $1K → $2.4K (budget CNC):**
1. **Budget CNC router vs manual** = Magnet pockets milled (±0.1mm vs ±2mm drilling) = magnets mostly flush
2. **Vacuum bagging included** = Wrinkle-free surface (±0.1mm smoothness)
3. **5× better tolerance** = Blocks consistent (±0.3mm vs ±2-3mm)
4. **+10 dB shielding** = Better gaps (80-90 dB vs 70-80 dB)

**Budget vs Premium CNC ($500 vs $1,500):**

| Feature | Budget CNC ($500) | Premium CNC ($1,500) | Does it matter? |
|---------|-------------------|---------------------|-----------------|
| **Tolerance** | ±0.3mm | ±0.2mm | ❌ No - both well within ±5mm target |
| **Magnet pockets** | ±0.1mm depth | ±0.05mm depth | ❌ No - both make magnets flush |
| **Build quality** | Aluminum frame | Heavy steel frame | ⚠️ Maybe - more vibration on budget |
| **Cutting speed** | Slower (lighter frame) | Faster (rigid frame) | ⚠️ Maybe - adds 1-2 min per block |
| **Max RPM** | 10,000-12,000 | 20,000-30,000 | ❌ No - foam cuts easily at low RPM |
| **Longevity** | 100-200 blocks | 1,000+ blocks | ⚠️ Yes if making >100 blocks |

**The honest answer: No meaningful reason for personal use.**

- Your tolerance target is ±5mm - budget CNC's ±0.3mm is **16× better than needed**
- Magnet flush fit: Budget ±0.1mm vs premium ±0.05mm = both perfectly flush (magnets won't protrude either way)
- Shielding: 80-90 dB vs 85-95 dB = both exceed typical requirements (60+ dB sufficient)

**When premium matters:**
- Making >200 blocks (budget CNC wears out faster)
- Selling product (0.05mm consistency = marketing point)
- Cutting harder materials than foam (HDPE backing plates, aluminum)

**For your 60-block project:** Budget $500 CNC is perfect. Save $1,000.

---

## Quick Reference

**Selected strategy answers:**
- ✅ Cross pattern with 45° miter notches (eliminates corner triangles)
- ✅ CNC router (not hot wire) - mills magnet pockets + backing plate recesses
- ✅ Hot knife for fabric cutting (cuts + seals edges perfectly)
- ✅ DIY wrapping jig ($60) - tool for perfectly folding fabric around cube
- ✅ Vacuum bagging works with cross pattern (compresses wrinkles flat)

**Key insight:** CNC router uses spinning bit (like Dremel), NOT hot wire. Router can mill pockets/recesses for perfect magnet flush fit. Hot wire only cuts foam.

**Result:** 60 production-quality blocks, 85-95 dB shielding, ±0.2mm consistency, 29 hours total work.

---

*See wrapping-notes.md for exploration process, rejected methods, and detailed Q&A*
