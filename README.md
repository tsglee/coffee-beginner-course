# 露露咖啡日記 Ruru Coffee Journal

「好好手沖 Good Good Pour」新手手沖體驗課正式網站。採用選定的 Google Stitch 深青綠、象牙白與黃銅色編輯式設計。

公開網址：https://tsglee.github.io/coffee-beginner-course/

課程為 NT$1,800／人、四小時、零經驗可參加。林口、樹林、土城可安排；一人也可開班，由阿勳與露露親自授課。包含 SOP 學習卡與筆記講義。

## 預覽與修改

已生成的網站可直接啟動，不需要 API 金鑰：

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

開啟 http://127.0.0.1:8766/。修改來源後，以 Node.js 20.18.1 以上重建：

```sh
npm ci
npm run build
npm run check
```

- `content/course.mjs`：品牌、課程、參數、比較表與 FAQ。
- `scripts/site.mjs`：共用版型與 Stitch 編排；正式建置只輸出選定版本。
- `scripts/build.mjs`：正式首頁建置，支援 GitHub Pages 專案路徑。
- `assets/site.css`、`assets/stitch.css`、`assets/site.js`：版型與互動。
- `assets/brand/ruru-logo.png`：使用者提供的原始透明 Logo。
- `assets/generated/`：GPT 生成手沖情境；`images/`：真實講師與課堂照片。
- `design/stitch/`：保留原始 Stitch 設計及本地實作說明。

## 發布與回復

GitHub Pages 從 `main` 分支根目錄發布；`index.html` 為已建置正式首頁。圖片、樣式及腳本使用相對路徑，適用 `/coffee-beginner-course/`。網站訪客不需要呼叫 Stitch 或其他 API。

舊網站保留於 Git 歷史，替換前的版本為 `a107367`。需要回復時可對新版發布提交執行 `git revert`，再推送 `main`，避免重寫歷史。

報名洽詢：https://lin.ee/5bkhZu1
