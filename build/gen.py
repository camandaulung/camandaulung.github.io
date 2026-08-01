# -*- coding: utf-8 -*-
"""Build D:/HN/index.html tu template + SVG charts sinh bang script.

Chay theo cook flow cua puffer-theme:
  Step 5 · check_html_balanced
  Step 6 · inject_sidebar_toc (mandatory)
  Step 7 · strip_branding (skip: cook from scratch, khong co source cu)
"""
import sys, io, re
from pathlib import Path

BASE = Path(r"D:\HN")
BUILD = BASE / "build"
# AppData\Roaming\Claude bi ao hoa (packaged app) -> dung path thuc trong LocalCache
SKILL = Path(r"C:\Users\DESKTOP-036950U\AppData\Local\Packages\Claude_pzs8sxrjxfjjc"
             r"\LocalCache\Roaming\Claude\local-agent-mode-sessions"
             r"\skills-plugin\99e9ff3d-1615-42c0-8cde-c74761e5b466"
             r"\be371e57-80b0-496b-b203-72d670a4a2e1\skills\puffer-theme")
sys.path.insert(0, str(SKILL / "scripts"))

# ── Gantt spec ────────────────────────────────────────────────────
T0, T1 = 7.0, 22.0          # khung gio hien thi
X0, X1 = 78, 1122           # vung ve
W = X1 - X0
PPH = W / (T1 - T0)         # px moi gio

CAT = {
    "sight": "var(--accent)",
    "food":  "var(--orange)",
    "move":  "var(--blue)",
    "rest":  "var(--muted)",
    "shop":  "var(--purple)",
    "fly":   "var(--red)",
}

CN = [
    (8.50,  9.25, "Ăn sáng",            "food"),
    (9.25,  9.75, "Bích hoạ",           "sight"),
    (9.75,  9.90, "",                   "move"),
    (9.90, 11.60, "Hoàng thành",        "sight"),
    (11.60,12.00, "",                   "move"),
    (12.00,13.25, "Chả cá",             "food"),
    (13.25,15.50, "Nghỉ trưa",          "rest"),
    (15.75,16.75, "Cà phê hồ",          "food"),
    (16.75,17.75, "Ngọc Sơn",           "sight"),
    (17.75,18.75, "Bia hơi",            "food"),
    (18.75,19.00, "",                   "move"),
    (19.00,21.50, "Tour đêm Văn Miếu",  "sight"),
]

T2D = [
    (8.75,  9.42, "Ăn sáng",     "food"),
    (9.42,  9.75, "",            "move"),
    (9.75, 11.25, "Hoả Lò",      "sight"),
    (11.25,11.50, "",            "move"),
    (11.50,12.75, "Bún chả",     "food"),
    (13.00,14.33, "Mua quà",     "shop"),
    (14.33,15.00, "Về nhà",      "rest"),
    (15.00,16.00, "Ra sân bay",  "move"),
    (16.00,18.50, "Nội Bài",     "fly"),
]

ROWS = [("CN 02/08", 84, CN), ("T2 03/08", 156, T2D)]
ROW_H = 46
TOP, BOT = 66, 214


def x(t):
    return X0 + (t - T0) * PPH


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def gantt():
    p = ['<svg class="gantt" viewBox="0 0 1200 244" role="img" '
         'aria-label="Bản đồ thời gian hai ngày">']

    # gridlines + nhan gio
    h = int(T0)
    while h <= int(T1):
        gx = round(x(h), 1)
        p.append(f'<line class="g-grid" x1="{gx}" y1="{TOP}" x2="{gx}" y2="{BOT}" '
                 f'opacity="{0.9 if h % 2 == 0 else 0.4}"/>')
        if h % 1 == 0:
            p.append(f'<text class="g-axis t-mid" x="{gx}" y="{TOP - 10}">{h:02d}</text>')
        h += 1

    for name, y, blocks in ROWS:
        p.append(f'<text class="g-day t-start" x="0" y="{y + ROW_H / 2 + 4:.0f}">{esc(name)}</text>')
        p.append(f'<line class="g-base" x1="{X0}" y1="{y + ROW_H}" x2="{X1}" y2="{y + ROW_H}"/>')
        for a, b, label, cat in blocks:
            xa, xb = x(a), x(b)
            w = xb - xa
            col = CAT[cat]
            p.append(f'<rect x="{xa:.1f}" y="{y}" width="{w:.1f}" height="{ROW_H}" rx="5" '
                     f'fill="{col}" fill-opacity="0.20" stroke="{col}" stroke-width="1.2"/>')
            if label and w >= 62:
                p.append(f'<text class="g-lbl t-mid" x="{xa + w / 2:.1f}" y="{y + ROW_H / 2 + 4:.0f}" '
                         f'fill="{col}">{esc(label)}</text>')

    # moc cung: cat canh 18:30
    fx = round(x(18.5), 1)
    p.append(f'<line x1="{fx}" y1="{TOP}" x2="{fx}" y2="{BOT + 12}" stroke="var(--red)" '
             f'stroke-width="1.5" stroke-dasharray="4 3"/>')
    p.append(f'<text class="g-axis t-end" x="{fx - 6}" y="{BOT + 24}" fill="var(--red)">'
             f'18:30 cất cánh</text>')
    p.append('</svg>')
    return "\n".join(p)


