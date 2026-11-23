FROM node:26.12.1-bookworm-slim AS web-build
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && update-ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM python:3.13.9-slim-bookworm AS api
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && update-ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN pip install --no-cache-dir uv==0.12.13
COPY api/pyproject.toml api/uv.lock ./api/
RUN uv sync --directory api --frozen --no-dev
COPY api ./api
COPY data ./data
EXPOSE 8000
CMD ["uv", "run", "--directory", "api", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
