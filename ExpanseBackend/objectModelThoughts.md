# Notes
I need to be doing pass throughs when querying but I also need to save the data in my own system when querying
And then adding additional fields 
Will need soft delete

May need event queues rather than cron jobs ( implement with cron first to get it running )

# Implementation
Step 1, pass through to edlink, save results in my db too with additional fields as needed


# Apps

Backend EDU / School
Rewards
Wallet
Experience


# Models
<Copy From Ed Link>
IntegrationType
    type: 'blackboard' | 'canvas' | 'google classroom' | 'infinite campus'
Integration
    name
    accessToken

District
    id	string	The UUID for the object.
    edLinkID

School
    id	string	The UUID for the object.
    edLinkID

Session
    id	string	The UUID for the object.
    edLinkID

Course
    id	string	The UUID for the object.
    edLinkID

Class
    id	string	The UUID for the object.
    edLinkID

Section
    id	string	The UUID for the object.
    edLinkID

Enrollment
    id	string	The UUID for the object.
    edLinkID

Person
    id	string	The UUID for the object.
    edLinkID
    expanseDisplayName
    
Agent
    ?

Assignment 
    id	string	The UUID for the object.
    edLinkID
    personId
    classId

Submission
    id	string	The UUID for the object.
    edLinkID
    personId

RewardableEvent
    assignmentId
    personId
    type
    classId
    experience
    createdAt
    updatedAt

RewardableEventHistory

Experience
    id
    personId
    level
    experience

ExperienceEvents
    id
    experienceId
    change

Wallet
    id
    personId
    coinIds
Wallet Events
    id
    walletId
    coinId
    eventType
    value

?
WalletEvents
ExperienceEvents
PurchaseEvents
ClaimEvents

?
Roles ( how to handle when they can be multiple roles, for now allow just one ? allow them to choose after logging in and store the role as a session config? ) Allow both at once? Restriction primary concern is accessing your own data rather than someone elses, but also displaying the right pages

Loot Box


Session / JWT / AuthenticationTokens
    Type: Ed.Link, Access Token, Refresh Token, Refresh Timestamp, Refresh Count
User Account
Agreements: 
    PrivacyPolicy & Terms of Use Accepted



# Relationships
Reward <-> Enrollment
Wallet <-> Person
Wallet <-> Coins ( join table with quantity for each coin )
Inventory <-> Person
Reward <-> Person ( multiple associations with each reward for inventory rather than a count, and timestamps for each )
Person <-> AuthenticationTokens ? or Authentication or something
Coin <-> Classroom
Loot Box <-> Rewards


Rewards can be associated with a person for multiple reasons. And this will likely require a join table with properties. I.e. creator, consumer, also the join table will likely say how many a person has
Inventory may actually be a query on this join table and other objects as well. But, need to know when a change happens, so perhaps a table that is associated with this join table



# APIs
Get classes/enrollments
Get assignments
Get submissions
Determine submission eligibility for reward and status
Claim rewards / redeem rewards
Get loot boxes
Open loot box
Add reward option to classroom/school/parent store
Get experience / progress
Get inventory items

get my classes
get class stores
    has store setup / does not have store setup
Get class store rewards
    should include purchase eligibility ( max count )

determine user roles types ( teacher / student )
    at least whether they have a class or not



# Logic
Add coins when claiming rewards
Add experience/progress when claiming rewards
Add inventory items/rewards when opening loot
Calculate rewards for claimed rewards

Watching for data changes for reward events ( can delay this until after SVS, hard code reward events for now )
    Assignments could be deleted, or updated
    Submissions could be resubmitted
    
Watching for enrollment changes 
    Students could change classes ( reward events will need to stay associated with old classes )
Syncing & Change Event handling
    Need to sync assignments, classes, submissions, people, enrollments, etc
    Students moving classes
    Changing teachers


# Questions
If its the same do I separate it out into a different application or keep it in this one?
The naming/organization could be somewhat confusing here ? Would like to avoid that
Could make this part of expanse edu backend standard rather than separating

Do I need a rewardable event object or do I use the submissions and other things
    feels like probably rewardable event object, and status can be tracked on this?


# User Journey
**User Auth**

**Student Reward View**
User logs in -> Grab their classes -> Grab their assignments -> Grab their rewardable events ( which grabs their submissions )
User claims event rewards ( return calculated results )
Backend handles updating experience & wallet, frontend requests updates

**Viewing Rewards**

**Claiming Rewards**

**Teacher Reward Creation**
Teacher wants to create rewards for their classes
Determine which classes they are teaching, grab existing rewards for these classes, 

Add new rewards for a specific class which they are a part of

**Store: Student View**
Get which classes the user is in
Get which classes have stores set up / associated rewards
Get which classes do not have stores set up
Get the available rewards for which classes and their costs

Determine purchase eligibility of the rewards ( i.e. if theres a max purchase amount )

**Store: Student Purchase**
Allow purchasing of store reward, add reward to inventory, deduct coins, reject if theres not enough coins. Reward should be redeemable ( each instance of the reward, so perhaps instead of having a count associated with a reward I should have multiple associations with dates )

**Student: Redeem Reward**
Student should be able to pass in a reward id to a redeem function and get a confirmation number or error message

**Student Wants to View Current Progress**

**Student Wants to Determine the number of loot boxes they have**
