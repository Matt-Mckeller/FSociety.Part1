import type { MinimalDialogInput } from "../../types/inputs.ts";

// Prompt: Generate 3 sample MinimalDialogInput objects with realistic transcriptions
//  data that would have been collected from live classroom environments. 
// Vary the timeframe of the transcribed audio from 15s to 5m.
// Varying subjects, varying grade levels
// Put them in the arrays below following the ClassroomDialogSample


type ClassroomDialogSample = {
    subject: string; // e.g., "Math", "History", "Science"
    gradeLevel: string; // e.g., "5th Grade", "10th Grade"
    qualityScore: number; // Scale from 1 (poor) to 10 (excellent) of the transcription quality
    description: string; // Brief description of the scenario
    durationSeconds: number; // Duration of the original transcribed audio in seconds
    dialog: MinimalDialogInput // The actual dialog
}

// Transcriptions with clear audio and minimal background noise
export const goodQualitySamples: ClassroomDialogSample[] = [
    {
        subject: "Math",
        gradeLevel: "5th Grade",
        qualityScore: 9,
        description: "Teacher explaining fractions with clear audio",
        durationSeconds: 45,
        dialog: {
            transcriptions: [
                { text: "Alright class, let's talk about fractions today.", timestamp: 0, confidence: 0.98 },
                { text: "Who can tell me what a fraction represents?", timestamp: 3.2, confidence: 0.97 },
                { text: "Yes, Emma?", timestamp: 5.8, confidence: 0.99 },
                { text: "A fraction is a part of a whole.", timestamp: 7.1, confidence: 0.96 },
                { text: "Excellent! That's exactly right.", timestamp: 10.2, confidence: 0.98 },
                { text: "Now, if I have a pizza cut into 8 slices and I eat 3 slices, what fraction did I eat?", timestamp: 12.5, confidence: 0.95 },
                { text: "3 out of 8!", timestamp: 20.3, confidence: 0.97 },
                { text: "Perfect! We write that as 3 over 8, or three-eighths.", timestamp: 22.1, confidence: 0.98 },
                { text: "The top number is called the numerator, and the bottom number is the denominator.", timestamp: 26.8, confidence: 0.96 },
                { text: "Can everyone say numerator?", timestamp: 32.5, confidence: 0.99 },
                { text: "Numerator!", timestamp: 34.8, confidence: 0.95 },
                { text: "And denominator?", timestamp: 36.2, confidence: 0.99 },
                { text: "Denominator!", timestamp: 38.0, confidence: 0.96 },
                { text: "Great! Now let's practice with some examples on the board.", timestamp: 40.5, confidence: 0.97 }
            ]
        }
    },
    {
        subject: "History",
        gradeLevel: "10th Grade",
        qualityScore: 8,
        description: "Discussion about the American Revolution",
        durationSeconds: 180,
        dialog: {
            transcriptions: [
                { text: "Today we're continuing our unit on the American Revolution.", timestamp: 0, confidence: 0.97 },
                { text: "Last class we discussed the causes. Who remembers the main grievances the colonists had?", timestamp: 4.5, confidence: 0.95 },
                { text: "Taxation without representation.", timestamp: 10.8, confidence: 0.98 },
                { text: "Yes, that's a big one. What else?", timestamp: 13.2, confidence: 0.96 },
                { text: "The Stamp Act and the Tea Act.", timestamp: 15.9, confidence: 0.94 },
                { text: "Good. The British Parliament kept passing laws that affected the colonies without giving them any say.", timestamp: 18.7, confidence: 0.96 },
                { text: "This led to increasing tensions throughout the 1760s and early 1770s.", timestamp: 25.3, confidence: 0.95 },
                { text: "Now, can someone tell me about the Boston Tea Party?", timestamp: 31.8, confidence: 0.97 },
                { text: "It was in 1773, right?", timestamp: 36.2, confidence: 0.93 },
                { text: "Exactly, December 1773. What happened?", timestamp: 38.5, confidence: 0.98 },
                { text: "The colonists dressed as Native Americans and threw tea into the harbor.", timestamp: 42.1, confidence: 0.92 },
                { text: "That's right. They dumped 342 chests of tea, worth about 1.7 million dollars in today's money.", timestamp: 48.3, confidence: 0.94 },
                { text: "This was a direct protest against the Tea Act.", timestamp: 56.7, confidence: 0.96 },
                { text: "How did Britain respond to this?", timestamp: 60.2, confidence: 0.98 },
                { text: "They passed the Intolerable Acts.", timestamp: 63.8, confidence: 0.95 },
                { text: "Correct! The Intolerable Acts, or Coercive Acts, were meant to punish Massachusetts.", timestamp: 66.5, confidence: 0.94 },
                { text: "They closed Boston Harbor until the tea was paid for.", timestamp: 73.2, confidence: 0.95 },
                { text: "They also restricted town meetings and required colonists to house British soldiers.", timestamp: 78.9, confidence: 0.93 },
                { text: "Instead of intimidating the colonists, these acts actually united them.", timestamp: 85.7, confidence: 0.96 },
                { text: "This led to the First Continental Congress in 1774.", timestamp: 92.1, confidence: 0.97 },
                { text: "Delegates from 12 of the 13 colonies met in Philadelphia.", timestamp: 97.5, confidence: 0.95 },
                { text: "Which colony didn't send delegates?", timestamp: 103.2, confidence: 0.98 },
                { text: "Georgia?", timestamp: 106.5, confidence: 0.91 },
                { text: "Yes, Georgia. They were still heavily dependent on British military protection.", timestamp: 108.3, confidence: 0.94 },
                { text: "The Congress organized a boycott of British goods and began preparing for potential conflict.", timestamp: 115.8, confidence: 0.95 },
                { text: "By April 1775, tensions had reached a breaking point.", timestamp: 123.6, confidence: 0.96 },
                { text: "British troops marched to Concord to seize colonial weapons.", timestamp: 128.9, confidence: 0.94 },
                { text: "And that's when the first shots were fired at Lexington.", timestamp: 134.2, confidence: 0.97 },
                { text: "The shot heard round the world, as it came to be known.", timestamp: 139.5, confidence: 0.95 },
                { text: "From that moment on, there was no turning back.", timestamp: 145.1, confidence: 0.96 },
                { text: "The American Revolution had begun.", timestamp: 149.3, confidence: 0.98 },
                { text: "Next class, we'll discuss the major battles and turning points.", timestamp: 153.7, confidence: 0.97 },
                { text: "For homework, I want you to read chapters 6 and 7 and answer the questions at the end.", timestamp: 159.2, confidence: 0.94 },
                { text: "Any questions before we wrap up?", timestamp: 166.8, confidence: 0.98 },
                { text: "No? Alright, see you all on Wednesday.", timestamp: 170.5, confidence: 0.97 }
            ]
        }
    },
    {
        subject: "Science",
        gradeLevel: "7th Grade",
        qualityScore: 9,
        description: "Quick explanation of photosynthesis",
        durationSeconds: 25,
        dialog: {
            transcriptions: [
                { text: "Remember, photosynthesis is how plants make their own food.", timestamp: 0, confidence: 0.98 },
                { text: "They take in carbon dioxide from the air through tiny holes in their leaves.", timestamp: 4.8, confidence: 0.96 },
                { text: "They also absorb water through their roots.", timestamp: 10.2, confidence: 0.97 },
                { text: "Using energy from sunlight, they convert these into glucose, which is sugar.", timestamp: 13.5, confidence: 0.95 },
                { text: "And as a byproduct, they release oxygen that we breathe.", timestamp: 19.8, confidence: 0.98 },
                { text: "That's why plants are so important for life on Earth!", timestamp: 23.2, confidence: 0.97 }
            ]
        }
    },
    {
        subject: "Computer Science",
        gradeLevel: "College - CS 101",
        qualityScore: 9,
        description: "Introduction to algorithms lecture in a quiet auditorium",
        durationSeconds: 240,
        dialog: {
            transcriptions: [
                { text: "Good morning everyone. Today we're going to discuss algorithm complexity and Big O notation.", timestamp: 0, confidence: 0.97 },
                { text: "This is a fundamental concept in computer science that you'll use throughout your career.", timestamp: 6.8, confidence: 0.96 },
                { text: "Let's start with a simple question: what is an algorithm?", timestamp: 13.5, confidence: 0.98 },
                { text: "An algorithm is a step-by-step procedure for solving a problem or performing a task.", timestamp: 18.9, confidence: 0.97 },
                { text: "Now, not all algorithms are created equal. Some are more efficient than others.", timestamp: 26.2, confidence: 0.96 },
                { text: "This is where Big O notation comes in.", timestamp: 32.7, confidence: 0.98 },
                { text: "Big O describes the upper bound of an algorithm's time complexity.", timestamp: 37.4, confidence: 0.96 },
                { text: "It tells us how the runtime grows as the input size increases.", timestamp: 43.9, confidence: 0.97 },
                { text: "Let's look at some common time complexities.", timestamp: 49.8, confidence: 0.98 },
                { text: "O of 1, or constant time, means the algorithm takes the same time regardless of input size.", timestamp: 54.5, confidence: 0.95 },
                { text: "For example, accessing an array element by index is O of 1.", timestamp: 62.3, confidence: 0.97 },
                { text: "O of n, or linear time, means runtime grows proportionally with input size.", timestamp: 68.7, confidence: 0.96 },
                { text: "A simple loop that iterates through an array once is O of n.", timestamp: 76.1, confidence: 0.97 },
                { text: "O of n squared, or quadratic time, typically involves nested loops.", timestamp: 82.9, confidence: 0.95 },
                { text: "For instance, comparing every element with every other element.", timestamp: 89.6, confidence: 0.96 },
                { text: "O of log n, or logarithmic time, is very efficient.", timestamp: 96.2, confidence: 0.97 },
                { text: "Binary search is a classic example of O of log n.", timestamp: 102.5, confidence: 0.98 },
                { text: "With each step, we eliminate half of the remaining elements.", timestamp: 108.3, confidence: 0.96 },
                { text: "Now, let's consider O of n log n.", timestamp: 114.8, confidence: 0.97 },
                { text: "This is the complexity of efficient sorting algorithms like merge sort and quick sort.", timestamp: 120.2, confidence: 0.95 },
                { text: "It's faster than O of n squared but slower than O of n.", timestamp: 127.9, confidence: 0.96 },
                { text: "Why does this matter in practice?", timestamp: 134.5, confidence: 0.98 },
                { text: "Let's say you have a dataset with a million records.", timestamp: 139.1, confidence: 0.97 },
                { text: "An O of n squared algorithm would perform a trillion operations.", timestamp: 145.3, confidence: 0.96 },
                { text: "But an O of n log n algorithm would only perform about 20 million operations.", timestamp: 152.7, confidence: 0.95 },
                { text: "That's the difference between a few seconds and several days of processing time.", timestamp: 160.8, confidence: 0.96 },
                { text: "When analyzing algorithms, we focus on the worst-case scenario.", timestamp: 168.4, confidence: 0.97 },
                { text: "This gives us a guarantee about the maximum time an algorithm will take.", timestamp: 174.9, confidence: 0.96 },
                { text: "However, we also consider average-case and best-case complexities in some situations.", timestamp: 181.7, confidence: 0.95 },
                { text: "For your homework, I want you to analyze the time complexity of three algorithms.", timestamp: 189.3, confidence: 0.96 },
                { text: "You'll find them in the assignment posted on Canvas.", timestamp: 196.5, confidence: 0.97 },
                { text: "Make sure to explain your reasoning for each one.", timestamp: 202.8, confidence: 0.98 },
                { text: "Next class, we'll dive into space complexity and discuss the time-space tradeoff.", timestamp: 208.6, confidence: 0.96 },
                { text: "Remember, efficient algorithms are the foundation of scalable software.", timestamp: 216.9, confidence: 0.97 },
                { text: "Any questions before we break?", timestamp: 223.4, confidence: 0.98 },
                { text: "No? Alright, see you all on Wednesday.", timestamp: 227.8, confidence: 0.97 }
            ]
        }
    },
    {
        subject: "Psychology",
        gradeLevel: "College - PSYCH 201",
        qualityScore: 9,
        description: "Cognitive psychology lecture on memory systems",
        durationSeconds: 210,
        dialog: {
            transcriptions: [
                { text: "Welcome back. Today we're exploring the different types of memory systems in the human brain.", timestamp: 0, confidence: 0.97 },
                { text: "We'll look at sensory memory, short-term memory, and long-term memory.", timestamp: 6.9, confidence: 0.96 },
                { text: "Let's start with sensory memory, which is the briefest form of memory.", timestamp: 13.5, confidence: 0.97 },
                { text: "Sensory memory holds information from our senses for just a fraction of a second.", timestamp: 19.8, confidence: 0.96 },
                { text: "There are different types for each sense: iconic for visual, echoic for auditory.", timestamp: 26.7, confidence: 0.95 },
                { text: "This allows us to perceive the world as continuous rather than as discrete snapshots.", timestamp: 34.2, confidence: 0.96 },
                { text: "Next is short-term memory, also called working memory.", timestamp: 41.6, confidence: 0.98 },
                { text: "This is where we hold information temporarily while we're actively using it.", timestamp: 47.3, confidence: 0.97 },
                { text: "George Miller's famous research found that we can hold about 7 plus or minus 2 items.", timestamp: 54.1, confidence: 0.95 },
                { text: "However, more recent studies suggest the number is closer to 4 chunks of information.", timestamp: 61.8, confidence: 0.96 },
                { text: "Working memory is crucial for reasoning, comprehension, and learning.", timestamp: 69.3, confidence: 0.97 },
                { text: "Now, long-term memory is where things get really interesting.", timestamp: 76.1, confidence: 0.98 },
                { text: "This system has virtually unlimited capacity and can store information for years or even a lifetime.", timestamp: 82.5, confidence: 0.96 },
                { text: "We divide long-term memory into two main categories: explicit and implicit.", timestamp: 91.2, confidence: 0.97 },
                { text: "Explicit memory, also called declarative memory, involves conscious recollection.", timestamp: 98.4, confidence: 0.96 },
                { text: "It includes episodic memory, which is memory for personal experiences and events.", timestamp: 105.7, confidence: 0.95 },
                { text: "And semantic memory, which is memory for facts and general knowledge.", timestamp: 112.9, confidence: 0.97 },
                { text: "For example, remembering your first day of college is episodic memory.", timestamp: 119.6, confidence: 0.96 },
                { text: "Knowing that Paris is the capital of France is semantic memory.", timestamp: 126.3, confidence: 0.97 },
                { text: "Implicit memory, or non-declarative memory, operates without conscious awareness.", timestamp: 133.1, confidence: 0.96 },
                { text: "This includes procedural memory, like knowing how to ride a bike or type on a keyboard.", timestamp: 140.5, confidence: 0.95 },
                { text: "You can't easily explain these skills in words, but your body knows how to do them.", timestamp: 148.7, confidence: 0.96 },
                { text: "The hippocampus plays a critical role in forming new explicit memories.", timestamp: 156.2, confidence: 0.97 },
                { text: "This was famously demonstrated by the case of patient H.M., who had his hippocampus removed.", timestamp: 163.5, confidence: 0.94 },
                { text: "After surgery, he could no longer form new long-term explicit memories.", timestamp: 171.8, confidence: 0.96 },
                { text: "However, his implicit memory remained intact, and he could still learn new motor skills.", timestamp: 178.6, confidence: 0.95 },
                { text: "Understanding these memory systems has important implications for education and learning strategies.", timestamp: 186.9, confidence: 0.96 },
                { text: "We'll discuss those applications in our next lecture.", timestamp: 194.8, confidence: 0.97 },
                { text: "For Thursday, please read chapter 7 on memory consolidation.", timestamp: 200.5, confidence: 0.98 },
                { text: "That's all for today. Have a great rest of your day.", timestamp: 206.2, confidence: 0.97 }
            ]
        }
    },
    {
        subject: "Biology",
        gradeLevel: "11th Grade",
        qualityScore: 9,
        description: "Comprehensive lecture on cellular respiration with clear explanations and examples",
        durationSeconds: 900,
        dialog: {
            transcriptions: [
                { text: "Good morning everyone. Today we're going to dive deep into cellular respiration.", timestamp: 0, confidence: 0.98 },
                { text: "This is one of the most fundamental processes in biology, so pay close attention.", timestamp: 6.5, confidence: 0.97 },
                { text: "Let's start by defining what cellular respiration actually is.", timestamp: 13.2, confidence: 0.98 },
                { text: "It's the process by which cells break down glucose to produce ATP, or adenosine triphosphate.", timestamp: 19.8, confidence: 0.96 },
                { text: "ATP is the energy currency of the cell. Without it, cells can't function.", timestamp: 28.4, confidence: 0.97 },
                { text: "The overall equation for cellular respiration is quite simple on the surface.", timestamp: 35.7, confidence: 0.98 },
                { text: "Glucose plus oxygen yields carbon dioxide, water, and ATP.", timestamp: 42.3, confidence: 0.97 },
                { text: "But the actual process involves three main stages, and it's quite complex.", timestamp: 49.6, confidence: 0.96 },
                { text: "The first stage is glycolysis, which literally means splitting sugar.", timestamp: 56.8, confidence: 0.98 },
                { text: "This occurs in the cytoplasm of the cell, not in the mitochondria.", timestamp: 63.4, confidence: 0.97 },
                { text: "During glycolysis, one molecule of glucose, which has six carbons, is split into two molecules of pyruvate.", timestamp: 70.9, confidence: 0.95 },
                { text: "Each pyruvate has three carbons. This process produces a net gain of two ATP molecules.", timestamp: 80.3, confidence: 0.96 },
                { text: "It also produces two NADH molecules, which are electron carriers we'll talk more about later.", timestamp: 88.7, confidence: 0.95 },
                { text: "Now, something important to note: glycolysis doesn't require oxygen.", timestamp: 97.2, confidence: 0.97 },
                { text: "It's an anaerobic process, meaning it can happen without oxygen present.", timestamp: 104.1, confidence: 0.96 },
                { text: "This is why some organisms can survive in oxygen-poor environments using only glycolysis.", timestamp: 111.6, confidence: 0.95 },
                { text: "However, they don't get nearly as much ATP as organisms that can do the full respiration process.", timestamp: 120.3, confidence: 0.94 },
                { text: "After glycolysis, if oxygen is present, the pyruvate molecules enter the mitochondria.", timestamp: 129.8, confidence: 0.96 },
                { text: "Before entering the Krebs cycle, pyruvate goes through a transition reaction.", timestamp: 137.4, confidence: 0.97 },
                { text: "Each pyruvate loses a carbon dioxide molecule and combines with coenzyme A to form acetyl-CoA.", timestamp: 145.6, confidence: 0.94 },
                { text: "This step also produces one NADH per pyruvate, so two NADH total since we started with two pyruvates.", timestamp: 155.9, confidence: 0.93 },
                { text: "Now we enter the Krebs cycle, also called the citric acid cycle or the TCA cycle.", timestamp: 165.7, confidence: 0.96 },
                { text: "This cycle occurs in the mitochondrial matrix, the inner compartment of the mitochondria.", timestamp: 174.2, confidence: 0.95 },
                { text: "The acetyl-CoA, which has two carbons, combines with a four-carbon molecule called oxaloacetate.", timestamp: 182.8, confidence: 0.94 },
                { text: "This forms a six-carbon molecule called citrate, which is why it's called the citric acid cycle.", timestamp: 192.6, confidence: 0.95 },
                { text: "Through a series of reactions, the citrate molecule is gradually broken down.", timestamp: 201.3, confidence: 0.96 },
                { text: "As it goes through the cycle, it releases two carbon dioxide molecules.", timestamp: 208.7, confidence: 0.97 },
                { text: "It also produces three NADH, one FADH2, and one ATP per turn of the cycle.", timestamp: 216.4, confidence: 0.94 },
                { text: "Remember, since we have two acetyl-CoA molecules from the original glucose, the cycle turns twice.", timestamp: 225.8, confidence: 0.93 },
                { text: "So we get six NADH, two FADH2, and two ATP from the Krebs cycle total.", timestamp: 235.1, confidence: 0.94 },
                { text: "The cycle then regenerates the oxaloacetate so it can combine with another acetyl-CoA.", timestamp: 243.9, confidence: 0.95 },
                { text: "This is why it's called a cycle - the starting molecule is regenerated at the end.", timestamp: 252.3, confidence: 0.96 },
                { text: "Now, at this point, we've only made four ATP total. That's not much energy.", timestamp: 260.8, confidence: 0.97 },
                { text: "The real energy payoff comes from the third stage: the electron transport chain.", timestamp: 268.4, confidence: 0.96 },
                { text: "This occurs in the inner mitochondrial membrane, in structures called cristae.", timestamp: 276.7, confidence: 0.95 },
                { text: "Remember all those NADH and FADH2 molecules we produced? This is where they become crucial.", timestamp: 285.3, confidence: 0.94 },
                { text: "NADH and FADH2 are electron carriers. They carry high-energy electrons to the electron transport chain.", timestamp: 294.8, confidence: 0.95 },
                { text: "The electron transport chain consists of four protein complexes embedded in the inner membrane.", timestamp: 304.6, confidence: 0.94 },
                { text: "As electrons move through these complexes, energy is released.", timestamp: 312.7, confidence: 0.96 },
                { text: "This energy is used to pump hydrogen ions, or protons, from the matrix into the intermembrane space.", timestamp: 320.3, confidence: 0.93 },
                { text: "This creates a concentration gradient, with more protons in the intermembrane space than in the matrix.", timestamp: 330.8, confidence: 0.92 },
                { text: "This gradient represents stored potential energy, like water behind a dam.", timestamp: 339.7, confidence: 0.95 },
                { text: "The protons want to flow back into the matrix, down their concentration gradient.", timestamp: 347.4, confidence: 0.96 },
                { text: "They can only do this through a special enzyme called ATP synthase.", timestamp: 355.1, confidence: 0.97 },
                { text: "As the protons flow through ATP synthase, the enzyme spins like a turbine.", timestamp: 362.8, confidence: 0.95 },
                { text: "This spinning provides the energy to attach phosphate groups to ADP, forming ATP.", timestamp: 370.9, confidence: 0.94 },
                { text: "This process is called chemiosmosis, and it's how most ATP is generated.", timestamp: 379.4, confidence: 0.96 },
                { text: "At the end of the electron transport chain, the electrons combine with oxygen and protons to form water.", timestamp: 388.2, confidence: 0.93 },
                { text: "This is why we need oxygen for cellular respiration. It's the final electron acceptor.", timestamp: 397.6, confidence: 0.95 },
                { text: "Without oxygen, the electron transport chain stops, and the whole process backs up.", timestamp: 406.1, confidence: 0.94 },
                { text: "Now let's count up the total ATP yield from one molecule of glucose.", timestamp: 414.7, confidence: 0.97 },
                { text: "From glycolysis, we get 2 ATP directly, plus 2 NADH.", timestamp: 422.3, confidence: 0.96 },
                { text: "From the transition reaction, we get 2 NADH.", timestamp: 429.1, confidence: 0.97 },
                { text: "From the Krebs cycle, we get 2 ATP directly, plus 6 NADH and 2 FADH2.", timestamp: 436.8, confidence: 0.94 },
                { text: "That's 4 ATP made directly, plus 10 NADH and 2 FADH2 total.", timestamp: 446.2, confidence: 0.95 },
                { text: "Each NADH that goes through the electron transport chain produces approximately 2.5 ATP.", timestamp: 454.9, confidence: 0.93 },
                { text: "Each FADH2 produces approximately 1.5 ATP.", timestamp: 463.1, confidence: 0.95 },
                { text: "So 10 NADH gives us 25 ATP, and 2 FADH2 gives us 3 ATP.", timestamp: 470.7, confidence: 0.94 },
                { text: "Add the 4 ATP made directly, and we get about 32 ATP total from one glucose molecule.", timestamp: 480.3, confidence: 0.93 },
                { text: "Some textbooks say 36 or 38, but 32 is the more accurate modern calculation.", timestamp: 489.8, confidence: 0.94 },
                { text: "The difference comes from the energy cost of transporting molecules across membranes.", timestamp: 498.4, confidence: 0.95 },
                { text: "Now, let's talk about what happens when oxygen isn't available.", timestamp: 506.9, confidence: 0.96 },
                { text: "This is called anaerobic respiration or fermentation.", timestamp: 514.2, confidence: 0.97 },
                { text: "In this case, glycolysis can still occur, producing 2 ATP.", timestamp: 521.6, confidence: 0.96 },
                { text: "But the pyruvate can't enter the mitochondria and go through the Krebs cycle.", timestamp: 529.3, confidence: 0.95 },
                { text: "Instead, the cell needs to regenerate NAD+ so glycolysis can continue.", timestamp: 537.8, confidence: 0.94 },
                { text: "In muscle cells during intense exercise, pyruvate is converted to lactic acid.", timestamp: 546.1, confidence: 0.95 },
                { text: "This is lactic acid fermentation. It regenerates NAD+ but doesn't produce any ATP.", timestamp: 554.7, confidence: 0.94 },
                { text: "The lactic acid buildup is what causes that burning sensation in your muscles.", timestamp: 563.2, confidence: 0.96 },
                { text: "Yeast and some bacteria use alcoholic fermentation instead.", timestamp: 571.3, confidence: 0.97 },
                { text: "They convert pyruvate to ethanol and carbon dioxide, also regenerating NAD+.", timestamp: 578.9, confidence: 0.95 },
                { text: "This is the process used to make bread rise and to produce alcoholic beverages.", timestamp: 587.4, confidence: 0.96 },
                { text: "Fermentation is much less efficient than aerobic respiration - only 2 ATP versus about 32.", timestamp: 596.8, confidence: 0.93 },
                { text: "This is why aerobic organisms are generally more successful and can be more active.", timestamp: 606.2, confidence: 0.95 },
                { text: "Let me show you a diagram on the board that summarizes all three stages.", timestamp: 614.7, confidence: 0.96 },
                { text: "[Sound of drawing on board]", timestamp: 621.3, confidence: 0.88 },
                { text: "Here's the glucose entering the cell and going through glycolysis in the cytoplasm.", timestamp: 628.9, confidence: 0.94 },
                { text: "Then pyruvate enters the mitochondria for the transition and Krebs cycle.", timestamp: 637.4, confidence: 0.95 },
                { text: "And finally, the electron transport chain in the inner membrane producing most of the ATP.", timestamp: 645.8, confidence: 0.93 },
                { text: "Notice how the mitochondria have two membranes. This is crucial for the process.", timestamp: 654.7, confidence: 0.95 },
                { text: "The intermembrane space between them is where protons accumulate.", timestamp: 662.3, confidence: 0.96 },
                { text: "Some diseases are caused by defects in mitochondrial function.", timestamp: 670.1, confidence: 0.97 },
                { text: "These are called mitochondrial diseases, and they often affect muscles and the brain.", timestamp: 677.8, confidence: 0.95 },
                { text: "These tissues require lots of energy, so they're most affected when ATP production is impaired.", timestamp: 686.9, confidence: 0.94 },
                { text: "Interestingly, mitochondria have their own DNA, separate from nuclear DNA.", timestamp: 696.2, confidence: 0.96 },
                { text: "This supports the endosymbiotic theory, which suggests mitochondria were once independent bacteria.", timestamp: 704.8, confidence: 0.93 },
                { text: "They were engulfed by early eukaryotic cells and formed a symbiotic relationship.", timestamp: 714.3, confidence: 0.94 },
                { text: "The host cell provided protection and nutrients, while the mitochondria provided ATP.", timestamp: 723.1, confidence: 0.95 },
                { text: "Over millions of years, they became inseparable parts of eukaryotic cells.", timestamp: 731.7, confidence: 0.96 },
                { text: "Chloroplasts in plant cells have a similar evolutionary origin.", timestamp: 739.4, confidence: 0.97 },
                { text: "Now, for your homework, I want you to create a flowchart showing all the inputs and outputs.", timestamp: 747.2, confidence: 0.95 },
                { text: "For each stage - glycolysis, Krebs cycle, and electron transport chain.", timestamp: 756.8, confidence: 0.96 },
                { text: "Include the number of carbons in each molecule, and track the ATP, NADH, and FADH2 produced.", timestamp: 765.3, confidence: 0.93 },
                { text: "Also, read chapter 9 in your textbook. It has excellent diagrams.", timestamp: 775.2, confidence: 0.96 },
                { text: "We'll have a quiz on Friday covering everything we discussed today.", timestamp: 783.1, confidence: 0.97 },
                { text: "On Monday, we'll start photosynthesis, which is basically cellular respiration in reverse.", timestamp: 791.6, confidence: 0.95 },
                { text: "Any questions before we finish?", timestamp: 799.8, confidence: 0.98 },
                { text: "[Student] Will the quiz be multiple choice or short answer?", timestamp: 805.3, confidence: 0.92 },
                { text: "It'll be a mix of both, plus one diagram you'll need to label.", timestamp: 812.7, confidence: 0.96 },
                { text: "Anything else? No? Alright, have a great day everyone. See you Wednesday.", timestamp: 821.4, confidence: 0.97 },
                { text: "[Sound of students packing up]", timestamp: 829.8, confidence: 0.84 }
            ]
        }
    }
]

