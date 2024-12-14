
不可以放到 `scripts` 目录下，因为 `hexo` 会执行。

文件 `node_modules\hexo-theme-fluid\_config.yml` 在执行 `npm install` 或 `num upgrade` 时会被覆盖掉，所以在每次 `install` 或 `upgrade` 后拷贝一份。这个操作需要 `fs-extra` 库的支持。
