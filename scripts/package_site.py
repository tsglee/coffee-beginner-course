#!/usr/bin/env python3
"""Package a clean committed source snapshot, or verify its ZIP hashes.

Standard library only. Verification works from an extracted package without Git.
"""

import argparse
import datetime
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import stat
import subprocess
import sys
import zipfile


PREFIX = "encounter-coffee/"
MANIFEST = PREFIX + "RELEASE-MANIFEST.json"
REPOSITORY = "https://github.com/tsglee/coffee-beginner-course"
PUBLIC_URL = "https://tsglee.github.io/coffee-beginner-course/"


def git(root, *args):
    return subprocess.check_output(["git", "-C", str(root), *args])


def verify(archive_path):
    with zipfile.ZipFile(archive_path) as archive:
        names = archive.namelist()
        if len(names) != len(set(names)):
            raise ValueError("Duplicate ZIP entries")
        if archive.testzip() is not None:
            raise ValueError("ZIP CRC check failed")
        for name in names:
            parts = PurePosixPath(name).parts
            if not name.startswith(PREFIX) or ".." in parts or ".git" in parts:
                raise ValueError("Unexpected archive path: " + name)
            mode = archive.getinfo(name).external_attr >> 16
            if stat.S_ISLNK(mode):
                raise ValueError("Symlinks are not supported in this site package")
        manifest = json.loads(archive.read(MANIFEST))
        if manifest.get("format_version") != 1:
            raise ValueError("Unsupported manifest format")
        files = manifest["files"]
        expected = {PREFIX + name for name in files} | {MANIFEST}
        actual = {name for name in names if not name.endswith("/")}
        if actual != expected:
            raise ValueError("Archive entries do not match the manifest")
        for name, metadata in files.items():
            data = archive.read(PREFIX + name)
            if len(data) != metadata["bytes"] or hashlib.sha256(data).hexdigest() != metadata["sha256"]:
                raise ValueError("Content checksum mismatch: " + name)
        required = {
            "index.html", "shop.html", "product.html", "checkout.html",
            "admin-orders.html", "story.html", "about.html", ".nojekyll",
            "README.md", "AGENTS.md", "docs/AGENT-HANDOFF.md",
            "assets/catalog-data.js", "assets/store.js", "assets/i18n.js",
            "assets/en-dictionary.js", "scripts/package_site.py",
            "tests/store.test.cjs", "tests/i18n.test.cjs",
        }
        if not required.issubset(files):
            raise ValueError("Required website or handoff files are missing")
    return manifest


def package(root, output_dir, release_date):
    if git(root, "status", "--porcelain", "--untracked-files=normal").strip():
        raise ValueError("Commit or preserve working changes first. Packaging requires a clean Git checkout.")
    commit = git(root, "rev-parse", "HEAD").decode().strip()
    tree = git(root, "rev-parse", "HEAD^{tree}").decode().strip()
    branch = git(root, "rev-parse", "--abbrev-ref", "HEAD").decode().strip()
    source = io.BytesIO(git(root, "archive", "--format=zip", "HEAD"))
    files, contents = {}, {}
    with zipfile.ZipFile(source) as snapshot:
        for name in sorted(snapshot.namelist()):
            if name.endswith("/"):
                continue
            data = snapshot.read(name)
            contents[name] = data
            files[name] = {"bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()}
    manifest = {
        "format_version": 1,
        "name": "佛我咖啡 / Forward Coffee",
        "release_date": release_date.isoformat(),
        "repository_url": REPOSITORY,
        "public_url": PUBLIC_URL,
        "english_url": PUBLIC_URL + "?lang=en",
        "git": {"commit": commit, "tree": tree, "branch": branch, "snapshot": "git archive HEAD"},
        "included": "All tracked source files at this commit, plus this generated manifest",
        "not_included": ["Git history", "Browser localStorage", "Ignored/untracked files", "External original image PNGs", "Production backend"],
        "files": files,
    }
    output_dir.mkdir(parents=True, exist_ok=True)
    target = output_dir / f"encounter-coffee-{release_date.isoformat()}-{commit[:7]}.zip"
    timestamp = (release_date.year, release_date.month, release_date.day, 0, 0, 0)
    with zipfile.ZipFile(target, "x", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for name, data in [*contents.items(), ("RELEASE-MANIFEST.json", (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode())]:
            info = zipfile.ZipInfo(PREFIX + name, timestamp)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.create_system = 3
            info.external_attr = (stat.S_IFREG | 0o644) << 16
            archive.writestr(info, data, compresslevel=9)
        archive.comment = b"Forward Coffee committed source and agent handoff"
    verified = verify(target)
    digest = hashlib.sha256(target.read_bytes()).hexdigest()
    print(json.dumps({"zip": str(target.resolve()), "bytes": target.stat().st_size, "sha256": digest, "commit": commit, "source_files_verified": len(verified["files"])}, indent=2))
    return target


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--verify", type=Path, help="Verify an existing package; no Git checkout required")
    parser.add_argument("--output", type=Path, help="Destination directory (default: project/dist)")
    parser.add_argument("--release-date", type=datetime.date.fromisoformat, default=datetime.date.today(), help="ISO date used for the filename and deterministic ZIP timestamps")
    args = parser.parse_args()
    if args.verify:
        manifest = verify(args.verify)
        print(f"Verified {len(manifest['files'])} source files at commit {manifest['git']['commit']}")
        return
    if not 1980 <= args.release_date.year <= 2107:
        parser.error("ZIP release date must be between 1980 and 2107")
    root = Path(__file__).resolve().parent.parent
    package(root, args.output or root / "dist", args.release_date)


if __name__ == "__main__":
    try:
        main()
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError, zipfile.BadZipFile) as error:
        print("Package error: " + str(error), file=sys.stderr)
        sys.exit(1)
