import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(30),
  email: z.union([z.string().trim().email().max(120), z.literal("")]).optional(),
  company: z.string().trim().max(160).optional(),
  message: z.string().trim().max(1500).optional(),
  product: z.string().trim().max(200).optional(),
  consent: z.literal("yes"),
  website: z.string().max(0).optional(),
});

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || "local";
  const now = Date.now();
  const rate = attempts.get(key);
  if (rate && rate.resetAt > now && rate.count >= 5) return NextResponse.json({ ok: false, error: "Слишком много запросов" }, { status: 429 });
  attempts.set(key, rate && rate.resetAt > now ? { ...rate, count: rate.count + 1 } : { count: 1, resetAt: now + 10 * 60_000 });

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Проверьте поля формы" }, { status: 400 });

  // Static-stage mock: no personal data is logged. A database + messenger fallback is connected with MySklad.
  return NextResponse.json({ ok: true, requestId: crypto.randomUUID() }, { status: 202 });
}
