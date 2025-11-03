# Building APK for Todo App

## Method 1: EAS Build (Recommended - Simplest) ⭐

### Prerequisites
- Node.js installed (you already have this)
- Expo account (free)

### Steps:

1. **Install EAS CLI** (if not already installed):
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```
   - If you don't have an account, create one at https://expo.dev
   - Follow the prompts to login

3. **Build the APK**:
   ```bash
   eas build --platform android --profile preview
   ```
   - This will build in the cloud (takes 10-20 minutes)
   - You'll get a download link when it's done

4. **Download your APK**:
   - The build will complete in the cloud
   - You'll get a URL to download the APK file
   - Or check your builds at: https://expo.dev/accounts/[your-username]/builds

### Notes:
- The first build may take longer (20-30 minutes)
- Subsequent builds are faster
- No need to install Java or Android SDK
- The APK will be ready for submission

---

## Method 2: Local Build with Gradle

If you prefer local builds using Gradle, follow these steps:

### Step 1: Install Java JDK 17

1. **Download Java JDK 17**:
   - Go to: https://adoptium.net/temurin/releases/?version=17
   - Download Windows x64 JDK (.msi installer)
   - Run the installer (use default installation path: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x`)

2. **Set JAVA_HOME Environment Variable**:
   ```powershell
   # Open PowerShell as Administrator, then run:
   [System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Eclipse Adoptium\jdk-17.0.13+11-hotspot', 'Machine')
   
   # Add Java to PATH (update version number to match your installation)
   $currentPath = [System.Environment]::GetEnvironmentVariable('Path', 'Machine')
   [System.Environment]::SetEnvironmentVariable('Path', "$currentPath;C:\Program Files\Eclipse Adoptium\jdk-17.0.13+11-hotspot\bin", 'Machine')
   ```
   
   **Or manually:**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Go to "Advanced" tab → "Environment Variables"
   - Under "System variables", click "New":
     - Variable name: `JAVA_HOME`
     - Variable value: `C:\Program Files\Eclipse Adoptium\jdk-17.0.13+11-hotspot` (your actual path)
   - Edit "Path" variable, add: `%JAVA_HOME%\bin`

3. **Restart PowerShell** and verify:
   ```powershell
   java -version
   # Should show: openjdk version "17.x.x"
   ```

### Step 2: Install Android Studio & SDK

1. **Download Android Studio**:
   - Go to: https://developer.android.com/studio
   - Download and install Android Studio
   - During installation, make sure "Android SDK" is selected

2. **Set ANDROID_HOME Environment Variable**:
   ```powershell
   # In PowerShell as Administrator
   [System.Environment]::SetEnvironmentVariable('ANDROID_HOME', 'C:\Users\$env:USERNAME\AppData\Local\Android\Sdk', 'Machine')
   
   # Add Android tools to PATH
   $currentPath = [System.Environment]::GetEnvironmentVariable('Path', 'Machine')
   $androidPath = "$env:USERPROFILE\AppData\Local\Android\Sdk"
   [System.Environment]::SetEnvironmentVariable('Path', "$currentPath;$androidPath\platform-tools;$androidPath\tools", 'Machine')
   ```
   
   **Or manually:**
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
   - Add to PATH: `%ANDROID_HOME%\platform-tools` and `%ANDROID_HOME%\tools`

3. **Open Android Studio**:
   - Go to "More Actions" → "SDK Manager"
   - Install:
     - Android SDK Platform 33 (or latest)
     - Android SDK Build-Tools
     - Android SDK Command-line Tools

### Step 3: Generate Android Native Code

Since this is an Expo project, you need to generate the native Android folder:

```powershell
# In your project root directory
npx expo prebuild --platform android
```

This creates the `android` folder with all necessary native code.

### Step 4: Build APK with Gradle

```powershell
# Navigate to android folder
cd android

# Build the release APK
.\gradlew assembleRelease

# Or on Unix-like systems:
# ./gradlew assembleRelease
```

### Step 5: Find Your APK

After successful build, your APK will be at:
```
android\app\build\outputs\apk\release\app-release.apk
```

### Troubleshooting

**If you get JAVA_HOME error:**
- Make sure you restarted PowerShell after setting environment variables
- Verify: `echo $env:JAVA_HOME` (should show the path)

**If you get SDK not found:**
- Check ANDROID_HOME is set correctly
- Verify Android SDK is installed in Android Studio

**If prebuild fails:**
- Make sure all dependencies are installed: `npm install`
- Check you're using a compatible Node.js version (18+)

---

## Recommendation

**Use Method 1 (EAS Build)** - It's much simpler, faster to set up, and you don't need to install multiple tools. The cloud build handles everything for you.

