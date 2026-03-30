#!/usr/bin/env node

/**
 * FYIFinds Substack Post Generator
 * Reads weekly content and formats for Substack
 * 
 * Usage: node scripts/substack-poster.js
 * 
 * Output: Creates substack-ready.md in posts folder
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', 'tiktok-marketing', '.env') });

// Configuration
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');

const EMAIL = process.env.SUBSTACK_EMAIL;

/**
 * Get latest post file
 */
function getLatestPost() {
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md') && f.startsWith('week-'))
    .sort()
    .reverse();
  
  if (files.length === 0) return null;
  
  const content = fs.readFileSync(path.join(POSTS_DIR, files[0]), 'utf-8');
  
  // Extract title from first bold line
  const titleMatch = content.match(/\*\*([^*]+)\*\*/);
  const title = titleMatch ? titleMatch[1] : 'FYIFinds Weekly Update';
  
  // Clean content - convert markdown to Substack-friendly text
  let body = content.replace(/\*\*/g, '');
  
  return { filename: files[0], title, body };
}

/**
 * Main function
 */
function main() {
  console.log('🚀 FYIFinds Substack Post Generator\n');
  
  // Check credentials
  if (!EMAIL) {
    console.log('⚠️  No Substack email found - generating preview only');
  } else {
    console.log(`📧 Account: ${EMAIL}`);
  }
  
  // Get latest post
  const post = getLatestPost();
  if (!post) {
    console.log('❌ No posts found in', POSTS_DIR);
    process.exit(1);
  }
  
  console.log(`📄 Latest post: ${post.title}`);
  
  // Save formatted version
  const outputFile = path.join(POSTS_DIR, 'substack-ready.md');
  const formattedContent = `# ${post.title}\n\n${post.body}\n\n---\n📌 Copy the content above and paste into Substack editor`;
  
  fs.writeFileSync(outputFile, formattedContent);
  console.log(`\n✅ Saved to: ${outputFile}`);
  
  // Print preview
  console.log('\n' + '═'.repeat(50));
  console.log('📝 CONTENT PREVIEW');
  console.log('═'.repeat(50));
  console.log(`\nTITLE: ${post.title}\n`);
  console.log(post.body);
  console.log('\n' + '═'.repeat(50));
  console.log('\n📋 Next steps:');
  console.log('   1. Copy the content above');
  console.log('   2. Go to https://substack.com/new-post');
  console.log('   3. Paste and publish');
  console.log('   OR wait for API approval for auto-post\n');
}

main();