// Transcriptions with background noise (e.g., chatter, outdoor sounds)
export const noisyEnvironmentSamples: ClassroomDialogSample[] = [
    {
        subject: "Physical Education",
        gradeLevel: "8th Grade",
        qualityScore: 5,
        description: "Outdoor soccer instruction with wind and ambient noise",
        durationSeconds: 90,
        dialog: {
            transcriptions: [
                { text: "Alright team, gather around!", timestamp: 0, confidence: 0.72 },
                { text: "can barely hear", timestamp: 2.5, confidence: 0.31 },
                { text: "Today we're working on passing drills.", timestamp: 5.8, confidence: 0.68 },
                { text: "", timestamp: 9.2, confidence: 0.15 },
                { text: "I want you to focus on using the inside of your foot.", timestamp: 11.5, confidence: 0.75 },
                { text: "noise", timestamp: 17.3, confidence: 0.28 },
                { text: "Keep your ankle locked and follow through.", timestamp: 19.7, confidence: 0.71 },
                { text: "Can we start?", timestamp: 24.8, confidence: 0.54 },
                { text: "Yes, let's get into pairs.", timestamp: 26.9, confidence: 0.69 },
                { text: "wind noise", timestamp: 30.5, confidence: 0.22 },
                { text: "Start about 10 yards apart.", timestamp: 33.2, confidence: 0.66 },
                { text: "traffic sound", timestamp: 38.1, confidence: 0.19 },
                { text: "Pass it back and forth, nice and controlled.", timestamp: 40.8, confidence: 0.73 },
                { text: "Good job, Marcus!", timestamp: 46.5, confidence: 0.78 },
                { text: "birds chirping", timestamp: 49.2, confidence: 0.25 },
                { text: "Sarah, remember to plant your non-kicking foot next to the ball.", timestamp: 52.7, confidence: 0.64 },
                { text: "distant voices", timestamp: 59.3, confidence: 0.33 },
                { text: "Excellent! Now let's add some movement.", timestamp: 62.5, confidence: 0.76 },
                { text: "One person jogs, the other passes to them.", timestamp: 68.2, confidence: 0.71 },
                { text: "car horn", timestamp: 73.8, confidence: 0.18 },
                { text: "Try to lead them with the pass.", timestamp: 76.4, confidence: 0.67 },
                { text: "wind gust", timestamp: 81.7, confidence: 0.21 },
                { text: "Great work everyone! Keep practicing!", timestamp: 84.9, confidence: 0.74 }
            ]
        }
    },
    {
        subject: "English",
        gradeLevel: "6th Grade",
        qualityScore: 6,
        description: "Reading discussion with classroom chatter",
        durationSeconds: 120,
        dialog: {
            transcriptions: [
                { text: "Everyone, please settle down and open your books to chapter 5.", timestamp: 0, confidence: 0.81 },
                { text: "shuffling papers", timestamp: 5.3, confidence: 0.29 },
                { text: "We're going to discuss the main character's decision.", timestamp: 8.7, confidence: 0.79 },
                { text: "whispers", timestamp: 14.2, confidence: 0.24 },
                { text: "Jake, what did you think about what Maya did?", timestamp: 16.8, confidence: 0.76 },
                { text: "Um, I thought she was brave.", timestamp: 21.5, confidence: 0.73 },
                { text: "background talking", timestamp: 25.9, confidence: 0.31 },
                { text: "Brave how? Can you elaborate?", timestamp: 28.3, confidence: 0.77 },
                { text: "She stood up to the bully even though she was scared.", timestamp: 32.6, confidence: 0.71 },
                { text: "desk scraping", timestamp: 38.4, confidence: 0.26 },
                { text: "Good point. Did anyone else notice something interesting?", timestamp: 41.2, confidence: 0.74 },
                { text: "coughing", timestamp: 47.8, confidence: 0.22 },
                { text: "I noticed she asked her friends for help first.", timestamp: 50.5, confidence: 0.69 },
                { text: "Excellent observation, Lily!", timestamp: 56.2, confidence: 0.82 },
                { text: "That shows she values friendship.", timestamp: 59.7, confidence: 0.78 },
                { text: "door opening", timestamp: 64.3, confidence: 0.28 },
                { text: "What do you think the author is trying to teach us?", timestamp: 67.9, confidence: 0.75 },
                { text: "pencil dropping", timestamp: 74.6, confidence: 0.19 },
                { text: "That you don't have to face problems alone?", timestamp: 77.3, confidence: 0.68 },
                { text: "sniffling", timestamp: 83.1, confidence: 0.23 },
                { text: "Yes, and that courage comes in many forms.", timestamp: 86.5, confidence: 0.79 },
                { text: "classroom noise", timestamp: 92.8, confidence: 0.31 },
                { text: "For tomorrow, I want you to write a paragraph about a time you showed courage.", timestamp: 96.2, confidence: 0.73 },
                { text: "zipper sound", timestamp: 104.7, confidence: 0.25 },
                { text: "Make sure it's at least half a page.", timestamp: 107.5, confidence: 0.77 },
                { text: "chairs moving", timestamp: 113.2, confidence: 0.27 },
                { text: "Alright, you can start packing up.", timestamp: 116.8, confidence: 0.81 }
            ]
        }
    },
    {
        subject: "Art",
        gradeLevel: "4th Grade",
        qualityScore: 6,
        description: "Art class with music and activity sounds",
        durationSeconds: 60,
        dialog: {
            transcriptions: [
                { text: "Today we're making collages about our favorite things!", timestamp: 0, confidence: 0.84 },
                { text: "soft music playing", timestamp: 4.8, confidence: 0.32 },
                { text: "You can use magazines, colored paper, and markers.", timestamp: 7.5, confidence: 0.78 },
                { text: "scissors cutting", timestamp: 13.9, confidence: 0.28 },
                { text: "Remember to be creative and have fun with it.", timestamp: 16.7, confidence: 0.81 },
                { text: "glue bottle sound", timestamp: 22.4, confidence: 0.24 },
                { text: "Tommy, that's a great choice of colors!", timestamp: 25.8, confidence: 0.76 },
                { text: "paper tearing", timestamp: 31.5, confidence: 0.29 },
                { text: "If you need more supplies, they're on the back table.", timestamp: 34.9, confidence: 0.74 },
                { text: "chair sliding", timestamp: 41.2, confidence: 0.26 },
                { text: "Emma, I love how you're arranging those pictures!", timestamp: 44.6, confidence: 0.79 },
                { text: "music continues", timestamp: 50.3, confidence: 0.31 },
                { text: "We have about 15 more minutes to finish up.", timestamp: 53.7, confidence: 0.77 }
            ]
        }
    },
    {
        subject: "Economics",
        gradeLevel: "College - ECON 301",
        qualityScore: 6,
        description: "Outdoor economics seminar with construction noise nearby",
        durationSeconds: 180,
        dialog: {
            transcriptions: [
                { text: "Since it's such a nice day, let's have our discussion about supply and demand outside.", timestamp: 0, confidence: 0.82 },
                { text: "distant construction noise", timestamp: 7.3, confidence: 0.29 },
                { text: "Everyone grab a seat on the lawn.", timestamp: 10.6, confidence: 0.78 },
                { text: "lawnmower in distance", timestamp: 15.8, confidence: 0.24 },
                { text: "Let's talk about elasticity of demand.", timestamp: 19.2, confidence: 0.76 },
                { text: "Who can explain what price elasticity means?", timestamp: 24.7, confidence: 0.73 },
                { text: "drilling sound", timestamp: 29.5, confidence: 0.21 },
                { text: "It measures how responsive quantity demanded is to price changes.", timestamp: 33.8, confidence: 0.71 },
                { text: "Exactly. When demand is elastic, a small price change causes", timestamp: 40.6, confidence: 0.74 },
                { text: "jackhammer", timestamp: 47.2, confidence: 0.18 },
                { text: "a large change in quantity demanded.", timestamp: 49.8, confidence: 0.69 },
                { text: "Can anyone give me an example of elastic demand?", timestamp: 54.5, confidence: 0.77 },
                { text: "birds chirping", timestamp: 60.3, confidence: 0.31 },
                { text: "Luxury goods, like designer handbags.", timestamp: 63.7, confidence: 0.72 },
                { text: "Good example. What about inelastic demand?", timestamp: 69.4, confidence: 0.79 },
                { text: "truck passing", timestamp: 74.8, confidence: 0.22 },
                { text: "Necessities like insulin or gasoline.", timestamp: 78.2, confidence: 0.75 },
                { text: "Right. People need these regardless of price fluctuations.", timestamp: 84.6, confidence: 0.73 },
                { text: "construction noise intensifies", timestamp: 91.1, confidence: 0.26 },
                { text: "Now let's consider how businesses use this information.", timestamp: 95.7, confidence: 0.71 },
                { text: "If you're selling an elastic good, lowering prices", timestamp: 102.3, confidence: 0.68 },
                { text: "wind rustling", timestamp: 108.5, confidence: 0.28 },
                { text: "can significantly increase revenue through higher volume.", timestamp: 112.8, confidence: 0.74 },
                { text: "But for inelastic goods, you can raise prices", timestamp: 119.7, confidence: 0.76 },
                { text: "siren in distance", timestamp: 125.4, confidence: 0.23 },
                { text: "without losing many customers.", timestamp: 128.9, confidence: 0.72 },
                { text: "This is why pharmaceutical companies can charge high prices.", timestamp: 134.6, confidence: 0.77 },
                { text: "students chatting", timestamp: 141.2, confidence: 0.34 },
                { text: "The cross-price elasticity is also important to understand.", timestamp: 145.8, confidence: 0.69 },
                { text: "This measures how demand for one good changes", timestamp: 152.3, confidence: 0.73 },
                { text: "construction beeping", timestamp: 158.1, confidence: 0.19 },
                { text: "when the price of another good changes.", timestamp: 161.5, confidence: 0.71 },
                { text: "Substitute goods have positive cross-price elasticity.", timestamp: 167.8, confidence: 0.75 },
                { text: "plane overhead", timestamp: 174.2, confidence: 0.27 },
                { text: "Alright, let's head back inside to finish up.", timestamp: 177.9, confidence: 0.78 }
            ]
        }
    },
    {
        subject: "Literature",
        gradeLevel: "College - ENG 315",
        qualityScore: 6,
        description: "Discussion seminar in busy student center with ambient noise",
        durationSeconds: 150,
        dialog: {
            transcriptions: [
                { text: "Let's discuss the symbolism in The Great Gatsby.", timestamp: 0, confidence: 0.81 },
                { text: "coffee machine grinding", timestamp: 5.2, confidence: 0.26 },
                { text: "The green light is obviously significant. What does it represent?", timestamp: 8.9, confidence: 0.76 },
                { text: "background conversations", timestamp: 15.4, confidence: 0.32 },
                { text: "Gatsby's dreams and hopes, especially for Daisy.", timestamp: 19.1, confidence: 0.74 },
                { text: "chair scraping", timestamp: 25.7, confidence: 0.24 },
                { text: "Good. It's also about the American Dream itself.", timestamp: 28.6, confidence: 0.79 },
                { text: "The unattainable nature of it.", timestamp: 34.2, confidence: 0.77 },
                { text: "people walking by", timestamp: 38.9, confidence: 0.29 },
                { text: "Exactly. What about the eyes of Doctor T.J. Eckleburg?", timestamp: 42.5, confidence: 0.73 },
                { text: "dishes clattering", timestamp: 49.3, confidence: 0.21 },
                { text: "They're like the eyes of God watching over the moral wasteland.", timestamp: 52.8, confidence: 0.71 },
                { text: "Interesting interpretation. The billboard represents", timestamp: 59.6, confidence: 0.78 },
                { text: "group laughter nearby", timestamp: 65.2, confidence: 0.33 },
                { text: "the loss of spiritual values in the 1920s.", timestamp: 68.9, confidence: 0.72 },
                { text: "phone ringing", timestamp: 75.4, confidence: 0.23 },
                { text: "The Valley of Ashes is another crucial symbol.", timestamp: 79.1, confidence: 0.77 },
                { text: "It represents the moral and social decay", timestamp: 85.3, confidence: 0.75 },
                { text: "music playing", timestamp: 90.8, confidence: 0.28 },
                { text: "hidden beneath the glamorous surface of the era.", timestamp: 94.5, confidence: 0.73 },
                { text: "The contrast between East Egg and West Egg is also symbolic.", timestamp: 101.2, confidence: 0.76 },
                { text: "announcements over PA", timestamp: 108.6, confidence: 0.31 },
                { text: "Old money versus new money, inherited wealth versus earned wealth.", timestamp: 112.9, confidence: 0.74 },
                { text: "door opening and closing", timestamp: 120.5, confidence: 0.27 },
                { text: "Fitzgerald uses these symbols to critique American society.", timestamp: 124.8, confidence: 0.78 },
                { text: "The parties at Gatsby's mansion represent", timestamp: 131.4, confidence: 0.76 },
                { text: "footsteps", timestamp: 137.1, confidence: 0.25 },
                { text: "the emptiness and superficiality of the upper class.", timestamp: 140.6, confidence: 0.72 },
                { text: "For next time, think about the significance of the season changes in the novel.", timestamp: 147.3, confidence: 0.77 }
            ]
        }
    }
]

