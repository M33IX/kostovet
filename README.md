# Kosto-Vet

Статический этап нового сайта Kosto-Vet на Next.js, React и TypeScript. Каталог и формы работают на моковых данных; интеграции с МойСклад и оплатой намеренно не подключены до получения клиентских реквизитов и заполненного склада.

## Docker

Локальную тестовую сборку можно поднять через Docker:

```bash
docker compose -f docker-compose.test.yml up --build
```

После запуска сайт будет доступен на `http://localhost:3000`.

Для остановки:

```bash
docker compose -f docker-compose.test.yml down
```

### Запуск опубликованного образа на VPS

Скопируйте `docker-compose.prod.yml` на сервер и выполните:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml ps
```

Сервис работает в production-режиме и публикуется на всех сетевых интерфейсах VPS: `0.0.0.0:3000`. Порт можно изменить без редактирования файла:

```bash
APP_PORT=8080 docker compose -f docker-compose.prod.yml up -d
```

Альтернативный запуск без Compose:

```bash
docker pull ghcr.io/m33ix/kostovet:latest
docker run -d \
  --name kosto-vet \
  --restart unless-stopped \
  -p 0.0.0.0:3000:3000 \
  ghcr.io/m33ix/kostovet:latest
```

Если на VPS включён firewall, входящий TCP-порт также должен быть разрешён, например для UFW:

```bash
sudo ufw allow 3000/tcp
```

## Запуск

```bash
pnpm install
pnpm dev
```

Проверки: `pnpm typecheck`, `pnpm lint`, `pnpm build`.

## Что нужно до интеграционного этапа

- заполненный ассортимент и остатки в МойСклад;
- способ фискализации и реквизиты ЮКассы;
- приоритетный канал уведомлений;
- отдельный номер дежурного;
- юридические реквизиты и финальные тексты документов.
