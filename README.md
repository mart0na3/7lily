
# Gift Scanner AI 🎁🧠

موقع بسيط يحلل اهتمامات أي شخص بناءً على حساباته الاجتماعية أو وصفك له، ويقترح هدايا مناسبة!

## المجلدات:

- `/pages/api/analyze.js`: API بيبعت المعلومات لـ OpenAI وبيرجع اقتراحات.
- `app/`: هنا تحط الواجهة بتاعتك (React/Next.js)

## طريقة الاستخدام:

1. ارفع المشروع على [Vercel](https://vercel.com)
2. ضيف متغير بيئة جديد في Vercel:
   - `OPENAI_API_KEY` = مفتاحك من OpenAI
3. الموقع هيشتغل تلقائي!
