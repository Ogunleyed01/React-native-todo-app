const path = require('path');
const fs = require('fs');

// Check if node_modules exists (dependencies are installed)
const nodeModulesPath = path.join(__dirname, 'node_modules');
const hasDependencies = fs.existsSync(nodeModulesPath);

let config;

if (hasDependencies) {
  // Normal mode - dependencies are available
  try {
    const { getDefaultConfig } = require('expo/metro-config');
    config = getDefaultConfig(__dirname);
    
    try {
      const { withNativeWind } = require('nativewind/metro');
      config = withNativeWind(config, { input: './global.css' });
    } catch {
      // NativeWind not available
    }
  } catch {
    // Fallback
    config = {
      resolver: { sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'] },
      transformer: {},
    };
  }
} else {
  // EAS validation mode - return minimal valid config
  config = {
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'mjs', 'cjs'],
    },
    transformer: {},
  };
}

module.exports = config;
