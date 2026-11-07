# 更新本期豆單

商品資料放在 `data/coffees.json`；不必修改 HTML 或版型。本地預覽限定，不會更新 Git 或公開網站。

## 每次換豆

1. 打開 `data/coffees.json`。`products` 裡每個 `{ ... }` 是一款豆，依陣列順序顯示；保留 3–5 款。要加豆就複製一款完整資料，改為新的唯一 `id`；移除該款整段就是下架。
2. 修改中文欄位：`zh` 名稱、`origin_zh` 產區、`process_zh` 處理法、`notes_zh` 風味陣列（至少兩項）、`title_zh` 風味標題、`body_zh` 介紹、`roast_zh` 烘焙度。英文欄位暫不必更新；預設只重建中文版。
3. 修改 `weight_g`（每包克數）、`price_ntd`（整數售價）。學生價依檔案上方的 `student_discount_percent: 10` 自動算九折。各豆可有不同克數或售價，頁首不會誤顯示同一價格。
4. 修改 `photos` 的 `beans`、`origin`、`flavor` 照片識別碼與中文圖說。來源識別碼見 `design/photo-sources-v3.json`；不可拿產區參考或其他人的咖啡豆當成自己的實拍。這版商品照全是真實攝影參考，還不是露露這批豆子的實拍。
5. `color` 可用 `rose`、`blue`、`green`，只改風味標籤顏色。`updated` 改實際換豆日期；`refresh_months` 是頁面顯示的換豆週期，目前 2 個月。
6. 在這個目錄執行：

```sh
python3 build.py
python3 check.py
```

`build.py` 預設只重建中文版首頁與熟豆頁，英文 HTML 保留原檔。只要資料未通過檢查，就不會覆寫任何頁面。導覽、商品、LINE 詢問文字、售價、學生價、來源授權與首頁豆單入口會依本期資料產生。

## 加入新的真實照片

把照片放到 `assets/`；在 `design/photo-sources-v3.json` 增加一筆具有唯一 `id` 的來源紀錄（`asset`、`title`、`source`、`author`、`license`、`licenseUrl`）。這些資料會自動進入頁尾可展開的授權清單。自有照片記錄作者與原始來源；網路照片需有可使用的授權。照片圖說與出處都須如實描述。商品 `photos` 填來源紀錄的 `id`，不需要改 HTML。

現有共用的熟豆照片可以先繼續當參考照。拿到每款實拍後，換上相對應的照片與圖說，再同步調整「攝影參考」揭露文案；不要把 AI 圖或包裝設計圖標示成實拍。

## 驗證 3–5 款支援

```sh
python3 qa/check_catalog_variants.py
```

測試在系統暫存資料夾產生 3、4、5 款的驗證頁，檢查順序、錨點、不同售價與學生折扣，以及中文資料不需要英文欄位；不會把測試豆款寫進真的豆單或預覽網站。也會檢查少於 3／超過 5、重複 id、缺圖及錯誤售價均被拒絕。
