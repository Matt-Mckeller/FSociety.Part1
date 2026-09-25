# 🔐 Secure Ubuntu Setup with Yubikey - Visual Flow Guide

## System Overview

```mermaid
graph TB
    A[🖥️ New Windows Machine] -->|Install| B[Ubuntu Desktop]
    B --> C{Full Disk Encryption?}
    C -->|✅ Yes LUKS| D[Encrypted System]
    C -->|❌ No| E[⚠️ Reinstall Required]
    E --> B
    D --> F[Yubikey 2FA Setup]
    F --> G[Security Hardening]
    G --> H[✅ Secure System]
    
    style D fill:#d4edda
    style E fill:#f8d7da
    style H fill:#d4edda
    style C fill:#fff3cd
```

---

## Complete Setup Timeline

```mermaid
timeline
    title Ubuntu Security Setup Journey
    section Installation
        Step 1 : Full Disk Encryption (LUKS)
               : ⚙️ Configure during install
               : Critical - cannot add later
    section Yubikey Setup
        Step 2 : Install Packages
               : libpam-u2f, yubikey-manager
        Step 3 : Register Yubikey
               : Primary + Backup keys
        Step 4 : Configure Login PAM
               : Require Yubikey for login
        Step 5 : Configure Sudo PAM
               : Require Yubikey for sudo
    section Hardening
        Step 6 : Enable Firewall
               : UFW activation
        Step 7 : Security Updates
               : Automatic patches
        Step 8 : Privacy Settings
               : Screen lock, etc.
        Step 9 : BIOS Configuration
               : Secure Boot, password
```

---

## Yubikey Authentication Flow

```mermaid
flowchart TD
    A[User Attempts Login] --> B{Password Correct?}
    B -->|❌ No| C[Access Denied]
    B -->|✅ Yes| D{Yubikey Present?}
    D -->|❌ No| C
    D -->|✅ Yes| E{Touch Yubikey}
    E -->|❌ Timeout| C
    E -->|✅ Touched| F[Access Granted]
    
    G[User Runs sudo] --> H{Password Correct?}
    H -->|❌ No| I[Command Denied]
    H -->|✅ Yes| J{Yubikey Present?}
    J -->|❌ No| I
    J -->|✅ Yes| K{Touch Yubikey}
    K -->|❌ Timeout| I
    K -->|✅ Touched| L[Command Executes]
    
    style F fill:#d4edda
    style L fill:#d4edda
    style C fill:#f8d7da
    style I fill:#f8d7da
```

---

## Security Layers

```mermaid
graph LR
    A[Physical Security] --> B[Boot Security]
    B --> C[Disk Encryption]
    C --> D[User Authentication]
    D --> E[System Hardening]
    E --> F[Network Security]
    
    A1[BIOS Password<br/>Secure Boot] -.-> A
    B1[LUKS Passphrase<br/>at Boot] -.-> C
    C1[Password + Yubikey<br/>2FA] -.-> D
    D1[AppArmor<br/>Updates<br/>USB Guard] -.-> E
    E1[UFW Firewall<br/>No SSH] -.-> F
    
    style A fill:#e7f3ff
    style B fill:#e7f3ff
    style C fill:#d4edda
    style D fill:#d4edda
    style E fill:#fff3cd
    style F fill:#fff3cd
```

---

## Installation Decision Tree

```mermaid
flowchart TD
    A[Start Ubuntu Installation] --> B{Want Full Disk Encryption?}
    B -->|✅ Yes| C[Select Advanced Options]
    B -->|❌ No| D[⚠️ Security Risk<br/>Reconsider!]
    D --> B
    C --> E[Check: Encrypt Installation]
    E --> F[Check: Use LVM]
    F --> G[Enter Strong Passphrase]
    G --> H{Passphrase ≥ 20 chars?}
    H -->|✅ Yes| I[Continue Installation]
    H -->|❌ No| J[⚠️ Too Weak]
    J --> G
    I --> K[✅ Ubuntu Installed<br/>with Encryption]
    
    style K fill:#d4edda
    style D fill:#f8d7da
    style J fill:#f8d7da
```

