/* ========================================
   GP Explorer — Interactive Visualizations
   ======================================== */

// ── i18n System ──
const i18n = {
  _lang: 'en',
  zh: {
    'skip-link': '跳转到内容',
    'hero-eyebrow': '交互式教学',
    'hero-title': '理解 Gaussian Process<br>从先验到后验',
    'hero-sub': '从高斯过程的核心直觉出发，逐步理解 MCMC 如何采样后验分布，以及 HMC 如何利用物理动力学加速探索。每一步都有可视化演示。',
    'tab-gp': '高斯过程 (GP)',
    'gp-title': '什么是高斯过程？',
    'gp-intro': '高斯过程是函数空间上的概率分布。给定任意有限个输入点 \\(x_1, \\ldots, x_n\\)，对应的函数值 \\(f(x_1), \\ldots, f(x_n)\\) 服从一个多元正态分布：',
    'gp-kernel-explain': '其中 \\(m(\\mathbf{x})\\) 为均值函数，\\(k(\\mathbf{x}, \\mathbf{x}\')\\) 为核函数（协方差函数）。核函数编码了我们对函数平滑性、周期性等先验信念。',
    'gp-kernel-family': '核函数家族',
    'kernel-rbf-desc': '无限可微，产生极其平滑的函数样本',
    'kernel-matern-desc': '一阶可微，更适合金融数据等不要求无限光滑的场景',
    'kernel-periodic-desc': '捕捉周期性结构，可在本页手动调节周期 \\(p\\)',
    'gp-prior-to-posterior': '先验到后验',
    'gp-posterior-intro': '观察到数据 \\(\\mathcal{D} = \\{(\\mathbf{X}, \\mathbf{y})\\}\\) 后，GP 后验预测为：',
    'gp-posterior-explain': '这个更新过程就是贝叶斯推断的精髓：先验 + 数据 → 后验。右侧的可视化展示了 GP 先验样本和加入观测点后的后验更新。',
    'gp-callout-title': '计算瓶颈',
    'gp-callout-body': '：矩阵求逆 \\([\\mathbf{K}_{ff} + \\sigma_n^2 \\mathbf{I}]^{-1}\\) 的复杂度为 \\(\\mathcal{O}(n^3)\\)，这是 GP 面对大数据集时的核心挑战。',
    'ctrl-kernel': '核函数',
    'ctrl-lengthscale': '长度尺度',
    'ctrl-period': '周期',
    'btn-resample': '重新采样',
    'btn-show-posterior': '显示后验',
    'btn-show-prior': '显示先验',
    'btn-clear-obs': '清除观测点',
    'gp-viz-caption': '点击画布添加观测点，切换「显示后验」查看 GP 如何更新预测',
    'mcmc-title': 'MCMC：从后验分布中采样',
    'mcmc-intro': '当 GP 的超参数后验无法解析求解时，我们先做正参数变换，令 \\(z=(\\log \\ell, \\log \\sigma_f)\\)，再在 \\(z\\)-空间上使用 MCMC 采样；这等价于在原始正参数上使用对数正态先验。',
    'mcmc-mh-title': 'Metropolis-Hastings 算法',
    'mcmc-step1-title': '提议',
    'mcmc-step1-body': '：从当前状态 \\(z_t\\)，按提议分布 \\(q(z\' | z_t)\\) 生成候选 \\(z\'\\)',
    'mcmc-step2-title': '计算接受率',
    'mcmc-step2-body': '：',
    'mcmc-step3-title': '接受/拒绝',
    'mcmc-step3-body': '：以概率 \\(\\alpha\\) 接受 \\(z\'\\)，否则保持 \\(z_t\\)',
    'mcmc-curse-title': '关键问题：随机游走的诅咒',
    'mcmc-curse-intro': '标准 MCMC（Random Walk MH）在高维空间中效率极低。步长必须与 \\(d^{-1/2}\\) 成比例缩小以维持合理的接受率（最优约 23.4%），导致：',
    'mcmc-curse-li1': '混合时间随维度 \\(d\\) 以 \\(\\mathcal{O}(d^2)\\) 增长',
    'mcmc-curse-li2': '链在目标分布的局部区域「随机游走」，难以快速遍历整个分布',
    'mcmc-curse-li3': '自相关性高，有效样本量（ESS）低',
    'mcmc-diag-title': '收敛诊断',
    'mcmc-metric-rhat': '多链收敛指标',
    'mcmc-metric-ess-val': '&gt; 100/链',
    'mcmc-metric-ess': '有效样本量',
    'mcmc-metric-accept-label': '接受率',
    'mcmc-metric-accept': 'MH 最优接受率',
    'mcmc-callout-title': '为什么需要 HMC？',
    'mcmc-callout-body': ' 在 GP 超参数推断中，参数空间通常是数十到数百维。MCMC 的 \\(\\mathcal{O}(d^2)\\) 混合时间使其效率极低——这正是 HMC 要解决的问题。',
    'ctrl-step-size': '步长',
    'ctrl-num-samples': '采样数',
    'btn-run-mcmc': '运行 MCMC',
    'viz-label-hyperparam': '超参数空间 (ℓ, σ<sub>f</sub>)',
    'viz-label-gp-live': '当前超参数对应的 GP 后验',
    'mcmc-viz-caption': '在 GP 超参数后验上运行 MH 采样——实际采样在 \\(z=(\\log \\ell, \\log \\sigma_f)\\) 空间完成，上图仅把样本映射回 \\((\\ell, \\sigma_f)\\) 坐标显示',
    'mcmc-no-data': '点击下方 GP 后验画布添加观测点，或在「高斯过程」Tab 中添加，然后运行采样。',
    'hmc-title': 'HMC：物理直觉驱动的高效采样',
    'hmc-intro': 'Hamiltonian Monte Carlo (HMC) 借用经典力学的哈密顿动力学，把 MCMC 采样变成一个物理系统的模拟。本演示在 \\(z=(\\log \\ell, \\log \\sigma_f)\\) 空间中运行 HMC。核心思想：',
    'hmc-analogy-title': '冰球类比',
    'hmc-analogy-body': '：想象在一个地形上滑动冰球——地形的高度对应负对数后验密度 \\(-\\log p(z|\\mathcal{D})\\)。冰球的动量帮助它爬坡越谷，高效地探索整个地形。',
    'hmc-hamilton-title': '哈密顿方程',
    'hmc-hamilton-intro': '引入辅助动量变量 \\(\\mathbf{p}\\)，定义哈密顿量：',
    'hmc-hamilton-evolve': '系统按哈密顿方程演化：',
    'hmc-leapfrog-title': 'Leapfrog 积分器',
    'hmc-step1-title': '半步动量更新',
    'hmc-step1-body': '：\\(\\mathbf{p}_{t+\\epsilon/2} = \\mathbf{p}_t - \\frac{\\epsilon}{2}\\nabla U(z_t)\\)',
    'hmc-step2-title': '全步位置更新',
    'hmc-step2-body': '：\\(z_{t+\\epsilon} = z_t + \\epsilon\\, \\mathbf{M}^{-1}\\mathbf{p}_{t+\\epsilon/2}\\)',
    'hmc-step3-title': '半步动量更新',
    'hmc-step3-body': '：\\(\\mathbf{p}_{t+\\epsilon} = \\mathbf{p}_{t+\\epsilon/2} - \\frac{\\epsilon}{2}\\nabla U(z_{t+\\epsilon})\\)',
    'hmc-leapfrog-explain': '重复 \\(L\\) 步后，用 Metropolis 准则接受/拒绝。Leapfrog 的辛性质（symplectic property）保证了哈密顿量近似守恒，使接受率极高。',
    'hmc-compare-title': 'HMC vs MCMC 核心对比',
    'hmc-row-proposal': '提议机制',
    'hmc-row-proposal-mh': '随机扰动（各向同性）',
    'hmc-row-proposal-hmc': '沿梯度的确定性轨迹',
    'hmc-row-mixing': '混合速度',
    'hmc-row-accept': '最优接受率',
    'hmc-row-gradient': '梯度需求',
    'hmc-row-gradient-mh': '不需要',
    'hmc-row-gradient-hmc': '需要 \\(\\nabla \\log p(z)\\)',
    'hmc-row-highdim': '高维表现',
    'hmc-row-highdim-mh': '灾难性退化',
    'hmc-row-highdim-hmc': '扩展性良好',
    'hmc-nuts-title': 'NUTS：自适应 HMC',
    'hmc-nuts-body': 'No-U-Turn Sampler (NUTS) 自动调节轨迹长度 \\(L\\)，通过检测 U-turn 条件 \\(\\mathbf{p} \\cdot (z - z_0) < 0\\) 避免不必要的计算。Stan、PyMC、NumPyro 均默认使用 NUTS。',
    'hmc-callout-title': 'GP + HMC 的完美组合',
    'hmc-callout-body': '：在 GP 超参数推断中，边际似然对核超参数的导数可解析计算。本演示直接用解析梯度来更新 \\(z=(\\log \\ell, \\log \\sigma_f)\\) 的 HMC 轨迹；若当前核为 periodic，则 \\(p\\) 固定为当前设置值。',
    'ctrl-leapfrog-steps': '步数',
    'btn-run-hmc': '运行 HMC',
    'btn-compare-mcmc': '对比 MCMC',
    'hmc-viz-caption': '对比 HMC（蓝色）与 MH（红色）在 GP 超参数后验上的采样效率，下图实时显示 GP 预测',
    'hmc-viz-caption-solo': 'HMC 在 GP 超参数后验上的采样轨迹，下图实时显示对应的 GP 预测',
    'hmc-no-data': '点击下方 GP 后验画布添加观测点，或在「高斯过程」Tab 中添加，然后运行采样。',
    'gp-live-click-hint': '点击此画布添加观测点，然后运行采样',
    'gp-live-click-more': '再添加至少 1 个观测点即可运行采样',
    'gp-live-ready': '观测点已就绪，点击上方按钮运行采样',
    'summary-title': '三者关系',
    'flow-gp-desc': '函数空间上的非参数贝叶斯模型',
    'flow-arrow1': '需要超参数推断 →',
    'flow-mcmc-desc': '从后验分布中采样的通用框架',
    'flow-arrow2': '梯度加速 →',
    'flow-hmc-desc': '利用哈密顿动力学的高效 MCMC',
    'footer': '交互式学习 · GP Explorer',
    'canvas-gp-prior': 'GP 先验样本（点击画布添加观测点）',
    'canvas-gp-posterior-obs': '后验均值 ± 1σ, 2σ + 后验样本',
    'canvas-gp-posterior-no-obs': '后验 = 先验（无观测点，点击画布添加）',
    'stats-accept-rate': '接受率',
    'stats-samples': '样本数',
    'stats-hmc-accept': 'HMC 接受率',
    'stats-step': '步',
    'stats-logml': 'log ML',
    'canvas-hyper-label': '超参数轨迹',
    'canvas-gp-live-label': 'GP 后验 | ℓ={l} σ_f={s}',
    'sampler-note': '实现说明：采样在 z = (log ℓ, log σ_f) 空间进行，并以原始 (ℓ, σ_f) 坐标显示轨迹。',
    'sampler-note-periodic': '实现说明：采样在 z = (log ℓ, log σ_f) 空间进行，并以原始 (ℓ, σ_f) 坐标显示轨迹。当前 periodic 核固定 p = {p}。',
  },
  en: {
    'skip-link': 'Skip to content',
    'hero-eyebrow': 'Interactive Learning',
    'hero-title': 'Understanding Gaussian Processes<br>From Prior to Posterior',
    'hero-sub': 'Build intuition for Gaussian Processes from the ground up. Understand how MCMC samples from posterior distributions, and how HMC uses physics to explore faster. Every step has an interactive visualization.',
    'tab-gp': 'Gaussian Process (GP)',
    'gp-title': 'What is a Gaussian Process?',
    'gp-intro': 'A Gaussian Process is a probability distribution over functions. For any finite set of input points \\(x_1, \\ldots, x_n\\), the corresponding function values \\(f(x_1), \\ldots, f(x_n)\\) follow a multivariate normal distribution:',
    'gp-kernel-explain': 'where \\(m(\\mathbf{x})\\) is the mean function, and \\(k(\\mathbf{x}, \\mathbf{x}\')\\) is the kernel (covariance function). The kernel encodes our prior beliefs about function smoothness, periodicity, and other properties.',
    'gp-kernel-family': 'Kernel Family',
    'kernel-rbf-desc': 'Infinitely differentiable, produces extremely smooth function samples',
    'kernel-matern-desc': 'Once differentiable, better suited for financial data and non-infinitely-smooth scenarios',
    'kernel-periodic-desc': 'Captures periodic structure; the period \\(p\\) is adjustable on this page',
    'gp-prior-to-posterior': 'Prior to Posterior',
    'gp-posterior-intro': 'After observing data \\(\\mathcal{D} = \\{(\\mathbf{X}, \\mathbf{y})\\}\\), the GP posterior predictive is:',
    'gp-posterior-explain': 'This update is the essence of Bayesian inference: prior + data → posterior. The visualization on the right shows GP prior samples and the posterior update after adding observations.',
    'gp-callout-title': 'Computational Bottleneck',
    'gp-callout-body': ': The matrix inversion \\([\\mathbf{K}_{ff} + \\sigma_n^2 \\mathbf{I}]^{-1}\\) has \\(\\mathcal{O}(n^3)\\) complexity — the core challenge for GPs on large datasets.',
    'ctrl-kernel': 'Kernel',
    'ctrl-lengthscale': 'Length scale',
    'ctrl-period': 'Period',
    'btn-resample': 'Resample',
    'btn-show-posterior': 'Show Posterior',
    'btn-show-prior': 'Show Prior',
    'btn-clear-obs': 'Clear Points',
    'gp-viz-caption': 'Click the canvas to add observations, toggle "Show Posterior" to see GP updates',
    'mcmc-title': 'MCMC: Sampling from the Posterior',
    'mcmc-intro': 'When the GP hyperparameter posterior cannot be solved analytically, we first transform the positive parameters via \\(z=(\\log \\ell, \\log \\sigma_f)\\), then run MCMC in \\(z\\)-space. This is equivalent to using log-normal priors on the original positive hyperparameters.',
    'mcmc-mh-title': 'Metropolis-Hastings Algorithm',
    'mcmc-step1-title': 'Propose',
    'mcmc-step1-body': ': From current state \\(z_t\\), generate candidate \\(z\'\\) from proposal \\(q(z\' | z_t)\\)',
    'mcmc-step2-title': 'Compute Acceptance Ratio',
    'mcmc-step2-body': ':',
    'mcmc-step3-title': 'Accept / Reject',
    'mcmc-step3-body': ': Accept \\(z\'\\) with probability \\(\\alpha\\), otherwise keep \\(z_t\\)',
    'mcmc-curse-title': 'The Random Walk Curse',
    'mcmc-curse-intro': 'Standard MCMC (Random Walk MH) is extremely inefficient in high dimensions. Step size must scale as \\(d^{-1/2}\\) to maintain a reasonable acceptance rate (~23.4%), leading to:',
    'mcmc-curse-li1': 'Mixing time grows as \\(\\mathcal{O}(d^2)\\) with dimension \\(d\\)',
    'mcmc-curse-li2': 'The chain "random walks" in local regions, struggling to traverse the full distribution',
    'mcmc-curse-li3': 'High autocorrelation, low effective sample size (ESS)',
    'mcmc-diag-title': 'Convergence Diagnostics',
    'mcmc-metric-rhat': 'Multi-chain convergence',
    'mcmc-metric-ess-val': '&gt; 100/chain',
    'mcmc-metric-ess': 'Effective sample size',
    'mcmc-metric-accept-label': 'Accept Rate',
    'mcmc-metric-accept': 'Optimal MH rate',
    'mcmc-callout-title': 'Why HMC?',
    'mcmc-callout-body': ' In GP hyperparameter inference, the parameter space is typically tens to hundreds of dimensions. The \\(\\mathcal{O}(d^2)\\) mixing time of MCMC makes it hopelessly slow — this is exactly what HMC solves.',
    'ctrl-step-size': 'Step size',
    'ctrl-num-samples': 'Samples',
    'btn-run-mcmc': 'Run MCMC',
    'viz-label-hyperparam': 'Hyperparameter space (ℓ, σ<sub>f</sub>)',
    'viz-label-gp-live': 'GP posterior for current hyperparameters',
    'mcmc-viz-caption': 'MH sampling on the GP hyperparameter posterior — the chain runs in \\(z=(\\log \\ell, \\log \\sigma_f)\\) space, while the top plot shows the mapped samples in raw \\((\\ell, \\sigma_f)\\) coordinates',
    'mcmc-no-data': 'Click the GP posterior canvas below to add observations, or add them in the "Gaussian Process" tab, then run sampling.',
    'hmc-title': 'HMC: Physics-Driven Efficient Sampling',
    'hmc-intro': 'Hamiltonian Monte Carlo (HMC) borrows Hamiltonian dynamics from classical mechanics, turning MCMC sampling into a physics simulation. In this demo, HMC runs in the transformed coordinates \\(z=(\\log \\ell, \\log \\sigma_f)\\). The core idea:',
    'hmc-analogy-title': 'Hockey Puck Analogy',
    'hmc-analogy-body': ': Imagine sliding a puck on a terrain — the height corresponds to the negative log-posterior \\(-\\log p(z|\\mathcal{D})\\). The puck\'s momentum helps it climb hills and cross valleys, efficiently exploring the entire landscape.',
    'hmc-hamilton-title': 'Hamilton\'s Equations',
    'hmc-hamilton-intro': 'Introduce auxiliary momentum \\(\\mathbf{p}\\) and define the Hamiltonian:',
    'hmc-hamilton-evolve': 'The system evolves according to Hamilton\'s equations:',
    'hmc-leapfrog-title': 'Leapfrog Integrator',
    'hmc-step1-title': 'Half-step momentum',
    'hmc-step1-body': ': \\(\\mathbf{p}_{t+\\epsilon/2} = \\mathbf{p}_t - \\frac{\\epsilon}{2}\\nabla U(z_t)\\)',
    'hmc-step2-title': 'Full-step position',
    'hmc-step2-body': ': \\(z_{t+\\epsilon} = z_t + \\epsilon\\, \\mathbf{M}^{-1}\\mathbf{p}_{t+\\epsilon/2}\\)',
    'hmc-step3-title': 'Half-step momentum',
    'hmc-step3-body': ': \\(\\mathbf{p}_{t+\\epsilon} = \\mathbf{p}_{t+\\epsilon/2} - \\frac{\\epsilon}{2}\\nabla U(z_{t+\\epsilon})\\)',
    'hmc-leapfrog-explain': 'After \\(L\\) steps, apply the Metropolis criterion to accept/reject. The symplectic property of leapfrog ensures near-conservation of the Hamiltonian, yielding high acceptance rates.',
    'hmc-compare-title': 'HMC vs MCMC Comparison',
    'hmc-row-proposal': 'Proposal',
    'hmc-row-proposal-mh': 'Random perturbation (isotropic)',
    'hmc-row-proposal-hmc': 'Deterministic trajectory along gradient',
    'hmc-row-mixing': 'Mixing rate',
    'hmc-row-accept': 'Optimal accept rate',
    'hmc-row-gradient': 'Gradient required',
    'hmc-row-gradient-mh': 'No',
    'hmc-row-gradient-hmc': 'Requires \\(\\nabla \\log p(z)\\)',
    'hmc-row-highdim': 'High-dim behavior',
    'hmc-row-highdim-mh': 'Catastrophic degradation',
    'hmc-row-highdim-hmc': 'Scales well',
    'hmc-nuts-title': 'NUTS: Adaptive HMC',
    'hmc-nuts-body': 'No-U-Turn Sampler (NUTS) automatically tunes trajectory length \\(L\\) by detecting the U-turn condition \\(\\mathbf{p} \\cdot (z - z_0) < 0\\), avoiding unnecessary computation. Stan, PyMC, and NumPyro all default to NUTS.',
    'hmc-callout-title': 'The Perfect Match: GP + HMC',
    'hmc-callout-body': ': In GP hyperparameter inference, derivatives of the marginal likelihood with respect to kernel hyperparameters are analytically available. This demo uses the closed-form gradient to evolve HMC trajectories for \\(z=(\\log \\ell, \\log \\sigma_f)\\); when the periodic kernel is selected, \\(p\\) is held fixed at the current value.',
    'ctrl-leapfrog-steps': 'steps',
    'btn-run-hmc': 'Run HMC',
    'btn-compare-mcmc': 'Compare MCMC',
    'hmc-viz-caption': 'Compare HMC (blue) vs MH (red) on GP hyperparameter posterior, bottom: live GP prediction',
    'hmc-viz-caption-solo': 'HMC sampling trajectory on GP hyperparameter posterior, bottom: live GP prediction',
    'hmc-no-data': 'Click the GP posterior canvas below to add observations, or add them in the "Gaussian Process" tab, then run sampling.',
    'gp-live-click-hint': 'Click this canvas to add observations, then run sampling',
    'gp-live-click-more': 'Add at least 1 more observation to run sampling',
    'gp-live-ready': 'Observations ready — click the button above to run sampling',
    'summary-title': 'How They Connect',
    'flow-gp-desc': 'Nonparametric Bayesian model over functions',
    'flow-arrow1': 'Needs hyperparameter inference →',
    'flow-mcmc-desc': 'General framework for posterior sampling',
    'flow-arrow2': 'Gradient acceleration →',
    'flow-hmc-desc': 'Efficient MCMC via Hamiltonian dynamics',
    'footer': 'Interactive Learning · GP Explorer',
    'canvas-gp-prior': 'GP prior samples (click canvas to add observations)',
    'canvas-gp-posterior-obs': 'Posterior mean ± 1σ, 2σ + posterior samples',
    'canvas-gp-posterior-no-obs': 'Posterior = Prior (no observations, click to add)',
    'stats-accept-rate': 'Accept rate',
    'stats-samples': 'Samples',
    'stats-hmc-accept': 'HMC accept rate',
    'stats-step': 'Step',
    'stats-logml': 'log ML',
    'canvas-hyper-label': 'Hyperparameter trajectory',
    'canvas-gp-live-label': 'GP posterior | ℓ={l} σ_f={s}',
    'sampler-note': 'Implementation note: sampling runs in z = (log ℓ, log σ_f) space, while trajectories are displayed in raw (ℓ, σ_f) coordinates.',
    'sampler-note-periodic': 'Implementation note: sampling runs in z = (log ℓ, log σ_f) space, while trajectories are displayed in raw (ℓ, σ_f) coordinates. The periodic kernel keeps p fixed at {p}.',
  },
  format(key, vars = {}) {
    let text = this.t(key);
    Object.entries(vars).forEach(([name, value]) => {
      text = text.split(`{${name}}`).join(String(value));
    });
    return text;
  },
  t(key) { return this[this._lang][key] || this.zh[key] || key; },
  setLang(lang) {
    this._lang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = lang === 'zh' ? 'GP · MCMC · HMC 交互式探索' : 'GP · MCMC · HMC Interactive Explorer';
    this.applyAll();
  },
  applyAll() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (el.getAttribute('data-i18n-html') === 'true' || text.includes('<')) el.innerHTML = text;
      else el.textContent = text;
    });
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(document.body, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\(', right: '\\)', display: false }, { left: '\\[', right: '\\]', display: true }],
        throwOnError: false
      });
    }
    const toggleBtn = document.getElementById('btn-gp-toggle');
    if (toggleBtn) toggleBtn.textContent = gpShowPosterior ? this.t('btn-show-prior') : this.t('btn-show-posterior');
    updatePeriodControl();
    updateSamplerNotes();
    redrawAllCanvases();
  }
};

