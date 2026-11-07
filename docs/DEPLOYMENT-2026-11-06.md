# 2026-11-06 Warm Workshop release

User authorized local Git update and public GitHub push of the confirmed prototype. Public root becomes the full Chinese 好好手沖 course; beans.html becomes the current3–5coffee catalog. English navigation removed. Legacy course/shop/product URLs lead to the new entries, while historical admin/store runtime and storage stay compatible. OfficialLogo matches the original bytes.

Before release main:9a0e571c38e9bd06cae06f90f4e9f20e0c2af624. Rollback by reverting this release commit through normal Git history; do not force-push.

Runtime is static;build.py and catalog.py are developer tools. No credentials,AI/API runtime,raw supplier sheet,unused packaging image or English prototype pages added. Activephoto/font hashes:WARM-WORKSHOP-ASSETS.json. All product photographs are labeled references, not this Ruru batch.

Release continued on 2026-11-07 with the user’s requested real photography expansion. All ten homepage sections and five curriculum stages have relevant real photographs, with stock/reference labeling. See COURSE-PHOTOGRAPHY-2026-11-07.md.

Local validation passed: build.py,check.py,3/4/5catalog variants including invalid-input rejection,scripts/check_site.py,all5Node suites(31 assertions),git diff --check. Browser checks at390,768,1440px verified image loading,overflow,menu/Escape,parameters,FAQ keyboard and LINE destinations. Public Pages is to be checked against the pushed commit through its build API and live browser after normal main push.
