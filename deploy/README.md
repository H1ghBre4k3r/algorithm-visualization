# Deployment

The production container builds the Rust/WASM tracer and the React app, then serves the static Vite output through unprivileged nginx on port `8080`.

## Local Container

```bash
docker compose up --build
```

Open `http://127.0.0.1:8080/`.

## Build And Push

Replace the image name with your registry.

```bash
docker build -t ghcr.io/your-org/algorithm-visualization:latest .
docker push ghcr.io/your-org/algorithm-visualization:latest
```

## K3s

The manifests in `deploy/kubernetes` assume the default K3s Traefik ingress controller is installed.

Update the image and host before applying:

```bash
kubectl kustomize deploy/kubernetes \
  | sed 's#ghcr.io/your-org/algorithm-visualization:latest#registry.example.com/algorithm-visualization:latest#g' \
  | sed 's#algorithms.local#algorithms.example.com#g' \
  | kubectl apply -f -
```

For a local K3s host, map the ingress hostname to the node IP:

```bash
echo "<node-ip> algorithms.local" | sudo tee -a /etc/hosts
```

The app exposes `/healthz` for Kubernetes liveness and readiness checks.

## GitHub Pages

GitHub Pages can host the same static Vite build without Docker. The workflow in `.github/workflows/pages.yml` runs on pushes to `main` and on manual dispatch, builds the Rust/WASM package, runs the web tests, builds Vite for the root path, and deploys `web/dist`.

Before the first deployment, open the repository settings on GitHub and set **Pages -> Build and deployment -> Source** to **GitHub Actions**.

The current custom-domain deployment is served without a path prefix:

```text
https://algo-viz.lome.dev/
```

If deploying as a project page instead, adjust the workflow build step to use `--base="/<repository>/"`.
