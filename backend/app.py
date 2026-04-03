from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

_REPLACEMENTS = {
    "utilize": "use",
    "approximately": "about",
    "demonstrate": "show",
    "commence": "start",
    "terminate": "end",
    "sufficient": "enough",
    "numerous": "many",
    "individuals": "people",
    "therefore": "so",
    "however": "but",
    "in order to": "to",
    "facilitate": "help",
    "methodology": "method",
    "subsequent": "next",
    "prior to": "before",
    "due to": "because of",
    "with regard to": "about",
}


def _simple_simplify(text: str) -> str:
    t = " ".join((text or "").strip().split())
    lower = t.lower()
    for k, v in _REPLACEMENTS.items():
        lower = lower.replace(k, v)

    # Keep punctuation from the original roughly by re-splitting on sentence-ish boundaries.
    # This is intentionally lightweight and deterministic (mock).
    import re

    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", t) if s.strip()]
    if not sentences:
        return ""

    # Build a bullet-style simplified view (mirrors the demo’s “bullet clarity” vibe).
    bullets = []
    for s in sentences[:8]:
        s2 = s.strip()
        # Trim very long sentences.
        if len(s2) > 180:
            s2 = s2[:177].rstrip() + "…"
        bullets.append(f"- {s2}")

    simplified = "Simplified version:\n" + "\n".join(bullets)

    # Apply replacements last (case-insensitive-ish) by operating on lower-cased template,
    # but keep the bullet formatting.
    simplified_lower = simplified
    for k, v in _REPLACEMENTS.items():
        simplified_lower = re.sub(re.escape(k), v, simplified_lower, flags=re.IGNORECASE)

    return simplified_lower

@app.post("/simplify")
def simplify():
    payload = request.get_json(silent=True) or {}
    text = (payload.get("text") or "").strip()
    profile = payload.get("profile") or "Default"

    simplified = _simple_simplify(text)
    if not simplified:
        simplified = "No input text provided."

    return jsonify(
        {
            "simplifiedText": simplified,
            "originalScore": 78,
            "readingTime": "3 min",
            "difficulty": "High",
            "reduction": 45,
            "intensity": 42,
            "impactSummary": "Mock analysis: reduced sentence length and simplified terminology to lower cognitive load.",
            "keywords": ["neuroscience", "policy", "cognition", "terminology", "summary", "accessibility"],
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