// Transcriptions with overlapping speech from multiple speakers
export const overlappingSpeechSamples: ClassroomDialogSample[] = [
    {
        subject: "Science",
        gradeLevel: "9th Grade",
        qualityScore: 4,
        description: "Group discussion about climate change with multiple students talking",
        durationSeconds: 150,
        dialog: {
            transcriptions: [
                { text: "Let's talk about the causes of climate change.", timestamp: 0, confidence: 0.88 },
                { text: "Who wants to start? Yes, Alex and", timestamp: 4.5, confidence: 0.62 },
                { text: "fossil fuels carbon dioxide", timestamp: 7.8, confidence: 0.47 },
                { text: "Right, but also deforestation", timestamp: 9.2, confidence: 0.51 },
                { text: "Okay, one at a time please. Alex, you go first.", timestamp: 11.6, confidence: 0.79 },
                { text: "Burning fossil fuels releases carbon dioxide into the atmosphere.", timestamp: 16.3, confidence: 0.84 },
                { text: "and methane from", timestamp: 22.7, confidence: 0.43 },
                { text: "Hold on, let Alex finish.", timestamp: 24.9, confidence: 0.81 },
                { text: "This traps heat and causes global warming.", timestamp: 27.8, confidence: 0.86 },
                { text: "Good. Now, Sarah, what were you saying?", timestamp: 32.5, confidence: 0.83 },
                { text: "Methane from agriculture and livestock", timestamp: 36.2, confidence: 0.77 },
                { text: "also transportation", timestamp: 38.9, confidence: 0.54 },
                { text: "Yes, that's another source but", timestamp: 40.7, confidence: 0.68 },
                { text: "and factories too", timestamp: 42.3, confidence: 0.59 },
                { text: "Everyone, please raise your hand if you want to speak.", timestamp: 44.8, confidence: 0.82 },
                { text: "Marcus, go ahead.", timestamp: 50.2, confidence: 0.87 },
                { text: "Industrial processes and factories emit lots of greenhouse gases.", timestamp: 53.7, confidence: 0.81 },
                { text: "what about cars", timestamp: 59.4, confidence: 0.49 },
                { text: "Let him finish.", timestamp: 61.1, confidence: 0.83 },
                { text: "especially in developing countries where regulations are weaker.", timestamp: 63.8, confidence: 0.76 },
                { text: "But developed countries pollute more per person", timestamp: 69.7, confidence: 0.63 },
                { text: "That's true historically", timestamp: 72.1, confidence: 0.71 },
                { text: "Both points are valid. Emily, your turn.", timestamp: 74.9, confidence: 0.84 },
                { text: "Transportation, especially cars and planes, contributes significantly.", timestamp: 79.6, confidence: 0.82 },
                { text: "electric vehicles though", timestamp: 85.8, confidence: 0.52 },
                { text: "but the electricity still", timestamp: 87.4, confidence: 0.46 },
                { text: "One person at a time! Josh?", timestamp: 89.9, confidence: 0.79 },
                { text: "Electric vehicles are better, but we need to consider where the electricity comes from.", timestamp: 94.3, confidence: 0.78 },
                { text: "renewable energy solar wind", timestamp: 101.2, confidence: 0.58 },
                { text: "If it's from coal plants, it's not much better.", timestamp: 103.8, confidence: 0.81 },
                { text: "Exactly. That's why we need renewable energy sources.", timestamp: 108.5, confidence: 0.85 },
                { text: "what can we do about it", timestamp: 114.3, confidence: 0.64 },
                { text: "reduce reuse recycle", timestamp: 116.1, confidence: 0.57 },
                { text: "Good question, but let's finish discussing causes first.", timestamp: 118.7, confidence: 0.83 },
                { text: "Deforestation is important too", timestamp: 123.9, confidence: 0.74 },
                { text: "trees absorb carbon", timestamp: 126.2, confidence: 0.68 },
                { text: "Yes! Trees absorb CO2, so cutting them down makes things worse.", timestamp: 128.6, confidence: 0.82 },
                { text: "especially rainforests", timestamp: 134.8, confidence: 0.71 },
                { text: "The Amazon is crucial for", timestamp: 137.2, confidence: 0.66 },
                { text: "Alright, let's summarize what we've learned.", timestamp: 140.5, confidence: 0.86 },
                { text: "Multiple factors contribute to climate change, and they're all interconnected.", timestamp: 145.8, confidence: 0.84 }
            ]
        }
    },
    {
        subject: "Social Studies",
        gradeLevel: "7th Grade",
        qualityScore: 5,
        description: "Debate about school uniforms with students interrupting",
        durationSeconds: 100,
        dialog: {
            transcriptions: [
                { text: "Today's debate topic is should schools require uniforms?", timestamp: 0, confidence: 0.89 },
                { text: "Team A will argue for uniforms, Team B against.", timestamp: 5.4, confidence: 0.86 },
                { text: "Team A, you start.", timestamp: 10.2, confidence: 0.91 },
                { text: "Uniforms promote equality because everyone", timestamp: 13.7, confidence: 0.72 },
                { text: "but they're expensive", timestamp: 16.9, confidence: 0.54 },
                { text: "Wait for your turn, Team B.", timestamp: 18.8, confidence: 0.84 },
                { text: "wears the same thing, so there's less bullying about clothes.", timestamp: 21.5, confidence: 0.77 },
                { text: "They also help with school identity and pride.", timestamp: 27.3, confidence: 0.81 },
                { text: "what about self-expression", timestamp: 32.6, confidence: 0.59 },
                { text: "not their turn yet", timestamp: 34.2, confidence: 0.48 },
                { text: "Team B, your rebuttal.", timestamp: 36.5, confidence: 0.88 },
                { text: "Uniforms are expensive and not all families can afford", timestamp: 40.1, confidence: 0.75 },
                { text: "but they last longer", timestamp: 45.8, confidence: 0.52 },
                { text: "multiple sets throughout the year.", timestamp: 47.6, confidence: 0.69 },
                { text: "They also suppress individuality and creativity.", timestamp: 52.9, confidence: 0.79 },
                { text: "Students should be able to express themselves through clothing.", timestamp: 58.4, confidence: 0.82 },
                { text: "within reason though", timestamp: 64.2, confidence: 0.56 },
                { text: "dress codes exist anyway", timestamp: 65.9, confidence: 0.61 },
                { text: "Team A, your response?", timestamp: 68.3, confidence: 0.87 },
                { text: "There are other ways to express creativity like art, music, and", timestamp: 72.8, confidence: 0.74 },
                { text: "not the same thing", timestamp: 78.1, confidence: 0.51 },
                { text: "writing. Uniforms remove distractions and help students focus on learning.", timestamp: 80.5, confidence: 0.76 },
                { text: "studies show no difference", timestamp: 87.3, confidence: 0.58 },
                { text: "Team B, final statement?", timestamp: 89.7, confidence: 0.85 },
                { text: "Research is mixed on academic benefits, but the impact on students' autonomy is clear.", timestamp: 94.2, confidence: 0.78 }
            ]
        }
    },
    {
        subject: "Math",
        gradeLevel: "11th Grade",
        qualityScore: 5,
        description: "Group problem-solving session with overlapping discussions",
        durationSeconds: 75,
        dialog: {
            transcriptions: [
                { text: "Work in your groups to solve problem number 12.", timestamp: 0, confidence: 0.87 },
                { text: "It's a quadratic equation, so", timestamp: 4.8, confidence: 0.73 },
                { text: "use the formula", timestamp: 7.1, confidence: 0.64 },
                { text: "or factor it", timestamp: 8.6, confidence: 0.58 },
                { text: "Let's try factoring first.", timestamp: 10.9, confidence: 0.79 },
                { text: "It's x squared plus 5x plus 6", timestamp: 15.3, confidence: 0.81 },
                { text: "that factors to", timestamp: 19.7, confidence: 0.67 },
                { text: "x plus 2 times x plus 3", timestamp: 21.5, confidence: 0.72 },
                { text: "no wait", timestamp: 24.8, confidence: 0.55 },
                { text: "Are you sure? Let me check.", timestamp: 26.7, confidence: 0.78 },
                { text: "2 times 3 is 6 and 2 plus 3 is 5", timestamp: 30.4, confidence: 0.74 },
                { text: "yeah that's right", timestamp: 35.9, confidence: 0.68 },
                { text: "So x equals negative 2 or negative 3.", timestamp: 38.6, confidence: 0.82 },
                { text: "Let's check by substituting", timestamp: 43.8, confidence: 0.76 },
                { text: "I'll do negative 2", timestamp: 47.2, confidence: 0.71 },
                { text: "I'll check negative 3", timestamp: 49.1, confidence: 0.69 },
                { text: "4 minus 10 plus 6 equals 0", timestamp: 52.5, confidence: 0.73 },
                { text: "9 minus 15 plus 6 also equals 0", timestamp: 57.8, confidence: 0.77 },
                { text: "Both solutions work!", timestamp: 63.2, confidence: 0.84 },
                { text: "Great job! Now try number 13.", timestamp: 66.5, confidence: 0.86 },
                { text: "this one looks harder", timestamp: 71.3, confidence: 0.65 }
            ]
        }
    },
    {
        subject: "Philosophy",
        gradeLevel: "College - PHIL 220",
        qualityScore: 5,
        description: "Seminar on existentialism with passionate student debates",
        durationSeconds: 200,
        dialog: {
            transcriptions: [
                { text: "Today we're discussing Sartre's concept of existence precedes essence.", timestamp: 0, confidence: 0.86 },
                { text: "What does this mean in practical terms?", timestamp: 6.4, confidence: 0.84 },
                { text: "We're not born with a predetermined", timestamp: 11.2, confidence: 0.71 },
                { text: "but we create ourselves", timestamp: 14.5, confidence: 0.63 },
                { text: "Hold on, I think", timestamp: 16.8, confidence: 0.58 },
                { text: "Let Jessica finish her thought.", timestamp: 19.3, confidence: 0.82 },
                { text: "We create ourselves through our choices and actions.", timestamp: 23.7, confidence: 0.79 },
                { text: "But doesn't society constrain", timestamp: 29.4, confidence: 0.64 },
                { text: "genetics play a role", timestamp: 31.8, confidence: 0.56 },
                { text: "One at a time, please. Marcus?", timestamp: 34.2, confidence: 0.83 },
                { text: "Society does constrain us, but Sartre argues we're still radically free.", timestamp: 38.9, confidence: 0.78 },
                { text: "We can always choose how to respond.", timestamp: 46.3, confidence: 0.81 },
                { text: "But that's not realistic", timestamp: 51.7, confidence: 0.62 },
                { text: "what about people in poverty", timestamp: 54.2, confidence: 0.59 },
                { text: "oppression", timestamp: 56.8, confidence: 0.47 },
                { text: "That's a valid critique. Emma, go ahead.", timestamp: 59.3, confidence: 0.80 },
                { text: "Sartre has been criticized for ignoring material conditions and systemic oppression.", timestamp: 64.8, confidence: 0.77 },
                { text: "His philosophy seems very individualistic.", timestamp: 72.5, confidence: 0.79 },
                { text: "But doesn't authenticity require", timestamp: 78.2, confidence: 0.66 },
                { text: "facing our situation honestly", timestamp: 81.1, confidence: 0.68 },
                { text: "even if limited", timestamp: 83.7, confidence: 0.54 },
                { text: "Good point. Authenticity is about", timestamp: 86.5, confidence: 0.81 },
                { text: "acknowledging our freedom within constraints.", timestamp: 91.8, confidence: 0.76 },
                { text: "This connects to bad faith", timestamp: 97.4, confidence: 0.73 },
                { text: "which is what exactly", timestamp: 100.2, confidence: 0.61 },
                { text: "self-deception", timestamp: 102.5, confidence: 0.58 },
                { text: "Yes, bad faith is deceiving ourselves about our freedom.", timestamp: 105.1, confidence: 0.82 },
                { text: "Pretending we have no choice when we actually do.", timestamp: 111.6, confidence: 0.80 },
                { text: "Like the waiter example", timestamp: 117.3, confidence: 0.72 },
                { text: "identifying too much with the role", timestamp: 120.5, confidence: 0.69 },
                { text: "Exactly. The waiter who completely becomes", timestamp: 124.2, confidence: 0.78 },
                { text: "his role is in bad faith.", timestamp: 129.8, confidence: 0.75 },
                { text: "He's denying his transcendence, his ability to be more than just a waiter.", timestamp: 134.6, confidence: 0.81 },
                { text: "But we all play roles", timestamp: 141.5, confidence: 0.70 },
                { text: "how can we avoid bad faith", timestamp: 144.3, confidence: 0.64 },
                { text: "in everyday life", timestamp: 146.9, confidence: 0.59 },
                { text: "That's the challenge. We need to maintain awareness", timestamp: 149.7, confidence: 0.79 },
                { text: "that we're choosing to play these roles.", timestamp: 156.2, confidence: 0.77 },
                { text: "This leads to angst", timestamp: 161.8, confidence: 0.73 },
                { text: "the anxiety of freedom", timestamp: 164.6, confidence: 0.68 },
                { text: "responsibility", timestamp: 167.1, confidence: 0.55 },
                { text: "Right. Existential angst comes from recognizing our radical freedom", timestamp: 170.3, confidence: 0.80 },
                { text: "and the weight of responsibility that comes with it.", timestamp: 177.9, confidence: 0.78 },
                { text: "For next week, read Beauvoir's response to Sartre.", timestamp: 184.6, confidence: 0.83 },
                { text: "She offers important feminist critiques.", timestamp: 190.8, confidence: 0.81 },
                { text: "Great discussion today, everyone.", timestamp: 196.2, confidence: 0.85 }
            ]
        }
    },
    {
        subject: "Business",
        gradeLevel: "College - BUS 401",
        qualityScore: 4,
        description: "Case study discussion with multiple teams presenting simultaneously",
        durationSeconds: 170,
        dialog: {
            transcriptions: [
                { text: "Each team will present their analysis of the Netflix case study.", timestamp: 0, confidence: 0.87 },
                { text: "Team one, you're up first.", timestamp: 5.8, confidence: 0.89 },
                { text: "Netflix's main competitive advantage is", timestamp: 10.4, confidence: 0.76 },
                { text: "their recommendation algorithm", timestamp: 14.7, confidence: 0.72 },
                { text: "original content", timestamp: 17.2, confidence: 0.58 },
                { text: "Hold on, which team is speaking?", timestamp: 19.6, confidence: 0.81 },
                { text: "The algorithm uses machine learning to personalize content.", timestamp: 24.3, confidence: 0.79 },
                { text: "But they're losing subscribers", timestamp: 30.8, confidence: 0.64 },
                { text: "password sharing crackdown", timestamp: 33.4, confidence: 0.61 },
                { text: "Let team one finish. Go ahead.", timestamp: 36.1, confidence: 0.84 },
                { text: "Their investment in original content differentiates them from competitors.", timestamp: 41.5, confidence: 0.77 },
                { text: "Shows like Stranger Things create brand loyalty.", timestamp: 48.9, confidence: 0.80 },
                { text: "What about their debt", timestamp: 54.6, confidence: 0.66 },
                { text: "they have billions in", timestamp: 56.9, confidence: 0.59 },
                { text: "We'll address questions after. Continue.", timestamp: 59.7, confidence: 0.83 },
                { text: "The international expansion strategy has been crucial for growth.", timestamp: 65.2, confidence: 0.78 },
                { text: "They localize content for different markets.", timestamp: 72.1, confidence: 0.81 },
                { text: "Team two, your counterpoint?", timestamp: 77.8, confidence: 0.86 },
                { text: "Netflix's competitive advantage is eroding", timestamp: 82.5, confidence: 0.75 },
                { text: "Disney Plus HBO", timestamp: 88.1, confidence: 0.62 },
                { text: "fragmentation", timestamp: 90.3, confidence: 0.51 },
                { text: "Their content costs are unsustainable", timestamp: 93.7, confidence: 0.73 },
                { text: "They spent over 17 billion on content last year.", timestamp: 99.4, confidence: 0.79 },
                { text: "But revenue growth is slowing", timestamp: 105.8, confidence: 0.71 },
                { text: "market saturation", timestamp: 108.6, confidence: 0.63 },
                { text: "Good points. Team three?", timestamp: 111.2, confidence: 0.85 },
                { text: "We need to look at their pivots", timestamp: 115.9, confidence: 0.74 },
                { text: "from DVD rentals to streaming", timestamp: 120.3, confidence: 0.70 },
                { text: "then to content production", timestamp: 123.7, confidence: 0.68 },
                { text: "This shows adaptability and innovation.", timestamp: 127.4, confidence: 0.80 },
                { text: "However", timestamp: 132.6, confidence: 0.56 },
                { text: "the ad-supported tier", timestamp: 134.8, confidence: 0.65 },
                { text: "contradicts their premium positioning", timestamp: 137.9, confidence: 0.69 },
                { text: "That's an interesting tension. The ad tier", timestamp: 142.5, confidence: 0.77 },
                { text: "addresses price sensitivity but", timestamp: 148.3, confidence: 0.72 },
                { text: "may dilute the brand", timestamp: 151.6, confidence: 0.66 },
                { text: "Excellent analyses from all teams.", timestamp: 154.9, confidence: 0.84 },
                { text: "This demonstrates how competitive strategy", timestamp: 160.6, confidence: 0.78 },
                { text: "must evolve with market conditions.", timestamp: 166.2, confidence: 0.80 }
            ]
        }
    },
    {
        subject: "Physical Education",
        gradeLevel: "Middle School",
        qualityScore: 5,
        description: "Outdoor PE class with constant environmental noise and distance from microphone",
        durationSeconds: 900,
        dialog: {
            transcriptions: [
                { text: "Alright everyone, gather around!", timestamp: 0, confidence: 0.82 },
                { text: "[wind noise]", timestamp: 3.7, confidence: 0.34 },
                { text: "Today we're doing fitness testing for your", timestamp: 6.4, confidence: 0.76 },
                { text: "[distant traffic sounds]", timestamp: 11.8, confidence: 0.29 },
                { text: "Presidential Fitness Challenge.", timestamp: 13.5, confidence: 0.81 },
                { text: "[birds chirping]", timestamp: 18.2, confidence: 0.41 },
                { text: "We'll start with the mile run, then", timestamp: 20.9, confidence: 0.73 },
                { text: "[airplane overhead]", timestamp: 25.6, confidence: 0.27 },
                { text: "do push-ups, sit-ups, and the sit-and-reach test.", timestamp: 28.3, confidence: 0.69 },
                { text: "[students talking in background]", timestamp: 34.7, confidence: 0.52 },
                { text: "Make sure you warm up properly. Start with", timestamp: 38.2, confidence: 0.77 },
                { text: "[wind gust]", timestamp: 43.8, confidence: 0.31 },
                { text: "some light jogging around the track.", timestamp: 46.1, confidence: 0.74 },
                { text: "[distant voices]", timestamp: 51.4, confidence: 0.43 },
                { text: "Take two laps at an easy pace.", timestamp: 54.7, confidence: 0.79 },
                { text: "[footsteps on gravel]", timestamp: 59.8, confidence: 0.38 },
                { text: "Remember to breathe steadily!", timestamp: 63.2, confidence: 0.81 },
                { text: "[construction noise from nearby site]", timestamp: 68.9, confidence: 0.24 },
                { text: "After your warm-up, we'll stretch for five minutes.", timestamp: 72.6, confidence: 0.71 },
                { text: "[students chattering]", timestamp: 79.3, confidence: 0.49 },
                { text: "Focus on your hamstrings and quadriceps.", timestamp: 82.8, confidence: 0.75 },
                { text: "[car horn in distance]", timestamp: 88.7, confidence: 0.33 },
                { text: "Hold each stretch for at least 20 seconds.", timestamp: 91.4, confidence: 0.78 },
                { text: "[wind noise increases]", timestamp: 97.8, confidence: 0.28 },
                { text: "Okay, everyone ready for the mile?", timestamp: 101.3, confidence: 0.73 },
                { text: "[multiple students responding, overlapping]", timestamp: 106.9, confidence: 0.57 },
                { text: "When I blow the whistle, start running.", timestamp: 111.2, confidence: 0.80 },
                { text: "[whistle blow]", timestamp: 116.8, confidence: 0.86 },
                { text: "[running footsteps, heavy breathing]", timestamp: 119.4, confidence: 0.44 },
                { text: "Pace yourselves! It's four laps!", timestamp: 125.7, confidence: 0.69 },
                { text: "[distant cheering]", timestamp: 132.3, confidence: 0.51 },
                { text: "Keep your breathing rhythmic!", timestamp: 136.8, confidence: 0.72 },
                { text: "[wind and traffic]", timestamp: 143.1, confidence: 0.31 },
                { text: "Good job Sarah! Keep that pace!", timestamp: 147.9, confidence: 0.75 },
                { text: "[heavy breathing passing by]", timestamp: 154.6, confidence: 0.46 },
                { text: "Two laps done! Halfway there!", timestamp: 159.2, confidence: 0.77 },
                { text: "[airplane overhead again]", timestamp: 166.8, confidence: 0.26 },
                { text: "Don't sprint yet! Save energy for the", timestamp: 171.4, confidence: 0.70 },
                { text: "[wind gust obscures speech]", timestamp: 177.9, confidence: 0.22 },
                { text: "final lap!", timestamp: 180.3, confidence: 0.81 },
                { text: "[students breathing heavily]", timestamp: 185.7, confidence: 0.48 },
                { text: "Push through! You're doing great!", timestamp: 191.2, confidence: 0.73 },
                { text: "[distant siren]", timestamp: 198.4, confidence: 0.35 },
                { text: "Last lap! Now you can pick up the pace!", timestamp: 203.6, confidence: 0.76 },
                { text: "[multiple footsteps, heavy breathing]", timestamp: 211.3, confidence: 0.42 },
                { text: "Sprint to the finish!", timestamp: 217.8, confidence: 0.79 },
                { text: "[students crossing finish, panting]", timestamp: 224.7, confidence: 0.54 },
                { text: "Great job everyone! Walk it off, don't stop moving.", timestamp: 231.2, confidence: 0.74 },
                { text: "[wind and general outdoor noise]", timestamp: 238.9, confidence: 0.33 },
                { text: "Drink some water and catch your breath.", timestamp: 243.5, confidence: 0.77 },
                { text: "[water bottles opening, students talking]", timestamp: 249.8, confidence: 0.51 },
                { text: "We'll do push-ups in five minutes.", timestamp: 255.3, confidence: 0.80 },
                { text: "[lawn mower starts in distance]", timestamp: 262.1, confidence: 0.29 },
                { text: "Remember proper push-up form. Hands shoulder-width", timestamp: 267.4, confidence: 0.71 },
                { text: "[lawn mower noise continues]", timestamp: 274.7, confidence: 0.27 },
                { text: "apart, back straight, chest to the ground.", timestamp: 278.2, confidence: 0.68 },
                { text: "[students settling into position]", timestamp: 285.6, confidence: 0.49 },
                { text: "You'll have two minutes to do as many as you can.", timestamp: 290.8, confidence: 0.75 },
                { text: "[construction noise spike]", timestamp: 298.3, confidence: 0.23 },
                { text: "Ready? Begin!", timestamp: 302.7, confidence: 0.82 },
                { text: "[grunting and exertion sounds]", timestamp: 307.4, confidence: 0.45 },
                { text: "Keep your core tight!", timestamp: 313.9, confidence: 0.73 },
                { text: "[wind picks up]", timestamp: 320.6, confidence: 0.31 },
                { text: "Don't let your hips sag!", timestamp: 325.1, confidence: 0.70 },
                { text: "[students struggling, some giving up]", timestamp: 332.8, confidence: 0.52 },
                { text: "One minute left! Push through the burn!", timestamp: 339.2, confidence: 0.74 },
                { text: "[heavy breathing]", timestamp: 347.3, confidence: 0.44 },
                { text: "Thirty seconds!", timestamp: 353.8, confidence: 0.81 },
                { text: "[increased grunting]", timestamp: 359.7, confidence: 0.47 },
                { text: "Ten, nine, eight", timestamp: 366.4, confidence: 0.76 },
                { text: "[distant traffic]", timestamp: 371.2, confidence: 0.29 },
                { text: "five, four, three, two, one. Stop!", timestamp: 374.8, confidence: 0.79 },
                { text: "[students collapsing, groaning]", timestamp: 381.9, confidence: 0.53 },
                { text: "Shake it out. Good effort from everyone.", timestamp: 387.5, confidence: 0.77 },
                { text: "[wind noise]", timestamp: 394.6, confidence: 0.32 },
                { text: "Next up is sit-ups. Get a partner to hold your feet.", timestamp: 399.2, confidence: 0.72 },
                { text: "[students pairing up, talking]", timestamp: 406.8, confidence: 0.49 },
                { text: "Same deal, two minutes, as many as you can.", timestamp: 412.7, confidence: 0.75 },
                { text: "[airplane overhead]", timestamp: 419.4, confidence: 0.27 },
                { text: "Hands behind your head, touch your elbows to your knees.", timestamp: 423.8, confidence: 0.69 },
                { text: "[students getting into position]", timestamp: 431.6, confidence: 0.51 },
                { text: "Ready? Go!", timestamp: 437.2, confidence: 0.83 },
                { text: "[counting, grunting]", timestamp: 442.3, confidence: 0.46 },
                { text: "Keep a steady rhythm!", timestamp: 448.9, confidence: 0.74 },
                { text: "[wind gust]", timestamp: 455.7, confidence: 0.30 },
                { text: "Don't use momentum! Control the movement!", timestamp: 460.3, confidence: 0.71 },
                { text: "[students straining]", timestamp: 468.2, confidence: 0.48 },
                { text: "One minute down!", timestamp: 474.6, confidence: 0.80 },
                { text: "[construction noise]", timestamp: 481.4, confidence: 0.26 },
                { text: "You're halfway there!", timestamp: 486.1, confidence: 0.77 },
                { text: "[heavy breathing, some students slowing]", timestamp: 493.7, confidence: 0.50 },
                { text: "Don't give up! Thirty seconds!", timestamp: 500.2, confidence: 0.73 },
                { text: "[increased effort sounds]", timestamp: 507.8, confidence: 0.45 },
                { text: "Last ten seconds! Give it everything!", timestamp: 514.3, confidence: 0.76 },
                { text: "[final burst of effort]", timestamp: 521.9, confidence: 0.49 },
                { text: "And time! Great job everyone!", timestamp: 528.7, confidence: 0.79 },
                { text: "[students catching breath]", timestamp: 535.3, confidence: 0.52 },
                { text: "Last test is the sit-and-reach for flexibility.", timestamp: 541.8, confidence: 0.75 },
                { text: "[wind noise]", timestamp: 549.2, confidence: 0.31 },
                { text: "We'll do this one at a time at the box.", timestamp: 553.6, confidence: 0.77 },
                { text: "[students walking over, chatting]", timestamp: 560.4, confidence: 0.48 },
                { text: "Sit with your legs straight, reach forward as far as you can.", timestamp: 566.9, confidence: 0.72 },
                { text: "[distant voices and traffic]", timestamp: 575.3, confidence: 0.34 },
                { text: "Hold the stretch for two seconds. Don't bounce.", timestamp: 580.7, confidence: 0.74 },
                { text: "[students taking turns, various reactions]", timestamp: 588.6, confidence: 0.51 },
                { text: "Good reach, Marcus! Excellent flexibility!", timestamp: 595.1, confidence: 0.76 },
                { text: "[wind picks up again]", timestamp: 602.8, confidence: 0.29 },
                { text: "Keep going, we're almost done.", timestamp: 607.3, confidence: 0.78 },
                { text: "[lawn mower in distance]", timestamp: 614.9, confidence: 0.28 },
                { text: "Remember, flexibility comes with practice. Stretch every day.", timestamp: 620.2, confidence: 0.71 },
                { text: "[students waiting their turn, talking]", timestamp: 628.7, confidence: 0.47 },
                { text: "Nice work, Ashley! Way to push yourself!", timestamp: 635.4, confidence: 0.75 },
                { text: "[airplane overhead]", timestamp: 643.1, confidence: 0.26 },
                { text: "Last few people. Then we'll cool down and head back.", timestamp: 648.7, confidence: 0.73 },
                { text: "[wind and general outdoor sounds]", timestamp: 656.9, confidence: 0.33 },
                { text: "Alright, everyone's finished! Great effort today!", timestamp: 663.2, confidence: 0.77 },
                { text: "[students cheering, talking]", timestamp: 670.8, confidence: 0.54 },
                { text: "I'll have your results calculated by next class.", timestamp: 677.3, confidence: 0.76 },
                { text: "[construction noise]", timestamp: 685.1, confidence: 0.25 },
                { text: "Let's do a cool-down walk around the track.", timestamp: 690.4, confidence: 0.78 },
                { text: "[footsteps, students walking and chatting]", timestamp: 697.8, confidence: 0.49 },
                { text: "Remember to hydrate and stretch when you get home.", timestamp: 705.2, confidence: 0.74 },
                { text: "[wind noise]", timestamp: 713.6, confidence: 0.30 },
                { text: "Good work today everyone! You're dismissed!", timestamp: 718.9, confidence: 0.80 },
                { text: "[students dispersing, multiple conversations]", timestamp: 726.4, confidence: 0.46 }
            ]
        }
    }
]

