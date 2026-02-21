import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';

function summarizeImages(images) {
  return images.map((img) => ({
    src: img.currentSrc || img.src,
    alt: img.alt,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    visible: (() => {
      const rect = img.getBoundingClientRect();
      return !(rect.width === 0 || rect.height === 0);
    })(),
  }));
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const layoutMetrics = await page.evaluate(() => {
    const about = document.querySelector('#about');
    const blog = document.querySelector('#blog');
    if (!about || !blog) return null;

    const aboutRect = about.getBoundingClientRect();
    const blogRect = blog.getBoundingClientRect();

    return {
      aboutBottom: aboutRect.bottom,
      blogTop: blogRect.top,
      gap: blogRect.top - aboutRect.bottom,
    };
  });

  const homeImageStatuses = await page.evaluate(() => {
    const broken = [];
    for (const img of Array.from(document.images)) {
      if (!img.complete || img.naturalWidth === 0) {
        broken.push({
          src: img.currentSrc || img.src,
          alt: img.alt,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
        });
      }
    }
    return broken;
  });

  const justDroppedStatuses = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#designers a')).map((card) => {
      const image = card.querySelector('img');
      return {
        title: card.querySelector('h3')?.textContent?.trim() || null,
        href: card.getAttribute('href'),
        imageLoaded: image ? image.complete && image.naturalWidth > 0 : false,
        imageSrc: image ? image.currentSrc || image.src : null,
      };
    });
  });

  await page.screenshot({ path: 'test-artifacts/homepage-full.png', fullPage: true });

  const blogPage = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await blogPage.goto(`${BASE_URL}/blog/`, { waitUntil: 'networkidle' });
  await blogPage.waitForTimeout(2000);

  const blogImageStatuses = await blogPage.evaluate(() => {
    const broken = [];
    for (const img of Array.from(document.images)) {
      if (!img.complete || img.naturalWidth === 0) {
        broken.push({
          src: img.currentSrc || img.src,
          alt: img.alt,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
        });
      }
    }
    return broken;
  });

  await blogPage.screenshot({ path: 'test-artifacts/blog-index.png', fullPage: true });

  await browser.close();

  console.log(JSON.stringify({ layoutMetrics, homeImageStatuses, justDroppedStatuses, blogImageStatuses }, null, 2));
})();