// ── Theme Toggle ──
(function(){
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  function updateIcon() {
    if (!t) return;
    t.innerHTML = d === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  updateIcon();
  if (t) t.addEventListener('click', () => { d = d === 'dark' ? 'light' : 'dark'; r.setAttribute('data-theme', d); updateIcon(); redrawAllCanvases(); });
})();

// ── Language Toggle ──
(function(){
  const btn = document.getElementById('lang-toggle');
  const label = document.getElementById('lang-label');
  if (!btn) return;
  if (label) label.textContent = i18n._lang === 'zh' ? 'EN' : '中';
  btn.addEventListener('click', () => { const next = i18n._lang === 'zh' ? 'en' : 'zh'; i18n.setLang(next); label.textContent = next === 'zh' ? 'EN' : '中'; });
})();

// ── KaTeX Auto Render ──
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderMathInElement === 'function') renderMathInElement(document.body, {
    delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\(', right: '\\)', display: false }, { left: '\\[', right: '\\]', display: true }],
    throwOnError: false
  });
});

// ── Tab Navigation ──
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    tabPanels.forEach(p => { p.classList.remove('active'); p.hidden = true; });
    btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    panel.classList.add('active'); panel.hidden = false;
    requestAnimationFrame(() => {
      const tab = btn.dataset.tab;
      if (tab === 'gp') drawGP();
      if (tab === 'mcmc') { updateNoDataWarning('mcmc'); drawHyperCanvas('mcmc-canvas', mcmcSamples, []); drawLiveGP('mcmc-gp-canvas', mcmcCurrentParams); }
      if (tab === 'hmc') { updateNoDataWarning('hmc'); drawHyperCanvas('hmc-canvas', hmcSamples, hmcCompareSamples); drawLiveGP('hmc-gp-canvas', hmcCurrentParams, hmcComparisonActive ? hmcCompareCurrentParams : null); }
    });
  });
});

