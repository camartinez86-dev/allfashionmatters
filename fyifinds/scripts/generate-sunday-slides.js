#!/usr/bin/env node

require('dotenv').config({ path: '/root/.openclaw/workspace/tiktok-marketing/.env' });

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const OUTPUT_DIR = '/root/.openclaw/workspace/fyifinds/posts/2026-03-29-sunday-fitness-deals';
const SLIDES_FILE = path.join(OUTPUT_DIR, 'slide-content.json');

const slides = JSON.parse(fs.readFileSync(SLIDES_FILE, 'utf8'));

// Use Stability AI (preferred) or fallback to OpenAI
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filename);
    
    protocol.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        downloadImage(res.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

async function generateWithStability(prompt, filename) {
  console.log(`   🌊 Using Stability AI...`);
  
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('output_format', 'png');
    formData.append('style_preset', 'photographic');
    
    const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/sd3', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STABILITY_API_KEY}`,
        'Accept': 'application/json'
      },
      body: formData
    });
    
    const data = await response.json();
    
    if (data.artifacts && data.artifacts[0]) {
      const base64 = data.artifacts[0].base64;
      const imageData = Buffer.from(base64, 'base64');
      fs.writeFileSync(filename, imageData);
      console.log(`   ✅ Saved (Stability AI)`);
      return true;
    } else if (data.image) {
      // Alternative response format - base64 encoded PNG
      const imageData = Buffer.from(data.image, 'base64');
      fs.writeFileSync(filename, imageData);
      console.log(`   ✅ Saved (Stability AI)`);
      return true;
    } else if (data.error) {
      console.error(`   ❌ Stability API Error: ${data.error.message || JSON.stringify(data)}`);
      return false;
    } else {
      // Log the full response for debugging
      console.error(`   ⚠️ Stability unexpected response:`, JSON.stringify(data).substring(0, 200));
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Stability Error: ${error.message}`);
    return false;
  }
  
  return false;
}

async function generateWithOpenAI(prompt, filename) {
  console.log(`   🔥 Using OpenAI (fallback)...`);
  
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-image-1.5',
      prompt: prompt,
      n: 1,
      size: '1024x1536'
    })
  });
  
  const data = await response.json();
  
  if (data.data && data.data[0]) {
    const img = data.data[0];
    
    if (img.b64_json) {
      const imageData = Buffer.from(img.b64_json, 'base64');
      fs.writeFileSync(filename, imageData);
      console.log(`   ✅ Saved (OpenAI)`);
      return true;
    } else if (img.url) {
      await downloadImage(img.url, filename);
      console.log(`   ✅ Saved (OpenAI)`);
      return true;
    }
  } else if (data.error) {
    console.error(`   ❌ OpenAI Error: ${data.error.message}`);
  }
  
  return false;
}

async function generateSlide(slideNum, description) {
  const filename = path.join(OUTPUT_DIR, `slide-${String(slideNum).padStart(2, '0')}.png`);
  
  if (fs.existsSync(filename)) {
    console.log(`✓ Slide ${slideNum} already exists, skipping`);
    return filename;
  }
  
  // Enhanced prompt for Stability AI
  const basePrompt = `${description}. iPhone photo, young person athletic build, modern workout clothes, candid authentic moment, natural lighting from window, clean modern home with fitness elements, realistic phone camera quality, no filters, photorealistic.`;
  
  console.log(`\n🎬 Generating slide ${slideNum}...`);
  console.log(`   Prompt: ${description.substring(0, 60)}...`);
  
  // Try Stability AI first, fallback to OpenAI
  let success = false;
  
  if (STABILITY_API_KEY) {
    success = await generateWithStability(basePrompt, filename);
  }
  
  if (!success && OPENAI_API_KEY) {
    const openaiPrompt = `iPhone photo of a young person, athletic build, wearing modern workout clothes. ${description}. Shot from slightly above eye level, candid authentic moment. Natural realistic lighting from window. Clean modern home background with fitness elements visible. Realistic phone camera quality, no filters.`;
    success = await generateWithOpenAI(openaiPrompt, filename);
  }
  
  if (!success) {
    console.log(`   ⚠️ No image generation API available`);
    return null;
  }
  
  return filename;
}

async function main() {
  console.log('🚀 Starting Sunday Fitness Deals Slideshow Generation\n');
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`🔑 APIs: Stability AI ${STABILITY_API_KEY ? '✅' : '❌'} | OpenAI ${OPENAI_API_KEY ? '✅' : '❌'}\n`);
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const generatedSlides = [];
  
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const result = await generateSlide(slide.slide, slide.description);
    
    if (result) {
      generatedSlides.push({
        slide: slide.slide,
        type: slide.type,
        text: slide.text,
        file: path.basename(result)
      });
    }
    
    if (i < slides.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log(`\n✨ Generation complete!`);
  console.log(`📊 Generated ${generatedSlides.length}/${slides.length} slides`);
  
  const manifest = {
    date: '2026-03-29',
    theme: 'Amazon Spring Sale Fitness Deals',
    generatedSlides,
    status: generatedSlides.length === 6 ? 'ready' : 'partial'
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'generation-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('\n📝 Next steps:');
  console.log('1. Check generated slides for quality');
  console.log('2. Add text overlays using add-text-overlay.js');
  console.log('3. Post via Postiz');
  console.log('4. Add trending sound before publishing from TikTok inbox');
}

main().catch(console.error);