// Transcriptions that are incomplete or cut off
export const unfinishedSpeechSamples: ClassroomDialogSample[] = [
    {
        subject: "English",
        gradeLevel: "8th Grade",
        qualityScore: 3,
        description: "Poetry analysis with technical issues and interrupted speech",
        durationSeconds: 95,
        dialog: {
            transcriptions: [
                { text: "Today we're analyzing Robert Frost's poem The Road Not", timestamp: 0, confidence: 0.81 },
                { text: "", timestamp: 7.2, confidence: 0.12 },
                { text: "Can everyone hear me? My microphone", timestamp: 10.5, confidence: 0.68 },
                { text: "", timestamp: 15.8, confidence: 0.09 },
                { text: "Okay, as I was saying, this poem is about", timestamp: 19.3, confidence: 0.75 },
                { text: "choices and how they", timestamp: 24.6, confidence: 0.64 },
                { text: "", timestamp: 28.1, confidence: 0.11 },
                { text: "shape our lives. The speaker comes to a fork in the", timestamp: 31.7, confidence: 0.79 },
                { text: "and has to decide which", timestamp: 37.9, confidence: 0.58 },
                { text: "", timestamp: 41.2, confidence: 0.08 },
                { text: "Sorry about these interruptions. Where was I?", timestamp: 44.8, confidence: 0.77 },
                { text: "The metaphor of the roads represents life", timestamp: 50.5, confidence: 0.82 },
                { text: "and the speaker", timestamp: 56.3, confidence: 0.61 },
                { text: "technical difficulties", timestamp: 58.7, confidence: 0.34 },
                { text: "chooses the one less traveled by, which has made all the", timestamp: 62.4, confidence: 0.74 },
                { text: "", timestamp: 69.1, confidence: 0.13 },
                { text: "This ending is ironic because", timestamp: 72.8, confidence: 0.71 },
                { text: "both paths were actually", timestamp: 77.4, confidence: 0.66 },
                { text: "", timestamp: 81.5, confidence: 0.10 },
                { text: "worn really about the same. It's about how we", timestamp: 85.2, confidence: 0.69 },
                { text: "rationalize our choices after", timestamp: 91.3, confidence: 0.63 }
            ]
        }
    },
    {
        subject: "Biology",
        gradeLevel: "10th Grade",
        qualityScore: 4,
        description: "Cell structure lecture with audio dropouts",
        durationSeconds: 110,
        dialog: {
            transcriptions: [
                { text: "Let's review the parts of a cell. First, the cell membrane", timestamp: 0, confidence: 0.84 },
                { text: "controls what enters and", timestamp: 6.3, confidence: 0.67 },
                { text: "", timestamp: 9.8, confidence: 0.14 },
                { text: "the cell. Inside we have the cytoplasm, which is", timestamp: 13.5, confidence: 0.76 },
                { text: "gel-like substance where", timestamp: 19.2, confidence: 0.71 },
                { text: "", timestamp: 22.7, confidence: 0.11 },
                { text: "organelles float. The nucleus is the", timestamp: 26.4, confidence: 0.79 },
                { text: "control center containing", timestamp: 31.8, confidence: 0.73 },
                { text: "which holds our genetic", timestamp: 35.9, confidence: 0.65 },
                { text: "", timestamp: 39.6, confidence: 0.09 },
                { text: "Mitochondria are known as the powerhouse because they", timestamp: 43.2, confidence: 0.81 },
                { text: "produce energy through", timestamp: 49.7, confidence: 0.68 },
                { text: "", timestamp: 53.1, confidence: 0.12 },
                { text: "cellular respiration. The endoplasmic reticulum", timestamp: 57.5, confidence: 0.77 },
                { text: "comes in two types, rough and", timestamp: 63.9, confidence: 0.72 },
                { text: "", timestamp: 68.2, confidence: 0.10 },
                { text: "Rough ER has ribosomes attached and makes", timestamp: 71.8, confidence: 0.75 },
                { text: "while smooth ER produces", timestamp: 77.5, confidence: 0.69 },
                { text: "", timestamp: 81.4, confidence: 0.13 },
                { text: "The Golgi apparatus packages and", timestamp: 85.7, confidence: 0.78 },
                { text: "distributes proteins", timestamp: 91.2, confidence: 0.74 },
                { text: "", timestamp: 94.5, confidence: 0.08 },
                { text: "Finally, lysosomes break down", timestamp: 98.3, confidence: 0.76 },
                { text: "waste materials using", timestamp: 103.6, confidence: 0.64 },
                { text: "", timestamp: 107.1, confidence: 0.11 }
            ]
        }
    },
    {
        subject: "Spanish",
        gradeLevel: "9th Grade",
        qualityScore: 4,
        description: "Vocabulary lesson with student mumbling and cut-off responses",
        durationSeconds: 65,
        dialog: {
            transcriptions: [
                { text: "Vamos a practicar el vocabulario de la comida. María, cómo se dice apple?", timestamp: 0, confidence: 0.86 },
                { text: "Manzana", timestamp: 7.8, confidence: 0.79 },
                { text: "Muy bien! Y banana?", timestamp: 10.3, confidence: 0.88 },
                { text: "Plát", timestamp: 14.6, confidence: 0.42 },
                { text: "", timestamp: 16.2, confidence: 0.08 },
                { text: "Plátano, sí. Carlos, orange?", timestamp: 19.5, confidence: 0.81 },
                { text: "Naran", timestamp: 24.3, confidence: 0.39 },
                { text: "Speak up please. Naranja, correct.", timestamp: 26.8, confidence: 0.77 },
                { text: "Now, quien puede decirme bread?", timestamp: 32.1, confidence: 0.83 },
                { text: "mumbling", timestamp: 37.5, confidence: 0.27 },
                { text: "", timestamp: 39.8, confidence: 0.09 },
                { text: "I didn't catch that. Anyone else?", timestamp: 42.6, confidence: 0.79 },
                { text: "Pan", timestamp: 47.2, confidence: 0.74 },
                { text: "Exacto! Milk?", timestamp: 49.8, confidence: 0.85 },
                { text: "Lech", timestamp: 53.5, confidence: 0.44 },
                { text: "", timestamp: 55.1, confidence: 0.10 },
                { text: "Leche, muy bien. Last one, cheese?", timestamp: 58.4, confidence: 0.82 },
                { text: "Ques", timestamp: 63.7, confidence: 0.41 }
            ]
        }
    },
    {
        subject: "Chemistry",
        gradeLevel: "College - CHEM 202",
        qualityScore: 3,
        description: "Organic chemistry lecture with microphone issues and lab noise",
        durationSeconds: 140,
        dialog: {
            transcriptions: [
                { text: "Today we're covering nucleophilic substitution reactions.", timestamp: 0, confidence: 0.84 },
                { text: "static noise", timestamp: 6.2, confidence: 0.19 },
                { text: "There are two main types, SN1 and SN2.", timestamp: 9.7, confidence: 0.79 },
                { text: "", timestamp: 15.4, confidence: 0.11 },
                { text: "SN2 reactions proceed through a single", timestamp: 18.9, confidence: 0.72 },
                { text: "microphone cutting out", timestamp: 24.6, confidence: 0.25 },
                { text: "step mechanism with back-side attack.", timestamp: 27.8, confidence: 0.68 },
                { text: "The nucleophile approaches from", timestamp: 33.5, confidence: 0.75 },
                { text: "", timestamp: 38.2, confidence: 0.09 },
                { text: "opposite side of the leaving group.", timestamp: 41.6, confidence: 0.71 },
                { text: "lab equipment noise", timestamp: 47.3, confidence: 0.28 },
                { text: "This results in inversion of configuration.", timestamp: 50.8, confidence: 0.77 },
                { text: "SN1 reactions, on the other hand", timestamp: 57.2, confidence: 0.80 },
                { text: "", timestamp: 62.5, confidence: 0.10 },
                { text: "proceed through a two-step mechanism.", timestamp: 66.1, confidence: 0.73 },
                { text: "First, the leaving group departs, forming", timestamp: 72.6, confidence: 0.76 },
                { text: "feedback squeal", timestamp: 78.9, confidence: 0.31 },
                { text: "carbocation intermediate.", timestamp: 81.4, confidence: 0.64 },
                { text: "", timestamp: 85.8, confidence: 0.08 },
                { text: "Then the nucleophile attacks", timestamp: 89.3, confidence: 0.70 },
                { text: "ventilation system noise", timestamp: 94.7, confidence: 0.26 },
                { text: "from either side, giving a racemic mixture.", timestamp: 98.2, confidence: 0.69 },
                { text: "The rate of SN2 depends on", timestamp: 105.6, confidence: 0.78 },
                { text: "", timestamp: 110.8, confidence: 0.12 },
                { text: "both nucleophile and substrate concentration.", timestamp: 114.5, confidence: 0.72 },
                { text: "While SN1 rate depends only", timestamp: 121.3, confidence: 0.75 },
                { text: "audio dropout", timestamp: 127.1, confidence: 0.22 },
                { text: "on substrate concentration.", timestamp: 130.4, confidence: 0.68 },
                { text: "For your lab report", timestamp: 136.2, confidence: 0.77 }
            ]
        }
    },
    {
        subject: "Political Science",
        gradeLevel: "College - POLI 340",
        qualityScore: 4,
        description: "International relations lecture with audio glitches during virtual component",
        durationSeconds: 160,
        dialog: {
            transcriptions: [
                { text: "We're discussing theories of international relations today.", timestamp: 0, confidence: 0.86 },
                { text: "Let's start with realism, one of the dominant paradigms.", timestamp: 6.5, confidence: 0.84 },
                { text: "Realists argue that states are the", timestamp: 13.2, confidence: 0.78 },
                { text: "", timestamp: 18.4, confidence: 0.10 },
                { text: "primary actors in international politics.", timestamp: 21.9, confidence: 0.80 },
                { text: "They emphasize power, security, and national", timestamp: 28.6, confidence: 0.82 },
                { text: "connection issues", timestamp: 34.8, confidence: 0.31 },
                { text: "interest as the key drivers of state behavior.", timestamp: 37.9, confidence: 0.76 },
                { text: "In contrast, liberalism focuses on", timestamp: 44.7, confidence: 0.81 },
                { text: "", timestamp: 50.2, confidence: 0.09 },
                { text: "cooperation, international institutions, and", timestamp: 53.8, confidence: 0.75 },
                { text: "Can you repeat that last part", timestamp: 60.1, confidence: 0.64 },
                { text: "economic interdependence.", timestamp: 63.5, confidence: 0.71 },
                { text: "Liberals believe that", timestamp: 68.9, confidence: 0.79 },
                { text: "audio cutting", timestamp: 73.5, confidence: 0.25 },
                { text: "international organizations like the UN can facilitate", timestamp: 77.2, confidence: 0.74 },
                { text: "", timestamp: 84.6, confidence: 0.11 },
                { text: "peaceful resolution of conflicts.", timestamp: 88.1, confidence: 0.77 },
                { text: "Constructivism offers a different", timestamp: 94.8, confidence: 0.80 },
                { text: "perspective, arguing that", timestamp: 100.3, confidence: 0.73 },
                { text: "", timestamp: 104.7, confidence: 0.08 },
                { text: "identities, norms, and ideas shape", timestamp: 108.5, confidence: 0.76 },
                { text: "state interests rather than", timestamp: 115.2, confidence: 0.78 },
                { text: "material factors alone.", timestamp: 120.6, confidence: 0.72 },
                { text: "buffering", timestamp: 125.8, confidence: 0.29 },
                { text: "For example, constructivists would examine how", timestamp: 129.4, confidence: 0.75 },
                { text: "", timestamp: 136.7, confidence: 0.10 },
                { text: "the idea of human rights has evolved and", timestamp: 140.3, confidence: 0.74 },
                { text: "influenced state behavior over time.", timestamp: 147.1, confidence: 0.79 },
                { text: "Next class we'll apply these", timestamp: 153.9, confidence: 0.81 },
                { text: "theories to current", timestamp: 158.6, confidence: 0.67 }
            ]
        }
    }
]

