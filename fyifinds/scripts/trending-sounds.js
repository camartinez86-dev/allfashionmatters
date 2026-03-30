#!/usr/bin/env node
/**
 * Fetch today's trending TikTok sounds and format for Carlos.
 */

const https = require("https");

async function fetchTokChart() {
  return new Promise((resolve) => {
    https.get("https://tokchart.com/", (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", () => resolve(""));
  });
}

function extractSounds(html) {
  const sounds = [];
  // Very simple extraction - look for patterns
  const regex = /\/tiktok-sound\/(\d+)[^>]*>([^<]+)<\/a>/g;
  let match;
  while ((match = regex.exec(html)) !== null && sounds.length < 5) {
    const name = match[2].trim();
    if (name && !name.includes("Subscribe") && !name.includes("Premium")) {
      sounds.push({ id: match[1], name });
    }
  }
  return sounds;
}

(async () => {
  const html = await fetchTokChart();
  const sounds = extractSounds(html);
  
  console.log("📊 Today's Trending TikTok Sounds:");
  console.log("");
  sounds.forEach((s, i) => {
    console.log(`${i + 1}. ${s.name}`);
    console.log(`   https://tokchart.com/dashboard/tiktok-sound/${s.id}`);
  });
  console.log("");
  console.log("Pick one and add it to your draft in Postiz!");
})();
