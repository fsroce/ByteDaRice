const http = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 4174);
const root = __dirname;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

function resolveFilePath(url) {
  const requestPath = decodeURIComponent(new URL(url, `http://${host}:${port}`).pathname);
  const safePath = path.normalize(requestPath).replace(/^([/\\])*|\.\.(?:[/\\]|$)/g, "");
  const filePath = path.join(root, safePath || "index.html");

  if (!filePath.startsWith(root)) {
    return path.join(root, "index.html");
  }

  return filePath;
}

const server = http.createServer(async (request, response) => {
  const filePath = resolveFilePath(request.url || "/");
  const ext = path.extname(filePath) || ".html";

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(file);
  } catch (error) {
    if (ext !== ".html") {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const fallback = await readFile(path.join(root, "index.html"));
    response.writeHead(200, {
      "Content-Type": contentTypes[".html"],
      "Cache-Control": "no-store"
    });
    response.end(fallback);
  }
});

server.listen(port, host, () => {
  console.log(`ByteDaRice preview running at http://${host}:${port}`);
});
