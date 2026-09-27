# Events

Should include similar data to what is returned from the api endpoint responses ( I think, tbd during implementation )

# Loot

Need something that marks whether a piece of loot has been opened yet or not so its known whether to display it or not. Likely this is whether the loot has been opened or not, but do I have a calculated field on each reward type that checks whether the lootbox has been opened or ..? May not want to retrieve the loot box each time inventory is queried and not duplicating the retrieval for each query so maybe a saved property rather than calculated property, but also want to prevent data integrity issues of a loot box not being opened but an item already being available
Need to be able to handle duplicates, sometimes duplicates maybe okay, i.e. sponsorship rewards
Also loot items will have an individual entry and an association entry, perhaps many to one and the join table will carry the flag for whether its unlocked or not

# Notifications / Inbox

Probably can wait but will want this, maybe complicated or maybe not. Probably can be implemented in stages. Either way I would say its not a priority # 1 for demo

# Types

Do I want types to be shared between frontend and backend? No because they have decorators etc, api response types shared? Maybe. Even if theres duplication its not that big of a deal until versioning comes into play, at this point I will probably have helpers who can create this and update types, but it would be good for me to set an example structure... although I cant do everything and this may not be that important at the moment

# Inventory / Loot

Multiple inventory and endpoints or shared single endpoint
Filterable by types?
Multiple separate models for loot / items or shared type with a type and maybe even subtype property

# Experience Endpoint

Return experience level list or have that happen on the backend? Probably backend and frontend just displays values

# Modules/Apps
Should the experience be its own app
Rewards probably should right
Inventory should
But user has a lot of connections, still its probably okay

Should I have the events in an events app and remove the events lib / move content to events app?

# Level experience requirements
Storing in the database and returning via an api seems like it might consume more data but would likely allow for easier change and expansion, guess I'll store in the database