export const poorQualityTeachingSamples: ClassroomDialogSample[] = [
    {
        subject: "Mathematics",
        gradeLevel: "8th Grade",
        qualityScore: 2,
        description: "Incoherent explanation with constant interruptions and off-topic tangents",
        durationSeconds: 45,
        dialog: {
            transcriptions: [
                { text: "So today we're gonna do um... wait hold on", timestamp: 0, confidence: 0.82 },
                { text: "Jake, put your phone away. Sarah stop talking.", timestamp: 3.5, confidence: 0.91 },
                { text: "Okay so fractions... uh where was I?", timestamp: 8.2, confidence: 0.76 },
                { text: "Oh yeah so you take the top number", timestamp: 12.1, confidence: 0.88 },
                { text: "No wait that's not right. Or is it?", timestamp: 15.9, confidence: 0.73 },
                { text: "You know what just look at page 47", timestamp: 19.4, confidence: 0.85 },
                { text: "and do problems 1 through 20.", timestamp: 22.8, confidence: 0.87 },
                { text: "If you don't get it, ask a friend.", timestamp: 26.3, confidence: 0.89 },
                { text: "Oh and don't forget tomorrow's the assembly", timestamp: 30.7, confidence: 0.84 },
                { text: "so we won't have class. Maybe Wednesday", timestamp: 35.2, confidence: 0.79 },
                { text: "we'll continue this. Or Thursday.", timestamp: 39.6, confidence: 0.81 },
                { text: "Just do the homework.", timestamp: 42.1, confidence: 0.93 }
            ]
        }
    },
    {
        subject: "Science",
        gradeLevel: "High School",
        qualityScore: 3,
        description: "Lecture with factually incorrect information presented as fact",
        durationSeconds: 38,
        dialog: {
            transcriptions: [
                { text: "Now let's talk about photosynthesis.", timestamp: 0, confidence: 0.95 },
                { text: "Plants breathe in oxygen and breathe out carbon dioxide,", timestamp: 4.2, confidence: 0.91 },
                { text: "just like humans but backwards.", timestamp: 9.1, confidence: 0.88 },
                { text: "The green color comes from chlorine,", timestamp: 12.5, confidence: 0.87 },
                { text: "which is the same stuff in pools.", timestamp: 16.2, confidence: 0.89 },
                { text: "This process happens mostly at night", timestamp: 20.1, confidence: 0.84 },
                { text: "because plants don't like too much sun.", timestamp: 24.6, confidence: 0.86 },
                { text: "That's why they grow better in the shade.", timestamp: 28.9, confidence: 0.88 },
                { text: "Any questions? No? Okay moving on.", timestamp: 33.2, confidence: 0.92 }
            ]
        }
    },
    {
        subject: "History",
        gradeLevel: "Middle School",
        qualityScore: 2,
        description: "Heavily biased presentation without acknowledging multiple perspectives",
        durationSeconds: 52,
        dialog: {
            transcriptions: [
                { text: "So obviously the Civil War was only about economics,", timestamp: 0, confidence: 0.89 },
                { text: "slavery had nothing to do with it.", timestamp: 4.8, confidence: 0.91 },
                { text: "Anyone who says otherwise is just being politically correct.", timestamp: 9.3, confidence: 0.84 },
                { text: "The North was the aggressor and the South", timestamp: 15.2, confidence: 0.86 },
                { text: "was just defending their way of life.", timestamp: 19.7, confidence: 0.88 },
                { text: "All the textbooks today are biased", timestamp: 23.9, confidence: 0.87 },
                { text: "and don't tell you the real story.", timestamp: 27.6, confidence: 0.89 },
                { text: "But I'm giving you the facts here.", timestamp: 31.2, confidence: 0.92 },
                { text: "You won't find this in your book", timestamp: 34.8, confidence: 0.88 },
                { text: "because they don't want you to know the truth.", timestamp: 38.5, confidence: 0.85 },
                { text: "Just remember what I told you for the test.", timestamp: 43.7, confidence: 0.90 },
                { text: "That's what you need to write.", timestamp: 47.9, confidence: 0.91 }
            ]
        }
    },
    {
        subject: "English",
        gradeLevel: "9th Grade",
        qualityScore: 3,
        description: "Vague instructions with no clear learning objectives or explanation",
        durationSeconds: 31,
        dialog: {
            transcriptions: [
                { text: "Alright class, today you're going to write an essay.", timestamp: 0, confidence: 0.93 },
                { text: "It should be about something interesting.", timestamp: 4.6, confidence: 0.89 },
                { text: "Make it good, you know, use big words and stuff.", timestamp: 9.2, confidence: 0.86 },
                { text: "It needs to be at least a page, maybe two.", timestamp: 14.8, confidence: 0.88 },
                { text: "Just make sure it sounds smart.", timestamp: 19.1, confidence: 0.90 },
                { text: "I'll collect them at the end of class.", timestamp: 23.3, confidence: 0.92 },
                { text: "Get started now, you have 30 minutes.", timestamp: 27.7, confidence: 0.91 }
            ]
        }
    },
    {
        subject: "Computer Science",
        gradeLevel: "High School",
        qualityScore: 2,
        description: "Unnecessarily complex explanation that confuses rather than clarifies",
        durationSeconds: 48,
        dialog: {
            transcriptions: [
                { text: "To understand variables you must first comprehend", timestamp: 0, confidence: 0.87 },
                { text: "the metaphysical relationship between symbolic representation", timestamp: 5.3, confidence: 0.79 },
                { text: "and memory allocation paradigms in the context", timestamp: 11.2, confidence: 0.76 },
                { text: "of von Neumann architecture and its implications", timestamp: 16.8, confidence: 0.74 },
                { text: "for state management in procedural versus", timestamp: 22.1, confidence: 0.77 },
                { text: "object-oriented programming methodologies.", timestamp: 26.9, confidence: 0.78 },
                { text: "This requires understanding stack versus heap allocation", timestamp: 31.7, confidence: 0.80 },
                { text: "as well as the garbage collection lifecycle.", timestamp: 37.2, confidence: 0.82 },
                { text: "Now let's write hello world.", timestamp: 42.5, confidence: 0.91 }
            ]
        }
    },
    {
        subject: "Physical Education",
        gradeLevel: "Elementary",
        qualityScore: 1,
        description: "Unsafe instructions without proper safety guidelines or supervision setup",
        durationSeconds: 28,
        dialog: {
            transcriptions: [
                { text: "Okay kids just start running around and do whatever.", timestamp: 0, confidence: 0.92 },
                { text: "Try to do flips and cartwheels if you want.", timestamp: 4.8, confidence: 0.89 },
                { text: "I'll be over here checking my phone.", timestamp: 9.3, confidence: 0.90 },
                { text: "If someone gets hurt just come tell me.", timestamp: 13.7, confidence: 0.88 },
                { text: "Try not to run into each other too much.", timestamp: 18.2, confidence: 0.87 },
                { text: "We've got about 40 minutes so just have fun.", timestamp: 23.1, confidence: 0.91 }
            ]
        }
    },
    {
        subject: "Chemistry",
        gradeLevel: "High School",
        qualityScore: 3,
        description: "Reading directly from textbook with no explanation or engagement",
        durationSeconds: 42,
        dialog: {
            transcriptions: [
                { text: "Okay I'm going to read chapter 7 to you.", timestamp: 0, confidence: 0.94 },
                { text: "Quote. The periodic table is arranged in rows and columns.", timestamp: 4.9, confidence: 0.89 },
                { text: "Each element has an atomic number", timestamp: 11.2, confidence: 0.90 },
                { text: "which represents the number of protons.", timestamp: 15.6, confidence: 0.88 },
                { text: "Elements in the same group share similar properties.", timestamp: 20.3, confidence: 0.87 },
                { text: "End quote. Next paragraph. Quote.", timestamp: 26.1, confidence: 0.91 },
                { text: "Metals are found on the left side", timestamp: 29.8, confidence: 0.89 },
                { text: "while nonmetals are on the right. End quote.", timestamp: 34.2, confidence: 0.90 },
                { text: "This will be on the test so write it down.", timestamp: 38.7, confidence: 0.92 }
            ]
        }
    },
    {
        subject: "Social Studies",
        gradeLevel: "6th Grade",
        qualityScore: 2,
        description: "Topic jumping with no coherent thread or connection between ideas",
        durationSeconds: 55,
        dialog: {
            transcriptions: [
                { text: "Today we're learning about ancient Rome.", timestamp: 0, confidence: 0.91 },
                { text: "They had gladiators which is cool.", timestamp: 4.3, confidence: 0.89 },
                { text: "Speaking of fighting, World War 2 happened later.", timestamp: 8.9, confidence: 0.85 },
                { text: "But before that was the Renaissance.", timestamp: 13.6, confidence: 0.87 },
                { text: "Renaissance means rebirth in French.", timestamp: 17.8, confidence: 0.88 },
                { text: "France is in Europe. So is Italy.", timestamp: 22.1, confidence: 0.90 },
                { text: "Italy is shaped like a boot.", timestamp: 26.3, confidence: 0.92 },
                { text: "Boots are important for soldiers.", timestamp: 30.1, confidence: 0.89 },
                { text: "The Roman soldiers were called legionaries.", timestamp: 34.7, confidence: 0.88 },
                { text: "Anyway, there's a video you can watch at home.", timestamp: 39.9, confidence: 0.87 },
                { text: "It's about pyramids I think.", timestamp: 44.2, confidence: 0.84 },
                { text: "Or maybe it was about democracy.", timestamp: 48.3, confidence: 0.82 },
                { text: "We'll do a quiz on Friday.", timestamp: 51.8, confidence: 0.90 }
            ]
        }
    }
]

