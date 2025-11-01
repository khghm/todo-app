# Stage 1: Builder - برای build کردن برنامه
FROM node:22-alpine AS builder

# تنظیم دایرکتوری کار
WORKDIR /app

# کپی کردن package files
COPY package*.json ./

# نصب تمام dependencies (شامل devDependencies) تا ابزارهای build در دسترس باشند
RUN npm ci


# کپی کردن سورس کد
COPY . .

# Build برنامه
RUN npm run build

# Stage 2: Production - image نهایی
FROM nginx:alpine

# نصب curl برای health check (اختیاری)
RUN apk add --no-cache curl

# کپی فایل‌های build شده از stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# کپی configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# expos کردن port
EXPOSE 80

# سلامت‌سنجی
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# اجرای nginx
CMD ["nginx", "-g", "daemon off;"]