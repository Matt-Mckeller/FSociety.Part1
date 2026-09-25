Note: Curtain Attenuation is 70dB

| Attenuation (dB) | Power Reduction Factor ($\frac{P_{output}}{P_{input}}$) | $P_{output}$ as % of $P_{input}$ | Interpretation of Protection                                           |
|------------------|---------------------------------------------------------|----------------------------------|-----------------------------------------------------------------------|
| **50 dB**        | $10^5 = 100,000$                                        | $0.001\%$                        | Excellent protection: 99.999% of the signal/noise is blocked.         |
| **60 dB**        | $10^6 = 1,\!000,\!000$                                  | $0.0001\%$                       | Superior protection: Blocks all but one millionth of the energy.      |
| **70 dB**        | $10^7 = 10,\!000,\!000$                                 | $0.00001\%$                      | Blocks 10 million times the power.                                    |
| **80 dB**        | $10^8 = 100,\!000,\!000$                                | $0.000001\%$                     | Blocks 100 million times the power.                                   |
| **90 dB**        | $10^9 = 1,\!000,\!000,\!000$                            | $0.0000001\%$                    | Near-Perfect protection: Reduces power by a billion times.            |
| **100 dB**       | $10^{10} = 10,\!000,\!000,\!000$                        | $0.00000001\%$                   | Extreme isolation: Reduces power by ten billion times.                |



Attenuation (dB),Observability Impact,Application Context
20 dB,"Power reduced 100×. Can severely degrade the SNR for distant or weak links, but CSI may still function at short range.",A standard interior wall or a solid wooden door.
40 dB,"Power reduced 10,000×. Likely disrupts most consumer-grade CSI sensing for fine-grained activity recognition.",Heavy shielding like a reinforced concrete wall or specialized RF paint.
60 dB,"Power reduced 1,000,000×. This is often cited as the practical limit where commodity Wi-Fi hardware loses its ability to reliably measure fine-grained CSI data.","High-quality RF shielding (e.g., a Faraday enclosure)."
80 dB+,"Power reduced 100,000,000× or more. Provides extreme RF isolation that makes any CSI observability practically impossible outside of using highly specialized, non-commodity receivers.",Military or sensitive laboratory shielded rooms.


## Marketing
- Shields up to 80 to 94.5 dB with just the faraday fabric, but gaps could effect this.
    - The Rule of Thumb: To achieve effective shielding (typically 5$20 \text{ dB}$ or more), the longest dimension of the gap should be kept at or smaller than 6$\boldsymbol{\lambda/20}$ (one-twentieth of the wavelength).7
    - So, is probably fine but when wavelength gets to 39ghz then 1mm starts to become a potential concern, however product should have less than 1mm gaps?
- Mylar blankets: 10-30 dB additional shielding