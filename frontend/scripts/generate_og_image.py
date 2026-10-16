import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def draw_star(draw, cx, cy, r_outer, r_inner, fill):
    """Draw a 5-pointed star centered at (cx, cy)."""
    points = []
    angle_offset = -math.pi / 2
    for i in range(10):
        r = r_outer if i % 2 == 0 else r_inner
        angle = angle_offset + i * (math.pi / 5)
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        points.append((x, y))
    draw.polygon(points, fill=fill)

def draw_lock(draw, x, y, size, fill):
    """Draw a clean lock icon at (x, y)."""
    # Body
    bw, bh = int(size * 0.8), int(size * 0.65)
    bx = x + int(size * 0.1)
    by = y + int(size * 0.4)
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=2, fill=fill)
    # Shackle
    sw, sh = int(size * 0.5), int(size * 0.45)
    sx = x + int(size * 0.25)
    sy = y + 1
    draw.arc([sx, sy, sx + sw, sy + sh * 2], start=180, end=0, fill=fill, width=2)

def create_og_image(output_path="frontend/public/og-image.png"):
    W, H = 1200, 630
    
    # 1. Base dark background
    img = Image.new("RGBA", (W, H), (12, 14, 17, 255))
    
    # 2. Ambient orange glow on the right side behind the card
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    cx, cy = 920, 300
    max_r = 440
    for r in range(max_r, 0, -8):
        alpha = int(48 * math.pow(1 - (r / max_r), 1.9))
        glow_draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            fill=(251, 74, 10, alpha)
        )
    img = Image.alpha_composite(img, glow)
    
    # Subtle secondary ambient glow at top-left
    glow2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow2_draw = ImageDraw.Draw(glow2)
    cx2, cy2 = 140, 100
    for r in range(280, 0, -10):
        alpha = int(18 * math.pow(1 - (r / 280), 2))
        glow2_draw.ellipse(
            [cx2 - r, cy2 - r, cx2 + r, cy2 + r],
            fill=(255, 255, 255, alpha)
        )
    img = Image.alpha_composite(img, glow2)

    # 3. Fonts
    font_bold_path = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg_path = r"C:\Windows\Fonts\segoeui.ttf"
    font_mono_path = r"C:\Windows\Fonts\consola.ttf"
    
    font_h1 = ImageFont.truetype(font_bold_path, 58)
    font_sub = ImageFont.truetype(font_reg_path, 21)
    font_pill = ImageFont.truetype(font_bold_path, 15)
    font_brand_sub = ImageFont.truetype(font_reg_path, 19)
    font_card_title = ImageFont.truetype(font_bold_path, 21)
    font_card_sub = ImageFont.truetype(font_reg_path, 15)
    font_card_badge = ImageFont.truetype(font_bold_path, 13)
    font_footer = ImageFont.truetype(font_mono_path, 15)

    draw = ImageDraw.Draw(img)

    # 4. Brand Header (Left Column)
    logo_path = "frontend/public/logo-frevo-dark.png"
    if os.path.exists(logo_path):
        logo_im = Image.open(logo_path).convert("RGBA")
        bbox = logo_im.getbbox()
        if bbox:
            logo_im = logo_im.crop(bbox)
        target_h = 36
        target_w = int(logo_im.width * (target_h / logo_im.height))
        logo_resized = logo_im.resize((target_w, target_h), Image.Resampling.LANCZOS)
        img.paste(logo_resized, (72, 68), logo_resized)
        
        # Tagline next to logo
        draw.text((72 + target_w + 16, 75), "·   Where Freelancers Evolve", font=font_brand_sub, fill=(136, 144, 155, 255))

    # 5. Main Headline
    y1 = 175
    y2 = 252
    orange_color = (251, 74, 10, 255)
    white_color = (255, 255, 255, 255)

    # Line 1: "The right creative."
    x = 72
    draw.text((x, y1), "The ", font=font_h1, fill=white_color)
    x += draw.textlength("The ", font=font_h1)
    draw.text((x, y1), "right", font=font_h1, fill=orange_color)
    x += draw.textlength("right", font=font_h1)
    draw.text((x, y1), " creative.", font=font_h1, fill=white_color)

    # Line 2: "For the right project. ■"
    x = 72
    draw.text((x, y2), "For the ", font=font_h1, fill=white_color)
    x += draw.textlength("For the ", font=font_h1)
    draw.text((x, y2), "right", font=font_h1, fill=orange_color)
    x += draw.textlength("right", font=font_h1)
    draw.text((x, y2), " project.", font=font_h1, fill=white_color)
    x += draw.textlength(" project.", font=font_h1)
    
    # Signature square dot accent
    draw.rectangle([x + 10, y2 + 27, x + 31, y2 + 48], fill=orange_color)

    # 6. Value Proposition Subtitle
    y_sub = 346
    draw.text(
        (72, y_sub),
        "Curated creators & pods · Milestone escrow · 100% IP",
        font=font_sub,
        fill=(156, 163, 175, 255)
    )

    # 7. Category Pills
    pills = ["Branding & Design", "3D & Packaging", "Video & Motion", "Web & UI"]
    pill_x = 72
    pill_y = 416
    for text in pills:
        tw = int(draw.textlength(text, font=font_pill))
        pw = tw + 32
        ph = 42
        
        # Pill layer
        pill_layer = Image.new("RGBA", (pw, ph), (0, 0, 0, 0))
        p_draw = ImageDraw.Draw(pill_layer)
        p_draw.rounded_rectangle(
            [0, 0, pw - 1, ph - 1],
            radius=ph // 2,
            fill=(255, 255, 255, 16),
            outline=(255, 255, 255, 36),
            width=1
        )
        p_draw.text((16, 10), text, font=font_pill, fill=(232, 235, 240, 255))
        img.paste(pill_layer, (pill_x, pill_y), pill_layer)
        pill_x += pw + 12

    # 8. Bottom Tech / Trust Mark
    draw.text(
        (72, 546),
        "frevo-theta.vercel.app   ·   Creative Freelancer Marketplace",
        font=font_footer,
        fill=(105, 114, 126, 255)
    )

    # 9. Right Column: Floating Visual Showcase Card
    cw, ch = 444, 492
    card_x, card_y = 688, 69
    card_r = 22

    # Soft 3D blurred card shadow
    shadow_pad = 32
    shadow = Image.new("RGBA", (cw + shadow_pad * 2, ch + shadow_pad * 2), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle(
        [shadow_pad, shadow_pad + 10, shadow_pad + cw, shadow_pad + ch + 10],
        radius=card_r,
        fill=(0, 0, 0, 200)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    img.paste(shadow, (card_x - shadow_pad, card_y - shadow_pad), shadow)

    # Card Layer
    card = Image.new("RGBA", (cw, ch), (18, 20, 24, 255))
    
    # Work Image in top 70% of Card (height 340)
    work_h = 340
    work_path = "frontend/public/work/tvisva-014.jpg"
    if not os.path.exists(work_path):
        work_path = "frontend/public/work/white-wolf-049.jpg"

    if os.path.exists(work_path):
        work_im = Image.open(work_path).convert("RGBA")
        # Crop off top title bar from original presentation image
        if work_im.height > 600:
            work_im = work_im.crop((0, 240, work_im.width, work_im.height))
        scale = max(cw / work_im.width, work_h / work_im.height)
        new_w = int(work_im.width * scale)
        new_h = int(work_im.height * scale)
        work_im = work_im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        left = (new_w - cw) // 2
        top = (new_h - work_h) // 2
        work_cropped = work_im.crop((left, top, left + cw, top + work_h))
        card.paste(work_cropped, (0, 0))

        # Bottom scrim gradient on the photo
        scrim = Image.new("RGBA", (cw, 140), (0, 0, 0, 0))
        scrim_draw = ImageDraw.Draw(scrim)
        for i in range(140):
            a = int(255 * math.pow(i / 140.0, 1.4))
            scrim_draw.line([(0, i), (cw, i)], fill=(18, 20, 24, a))
        card.paste(scrim, (0, work_h - 140), scrim)

    # Overlay Badges on Card Image
    # 1. Verified Pod Badge (Top Left)
    v_badge = Image.new("RGBA", (148, 34), (0, 0, 0, 0))
    vb_draw = ImageDraw.Draw(v_badge)
    vb_draw.rounded_rectangle([0, 0, 147, 33], radius=17, fill=(12, 14, 18, 220), outline=(255, 255, 255, 45), width=1)
    vb_draw.ellipse([14, 12, 22, 20], fill=(34, 197, 94, 255)) # Green status dot
    vb_draw.text((28, 8), "VERIFIED POD", font=font_card_badge, fill=(240, 243, 246, 255))
    card.paste(v_badge, (18, 18), v_badge)

    # 2. Rating Badge (Top Right)
    r_badge = Image.new("RGBA", (144, 34), (0, 0, 0, 0))
    rb_draw = ImageDraw.Draw(r_badge)
    rb_draw.rounded_rectangle([0, 0, 143, 33], radius=17, fill=(12, 14, 18, 220), outline=(255, 255, 255, 45), width=1)
    # Draw vector star
    draw_star(rb_draw, cx=20, cy=16, r_outer=7, r_inner=3.2, fill=(251, 191, 36, 255))
    rb_draw.text((32, 8), "5.0 (48 reviews)", font=font_card_badge, fill=(255, 235, 180, 255))
    card.paste(r_badge, (cw - 144 - 18, 18), r_badge)

    # Card Bottom Info Area (y from 340 to 492)
    card_draw = ImageDraw.Draw(card)
    card_draw.text((24, 350), "Studio Veloire · Creative Pod", font=font_card_title, fill=white_color)
    card_draw.text((24, 384), "Brand Identity · Art Direction · Packaging", font=font_card_sub, fill=(156, 163, 175, 255))
    
    # Escrow Protected Pill at Bottom of Card
    escrow_w = 216
    escrow_h = 32
    e_badge = Image.new("RGBA", (escrow_w, escrow_h), (0, 0, 0, 0))
    eb_draw = ImageDraw.Draw(e_badge)
    eb_draw.rounded_rectangle([0, 0, escrow_w - 1, escrow_h - 1], radius=16, fill=(251, 74, 10, 28), outline=(251, 74, 10, 85), width=1)
    draw_lock(eb_draw, x=13, y=8, size=15, fill=(251, 110, 50, 255))
    eb_draw.text((32, 7), "Milestone Escrow Protected", font=font_card_badge, fill=(251, 120, 60, 255))
    card.paste(e_badge, (24, 424), e_badge)

    # Card Outline border (crisp glass border)
    c_outline = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    co_draw = ImageDraw.Draw(c_outline)
    co_draw.rounded_rectangle([0, 0, cw - 1, ch - 1], radius=card_r, outline=(255, 255, 255, 55), width=1)
    card = Image.alpha_composite(card, c_outline)

    # Card Corner Mask (to round all corners of the card)
    mask = Image.new("L", (cw, ch), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([0, 0, cw, ch], radius=card_r, fill=255)

    # Paste card using corner mask
    img.paste(card, (card_x, card_y), mask)

    # 10. Outer Frame Border (1px subtle border around entire banner)
    outer_border = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ob_draw = ImageDraw.Draw(outer_border)
    ob_draw.rectangle([0, 0, W - 1, H - 1], outline=(255, 255, 255, 22), width=1)
    img = Image.alpha_composite(img, outer_border)

    # 11. Save as high-quality optimized PNG
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG", optimize=True)
    print(f"Successfully generated OpenGraph image: {output_path} ({W}x{H})")

if __name__ == "__main__":
    create_og_image()
