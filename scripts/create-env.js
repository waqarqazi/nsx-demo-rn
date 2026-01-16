#!/usr/bin/env node

/**
 * Helper script to create .env file from .env.example
 * Usage: node scripts/create-env.js
 */

const fs = require('fs');
const path = require('path');

const envExamplePath = path.join(__dirname, '..', '.env.example');
const envPath = path.join(__dirname, '..', '.env');

// Check if .env.example exists
if (!fs.existsSync(envExamplePath)) {
  console.error('❌ .env.example file not found!');
  process.exit(1);
}

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('   If you want to recreate it, delete the existing file first.');
  process.exit(0);
}

// Read .env.example and create .env
try {
  const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');
  fs.writeFileSync(envPath, envExampleContent, 'utf8');
  console.log('✅ Created .env file from .env.example');
  console.log('📝 Please edit .env file with your actual values');
  console.log('📚 See ENV_SETUP.md for detailed instructions');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  process.exit(1);
}