// ── Utility Functions ──
function getStyle(prop) { return getComputedStyle(document.documentElement).getPropertyValue(prop).trim(); }
function colorWithAlpha(cssColor, alpha) {
  const c = document.createElement('canvas'); c.width = c.height = 1;
  const x = c.getContext('2d'); x.fillStyle = cssColor; x.fillRect(0, 0, 1, 1);
  const [r, g, b] = x.getImageData(0, 0, 1, 1).data;
  return `rgba(${r},${g},${b},${alpha})`;
}
function randn() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

function cholesky(A) {
  const n = A.length, L = Array.from({ length: n }, () => new Float64Array(n));
  for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) {
    let s = 0; for (let k = 0; k < j; k++) s += L[i][k] * L[j][k];
    L[i][j] = i === j ? Math.sqrt(Math.max(A[i][i] - s, 1e-10)) : (A[i][j] - s) / (L[j][j] || 1e-10);
  }
  return L;
}
function mvmul(M, v) { return M.map(row => row.reduce((s, val, j) => s + val * v[j], 0)); }
function lsolve(L, b) { const n = b.length, x = new Float64Array(n); for (let i = 0; i < n; i++) { let s = b[i]; for (let j = 0; j < i; j++) s -= L[i][j] * x[j]; x[i] = s / (L[i][i] || 1e-10); } return x; }
function ltsolve(L, b) { const n = b.length, x = new Float64Array(n); for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let j = i + 1; j < n; j++) s -= L[j][i] * x[j]; x[i] = s / (L[i][i] || 1e-10); } return x; }
function cholInverse(L) {
  const n = L.length, inv = Array.from({ length: n }, () => new Float64Array(n));
  for (let col = 0; col < n; col++) {
    const e = new Float64Array(n);
    e[col] = 1;
    const y = lsolve(L, e);
    const x = ltsolve(L, y);
    for (let row = 0; row < n; row++) inv[row][col] = x[row];
  }
  return inv;
}
function logStandardNormal(z) { return -0.5 * z * z; }
function logNormalPriorRaw(x) {
  if (!Number.isFinite(x) || x <= 0) return -Infinity;
  const z = Math.log(x);
  return -0.5 * z * z - z;
}

