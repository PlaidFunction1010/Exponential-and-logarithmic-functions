# Running Math｜對數律即時練習

純靜態網站，適用 GitHub Pages。13 個核心公式、每公式 3 種子題型、二選一、單一／混合模式、三種難度、10/20/無限題、即時解析。

## 發布
1. 將 `index.html`、`style.css`、`config.js`、`engine.js`、`app.js` 五個檔案放在 GitHub 儲存庫同一個資料夾。
2. 於 GitHub Repository → Settings → Pages，選擇 Deploy from a branch、main、/(root)。
3. 等待部署完成後開啟 GitHub Pages 網址。
4. 網站需要網路連線以載入 KaTeX（CDN）。

## GA4 使用統計
在 Google Analytics 建立 GA4 網站資料串流，取得評估 ID（G-XXXXXXXXXX），貼入 `config.js` 的 `gaMeasurementId`。留空時不會啟用統計。GA4 會收到 page_view，以及 practice_started、question_answered、practice_completed 自訂事件。GA4 的「使用者」是估計值，無法保證等於不同學生人數。部署前請依使用環境提供適當隱私告知，並確認所需同意與學校規範。

## 題目規則
`engine.js` 使用有理數精確表示答案，避免用浮點數近似對數求解；依照數學結構生成選項。39 個子題型以每公式三個 variant 編碼。網站生成的題目應由教師正式上線前驗收，尤其是不同難度的根號、小數、分數呈現。
