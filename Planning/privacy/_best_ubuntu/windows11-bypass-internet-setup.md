# Windows 11: Bypass Internet Requirement During Setup

## Overview

Windows 11 Home (and some Pro editions) require an internet connection during the Out-of-Box Experience (OOBE) to force Microsoft account sign-in. This guide documents methods to bypass this requirement and set up a local account instead.

## Methods

### Method 1: OOBE\BYPASSNRO Command (Recommended)

This is the most reliable method that works on most Windows 11 installations.

**Steps:**

1. During the Windows 11 setup, when you reach the "Let's connect you to a network" screen:
   - Press **Shift + F10** to open Command Prompt
   
2. In the Command Prompt window, type:
   ```
   OOBE\BYPASSNRO
   ```
   
3. Press **Enter**

4. The system will automatically restart and return to the OOBE setup

5. When you reach the network connection screen again, you should now see:
   - **"I don't have internet"** option (click it)
   
6. On the next screen, click:
   - **"Continue with limited setup"**
   
7. You can now create a local account without requiring internet or Microsoft account

### Method 2: No Internet Workaround (Manual Bypass)

If Method 1 doesn't work, try this alternative.

**Steps:**

1. At the "Let's connect you to a network" screen:
   - Press **Shift + F10** to open Command Prompt

2. Disable network adapters with these commands:
   ```
   ipconfig /release
   ```

3. Close Command Prompt and click **"I don't have internet"**

4. Follow prompts to continue with limited setup

### Method 3: Blocked Email Address

This method tricks the system by using a blocked Microsoft account.

**Steps:**

1. Connect to WiFi when prompted

2. When asked to sign in with a Microsoft account, enter:
   - Email: `no@thankyou.com` or `a@a.com`
   - Password: (any random text)

3. The system will reject this account and offer:
   - Option to create a local account instead

4. Proceed with local account creation

## USB Security Considerations Pre-Installation

### Risks of Connecting USB Devices Before OS Installation

**YES, there are significant vulnerabilities** when connecting USB devices before the OS loads:

#### 1. **Firmware-Level Attacks (BadUSB)**
- USB devices can masquerade as keyboards and execute commands
- Firmware exploits can run at BIOS/UEFI level before OS boots
- **Cannot be detected** by traditional antivirus or hash checking
- Device can reprogram itself to appear as different hardware types

#### 2. **DMA (Direct Memory Access) Attacks**
- Thunderbolt/USB-C devices can access system memory directly
- Can bypass OS security before it even loads
- Can extract encryption keys, passwords from RAM
- **PCILeech** and similar tools exploit this

#### 3. **UEFI/BIOS Exploits**
- Malicious bootloaders on USB can compromise firmware
- Can install persistent rootkits below OS level
- Survives OS reinstallation and disk wiping

#### 4. **Boot Sector Attacks**
- USB can inject malicious boot code
- Runs before any OS security mechanisms

### What You CAN'T Verify with Hash Checking

Hash verification only checks **file contents**, not:
- ❌ USB device firmware
- ❌ Controller chip behavior
- ❌ Hidden partitions or storage
- ❌ Device masquerading (BadUSB)
- ❌ DMA capabilities

### Mitigation Strategies

#### Before Connecting ANY USB Device:

1. **Use Trusted USB Devices Only**
   - Purchase from reputable retailers directly
   - Avoid used/unknown USB devices
   - Never use found USB drives

2. **Disable DMA Protections in BIOS/UEFI**
   - Enable **Kernel DMA Protection** (Intel VT-d, AMD-Vi)
   - Disable Thunderbolt if not needed
   - Enable **Secure Boot**
   - Set **BIOS/UEFI password**

3. **USB Port Control**
   - Use USB 2.0 ports (no DMA capability)
   - Avoid USB-C/Thunderbolt ports during setup
   - Some systems allow disabling USB ports in BIOS

4. **Air-Gap Verification**
   - Verify USB contents on a separate, isolated system first
   - Use a dedicated, never-networked machine for verification
   - Consider USB data blockers (power-only cables)

5. **Hardware Write Protection**
   - Use USB drives with physical write-protect switches
   - Create read-only installation media
   - Burn to read-only media (DVD) when possible

#### Safest Practice: Known-Good Installation Media

1. **Create USB on trusted machine**
2. **Verify hash immediately after creation**
3. **Physical write-protect the device**
4. **Store securely** until use
5. **Re-verify hash** before installation