---

## Yubikey Configuration Process

```mermaid
sequenceDiagram
    participant User
    participant Terminal
    participant Yubikey
    participant PAM
    
    User->>Terminal: sudo apt install libpam-u2f
    Terminal->>User: Packages installed
    
    User->>Terminal: mkdir -p ~/.config/Yubico
    User->>Terminal: pamu2fcfg
    Terminal->>User: Insert and touch Yubikey
    User->>Yubikey: Touch key
    Yubikey->>Terminal: U2F credentials
    Terminal->>User: Key registered!
    
    User->>Terminal: Edit /etc/pam.d/gdm-password
    User->>PAM: Add: auth required pam_u2f.so
    
    User->>Terminal: Test with sudo
    Terminal->>User: Password?
    User->>Terminal: [enters password]
    Terminal->>User: Touch Yubikey
    User->>Yubikey: Touch key
    Yubikey->>PAM: U2F authentication
    PAM->>Terminal: ✅ Authenticated
```

---

## Security Status Matrix

```mermaid
%%{init: {'theme':'base'}}%%
quadrantChart
    title Security Features: Status & Priority
    x-axis Low Priority --> High Priority
    y-axis Manual Config --> Auto/Default
    quadrant-1 Default & Critical
    quadrant-2 Needs Configuration
    quadrant-3 Optional Enhancements
    quadrant-4 Default & Good
    AppArmor: [0.9, 0.9]
    Auto Updates: [0.85, 0.85]
    Disk Encryption: [0.95, 0.3]
    Yubikey 2FA: [0.9, 0.2]
    UFW Firewall: [0.7, 0.4]
    Screen Lock: [0.6, 0.3]
    Secure Boot: [0.8, 0.25]
    SSH Disabled: [0.5, 0.95]
    USB Guard: [0.3, 0.2]
    Password Policy: [0.4, 0.3]
```

---

## Default vs. Required Configuration

```mermaid
pie title Security Features Status
    "✅ Enabled by Default" : 30
    "⚙️ Needs Configuration" : 50
    "💡 Optional" : 20
```

### Legend:
- **✅ Enabled by Default (30%)**: AppArmor, Automatic Updates, SSH Disabled
- **⚙️ Needs Configuration (50%)**: Disk Encryption, Yubikey, Firewall, Secure Boot, Screen Lock
- **💡 Optional (20%)**: USB Guard, Audit Logging, Password Policies

---

## Recovery Plan Flowchart

```mermaid
flowchart TD
    A[🚨 Locked Out of System] --> B{Have Backup Yubikey?}
    B -->|✅ Yes| C[Use Backup Yubikey]
    C --> D[Login Successful]
    
    B -->|❌ No| E[Boot Recovery USB]
    E --> F[Decrypt LUKS Partition]
    F --> G{Know LUKS Passphrase?}
    G -->|❌ No| H[💀 Data Lost]
    G -->|✅ Yes| I[Mount System]
    I --> J[Chroot into System]
    J --> K[Edit PAM Config]
    K --> L[Remove Yubikey Requirement]
    L --> M[Reboot]
    M --> N[Login with Password Only]
    N --> O[Fix Configuration]
    
    style D fill:#d4edda
    style H fill:#f8d7da
    style O fill:#fff3cd
```

---

## Network Security Architecture

```mermaid
graph TB
    subgraph "External Network"
        A[Internet]
        B[LAN]
    end
    
    subgraph "UFW Firewall Rules"
        C[Incoming: DENY ALL]
        D[Outgoing: ALLOW ALL]
        E[Loopback: ALLOW]
    end
    
    subgraph "Ubuntu System"
        F[No SSH Server]
        G[Local Services Only]
        H[Development Tools]
    end
    
    A --> C
    B --> C
    C --> F
    C --> G
    D --> A
    D --> B
    E --> H
    
    style C fill:#f8d7da
    style D fill:#d4edda
    style F fill:#d4edda
```