// Transcriptions that contain personally identifiable information (PII) regarding students or other information
export const edgeCases_PII: ClassroomDialogSample[] = [
    {
        subject: "General Classroom",
        gradeLevel: "Elementary",
        qualityScore: 7,
        description: "Teacher accidentally shares student PII during class discussion",
        durationSeconds: 38,
        dialog: {
            transcriptions: [
                { text: "Okay class, I need to update you on the field trip.", timestamp: 0, confidence: 0.94 },
                { text: "Sarah Johnson, your mom called and said you can't go", timestamp: 4.3, confidence: 0.91 },
                { text: "because of your medical appointment at 3pm.", timestamp: 9.1, confidence: 0.89 },
                { text: "Tommy Martinez, I have your new address here,", timestamp: 14.2, confidence: 0.87 },
                { text: "it's 742 Oak Street, apartment 3B.", timestamp: 18.6, confidence: 0.86 },
                { text: "And Emily Chen, your dad's phone number changed,", timestamp: 23.9, confidence: 0.88 },
                { text: "the new one is 555-0147.", timestamp: 28.4, confidence: 0.92 },
                { text: "Make sure your parents sign the permission slips.", timestamp: 32.7, confidence: 0.93 }
            ]
        }
    },
    {
        subject: "High School Counseling",
        gradeLevel: "High School",
        qualityScore: 6,
        description: "Discussion about student circumstances containing sensitive personal information",
        durationSeconds: 42,
        dialog: {
            transcriptions: [
                { text: "Before we start today's lesson, I want to address", timestamp: 0, confidence: 0.93 },
                { text: "the situation with Michael. As you all know,", timestamp: 4.8, confidence: 0.90 },
                { text: "he's been going through a difficult time", timestamp: 9.2, confidence: 0.91 },
                { text: "since his parents' divorce and his mom's job loss.", timestamp: 13.5, confidence: 0.87 },
                { text: "The school is providing him with free lunch now,", timestamp: 18.9, confidence: 0.89 },
                { text: "so please be understanding if he seems distracted.", timestamp: 24.1, confidence: 0.91 },
                { text: "Also, he's meeting with the school psychologist", timestamp: 29.3, confidence: 0.88 },
                { text: "every Tuesday during 4th period.", timestamp: 34.2, confidence: 0.90 },
                { text: "Let's all be supportive friends.", timestamp: 38.7, confidence: 0.94 }
            ]
        }
    },
    {
        subject: "Parent-Teacher Conference",
        gradeLevel: "Middle School",
        qualityScore: 8,
        description: "Teacher discussing student records with identifying information visible/audible",
        durationSeconds: 35,
        dialog: {
            transcriptions: [
                { text: "Thank you for coming in today, Mrs. Peterson.", timestamp: 0, confidence: 0.96 },
                { text: "I wanted to discuss Jake's progress.", timestamp: 4.2, confidence: 0.94 },
                { text: "His student ID is 847392, and according to", timestamp: 8.5, confidence: 0.91 },
                { text: "his IEP from last year, he needs", timestamp: 13.2, confidence: 0.89 },
                { text: "extended time on tests due to his ADHD diagnosis.", timestamp: 17.6, confidence: 0.87 },
                { text: "I also noticed from his medical file that", timestamp: 23.1, confidence: 0.88 },
                { text: "he takes Adderall at noon, which is why", timestamp: 27.8, confidence: 0.86 },
                { text: "he visits the nurse's office daily.", timestamp: 32.4, confidence: 0.90 }
            ]
        }
    }
]

