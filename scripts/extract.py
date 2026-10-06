#!/usr/bin/env python3
"""Reads the Workhero Unity ScriptableObjects and writes src/data/wiki.json plus the icons it names.

Usage: python3 scripts/extract.py [path-to-Workhero]   (default: ../Workhero)
"""
import json, re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UNITY = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else (ROOT.parent / "Workhero")
SO = UNITY / "Assets/ScriptableObjects/CareerIdle"
KIT = UNITY / "Assets/Art/UI/Kit/icons"

EFFECTS = {
    2: ("Auto LoC (flat)", "auto-loc-flat", "flat", "LoC/s", "Adds a fixed amount of automatic Lines of Code per second."),
    3: ("Auto LoC (percent)", "auto-loc-percent", "percent", "%", "Multiplies automatic LoC production."),
    4: ("Users per LoC", "users-per-loc", "percent", "%", "Each line of code attracts more Users."),
    5: ("Revenue per User", "revenue-per-user", "percent", "%", "Each User pays more Cash."),
    6: ("User Growth", "user-growth", "percent", "%", "Users approach their ceiling faster."),
    7: ("Bandwidth", "bandwidth", "percent", "%", "Raises the User ceiling set by the Server tier."),
    8: ("Stress Resistance", "stress-resistance", "percent", "%", "Work longer before Burnout."),
    9: ("Recovery Speed", "recovery-speed", "percent", "%", "Burnout recovery drains faster."),
}
FAMILIES = {0: "Product", 1: "Reach", 2: "Audience"}


def scalar(v):
    v = v.strip()
    if v == "":
        return ""
    try:
        f = float(v)
        return int(f) if f == int(f) and "e" not in v.lower() and "." not in v else f
    except ValueError:
        return v


def parse_list(text, key):
    """Parses `key:` followed by `- _id:` blocks into a list of flat dicts."""
    m = re.search(r"^  " + key + r":\n(.*?)(?=^  _\w+:|\Z)", text, re.S | re.M)
    if not m:
        return []
    out = []
    for block in re.split(r"^  - ", m.group(1), flags=re.M)[1:]:
        d = {}
        for line in block.splitlines():
            mm = re.match(r"\s*(_\w+): ?(.*)", line)
            if mm:
                d[mm.group(1)[1:]] = scalar(mm.group(2))
        out.append(d)
    return out


def field(text, name):
    m = re.search(r"^  _" + name + r": ?(.*)$", text, re.M)
    return scalar(m.group(1)) if m else None


def guid_of(path):
    return re.search(r"guid: (\w+)", Path(str(path) + ".meta").read_text()).group(1)


icons_used = set()
def icon(name):
    f = KIT / f"icon-{name}.png"
    if f.exists():
        icons_used.add(f.name)
        return f"/icons/{f.name}"
    return None


by_guid = {guid_of(p): p for p in SO.glob("*Workplace.asset")}
registry = (SO / "WorkplaceRegistry.asset").read_text()
order = [g for g in re.findall(r"guid: (\w+), type: 2", registry)]

ladder_text = (SO / "SharedServerLadder.asset").read_text()
tiers = []
for i, t in enumerate(parse_list(ladder_text, "_tiers")):
    tiers.append({
        "id": t["id"], "name": t["displayName"], "capacity": t["capacity"], "bandwidth": t["bandwidth"],
        "userGrowthPerSecond": t["userGrowthPerSecond"], "price": t["price"], "tier": i + 1,
        "icon": icon("server-" + t["id"]),
    })

workplaces = []
for g in order:
    wp_path = by_guid[g]
    t = wp_path.read_text()
    wid = field(t, "workplaceId")
    cat_guid = re.search(r"_itemCatalog: \{fileID: \d+, guid: (\w+)", t).group(1)
    cat_path = next(p for p in SO.glob("*ItemCatalog.asset") if guid_of(p) == cat_guid)
    items = []
    for it in parse_list(cat_path.read_text(), "_items"):
        name, eicon, kind, unit, _ = EFFECTS[it["effectType"]]
        items.append({
            "id": it["id"], "name": it["displayName"], "description": it["description"],
            "family": FAMILIES.get(it["family"], str(it["family"])),
            "effect": name, "effectIcon": icon("effect-" + eicon), "kind": kind, "unit": unit,
            "magnitudePerLevel": it["magnitudePerLevel"], "maxLevel": it["maxLevel"],
            "baseCost": it["baseCost"], "costGrowth": it["costGrowth"],
            "unlockAtTotalLevels": it["unlockAtTotalLevels"],
        })
    milestones = [{
        "id": m["id"], "title": m["title"], "description": m["description"],
        "requiredCash": m["requiredCash"], "fameReward": m["fameReward"],
        "ecashReward": m.get("ecashReward", 0), "unlocksWorkplace": m.get("unlockedWorkplaceId") or None,
    } for m in parse_list(t, "_milestones")]
    workplaces.append({
        "id": wid, "name": field(t, "displayName"), "order": len(workplaces) + 1,
        "icon": icon("workplace-" + wid), "image": f"/workplaces/{wid}.png",
        "fameToUnlockNext": field(t, "fameToUnlockNextWorkplace"),
        "baseAutoLocPerSecond": field(t, "baseAutoLocPerSecond"), "usersPerLoc": field(t, "usersPerLoc"),
        "revenuePerUser": field(t, "revenuePerUser"), "stressPerSecond": field(t, "stressPerSecond"),
        "items": items, "milestones": milestones,
    })

shop_src = (UNITY / "Assets/Scripts/Gameplay/CareerIdle/CareerIdleShop.cs").read_text()
cost = int(re.search(r"ConsumableCost = (\d+)L", shop_src).group(1))
shop = []
for m in re.finditer(r'CareerIdleShopConsumable\.\w+,\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"', shop_src):
    shop.append({"name": m.group(1).title(), "description": m.group(2), "badge": m.group(3),
                 "costEcash": cost, "durationSeconds": 60})
shop_icons = {"Kopi": "coffee", "Bonus Sprint": "cash-banknote-green", "Overclock": "code-monitor"}
for s in shop:
    s["icon"] = icon(shop_icons[s["name"]])

ev = (SO / "SecondaryEventsConfig.asset").read_text()
events = {k: field(ev, k) for k in (
    "catMinimumIntervalSeconds", "catMaximumIntervalSeconds", "catVisibleSeconds", "catEarningsSeconds",
    "catMinimumCash", "packageIntervalMinutes", "packageECash", "packageECashChance",
    "packageEarningsSeconds", "packageMinimumCash")}

effects = [{"name": n, "icon": icon("effect-" + i), "kind": k, "unit": u, "description": d}
           for n, i, k, u, d in EFFECTS.values()]
extra = {"cash": icon("cash-banknote-green"), "ecash": icon("ecash-credit-card-blue"),
         "fame": icon("fame-star"), "users": icon("users"), "code": icon("code"), "stress": icon("stress-brain")}

(ROOT / "src/data").mkdir(parents=True, exist_ok=True)
(ROOT / "src/data/wiki.json").write_text(json.dumps(
    {"workplaces": workplaces, "serverTiers": tiers, "shop": shop, "events": events, "effects": effects, "icons": extra}, indent=1))
(ROOT / "public/icons").mkdir(parents=True, exist_ok=True)
for n in icons_used:
    shutil.copy(KIT / n, ROOT / "public/icons" / n)
print(f"{len(workplaces)} workplaces, {sum(len(w['items']) for w in workplaces)} items, "
      f"{sum(len(w['milestones']) for w in workplaces)} milestones, {len(tiers)} tiers, {len(shop)} shop, {len(icons_used)} icons")