---

## Step-by-Step Setup Sequence

```mermaid
stateDiagram-v2
    [*] --> Fresh_Install
    Fresh_Install --> Installing: Boot Ubuntu ISO
    Installing --> Encryption_Setup: Choose Install Options
    Encryption_Setup --> System_Boot: Complete Installation
    
    state Encryption_Setup {
        [*] --> Enable_Encryption
        Enable_Encryption --> Enable_LVM
        Enable_LVM --> Set_Passphrase
        Set_Passphrase --> [*]
    }
    
    System_Boot --> Package_Install: First Login
    Package_Install --> Yubikey_Config: Install PAM U2F
    
    state Yubikey_Config {
        [*] --> Register_Primary
        Register_Primary --> Register_Backup
        Register_Backup --> Configure_Login
        Configure_Login --> Configure_Sudo
        Configure_Sudo --> Test_Auth
        Test_Auth --> [*]
    }
    
    Yubikey_Config --> Security_Hardening: Yubikey Working
    
    state Security_Hardening {
        [*] --> Enable_Firewall
        Enable_Firewall --> Configure_Updates
        Configure_Updates --> Set_Privacy
        Set_Privacy --> Configure_BIOS
        Configure_BIOS --> [*]
    }
    
    Security_Hardening --> Verification: All Steps Complete
    Verification --> Production_Ready: Tests Passed
    Production_Ready --> [*]
```

---

## Critical Warning Points

```mermaid
journey
    title Setup Journey - Risk Points
    section Installation
        Choose encryption: 5: Critical
        Set LUKS passphrase: 5: Critical
        Install Ubuntu: 3: Safe
    section Yubikey
        Install packages: 2: Safe
        Register primary key: 4: Important
        Register backup key: 5: Critical
        Edit PAM login: 5: Critical
        Test before logout: 5: Critical
    section Hardening
        Enable firewall: 3: Safe
        Screen lock: 2: Safe
        BIOS settings: 4: Important
```

---

## Verification Checklist Flowchart

```mermaid
flowchart LR
    A[Start Verification] --> B{Disk Encrypted?}
    B -->|✅| C{Firewall Active?}
    B -->|❌| Z[❌ Failed]
    
    C -->|✅| D{SSH Disabled?}
    C -->|❌| Z
    
    D -->|✅| E{Yubikey Login Works?}
    D -->|❌| Z
    
    E -->|✅| F{Yubikey Sudo Works?}
    E -->|❌| Z
    
    F -->|✅| G{Auto Updates Enabled?}
    F -->|❌| Z
    
    G -->|✅| H{AppArmor Active?}
    G -->|❌| Z
    
    H -->|✅| I{Screen Lock Set?}
    H -->|❌| Z
    
    I -->|✅| J{Secure Boot Enabled?}
    I -->|❌| Z
    
    J -->|✅| K[✅ All Verified]
    J -->|❌| Z
    
    style K fill:#d4edda
    style Z fill:#f8d7da
```

---

## Resource Access Map

```mermaid
mindmap
  root((📚 Resources))
    Ubuntu Official
      Full Disk Encryption Guide
      UFW Firewall Docs
      AppArmor Documentation
      Automatic Updates Guide
      Secure Boot Wiki
    Yubico Official
      Ubuntu U2F Login Guide
      PAM U2F Documentation
      Getting Started Guide
      Yubikey Manager
    Security Standards
      NIST Guidelines
      CIS Ubuntu Benchmark
      USBGuard Docs
    Community
      Ubuntu Forums
      AskUbuntu
      Reddit r/Ubuntu
```

---

## Time Estimation per Phase