// ── Kernel functions (used by both GP viz and posterior inference) ──
function kernelRBF(x1, x2, l, sf) { const d = x1 - x2; return sf * sf * Math.exp(-0.5 * d * d / (l * l)); }
function kernelMatern(x1, x2, l, sf) { const r = Math.abs(x1 - x2) / l, sr3 = Math.sqrt(3) * r; return sf * sf * (1 + sr3) * Math.exp(-sr3); }
let period = 2.0;
function kernelPeriodic(x1, x2, l, sf) { const s = Math.sin(Math.PI * Math.abs(x1 - x2) / period); return sf * sf * Math.exp(-2 * s * s / (l * l)); }

let currentKernel = 'rbf';
function getKernelFn() {
  if (currentKernel === 'matern') return kernelMatern;
  if (currentKernel === 'periodic') return kernelPeriodic;
  return kernelRBF;
}

function kernelDerivativesLogParams(x1, x2, l, sf) {
  const base = getKernelFn()(x1, x2, l, sf);
  const d = x1 - x2;
  if (currentKernel === 'matern') {
    const a = Math.sqrt(3) * Math.abs(d) / l;
    return [sf * sf * a * a * Math.exp(-a), 2 * base];
  }
  if (currentKernel === 'periodic') {
    const s = Math.sin(Math.PI * Math.abs(d) / period);
    return [base * (4 * s * s) / (l * l), 2 * base];
  }
  return [base * (d * d) / (l * l), 2 * base];
}

function buildCovMatrix(xs, kfn, l, sf, noise) {
  const n = xs.length, K = Array.from({ length: n }, () => new Float64Array(n));
  for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) {
    let v = kfn(xs[i], xs[j], l, sf); if (i === j) v += noise;
    K[i][j] = v; K[j][i] = v;
  }
  return K;
}

// ========================================
// GP posterior ingredients
// ========================================
const noiseVar = 0.05;

// Compute log p(y | X, l, sf) = -0.5 * (y^T K^-1 y + log|K| + n log 2π)
function gpLogMarginalLikelihood(obsX, obsY, l, sf) {
  const n = obsX.length;
  if (n < 2) return -Infinity;
  if (!Number.isFinite(l) || !Number.isFinite(sf) || l <= 1e-4 || sf <= 1e-4) return -Infinity;
  const kfn = getKernelFn();
  const K = buildCovMatrix(obsX, kfn, l, sf, noiseVar);
  const L = cholesky(K);
  const alpha = ltsolve(L, lsolve(L, obsY));
  let logDet = 0;
  for (let i = 0; i < n; i++) logDet += Math.log(L[i][i] || 1e-30);
  logDet *= 2;
  let yKy = 0;
  for (let i = 0; i < n; i++) yKy += obsY[i] * alpha[i];
  return -0.5 * yKy - 0.5 * logDet - 0.5 * n * Math.log(2 * Math.PI);
}

function gpLogPosteriorRaw(obsX, obsY, l, sf) {
  const logML = gpLogMarginalLikelihood(obsX, obsY, l, sf);
  if (!Number.isFinite(logML)) return -Infinity;
  return logML + logNormalPriorRaw(l) + logNormalPriorRaw(sf);
}

function gpLogPosteriorLogSpace(obsX, obsY, logL, logSf) {
  const l = Math.exp(logL), sf = Math.exp(logSf);
  const logML = gpLogMarginalLikelihood(obsX, obsY, l, sf);
  if (!Number.isFinite(logML)) return -Infinity;
  return logML + logStandardNormal(logL) + logStandardNormal(logSf);
}

// Closed-form gradient of the transformed log posterior w.r.t. (log l, log sf)
function gpLogPosteriorGradientLogSpace(obsX, obsY, logL, logSf) {
  const l = Math.exp(logL), sf = Math.exp(logSf);
  const n = obsX.length;
  if (n < 2 || !Number.isFinite(logL) || !Number.isFinite(logSf)) return [0, 0];
  const kfn = getKernelFn();
  const K = buildCovMatrix(obsX, kfn, l, sf, noiseVar);
  const L = cholesky(K);
  const alpha = ltsolve(L, lsolve(L, obsY));
  const Kinv = cholInverse(L);
  let gradLogL = 0, gradLogSf = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const q = alpha[i] * alpha[j] - Kinv[i][j];
      const [dLogL, dLogSf] = kernelDerivativesLogParams(obsX[i], obsX[j], l, sf);
      gradLogL += q * dLogL;
      gradLogSf += q * dLogSf;
    }
  }
  return [0.5 * gradLogL - logL, 0.5 * gradLogSf - logSf];
}

// ========================================
// Shared: GP Observations (used across all tabs)
// ========================================
let gpObservations = [];
let gpShowPosterior = false;
let lengthscale = 1.0;
const nGpSamples = 5;
let gpSampleSeeds = [];
function initGPSeeds() { gpSampleSeeds = []; for (let s = 0; s < nGpSamples; s++) { const a = []; for (let i = 0; i < 200; i++) a.push(randn()); gpSampleSeeds.push(a); } }
initGPSeeds();

// Default demo observations — a simple nonlinear pattern
const defaultObservations = [
  [-3.0, 0.3], [-1.8, 1.2], [-0.5, -0.4], [0.7, 0.8], [1.5, -0.3], [2.8, 1.0]
];

function ensureObservations() {
  if (gpObservations.length < 2) {
    gpObservations = defaultObservations.map(o => [...o]);
    drawGP();
  }
}

function updateNoDataWarning(panel) {
  const el = document.getElementById(`${panel}-no-data`);
  if (el) el.style.display = gpObservations.length >= 2 ? 'none' : 'block';
}

function formatHyperParamText(l, sf) {
  const base = `ℓ=${l.toFixed(2)}  σ_f=${sf.toFixed(2)}`;
  return currentKernel === 'periodic' ? `${base}  p=${period.toFixed(2)}` : base;
}

function updatePeriodControl() {
  const control = document.getElementById('period-control');
  const value = document.getElementById('period-val');
  if (!control || !value) return;
  control.hidden = currentKernel !== 'periodic';
  value.textContent = period.toFixed(1);
}

