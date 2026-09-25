
# Mobile App
WebView?
Capacitor?
Allows for being able to record audio while phone screen is off?

# Transcribing
- Transformers JS
- Speaker Identification (Diarization) via ? 
    - Seems a few options exist, pyannote is considered best? but does cost for premium, can run offline locally without some additional features, seems pretty fucking awesome
    - Hacky options exist
    - https://github.com/m-bain/whisperX but would require compute resources

- Other Metadata via ___

# Storage
- Can store transcriptions in ram / redis

# Instructions
- May want to revisit mui usage in the html since theres no typescript

# Rate Limiting & AI Tokens
- **REQUEST PER DAY, REQUEST PER MINUTE, TOKEN LIMITS** exist per service etc. I will probably need to account for this. May need to specifically contact for requested increases if it exists. Also, may need to throttle request timings, and prioritize higher tiers for faster responses. 
- Seems there are limits to be concerned about, and rate limits in terms of requests per minute. Probably will need to do some improvements in terms of the responses etc
- Also seemed like perhaps a large request and large response is better than a small one
- Also need to test nano / flash and other providers i think the pro maybe a bit excessive but still i want to see, and the token count being reported seems smaller than i would expect
- Retries & Exponential backoffs with queues etc, but i can probably get others to do this
- Rate limits are specific to the model, im probably using pro for too much can use flash, also can use other providers and share the load across them

# Internationalization
- Required initially, especially for web content. However, may want to feature flag information collection features / apps. TBD, actually depends on security etc? may not even matter
- Also need to consider how mobile app vs desktop app internationalization would work, actually is it a web ui in react native? May just need to have a config of which url to go to based on current country or something