```mermaid
gantt
    title Setup Time Estimates
    dateFormat HH:mm
    axisFormat %H:%M
    
    section Installation
    Download Ubuntu ISO       :00:00, 30m
    Create bootable USB       :00:30, 15m
    Install with encryption   :00:45, 45m
    
    section Yubikey
    Install packages          :01:30, 10m
    Register Yubikeys         :01:40, 15m
    Configure PAM             :01:55, 20m
    Test authentication       :02:15, 15m
    
    section Hardening
    Enable firewall           :02:30, 10m
    Configure updates         :02:40, 10m
    Privacy settings          :02:50, 15m
    BIOS configuration        :03:05, 20m
    
    section Verification
    Run tests                 :03:25, 20m
    Final checks              :03:45, 15m
```

**Total estimated time: 2-3 hours**

---

## Priority Actions

```mermaid
graph TD
    A[🔥 CRITICAL - Do First] --> A1[Full Disk Encryption]
    A --> A2[Register Backup Yubikey]
    A --> A3[Test Auth Before Logout]
    
    B[⚙️ REQUIRED - Core Setup] --> B1[Configure Yubikey Login]
    B --> B2[Configure Yubikey Sudo]
    B --> B3[Enable Firewall]
    B --> B4[Secure Boot]
    
    C[💡 OPTIONAL - Enhancements] --> C1[USB Guard]
    C --> C2[Password Policies]
    C --> C3[Audit Logging]
    
    style A fill:#f8d7da
    style A1 fill:#f8d7da
    style A2 fill:#f8d7da
    style A3 fill:#f8d7da
    style B fill:#fff3cd
    style C fill:#e7f3ff
```

---

## System Boot Process with Security

```mermaid
sequenceDiagram
    participant User
    participant BIOS
    participant GRUB
    participant LUKS
    participant Ubuntu
    participant Login
    
    User->>BIOS: Power On
    BIOS->>BIOS: Check Secure Boot
    BIOS->>GRUB: Boot Loader
    GRUB->>LUKS: Load Encrypted Disk
    LUKS->>User: Request Passphrase
    User->>LUKS: Enter Passphrase
    LUKS->>LUKS: Decrypt Partition
    LUKS->>Ubuntu: Mount System
    Ubuntu->>Login: Start Display Manager
    Login->>User: Request Password
    User->>Login: Enter Password
    Login->>User: Touch Yubikey
    User->>Login: Touch Key
    Login->>Ubuntu: Grant Access ✅
```

---

## Quick Reference: Commands

### Installation Phase
```bash
# During Ubuntu installation:
# ✅ Check "Encrypt the new Ubuntu installation"
# ✅ Check "Use LVM"
```

### Yubikey Setup
```bash
# Install packages
sudo apt update && sudo apt install libpam-u2f yubikey-manager

# Register Yubikey
mkdir -p ~/.config/Yubico
pamu2fcfg > ~/.config/Yubico/u2f_keys
pamu2fcfg -n >> ~/.config/Yubico/u2f_keys  # backup key
```

### PAM Configuration
```bash
# Login auth
sudo nano /etc/pam.d/gdm-password
# Add: auth    required    pam_u2f.so

# Sudo auth
sudo nano /etc/pam.d/sudo
# Add: auth    required    pam_u2f.so
```

### Firewall
```bash
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### Verification
```bash
# Check encryption
lsblk -f | grep crypto

# Check firewall
sudo ufw status verbose

# Check SSH
systemctl status ssh

# Check AppArmor
sudo aa-status

# Test Yubikey
sudo -v
```

---

## 🎯 Success Criteria

```mermaid
graph LR
    A[✅ System Fully Secured] --> B[Disk Encrypted]
    A --> C[Yubikey 2FA Active]
    A --> D[Firewall Enabled]
    A --> E[No SSH Access]
    A --> F[Auto Updates On]
    A --> G[Secure Boot Set]
    A --> H[Recovery Plan Ready]
    
    style A fill:#d4edda
```

---

*Last Updated: December 2025*  
*Target: Ubuntu 22.04 LTS / 24.04 LTS*  
*Yubikey: 5C NFC*
