// src/lib/analytics.ts
export function track(name: string, data?: any) {
  try {
    const body = JSON.stringify({
      name,
      path: location.pathname,
      referrer: document.referrer || null,
      data: data ?? null,
    });

    // sendBeacon é ótimo pra não travar navegação
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/event", new Blob([body], { type: "application/json" }));
      return;
    }

    fetch("/api/event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {}
}