#!/usr/bin/env node

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = '/root/.openclaw/workspace/fyifinds/posts/2026-04-01-wednesday-protein';
const SLIDES_FILE = path.join(OUTPUT_DIR, 'slide-content.json');

const slides = JSON.parse(fs.readFileSync(SLIDES_FILE, 'utf8'));

async function addOverlay(slideNum, text) {
  const inputPath = path.join(OUTPUT_DIR, `slide-${String(slideNum).padStart(2, '0')}.png`);
  const outputPath = path.join(OUTPUT_DIR, `slide-${String(slideNum).padStart(2, '0')}-overlay.png`);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️ Slide ${slideNum} not found, skipping`);
    return null;
  }
  
  console.log(`\n📝 Adding overlay to slide ${slideNum}...`);
  console.log(`   Text: "${text.replace(/\n/g, ' ')}"`);
  
  try {
    const img = await loadImage(inputPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(img, 0, 0);
    
    // Dynamic font sizing based on text length
    const wordCount = text.split(/\s+/).length;
    let fontSizePercent;
    if (wordCount <= 5) fontSizePercent = 0.075;
    else if (wordCount <= 12) fontSizePercent = 0.065;
    else fontSizePercent = 0.05;
    
    const fontSize = Math.round(img.width * fontSizePercent);
    const outlineWidth = Math.round(fontSize * 0.15);
    const maxWidth = img.width * 0.75;
    const lineHeight = fontSize * 1.3;
    
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    // Word wrap with manual line breaks
    const lines = [];
    const manualLines = text.split('\n');
    for (const ml of manualLines) {
      const words = ml.trim().split(/\s+/);
      let current = '';
      for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        if (ctx.measureText(test).width <= maxWidth) {
          current = test;
        } else {
          if (current) lines.push(current);
          current = word;
        }
      }
      if (current) lines.push(current);
    }
    
    // Position: centered at ~28% from top
    const totalHeight = lines.length * lineHeight;
    const startY = img.height * 0.28 - totalHeight / 2;
    const x = img.width / 2;
    
    // Draw each line
    for (let i = 0; i < lines.length; i++) {
      const y = startY + i * lineHeight;
      
      // Black outline
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = outlineWidth;
      ctx.lineJoin = 'round';
      ctx.miterLimit = 2;
      ctx.strokeText(lines[i], x, y);
      
      // White fill
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(lines[i], x, y);
    }
    
    fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
    console.log(`   ✅ Saved to ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🥤 Adding Text Overlays to Wednesday Protein Slideshow\n');
  
  const results = [];
  
  for (const slide of slides) {
    const result = await addOverlay(slide.slide, slide.text);
    if (result) {
      results.push({
        slide: slide.slide,
        type: slide.type,
        text: slide.text,
        file: path.basename(result)
      });
    }
  }
  
  console.log(`\n✨ Overlays complete!`);
  console.log(`📊 Processed ${results.length}/${slides.length} slides`);
  
  // Update manifest
  const manifest = {
    date: '2026-04-01',
    theme: 'Best Protein Powders 2026',
    slides: results,
    status: 'ready',
    nextStep: 'post-via-postiz'
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'slideshow-ready.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('\n📝 Next steps:');
  console.log('1. Verify slides look good');
  console.log('2. Post via Postiz (tiktok-marketing/scripts/post-to-tiktok.js)');
  console.log('3. Add trending sound before publishing from TikTok inbox');
}

main().catch(console.error);