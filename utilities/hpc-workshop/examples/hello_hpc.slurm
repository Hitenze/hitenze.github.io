#!/bin/bash
#SBATCH --job-name=hello_hpc
#SBATCH --output=hello_hpc_%j.out
#SBATCH --error=hello_hpc_%j.err
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G
#SBATCH --time=00:05:00

set -euo pipefail

# Add account, partition, and a Python module only when your site requires them.
cd "${SLURM_SUBMIT_DIR:-$PWD}"
python3 -u hello_hpc.py