export const edgeCase_SensitiveTopics: ClassroomDialogSample[] = [
    {
        subject: "Social Studies",
        gradeLevel: "High School",
        qualityScore: 8,
        description: "Appropriate discussion of Holocaust history in educational context",
        durationSeconds: 68,
        dialog: {
            transcriptions: [
                { text: "Today we're going to discuss a difficult but important topic:", timestamp: 0, confidence: 0.96 },
                { text: "the Holocaust during World War II.", timestamp: 5.2, confidence: 0.95 },
                { text: "This was one of the darkest periods in human history.", timestamp: 9.8, confidence: 0.94 },
                { text: "Between 1941 and 1945, approximately six million Jewish people", timestamp: 15.3, confidence: 0.92 },
                { text: "were systematically murdered by Nazi Germany.", timestamp: 21.7, confidence: 0.93 },
                { text: "We study this not to glorify violence,", timestamp: 26.9, confidence: 0.94 },
                { text: "but to understand how prejudice and hatred", timestamp: 31.4, confidence: 0.93 },
                { text: "can escalate when left unchecked.", timestamp: 35.8, confidence: 0.95 },
                { text: "It teaches us the importance of standing up", timestamp: 40.6, confidence: 0.94 },
                { text: "against discrimination in all its forms.", timestamp: 45.1, confidence: 0.96 },
                { text: "We'll be viewing some documentary footage,", timestamp: 49.8, confidence: 0.93 },
                { text: "so please let me know if you need to step out.", timestamp: 54.2, confidence: 0.94 },
                { text: "Remember, we approach this with respect", timestamp: 59.1, confidence: 0.95 },
                { text: "for the victims and survivors.", timestamp: 63.4, confidence: 0.96 }
            ]
        }
    },
    {
        subject: "Health Education",
        gradeLevel: "Middle School",
        qualityScore: 9,
        description: "Age-appropriate discussion of mental health and suicide prevention",
        durationSeconds: 55,
        dialog: {
            transcriptions: [
                { text: "Class, I want to talk about something very important today:", timestamp: 0, confidence: 0.97 },
                { text: "mental health and how to support friends who might be struggling.", timestamp: 5.8, confidence: 0.95 },
                { text: "Sometimes people feel overwhelmed or sad,", timestamp: 11.4, confidence: 0.94 },
                { text: "and it's crucial that we know how to help.", timestamp: 15.7, confidence: 0.96 },
                { text: "If a friend talks about hurting themselves,", timestamp: 20.3, confidence: 0.93 },
                { text: "this is never something to keep secret.", timestamp: 25.1, confidence: 0.95 },
                { text: "You should always tell a trusted adult immediately.", timestamp: 29.8, confidence: 0.96 },
                { text: "The suicide prevention hotline number is 988.", timestamp: 35.2, confidence: 0.94 },
                { text: "It's available 24/7 and all calls are confidential.", timestamp: 40.6, confidence: 0.95 },
                { text: "Remember, asking for help is a sign of strength,", timestamp: 46.1, confidence: 0.96 },
                { text: "not weakness. We're all here to support each other.", timestamp: 51.2, confidence: 0.97 }
            ]
        }
    },
    {
        subject: "Current Events",
        gradeLevel: "High School",
        qualityScore: 7,
        description: "Balanced discussion of controversial political topic with multiple perspectives",
        durationSeconds: 72,
        dialog: {
            transcriptions: [
                { text: "Today we're discussing immigration policy,", timestamp: 0, confidence: 0.95 },
                { text: "which is a complex issue with many perspectives.", timestamp: 4.7, confidence: 0.94 },
                { text: "Some people believe in stricter border controls", timestamp: 9.8, confidence: 0.92 },
                { text: "to protect national security and job markets.", timestamp: 14.9, confidence: 0.93 },
                { text: "Others advocate for more open policies,", timestamp: 19.6, confidence: 0.94 },
                { text: "emphasizing humanitarian concerns and economic benefits.", timestamp: 24.2, confidence: 0.91 },
                { text: "Both sides have valid points based on different values.", timestamp: 29.8, confidence: 0.95 },
                { text: "In this class, we'll examine evidence and arguments", timestamp: 35.3, confidence: 0.94 },
                { text: "from multiple viewpoints without demonizing anyone.", timestamp: 40.7, confidence: 0.93 },
                { text: "The goal is to understand different perspectives,", timestamp: 46.1, confidence: 0.95 },
                { text: "even if we don't personally agree with them.", timestamp: 51.2, confidence: 0.96 },
                { text: "Critical thinking means considering all sides", timestamp: 56.4, confidence: 0.94 },
                { text: "before forming your own informed opinion.", timestamp: 61.1, confidence: 0.95 },
                { text: "Please keep discussions respectful and evidence-based.", timestamp: 66.3, confidence: 0.96 }
            ]
        }
    },
    {
        subject: "Biology",
        gradeLevel: "High School",
        qualityScore: 9,
        description: "Scientific discussion of evolution with acknowledgment of different beliefs",
        durationSeconds: 48,
        dialog: {
            transcriptions: [
                { text: "This unit covers the theory of evolution,", timestamp: 0, confidence: 0.96 },
                { text: "which is a fundamental concept in biology.", timestamp: 4.6, confidence: 0.95 },
                { text: "I understand some of you may have religious beliefs", timestamp: 9.3, confidence: 0.93 },
                { text: "that differ from this scientific explanation.", timestamp: 14.2, confidence: 0.94 },
                { text: "That's okay. Many people reconcile their faith", timestamp: 18.9, confidence: 0.95 },
                { text: "with scientific understanding in various ways.", timestamp: 23.6, confidence: 0.96 },
                { text: "In this class, we're studying the scientific evidence", timestamp: 28.4, confidence: 0.94 },
                { text: "and mechanisms that biologists use to explain", timestamp: 33.7, confidence: 0.95 },
                { text: "the diversity of life on Earth.", timestamp: 38.2, confidence: 0.96 },
                { text: "You'll be tested on your understanding of the science,", timestamp: 42.8, confidence: 0.95 }
            ]
        }
    }
]

export const edgeCase_SexualContent: ClassroomDialogSample[] = [
    {
        subject: "Health Education",
        gradeLevel: "High School",
        qualityScore: 9,
        description: "Age-appropriate, clinical discussion of human reproduction and sexual health",
        durationSeconds: 62,
        dialog: {
            transcriptions: [
                { text: "Today we begin our unit on human reproduction", timestamp: 0, confidence: 0.96 },
                { text: "and sexual health. This is important health information", timestamp: 5.3, confidence: 0.95 },
                { text: "that everyone should understand.", timestamp: 9.8, confidence: 0.96 },
                { text: "We'll use correct anatomical terms", timestamp: 13.6, confidence: 0.95 },
                { text: "and discuss topics like puberty, contraception,", timestamp: 18.2, confidence: 0.94 },
                { text: "and sexually transmitted infections.", timestamp: 23.1, confidence: 0.95 },
                { text: "This information is presented in a medical,", timestamp: 27.8, confidence: 0.96 },
                { text: "educational context to help you make informed decisions.", timestamp: 32.7, confidence: 0.94 },
                { text: "If you feel uncomfortable, you may step outside,", timestamp: 38.3, confidence: 0.95 },
                { text: "but this material will be on the test.", timestamp: 43.1, confidence: 0.96 },
                { text: "All parents received notification letters last week.", timestamp: 47.9, confidence: 0.94 },
                { text: "Please keep questions and discussions respectful", timestamp: 53.2, confidence: 0.95 },
                { text: "and focused on the educational content.", timestamp: 58.1, confidence: 0.96 }
            ]
        }
    },
    {
        subject: "English Literature",
        gradeLevel: "11th Grade",
        qualityScore: 8,
        description: "Discussion of mature themes in classic literature with appropriate context",
        durationSeconds: 58,
        dialog: {
            transcriptions: [
                { text: "As we read Shakespeare's Romeo and Juliet,", timestamp: 0, confidence: 0.96 },
                { text: "we need to discuss some mature themes in the text.", timestamp: 4.9, confidence: 0.95 },
                { text: "The play contains references to sexuality", timestamp: 10.2, confidence: 0.93 },
                { text: "that would have been understood by Elizabethan audiences.", timestamp: 14.8, confidence: 0.92 },
                { text: "For example, Mercutio makes several bawdy jokes", timestamp: 20.4, confidence: 0.94 },
                { text: "using double entendres common in Shakespeare's time.", timestamp: 25.7, confidence: 0.93 },
                { text: "We're analyzing these as literary devices,", timestamp: 31.2, confidence: 0.95 },
                { text: "understanding historical context and characterization.", timestamp: 36.1, confidence: 0.94 },
                { text: "The relationship between Romeo and Juliet also raises", timestamp: 41.6, confidence: 0.93 },
                { text: "questions about age and consent in different eras.", timestamp: 47.2, confidence: 0.92 },
                { text: "This helps us think critically about changing", timestamp: 52.4, confidence: 0.95 },
                { text: "social norms over time.", timestamp: 56.8, confidence: 0.96 }
            ]
        }
    },
    {
        subject: "Biology",
        gradeLevel: "9th Grade",
        qualityScore: 9,
        description: "Scientific explanation of animal reproduction in ecology unit",
        durationSeconds: 45,
        dialog: {
            transcriptions: [
                { text: "In this ecology unit, we're studying", timestamp: 0, confidence: 0.96 },
                { text: "how different species reproduce.", timestamp: 4.3, confidence: 0.95 },
                { text: "Reproduction is a key biological function", timestamp: 8.7, confidence: 0.94 },
                { text: "that ensures species survival.", timestamp: 13.2, confidence: 0.96 },
                { text: "Some animals reproduce sexually, requiring two parents,", timestamp: 17.6, confidence: 0.93 },
                { text: "while others reproduce asexually.", timestamp: 23.1, confidence: 0.95 },
                { text: "We'll examine mating behaviors, gestation periods,", timestamp: 27.8, confidence: 0.94 },
                { text: "and parental care across different species.", timestamp: 33.2, confidence: 0.95 },
                { text: "This is purely scientific information", timestamp: 38.1, confidence: 0.96 },
                { text: "about animal biology and ecosystems.", timestamp: 42.4, confidence: 0.95 }
            ]
        }
    },
    {
        subject: "Health Education",
        gradeLevel: "8th Grade",
        qualityScore: 9,
        description: "Discussion of consent and healthy relationships age-appropriately",
        durationSeconds: 52,
        dialog: {
            transcriptions: [
                { text: "Today we're talking about healthy relationships", timestamp: 0, confidence: 0.96 },
                { text: "and the concept of consent.", timestamp: 4.6, confidence: 0.95 },
                { text: "Consent means clearly agreeing to something.", timestamp: 8.9, confidence: 0.96 },
                { text: "In any relationship, both people should feel", timestamp: 13.7, confidence: 0.94 },
                { text: "comfortable saying yes or no to activities.", timestamp: 18.3, confidence: 0.95 },
                { text: "No one should ever feel pressured or forced.", timestamp: 23.6, confidence: 0.96 },
                { text: "This applies to everything from holding hands", timestamp: 28.4, confidence: 0.95 },
                { text: "to more serious physical contact later in life.", timestamp: 33.1, confidence: 0.93 },
                { text: "Respecting boundaries is a sign of a healthy relationship,", timestamp: 38.7, confidence: 0.94 },
                { text: "whether with friends, dating partners, or anyone else.", timestamp: 44.2, confidence: 0.95 },
                { text: "You always have the right to say no.", timestamp: 49.3, confidence: 0.96 }
            ]
        }
    }
]

export const edgeCase_WatchingMovie: ClassroomDialogSample[] = [
    {
        subject: "History",
        gradeLevel: "10th Grade",
        qualityScore: 5,
        description: "Movie audio during educational film with minimal teacher commentary",
        durationSeconds: 180,
        dialog: {
            transcriptions: [
                { text: "Alright class, we're watching a documentary", timestamp: 0, confidence: 0.94 },
                { text: "about the Civil Rights Movement.", timestamp: 4.2, confidence: 0.95 },
                { text: "Please take notes on key events and people.", timestamp: 8.6, confidence: 0.93 },
                { text: "[Documentary narrator] In 1955, Rosa Parks", timestamp: 14.3, confidence: 0.89 },
                { text: "refused to give up her seat on a Montgomery bus.", timestamp: 19.7, confidence: 0.87 },
                { text: "[Documentary audio] This act of defiance sparked", timestamp: 25.4, confidence: 0.84 },
                { text: "a boycott that lasted over a year.", timestamp: 30.1, confidence: 0.86 },
                { text: "[Documentary music plays]", timestamp: 35.8, confidence: 0.72 },
                { text: "[Documentary narrator] Martin Luther King Junior", timestamp: 58.2, confidence: 0.88 },
                { text: "emerged as a leader of the movement.", timestamp: 63.5, confidence: 0.89 },
                { text: "[Background sounds and music]", timestamp: 89.3, confidence: 0.68 },
                { text: "[Teacher] Notice how the documentary shows", timestamp: 142.7, confidence: 0.91 },
                { text: "the interconnection between local and national efforts.", timestamp: 148.2, confidence: 0.88 },
                { text: "[Documentary continues]", timestamp: 154.6, confidence: 0.71 },
                { text: "[Teacher] We'll discuss this after the film.", timestamp: 175.3, confidence: 0.93 }
            ]
        }
    },
    {
        subject: "English",
        gradeLevel: "9th Grade",
        qualityScore: 4,
        description: "Watching film adaptation with extended periods of movie dialogue",
        durationSeconds: 240,
        dialog: {
            transcriptions: [
                { text: "Today we're watching the 1996 film version", timestamp: 0, confidence: 0.95 },
                { text: "of Romeo and Juliet to compare with the text.", timestamp: 4.8, confidence: 0.94 },
                { text: "[Movie audio] Two households, both alike in dignity...", timestamp: 12.4, confidence: 0.82 },
                { text: "[Movie dialogue continues]", timestamp: 28.7, confidence: 0.69 },
                { text: "[Sound of sword fight in movie]", timestamp: 56.3, confidence: 0.64 },
                { text: "[Movie character] A plague on both your houses!", timestamp: 89.6, confidence: 0.79 },
                { text: "[Movie music swells]", timestamp: 103.2, confidence: 0.58 },
                { text: "[Movie dialogue between characters]", timestamp: 134.8, confidence: 0.71 },
                { text: "[Teacher] Pay attention to how the director", timestamp: 187.5, confidence: 0.92 },
                { text: "uses modern settings for a classic story.", timestamp: 192.9, confidence: 0.90 },
                { text: "[Movie continues with romantic scene]", timestamp: 201.3, confidence: 0.67 },
                { text: "[Movie dialogue] But soft, what light...", timestamp: 218.7, confidence: 0.76 },
                { text: "[Background movie audio]", timestamp: 234.2, confidence: 0.62 }
            ]
        }
    },
    {
        subject: "Science",
        gradeLevel: "7th Grade",
        qualityScore: 6,
        description: "Educational video with teacher pausing to explain concepts",
        durationSeconds: 95,
        dialog: {
            transcriptions: [
                { text: "We're watching a video about the solar system.", timestamp: 0, confidence: 0.95 },
                { text: "I'll pause to discuss important points.", timestamp: 4.7, confidence: 0.94 },
                { text: "[Video narrator] The solar system formed", timestamp: 10.3, confidence: 0.87 },
                { text: "about 4.6 billion years ago.", timestamp: 14.8, confidence: 0.89 },
                { text: "[Video continues with animation sounds]", timestamp: 20.4, confidence: 0.73 },
                { text: "[Teacher pauses] Notice how the video shows", timestamp: 35.7, confidence: 0.92 },
                { text: "the relative sizes of the planets.", timestamp: 40.3, confidence: 0.93 },
                { text: "Jupiter is much larger than Earth.", timestamp: 44.8, confidence: 0.94 },
                { text: "[Video resumes] The gas giants...", timestamp: 50.2, confidence: 0.85 },
                { text: "[Video audio with music]", timestamp: 56.8, confidence: 0.68 },
                { text: "[Teacher] This part about the asteroid belt", timestamp: 72.4, confidence: 0.91 },
                { text: "will be on Friday's quiz, so take notes.", timestamp: 77.1, confidence: 0.92 },
                { text: "[Video continues]", timestamp: 82.6, confidence: 0.71 },
                { text: "[Video ending music]", timestamp: 90.3, confidence: 0.65 }
            ]
        }
    },
    {
        subject: "Foreign Language",
        gradeLevel: "High School",
        qualityScore: 3,
        description: "Movie in target language with minimal educational context",
        durationSeconds: 300,
        dialog: {
            transcriptions: [
                { text: "We're watching a French film today.", timestamp: 0, confidence: 0.94 },
                { text: "Try to pick up on the vocabulary we've learned.", timestamp: 4.3, confidence: 0.92 },
                { text: "[French dialogue from movie]", timestamp: 11.7, confidence: 0.58 },
                { text: "[Unclear French audio]", timestamp: 45.2, confidence: 0.43 },
                { text: "[Movie music and French dialogue]", timestamp: 89.6, confidence: 0.52 },
                { text: "[Laughter from movie scene]", timestamp: 134.8, confidence: 0.61 },
                { text: "[French conversation between actors]", timestamp: 176.3, confidence: 0.47 },
                { text: "[Background café sounds in movie]", timestamp: 218.9, confidence: 0.38 },
                { text: "[Emotional French dialogue]", timestamp: 256.7, confidence: 0.54 },
                { text: "[Movie ending credits music]", timestamp: 289.4, confidence: 0.49 },
                { text: "[Teacher] Okay, that's it for today.", timestamp: 295.1, confidence: 0.93 }
            ]
        }
    },
    {
        subject: "Social Studies",
        gradeLevel: "Middle School",
        qualityScore: 7,
        description: "Documentary with teacher providing context and asking comprehension questions",
        durationSeconds: 120,
        dialog: {
            transcriptions: [
                { text: "This documentary covers ancient Egyptian civilization.", timestamp: 0, confidence: 0.96 },
                { text: "I'll stop periodically to check your understanding.", timestamp: 5.4, confidence: 0.94 },
                { text: "[Documentary] The pyramids were built as tombs", timestamp: 11.8, confidence: 0.88 },
                { text: "for the pharaohs over 4,500 years ago.", timestamp: 17.2, confidence: 0.87 },
                { text: "[Documentary music and narration]", timestamp: 24.6, confidence: 0.72 },
                { text: "[Teacher pauses] Can anyone tell me why", timestamp: 42.3, confidence: 0.93 },
                { text: "the Egyptians built such massive structures?", timestamp: 47.1, confidence: 0.92 },
                { text: "[Student response unclear]", timestamp: 52.4, confidence: 0.76 },
                { text: "[Teacher] Exactly, it showed the pharaoh's power.", timestamp: 56.8, confidence: 0.94 },
                { text: "Let's continue.", timestamp: 61.3, confidence: 0.95 },
                { text: "[Documentary] The Nile River was essential", timestamp: 65.7, confidence: 0.86 },
                { text: "for agriculture and transportation.", timestamp: 70.9, confidence: 0.88 },
                { text: "[Documentary continues with images]", timestamp: 77.2, confidence: 0.74 },
                { text: "[Teacher] This flooding pattern they mention", timestamp: 98.6, confidence: 0.92 },
                { text: "was predictable, unlike other ancient rivers.", timestamp: 103.7, confidence: 0.91 },
                { text: "Write that down in your notes.", timestamp: 108.9, confidence: 0.94 },
                { text: "[Documentary concludes]", timestamp: 115.3, confidence: 0.79 }
            ]
        }
    }
]

