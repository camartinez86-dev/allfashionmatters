# Free Email Form Setup (Google Apps Script)

替代 Formspree 的免费方案 — 你可以在 Google Drive 免费使用。

## 步骤 1: 创建 Google Sheet

1. 打开 https://sheets.new
2. 把第一个 sheet 重命名为 "Subscribers"
3. 保留表头: A1=Email, B1=Source, C1=Timestamp

## 步骤 2: 创建 Apps Script

1. 打开 https://script.google.com
2. 点击 "New Project"
3. 删除现有代码，粘贴以下:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Subscribers');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Subscribers');
    sheet.appendRow(['Email', 'Source', 'Timestamp']);
  }
  
  var params = e.parameter;
  var email = params.email || params.Email || '';
  var source = params['data-newsletter-source'] || 'Unknown';
  
  if (email) {
    sheet.appendRow([email, source, new Date()]);
    
    MailApp.sendEmail({
      to: 'YOUR_GMAIL@gmail.com',
      subject: 'New AFM Newsletter: ' + email,
      body: 'Source: ' + source + '\nEmail: ' + email
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput('AFM Form OK');
}
```

4. 把 `YOUR_GMAIL@gmail.com` 改成你的 Gmail

## 步骤 3: 部署

1. 点击 "Deploy" → "New deployment"
2. Select type: "Web app"
3. Description: "AFM Form"
4. Execute as: "Me"
5. Who has access: "Anyone"
6. 点击 "Deploy"
7. 复制 Web URL

## 步骤 4: 更新网站

把 `index.html` 和 `newsletter.html` 里的:
```
https://formspree.io/f/xykdnwow
```
替换成你的 Google Script URL

---

搞定！每次有人注册，你会收到 Gmail 通知，邮箱会自动保存到 Google Sheet。
