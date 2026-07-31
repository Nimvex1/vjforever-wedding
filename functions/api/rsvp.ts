export interface Env {
  RSVP_KV: KVNamespace;
  ADMIN_KEY: string;
}

interface RSVPEntry {
  id: string;
  name: string;
  guests: number;
  side: string;
  events: string[];
  message: string;
  submittedAt: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}

export async function onRequestPost(ctx: { request: Request; env: Env }) {
  try {
    const body = (await ctx.request.json()) as Partial<RSVPEntry>;

    if (!body.name?.trim()) {
      return json({ error: "Name is required" }, 400);
    }
    if (!body.side) {
      return json({ error: "Side is required" }, 400);
    }
    if (!body.events || body.events.length === 0) {
      return json({ error: "At least one event is required" }, 400);
    }

    const id = crypto.randomUUID();
    const entry: RSVPEntry = {
      id,
      name: body.name.trim(),
      guests: Number(body.guests) || 1,
      side: body.side,
      events: body.events || [],
      message: body.message || "",
      submittedAt: new Date().toISOString(),
    };

    await ctx.env.RSVP_KV.put(`rsvp:${id}`, JSON.stringify(entry));

    const indexKey = "rsvp:index";
    const raw = await ctx.env.RSVP_KV.get(indexKey);
    const index: string[] = raw ? JSON.parse(raw) : [];
    index.unshift(id);
    if (index.length > 1000) index.length = 1000;
    await ctx.env.RSVP_KV.put(indexKey, JSON.stringify(index));

    return json({ success: true, id }, 201);
  } catch {
    return json({ error: "Failed to submit RSVP" }, 500);
  }
}

export async function onRequestGet(ctx: { request: Request; env: Env }) {
  const url = new URL(ctx.request.url);
  if (url.searchParams.get("key") !== ctx.env.ADMIN_KEY) {
    return json({ error: "Unauthorized" }, 401);
  }

  try {
    const raw = await ctx.env.RSVP_KV.get("rsvp:index");
    const ids: string[] = raw ? JSON.parse(raw) : [];
    const rsvps: RSVPEntry[] = [];

    for (const id of ids) {
      const data = await ctx.env.RSVP_KV.get(`rsvp:${id}`);
      if (data) rsvps.push(JSON.parse(data));
    }

    return json({
      rsvps,
      stats: {
        total: rsvps.length,
        totalGuests: rsvps.reduce((s, r) => s + r.guests, 0),
        groomSide: rsvps.filter((r) => r.side === "groom").length,
        brideSide: rsvps.filter((r) => r.side === "bride").length,
        haldi: rsvps.filter((r) => r.events.includes("haldi")).length,
        mehndi: rsvps.filter((r) => r.events.includes("mehndi")).length,
        sangeet: rsvps.filter((r) => r.events.includes("sangeet")).length,
        wedding: rsvps.filter((r) => r.events.includes("wedding")).length,
      },
    });
  } catch {
    return json({ error: "Failed to fetch RSVPs" }, 500);
  }
}
