# PowerShell script to help set up Gradle build environment
# Run this script as Administrator

Write-Host "=== Gradle Build Setup Helper ===" -ForegroundColor Cyan
Write-Host ""

# Check if Java is installed
Write-Host "Checking Java installation..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    if ($javaVersion) {
        Write-Host "✓ Java found: $javaVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ Java not found in PATH" -ForegroundColor Red
    Write-Host "Please install Java JDK 17 from: https://adoptium.net/" -ForegroundColor Yellow
    Write-Host ""
}

# Check JAVA_HOME
Write-Host "Checking JAVA_HOME..." -ForegroundColor Yellow
$javaHome = [System.Environment]::GetEnvironmentVariable('JAVA_HOME', 'Machine')
if ($javaHome) {
    Write-Host "✓ JAVA_HOME is set: $javaHome" -ForegroundColor Green
} else {
    Write-Host "✗ JAVA_HOME is not set" -ForegroundColor Red
    Write-Host "You need to set JAVA_HOME to your JDK installation path" -ForegroundColor Yellow
    Write-Host "Example: C:\Program Files\Eclipse Adoptium\jdk-17.0.13+11-hotspot" -ForegroundColor Yellow
    Write-Host ""
}

# Check Android SDK
Write-Host "Checking ANDROID_HOME..." -ForegroundColor Yellow
$androidHome = [System.Environment]::GetEnvironmentVariable('ANDROID_HOME', 'Machine')
if ($androidHome) {
    if (Test-Path $androidHome) {
        Write-Host "✓ ANDROID_HOME is set: $androidHome" -ForegroundColor Green
    } else {
        Write-Host "✗ ANDROID_HOME path does not exist: $androidHome" -ForegroundColor Red
    }
} else {
    Write-Host "✗ ANDROID_HOME is not set" -ForegroundColor Red
    Write-Host "Default location: $env:USERPROFILE\AppData\Local\Android\Sdk" -ForegroundColor Yellow
    Write-Host ""
}

# Check if android folder exists
Write-Host "Checking for android folder..." -ForegroundColor Yellow
if (Test-Path "android") {
    Write-Host "✓ Android folder exists" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run: cd android; .\gradlew assembleRelease" -ForegroundColor Cyan
} else {
    Write-Host "✗ Android folder not found" -ForegroundColor Red
    Write-Host "You need to run: npx expo prebuild --platform android" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Install Java JDK 17 if not installed" -ForegroundColor White
Write-Host "2. Install Android Studio and SDK" -ForegroundColor White
Write-Host "3. Set JAVA_HOME and ANDROID_HOME environment variables" -ForegroundColor White
Write-Host "4. Run: npx expo prebuild --platform android" -ForegroundColor White
Write-Host "5. Run: cd android; .\gradlew assembleRelease" -ForegroundColor White

