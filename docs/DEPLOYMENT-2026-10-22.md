# 佛我咖啡整合版正式發布

使用者明確要求以目前整合版替代原 coffee course repo。本 repo 是 `https://github.com/tsglee/coffee-beginner-course`，從 `main` 根目錄發布 GitHub Pages：

- 首頁：https://tsglee.github.io/coffee-beginner-course/?lang=zh
- 咖啡選購：https://tsglee.github.io/coffee-beginner-course/shop.html?lang=zh
- 好好手沖：https://tsglee.github.io/coffee-beginner-course/courses.html?lang=zh
- 英文首頁：https://tsglee.github.io/coffee-beginner-course/?lang=en

## 來源與回復

整合版來源：`https://github.com/tsglee/coffee-site` 的 `forward`，提交 `74cdd4118c5d15801b45f48ce88e148c312a482d`。網站執行檔與圖片直接取自此已提交快照，未複製本機未追蹤檔案或瀏覽器資料。README、handoff、包裝網址與語言測試的專案路徑改成此 repo；另加入舊網址導向。

原課程站提交：`2a88616a1c82fe18a0c6a38bf0a9c0d4152afd6a`。替換前已在 GitHub 保存標籤 `before-forward-integration-20261022`。舊來源、Logo、圖片與版型皆可從該標籤或 Git 歷史恢復，這次未重寫歷史或強制推送。

需要回復時，對本次「Publish Forward Coffee storefront and workshop integration」發布提交執行 `git revert`，再推送 `main`。若其後已有其他修改，先檢查差異再回復，避免覆蓋新內容。

## 網址與維護

舊的 `/sky/` 課程連結導向 `../courses.html`，避免已分享的天空藍課程網址失效。其餘公開網站檔使用相對路徑與 `.nojekyll`，無需 npm 或建置步驟。原課程專案的建置腳本已由此版 plain HTML/CSS/JavaScript 來源取代。

後續正式修改以本 repo 的 `main` 為準，不要再執行舊課程模板的 npm build。另一個 `coffee-site` repo 的公開 main 保持原版，`forward` 是此版本的開發來源。

網站仍為可操作展示版：五款豆子、價格、庫存、烘焙與訂單是示範資料；後台資料保存在訪客瀏覽器。課程洽詢繼續使用原 LINE 入口。
