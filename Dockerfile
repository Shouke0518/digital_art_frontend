# syntax=docker/dockerfile:1

# 使用官方 Node 映像
FROM node:18

# 建立容器內工作目錄
WORKDIR /app

# 複製專案設定檔
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有原始碼
COPY . .

# 設置環境變數
ENV VITE_HOST=0.0.0.0
ENV VITE_PORT=10000

# 開發時執行 dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "10000"]