### USB Data Blocker Option

For charging/power during setup without data risks:
- Use USB data blockers (power-only adapters)
- Prevents data line access entirely
- Useful for keyboard/mouse during verification

## Verifying USB Files Before Installation

You can use the Command Prompt (available during OOBE) to verify hash values of files on connected USB drives **before** installing Windows.

**⚠️ Important**: Hash verification only validates file content, not USB device firmware or behavior. See security section above.

### Available Hash Verification Tools

**Using CertUtil (Recommended):**

1. Press **Shift + F10** during setup to open Command Prompt

2. List connected drives:
   ```
   wmic logicaldisk get name,description
   ```
   or simply:
   ```
   dir D:\ 
   ```
   (replace D: with your USB drive letter)

3. Verify file hashes with CertUtil:
   ```
   certutil -hashfile D:\path\to\file.exe SHA256
   certutil -hashfile D:\path\to\file.exe SHA1
   certutil -hashfile D:\path\to\file.exe MD5
   ```

4. Compare the output hash with your known-good hash values

**Using PowerShell (If Available):**

1. From Command Prompt, launch PowerShell:
   ```
   powershell
   ```

2. Verify hashes using Get-FileHash:
   ```powershell
   Get-FileHash D:\path\to\file.exe -Algorithm SHA256
   Get-FileHash D:\path\to\file.exe -Algorithm SHA1
   ```

3. For multiple files in a directory:
   ```powershell
   Get-ChildItem D:\drivers\*.sys | Get-FileHash -Algorithm SHA256
   ```

### Practical Use Cases

- **Driver verification**: Check driver files before installation
- **Installation media**: Verify Windows ISO integrity
- **Security tools**: Confirm antivirus or security software hasn't been modified
- **Scripts**: Verify PowerShell scripts or batch files are authentic

### Limitations in OOBE Environment

- Not all PowerShell cmdlets may be available
- Network access is limited
- Some advanced tools may not be present
- Read-only access to most system areas
- **Cannot detect firmware-level threats** (BadUSB, DMA attacks)
- Hash checking verifies files only, not device hardware behavior

### Example Workflow

```cmd
# 1. Open Command Prompt (Shift + F10)
# 2. Navigate to USB drive
D:
cd drivers

# 3. List files
dir

# 4. Verify each critical file
certutil -hashfile chipset_driver.inf SHA256
certutil -hashfile network_driver.sys SHA256

# 5. Compare with your documented hashes
# 6. Proceed with installation only if hashes match
```

## Important Notes

### Security Considerations

- **USB Security First**: Review USB security section above before connecting any devices
- **Trusted USB Only**: Only use USB devices from known, trusted sources
- **Enable Secure Boot**: Configure in BIOS/UEFI before installation
- **Disable DMA**: Enable Kernel DMA Protection in firmware settings
- **Verify before installing**: Use the hash verification method above to check USB files
- **Local accounts** provide more privacy and control
- **No telemetry** is sent to Microsoft during offline setup
- Set a **strong password** for your local account
- Enable **BitLocker** encryption after setup (Pro/Enterprise editions)

### Post-Setup Actions

After bypassing the internet requirement:

1. **Updates**: Connect to internet and run Windows Update to get security patches
2. **Drivers**: Install necessary device drivers
3. **Security**: 
   - Enable Windows Defender
   - Configure Windows Firewall
   - Set up BitLocker (if available)
4. **Privacy Settings**: Review and configure telemetry settings in:
   - Settings → Privacy & Security

### When This Works

- ✅ Windows 11 Home (any build)
- ✅ Windows 11 Pro (certain builds)
- ✅ Fresh installations
- ✅ Reset/reinstall scenarios

### Limitations

- Some OEM systems may have additional restrictions
- Future Windows 11 updates might change these methods
- Enterprise/Education editions typically allow local accounts by default

## Alternative: Windows 11 Pro

Windows 11 Professional editions often provide easier local account setup:

1. During setup, select **"Set up for work or school"**
2. Then choose **"Sign-in options"**
3. Select **"Domain join instead"**
4. Create a local account

## References

- This workaround is widely documented in tech communities
- Microsoft has acknowledged but not officially endorsed these methods
- Methods are subject to change with Windows 11 updates

## Last Updated

December 2025

---

**Note**: These methods are for legitimate use cases where users prefer local accounts for privacy, security, or offline environments. Always ensure your system is properly secured and updated after installation.
