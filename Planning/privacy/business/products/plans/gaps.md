# Prompt
How big of a gap can different wavelengths travel through? Show me a table from 1mhz to 100ghz, also show how far these waves travel and are usable. Include how confident you are in the accuracy


# ChatGPT
Wavelength λ = c / f, with c ≈ 3×10^8 m/s.
Rule-of-thumb for gap transmission (diffraction behavior):

Gap ≪ λ/10 → effectively blocked (very little energy diffracts through).

Gap ~ λ/2 → strongly diffracted (some energy passes but heavy loss / distortion).

Gap ≥ λ → will pass with much less diffraction loss (behaves more like free-space propagation).

|                Frequency |                              Wavelength λ = c/f (m) | Gap: likely **blocked** (< λ/10) | Gap: **strong diffraction** (~λ/2) | Gap: **passes** (≥ λ) | Typical usable distance / propagation mode                                                                                                                                      |  Confidence (gap / distance) |
| -----------------------: | --------------------------------------------------: | -------------------------------: | ---------------------------------: | --------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------: |
|    **1 MHz** (1×10^6 Hz) |                 300.0 m (λ = 3×10^8 / 1×10^6 = 300) |                       < **30 m** |                        ~ **150 m** |           ≥ **300 m** | **Hundreds → thousands km** easily via groundwave/ionospheric skywave; local groundwave tens → hundreds km depending on power.                                                  | **Gap: 95% / Distance: 60%** |
|   **10 MHz** (1×10^7 Hz) |                   30.0 m (λ = 3×10^8 / 1×10^7 = 30) |                        < **3 m** |                         ~ **15 m** |            ≥ **30 m** | **Tens → hundreds km** with skywave at night; groundwave tens of km.                                                                                                            | **Gap: 95% / Distance: 60%** |
|  **100 MHz** (1×10^8 Hz) |                     3.0 m (λ = 3×10^8 / 1×10^8 = 3) |              < **0.3 m (30 cm)** |                        ~ **1.5 m** |             ≥ **3 m** | **Local VHF broadcasting / FM:** typical ranges **10–200 km** depending on antenna height/terrain (mostly line-of-sight + tropospheric effects).                                | **Gap: 95% / Distance: 65%** |
|    **1 GHz** (1×10^9 Hz) |                  0.30 m (λ = 3×10^8 / 1×10^9 = 0.3) |              < **0.03 m (3 cm)** |               ~ **0.15 m (15 cm)** |  ≥ **0.30 m (30 cm)** | **Short to medium range**: handheld/wireless tens → a few km with typical antennas; with high-gain links tens of km (LOS).                                                      | **Gap: 95% / Distance: 70%** |
|  **10 GHz** (1×10^10 Hz) |                0.03 m (λ = 3×10^8 / 1×10^10 = 0.03) |             < **0.003 m (3 mm)** |              ~ **0.015 m (15 mm)** |  ≥ **0.03 m (30 mm)** | **Microwave links**: typical LOS links **hundreds of meters → tens of km** using directional antennas; poor penetration of obstacles.                                           | **Gap: 95% / Distance: 70%** |
|  **60 GHz** (6×10^10 Hz) | 0.005 m = **5.0 mm** (λ = 3×10^8 / 6×10^10 = 0.005) |                     < **0.5 mm** |                       ~ **2.5 mm** |          ≥ **5.0 mm** | **Short-range mmWave**: **1–20 m** for consumer devices (Wi-Gig / 802.11ad/ay); longer outdoor P2P possible with high gain but oxygen absorption limits range.                  | **Gap: 95% / Distance: 60%** |
| **100 GHz** (1×10^11 Hz) | 0.003 m = **3.0 mm** (λ = 3×10^8 / 1×10^11 = 0.003) |                     < **0.3 mm** |                       ~ **1.5 mm** |          ≥ **3.0 mm** | **Sub-mm to mmWave**: highly LOS, short range — usually **meters** in practice for consumer uses; specialized links can be longer but rapidly degraded by atmosphere/obstacles. | **Gap: 95% / Distance: 50%** |



# Gemini
| Frequency | Wavelength (λ) | Min "Gap" Size (≈λ/2) | Typical Usable Range | Common Usability / Application |
|-----------|----------------|----------------------|---------------------|-------------------------------|
| 1 MHz | 300 meters | 150 meters | 100s of miles (Ground Wave)<br>Global (Skywave/Night) | AM Radio. Penetrates water/earth well. |
| 10 MHz | 30 meters | 15 meters | Global (via Ionosphere bounce) | Shortwave Radio, Over-the-horizon radar. |
| 100 MHz | 3 meters | 1.5 meters | 30–50 miles (Line of Sight) | FM Radio, Marine Radio. Blocked by hills. |
| 1 GHz | 30 cm | 15 cm | 5–20 miles | Cell phones (4G/LTE), UHF TV. Penetrates walls. |
| 2.4 GHz | 12.5 cm | 6.25 cm | 100–300 feet (Indoor)<br>10 miles (High Power LOS) | Wi-Fi, Bluetooth, Microwave ovens. |
| 10 GHz | 3 cm | 1.5 cm | 1–5 miles | Radar, Satellite TV, Traffic sensors. Rain fade starts. |
| 24 GHz | 1.25 cm | ~6 mm | < 1 mile | 5G mmWave, Automotive Radar. Blocked by foliage. |
| 60 GHz | 5 mm | 2.5 mm | < 500 meters (Absorbed by Oxygen) | WiGig, Secure short-range data. |
| 100 GHz | 3 mm | 1.5 mm | < 100 meters | Experimental 6G, Terahertz imaging. |

# Claude
