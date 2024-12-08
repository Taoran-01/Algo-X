
不可以放到 `scripts` 目录下，因为 `hexo` 会执行。

文件 `node_modules\hexo-theme-fluid\_config.yml` 与文件夹 `node_modules\hexo-theme-fluid\source` 在执行 `npm install` 或 `num upgrade` 时会被覆盖掉，所以需要将其转移到临时文件夹。

- `preinstall.js`：在 `install` 或 `upgrade` 前，重命名 `source` 和 `_config.yml` 为临时文件。
- `postinstall.js`：在 `install` 或 `upgrade` 后，先将新文件转移，再重命名文件恢复原状。

上述操作需要 `fs-extra` 库的支持。
