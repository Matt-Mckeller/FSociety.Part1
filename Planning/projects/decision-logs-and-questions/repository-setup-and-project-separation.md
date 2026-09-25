# Conclusion
Depends on the code, piece. Some ui aspects definitely are shared. Some backend are shared. But, for the reward system for example the authentication and roles would be a huge piece. So I'm not sure what to do there. 

Having everything in one repository is too much, security risk etc.

What other things may be sharable?
## Sharable pieces
- UI Components
- Art Stuff / Branding
- Gamification of UI? 
- Running LLM on frontend
- Knowledge

## TBD Whether its sharable
- The AI agent though, may be sharable. ( or just piece by piece )
- Gamification aspects, reward system -> auth/authorization differs, usage for things like leaderboards differs. 
    - Ability for projects to move independently is important. If I think about other people and not just me this becomes even more important.
- Wallet, coins, shops -> again auth/authorization differs, usage differs. Likely a changing priority piece, would be hard to communicate between teams
    - Ability for projects to move independently is important. If I think about other people and not just me this becomes even more important.
- Email Templates ( if similar branding )

## Not Shared
- Databases
- Accounts ( maybe depeneds on which business to business, probably not )


# Variables
- Clarity, flexibility. 
- May vary by time too, may setup similarly at the start or learn from each other
- The ability to adapt and move independently from the other projects is very high.
    - If I think about other people and not just me this becomes even more important.
- Communicate between teams and context knowledge needed -> better to simplify probably, but can be broken into smaller pieces. And AI helps, but still
- Authentication, Authorization, and Access control -> Probably needs split because of this? Or a centralized system for managing it and determining access to methods etc? What to do about this?
- Employees working at a coffee shop, people able to walk up to their pc when they go to rest room etc -> can't have everything in one repo. Even what the employees should access to is questionable. Limiting credential exposure etc helps for sure
- Data Differences & Data Overlap
    - Going to make a big impact, some data is clearly separate, like for marketing other businesses and their goals/objectives/input/assets, and whatever product use data is irrelevant to expanse edu, so these should be separated, however, expanse edu's data in the marketing system is relevant
- Privacy & Security
- Employee Retenetion & Keeping talent
    - Solution would probably be best as having equity based employees who are very dedicated
    - Alternatively: Separating out the AI aspects into its own repository is probably good, for one it keeps people thinking the AI aspects are harder to implement or they don't think about it as much.

## Context
Started working with Ai more and getting even better at coding with AI  
Problem:  When doing so I feel like it may be better to be able to build the frontend and backend at the same time and have context for both areas. I have projects on the frontend that are also doing things that belong on the backend  
Goal: Have an optimal setup for working with AI and optimal development speed/optimal context/etc  
Possible Goal: Maintaining privacy and not providing employees with every single thing in the system.

## A possible solution
A possible solution could be to focus on having a few people who are highly trusted, who have strict employment agreements, and who are more equity based members?

Idk man there’s going to be a lot of different pieces, I don’t want it all combined, like automated marketing business plan, etc has to be submodules, and II want the commits separate and/or workspaces

## My thoughts:
- Option: combing repositories
- Option: Switching to a package system for components and having multiple applications that are self contained frontend and backend
- Option: Mono repository
- Option: Sub modules

Might be interested in creating my own banking system too for privacy, but I guess idk if stripe sells data or not, they probably do not. I wonder how hard that is lol, probably not worth at the moment?

Definitely no single repository with everything, not even just a concern of employee access but external access etc. need to protect it  
Concern: overlap of tasks and files, working on things simultaneously, I wonder if I can have multiple projects working simultaneously and this would result in max throughput? Or not?



# Ai input
AI suggested the following:
Strong recommendation: Keep them SEPARATE.
This gives you maximum flexibility as each business grows and evolves independently.


Why Separate is Better Here:
1. Business Boundaries
Different businesses = different products
Independent P&L, roadmaps, and success metrics
One business's technical debt shouldn't block the other
2. Security & Data Isolation
Critical: Different auth/authz means different security models
Data breaches/issues isolated to one business
Compliance requirements may differ (GDPR, HIPAA, etc.)
Easier to audit and maintain separation of concerns
3. Independent Evolution
Business A needs feature X urgently → no risk to Business B
Different deployment schedules and risk profiles
Can deprecate/sunset one without affecting the other
Technology choices can diverge (different DB, frameworks, etc.)
4. Team & Resource Management
Different priorities mean different teams/focus
Clear ownership and accountability
Hiring and scaling decisions are independent
No "merge conflict" when both need resources

What to Share (via separate packages):
Good Candidates for Shared Packages:
✅ UI Component Library (if same brand/design system)
✅ Common Utilities (date formatting, validation helpers)
✅ Type Definitions (if some overlap)
✅ Design Tokens (colors, spacing, typography)
✅ Analytics/Observability helpers
✅ Email Templates (if similar branding)

Keep Separate:
❌ Authentication/Authorization logic
❌ Business logic and domain models
❌ Data access layers
❌ API routes and controllers
❌ Database migrations
❌ Environment configs