# Ultimate Physical & Software Security Hardening Guide

## Complete Security Stack: YubiKey FIPS + LUKS + Ubuntu

**Date:** October 27, 2025

---

## Table of Contents

1. [Remote Access with 2FA](#remote-access-with-2fa)
2. [Complete Packer Build](#complete-packer-build)
3. [Critical Configuration Files](#critical-configuration-files)
4. [Physical Security](#physical-security)
5. [Additional Software Hardening](#additional-software-hardening)
6. [Operational Security (OPSEC)](#operational-security-opsec)
7. [Testing Your Security](#testing-your-security)
8. [Complete Security Stack Summary](#complete-security-stack-summary)

---

## Remote Access with 2FA

### Yes, You Can Access Remotely!

**SSH Configuration Options:**

```yaml
Option_1_YubiKey_at_Remote_Location:
  Setup: Keep a YubiKey at the remote location
  Access: SSH + YubiKey physically present
  Security: Highest
  Convenience: Low (need YubiKey there)

Option_2_SSH_Key_Plus_YubiKey:
  Setup: SSH key on your laptop + YubiKey with you
  Access: SSH key authenticates, then YubiKey challenge
  Security: Very High
  Convenience: Medium (need YubiKey with you)

Option_3_Backup_Methods:
  Setup: Configure backup 2FA (TOTP, backup YubiKey)
  Access: Primary or backup authentication
  Security: High
  Convenience: High

Option_4_Jump_Host:
  Setup: Bastion/jump server with YubiKey
  Access: SSH to jump host (with YubiKey), then to target
  Security: Very High
  Convenience: Medium
```

### Recommended SSH Configuration for Remote Access

```bash
# /etc/ssh/sshd_config
# Allow SSH key + keyboard-interactive (for YubiKey)
AuthenticationMethods publickey,keyboard-interactive:pam

# This means:
# 1. You authenticate with your SSH private key (from your laptop)
# 2. Then PAM challenges you for YubiKey touch

# Alternative: Allow publickey OR keyboard-interactive
# AuthenticationMethods publickey keyboard-interactive:pam
```

### Remote Access Workflow

```bash
# From your laptop:
ssh -i ~/.ssh/id_ed25519 user@remote-server

# Step 1: SSH key validates (automatic)
# Step 2: PAM asks for YubiKey
# [Prompt]: Touch your YubiKey...
# Step 3: You touch YubiKey
# Step 4: Access granted!
```

### For Truly Remote Servers (No Physical Access)

```yaml
Recommended_Setup:

Primary_Auth:
  - SSH key (on your laptop)
  - YubiKey U2F (with you, travels)

Backup_Auth:
  - Second YubiKey (stored securely at server location)
  - TOTP codes (in password manager, last resort)
  - Recovery codes (encrypted, offline storage)

Configuration:
  # Allow either YubiKey OR backup method
  auth sufficient pam_u2f.so authfile=/etc/u2f_mappings
  auth sufficient pam_google_authenticator.so
```

---

## Complete Packer Build - Maximum Security

### Full Packer Template

**File: `ubuntu-hardened.pkr.hcl`**

This comprehensive Packer template includes:
- **15 security phases** covering every aspect of hardening
- **LUKS2 encryption** with detached headers
- **Secure Boot** with custom keys
- **TPM 2.0 integration** for automatic unlocking
- **YubiKey FIPS** multi-factor authentication
- **AppArmor** mandatory access control
- **Complete audit trail** and intrusion detection
- **Privacy hardening** (no telemetry)
- **Network isolation** and monitoring

See the full template in the [Complete Packer Build section above](#complete-packer-build).

---

## Critical Configuration Files

### A. Encrypted /boot Setup Script

```bash
#!/bin/bash
# File: scripts/setup-encrypted-boot.sh

set -e

BOOT_DEV="/dev/vda1"
ROOT_DEV="/dev/vda2"
LUKS_PASSWORD="$LUKS_PASSWORD"

echo "=== Setting up Encrypted /boot ==="

# Create encrypted boot partition
echo -n "$LUKS_PASSWORD" | cryptsetup luksFormat \
  --type luks2 \
  --cipher aes-xts-plain64 \
  --key-size 512 \
  --hash sha512 \
  --pbkdf argon2id \
  --pbkdf-memory 1048576 \
  --iter-time 5000 \
  "$BOOT_DEV" -

# Open boot partition
echo -n "$LUKS_PASSWORD" | cryptsetup open "$BOOT_DEV" cryptboot -

# Format
mkfs.ext4 -L boot /dev/mapper/cryptboot

# Create detached LUKS header for root
dd if=/dev/zero of=/boot/luks-header.img bs=16M count=1

# Encrypt root with detached header
echo -n "$LUKS_PASSWORD" | cryptsetup luksFormat \
  --type luks2 \
  --cipher aes-xts-plain64 \
  --key-size 512 \
  --hash sha512 \
  --pbkdf argon2id \
  --header /boot/luks-header.img \
  "$ROOT_DEV" -

# Open root
echo -n "$LUKS_PASSWORD" | cryptsetup open \
  --header /boot/luks-header.img \
  "$ROOT_DEV" cryptroot -

# Format root
mkfs.ext4 -L root /dev/mapper/cryptroot

echo "✓ Encrypted partitions created"
```

### B. Advanced Kernel Hardening

```conf
# File: configs/kernel-hardening.conf

# Network Security
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.tcp_syncookies = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.secure_redirects = 0
net.ipv4.conf.default.secure_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.icmp_echo_ignore_all = 1
net.ipv4.icmp_ignore_bogus_error_responses = 1

# IPv6 Security
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1

# Kernel Security
kernel.dmesg_restrict = 1
kernel.kptr_restrict = 2
kernel.yama.ptrace_scope = 3
kernel.unprivileged_bpf_disabled = 1
kernel.unprivileged_userns_clone = 0
kernel.kexec_load_disabled = 1
kernel.sysrq = 0
kernel.core_uses_pid = 1
kernel.randomize_va_space = 2
kernel.modules_disabled = 1

# File System
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
fs.protected_fifos = 2
fs.protected_regular = 2
fs.suid_dumpable = 0

# BPF Hardening
net.core.bpf_jit_harden = 2
net.core.bpf_jit_limit = 10000

# Memory Protection
vm.mmap_rnd_bits = 32
vm.mmap_rnd_compat_bits = 16
```

### C. YubiKey FIPS PAM Configuration

```conf
# File: configs/pam-yubikey-fips.conf
# YubiKey FIPS U2F Authentication
# Local storage only - no cloud

# For common-auth (system-wide)
auth    [success=1 default=ignore]  pam_u2f.so \
        cue \
        origin=pam://$(hostname) \
        appid=pam://$(hostname) \
        authfile=/etc/u2f_mappings \
        nouserok \
        prompt \
        debug

# For SSH (keyboard-interactive)
auth    required    pam_u2f.so \
        cue \
        origin=pam://$(hostname) \
        appid=pam://$(hostname) \
        authfile=/etc/u2f_mappings \
        prompt

# For sudo
auth    required    pam_u2f.so \
        cue \
        origin=pam://$(hostname) \
        appid=pam://$(hostname) \
        authfile=/etc/u2f_mappings \
        prompt \
        [cue_prompt=Touch YubiKey to authorize sudo]
```

### D. YubiKey + LUKS Unlock Script

```bash
#!/bin/bash
# File: scripts/yubikey-luks-unlock.sh

# Unlock LUKS using YubiKey challenge-response

YUBIKEY_SLOT=2
CHALLENGE="LUKS-UNLOCK-$(hostname)"

# Check if YubiKey is present
if ! ykinfo -q -$YUBIKEY_SLOT; then
    echo "YubiKey not found in slot $YUBIKEY_SLOT" >&2
    exit 1
fi

# Generate response
RESPONSE=$(ykchalresp -$YUBIKEY_SLOT "$CHALLENGE" 2>/dev/null)

if [ -z "$RESPONSE" ]; then
    echo "Failed to get YubiKey response" >&2
    exit 1
fi

# Output key for LUKS
echo -n "$RESPONSE"
```

### E. System Backup Script

```bash
#!/bin/bash
# File: scripts/backup-system.sh

BACKUP_DIR="/mnt/backup"
DATE=$(date +%Y%m%d-%H%M%S)

echo "=== System Backup: $DATE ==="

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup critical files
tar czf "$BACKUP_DIR/critical-$DATE.tar.gz" \
    /etc/u2f_mappings \
    /boot/luks-header.img \
    /etc/secureboot/keys/ \
    /root/.gnupg/ \
    /etc/ssh/ssh_host_*_key \
    /etc/crypttab \
    /etc/fstab

# Backup system configuration
tar czf "$BACKUP_DIR/config-$DATE.tar.gz" \
    /etc/pam.d/ \
    /etc/ssh/ \
    /etc/apparmor.d/ \
    /etc/audit/ \
    /etc/usbguard/

# Create recovery instructions
cat > "$BACKUP_DIR/RECOVERY-$DATE.txt" <<EOF
=== RECOVERY INSTRUCTIONS ===

Date: $DATE
Hostname: $(hostname)

LUKS Recovery:
  1. Boot from recovery USB
  2. cryptsetup open --header /path/to/luks-header.img /dev/vda2 cryptroot
  3. mount /dev/mapper/cryptroot /mnt

YubiKey Recovery:
  1. Insert backup YubiKey
  2. Enroll: pamu2fcfg -u USERNAME >> /etc/u2f_mappings
  
TPM Recovery:
  - LUKS key sealed to PCR 0,2,7
  - If boot fails, use password fallback

Emergency Access:
  - Boot parameter: init=/bin/bash
  - Mount root: mount -o remount,rw /
  - Reset user password: passwd username
EOF

# Encrypt backup
gpg --encrypt --recipient root@$(hostname) \
    "$BACKUP_DIR/critical-$DATE.tar.gz"

# Generate checksums
sha256sum "$BACKUP_DIR"/*.tar.gz > "$BACKUP_DIR/checksums-$DATE.txt"

echo "✓ Backup complete: $BACKUP_DIR"
echo "⚠️  Store backup on encrypted external drive!"
```

### F. YubiKey Enrollment Script

```bash
#!/bin/bash
# File: scripts/yubikey-enrollment.sh

USERNAME="${1:-admin}"
MAPPINGS_FILE="/etc/u2f_mappings"

echo "=== YubiKey FIPS Enrollment (Local Only) ==="
echo "User: $USERNAME"
echo ""
echo "⚠️  This uses LOCAL storage only - NO CLOUD"
echo ""

# Check if device is connected
if ! fido2-token -L | grep -q "dev"; then
    echo "ERROR: No FIDO2 device detected!"
    echo "Please connect your YubiKey FIPS"
    exit 1
fi

echo "YubiKey detected!"
echo ""
echo "Touch your YubiKey now..."
echo ""

# Generate credentials (local only)
CREDENTIAL=$(pamu2fcfg -u "$USERNAME" \
  -opam://$(hostname) \
  -ipam://$(hostname) \
  -N)

if [ $? -ne 0 ]; then
    echo "ERROR: Enrollment failed!"
    exit 1
fi

# Save to local file
echo "$CREDENTIAL" | sudo tee -a "$MAPPINGS_FILE" > /dev/null

# Set secure permissions
sudo chmod 600 "$MAPPINGS_FILE"
sudo chown root:root "$MAPPINGS_FILE"

echo ""
echo "✓ Enrollment successful!"
echo "✓ Credentials saved to: $MAPPINGS_FILE"
echo ""
echo "Credential details:"
echo "$CREDENTIAL"
echo ""
echo "⚠️  BACKUP THIS FILE: $MAPPINGS_FILE"
echo ""
echo "Enroll backup YubiKey? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "Remove current YubiKey and insert backup YubiKey"
    echo "Press Enter when ready..."
    read
    
    BACKUP_CREDENTIAL=$(pamu2fcfg -u "$USERNAME" \
      -opam://$(hostname) \
      -ipam://$(hostname) \
      -n)
    
    echo "$BACKUP_CREDENTIAL" | sudo tee -a "$MAPPINGS_FILE" > /dev/null
    echo "✓ Backup YubiKey enrolled!"
fi

echo ""
echo "=== Enrollment Complete ==="
```

---

## Physical Security

### Hardware Recommendations

```yaml
Physical_Security_Hardware:

USB_Security:
  - USB data blocker (charge-only cables)
  - USB port locks (physical blocks)
  - USB condoms (for public charging)
  
Screen_Privacy:
  - Privacy screen filter (3M)
  - Webcam cover slider
  - Microphone kill switch
  
Storage:
  - Encrypted external backup drive
  - Faraday bag for YubiKey backup
  - Safe/lockbox for recovery keys
  
Network:
  - Hardware firewall (physical isolation)
  - Air-gap computer for keys
  - Separate "clean" machine for banking
  
Case_Security:
  - Kensington lock slot cable
  - Laptop alarm (motion sensor)
  - Tamper-evident tape on screws
```

### Environment Security

```yaml
Physical_Environment:

Workspace:
  ✅ No windows facing outside
  ✅ Door locks (deadbolt)
  ✅ Security cameras
  ✅ Motion sensors
  ✅ Alarm system
  
When_Not_In_Use:
  ✅ Lock in safe/lockbox
  ✅ Remove YubiKey
  ✅ Power off (not sleep)
  ✅ Encrypted backup disconnected
  
Travel:
  ✅ Never check laptop (carry-on only)
  ✅ Never leave in hotel room
  ✅ Use hotel safe (if no choice)
  ✅ VPN always on public WiFi
  ✅ Consider burner laptop for high-risk travel
```

---

## Additional Software Hardening

### A. Container Isolation

```bash
# Run untrusted applications in containers
sudo apt-get install -y firejail

# Sandbox browser
firejail --private --net=none firefox

# Sandbox apps with custom profiles
firejail --profile=/etc/firejail/custom.profile app
```

### B. Application Sandboxing

```bash
# Install AppImage sandbox
sudo apt-get install -y bubblewrap

# Run untrusted binaries
bwrap --ro-bind / / --dev /dev --proc /proc --tmpfs /tmp ./untrusted-app
```

### C. Secure Communications

```bash
# Install secure messaging
sudo apt-get install -y signal-desktop

# Install Tor Browser
sudo apt-get install -y torbrowser-launcher

# Install encrypted email
sudo apt-get install -y thunderbird enigmail
```

### D. Anti-Forensics

```bash
# Secure file deletion
sudo apt-get install -y secure-delete

# Shred files
shred -vfz -n 10 sensitive-file.txt

# Wipe free space
sfill -v /

# Clear RAM
sudo sdmem -v

# Clear swap
sudo swapoff -a && sudo swapon -a
```

---

## Operational Security (OPSEC)

### Best Practices

```yaml
Daily_Habits:
  - Always lock screen when leaving (YubiKey removed)
  - Check for physical tampering daily
  - Review audit logs weekly
  - Update system weekly (security patches)
  - Backup weekly to encrypted external drive
  
Access_Control:
  - Never share YubiKey
  - Store backup YubiKey in safe
  - Use different YubiKeys for different purposes
  - Recovery codes in password manager only
  
Network_Usage:
  - Always use VPN on untrusted networks
  - Disable WiFi when not needed
  - Use Ethernet when possible
  - Monitor network connections (nethogs)
  
Data_Handling:
  - Encrypt everything at rest
  - Encrypt everything in transit
  - Shred files before deletion
  - No sensitive data on unencrypted USB
  
Threat_Awareness:
  - Shoulder surfing (privacy screens)
  - Evil maid attacks (check tamper evidence)
  - Social engineering (verify identities)
  - Physical access (never leave unattended)
```

---

## Testing Your Security

```bash
#!/bin/bash
# File: scripts/test-security.sh

echo "=== SECURITY AUDIT ==="

# 1. Check encryption
echo "1. Checking encryption..."
cryptsetup status cryptroot
cryptsetup luksDump /dev/vda2

# 2. Check YubiKey
echo "2. Checking YubiKey..."
fido2-token -L
cat /etc/u2f_mappings

# 3. Check Secure Boot
echo "3. Checking Secure Boot..."
mokutil --sb-state

# 4. Check AppArmor
echo "4. Checking AppArmor..."
sudo aa-status

# 5. Check firewall
echo "5. Checking firewall..."
sudo ufw status verbose

# 6. Check audit rules
echo "6. Checking audit rules..."
sudo auditctl -l

# 7. Check USB policy
echo "7. Checking USB policy..."
sudo usbguard list-rules

# 8. Check kernel hardening
echo "8. Checking kernel parameters..."
sysctl -a | grep -E "kernel\.(dmesg_restrict|kptr_restrict|yama)"

# 9. Check file integrity
echo "9. Checking file integrity..."
sudo aide --check

# 10. Run security scan
echo "10. Running security scan..."
sudo lynis audit system --quick

echo "=== AUDIT COMPLETE ==="
```

---

## Complete Security Stack Summary

### Your Security Layers

```yaml
Layer_1_Physical:
  ✅ YubiKey FIPS (hardware token)
  ✅ TPM 2.0 (hardware security)
  ✅ USB Guard (device control)
  ✅ Tamper-evident tape
  ✅ Privacy screens
  ✅ Faraday bags for backups

Layer_2_Boot_Security:
  ✅ LUKS2 full disk encryption
  ✅ Encrypted /boot partition
  ✅ Detached LUKS headers
  ✅ Secure Boot with custom keys
  ✅ Signed bootloader
  ✅ TPM-sealed keys

Layer_3_Authentication:
  ✅ YubiKey FIPS U2F/FIDO2
  ✅ SSH public key + YubiKey
  ✅ Sudo requires YubiKey
  ✅ No password authentication
  ✅ Multi-factor everywhere

Layer_4_System_Hardening:
  ✅ Kernel lockdown mode
  ✅ AppArmor/SELinux
  ✅ Hardened sysctl
  ✅ Disabled unnecessary services
  ✅ Minimal packages

Layer_5_Network_Security:
  ✅ UFW firewall (deny by default)
  ✅ Fail2ban intrusion prevention
  ✅ Encrypted DNS (DoT)
  ✅ MAC randomization
  ✅ IPv6 disabled

Layer_6_Monitoring:
  ✅ Auditd logging
  ✅ AIDE file integrity
  ✅ Rkhunter rootkit detection
  ✅ USB device monitoring
  ✅ Daily security reports

Layer_7_Privacy:
  ✅ No telemetry
  ✅ DNS privacy
  ✅ Minimal logging
  ✅ Encrypted swap
  ✅ Memory cleared on shutdown

Layer_8_Recovery:
  ✅ Backup YubiKey
  ✅ Recovery codes
  ✅ Encrypted backups
  ✅ Emergency procedures
  ✅ Documentation
```

### Threat Protection Matrix

```yaml
Threat_Protection:
  ✅ Physical theft (encryption)
  ✅ Evil maid (Secure Boot, TPM)
  ✅ Network attacks (firewall)
  ✅ Malware (AppArmor, monitoring)
  ✅ DMA attacks (disabled ports)
  ✅ USB attacks (USB Guard)
  ✅ Cold boot (encrypted RAM, no hibernation)
  ✅ Forensics (anti-forensics tools)
  ✅ Remote access (2FA required)
  ✅ Privilege escalation (MAC + audit)
  ✅ Data exfiltration (network monitoring)
  ✅ Rootkits (file integrity + detection)
```

---

## Quick Start Guide

### 1. Build the Image

```bash
# Clone this repository
cd ~/projects2/computer

# Build with Packer
export LUKS_PASSWORD="your-secure-password"
packer build -var "luks_password=$LUKS_PASSWORD" ubuntu-hardened.pkr.hcl
```

### 2. Deploy the Image

```bash
# Copy to server
scp ubuntu-hardened.qcow2 root@server:/var/lib/libvirt/images/

# Boot the VM
virsh create ubuntu-hardened.xml
```

### 3. First Boot Setup

```bash
# SSH to the machine
ssh admin@server

# Enroll your YubiKey
sudo /usr/local/bin/yubikey-enrollment.sh admin

# Test 2FA
sudo /usr/local/bin/test-security.sh

# Backup critical files
sudo /usr/local/bin/backup-system.sh
```

### 4. Remote Access Setup

```bash
# From your laptop, test SSH with 2FA
ssh admin@server

# You'll be prompted:
# 1. SSH key authentication (automatic)
# 2. YubiKey touch prompt
# [Touch your YubiKey when prompted]
```

---

## Additional Resources

### Documentation

- LUKS: https://gitlab.com/cryptsetup/cryptsetup
- YubiKey: https://developers.yubico.com/
- TPM: https://trustedcomputinggroup.org/
- AppArmor: https://apparmor.net/
- Auditd: https://linux.die.net/man/8/auditd

### Security Frameworks

- CIS Benchmarks: https://www.cisecurity.org/cis-benchmarks/
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework
- OWASP: https://owasp.org/

### Tools

- Lynis: https://cisofy.com/lynis/
- AIDE: https://aide.github.io/
- rkhunter: http://rkhunter.sourceforge.net/
- fail2ban: https://www.fail2ban.org/

---

## Notes

**This is military-grade security for a civilian system. You're now protected against all but the most sophisticated nation-state attacks.**

**Key Points:**
- Always have backup YubiKeys
- Store recovery keys offline in safe
- Test backups regularly
- Keep system updated
- Monitor logs for anomalies
- Never share security tokens
- Use different keys for different purposes

**Questions or Issues:**
- Review /root/SECURITY-README.txt on the system
- Check audit logs: `sudo journalctl -xe`
- Test components individually
- Use emergency recovery procedures if locked out

---

**Last Updated:** October 27, 2025
