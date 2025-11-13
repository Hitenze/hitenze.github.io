/**
 * Research Network Visualization Module
 * Handles both card layout and future D3.js network visualization
 */

(function() {
    'use strict';
    
    // Configuration for research data structure
    const researchData = {
        core: [
            {
                id: 'preconditioning',
                label: 'Preconditioning',
                description: 'Advanced techniques for accelerating iterative solvers',
                icon: '🔧',
                connections: ['linear-systems', 'eigenvalue', 'optimization']
            },
            {
                id: 'hpc',
                label: 'High-Performance Computing',
                description: 'Parallel algorithms and GPU acceleration',
                icon: '⚡',
                connections: ['linear-systems', 'eigenvalue', 'optimization', 'gaussian-process', 'operator-learning', 'physics-simulation', 'inverse-problems']
            }
        ],
        technical: {
            classical: [
                {
                    id: 'linear-systems',
                    label: 'Linear Systems',
                    description: 'Sparse matrix solvers and Krylov methods',
                    icon: '📐'
                },
                {
                    id: 'eigenvalue',
                    label: 'Eigenvalue Problems',
                    description: 'Large-scale eigensolvers',
                    icon: '🎯'
                },
                {
                    id: 'optimization',
                    label: 'Optimization',
                    description: 'Convex and non-convex algorithms',
                    icon: '📈'
                }
            ],
            ml: [
                {
                    id: 'gaussian-process',
                    label: 'Gaussian Processes',
                    description: 'Scalable GP methods',
                    icon: '🧠',
                    connections: ['physics-simulation', 'inverse-problems']
                },
                {
                    id: 'operator-learning',
                    label: 'Operator Learning',
                    description: 'Neural operators and physics-informed learning',
                    icon: '🔄',
                    connections: ['physics-simulation', 'inverse-problems']
                }
            ]
        },
        applications: [
            {
                id: 'physics-simulation',
                label: 'Physics Simulation',
                description: 'Computational physics and PDE solvers',
                icon: '⚛️'
            },
            {
                id: 'inverse-problems',
                label: 'Inverse Problems',
                description: 'Data-driven discovery',
                icon: '🔍'
            }
        ]
    };
    
    // Main initialization function
    function initResearchVisualization() {
        // Check screen size and capabilities
        const isDesktop = window.innerWidth > 768;
        const supportsD3 = checkD3Support();
        
        // Future: Initialize D3.js network for desktop
        if (isDesktop && supportsD3) {
            // Placeholder for D3.js network initialization
            initD3Network();
        } else {
            // Ensure card layout is visible
            ensureCardLayout();
        }
        
        // Add card interactions
        initCardInteractions();
        
        // Handle window resize
        window.addEventListener('resize', handleResize);
    }
    
    // Check if D3.js is available and should be used
    function checkD3Support() {
        // Check if D3 library is loaded (for future implementation)
        return typeof d3 !== 'undefined' && window.innerWidth > 1024;
    }
    
    // Initialize D3.js network visualization (placeholder for future)
    function initD3Network() {
        const container = document.getElementById('research-network-container');
        
        // Only proceed if D3.js is actually loaded
        if (typeof d3 === 'undefined') {
            console.log('D3.js not loaded - using card layout');
            return;
        }
        
        // Show network container, hide cards
        container.style.display = 'block';
        document.getElementById('research-cards-container').style.display = 'none';
        
        // TODO: Implement D3.js force-directed network graph
        // This is where the D3.js visualization will be implemented
        console.log('D3.js network visualization ready for implementation');
        
        // Example structure for future D3.js implementation:
        /*
        const width = container.offsetWidth;
        const height = 500;
        
        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
            
        // Create force simulation
        const simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(d => d.id))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));
            
        // Add nodes and links...
        */
    }
    
    // Ensure card layout is visible
    function ensureCardLayout() {
        const networkContainer = document.getElementById('research-network-container');
        const cardsContainer = document.getElementById('research-cards-container');
        
        if (networkContainer) networkContainer.style.display = 'none';
        if (cardsContainer) cardsContainer.style.display = 'block';
    }
    
    // Initialize card interactions
    function initCardInteractions() {
        const cards = document.querySelectorAll('.research-card');
        
        cards.forEach(card => {
            // Add click handler for future expansion
            card.addEventListener('click', function() {
                const topic = this.dataset.topic;
                handleCardClick(topic);
            });
            
            // Add keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const topic = this.dataset.topic;
                    handleCardClick(topic);
                }
            });
        });
    }
    
    // Handle card click events
    function handleCardClick(topic) {
        // Future: This could link to publications, expand details, or filter content
        console.log('Research topic clicked:', topic);
        
        // Example: Smooth scroll to publications section filtered by topic
        // const publicationsSection = document.querySelector('.publications');
        // if (publicationsSection) {
        //     publicationsSection.scrollIntoView({ behavior: 'smooth' });
        //     filterPublicationsByTopic(topic);
        // }
    }
    
    // Handle window resize events
    function handleResize() {
        const isDesktop = window.innerWidth > 768;
        const supportsD3 = checkD3Support();
        
        if (isDesktop && supportsD3) {
            // Switch to D3 network if available
            initD3Network();
        } else {
            // Switch to card layout
            ensureCardLayout();
        }
    }
    
    // Export research data for potential D3.js use
    window.ResearchNetwork = {
        data: researchData,
        init: initResearchVisualization,
        initD3: initD3Network
    };
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initResearchVisualization);
    } else {
        initResearchVisualization();
    }
    
})();