# FlacronAI Mobile App

## 🚀 AI-Powered Insurance Inspection Reports - Mobile Edition

FlacronAI Mobile is the companion app for FlacronAI web platform, bringing AI-powered insurance inspection report generation to your mobile devices. Built with React Native for seamless cross-platform experience on iOS and Android.

---

## 📱 Features

- **AI Report Generation** - Create professional insurance inspection reports using Google Gemini AI
- **Photo Capture & Upload** - Take photos directly or select from gallery
- **Multiple Export Formats** - Export reports in PDF, DOCX, and HTML
- **Offline Support** - Save drafts and work offline
- **CRM Integration** - Manage clients and claims on the go
- **Subscription Management** - Flexible pricing tiers integrated with Stripe
- **Push Notifications** - Stay updated with report status
- **Secure Authentication** - Firebase-based authentication
- **Cross-Platform** - Runs on both iOS and Android

---

## 🛠️ Tech Stack

### Frontend
- React Native 0.73.2
- React Navigation 6.x
- React Native Firebase
- Axios for API calls
- AsyncStorage for offline storage
- React Native Vector Icons

### Backend Integration
- Node.js + Express API
- Firebase Authentication & Firestore
- Google Gemini AI
- Stripe Payment Processing

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **React Native CLI** (`npm install -g react-native-cli`)
- **Android Studio** (for Android development)
- **Xcode** >= 14.0 (for iOS development, macOS only)
- **CocoaPods** (for iOS, macOS only)
- **Java JDK** >= 11 (for Android)

### Platform-Specific Requirements

#### For Android Development:
- Android SDK (API Level 31+)
- Android Build Tools
- Android Emulator or physical device

#### For iOS Development:
- macOS (required)
- Xcode with Command Line Tools
- iOS Simulator or physical device
- Apple Developer Account (for device testing and deployment)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository (if applicable)

```bash
cd MobileApp
```

### 2. Install Dependencies

```bash
# Install all npm packages
npm install

# For iOS only (macOS required)
cd ios
pod install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# API Configuration
API_URL=https://your-backend-url.com/api

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# Google Maps (optional)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Firebase Setup

#### Android Configuration:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Add an Android app to your project
3. Download `google-services.json`
4. Place it in `android/app/google-services.json`

#### iOS Configuration:
1. In Firebase Console, add an iOS app to your project
2. Download `GoogleService-Info.plist`
3. Place it in `ios/FlacronAI/GoogleService-Info.plist`

---

## 🏃 Running the App Locally

### Start Metro Bundler

```bash
npm start
```

### Run on Android

```bash
# Using Android Studio emulator
npm run android

# Or specify device
npm run android -- --deviceId=<device-id>
```

### Run on iOS (macOS only)

```bash
# Default simulator (iPhone 14)
npm run ios

# Specific simulator
npm run ios -- --simulator="iPhone 14 Pro"
```

---

## 📱 Testing on Physical Devices

### Android Physical Device

1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect device via USB
4. Run: `adb devices` to verify connection
5. Run: `npm run android`

### iOS Physical Device (macOS only)

1. Connect iPhone/iPad via USB
2. Open `ios/FlacronAI.xcworkspace` in Xcode
3. Select your device from the device list
4. Click Run (▶️) or press Cmd+R

**Note:** You need to be signed in with an Apple Developer account in Xcode.

---

## 🏗️ Building for Production

### Android APK/AAB Build

See **ANDROID_BUILD_GUIDE.md** for detailed instructions on:
- Generating signing keys
- Building release APK
- Building AAB for Google Play
- Testing release builds

### iOS Build

See **IOS_BUILD_GUIDE.md** for detailed instructions on:
- Certificates and provisioning profiles
- Building for App Store
- TestFlight deployment
- App Store submission

---

## 📦 Publishing

### Google Play Store

See **GOOGLE_PLAY_PUBLISHING_GUIDE.md** for step-by-step instructions on:
- Creating a Google Play Developer account
- Preparing store listing
- Uploading your AAB
- Setting up pricing and distribution
- Submitting for review

### Apple App Store

See **APPLE_APPSTORE_PUBLISHING_GUIDE.md** for comprehensive guide on:
- Creating an App Store Connect account
- App Store listing requirements
- Screenshots and metadata
- Submission process
- App review guidelines

---

## 🗂️ Project Structure

```
MobileApp/
├── android/                 # Android native code
├── ios/                     # iOS native code
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Card.js
│   │   └── LoadingOverlay.js
│   ├── config/            # Configuration files
│   │   ├── constants.js   # App constants
│   │   └── firebase.js    # Firebase config
│   ├── contexts/          # React contexts
│   │   └── AuthContext.js # Authentication context
│   ├── navigation/        # Navigation setup
│   │   └── AppNavigator.js
│   ├── screens/           # App screens
│   │   ├── AuthScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── GenerateReportScreen.js
│   │   ├── ReportsScreen.js
│   │   ├── ReportDetailScreen.js
│   │   ├── SubscriptionsScreen.js
│   │   ├── CRMScreen.js
│   │   └── ProfileScreen.js
│   ├── services/          # API and storage services
│   │   ├── api.js
│   │   └── storage.js
│   ├── styles/            # Theme and styles
│   │   └── theme.js
│   └── utils/             # Utility functions
│       └── helpers.js
├── assets/                # Images, fonts, etc.
├── App.js                # Main app component
├── index.js              # App entry point
├── package.json          # Dependencies
├── app.json              # App configuration
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler config
└── .env                  # Environment variables
```

---

## 🐛 Troubleshooting

### Common Issues

#### Metro Bundler Issues
```bash
# Clear cache and restart
npm start -- --reset-cache
```

#### Android Build Errors
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npm run android
```

#### iOS Build Errors
```bash
# Clean iOS build
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

#### Dependencies Issues
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

### Android Specific

**Error: SDK location not found**
- Create `local.properties` in `android/` folder
- Add: `sdk.dir=/path/to/Android/sdk`

**Error: Unable to load script**
- Ensure Metro bundler is running
- Run: `adb reverse tcp:8081 tcp:8081`

### iOS Specific

**Error: Command PhaseScriptExecution failed**
- Clean build folder in Xcode: Product → Clean Build Folder
- Delete `ios/Pods` and run `pod install` again

**Error: No bundle URL present**
- Ensure Metro bundler is running
- Try resetting cache: `npm start -- --reset-cache`

---

## 📞 Support

- **Email**: support@flacronenterprises.com
- **Website**: https://flacronai.com
- **Documentation**: See additional guides in this directory

---

## 📄 Additional Documentation

- **[Android Build Guide](./ANDROID_BUILD_GUIDE.md)** - Complete guide for building Android APK/AAB
- **[iOS Build Guide](./IOS_BUILD_GUIDE.md)** - Step-by-step iOS build instructions
- **[Google Play Publishing](./GOOGLE_PLAY_PUBLISHING_GUIDE.md)** - Publishing to Google Play Store
- **[App Store Publishing](./APPLE_APPSTORE_PUBLISHING_GUIDE.md)** - Publishing to Apple App Store

---

## 🔒 Security Notes

- Never commit `.env` file to version control
- Keep your Firebase configuration secure
- Use environment-specific API keys
- Enable Google Play App Signing
- Follow platform security guidelines

---

## 📝 License

Copyright © 2025 Flacron Enterprises. All rights reserved.

---

**Built with ❤️ by Flacron Enterprises**

*Powered by Google Gemini AI*
