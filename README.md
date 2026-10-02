# Metaphors Mein Fasa Hua — आपकी कविताओं की वेबसाइट

## 1-2. GitHub पर डालना
github.com पर free account बनाएँ → **New repository** → नाम `poetry` (या `username.github.io`), **Public** चुनें → **Add file → Upload files** → इस folder की **सारी files और folders** (index.html, css, js, data, images…) drag करें → **Commit changes**।

## 7. वेबसाइट चालू करना
Repository में **Settings → Pages → Deploy from a branch → main / (root) → Save**। 1-2 मिनट में link ऊपर दिख जाएगा।

## 3. नई कविता जोड़ना
GitHub में `data/poems.json` खोलें → ✏️ (edit) दबाएँ → किसी `{ ... }` ब्लॉक को copy करके नया बनाएँ (ब्लॉकों के बीच `,` रखें) → **Commit**। साइट अपने-आप बदल जाएगी।
- `content`: हर लाइन अलग; खाली `""` = नया छंद।
- `date` भविष्य की हो तो कविता उसी दिन अपने-आप दिखेगी (schedule)। `"draft": true` = छिपी रहेगी।
- `"featured": true` = होमपेज पर "आज की कविता" (सिर्फ़ एक पर)।
- कई तस्वीरें: `"images": ["images/poems/a.jpg","images/poems/b.jpg"]`।
- विचार: `data/thoughts.json` में इसी तरह।

## 4. तस्वीरें जोड़ना
फ़ोटो `images/` में upload करें (बड़ी फ़ोटो को पहले छोटा/compress कर लें, ~200 KB बेहतर) → `data/photos.json` में एक लाइन जोड़ें। `category` इनमें से एक: फूल, प्रकृति, बारिश, आसमान, पेड़, रास्ते, पुराने स्थान, रात, छोटे-छोटे पल।

## 5-6. नाम और social links
`js/main.js` की शुरुआत में `SITE` बदलें (name, instagram, youtube, linkedin)। "मैं कौन हूँ?" का text `about.html` में सीधे बदलें।

## 8. अपना domain (बाद में)
Domain ख़रीदें → Settings → Pages → **Custom domain** में डालें → domain कंपनी में GitHub के बताए DNS records जोड़ें।

> अपने computer पर सीधे `index.html` खोलने पर कविताएँ नहीं दिखेंगी (browser JSON रोकता है)। GitHub Pages पर सब ठीक चलेगा।
