Concern: Vent gaps
    Solution: Closable

Questions: does it even matter if theres some gap if it cant be used for reconstruction of the pw? Does the gap allow visibility?

Improvement Options: Multi Layer, corner pieces, beam support on outside for additional tolerance improvements

Tape is an option too, its like 1mm probably?

May want the backing blocks to prevent the foam from being moved due to magnet to prevent the bumps and keep the alignment as flush as possible

Additional Structural pieces on the outside may not work though? well it might tbh, i'd just have to see what happens

mmWave 5G (Millimeter Wave):

24-28 GHz (n257, n258, n261 bands) ← THIS is what I mentioned
37-40 GHz (n260, n262)
47 GHz

Distance 100-500m

 gap size needs to be below: ___

Gap Performance at 47 GHz
Gap Size	Relative to λ	Expected Shielding	Result
0.1 mm	λ/64	~75 dB	✅ Excellent
0.2 mm	λ/32	~70 dB	✅ Good
0.32 mm	λ/20 (threshold)	~60 dB	⚠️ Fair
0.5 mm	λ/13	~50 dB	⚠️ Marginal
1 mm	λ/6.4	~35 dB	❌ Poor
2 mm	λ/3.2	~20 dB	❌ Very poor
3 mm	λ/2.1	~10 dB	❌ Nearly useless

Solution: Tape ( Copper, but it also mentions aluminum for some reason )

Frequency Range	Wavelength	Known Attack Method	Equipment Cost	Gap Tolerance
60 Hz - 100 kHz	5000 km - 3 km	Power line analysis	$1K-10K	Not applicable (different physics)
100 MHz - 2 GHz	3m - 15cm	TEMPEST/Van Eck	$5K-50K	2mm gaps OK ✅
2.4 GHz	12.5 cm	WiFi CSI, Bluetooth	$500-5K	2mm gaps OK ✅
5 GHz	6 cm	WiFi CSI	$500-5K	1-2mm marginal ⚠️
6 GHz	5 cm	WiFi 6E CSI (future)	$1K-10K	1mm needed ⚠️
24 GHz	1.25 cm	Radar keystroke detection	$10K-100K	<0.5mm needed ❌
47 GHz	6.4 mm	mmWave radar (theoretical)	$50K-500K	<0.3mm needed ❌
60 GHz	5 mm	Research on keystroke detection	$50K-500K	<0.25mm needed ❌
77 GHz	3.9 mm	Automotive radar (repurposed)	$10K-100K	<0.2mm needed ❌

Is a tent better?
or a blanket?

Light gap test (flashlight, free) - detects gaps >0.1mm visually