function updateSamplerNotes() {
  const key = currentKernel === 'periodic' ? 'sampler-note-periodic' : 'sampler-note';
  const text = i18n.format(key, { p: period.toFixed(1) });
  ['mcmc-impl-note', 'hmc-impl-note'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });
}

// ========================================
// GP Visualization (Tab 1) — same as before but uses sf=1
// ========================================
const gpCanvas = document.getElementById('gp-canvas');
const gpCtx = gpCanvas.getContext('2d');

function drawGP() {
  const dpr = window.devicePixelRatio || 1;
  const rect = gpCanvas.getBoundingClientRect();
  const W = rect.width, H = rect.height || 400;
  if (W === 0) return;
  gpCanvas.width = W * dpr; gpCanvas.height = H * dpr;
  gpCanvas.style.width = W + 'px'; gpCanvas.style.height = H + 'px';
  const ctx = gpCtx; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const bg = getStyle('--color-surface'), textColor = getStyle('--color-text-muted'), accent = getStyle('--color-accent'), divider = getStyle('--color-divider'), faint = getStyle('--color-text-faint');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const pad = { l: 45, r: 15, t: 20, b: 35 }, plotW = W - pad.l - pad.r, plotH = H - pad.t - pad.b;
  const xMin = -4, xMax = 4, yMin = -3, yMax = 3;
  function toX(x) { return pad.l + (x - xMin) / (xMax - xMin) * plotW; }
  function toY(y) { return pad.t + (yMax - y) / (yMax - yMin) * plotH; }
  // Grid
  ctx.strokeStyle = divider; ctx.lineWidth = 0.5;
  for (let x = -4; x <= 4; x++) { ctx.beginPath(); ctx.moveTo(toX(x), pad.t); ctx.lineTo(toX(x), pad.t + plotH); ctx.stroke(); }
  for (let y = -3; y <= 3; y++) { ctx.beginPath(); ctx.moveTo(pad.l, toY(y)); ctx.lineTo(pad.l + plotW, toY(y)); ctx.stroke(); }
  ctx.strokeStyle = faint; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.l, toY(0)); ctx.lineTo(pad.l + plotW, toY(0)); ctx.stroke();
  ctx.fillStyle = textColor; ctx.font = '11px JetBrains Mono, monospace'; ctx.textAlign = 'center';
  for (let x = -4; x <= 4; x += 2) ctx.fillText(x, toX(x), pad.t + plotH + 16);
  ctx.textAlign = 'right'; for (let y = -3; y <= 3; y++) ctx.fillText(y, pad.l - 8, toY(y) + 4);

  const kfn = getKernelFn(), l = lengthscale, sf = 1.0;
  const nPts = 80, xs = Array.from({ length: nPts }, (_, i) => xMin + i * (xMax - xMin) / (nPts - 1));
  const colors = [accent, '#e06050', '#40b080', '#d0a030', '#a060d0'];

  if (gpShowPosterior) {
    const obsX = gpObservations.map(o => o[0]), obsY = gpObservations.map(o => o[1]);
    let means, vars;
    if (obsX.length > 0) {
      const Kff = buildCovMatrix(obsX, kfn, l, sf, noiseVar), Lff = cholesky(Kff);
      const alpha = ltsolve(Lff, lsolve(Lff, obsY));
      means = []; vars = [];
      for (let i = 0; i < nPts; i++) {
        const kstar = obsX.map(ox => kfn(xs[i], ox, l, sf));
        const mu = kstar.reduce((s, v, j) => s + v * alpha[j], 0);
        const vi = lsolve(Lff, kstar);
        const vr = kfn(xs[i], xs[i], l, sf) - vi.reduce((s, x) => s + x * x, 0);
        means.push(mu); vars.push(Math.max(vr, 0));
      }
    } else { means = xs.map(() => 0); vars = xs.map(x => kfn(x, x, l, sf)); }

    // 2σ band
    ctx.beginPath();
    for (let i = 0; i < nPts; i++) { const cx = toX(xs[i]), cy = toY(means[i] + 2 * Math.sqrt(vars[i])); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); }
    for (let i = nPts - 1; i >= 0; i--) ctx.lineTo(toX(xs[i]), toY(means[i] - 2 * Math.sqrt(vars[i])));
    ctx.closePath(); ctx.fillStyle = colorWithAlpha(accent, 0.10); ctx.fill();
    // 1σ band
    ctx.beginPath();
    for (let i = 0; i < nPts; i++) { const cx = toX(xs[i]), cy = toY(means[i] + Math.sqrt(vars[i])); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); }
    for (let i = nPts - 1; i >= 0; i--) ctx.lineTo(toX(xs[i]), toY(means[i] - Math.sqrt(vars[i])));
    ctx.closePath(); ctx.fillStyle = colorWithAlpha(accent, 0.20); ctx.fill();

    // Posterior samples
    if (obsX.length > 0) {
      const Kff = buildCovMatrix(obsX, kfn, l, sf, noiseVar), Lff = cholesky(Kff);
      const postCov = Array.from({ length: nPts }, () => new Float64Array(nPts));
      for (let i = 0; i < nPts; i++) for (let j = 0; j <= i; j++) {
        const ki = obsX.map(ox => kfn(xs[i], ox, l, sf)), kj = obsX.map(ox => kfn(xs[j], ox, l, sf));
        const vi = lsolve(Lff, ki), vj = lsolve(Lff, kj);
        let c = 0; for (let m = 0; m < vi.length; m++) c += vi[m] * vj[m];
        const val = kfn(xs[i], xs[j], l, sf) - c; postCov[i][j] = val; postCov[j][i] = val;
        if (i === j) postCov[i][i] += 1e-6;
      }
      const Lp = cholesky(postCov);
      for (let s = 0; s < nGpSamples; s++) {
        const z = gpSampleSeeds[s].slice(0, nPts), sd = mvmul(Lp, z);
        ctx.beginPath(); ctx.strokeStyle = colors[s]; ctx.globalAlpha = 0.5; ctx.lineWidth = 1.2;
        for (let i = 0; i < nPts; i++) { const cx = toX(xs[i]), cy = toY(means[i] + sd[i]); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); }
        ctx.stroke(); ctx.globalAlpha = 1;
      }
    }
    // Mean
    ctx.beginPath(); ctx.strokeStyle = accent; ctx.lineWidth = 2.5;
    for (let i = 0; i < nPts; i++) { const cx = toX(xs[i]), cy = toY(means[i]); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); }
    ctx.stroke();
    // Obs
    gpObservations.forEach(([ox, oy]) => { ctx.beginPath(); ctx.arc(toX(ox), toY(oy), 6, 0, Math.PI * 2); ctx.fillStyle = accent; ctx.fill(); ctx.strokeStyle = bg; ctx.lineWidth = 2; ctx.stroke(); });
    ctx.fillStyle = textColor; ctx.font = '11px Satoshi, sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(obsX.length > 0 ? i18n.t('canvas-gp-posterior-obs') : i18n.t('canvas-gp-posterior-no-obs'), pad.l + 10, pad.t + 16);
  } else {
    // Prior
    const K = buildCovMatrix(xs, kfn, l, sf, 1e-6), L = cholesky(K);
    for (let s = 0; s < nGpSamples; s++) {
      const z = gpSampleSeeds[s].slice(0, nPts), sample = mvmul(L, z);
      ctx.beginPath(); ctx.strokeStyle = colors[s]; ctx.globalAlpha = 0.7; ctx.lineWidth = 1.8;
      for (let i = 0; i < nPts; i++) { const cx = toX(xs[i]), cy = toY(sample[i]); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); }
      ctx.stroke(); ctx.globalAlpha = 1;
    }
    gpObservations.forEach(([ox, oy]) => { ctx.beginPath(); ctx.arc(toX(ox), toY(oy), 5, 0, Math.PI * 2); ctx.fillStyle = faint; ctx.fill(); });
    ctx.fillStyle = textColor; ctx.font = '11px Satoshi, sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(i18n.t('canvas-gp-prior'), pad.l + 10, pad.t + 16);
  }
}

