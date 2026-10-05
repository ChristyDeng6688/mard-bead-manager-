# 部署到 GitHub Pages

## 一、这个项目适合 GitHub Pages 吗

适合。

当前网页版是纯静态网站：

- HTML
- CSS
- JavaScript
- 浏览器本地图片识别
- localStorage 本地数据保存

它不需要服务器、数据库或后端接口。因此可以直接部署到 GitHub Pages。

部署后可以正常使用：

- 仓库库存
- 拼豆用和后续增补记录
- 补货清单
- 色卡
- 图纸识别
- CSV 下载
- JSON 备份和恢复

---

## 二、部署前准备

确认 `网页版` 文件夹里有这些文件：

```text
index.html
styles.css
app.js
palette.js
palette.json
lucide.min.js
README.md
GITHUB_DEPLOY.md
```

上传时要注意：

- 要把这些文件直接放在 GitHub 仓库根目录。
- 不要只上传“网页版”这个文件夹本身。
- 如果仓库里出现 `网页版/index.html`，GitHub Pages 地址会额外多一层目录。

---

## 三、创建 GitHub 仓库

1. 登录 [https://github.com](https://github.com)
2. 点击右上角 `+`
3. 选择 `New repository`
4. 仓库名称可以写：

```text
mard-bead-manager
```

5. 选择 `Public`
6. 不要勾选 `Add a README file`
7. 点击 `Create repository`

---

## 四、通过网页上传文件

这是最简单的方法。

1. 进入刚创建的仓库
2. 点击 `Add file`
3. 选择 `Upload files`
4. 打开本地 `D:\拼豆相关\网页版`
5. 选中文件夹里的所有文件
6. 拖到 GitHub 上传区域
7. 在页面底部点击 `Commit changes`

上传完成后，仓库根目录应该直接显示：

```text
index.html
styles.css
app.js
palette.js
palette.json
lucide.min.js
README.md
GITHUB_DEPLOY.md
```

---

## 五、开启 GitHub Pages

1. 打开仓库
2. 点击 `Settings`
3. 左侧点击 `Pages`
4. 在 `Build and deployment` 中选择：

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

5. 点击 `Save`
6. 等待 1–5 分钟
7. 刷新 Pages 页面

你会得到类似网址：

```text
https://你的用户名.github.io/mard-bead-manager/
```

---

## 六、手机端打开

得到网址后，用手机浏览器打开：

- iPhone / iPad：Safari
- Android：Chrome 或 Edge
- HarmonyOS：华为浏览器

可以添加到主屏幕：

### iPhone / iPad

1. Safari 打开网址
2. 点击分享按钮
3. 选择“添加到主屏幕”

### Android

1. Chrome 打开网址
2. 点击右上角菜单
3. 选择“添加到主屏幕”或“安装应用”

### HarmonyOS

1. 华为浏览器打开网址
2. 点击浏览器菜单
3. 选择“添加到桌面”

---

## 七、数据保存在哪里

GitHub Pages 只托管网页代码，不会保存你的库存数据。

数据保存在当前浏览器的 localStorage 中，绑定条件是：

- 当前设备
- 当前浏览器
- 当前网站域名

因此：

- 同一手机、同一浏览器、同一网址：数据会保留
- 换手机：不会自动同步
- 换浏览器：不会自动同步
- 清理浏览器数据：可能丢失
- 使用无痕模式：关闭后可能丢失
- 用微信、QQ 内置浏览器：不建议正式记录

建议定期点击右上角“备份”，导出 JSON 文件。

---

## 八、从本地文件迁移到 GitHub Pages

本地打开：

```text
file:///D:/拼豆相关/网页版/index.html
```

GitHub Pages 打开：

```text
https://你的用户名.github.io/仓库名/
```

这两个地址属于不同来源，浏览器不会共享 localStorage。

迁移方法：

1. 在本地文件版点击“备份”
2. 保存导出的 JSON 文件
3. 打开 GitHub Pages 网址
4. 点击“导入”
5. 选择刚保存的 JSON 文件

迁移完成后，以后固定使用 GitHub Pages 地址即可。

---

## 九、以后如何更新网页

如果修改了本地文件：

1. 回到 GitHub 仓库
2. 打开对应文件
3. 点击右上角铅笔图标编辑，或重新上传
4. 提交修改
5. 等待 GitHub Pages 自动更新
6. 手机浏览器刷新页面

只要网址没有变化，浏览器里的原有数据通常会继续保留。

---

## 十、命令行部署方式

如果电脑已经安装 Git，可以使用 PowerShell。

进入网页文件夹：

```powershell
cd 'D:\拼豆相关\网页版'
```

然后执行：

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/mard-bead-manager.git
git push -u origin main
```

如果仓库创建时勾选了 README，先执行：

```powershell
git pull --rebase origin main
```

再执行：

```powershell
git push -u origin main
```

GitHub 现在通常不再使用账号密码验证 Git，会弹出浏览器登录，或要求使用 Personal Access Token。

---

## 十一、常见问题

### 1. 网址打开是 404

检查：

- `index.html` 是否在仓库根目录
- Pages 是否选择 `main`
- Folder 是否是 `/ (root)`
- 是否等待了 1–5 分钟

### 2. 手机打开是旧版本

尝试：

- 下拉刷新
- 关闭页面后重新打开
- 清除该网站缓存
- 确认 GitHub 提交已经成功

### 3. 换了网址后数据不见了

这是正常的，因为浏览器认为新网址是新来源。

在原网址导出 JSON，再在新网址导入即可。

### 4. 别人打开我的网址会不会看到我的库存

不会。

每个人打开网址后，数据都保存在自己的浏览器里。除非以后增加账号和后端同步，否则用户之间互不影响。

---

## 十二、推荐使用方式

1. 部署到 GitHub Pages
2. 固定使用 GitHub Pages 地址
3. 手机添加到主屏幕
4. 定期导出 JSON 备份
5. 换设备前先导出备份

以后如果要做多设备自动同步，可以在现有 GitHub Pages 前端基础上增加 Supabase。
