# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      binaryen \
      build-essential \
      ca-certificates \
      curl \
      pkg-config \
      libssl-dev \
    && rm -rf /var/lib/apt/lists/*

ENV CARGO_HOME=/usr/local/cargo
ENV RUSTUP_HOME=/usr/local/rustup
ENV PATH=/usr/local/cargo/bin:${PATH}

RUN curl --proto '=https' --tlsv1.2 -fsSL https://sh.rustup.rs \
    | sh -s -- -y --profile minimal --default-toolchain stable \
    && rustup target add wasm32-unknown-unknown \
    && cargo install wasm-pack --locked

WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY crates ./crates
COPY web/package.json web/package-lock.json ./web/

WORKDIR /app/web
RUN npm ci

WORKDIR /app
COPY web ./web

RUN cd web \
    && npm run build:wasm \
    && npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/web/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1
