# iOS Build Guide - FlacronAI Mobile

Complete guide for building and deploying FlacronAI Mobile to iOS devices and App Store.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Apple Developer Account Setup](#apple-developer-account-setup)
3. [Xcode Configuration](#xcode-configuration)
4. [Certificates & Provisioning Profiles](#certificates--provisioning-profiles)
5. [Build for Testing](#build-for-testing)
6. [Build for App Store](#build-for-app-store)
7. [TestFlight Deployment](#testflight-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required

- ✅ **macOS** (Catalina 10.15.4 or later)
- ✅ **Xcode** (14.0 or later)
- ✅ **Xcode Command Line Tools**
- ✅ **CocoaPods** installed
- ✅ **Apple Developer Account** ($99/year)
- ✅ Node.js and npm installed
- ✅ Project dependencies installed

### Install Xcode Command Line Tools

```bash
xcode-select --install
```

### Install CocoaPods

```bash
sudo gem install cocoapods
```

### Verify Installation

```bash
xcode-select -p
pod --version
```

---

## Apple Developer Account Setup

### Step 1: Create Apple Developer Account

1. Go to [https://developer.apple.com](https://developer.apple.com)
2. Click **Account** → **Enroll**
3. Choose **Individual** or **Organization**
4. Complete enrollment process
5. Pay annual $99 fee

**Processing Time:** 24-48 hours for approval

### Step 2: Configure Signing in Xcode

1. Open Xcode
2. Go to **Xcode** → **Preferences** → **Accounts**
3. Click **+** to add Apple ID
4. Sign in with your Apple Developer account
5. Select your team
6. Click **Download Manual Profiles**

---

## Xcode Configuration

### Step 1: Open Project in Xcode

```bash
# Install pods first
cd ios
pod install
cd ..

# Open workspace (NOT .xcodeproj)
open ios/FlacronAI.xcworkspace
```

### Step 2: Update Bundle Identifier

1. In Xcode, select **FlacronAI** project in navigator
2. Select **FlacronAI** target
3. Go to **General** tab
4. Update **Bundle Identifier**: `com.flacronenterprises.flacronai`

**Note:** Must be unique across all iOS apps globally.

### Step 3: Configure Signing

1. In **General** tab, under **Signing & Capabilities**
2. Check **Automatically manage signing**
3. Select your **Team** from dropdown
4. Xcode will automatically create necessary certificates

### Step 4: Update Version and Build Number

In **General** tab:
- **Version:** 1.0.0 (user-facing version)
- **Build:** 1 (must increment for each upload)

### Step 5: Configure Deployment Target

- Set **Deployment Target** to **iOS 13.0** or higher
- This is the minimum iOS version your app supports

### Step 6: Update Display Name

- **Display Name:** FlacronAI
- This is what users see on their home screen

---

## Certificates & Provisioning Profiles

### Understanding Certificates

1. **Development Certificate** - For testing on devices
2. **Distribution Certificate** - For App Store submission

### Option 1: Automatic Signing (Recommended)

Xcode handles everything automatically when you enable "Automatically manage signing"

### Option 2: Manual Signing

#### Create Certificates Manually

1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Certificates** → **+** (Create New)

**For Development:**
- Choose **iOS App Development**
- Follow wizard to generate certificate
- Download and install by double-clicking

**For Distribution:**
- Choose **App Store and Ad Hoc**
- Follow wizard to generate certificate
- Download and install

#### Create App ID

1. Go to **Identifiers** → **+**
2. Select **App IDs** → **Continue**
3. Choose **App** → **Continue**
4. Enter:
   - **Description:** FlacronAI Mobile
   - **Bundle ID:** `com.flacronenterprises.flacronai` (Explicit)
5. Select capabilities:
   - Push Notifications
   - Associated Domains (if needed)
   - Sign in with Apple (if needed)
6. Click **Continue** → **Register**

#### Create Provisioning Profiles

**Development Profile:**
1. Go to **Profiles** → **+**
2. Select **iOS App Development** → **Continue**
3. Select your App ID → **Continue**
4. Select your Development Certificate → **Continue**
5. Select test devices → **Continue**
6. Name it (e.g., "FlacronAI Dev") → **Generate**
7. Download and double-click to install

**Distribution Profile:**
1. Go to **Profiles** → **+**
2. Select **App Store** → **Continue**
3. Select your App ID → **Continue**
4. Select your Distribution Certificate → **Continue**
5. Name it (e.g., "FlacronAI App Store") → **Generate**
6. Download and double-click to install

---

## Build for Testing

### Build for Simulator

```bash
npm run ios
# Or specify simulator
npm run ios -- --simulator="iPhone 14 Pro"
```

### Build for Physical Device

#### Method 1: Using Xcode (Easiest)

1. Connect iPhone/iPad via USB
2. Unlock device and trust computer
3. In Xcode, select your device from device list
4. Click **Run** button (▶️) or press **Cmd+R**
5. If prompted, register device in Developer Portal

#### Method 2: Using Command Line

```bash
# List available devices
xcrun xctrace list devices

# Build and install to specific device
npx react-native run-ios --device "Your iPhone Name"
```

### Common Device Issues

**"Failed to launch app" or "Could not launch"**
- Ensure device is unlocked
- Trust the developer certificate on device (Settings → General → Device Management)

**"Code signing is required"**
- Go to device Settings → General → Device Management
- Trust the developer certificate

---

## Build for App Store

### Step 1: Prepare Build

```bash
# Clean build folder
cd ios
rm -rf build/
xcodebuild clean
cd ..
```

### Step 2: Archive the App

#### Using Xcode (Recommended)

1. In Xcode, select **Any iOS Device (arm64)** as build target
2. Go to **Product** → **Scheme** → **Edit Scheme**
3. Select **Archive** → Set **Build Configuration** to **Release**
4. Click **Close**
5. Go to **Product** → **Archive**
6. Wait for archive to complete (5-15 minutes)

#### Using Command Line

```bash
cd ios

# Create archive
xcodebuild -workspace FlacronAI.xcworkspace \
  -scheme FlacronAI \
  -configuration Release \
  -archivePath ./build/FlacronAI.xcarchive \
  clean archive

cd ..
```

### Step 3: Validate Archive

1. When archive completes, **Organizer** window opens
2. Select your archive
3. Click **Validate App**
4. Select your Distribution Certificate
5. Click **Validate**
6. Fix any errors reported

### Step 4: Upload to App Store Connect

1. In **Organizer**, click **Distribute App**
2. Select **App Store Connect** → **Next**
3. Select **Upload** → **Next**
4. Keep all options checked → **Next**
5. Select signing certificate → **Next**
6. Review and click **Upload**
7. Wait for upload (5-30 minutes depending on size)

### Step 5: Verify Upload

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Select your app
3. Go to **TestFlight** tab
4. Wait for build to appear (can take 15-60 minutes)
5. Build will show "Processing" → "Waiting for Review" → "Ready to Submit"

---

## TestFlight Deployment

### What is TestFlight?

TestFlight allows you to distribute pre-release versions to testers before App Store submission.

### Step 1: Internal Testing

1. In App Store Connect, go to **TestFlight** tab
2. Click on your build
3. Under **Internal Testing**, click **+** to add testers
4. Add team members (up to 100)
5. Testers receive email with TestFlight invitation

### Step 2: External Testing (Optional)

1. In TestFlight, go to **External Testing**
2. Click **+** to create test group
3. Add testers (up to 10,000)
4. **Requires App Review** (1-2 days)
5. Provide test information and submit

### Step 3: Testers Install App

1. Testers receive email invitation
2. Install TestFlight app from App Store
3. Open invitation link
4. Install and test your app
5. Provide feedback through TestFlight

---

## App Version Management

### Versioning Rules

- **Version Number** (e.g., 1.0.0): User-facing version
- **Build Number** (e.g., 1, 2, 3): Must increment for each upload

### Update Version in Xcode

1. Select project in navigator
2. Select target
3. **General** tab:
   - **Version:** 1.0.0 → 1.0.1
   - **Build:** 1 → 2

### Or update in Info.plist

```xml
<key>CFBundleShortVersionString</key>
<string>1.0.1</string>
<key>CFBundleVersion</key>
<string>2</string>
```

### Semantic Versioning

- **1.0.0** - Initial release
- **1.0.1** - Bug fixes
- **1.1.0** - New features (backwards compatible)
- **2.0.0** - Breaking changes

---

## Performance Optimization

### Reduce App Size

1. **Enable Bitcode:**
   - Build Settings → **Enable Bitcode** → **Yes**

2. **Remove Unused Architectures:**
   ```ruby
   # In ios/Podfile
   post_install do |installer|
     installer.pods_project.targets.each do |target|
       target.build_configurations.each do |config|
         config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = 'arm64'
       end
     end
   end
   ```

3. **Optimize Images:**
   - Use asset catalogs
   - Compress images
   - Use WebP format where possible

### Build Time Optimization

```bash
# Enable multi-threaded compilation
# Add to Build Settings:
# COMPILER_INDEX_STORE_ENABLE = NO
# SWIFT_COMPILATION_MODE = wholemodule
```

---

## Troubleshooting

### Error: "No profiles for team"

**Solution:**
1. Go to Xcode Preferences → Accounts
2. Select your team
3. Click "Download Manual Profiles"
4. Or enable "Automatically manage signing"

### Error: "Code signing entitlements file not found"

**Solution:**
```bash
cd ios
rm -rf build/
pod deintegrate
pod install
cd ..
```

### Error: "Could not find module 'Firebase'"

**Solution:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Build Succeeds But Archive Fails

**Solution:**
1. Product → Scheme → Edit Scheme
2. For Archive, ensure Build Configuration is "Release"
3. Clean build folder: Product → Clean Build Folder
4. Try archiving again

### "This build is using a beta version of Xcode"

**Solution:**
- Use latest stable Xcode (not beta)
- Download from App Store or [developer.apple.com](https://developer.apple.com/download/)

### Upload Fails with "ITMS-90xxx" Error

Common errors and solutions:

**ITMS-90206:** Invalid Bundle
- Check Bundle Identifier matches App Store Connect
- Ensure version/build numbers are correct

**ITMS-90125:** Missing Privacy Description
- Add required privacy descriptions to Info.plist

**ITMS-90022:** Missing required icon
- Ensure all app icons are properly configured

### Long Processing Time in App Store Connect

**Normal:** 15-60 minutes for build to process
**If longer:** Check build for issues, may need to re-upload

---

## Required Info.plist Entries

Add these to `ios/FlacronAI/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app requires camera access to capture inspection photos.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>This app requires photo library access to select inspection photos.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>This app requires location access to include property location in reports.</string>

<key>NSPhotoLibraryAddUsageDescription</key>
<string>This app requires access to save exported reports to your photo library.</string>

<key>NSMicrophoneUsageDescription</key>
<string>This app requires microphone access for video recording.</string>
```

---

## Pre-Submission Checklist

Before submitting to App Store:

- ✅ App launches without crashes
- ✅ All features work as expected
- ✅ Tested on multiple iOS versions
- ✅ Tested on different device sizes
- ✅ All permissions properly requested
- ✅ App works in airplane mode (offline)
- ✅ Payment flow tested (sandbox mode)
- ✅ No debug code or console logs
- ✅ App Store assets prepared
- ✅ Privacy policy and terms updated
- ✅ App complies with App Store guidelines

---

## Useful Commands

```bash
# List simulators
xcrun simctl list devices

# Boot simulator
xcrun simctl boot "iPhone 14 Pro"

# Install app on simulator
xcrun simctl install booted path/to/FlacronAI.app

# View build settings
xcodebuild -workspace ios/FlacronAI.xcworkspace -scheme FlacronAI -showBuildSettings

# Clean derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# View certificates
security find-identity -v -p codesigning

# Validate app
xcrun altool --validate-app -f FlacronAI.ipa -t ios -u username@example.com
```

---

## Next Steps

Once you have successfully uploaded to App Store Connect:

1. ✅ Complete TestFlight testing
2. ✅ Prepare App Store listing (see APPLE_APPSTORE_PUBLISHING_GUIDE.md)
3. ✅ Create screenshots and app preview videos
4. ✅ Write app description and keywords
5. ✅ Submit for App Store review

---

## Additional Resources

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [TestFlight Beta Testing](https://developer.apple.com/testflight/)

---

## Support

For issues or questions:
- Email: support@flacronenterprises.com
- [React Native iOS Guide](https://reactnative.dev/docs/running-on-device)
- [Apple Developer Forums](https://developer.apple.com/forums/)

---

**Good luck with your iOS build! 🚀**
