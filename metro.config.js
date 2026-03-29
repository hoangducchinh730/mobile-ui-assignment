// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Thêm cấu hình hỗ trợ load file `.wasm` cho SQLite trên nền tảng Web
config.resolver.assetExts.push('wasm');

module.exports = config;
