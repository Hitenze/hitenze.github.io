#!/usr/bin/env python3
"""Optional NumPy example for checking threaded BLAS allocation."""

from __future__ import annotations

import os
import time

import numpy as np


def main() -> None:
    size = 1_000
    rng = np.random.default_rng(2026)
    left = rng.standard_normal((size, size))
    right = rng.standard_normal((size, size))

    started = time.perf_counter()
    product = left @ right
    elapsed = time.perf_counter() - started

    print(f"Matrix size: {size} x {size}")
    print(f"SLURM_CPUS_PER_TASK: {os.environ.get('SLURM_CPUS_PER_TASK', 'not set')}")
    for name in ("OMP_NUM_THREADS", "OPENBLAS_NUM_THREADS", "MKL_NUM_THREADS"):
        print(f"{name}: {os.environ.get(name, 'not set')}")
    print(f"Checksum: {float(product[0, 0]):.8f}")
    print(f"Elapsed: {elapsed:.3f} s")


if __name__ == "__main__":
    main()
