# Android Build Guide - FlacronAI Mobile

Complete guide for building production-ready Android APK and AAB files.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Generate Signing Key](#generate-signing-key)
3. [Configure Gradle](#configure-gradle)
4. [Build Release APK](#build-release-apk)
5. [Build App Bundle (AAB)](#build-app-bundle-aab)
6. [Testing Release Build](#testing-release-build)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before building for production, ensure you have:

- ✅ Android Studio installed
- ✅ Java JDK 11 or higher
- ✅ Android SDK (API Level 31+)
- ✅ Project dependencies installed (`npm install`)
- ✅ Environment variables configured (`.env` file)

---

## Generate Signing Key

### Step 1: Create Keystore File

Open terminal in your project root and run:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore flacronai-release.keystore -alias flacronai -keyalg RSA -keysize 2048 -validity 10000
```

### Step 2: Answer the Prompts

```
Enter keystore password: [YOUR_PASSWORD]
Re-enter new password: [YOUR_PASSWORD]
What is your first and last name?: Flacron Enterprises
What is the name of your organizational unit?: Mobile Development
What is the name of your organization?: Flacron Enterprises LLC
What is the name of your City or Locality?: [Your City]
What is the name of your State or Province?: [Your State]
What is the two-letter country code for this unit?: US
```

**IMPORTANT:**
- Save your keystore password securely
- Backup the `.keystore` file - you cannot recover it if lost
- Never commit this file to version control

### Step 3: Move Keystore File

```bash
# Move keystore to android/app directory
mv flacronai-release.keystore android/app/
```

---

## Configure Gradle

### Step 1: Set up Gradle Variables

Create `android/gradle.properties` (or add to existing file):

```properties
# Signing Config
MYAPP_RELEASE_STORE_FILE=flacronai-release.keystore
MYAPP_RELEASE_KEY_ALIAS=flacronai
MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password

# Increase memory for build
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
org.gradle.parallel=true
org.gradle.configureondemand=true
android.useAndroidX=true
android.enableJetifier=true
```

**Security Note:** For production, use environment variables instead of storing passwords in files.

### Step 2: Update build.gradle

Edit `android/app/build.gradle`:

```gradle
android {
    compileSdkVersion 33
    buildToolsVersion "33.0.0"

    defaultConfig {
        applicationId "com.flacronenterprises.flacronai"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
        multiDexEnabled true
    }

    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }

    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro"
            shrinkResources true
        }
    }
}
```

### Step 3: Configure ProGuard (Optional but Recommended)

Create/edit `android/app/proguard-rules.pro`:

```proguard
# Add project specific ProGuard rules here
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# Firebase
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }

# React Native
-dontwarn com.facebook.react.**
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip
```

---

## Build Release APK

### Method 1: Using Gradle Command (Recommended)

```bash
cd android
./gradlew assembleRelease
cd ..
```

The APK will be generated at:
```
android/app/build/outputs/apk/release/app-release.apk
```

### Method 2: Using npm Script

```bash
npm run build:android
```

### Method 3: Using Android Studio

1. Open `android` folder in Android Studio
2. Go to **Build** → **Generate Signed Bundle / APK**
3. Select **APK**
4. Choose your keystore file
5. Enter keystore password and key password
6. Select **release** build variant
7. Click **Finish**

---

## Build App Bundle (AAB)

**App Bundle (AAB)** is required for Google Play Store uploads (APK is being phased out).

### Method 1: Using Gradle Command (Recommended)

```bash
cd android
./gradlew bundleRelease
cd ..
```

The AAB will be generated at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

### Method 2: Using Android Studio

1. Open `android` folder in Android Studio
2. Go to **Build** → **Generate Signed Bundle / APK**
3. Select **Android App Bundle**
4. Choose your keystore file
5. Enter passwords
6. Select **release** build variant
7. Click **Finish**

---

## Testing Release Build

### Install APK on Device

```bash
# Using adb
adb install android/app/build/outputs/apk/release/app-release.apk

# Or drag and drop the APK file to an emulator
```

### Test Checklist

Before publishing, test the following:

- ✅ App launches successfully
- ✅ Authentication works (login/register)
- ✅ Report generation functions
- ✅ Photo capture and upload
- ✅ Export functionality (PDF, DOCX)
- ✅ Payment flow (use test mode)
- ✅ Offline functionality
- ✅ Push notifications
- ✅ App doesn't crash on different screen sizes
- ✅ Performance is acceptable
- ✅ No console errors or warnings

### Performance Testing

```bash
# Check APK size
ls -lh android/app/build/outputs/apk/release/app-release.apk

# Analyze APK contents
cd android
./gradlew app:analyzeReleaseBundle
```

---

## App Version Management

### Update Version Number

Edit `android/app/build.gradle`:

```gradle
defaultConfig {
    versionCode 2           // Increment for each release
    versionName "1.0.1"     // Semantic version
}
```

**Version Rules:**
- `versionCode` must increase with each release
- `versionName` is user-facing (e.g., "1.0.0", "1.1.0", "2.0.0")

---

## Troubleshooting

### Error: "Failed to find Build Tools revision"

**Solution:**
```bash
# Install required build tools via Android Studio SDK Manager
# Or update build.gradle to match your installed version
```

### Error: "Execution failed for task ':app:validateSigningRelease'"

**Solution:**
- Verify keystore file exists at correct path
- Check passwords in `gradle.properties`
- Ensure keystore alias matches

### Error: "INSTALL_FAILED_UPDATE_INCOMPATIBLE"

**Solution:**
```bash
# Uninstall existing app first
adb uninstall com.flacronenterprises.flacronai

# Then install release APK
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Build is Slow

**Solution:**
```bash
# Enable parallel builds and increase memory
# Add to android/gradle.properties:
org.gradle.parallel=true
org.gradle.daemon=true
org.gradle.jvmargs=-Xmx4096m
```

### APK Size is Too Large

**Solutions:**
1. Enable ProGuard (minification)
2. Enable resource shrinking
3. Use App Bundle instead of APK
4. Remove unused dependencies
5. Optimize images and assets

```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### Error: "Could not determine the dependencies of task ':app:compileReleaseJavaWithJavac'"

**Solution:**
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleRelease
```

---

## Reducing APK Size

### 1. Enable ABI Splits

Edit `android/app/build.gradle`:

```gradle
android {
    splits {
        abi {
            enable true
            reset()
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
            universalApk false
        }
    }
}
```

This creates separate APKs for each architecture.

### 2. Use WebP Images

Convert PNG/JPG images to WebP format for smaller size:
```bash
# Using online tools or:
cwebp input.png -o output.webp
```

### 3. Remove Unused Resources

```gradle
android {
    buildTypes {
        release {
            shrinkResources true
            minifyEnabled true
        }
    }
}
```

---

## Security Best Practices

1. **Never commit keystore files** - Add to `.gitignore`
2. **Use environment variables** for sensitive data
3. **Enable Google Play App Signing** (recommended)
4. **Test with ProGuard enabled** before release
5. **Scan for vulnerabilities** using tools like MobSF
6. **Obfuscate code** with ProGuard/R8
7. **Use HTTPS only** for API calls
8. **Validate SSL certificates**

---

## Next Steps

Once you have a signed APK/AAB:

1. ✅ Test thoroughly on multiple devices
2. ✅ Prepare store listing materials (screenshots, description)
3. ✅ Review **GOOGLE_PLAY_PUBLISHING_GUIDE.md**
4. ✅ Upload to Google Play Console
5. ✅ Submit for review

---

## Useful Commands

```bash
# List connected devices
adb devices

# Check app package
aapt dump badging android/app/build/outputs/apk/release/app-release.apk | grep package

# View signing certificate
keytool -list -v -keystore android/app/flacronai-release.keystore

# Check APK signature
jarsigner -verify -verbose -certs android/app/build/outputs/apk/release/app-release.apk

# Analyze AAB
bundletool build-apks --bundle=android/app/build/outputs/bundle/release/app-release.aab --output=output.apks

# Clean build
cd android && ./gradlew clean && cd ..
```

---

## Support

For issues or questions:
- Email: support@flacronenterprises.com
- Check [React Native Documentation](https://reactnative.dev/docs/signed-apk-android)

---

**Good luck with your Android build! 🚀**
