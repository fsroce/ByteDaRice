# ByteDaRice 官网预览

这是一个纯静态 ByteDaRice 官网 Demo，包含：

- `index.html`：页面结构
- `styles.css`：页面样式和动画
- `server.js`：零依赖 Node 静态预览服务器
- `package.json`：`npm start` / `npm run dev` 启动脚本

## 先把代码同步到你本地

如果你本地还没有这些文件，需要先把当前 PR / 分支拉下来。常见方式如下。

### 方式一：直接拉当前分支

```bash
git fetch origin
git checkout work
git pull origin work
```

然后确认本地能看到这些文件：

```bash
ls index.html styles.css package.json server.js
```

### 方式二：如果是在 GitHub PR 页面

在 PR 页面点击 **Code** / **Checkout with GitHub CLI**，或者用 GitHub 提供的命令把 PR checkout 到本地。

如果你用 GitHub CLI，通常是：

```bash
gh pr checkout <PR_NUMBER>
```

> 注意：我在云端工作区提交了文件，但它不会自动出现在你电脑本地；你必须 `git pull`、checkout PR，或者下载 PR 的 zip。

## 本地运行

确保本机已安装 Node.js，然后在项目根目录执行：

```bash
npm start
```

默认会启动：

```text
http://127.0.0.1:4174/
```

打开浏览器访问即可。

## 换端口

如果 `4174` 被占用，可以指定端口：

```bash
PORT=3000 npm start
```

然后访问：

```text
http://127.0.0.1:3000/
```

## 不想用 Node

这个页面没有构建步骤，也可以用 Python 临时预览：

```bash
python3 -m http.server 4174
```

然后访问：

```text
http://127.0.0.1:4174/
```

## 云端平台预览

Vercel / Netlify / Render / Railway 这类平台可以使用：

```text
Start Command: npm start
Port: 使用平台自动注入的 PORT 环境变量
```

`server.js` 已经默认监听 `0.0.0.0` 并读取 `PORT`，适合云端预览环境。

## 常见问题

### 页面打不开

1. 确认本地真的有文件：

   ```bash
   ls index.html styles.css package.json server.js
   ```

2. 确认服务启动成功：

   ```bash
   npm start
   ```

3. 确认访问的是启动日志里的端口，比如：

   ```text
   ByteDaRice preview running at http://0.0.0.0:4174
   ```

   本地浏览器应访问：

   ```text
   http://127.0.0.1:4174/
   ```

### `npm start` 没反应

可以直接跑：

```bash
node server.js
```

### 没装 npm / Node

用 Python：

```bash
python3 -m http.server 4174
```
