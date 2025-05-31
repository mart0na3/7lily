
// /pages/api/analyze.js (Next.js API Route)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    username,
    facebook,
    instagram,
    tiktok,
    pinterest,
    snapchat,
    notes,
    screenshots
  } = req.body;

  const userInfo = `تحليل شخص بناءً على هذه المعلومات:\n
  - انستغرام: ${username}
  - فيسبوك: ${facebook}
  - تيك توك: ${tiktok}
  - سناب شات: ${snapchat}
  - بينترست: ${pinterest}
  - ملاحظات: ${notes}
  - سكرينشوتات: ${screenshots}`;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "أنت مساعد ذكي يقترح هدايا بناءً على المعلومات المتوفرة عن شخص."
          },
          {
            role: "user",
            content: `${userInfo}\n\nحلل شخصيته واهتماماته، وارجع لي التالي:\n- ستايله العام\n- الألوان اللي ممكن يحبها\n- أهم اهتماماته\n- ٥ اقتراحات هدايا مناسبة ليه`
          }
        ],
        temperature: 0.8
      })
    });

    const data = await completion.json();
    const message = data.choices?.[0]?.message?.content || "لم يتم التحليل بنجاح";

    const result = {
      style: message.match(/ستايله العام\:?(.*)/)?.[1]?.trim() || '',
      colors: message.match(/الألوان(?:.*?)\:?(.*)/)?.[1]?.trim() || '',
      interests: message.match(/اهتماماته(?:.*?)\:?(.*)/)?.[1]?.trim() || '',
      gifts: message.match(/(?:هدايا|اقتراحات)\:?[\n\-\•\*\s]*(.*)/is)?.[1]
        ?.split(/\n|\•|\*|\-/)
        ?.map(s => s.trim())
        ?.filter(Boolean)
        .slice(0, 5) || []
    };

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "فشل في الاتصال بـ OpenAI" });
  }
}