// Transcriptions with side conversations, irrelevant information, or off-topic discussions
export const edgeCase_SideConversations: ClassroomDialogSample[] = [
    {
        subject: "English",
        gradeLevel: "9th Grade",
        qualityScore: 4,
        description: "Literature discussion constantly interrupted by side conversations about weekend plans",
        durationSeconds: 180,
        dialog: {
            transcriptions: [
                { text: "Today we're analyzing the symbolism in The Great Gatsby.", timestamp: 0, confidence: 0.96 },
                { text: "Chapter 3 has some interesting", timestamp: 5.2, confidence: 0.94 },
                { text: "[Student whisper] Did you see the game last night?", timestamp: 8.7, confidence: 0.87 },
                { text: "[Another student] Yeah, it was crazy!", timestamp: 11.3, confidence: 0.85 },
                { text: "elements we should discuss. The green light", timestamp: 13.8, confidence: 0.92 },
                { text: "[Side conversation] I can't believe that final play.", timestamp: 17.4, confidence: 0.83 },
                { text: "represents Gatsby's dreams and aspirations.", timestamp: 20.6, confidence: 0.94 },
                { text: "Can anyone tell me what other symbols", timestamp: 25.1, confidence: 0.95 },
                { text: "[Student] Are we having practice today?", timestamp: 28.9, confidence: 0.89 },
                { text: "[Another student] I think it got cancelled.", timestamp: 31.7, confidence: 0.87 },
                { text: "Excuse me, let's focus please. What symbols do we see?", timestamp: 34.5, confidence: 0.93 },
                { text: "[Student raises hand] The eyes of Doctor T.J. Eckleburg?", timestamp: 40.2, confidence: 0.91 },
                { text: "Excellent! Those represent", timestamp: 45.8, confidence: 0.95 },
                { text: "[Background chatter] Did you finish the math homework?", timestamp: 48.3, confidence: 0.81 },
                { text: "[Response] No, I'll do it at lunch.", timestamp: 51.6, confidence: 0.84 },
                { text: "the eyes of God watching over society.", timestamp: 53.9, confidence: 0.93 },
                { text: "[Multiple side conversations overlapping]", timestamp: 58.7, confidence: 0.67 },
                { text: "Class! Please! This is important for your essay.", timestamp: 63.4, confidence: 0.94 },
                { text: "Now, the parties at Gatsby's mansion", timestamp: 69.1, confidence: 0.92 },
                { text: "[Student] When's the essay due again?", timestamp: 73.8, confidence: 0.90 },
                { text: "[Teacher] Friday. As I was saying, the parties", timestamp: 76.5, confidence: 0.93 },
                { text: "[Loud whisper] Want to get pizza after school?", timestamp: 80.2, confidence: 0.86 },
                { text: "[Response] Can't, I have soccer.", timestamp: 83.7, confidence: 0.88 },
                { text: "symbolize the emptiness of the wealthy lifestyle.", timestamp: 86.4, confidence: 0.91 },
                { text: "[Paper rustling and general chatter]", timestamp: 92.8, confidence: 0.72 },
                { text: "Let's look at page 58 where", timestamp: 97.3, confidence: 0.94 },
                { text: "[Student] I left my book in my locker.", timestamp: 101.6, confidence: 0.89 },
                { text: "[Another student] You can share with me.", timestamp: 104.9, confidence: 0.87 },
                { text: "Fitzgerald describes the party scene. Notice how", timestamp: 108.2, confidence: 0.90 },
                { text: "[Side conversation continues] Thanks. So about this weekend", timestamp: 114.7, confidence: 0.82 },
                { text: "[Response] Yeah, we should definitely hang out.", timestamp: 118.4, confidence: 0.84 },
                { text: "the guests don't even know Gatsby. This is significant because", timestamp: 121.8, confidence: 0.89 },
                { text: "[Multiple conversations] [Unclear chatter]", timestamp: 128.5, confidence: 0.64 },
                { text: "Okay, I'm going to need everyone to settle down now.", timestamp: 134.2, confidence: 0.95 },
                { text: "We only have ten minutes left.", timestamp: 139.8, confidence: 0.96 },
                { text: "[Quieter but still some whispering]", timestamp: 143.6, confidence: 0.74 },
                { text: "For homework, I want you to identify three more symbols", timestamp: 148.1, confidence: 0.93 },
                { text: "and explain their significance in one paragraph each.", timestamp: 154.7, confidence: 0.92 },
                { text: "[Bell rings] [Sudden loud talking and movement]", timestamp: 161.3, confidence: 0.69 },
                { text: "Remember, Friday! Don't forget!", timestamp: 166.8, confidence: 0.91 },
                { text: "[Students leaving, multiple conversations]", timestamp: 171.4, confidence: 0.58 }
            ]
        }
    },
    {
        subject: "Science",
        gradeLevel: "7th Grade",
        qualityScore: 5,
        description: "Lab instructions disrupted by students discussing unrelated topics",
        durationSeconds: 240,
        dialog: {
            transcriptions: [
                { text: "Alright everyone, today we're doing our experiment on chemical reactions.", timestamp: 0, confidence: 0.95 },
                { text: "Please get into your lab groups and I'll explain the procedure.", timestamp: 6.3, confidence: 0.94 },
                { text: "[Students moving around, scraping chairs]", timestamp: 11.8, confidence: 0.71 },
                { text: "[Student] Did you guys watch that new show last night?", timestamp: 16.4, confidence: 0.88 },
                { text: "[Another student] Oh my gosh yes! It was so good!", timestamp: 20.1, confidence: 0.86 },
                { text: "First, you'll need to measure 50 milliliters", timestamp: 24.7, confidence: 0.93 },
                { text: "[Side talk] I can't believe what happened in episode 3.", timestamp: 28.9, confidence: 0.84 },
                { text: "of the vinegar solution and pour it into the beaker.", timestamp: 32.5, confidence: 0.92 },
                { text: "Make sure you're wearing your safety goggles.", timestamp: 38.1, confidence: 0.95 },
                { text: "[Student] Hey, can I borrow your phone charger later?", timestamp: 43.6, confidence: 0.87 },
                { text: "[Response] Yeah sure, remind me after class.", timestamp: 47.2, confidence: 0.85 },
                { text: "Then, slowly add the baking soda, one teaspoon at a time.", timestamp: 51.8, confidence: 0.91 },
                { text: "[Group conversation] What are you guys doing this weekend?", timestamp: 58.4, confidence: 0.83 },
                { text: "[Multiple responses overlapping]", timestamp: 62.7, confidence: 0.68 },
                { text: "Observe what happens and record your observations.", timestamp: 66.9, confidence: 0.94 },
                { text: "[Student] I'm so tired, I stayed up until 2 AM.", timestamp: 72.5, confidence: 0.89 },
                { text: "[Another] Same! I was texting with Jordan.", timestamp: 76.8, confidence: 0.87 },
                { text: "You should see bubbles forming. This is carbon dioxide gas.", timestamp: 81.3, confidence: 0.90 },
                { text: "[Teacher walking around] Guys, focus on the experiment please.", timestamp: 87.9, confidence: 0.92 },
                { text: "[Continued chatter about weekend plans]", timestamp: 93.4, confidence: 0.76 },
                { text: "Measure the temperature change using your thermometer.", timestamp: 98.7, confidence: 0.93 },
                { text: "[Student] Do we have to write all this down?", timestamp: 104.2, confidence: 0.90 },
                { text: "[Teacher] Yes, in your lab notebooks. Everything I'm saying.", timestamp: 108.6, confidence: 0.94 },
                { text: "[Discussion about video games]", timestamp: 115.3, confidence: 0.79 },
                { text: "This is an endothermic reaction, which means", timestamp: 120.8, confidence: 0.91 },
                { text: "[Student] Did anyone else not study for the math test?", timestamp: 125.4, confidence: 0.86 },
                { text: "[Multiple worried responses]", timestamp: 129.7, confidence: 0.74 },
                { text: "it absorbs heat from the surroundings. You'll notice", timestamp: 133.2, confidence: 0.89 },
                { text: "the beaker feels cooler to the touch.", timestamp: 138.9, confidence: 0.92 },
                { text: "[Student] Can we eat lunch in here today? It's raining.", timestamp: 143.6, confidence: 0.88 },
                { text: "[Teacher] No, you need to go to the cafeteria. Now", timestamp: 148.1, confidence: 0.93 },
                { text: "[Groaning from students about the rain]", timestamp: 153.7, confidence: 0.80 },
                { text: "calculate the change in temperature and record it.", timestamp: 158.4, confidence: 0.91 },
                { text: "[Students discussing lunch plans]", timestamp: 164.8, confidence: 0.77 },
                { text: "When you're done with your calculations, clean up your station.", timestamp: 170.3, confidence: 0.94 },
                { text: "[Student] Is anyone going to the basketball game Friday?", timestamp: 176.9, confidence: 0.87 },
                { text: "[Multiple students responding about the game]", timestamp: 181.5, confidence: 0.73 },
                { text: "Everyone, this is going to be on your quiz next week,", timestamp: 187.2, confidence: 0.93 },
                { text: "so make sure you understand what happened and why.", timestamp: 192.8, confidence: 0.92 },
                { text: "[Continuing side conversations]", timestamp: 198.6, confidence: 0.71 },
                { text: "I can see some groups aren't paying attention.", timestamp: 204.1, confidence: 0.94 },
                { text: "This is your warning. Focus or you'll lose participation points.", timestamp: 209.7, confidence: 0.93 },
                { text: "[Somewhat quieter, but still whispered conversations]", timestamp: 216.4, confidence: 0.78 },
                { text: "Alright, finish up your cleanup and make sure", timestamp: 222.8, confidence: 0.92 },
                { text: "your lab reports are completed for homework.", timestamp: 228.3, confidence: 0.93 },
                { text: "[Bell rings, immediate loud conversations resume]", timestamp: 234.7, confidence: 0.65 }
            ]
        }
    },
    {
        subject: "Math",
        gradeLevel: "8th Grade",
        qualityScore: 6,
        description: "Algebra lesson with students frequently asking off-topic questions",
        durationSeconds: 300,
        dialog: {
            transcriptions: [
                { text: "Good morning class. Today we're solving systems of equations.", timestamp: 0, confidence: 0.96 },
                { text: "Open your textbooks to page 147.", timestamp: 5.4, confidence: 0.95 },
                { text: "[Sound of books opening, some chatter]", timestamp: 9.8, confidence: 0.73 },
                { text: "We'll use the substitution method first. Who remembers", timestamp: 14.2, confidence: 0.93 },
                { text: "what that means from last week?", timestamp: 19.6, confidence: 0.94 },
                { text: "[Student] Is there going to be a fire drill today?", timestamp: 23.8, confidence: 0.89 },
                { text: "[Teacher] I don't know. Focus on math please. Anyone?", timestamp: 27.3, confidence: 0.92 },
                { text: "[Student] You solve for one variable and substitute it?", timestamp: 32.7, confidence: 0.90 },
                { text: "Correct! Let's look at example 1. We have x plus y equals 10", timestamp: 38.2, confidence: 0.91 },
                { text: "and x minus y equals 2.", timestamp: 44.6, confidence: 0.93 },
                { text: "[Student interrupting] Mr. Johnson, can I go to the bathroom?", timestamp: 48.9, confidence: 0.91 },
                { text: "[Teacher] After we finish this example. So if we add", timestamp: 52.4, confidence: 0.92 },
                { text: "[Another student] What page are we on again?", timestamp: 57.8, confidence: 0.88 },
                { text: "[Teacher] 147. If we add these equations together", timestamp: 61.2, confidence: 0.93 },
                { text: "the y terms cancel out. What do we get?", timestamp: 66.7, confidence: 0.94 },
                { text: "[Student] Wait, why are we adding them?", timestamp: 71.3, confidence: 0.89 },
                { text: "[Another student] When's the field trip again?", timestamp: 75.1, confidence: 0.87 },
                { text: "[Teacher sighs] The field trip is next month. And we're adding because", timestamp: 78.6, confidence: 0.90 },
                { text: "that's the elimination method. Let's stay focused.", timestamp: 85.2, confidence: 0.93 },
                { text: "Two x equals 12, so x equals?", timestamp: 90.7, confidence: 0.95 },
                { text: "[Student] Six!", timestamp: 94.8, confidence: 0.96 },
                { text: "[Another student] Did we have homework last night? I forgot.", timestamp: 97.3, confidence: 0.86 },
                { text: "[Teacher] Yes, you did. And yes, x equals 6. Now substitute", timestamp: 102.1, confidence: 0.91 },
                { text: "[Student] Can we work with partners on this?", timestamp: 108.6, confidence: 0.88 },
                { text: "that back into the first equation.", timestamp: 112.4, confidence: 0.93 },
                { text: "[Teacher] Not right now. So 6 plus y equals 10.", timestamp: 117.8, confidence: 0.92 },
                { text: "Therefore, y equals?", timestamp: 123.1, confidence: 0.95 },
                { text: "[Multiple students] Four!", timestamp: 126.4, confidence: 0.89 },
                { text: "[Student] Is this going to be on the test?", timestamp: 129.7, confidence: 0.90 },
                { text: "[Another] When is the test?", timestamp: 133.2, confidence: 0.91 },
                { text: "[Teacher] Everything is on the test. The test is Friday.", timestamp: 136.8, confidence: 0.93 },
                { text: "Now let's try a harder one. Example 2 on the board.", timestamp: 143.4, confidence: 0.94 },
                { text: "[Writing on board sounds]", timestamp: 148.9, confidence: 0.81 },
                { text: "[Student] My pencil broke. Does anyone have a pencil?", timestamp: 153.7, confidence: 0.88 },
                { text: "[Multiple students responding about pencils]", timestamp: 158.2, confidence: 0.76 },
                { text: "[Teacher] There are pencils on my desk. This system is", timestamp: 163.8, confidence: 0.91 },
                { text: "2x plus 3y equals 12 and 4x minus y equals 5.", timestamp: 170.3, confidence: 0.89 },
                { text: "Which method should we use here?", timestamp: 176.8, confidence: 0.94 },
                { text: "[Student] Can we use our calculators?", timestamp: 181.2, confidence: 0.90 },
                { text: "[Teacher] Not for this part. Think about the coefficients.", timestamp: 184.7, confidence: 0.92 },
                { text: "[Student] Substitution because we can solve for y easy in the second one?", timestamp: 191.3, confidence: 0.87 },
                { text: "Excellent reasoning! Let's do that. Solve the second equation for y.", timestamp: 197.8, confidence: 0.90 },
                { text: "[Student] Is it true we're getting a new principal?", timestamp: 204.6, confidence: 0.86 },
                { text: "[Multiple students start discussing the principal]", timestamp: 209.1, confidence: 0.74 },
                { text: "[Teacher firmly] Hey! We're doing math right now. After class", timestamp: 214.7, confidence: 0.91 },
                { text: "we can talk about school news. From 4x minus y equals 5", timestamp: 221.3, confidence: 0.89 },
                { text: "we get y equals 4x minus 5. Everyone follow?", timestamp: 227.8, confidence: 0.92 },
                { text: "[Some yes responses, some unclear chatter]", timestamp: 233.4, confidence: 0.78 },
                { text: "Now substitute that into the first equation.", timestamp: 238.9, confidence: 0.93 },
                { text: "[Student] Wait, I'm confused. Can you explain again?", timestamp: 244.6, confidence: 0.89 },
                { text: "[Another student] What are we supposed to be doing for homework?", timestamp: 249.2, confidence: 0.87 },
                { text: "[Teacher] Let me finish this example, then I'll explain homework.", timestamp: 253.8, confidence: 0.92 },
                { text: "2x plus 3 times, open parenthesis, 4x minus 5", timestamp: 260.4, confidence: 0.88 },
                { text: "[Student] How much time is left in class?", timestamp: 266.7, confidence: 0.90 },
                { text: "[Teacher] About five minutes. Let's wrap this up.", timestamp: 270.3, confidence: 0.93 },
                { text: "This simplifies to 2x plus 12x minus 15 equals 12.", timestamp: 276.8, confidence: 0.89 },
                { text: "So 14x equals 27, and x equals 27 over 14.", timestamp: 283.4, confidence: 0.87 },
                { text: "[Bell rings] [Immediate loud chatter and packing sounds]", timestamp: 289.7, confidence: 0.68 },
                { text: "[Teacher loudly] Homework is problems 1 through 15! Write it down!", timestamp: 294.2, confidence: 0.90 }
            ]
        }
    }
]