# ── Bang khoang cach ──────────────────────────────────────────────
PLACES = [
    ("Chả cá Thăng Long",      200,  "walk"),
    ("Chợ Hàng Da",            250,  "walk"),
    ("Bích hoạ Phùng Hưng",    300,  "walk"),
    ("Phở Bát Đàn",            400,  "walk"),
    ("Bún chả Đắc Kim",        400,  "walk"),
    ("Bún chả Hàng Quạt",      550,  "walk"),
    ("Nhà thờ Lớn",            700,  "walk"),
    ("Hoả Lò",                 700,  "walk"),
    ("Hồ Gươm",                800,  "walk"),
    ("Tạ Hiện",                900,  "walk"),
    ("Hàng Đường (ô mai)",     900,  "walk"),
    ("Bảo tàng Mỹ thuật",     1500,  "ride"),
    ("Hàng Than (bánh cốm)",  1700,  "ride"),
    ("Hoàng thành",           1800,  "ride"),
    ("Văn Miếu",              1900,  "ride"),
]
SCALE = 2000.0


def bars():
    out = ['<div class="bars">']
    for name, m, kind in PLACES:
        col = "var(--accent)" if kind == "walk" else "var(--blue)"
        pct = min(100.0, m / SCALE * 100.0)
        val = f"{m} m" if m < 1000 else f"{m/1000:.1f} km".replace(".", ",")
        out.append(
            '<div class="bar-row">'
            f'<div class="bar-label">{esc(name)}</div>'
            f'<div class="bar-track"><div class="bar-fill" style="width:{pct:.1f}%;background:{col}"></div></div>'
            f'<div class="bar-val">{val}</div>'
            '</div>'
        )
    out.append('</div>')
    out.append('<div class="legend" style="margin-top:12px">'
               '<i class="lg-sight">Đi bộ (≤ 1 km)</i>'
               '<i class="lg-move">Gọi xe (&gt; 1 km)</i>'
               '</div>')
    return "\n".join(out)


# ── Build ─────────────────────────────────────────────────────────
def main():
    html = (BUILD / "template.html").read_text(encoding="utf-8")
    assert "<!--GANTT-->" in html and "<!--BARS-->" in html, "thieu placeholder"
    html = html.replace("<!--GANTT-->", gantt()).replace("<!--BARS-->", bars())

    # Step 5 · balance check
    # SKILL.md ghi ten check_html_balanced nhung API that trong _html_utils la validate_balanced
    from _html_utils import validate_balanced
    ok, errors = validate_balanced(html)
    if not ok:
        raise RuntimeError(f"HTML unbalanced: {errors}")
    print("step5 balance: OK")

    # Step 6 · sidebar TOC (mandatory)
    from sidebar_toc import inject_sidebar_toc
    html, info = inject_sidebar_toc(html, threshold=8)
    print("step6 sidebar:", info.get("items_count"), "items, enabled =", info.get("sidebar_enabled"))

    ok, errors = validate_balanced(html)
    if not ok:
        raise RuntimeError(f"HTML unbalanced sau sidebar: {errors}")

    # Step 7 · branding strip (cook from scratch -> chi scan)
    from branding_strip import find_branding_leaks
    leaks = find_branding_leaks(html, blocklist=[])
    print("step7 branding leaks:", leaks or "none")

    out = BASE / "index.html"
    out.write_text(html, encoding="utf-8")
    print("wrote", out, len(html), "bytes")

    # Ban artifact: bo <!DOCTYPE>/<html>/<head>/<body> (host tu wrap),
    # giu nguyen <style> + noi dung body + <script>.
    style = re.search(r"<style>.*?</style>", html, re.S).group(0)
    m = re.search(r"<body([^>]*)>(.*)</body>", html, re.S)
    body_attrs, body = m.group(1), m.group(2)
    # Host tu tao <body> nen class do pipeline inject bi mat -> set lai bang JS,
    # dat truoc theme script de sidebar CSS kip an vao.
    cls = re.search(r'class="([^"]*)"', body_attrs)
    boot = ""
    if cls:
        names = ", ".join("'%s'" % c for c in cls.group(1).split())
        boot = "<script>document.body.classList.add(%s);</script>\n" % names
    art = style + "\n" + boot + body.strip() + "\n"
    ok, errors = validate_balanced(art)
    if not ok:
        raise RuntimeError(f"artifact unbalanced: {errors}")
    art_out = BUILD / "artifact.html"
    art_out.write_text(art, encoding="utf-8")
    print("wrote", art_out, len(art), "bytes")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
