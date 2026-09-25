# USBGuard Setup with YubiKey - Safe Configuration Guide

⚠️ **CRITICAL:** Improper USBGuard configuration can lock you out of your system. Follow this guide exactly.

---

## Table of Contents
1. [Understanding the Risk](#understanding-the-risk)
2. [Prerequisites](#prerequisites)
3. [Safe Setup Procedure](#safe-setup-procedure)
4. [Testing Without Risk](#testing-without-risk)
5. [Permanent Configuration](#permanent-configuration)
6. [Recovery Procedures](#recovery-procedures)
7. [Verification Steps](#verification-steps)

---

## Understanding the Risk

**What USBGuard Does:**
- Blocks all USB devices not explicitly whitelisted
- Protects against malicious USB attacks (BadUSB, Rubber Ducky, etc.)
- Can block your YubiKey, keyboard, mouse if misconfigured

**Critical Point:** If you enable USBGuard without whitelisting your YubiKey and then log out:
- You won't be able to log back in (password + YubiKey required)
- Your keyboard might be blocked
- You'll need recovery mode access

---

## Prerequisites

✅ **Before Starting:**
- [ ] YubiKey is physically connected
- [ ] You have a backup YubiKey registered (recommended)
- [ ] You can access BIOS/UEFI to disable Secure Boot if needed
- [ ] You have an Ubuntu Live USB for recovery (create this NOW)
- [ ] You're logged into a GUI session (not just TTY)
- [ ] All USB devices you use regularly are connected (mouse, keyboard, etc.)

---

## Safe Setup Procedure

### Phase 1: Install USBGuard (Testing Mode)

```bash
# Install USBGuard
sudo apt update
sudo apt install usbguard

# DO NOT enable or start the service yet
```

### Phase 2: Generate Initial Policy

**IMPORTANT:** Connect ALL USB devices you'll use BEFORE this step:
- YubiKey (primary)
- Backup YubiKey (if you have one)
- Keyboard (if USB)
- Mouse (if USB)
- Any USB hubs
- External drives you regularly use

```bash
# Generate policy with all devices connected
sudo usbguard generate-policy | sudo tee /etc/usbguard/rules.conf

# Backup the policy
sudo cp /etc/usbguard/rules.conf /etc/usbguard/rules.conf.backup
```

### Phase 3: Review the Policy

```bash
# Check that your YubiKey is included
sudo cat /etc/usbguard/rules.conf | grep -i yubico

# View all allowed devices
sudo cat /etc/usbguard/rules.conf
```

**You should see a line like:**
```
allow id 1050:0407 serial "123456" name "Yubico YubiKey OTP+FIDO+CCID" hash "..." parent-hash "..." via-port "..." with-interface ...
```

**Common YubiKey USB IDs:**
- `1050:0407` - YubiKey 5 Series
- `1050:0406` - YubiKey 5 NFC
- `1050:0405` - YubiKey 5C
- `1050:0410` - YubiKey Plus

If you don't see your YubiKey listed, **STOP HERE** and regenerate the policy with YubiKey connected.

---

## Testing Without Risk

### Test 1: Dry Run (No Service Running)

```bash
# Test the daemon without starting the service
sudo usbguard daemon --debug

# Leave this running in one terminal
# In another terminal, unplug and replug your YubiKey
# Check the first terminal for "Device authorized" messages
# Press Ctrl+C to stop when done
```

### Test 2: Start Service (Temporary)

```bash
# Start service WITHOUT enabling at boot
sudo systemctl start usbguard

# Check status
sudo systemctl status usbguard

# Test your YubiKey authentication NOW
# Open a new terminal and try:
sudo -v
# You should be prompted for password + YubiKey touch
```

### Test 3: Test USB Device Blocking

```bash
# Plug in an unknown USB device (like a USB drive)
# Check if it's blocked
sudo usbguard list-devices

# You should see the new device with "block" status
```

### Test 4: Critical Lock-Screen Test

**DO NOT SKIP THIS STEP**

```bash
# With USBGuard running:
# 1. Lock your screen (don't log out yet)
# 2. Unlock using password + YubiKey
# 3. If successful, proceed to next test
# 4. If failed, see Recovery Procedures below
```

### Test 5: Full Logout Test

**CRITICAL TEST - Have recovery USB ready**

```bash
# 1. Keep one terminal open with root access:
sudo -i

# 2. In that root terminal, prepare emergency stop:
echo "If login fails, return here and run: systemctl stop usbguard"

# 3. Log out and log back in
# 4. Test password + YubiKey authentication
# 5. If FAILED: Use Ctrl+Alt+F3 to access TTY3, login, run:
#    sudo systemctl stop usbguard
```

---

## Permanent Configuration

**Only proceed if ALL tests passed**

```bash
# Enable USBGuard to start at boot
sudo systemctl enable usbguard

# Confirm it's enabled
sudo systemctl is-enabled usbguard
```

### Configure USBGuard Policy Settings

Edit configuration for better usability:

```bash
sudo nano /etc/usbguard/usbguard-daemon.conf
```

Recommended settings:
```conf
# What to do with new devices
ImplicitPolicyTarget=block

# Allow already connected devices at startup
PresentDevicePolicy=apply-policy

# What to do with devices that disconnect/reconnect
PresentControllerPolicy=apply-policy

# Allow adding new devices interactively
InsertedDevicePolicy=block

# Store policy changes permanently
RuleFile=/etc/usbguard/rules.conf
```

---

## Recovery Procedures

### Recovery Method 1: TTY Access

If locked out of GUI but keyboard works:

1. Press `Ctrl+Alt+F3` (or F2, F4)
2. Login with username and password only (YubiKey NOT required for TTY by default)
3. Stop USBGuard:
   ```bash
   sudo systemctl stop usbguard
   sudo systemctl disable usbguard
   ```
4. Press `Ctrl+Alt+F1` to return to GUI
5. Log in normally
6. Fix the policy before re-enabling

### Recovery Method 2: Recovery Mode

If keyboard is blocked or TTY doesn't work:

1. Reboot and hold `Shift` key to access GRUB menu
2. Select "Advanced options for Ubuntu"
3. Select "Recovery mode"
4. Select "root - Drop to root shell prompt"
5. Remount filesystem as read-write:
   ```bash
   mount -o remount,rw /
   ```
6. Stop and disable USBGuard:
   ```bash
   systemctl stop usbguard
   systemctl disable usbguard
   ```
7. Reboot:
   ```bash
   reboot
   ```

### Recovery Method 3: Live USB

If recovery mode doesn't work:

1. Boot from Ubuntu Live USB
2. Open terminal
3. Find your encrypted partition:
   ```bash
   sudo fdisk -l
   # Look for your Linux partition (usually /dev/sda3 or /dev/nvme0n1p3)
   ```
4. Decrypt and mount:
   ```bash
   sudo cryptsetup luksOpen /dev/sdaX ubuntu_crypt
   sudo mount /dev/mapper/ubuntu--vg-root /mnt
   ```
5. Chroot into your system:
   ```bash
   sudo mount --bind /dev /mnt/dev
   sudo mount --bind /proc /mnt/proc
   sudo mount --bind /sys /mnt/sys
   sudo chroot /mnt
   ```
6. Disable USBGuard:
   ```bash
   systemctl disable usbguard
   rm /etc/usbguard/rules.conf
   ```
7. Exit and reboot:
   ```bash
   exit
   sudo reboot
   ```

---

## Verification Steps

### After Successful Setup

Run these checks to verify everything works:

```bash
# 1. Check USBGuard is running
sudo systemctl status usbguard

# 2. List all allowed devices
sudo usbguard list-devices

# 3. Verify YubiKey is allowed
sudo usbguard list-devices | grep -i yubico

# 4. Check policy file
sudo cat /etc/usbguard/rules.conf | grep -i yubico

# 5. Test YubiKey authentication
sudo -v
# Should prompt for password + YubiKey touch

# 6. Test new USB device blocking
# Plug in unknown USB device, should be blocked:
sudo usbguard list-devices | grep block
```

### Daily Operational Tests

```bash
# Check USBGuard logs
sudo journalctl -u usbguard -n 50

# Monitor real-time events
sudo usbguard watch
```

---

## Adding New Trusted Devices

If you get a new USB device you want to allow:

### Method 1: Temporary Allow (One Session)

```bash
# List devices to find the ID
sudo usbguard list-devices

# Temporarily allow device #5 (example)
sudo usbguard allow-device 5
```

### Method 2: Permanent Allow

```bash
# 1. Find the device number
sudo usbguard list-devices

# 2. Allow it permanently
sudo usbguard allow-device 5

# 3. Make it permanent by updating policy
sudo usbguard list-rules | grep "id 1234:5678" >> /etc/usbguard/rules.conf

# Or use the generate-policy approach:
# Disconnect all untrusted devices
# Connect all trusted devices (including new one)
sudo usbguard generate-policy > /etc/usbguard/rules.conf.new
sudo mv /etc/usbguard/rules.conf.new /etc/usbguard/rules.conf
sudo systemctl restart usbguard
```

---

## Security Best Practices

### What USBGuard Protects Against

✅ **Protected:**
- BadUSB attacks (malicious USB devices that emulate keyboards)
- USB Rubber Ducky (automated keystroke injection)
- Malicious USB devices that emulate network adapters
- Unknown USB storage devices

❌ **Not Protected:**
- Trusted but compromised devices (malware on your own USB drive)
- Attacks via already-trusted device classes
- Physical keyboard access (if keyboard is whitelisted)

### Recommended Configuration for Your Use Case

Since you're using YubiKey for authentication:

1. **Install USBGuard** - Adds significant protection against USB attacks
2. **Whitelist Strategy:**
   - Your keyboard (if USB)
   - Your mouse (if USB)
   - Your YubiKey(s)
   - Your backup YubiKey
   - Regular USB storage devices you own
3. **Block by Default** - All other devices blocked
4. **Monitor Logs** - Check periodically for attempted device connections

---

## Troubleshooting

### YubiKey Not Working After USBGuard Setup

**Problem:** YubiKey touch not recognized

**Solution:**
```bash
# Check if YubiKey is blocked
sudo usbguard list-devices | grep -i yubico

# If blocked, allow it
sudo usbguard allow-device <device-number>

# Make permanent
sudo usbguard generate-policy > /etc/usbguard/rules.conf
sudo systemctl restart usbguard
```

### Keyboard Stopped Working

**Problem:** USB keyboard blocked after enabling USBGuard

**Solution:**
- Use recovery mode (see Recovery Method 2 above)
- Or use PS/2 keyboard if available
- Regenerate policy with keyboard connected

### Can't Log In After Enabling USBGuard

**Problem:** Locked out completely

**Solution:**
- Use Recovery Method 2 or 3 above
- This is why testing is critical BEFORE enabling at boot

---

## Verification Checklist

Before considering setup complete:

- [ ] USBGuard installed
- [ ] Policy generated with YubiKey connected
- [ ] Policy file reviewed and YubiKey entry confirmed
- [ ] Test 1: Dry run completed successfully
- [ ] Test 2: Service started temporarily
- [ ] Test 3: Unknown USB device blocked correctly
- [ ] Test 4: Lock screen test passed
- [ ] Test 5: Full logout test passed
- [ ] Recovery USB created and tested
- [ ] Know how to access TTY (Ctrl+Alt+F3)
- [ ] Know how to access Recovery Mode (hold Shift at boot)
- [ ] USBGuard enabled at boot
- [ ] Final reboot test passed
- [ ] YubiKey authentication works after reboot

---

## Is This Safe to Complete?

**YES, if you follow these rules:**

1. ✅ **Do Testing Phase** - Complete all 5 tests before enabling at boot
2. ✅ **Have Recovery USB Ready** - Create this BEFORE starting
3. ✅ **Know Recovery Procedures** - Read them before starting
4. ✅ **Test in Low-Risk Time** - Don't do this before important work/deadlines
5. ✅ **YubiKey Connected** - Must be plugged in during policy generation
6. ✅ **Backup Policy** - Keep copy of working rules.conf

**NO, if:**
- ❌ You skip testing steps
- ❌ You don't have recovery USB
- ❌ You enable USBGuard at boot before testing
- ❌ You don't verify YubiKey is in the policy file

---

## Technical Verification

### How to Verify This Information is Accurate

```bash
# 1. Check USBGuard documentation
man usbguard

# 2. Verify your YubiKey's USB ID
lsusb | grep -i yubi

# Expected output:
# Bus 001 Device 005: ID 1050:0407 Yubico.com Yubikey 4/5 OTP+U2F+CCID

# 3. Test PAM configuration doesn't interfere
# YubiKey auth is at PAM level, USBGuard is at USB device level
# They operate independently - USBGuard must allow the USB device,
# then PAM uses it for authentication

# 4. Verify device persistence
# YubiKey uses same USB ID across reboots
# Policy will remain valid after reboot
```

### Why This Works

1. **USBGuard Layer:** Controls which USB devices can connect
2. **PAM Layer:** Uses connected YubiKey for authentication
3. **Sequence:** USBGuard allows YubiKey → PAM uses YubiKey → Authentication succeeds

If USBGuard blocks the YubiKey, PAM never sees it, authentication fails.

---

## Sources

1. **USBGuard Official Documentation:** https://usbguard.github.io/
2. **USBGuard GitHub:** https://github.com/USBGuard/usbguard
3. **Arch Wiki - USBGuard:** https://wiki.archlinux.org/title/USBGuard
4. **Ubuntu Security Guide:** https://ubuntu.com/security/certifications/docs/
5. **YubiKey + USBGuard Integration:** Verified through testing community reports (2024-2025)

---

## Summary

**Can You Complete This Safely?** 

✅ **YES** - With proper testing and recovery preparation

**Key Success Factors:**
1. Follow the testing phases sequentially
2. Never enable at boot until all tests pass
3. Have recovery methods ready
4. Keep YubiKey connected during policy generation

**Estimated Time:** 30-45 minutes including all tests

**Risk Level:** LOW if following guide, HIGH if skipping steps

**Ready to Proceed?** Start with Phase 1 and don't skip any tests.
