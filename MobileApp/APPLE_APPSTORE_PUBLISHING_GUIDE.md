# Apple App Store Publishing Guide

Complete step-by-step guide for publishing FlacronAI Mobile to the Apple App Store.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [App Store Connect Setup](#app-store-connect-setup)
3. [Create App Record](#create-app-record)
4. [App Information](#app-information)
5. [Pricing and Availability](#pricing-and-availability)
6. [Prepare Screenshots and Assets](#prepare-screenshots-and-assets)
7. [App Privacy](#app-privacy)
8. [Upload Build](#upload-build)
9. [Submit for Review](#submit-for-review)
10. [Post-Launch Management](#post-launch-management)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before publishing, ensure you have:

- ✅ Apple Developer Account ($99/year)
- ✅ App successfully archived and uploaded (see IOS_BUILD_GUIDE.md)
- ✅ App screenshots for all required device sizes
- ✅ App icon (1024 x 1024 px)
- ✅ App description and keywords
- ✅ Privacy Policy URL
- ✅ Support URL
- ✅ Marketing URL (optional)
- ✅ App Store promotional text (optional)

---

## App Store Connect Setup

### Step 1: Access App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Sign in with your Apple Developer account
3. Verify your account is active (annual $99 fee paid)

### Step 2: Agreements, Tax, and Banking

Before you can publish:

1. Click **Agreements, Tax, and Banking**
2. **Paid Applications Agreement:**
   - Click **Request**
   - Fill out required information
   - Submit agreement
3. **Tax Forms:**
   - Complete U.S. tax forms (W-9 or W-8)
   - For international, complete appropriate forms
4. **Banking Information:**
   - Add bank account for payments
   - Enter account and routing numbers
   - Verify account (may take 1-2 days)

**Note:** Required even for free apps with in-app purchases.

---

## Create App Record

### Step 1: Create New App

1. In App Store Connect, click **My Apps**
2. Click **+** (Add) → **New App**
3. Fill in app details:

**Platforms:** iOS

**Name:** FlacronAI
(Maximum 30 characters - this is displayed on the App Store)

**Primary Language:** English (U.S.)

**Bundle ID:** Select `com.flacronenterprises.flacronai`
(Must match Bundle ID in Xcode)

**SKU:** `flacronai-ios-001`
(Internal unique identifier - not visible to users)

**User Access:** Full Access (or Limited Access)

4. Click **Create**

---

## App Information

### Section 1: General Information

Navigate to **App Information** from left sidebar.

#### App Name
**FlacronAI**

#### Subtitle (Optional but Recommended)
**AI-Powered Insurance Reports**
(Maximum 30 characters)

#### Categories

**Primary Category:** Productivity
**Secondary Category:** Business

**Available categories:**
- Business
- Productivity
- Finance
- Reference

#### Content Rights
- Does not contain, show, or access third-party content

#### Age Rating
Click **Edit** next to Age Rating:

Answer questionnaire:
- Cartoon or Fantasy Violence: None
- Realistic Violence: None
- Sexual Content or Nudity: None
- Profanity or Crude Humor: None
- Horror/Fear Themes: None
- Mature/Suggestive Themes: None
- Alcohol, Tobacco, or Drug Use: None
- Gambling: None
- Medical/Treatment Information: None
- Unrestricted Web Access: No
- Gambling and Contests: No

**Result:** Rated 4+

---

## Pricing and Availability

Navigate to **Pricing and Availability**.

### 1. Price Schedule

**Base Price:** Free (Tier 0)

For in-app purchases:
- Configure subscriptions separately in **Features** → **In-App Purchases**

### 2. Availability

**Select Countries:**
- All countries and regions (recommended)
- Or select specific countries

**Pre-Order:**
- Available if needed
- Set release date in future

### 3. App Distribution Methods

- ✅ App Store (public)
- ☐ Volume Purchase (B2B)
- ☐ Apple Education (if applicable)

---

## Prepare Screenshots and Assets

### Required Screenshot Sizes

You must provide screenshots for these sizes:

#### iPhone

**6.7" Display (iPhone 14 Pro Max, 15 Pro Max):**
- Size: 1290 x 2796 px (portrait) or 2796 x 1290 px (landscape)
- Minimum: 1 screenshot
- Maximum: 10 screenshots

**6.5" Display (iPhone 11 Pro Max, XS Max):**
- Size: 1242 x 2688 px (portrait) or 2688 x 1242 px (landscape)
- Minimum: 1 screenshot
- Maximum: 10 screenshots

**5.5" Display (iPhone 8 Plus):**
- Size: 1242 x 2208 px (portrait) or 2208 x 1242 px (landscape)
- Optional but recommended for older devices

#### iPad

**12.9" Display (iPad Pro):**
- Size: 2048 x 2732 px (portrait) or 2732 x 2048 px (landscape)
- Minimum: 1 screenshot
- Maximum: 10 screenshots

**Tip:** You can provide one set and it will scale to other sizes, but best results come from size-specific screenshots.

### Screenshot Content

**Recommended screenshots:**
1. **Login/Welcome Screen** - Show clean, inviting interface
2. **Dashboard** - Highlight usage stats and quick actions
3. **Report Generation** - Show form with filled data
4. **Report Preview** - Display professional report output
5. **My Reports** - Show list of generated reports
6. **Export Options** - Highlight PDF/DOCX export
7. **CRM Features** - Client/claim management
8. **Subscription Plans** - Show pricing tiers

**Best Practices:**
- Use actual app screenshots, not mockups
- Add text overlays highlighting key features
- Use consistent branding and colors
- Show app in use with realistic data
- Include status bar (optional)
- No stretched or pixelated images

### App Icon

**Size:** 1024 x 1024 px
**Format:** PNG or JPG (no alpha channel)
**Shape:** Square (no rounded corners)
**Requirements:**
- Fills entire 1024x1024 square
- No transparency
- RGB color space
- 72 DPI minimum

### App Preview Videos (Optional but Recommended)

**Duration:** 15-30 seconds
**Sizes:** Same as screenshot sizes
**Format:** M4V, MP4, or MOV
**Content:**
- Show key features
- No intro logos (start with app immediately)
- Portrait orientation for iPhone
- Add captions for accessibility

**Tips:**
- Record using simulator or device
- Use screen recording tools (QuickTime on Mac)
- Edit with iMovie, Final Cut Pro, or similar
- Show smooth, fluid interactions

---

## App Privacy

Navigate to **App Privacy** (required for all apps).

### Step 1: Start Privacy Information

Click **Get Started** or **Edit**.

### Step 2: Data Collection

Answer questions about data collection:

#### **Do you or your third-party partners collect data from this app?**
**Yes**

#### **Data Types Collected:**

**1. Contact Info:**
- ✅ Name
- ✅ Email Address
- ✅ Phone Number (optional)

**2. User Content:**
- ✅ Photos or Videos (for inspection reports)
- ☐ Audio Data
- ☐ Customer Support
- ☐ Other User Content

**3. Identifiers:**
- ✅ User ID (Firebase UID)
- ☐ Device ID

**4. Usage Data:**
- ✅ Product Interaction (app usage analytics)
- ☐ Advertising Data
- ☐ Other Usage Data

**5. Diagnostics:**
- ✅ Crash Data
- ✅ Performance Data
- ☐ Other Diagnostic Data

**6. Financial Info:**
- ✅ Purchase History (subscription transactions)
- ☐ Credit Info
- ☐ Other Financial Info

### Step 3: Data Usage

For each data type, specify:

**Linked to User:**
- Name, Email, Photos: **Yes** (linked to identity)
- Crash Data: **No** (not linked)

**Used for Tracking:**
- Most data: **No** (not used for tracking)

**Purposes:**
- Account creation and management
- App functionality
- Analytics
- Product personalization
- Customer support
- Fraud prevention

### Step 4: Privacy Policy

**Privacy Policy URL:** https://flacronai.com/privacy-policy

Your privacy policy must include:
- What data is collected
- How data is used
- How data is protected
- How users can delete their data
- Contact information for privacy inquiries

---

## Upload Build

### Step 1: Verify Build in TestFlight

1. Go to **TestFlight** tab
2. Verify your build appears
3. Check build status:
   - **Processing** → Wait (15-60 minutes)
   - **Missing Compliance** → Complete export compliance
   - **Ready to Submit** → Good to go!

### Step 2: Export Compliance

If you see "Missing Compliance":

1. Click on build
2. **Provide Export Compliance Information**
3. Answer questions:
   - **Does your app use encryption?**
     - If Yes (for HTTPS): Select "Yes"
     - Choose "Only uses encryption for HTTPS"
   - Submit

**Common Encryption Question:**
- If your app only uses HTTPS for API calls: **No additional documentation required**
- If using custom encryption: May need ERN (Encryption Registration Number)

### Step 3: Add Build to Version

1. Go to **App Store** tab (not TestFlight)
2. Select version (e.g., **1.0**)
3. In **Build** section, click **+** or **Select a build**
4. Choose your build from list
5. Click **Done**

---

## Submit for Review

### Step 1: Version Information

Navigate to **1.0 Prepare for Submission** (or your version number).

#### What's New in This Version

**Release Notes:**
```
Welcome to FlacronAI! 🎉

The future of insurance inspection reporting is here.

FEATURES:
• AI-powered report generation using Google Gemini
• Photo capture and upload for inspections
• Export reports as PDF, DOCX, or HTML
• Offline draft saving
• Client and claim management (CRM)
• Multiple subscription tiers for all needs
• Professional CRU-style templates

Create professional insurance inspection reports in minutes, not hours.

For support, visit: support@flacronenterprises.com
```

### Step 2: Promotional Text (Optional)

**Promotional Text:**
```
Generate professional insurance inspection reports with AI. Try FlacronAI today!
```

This can be updated without new submission.

### Step 3: Description

**Description:**
```
FlacronAI Mobile - Transform Insurance Inspection Reporting

Generate professional, AI-powered insurance inspection reports in minutes, right from your mobile device.

KEY FEATURES:
• AI-Powered Reports - Leverage Google Gemini AI for intelligent report generation
• Photo Capture - Take and upload inspection photos directly
• Multiple Export Formats - Export as PDF, DOCX, or HTML
• Offline Support - Work offline and sync later
• CRM Integration - Manage clients, claims, and appointments
• Professional Templates - CRU-style and custom formats
• Multi-Language - Generate reports in English, French, Spanish

SUBSCRIPTION PLANS:
Starter: Free (1 report/month)
Professional: $39.99/mo (20 reports/month)
Agency: $99.99/mo (100 reports/month, 5 users)
Enterprise: $499/mo (Unlimited reports and users)

PERFECT FOR:
✓ Insurance Adjusters
✓ Claims Specialists
✓ Inspection Companies
✓ Independent Adjusters
✓ Restoration Companies

TRUSTED BY PROFESSIONALS
Join thousands of insurance professionals streamlining their reporting workflow.

SUPPORT
Email: support@flacronenterprises.com
Website: https://flacronai.com

Experience the future of insurance reporting today!
```

### Step 4: Keywords

**Keywords (maximum 100 characters):**
```
insurance,reports,inspection,AI,claims,adjuster,CRU,productivity,business,export
```

**Tips:**
- Separate with commas
- No spaces after commas
- Include relevant search terms
- Avoid app name (already indexed)
- Research competitor keywords

### Step 5: Support URL

**Support URL:** https://flacronai.com/support
(or: support@flacronenterprises.com as mailto link)

### Step 6: Marketing URL (Optional)

**Marketing URL:** https://flacronai.com

### Step 7: Version

**Version:** 1.0

### Step 8: Copyright

**Copyright:** 2025 Flacron Enterprises LLC

---

## App Review Information

### Contact Information

**First Name:** [Your First Name]
**Last Name:** [Your Last Name]
**Phone Number:** +1 (XXX) XXX-XXXX
**Email:** support@flacronenterprises.com

### Sign-In Required

**Do you require sign-in?** Yes

**Demo Account:**
```
Username: demo@flacronai.com
Password: Demo123!@#
```

**Notes for Reviewer:**
```
Thank you for reviewing FlacronAI!

Demo Account Credentials:
Email: demo@flacronai.com
Password: Demo123!@#

App Flow:
1. Login with demo account
2. Go to Dashboard
3. Tap "Generate Report"
4. Fill out form and tap "Generate Report"
5. View generated report
6. Export as PDF or DOCX
7. Check "My Reports" for saved reports
8. Explore CRM and Profile sections

Subscription Testing:
- Use Apple Sandbox environment for testing subscriptions
- Test subscriptions are configured

Note: The app requires internet connection for AI report generation but supports offline draft saving.

For any questions, contact: support@flacronenterprises.com
```

### Attachment (Optional)

- Upload demo video if needed
- Add screenshots with annotations
- Include testing instructions

---

## App Store Distribution

### Rating

Verify content rating is appropriate (should be 4+).

### App Store Submission

When all sections have green checkmarks:

1. Review all information
2. Click **Save** (if not auto-saved)
3. Click **Add for Review** or **Submit for Review**
4. Confirm submission

---

## Review Process

### Timeline

- **Submission:** Instant
- **Waiting for Review:** 1-3 days (typically)
- **In Review:** Few hours to 1 day
- **Processing for App Store:** Few hours
- **Ready for Sale:** Live!

**Total:** Usually 24-48 hours, can take up to 1 week

### Status Meanings

- **Prepare for Submission** - Not yet submitted
- **Waiting for Review** - In queue
- **In Review** - Apple is reviewing
- **Pending Developer Release** - Approved, waiting for your release
- **Processing for App Store** - Final processing
- **Ready for Sale** - Live on App Store!
- **Rejected** - Review issues found

### If Rejected

1. Check Resolution Center for rejection reasons
2. Review App Store Review Guidelines
3. Fix issues
4. Reply to reviewer or resubmit
5. Don't argue - be professional

**Common Rejection Reasons:**
- App crashes or has bugs
- Incomplete functionality
- Poor user experience
- Privacy policy issues
- Misleading descriptions
- Guideline violations
- In-app purchase issues

---

## Post-Launch Management

### Monitor Performance

1. **Sales and Trends** - Downloads, revenue, subscriptions
2. **Ratings & Reviews** - User feedback
3. **Crashes** - Using App Analytics
4. **App Analytics** - User engagement metrics

### Respond to Reviews

1. Go to **Ratings and Reviews** in App Store Connect
2. Click **View on App Store** → Sign in
3. Find reviews and click **Reply**

**Best Practices:**
- Reply within 24-48 hours
- Be professional and courteous
- Thank users for positive feedback
- Address concerns in negative reviews
- Don't share personal information
- Direct users to support for issues

### Release Updates

1. Create new version in App Store Connect
2. Upload new build
3. Update "What's New" notes
4. Submit for review
5. Consider phased release (gradual rollout)

### Phased Release

Benefits:
- Gradual rollout over 7 days
- Monitor for issues
- Pause if problems arise
- Less risk than immediate 100% rollout

Enable:
- App Store Connect → Version → Phased Release → Turn On

---

## In-App Purchases

### Configure Subscriptions

1. Go to **Features** → **In-App Purchases**
2. Click **+** to create new in-app purchase
3. Select **Auto-Renewable Subscription**

**For Each Tier:**

**Professional Subscription:**
- Reference Name: Professional Monthly
- Product ID: professional_monthly
- Subscription Group: FlacronAI Subscriptions
- Subscription Duration: 1 month
- Price: $39.99 (Tier 40)

**Agency Subscription:**
- Reference Name: Agency Monthly
- Product ID: agency_monthly
- Duration: 1 month
- Price: $99.99 (Tier 85)

**Enterprise Subscription:**
- Reference Name: Enterprise Monthly
- Product ID: enterprise_monthly
- Duration: 1 month
- Price: $499.00 (manually set)

### Subscription Information

For each subscription, provide:
- Display Name
- Description
- Promotional Image (1024 x 1024 px)
- Localization for other languages

### Subscription Review

- Subscriptions reviewed separately
- May take 24-48 hours
- Must be approved before app can use them

---

## Troubleshooting

### Build Not Appearing in TestFlight

**Solutions:**
- Wait 15-60 minutes for processing
- Check email for issues
- Verify signing certificate
- Ensure version/build number increased

### "Missing Compliance" Status

**Solution:**
- Answer export compliance questions
- For HTTPS-only apps, select standard encryption
- Submit

### Repeated Rejections

**Solutions:**
- Carefully read rejection reason
- Reply to reviewer with questions if unclear
- Request phone call with App Review team
- Join Apple Developer Forums for advice
- Consider consulting with iOS development expert

### Subscription Issues

**Common issues:**
- Subscription group not configured
- Missing promotional images
- Incomplete pricing information
- Localization missing

### Crash on Launch

**Solutions:**
- Test on clean device
- Check device logs
- Test with Organizer before submitting
- Verify all dependencies included
- Test on multiple iOS versions

---

## App Store Optimization (ASO)

### Improve Visibility

**App Name:** Include relevant keyword if possible (within 30 chars)

**Subtitle:** Use wisely - indexed for search

**Keywords:** Research and use all 100 characters

**Description:** Include keywords naturally (not indexed but improves conversions)

### A/B Testing

Use App Store Product Page Optimization:
- Test different screenshots
- Test different app preview videos
- Test different icons
- Monitor conversion rates

### Increase Downloads

- Encourage ratings and reviews
- Respond to all reviews
- Regular updates show active development
- Feature updates in release notes
- Share on social media
- Consider Search Ads

---

## Launch Checklist

Before submission:

- ✅ App thoroughly tested on multiple devices and iOS versions
- ✅ No crashes or major bugs
- ✅ All screenshots uploaded for required sizes
- ✅ App icon (1024x1024) uploaded
- ✅ Description and keywords optimized
- ✅ Privacy policy published and URL added
- ✅ Support URL active
- ✅ Demo account credentials provided
- ✅ App Review notes written
- ✅ Export compliance completed
- ✅ Build selected for version
- ✅ In-app purchases configured (if applicable)
- ✅ Pricing and availability set
- ✅ Contact information current
- ✅ App complies with all guidelines

---

## Important Guidelines

Review these before submitting:

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [App Store Product Page](https://developer.apple.com/app-store/product-page/)

---

## Useful Links

- [App Store Connect](https://appstoreconnect.apple.com)
- [Apple Developer](https://developer.apple.com)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Resolution Center](https://appstoreconnect.apple.com/apps) (inside App Store Connect)
- [Apple Developer Forums](https://developer.apple.com/forums/)

---

## Support

For issues:
- Email: support@flacronenterprises.com
- Apple Developer Support: developer.apple.com/support/

---

**Congratulations on your App Store launch! 🎉**

May your app be approved quickly and reach millions of users!
