"""Cut the three product stages out of the supplied collage (white background -> transparent WebP).
Run: python3 scripts/cutout-stages.py <collage.png>
"""
import sys, numpy as np, cv2
from PIL import Image
from scipy import ndimage as ndi

src = sys.argv[1]
OUT = 'public/assets/stages'
BOXES = {
    'whole': (585, 105, 1045, 312),
    'split': (45, 412, 435, 640),
    'seeds': (618, 562, 790, 652),
}
img = np.array(Image.open(src).convert('RGB'))

def cutout(box, name, scale=1.0):
    x0, y0, x1, y1 = box
    c = img[y0:y1, x0:x1].copy()
    hsv = cv2.cvtColor(c, cv2.COLOR_RGB2HSV).astype(np.float32)
    sat = hsv[..., 1] / 255.0
    mn = c.min(axis=2)
    bg = (mn > 168) & (sat < 0.11)
    lab, n = ndi.label(bg)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bgmask = np.isin(lab, list(border))
    fg = ~bgmask
    fg = ndi.binary_opening(fg, iterations=1)
    lab2, n2 = ndi.label(fg)
    if n2:
        sizes = ndi.sum(fg, lab2, range(1, n2 + 1))
        keep = [i + 1 for i, s in enumerate(sizes) if s > 0.02 * fg.sum()]
        fg = np.isin(lab2, keep)
    fg = ndi.binary_fill_holes(fg)
    a = ndi.gaussian_filter(fg.astype(np.float32), 0.9)
    a = np.clip((a - 0.35) / 0.5, 0, 1)
    ys, xs = np.where(a > 0.05)
    pad = 6
    y0c, y1c, x0c, x1c = max(ys.min() - pad, 0), min(ys.max() + pad, a.shape[0]), max(xs.min() - pad, 0), min(xs.max() + pad, a.shape[1])
    rgba = np.dstack([c, (a * 255).astype(np.uint8)])[y0c:y1c, x0c:x1c]
    im = Image.fromarray(rgba, 'RGBA')
    if scale != 1.0:
        im = im.resize((int(im.width * scale), int(im.height * scale)), Image.LANCZOS)
    im.save(f'{OUT}/{name}.webp', quality=90, method=6)
    print(name, im.size)
    return im

cutout(BOXES['whole'], 'whole', 1.5)
cutout(BOXES['split'], 'split', 1.5)

# seeds: three loose seeds -> separate small cutouts
x0, y0, x1, y1 = BOXES['seeds']
c = img[y0:y1, x0:x1]
hsv = cv2.cvtColor(c, cv2.COLOR_RGB2HSV).astype(np.float32)
bg = (c.min(axis=2) > 168) & (hsv[..., 1] / 255.0 < 0.11)
fg = ndi.binary_opening(~bg, iterations=1)
lab, n = ndi.label(fg)
objs = ndi.find_objects(lab)
sizes = ndi.sum(fg, lab, range(1, n + 1))
seeds = sorted([(sizes[i], objs[i], i + 1) for i in range(n) if sizes[i] > 300], key=lambda t: t[1][1].start)
print('seed blobs', [(int(s), ) for s, _, _ in seeds])
for k, (s, sl, idx) in enumerate(seeds[:3], 1):
    m = ndi.binary_fill_holes(lab == idx)
    a = np.clip((ndi.gaussian_filter(m.astype(np.float32), 0.8) - 0.35) / 0.5, 0, 1)
    pad = 4
    ys, xs = sl
    Y0, Y1, X0, X1 = max(ys.start - pad, 0), min(ys.stop + pad, c.shape[0]), max(xs.start - pad, 0), min(xs.stop + pad, c.shape[1])
    rgba = np.dstack([c, (a * 255).astype(np.uint8)])[Y0:Y1, X0:X1]
    im = Image.fromarray(rgba, 'RGBA'); im = im.resize((int(im.width * 2), int(im.height * 2)), Image.LANCZOS)
    im.save(f'{OUT}/seed-{k}.webp', quality=92, method=6); print(f'seed-{k}', im.size)
