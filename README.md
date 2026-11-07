# 露露咖啡日記 / Ruru Coffee Journal

目前正式版本是 **好好手沖** 中文課程首頁與「本期豆單」。2026-11-06 使用者確認本地預覽後，授權同步到本 repository 並發布；這取代較早的 signature、五配色提案與雙語示範首頁。

- 正式首頁：https://tsglee.github.io/coffee-beginner-course/
- 本期熟豆：https://tsglee.github.io/coffee-beginner-course/beans.html
- Repository：https://github.com/tsglee/coffee-beginner-course

## 本地預覽

```sh
python3 -m http.server 4185 --bind 127.0.0.1
```

開啟 http://127.0.0.1:4185/ 。靜態 HTML、CSS、JavaScript；訪客不需安裝套件、登入、Stitch 或任何 API 金鑰。

## 目前內容

課程 NT$1,800／人、四小時、零經驗可參加、一人可開班、林口，由露露與阿勳親自授課。包含至少三種豆的實作、SOP 流程講義與100g上課豆帶回家練習。學習順序為五次注水比較、SOP、參數調整、換豆評估、冠軍4:6整合練習。80+是學習目標，並非認證或結果保證。

目前豆款為桃可可、水風鈴、夜里花，均淺焙、220g／NT$500，學生九折NT$450。豆款約每兩個月依豆源調整，每期3–5款。買豆和上課都導流至 https://lin.ee/5bkhZu1 ，沒有購物車、付款或個資蒐集。

英文版本切換已依使用者要求移除。品牌名稱 Ruru Coffee Journal 保留。

## 換豆與重建

編輯 `data/coffees.json`，再執行：

```sh
python3 build.py
python3 check.py
python3 qa/check_catalog_variants.py
```

預設只重建中文的 `index.html` 與 `beans.html`；商品導航、圖說、售價與學生折扣都依資料產生。3–5款限制、重複代號、缺圖與錯誤售價會在輸出前檢查。詳見 [換豆維護說明](UPDATE-COFFEES.md)。

## 素材與設計

- `assets/style.css`、`assets/site.js`：響應式排版、手機選單、四參數互動；FAQ使用原生details。
- 露露、阿勳、課堂與官方Logo為提供的真實原始素材；沒有生成代替講師的臉。
- 課程情境使用兩張AI素描，提示詞在 `design/image-prompts.json`。
- 商品區使用真實攝影參考，非本批實拍；區域／生產場景不作莊園溯源。頁面有明確圖說與作者、授權連結，紀錄在 `design/photo-sources-v3.json`。
- Huninn字型自存本地；授權見 `design/Huninn-OFL.txt`。
- `PRODUCT.md`、`DESIGN.md` 記錄目前產品事實與設計系統。

## 相容與歷史頁面

`courses.html` 導向目前首頁學習區，`shop.html`、`product.html` 導向本期豆單，避免舊連結顯示過期示範商品。舊商店/admin及storage程式保留供歷史與本機資料相容，不是目前公開販售流程；本次不修改既有瀏覽器的localStorage。

先前版本可從Git歷史回溯；正式替換前的main為 `9a0e571c38e9bd06cae06f90f4e9f20e0c2af624`。目前部署與驗收見 [發布紀錄](docs/DEPLOYMENT-2026-11-06.md)。歷史操作文件見 `docs/AGENT-HANDOFF.md` 的較早章節，與本次版本衝突時以本README和最新使用者指示為準。

GitHub Pages發布來源為 `main` 根目錄；保留 `.nojekyll` 及相對路徑以支援 `/coffee-beginner-course/`。

## 2026-11-07 課程攝影更新

首頁十個主要區塊、五個課程階段皆有相關真實照片。新增六張既有實拍素材（阿勳沖煮、露露沖煮、日常沖煮、學員品飲、課堂合照、咖啡桌），另有兩張 cottonbro studio / Pexels 秤豆、注水器材特寫。情境參考與實際課堂明確區分；來源與授權在頁尾及 design/photo-sources-v3.json。仍保留兩張課程素描，不新增生成攝影。中文頁面更新，英文頁面未重建。
