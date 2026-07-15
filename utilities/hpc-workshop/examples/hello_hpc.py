#!/usr/bin/env python3
"""Small dependency-free program for a first Slurm job."""

from __future__ import annotations

import os
import platform
import socket


def slurm_value(name: str) -> str:
    """Return a Slurm value, or a useful label outside an allocation."""
    return os.environ.get(name, "not set")


def main() -> None:
    work_items = 250_000
    checksum = sum((index * index) % 97 for index in range(work_items))

    print("=== HPC environment ===")
    print(f"Hostname: {socket.gethostname()}")
    print(f"Python: {platform.python_version()}")
    print(f"Slurm job ID: {slurm_value('SLURM_JOB_ID')}")
    print(f"Slurm node list: {slurm_value('SLURM_JOB_NODELIST')}")
    print(f"CPU slots for task: {slurm_value('SLURM_CPUS_PER_TASK')}")
    print(f"Deterministic checksum ({work_items:,} items): {checksum}")


if __name__ == "__main__":
    main()
