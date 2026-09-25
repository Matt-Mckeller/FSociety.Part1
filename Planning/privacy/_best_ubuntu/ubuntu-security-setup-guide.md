# Secure Ubuntu Setup Guide with Yubikey 5C NFC

**System Profile:**
- Single-user Ubuntu desktop system
- Use case: General desktop use + development
- Hardware security: Yubikey 5C NFC (Near Field Communication)
- Full disk encryption required
- SSH (Secure Shell) disabled

---

## Table of Contents
1. [Installation Phase: Full Disk Encryption](#1-installation-phase-full-disk-encryption)
2. [Yubikey Setup for System Login](#2-yubikey-setup-for-system-login)
3. [Yubikey Setup for Sudo](#3-yubikey-setup-for-sudo)
4. [Security Hardening](#4-security-hardening)
5. [Verification Steps](#5-verification-steps)
6. [Recovery Planning](#6-recovery-planning)
7. [Sources](#7-sources)

---

## 1. Installation Phase: Full Disk Encryption

### 1.1 Enable LUKS Full Disk Encryption During Install
**Status:** ⚙️ Requires configuration during installation

**Steps:**
1. Boot from Ubuntu installation media
2. Choose "Erase disk and install Ubuntu"
3. **Check "Encrypt the new Ubuntu installation for security"**
4. Select "Use LVM (Logical Volume Manager) with the new Ubuntu installation"
5. Set a strong encryption passphrase (you'll enter this at boot)

**Notes:**
- This uses LUKS (Linux Unified Key Setup) encryption
- Encryption happens BEFORE system installation
- Cannot be added after installation without reinstalling
- Passphrase is required at every boot

**Source:** [Ubuntu Official Documentation - Disk Encryption](https://help.ubuntu.com/community/Full_Disk_Encryption_Howto_2019)

---

## 2. Yubikey Setup for System Login

### 2.1 Install Required Packages
**Status:** ⚙️ Requires installation

```bash
sudo apt update
sudo apt install libpam-u2f yubikey-manager
```

### 2.2 Configure Yubikey for U2F
**Status:** ⚙️ Requires configuration

```bash
# Create config directory
mkdir -p ~/.config/Yubico

# Register your Yubikey (touch it when it blinks)
pamu2fcfg > ~/.config/Yubico/u2f_keys

# Optional: Register a backup Yubikey
pamu2fcfg -n >> ~/.config/Yubico/u2f_keys
```

### 2.3 Configure PAM for Login
**Status:** ⚙️ Requires configuration

Edit `/etc/pam.d/gdm-password` (for GNOME) or `/etc/pam.d/lightdm` (for other DMs (Display Managers)):

```bash
sudo nano /etc/pam.d/gdm-password
```

Add this line AFTER the `@include common-auth` line:
```
auth    required    pam_u2f.so nouserok
```

**Important Options:**
- `nouserok` - allows login without Yubikey (fallback to password)
- Use `sufficient` instead of `required` for password OR Yubikey
- Use `required` for password AND Yubikey (recommended for maximum security)

**Recommended configuration for your use case:**
```
auth    required    pam_u2f.so
```
This requires BOTH password and Yubikey for login.

### 2.4 Test Before Logging Out
**Status:** ⚙️ Critical step

```bash
# Open a new terminal and test sudo
sudo -v
# You should be prompted for password + Yubikey touch

# If it works, you're safe to log out and test login
```

**Recovery:** Keep a root terminal open until you verify login works!

**Source:** [Yubico - Ubuntu Linux Login Guide](https://support.yubico.com/hc/en-us/articles/360016649099-Ubuntu-Linux-Login-Guide-U2F)

---

## 3. Yubikey Setup for Sudo

### 3.1 Configure PAM (Pluggable Authentication Modules) for Sudo
**Status:** ⚙️ Requires configuration

Edit `/etc/pam.d/sudo`:

```bash
sudo nano /etc/pam.d/sudo
```

Add this line AFTER `@include common-auth`:
```
auth    required    pam_u2f.so
```

**Note:** This requires Yubikey touch for every sudo command.

### 3.2 Optional: Add Timeout
**Status:** 💡 Optional enhancement

To avoid touching Yubikey repeatedly, add to `/etc/sudoers`:
```bash
sudo visudo
```

Add:
```
Defaults    timestamp_timeout=15
```

This caches sudo authentication for 15 minutes.

**Source:** [Yubico - PAM U2F (Universal 2nd Factor) Documentation](https://developers.yubico.com/pam-u2f/)

---

## 4. Security Hardening

### 4.1 Firewall (UFW - Uncomplicated Firewall)
**Status:** 🔧 Installed by default, but INACTIVE

```bash
# Enable firewall
sudo ufw enable

# Check status
sudo ufw status verbose

# Default policy (deny incoming, allow outgoing)
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

**Note:** ✅ UFW is installed by default but disabled. This enables it.

**Source:** [Ubuntu UFW Documentation](https://help.ubuntu.com/community/UFW)

### 4.2 Disable SSH (If Installed)
**Status:** ✅ SSH (Secure Shell) server is NOT installed by default on Ubuntu Desktop

```bash
# Verify SSH is not running
systemctl status ssh

# If it exists and you want to remove it
sudo apt remove openssh-server
```

**Note:** ✅ Ubuntu Desktop does NOT install SSH server by default. No action needed unless you installed it.

### 4.3 Automatic Security Updates
**Status:** ✅ Enabled by default on Ubuntu

```bash
# Verify unattended-upgrades is installed and enabled
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
# Select "Yes" when prompted

# Check configuration
cat /etc/apt/apt.conf.d/20auto-upgrades
```

**Expected output:**
```
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```

**Note:** ✅ This is typically enabled by default on Ubuntu Desktop.

**Source:** [Ubuntu Automatic Updates](https://help.ubuntu.com/community/AutomaticSecurityUpdates)

### 4.4 AppArmor
**Status:** ✅ Enabled by default

```bash
# Check AppArmor status
sudo aa-status
```

AppArmor is Ubuntu's MAC (Mandatory Access Control) system, enabled by default.

**Note:** ✅ No action needed - already active by default.

**Source:** [Ubuntu AppArmor](https://ubuntu.com/server/docs/security-apparmor)

### 4.5 Disable Bluetooth (If Not Needed)
**Status:** ✅ Enabled by default, ⚙️ optional to disable

Since you have Yubikey 5C NFC (Near Field Communication), you might use NFC. If you don't need Bluetooth:

```bash
sudo systemctl disable bluetooth.service
sudo systemctl stop bluetooth.service
```

**Note:** 💡 Optional - only disable if you don't use Bluetooth devices.

### 4.6 Privacy Settings
**Status:** ⚙️ Requires configuration

**Manual steps in Settings:**
1. Settings → Privacy → Screen → Blank Screen Delay: 5 minutes
2. Settings → Privacy → Screen → Automatic Screen Lock: ON
3. Settings → Privacy → Screen → Lock Screen on Suspend: ON
4. Settings → Privacy → File History & Trash → File History: OFF (optional)
5. Settings → Privacy → Connectivity → Thunderbolt: Allow only with user authorization

**Note:** ⚙️ Screen lock settings need manual configuration for security.

### 4.7 Secure Boot
**Status:** 🔧 BIOS/UEFI configuration required

**Steps:**
1. Enter BIOS (Basic Input/Output System) / UEFI (Unified Extensible Firmware Interface) during boot (usually F2, F12, or DEL)
2. Enable Secure Boot
3. Set BIOS/UEFI password
4. Disable boot from USB (Universal Serial Bus) / CD (or set password protection)
5. Save and exit

**Note:** ⚙️ Requires UEFI firmware configuration during initial setup.

**Source:** [Ubuntu Secure Boot](https://wiki.ubuntu.com/UEFI/SecureBoot)

### 4.8 Password Policy
**Status:** ⚙️ Requires configuration

Install password quality checking:
```bash
sudo apt install libpam-pwquality
```

Edit `/etc/security/pwquality.conf`:
```bash
sudo nano /etc/security/pwquality.conf
```

Recommended settings:
```
minlen = 14
dcredit = -1
ucredit = -1
ocredit = -1
lcredit = -1
```

**Note:** ⚙️ Default password requirements are basic. This strengthens them.

### 4.9 Fail2Ban (Optional for SSH)
**Status:** ❌ Not needed

Since you're not running SSH (Secure Shell), Fail2Ban is not necessary. It's primarily for protecting SSH and other network services.

### 4.10 USB Guard (Advanced)
**Status:** 💡 Optional advanced feature

Protects against malicious USB (Universal Serial Bus) devices:

```bash
sudo apt install usbguard
# Generate policy with YubiKey connected
sudo usbguard generate-policy > /etc/usbguard/rules.conf
sudo systemctl enable usbguard  # Start automatically at boot
sudo systemctl start usbguard   # Start now
```

**Important:** 
- Generate policy WITH YubiKey plugged in (otherwise it will be blocked)
- `enable` makes USBGuard start automatically at every boot
- Test login/logout before rebooting

**Note:** 💡 Optional - useful if you're concerned about USB attacks. See [usbguard-yubikey-setup.md](usbguard-yubikey-setup.md) for detailed testing procedure.

**Source:** [USBGuard Documentation](https://usbguard.github.io/)

### 4.11 Audit Logging
**Status:** ⚙️ Optional but recommended for security monitoring

```bash
sudo apt install auditd
sudo systemctl enable auditd
sudo systemctl start auditd
```

**Note:** 💡 Optional - provides detailed system audit logs.

---

## 5. Verification Steps

### 5.1 Security Checklist

Run these commands to verify your setup:

```bash
# 1. Check disk encryption
lsblk -f | grep crypto

# 2. Check firewall
sudo ufw status verbose

# 3. Check SSH is not running
systemctl status ssh || echo "SSH not installed ✓"

# 4. Check automatic updates
cat /etc/apt/apt.conf.d/20auto-upgrades

# 5. Check AppArmor
sudo aa-status | head -n 5

# 6. Test Yubikey for sudo
sudo -v

# 7. List all listening network services
sudo ss -tlnp
```

### 5.2 Expected Results

- Disk encryption: Should show `crypto_LUKS` partitions
- Firewall: Should show "Status: active"
- SSH: Command should fail or show "not installed"
- AppArmor: Should show profiles loaded and enforced
- Yubikey: Should prompt for password + require Yubikey touch
- Network services: Minimal services (CUPS, Avahi, etc.)

---

## 6. Recovery Planning

### 6.1 Create Recovery Options

**CRITICAL:** Before finalizing Yubikey authentication:

1. **Buy a backup Yubikey** and register it:
   ```bash
   pamu2fcfg -n >> ~/.config/Yubico/u2f_keys
   ```

2. **Create a recovery USB (Universal Serial Bus)** with Ubuntu Live ISO (Image file)

3. **Document your LUKS (Linux Unified Key Setup) encryption passphrase** securely offline

4. **Keep the root terminal open** when testing login the first time

### 6.2 Recovery Procedure (If Locked Out)

1. Boot from Ubuntu Live USB
2. Decrypt and mount your LUKS partition
3. Chroot into your system
4. Edit `/etc/pam.d/gdm-password` to remove Yubikey requirement
5. Reboot and fix configuration

**Source:** [Ubuntu Recovery Mode](https://wiki.ubuntu.com/RecoveryMode)

---

## 7. Sources

### Official Documentation
1. **Ubuntu Full Disk Encryption:** https://help.ubuntu.com/community/Full_Disk_Encryption_Howto_2019
2. **Ubuntu Security Guide:** https://ubuntu.com/security
3. **Ubuntu Firewall (UFW):** https://help.ubuntu.com/community/UFW
4. **Ubuntu AppArmor:** https://ubuntu.com/server/docs/security-apparmor
5. **Ubuntu Automatic Updates:** https://help.ubuntu.com/community/AutomaticSecurityUpdates
6. **Ubuntu Secure Boot:** https://wiki.ubuntu.com/UEFI/SecureBoot

### Yubico Official Resources
7. **Yubico Ubuntu U2F Login Guide:** https://support.yubico.com/hc/en-us/articles/360016649099-Ubuntu-Linux-Login-Guide-U2F
8. **Yubico PAM U2F Documentation:** https://developers.yubico.com/pam-u2f/
9. **Yubico Getting Started:** https://www.yubico.com/setup/

### Security Best Practices
10. **NIST (National Institute of Standards and Technology) Password Guidelines:** https://pages.nist.gov/800-63-3/
11. **CIS (Center for Internet Security) Ubuntu Benchmark:** https://www.cisecurity.org/benchmark/ubuntu_linux
12. **USBGuard Documentation:** https://usbguard.github.io/

---

## Summary Status Legend

- ✅ **Enabled by default** - No action required
- ⚙️ **Requires configuration** - Must be set up manually
- 🔧 **Installed but inactive** - Needs to be enabled
- 💡 **Optional** - Recommended but not critical
- ❌ **Not needed** - Not applicable to your setup

---

## Quick Start Checklist

After Ubuntu installation with full disk encryption:

- [ ] Install `libpam-u2f` and `yubikey-manager`
- [ ] Configure Yubikey for U2F (Universal 2nd Factor) authentication
- [ ] Update PAM (Pluggable Authentication Modules) configuration for login
- [ ] Update PAM configuration for sudo
- [ ] Test authentication in new terminal
- [ ] Enable UFW (Uncomplicated Firewall) firewall
- [ ] Configure automatic security updates
- [ ] Set screen lock settings
- [ ] Configure BIOS (Basic Input/Output System) / UEFI (Unified Extensible Firmware Interface) Secure Boot
- [ ] Register backup Yubikey
- [ ] Test complete login/logout cycle
- [ ] Create recovery USB (Universal Serial Bus) drive

**Estimated setup time:** 2-3 hours

---

*Last updated: December 2025*
*Target: Ubuntu 22.04 LTS (Long Term Support) / 24.04 LTS*