// GP interactivity
gpCanvas.style.cursor = 'crosshair';
gpCanvas.addEventListener('click', (e) => {
  const rect = gpCanvas.getBoundingClientRect(), cx = e.clientX - rect.left, cy = e.clientY - rect.top;
  const pad = { l: 45, r: 15, t: 20, b: 35 }, plotW = rect.width - pad.l - pad.r, plotH = rect.height - pad.t - pad.b;
  const x = -4 + (cx - pad.l) / plotW * 8, y = 3 - (cy - pad.t) / plotH * 6;
  if (x >= -4 && x <= 4 && y >= -3 && y <= 3) { gpObservations.push([x, y]); invalidateSamplingResults(); }
});
document.getElementById('kernel-select').addEventListener('change', (e) => {
  currentKernel = e.target.value;
  document.querySelectorAll('.kernel-card').forEach(c => c.classList.remove('selected'));
  const card = document.querySelector(`.kernel-card[data-kernel="${currentKernel}"]`);
  if (card) card.classList.add('selected');
  updatePeriodControl();
  invalidateSamplingResults();
});
document.getElementById('lengthscale').addEventListener('input', (e) => { lengthscale = parseFloat(e.target.value); document.getElementById('ls-val').textContent = lengthscale.toFixed(1); drawGP(); });
document.getElementById('period').addEventListener('input', (e) => {
  period = parseFloat(e.target.value);
  document.getElementById('period-val').textContent = period.toFixed(1);
  invalidateSamplingResults();
});
document.getElementById('btn-gp-sample').addEventListener('click', () => { initGPSeeds(); drawGP(); });
document.getElementById('btn-gp-toggle').addEventListener('click', () => {
  gpShowPosterior = !gpShowPosterior;
  document.getElementById('btn-gp-toggle').textContent = gpShowPosterior ? i18n.t('btn-show-prior') : i18n.t('btn-show-posterior');
  drawGP();
});
document.getElementById('btn-gp-clear').addEventListener('click', () => { gpObservations = []; invalidateSamplingResults(); });
document.querySelectorAll('.kernel-card').forEach(card => {
  card.addEventListener('click', () => {
    currentKernel = card.dataset.kernel;
    document.getElementById('kernel-select').value = currentKernel;
    document.querySelectorAll('.kernel-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    updatePeriodControl();
    invalidateSamplingResults();
  });
});

// Click-to-add observations on MCMC/HMC GP posterior canvases
['mcmc-gp-canvas', 'hmc-gp-canvas'].forEach(id => {
  const c = document.getElementById(id);
  if (!c) return;
  c.style.cursor = 'crosshair';
  c.addEventListener('click', (e) => {
    const rect = c.getBoundingClientRect(), cx = e.clientX - rect.left, cy = e.clientY - rect.top;
    const pad = { l: 40, r: 10, t: 18, b: 25 }, plotW = rect.width - pad.l - pad.r, plotH = rect.height - pad.t - pad.b;
    const x = -4 + (cx - pad.l) / plotW * 8, y = 3 - (cy - pad.t) / plotH * 6;
    if (x >= -4 && x <= 4 && y >= -3 && y <= 3) {
      gpObservations.push([x, y]);
      invalidateSamplingResults();
    }
  });
});

// ========================================
// Shared: Draw Hyperparameter Space Canvas
// ========================================
// Draws the raw hyperparameter posterior heatmap + sample trajectories
function drawHyperCanvas(canvasId, primarySamples, secondarySamples) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const W = rect.width, H = rect.height || 300;
  if (W === 0) return;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const bg = getStyle('--color-surface'), textColor = getStyle('--color-text-muted'), accent = getStyle('--color-accent'), errorColor = getStyle('--color-error');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const pad = { l: 50, r: 15, t: 15, b: 35 }, plotW = W - pad.l - pad.r, plotH = H - pad.t - pad.b;
  // Hyperparameter display range: ℓ ∈ [0.05, 5], σ_f ∈ [0.05, 4]
  const lMin = 0.05, lMax = 5, sfMin = 0.05, sfMax = 4;
  function toX(l) { return pad.l + (l - lMin) / (lMax - lMin) * plotW; }
  function toY(sf) { return pad.t + (sfMax - sf) / (sfMax - sfMin) * plotH; }

  // Heatmap of the raw hyperparameter posterior (with log-normal priors)
  const obsX = gpObservations.map(o => o[0]), obsY = gpObservations.map(o => o[1]);
  if (obsX.length >= 2) {
    const gridN = 40;
    const vals = []; let minV = Infinity, maxV = -Infinity;
    for (let i = 0; i < gridN; i++) {
      vals[i] = [];
      for (let j = 0; j < gridN; j++) {
        const gl = lMin + (lMax - lMin) * i / (gridN - 1);
        const gsf = sfMin + (sfMax - sfMin) * j / (gridN - 1);
        const v = gpLogPosteriorRaw(obsX, obsY, gl, gsf);
        vals[i][j] = v;
        if (v > -1e6) { if (v < minV) minV = v; if (v > maxV) maxV = v; }
      }
    }
    const cellW = plotW / gridN, cellH = plotH / gridN;
    for (let i = 0; i < gridN; i++) for (let j = 0; j < gridN; j++) {
      const t = Math.max(0, Math.min(1, (vals[i][j] - minV) / (maxV - minV + 1e-10)));
      ctx.fillStyle = `rgba(100,140,220,${t * 0.5})`;
      ctx.fillRect(pad.l + i * cellW, pad.t + (gridN - 1 - j) * cellH, cellW + 1, cellH + 1);
    }
  }

  // Secondary samples (MCMC comparison — red)
  if (secondarySamples && secondarySamples.length > 1) {
    ctx.beginPath(); ctx.strokeStyle = errorColor; ctx.globalAlpha = 0.3; ctx.lineWidth = 0.8;
    for (let i = 0; i < secondarySamples.length; i++) {
      const [sl, ss] = secondarySamples[i]; i === 0 ? ctx.moveTo(toX(sl), toY(ss)) : ctx.lineTo(toX(sl), toY(ss));
    }
    ctx.stroke(); ctx.globalAlpha = 1;
    for (let i = 0; i < secondarySamples.length; i++) {
      const [sl, ss] = secondarySamples[i];
      ctx.beginPath(); ctx.arc(toX(sl), toY(ss), 2.5, 0, Math.PI * 2);
      ctx.fillStyle = errorColor; ctx.globalAlpha = 0.2 + 0.8 * (i / secondarySamples.length); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Primary samples (blue)
  if (primarySamples.length > 1) {
    ctx.beginPath(); ctx.strokeStyle = accent; ctx.globalAlpha = 0.35; ctx.lineWidth = 0.8;
    for (let i = 0; i < primarySamples.length; i++) {
      const [sl, ss] = primarySamples[i]; i === 0 ? ctx.moveTo(toX(sl), toY(ss)) : ctx.lineTo(toX(sl), toY(ss));
    }
    ctx.stroke(); ctx.globalAlpha = 1;
    for (let i = 0; i < primarySamples.length; i++) {
      const [sl, ss] = primarySamples[i];
      ctx.beginPath(); ctx.arc(toX(sl), toY(ss), 3, 0, Math.PI * 2);
      ctx.fillStyle = accent; ctx.globalAlpha = 0.2 + 0.8 * (i / primarySamples.length); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Highlight current point
  const lastSample = primarySamples[primarySamples.length - 1];
  if (lastSample) {
    ctx.beginPath(); ctx.arc(toX(lastSample[0]), toY(lastSample[1]), 6, 0, Math.PI * 2);
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = accent; ctx.fill();
  }

  // Legend
  if (secondarySamples && secondarySamples.length > 0) {
    ctx.font = '11px Satoshi, sans-serif'; ctx.textAlign = 'left';
    ctx.fillStyle = accent; ctx.fillRect(pad.l + 10, pad.t + 8, 12, 3);
    ctx.fillStyle = textColor; ctx.fillText('HMC', pad.l + 28, pad.t + 14);
    ctx.fillStyle = errorColor; ctx.fillRect(pad.l + 70, pad.t + 8, 12, 3);
    ctx.fillStyle = textColor; ctx.fillText('MH', pad.l + 88, pad.t + 14);
  }

  if (currentKernel === 'periodic') {
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = textColor;
    const fixedLabel = i18n._lang === 'zh' ? `固定 p=${period.toFixed(2)}` : `fixed p=${period.toFixed(2)}`;
    ctx.fillText(fixedLabel, pad.l + plotW, pad.t + 12);
  }

  // Axes
  ctx.fillStyle = textColor; ctx.font = '11px JetBrains Mono, monospace'; ctx.textAlign = 'center';
  ctx.fillText('ℓ', pad.l + plotW / 2, pad.t + plotH + 25);
  for (let v = 0.5; v <= 5; v += 0.5) { if (v % 1 === 0) ctx.fillText(v.toFixed(0), toX(v), pad.t + plotH + 14); }
  ctx.save(); ctx.translate(14, pad.t + plotH / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText('σ_f', 0, 0); ctx.restore();
  ctx.textAlign = 'right';
  for (let v = 0.5; v <= 4; v += 0.5) { if (v % 1 === 0) ctx.fillText(v.toFixed(0), pad.l - 8, toY(v) + 4); }
}

// ========================================
// Shared: Draw Live GP Posterior Canvas
// ========================================
function drawLiveGP(canvasId, params, compareParams) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const W = rect.width, H = rect.height || 250;
  if (W === 0) return;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const bg = getStyle('--color-surface'), textColor = getStyle('--color-text-muted'), accent = getStyle('--color-accent'), divider = getStyle('--color-divider'), errorColor = getStyle('--color-error');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const obsX = gpObservations.map(o => o[0]), obsY = gpObservations.map(o => o[1]);
  const kfn = getKernelFn();
  const pad = { l: 40, r: 10, t: 18, b: 25 }, plotW = W - pad.l - pad.r, plotH = H - pad.t - pad.b;
  const xMin = -4, xMax = 4, yMin = -3, yMax = 3;
  function toX(x) { return pad.l + (x - xMin) / (xMax - xMin) * plotW; }
  function toY(y) { return pad.t + (yMax - y) / (yMax - yMin) * plotH; }

  // Always draw grid + axes + observations even before sampling
  // Grid
  ctx.strokeStyle = divider; ctx.lineWidth = 0.5;
  for (let gx = -4; gx <= 4; gx += 2) { ctx.beginPath(); ctx.moveTo(toX(gx), pad.t); ctx.lineTo(toX(gx), pad.t + plotH); ctx.stroke(); }
  for (let gy = -2; gy <= 2; gy++) { ctx.beginPath(); ctx.moveTo(pad.l, toY(gy)); ctx.lineTo(pad.l + plotW, toY(gy)); ctx.stroke(); }

  // Always draw observation points
  gpObservations.forEach(([ox, oy]) => {
    ctx.beginPath(); ctx.arc(toX(ox), toY(oy), 4, 0, Math.PI * 2);
    ctx.fillStyle = accent; ctx.fill(); ctx.strokeStyle = bg; ctx.lineWidth = 1.5; ctx.stroke();
  });

  // Hint text
  if (obsX.length === 0) {
    ctx.fillStyle = textColor; ctx.font = '13px Satoshi, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(i18n.t('gp-live-click-hint'), W / 2, H / 2);
  } else if (obsX.length < 2) {
    ctx.fillStyle = textColor; ctx.font = '12px Satoshi, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(i18n.t('gp-live-click-more'), W / 2, H - pad.b - 5);
  } else if (!params) {
    ctx.fillStyle = textColor; ctx.font = '12px Satoshi, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(i18n.t('gp-live-ready'), W / 2, H - pad.b - 5);
  }

  if (obsX.length < 2 || !params) return;

  const nPts = 60, xs = Array.from({ length: nPts }, (_, i) => xMin + i * (xMax - xMin) / (nPts - 1));

  // Helper: compute GP posterior mean & variance for given hyperparams
  function computeGPPosterior(l, sf) {
    const Kff = buildCovMatrix(obsX, kfn, l, sf, noiseVar), Lff = cholesky(Kff);
    const means = [], vars = [];
    for (let i = 0; i < nPts; i++) {
      const kstar = obsX.map(ox => kfn(xs[i], ox, l, sf));
      const alpha = ltsolve(Lff, lsolve(Lff, obsY));
      const mu = kstar.reduce((s, v, j) => s + v * alpha[j], 0);
      const vi = lsolve(Lff, kstar);
      const vr = kfn(xs[i], xs[i], l, sf) - vi.reduce((s, x) => s + x * x, 0);
      means.push(mu); vars.push(Math.max(vr, 0));
    }
    return { means, vars };
  }

  // Helper: draw a GP posterior (band + mean line)
  function drawPosterior(means, vars, color, bandAlpha1, bandAlpha2) {
    // 2σ band
    ctx.beginPath();
    for (let i = 0; i < nPts; i++) { const cx = toX(xs[i]), cy = toY(means[i] + 2 * Math.sqrt(vars[i])); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); }
    for (let i = nPts - 1; i >= 0; i--) ctx.lineTo(toX(xs[i]), toY(means[i] - 2 * Math.sqrt(vars[i])));
    ctx.closePath(); ctx.fillStyle = colorWithAlpha(color, bandAlpha1); ctx.fill();
    // 1σ band
    ctx.beginPath();
    for (let i = 0; i < nPts; i++) { const cx = toX(xs[i]), cy = toY(means[i] + Math.sqrt(vars[i])); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); }
    for (let i = nPts - 1; i >= 0; i--) ctx.lineTo(toX(xs[i]), toY(means[i] - Math.sqrt(vars[i])));
    ctx.closePath(); ctx.fillStyle = colorWithAlpha(color, bandAlpha2); ctx.fill();
    // Mean line
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2;
    for (let i = 0; i < nPts; i++) { const cx = toX(xs[i]), cy = toY(means[i]); i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy); }
    ctx.stroke();
  }

  // Draw MH comparison posterior first (red, behind)
  if (compareParams) {
    const { means: cMeans, vars: cVars } = computeGPPosterior(compareParams[0], compareParams[1]);
    drawPosterior(cMeans, cVars, errorColor, 0.08, 0.14);
  }

  // Draw primary posterior (blue, in front)
  const l = params[0], sf = params[1];
  const { means, vars } = computeGPPosterior(l, sf);
  drawPosterior(means, vars, accent, 0.12, 0.22);

  // Obs
  gpObservations.forEach(([ox, oy]) => { ctx.beginPath(); ctx.arc(toX(ox), toY(oy), 4, 0, Math.PI * 2); ctx.fillStyle = accent; ctx.fill(); ctx.strokeStyle = bg; ctx.lineWidth = 1.5; ctx.stroke(); });

  // Label
  ctx.fillStyle = textColor; ctx.font = '10px JetBrains Mono, monospace'; ctx.textAlign = 'left';
  if (compareParams) {
    ctx.fillStyle = accent;
    ctx.fillText(`HMC: ${formatHyperParamText(l, sf)}`, pad.l + 6, pad.t + 12);
    ctx.fillStyle = errorColor;
    ctx.fillText(`MH:  ${formatHyperParamText(compareParams[0], compareParams[1])}`, pad.l + 6, pad.t + 24);
  } else {
    ctx.fillText(formatHyperParamText(l, sf), pad.l + 6, pad.t + 12);
  }

  // Legend when comparing
  if (compareParams) {
    const lx = W - pad.r - 100;
    ctx.font = '11px Satoshi, sans-serif'; ctx.textAlign = 'left';
    ctx.fillStyle = accent; ctx.fillRect(lx, pad.t + 6, 12, 3);
    ctx.fillStyle = textColor; ctx.fillText('HMC', lx + 16, pad.t + 12);
    ctx.fillStyle = errorColor; ctx.fillRect(lx + 52, pad.t + 6, 12, 3);
    ctx.fillStyle = textColor; ctx.fillText('MH', lx + 68, pad.t + 12);
  }
}

// ========================================
// MCMC on GP hyperparameters
// ========================================
let mcmcSamples = [];
let mcmcCurrentParams = null;
let mcmcAnimId = null;

function runMCMCOnGP() {
  if (mcmcAnimId) { cancelAnimationFrame(mcmcAnimId); mcmcAnimId = null; }
  ensureObservations();
  updateNoDataWarning('mcmc');
  const obsX = gpObservations.map(o => o[0]), obsY = gpObservations.map(o => o[1]);

  const sigma = parseFloat(document.getElementById('mcmc-sigma').value);
  const totalSteps = parseInt(document.getElementById('mcmc-steps').value);

  // Pre-compute all samples
  const allSamples = [];
  let logL = Math.log(1.0), logSf = Math.log(1.0); // start at l=1, sf=1
  let accepted = 0;
  for (let i = 0; i < totalSteps; i++) {
    const logLp = logL + sigma * randn();
    const logSfp = logSf + sigma * randn();
    const lp = Math.exp(logLp), sfp = Math.exp(logSfp);
    if (lp > 0.05 && lp < 5 && sfp > 0.05 && sfp < 4) {
      const logA = gpLogPosteriorLogSpace(obsX, obsY, logLp, logSfp) - gpLogPosteriorLogSpace(obsX, obsY, logL, logSf);
      if (Math.log(Math.random()) < logA) { logL = logLp; logSf = logSfp; accepted++; }
    }
    allSamples.push([Math.exp(logL), Math.exp(logSf)]);
  }

  // Animate
  mcmcSamples = [];
  let step = 0;
  const batchSize = Math.max(1, Math.floor(totalSteps / 100)); // animate in ~100 frames
  function animate() {
    const end = Math.min(step + batchSize, totalSteps);
    for (let i = step; i < end; i++) mcmcSamples.push(allSamples[i]);
    step = end;
    mcmcCurrentParams = mcmcSamples[mcmcSamples.length - 1];
    drawHyperCanvas('mcmc-canvas', mcmcSamples, []);
    drawLiveGP('mcmc-gp-canvas', mcmcCurrentParams);
    document.getElementById('mcmc-stats').innerHTML =
      `${i18n.t('stats-step')}: <span class="stat-val">${mcmcSamples.length}/${totalSteps}</span> | ${i18n.t('stats-accept-rate')}: <span class="stat-val">${(accepted / totalSteps * 100).toFixed(1)}%</span>`;
    if (step < totalSteps) mcmcAnimId = requestAnimationFrame(animate);
    else mcmcAnimId = null;
  }
  animate();
}

document.getElementById('mcmc-sigma').addEventListener('input', (e) => { document.getElementById('mcmc-sigma-val').textContent = parseFloat(e.target.value).toFixed(2); });
document.getElementById('mcmc-steps').addEventListener('input', (e) => { document.getElementById('mcmc-steps-val').textContent = e.target.value; });
document.getElementById('btn-mcmc-run').addEventListener('click', runMCMCOnGP);

// ========================================
// HMC on GP hyperparameters
// ========================================
let hmcSamples = [];
let hmcCompareSamples = [];
let hmcCurrentParams = null;
let hmcCompareCurrentParams = null;
let hmcAnimId = null;
let hmcComparisonActive = false;

function redrawAllCanvases() {
  updateSamplerNotes();
  drawGP();
  drawHyperCanvas('mcmc-canvas', mcmcSamples, []);
  drawLiveGP('mcmc-gp-canvas', mcmcCurrentParams);
  drawHyperCanvas('hmc-canvas', hmcSamples, hmcCompareSamples);
  drawLiveGP('hmc-gp-canvas', hmcCurrentParams, hmcComparisonActive ? hmcCompareCurrentParams : null);
}

function invalidateSamplingResults() {
  if (mcmcAnimId) { cancelAnimationFrame(mcmcAnimId); mcmcAnimId = null; }
  if (hmcAnimId) { cancelAnimationFrame(hmcAnimId); hmcAnimId = null; }
  mcmcSamples = [];
  mcmcCurrentParams = null;
  hmcSamples = [];
  hmcCompareSamples = [];
  hmcCurrentParams = null;
  hmcCompareCurrentParams = null;
  hmcComparisonActive = false;
  const mcmcStats = document.getElementById('mcmc-stats');
  const hmcStats = document.getElementById('hmc-stats');
  if (mcmcStats) mcmcStats.innerHTML = '';
  if (hmcStats) hmcStats.innerHTML = '';
  updateNoDataWarning('mcmc');
  updateNoDataWarning('hmc');
  redrawAllCanvases();
}

function runHMCOnGP(withComparison) {
  if (hmcAnimId) { cancelAnimationFrame(hmcAnimId); hmcAnimId = null; }
  ensureObservations();
  updateNoDataWarning('hmc');
  // Update caption dynamically
  const captionEl = document.querySelector('[data-i18n="hmc-viz-caption"]');
  if (captionEl) {
    const key = withComparison ? 'hmc-viz-caption' : 'hmc-viz-caption-solo';
    captionEl.textContent = i18n.t(key);
  }
  const obsX = gpObservations.map(o => o[0]), obsY = gpObservations.map(o => o[1]);

  const eps = parseFloat(document.getElementById('hmc-eps').value);
  const L = parseInt(document.getElementById('hmc-L').value);
  const nSamples = 150;

  // HMC in log-space
  const allHMC = [];
  let logL = 0, logSf = 0; // start at l=1, sf=1
  let hmcAccepted = 0;
  for (let i = 0; i < nSamples; i++) {
    let pl = randn(), ps = randn();
    const H0 = -gpLogPosteriorLogSpace(obsX, obsY, logL, logSf) + 0.5 * (pl * pl + ps * ps);
    let cl = logL, cs = logSf;
    let [gl, gs] = gpLogPosteriorGradientLogSpace(obsX, obsY, cl, cs);
    pl += 0.5 * eps * gl; ps += 0.5 * eps * gs;
    for (let s = 0; s < L; s++) {
      cl += eps * pl; cs += eps * ps;
      [gl, gs] = gpLogPosteriorGradientLogSpace(obsX, obsY, cl, cs);
      if (s < L - 1) { pl += eps * gl; ps += eps * gs; }
    }
    pl += 0.5 * eps * gl; ps += 0.5 * eps * gs;
    const eL = Math.exp(cl), eSf = Math.exp(cs);
    if (eL > 0.05 && eL < 5 && eSf > 0.05 && eSf < 4) {
      const H1 = -gpLogPosteriorLogSpace(obsX, obsY, cl, cs) + 0.5 * (pl * pl + ps * ps);
      if (Math.log(Math.random()) < H0 - H1) { logL = cl; logSf = cs; hmcAccepted++; }
    }
    allHMC.push([Math.exp(logL), Math.exp(logSf)]);
  }

  // Comparison MCMC
  const allMCMC = [];
  if (withComparison) {
    let ml = 0, ms = 0;
    for (let i = 0; i < nSamples; i++) {
      const mlp = ml + 0.3 * randn(), msp = ms + 0.3 * randn();
      const elp = Math.exp(mlp), esp = Math.exp(msp);
      if (elp > 0.05 && elp < 5 && esp > 0.05 && esp < 4) {
        const logA = gpLogPosteriorLogSpace(obsX, obsY, mlp, msp) - gpLogPosteriorLogSpace(obsX, obsY, ml, ms);
        if (Math.log(Math.random()) < logA) { ml = mlp; ms = msp; }
      }
      allMCMC.push([Math.exp(ml), Math.exp(ms)]);
    }
  }

  // Animate
  hmcSamples = [];
  hmcCompareSamples = [];
  hmcCompareCurrentParams = null;
  hmcComparisonActive = withComparison;
  let step = 0;
  const batchSize = Math.max(1, Math.floor(nSamples / 80));
  function animate() {
    const end = Math.min(step + batchSize, nSamples);
    for (let i = step; i < end; i++) {
      hmcSamples.push(allHMC[i]);
      if (withComparison) hmcCompareSamples.push(allMCMC[i]);
    }
    step = end;
    hmcCurrentParams = hmcSamples[hmcSamples.length - 1];
    if (withComparison && hmcCompareSamples.length > 0) {
      hmcCompareCurrentParams = hmcCompareSamples[hmcCompareSamples.length - 1];
    }
    drawHyperCanvas('hmc-canvas', hmcSamples, withComparison ? hmcCompareSamples : []);
    drawLiveGP('hmc-gp-canvas', hmcCurrentParams, withComparison ? hmcCompareCurrentParams : null);
    document.getElementById('hmc-stats').innerHTML =
      `${i18n.t('stats-step')}: <span class="stat-val">${hmcSamples.length}/${nSamples}</span> | ${i18n.t('stats-hmc-accept')}: <span class="stat-val">${(hmcAccepted / nSamples * 100).toFixed(1)}%</span>`;
    if (step < nSamples) hmcAnimId = requestAnimationFrame(animate);
    else hmcAnimId = null;
  }
  animate();
}

document.getElementById('hmc-eps').addEventListener('input', (e) => { document.getElementById('hmc-eps-val').textContent = parseFloat(e.target.value).toFixed(2); });
document.getElementById('hmc-L').addEventListener('input', (e) => { document.getElementById('hmc-L-val').textContent = e.target.value; });
document.getElementById('btn-hmc-run').addEventListener('click', () => runHMCOnGP(false));
document.getElementById('btn-compare').addEventListener('click', () => runHMCOnGP(true));

// ── Initial Draw ──
window.addEventListener('DOMContentLoaded', () => {
  i18n.setLang(i18n._lang);
  document.querySelector('.kernel-card[data-kernel="rbf"]')?.classList.add('selected');
  updatePeriodControl();
  updateSamplerNotes();
  setTimeout(() => redrawAllCanvases(), 100);
});
window.addEventListener('resize', redrawAllCanvases);
