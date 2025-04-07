// 创建星星背景
function createStars() {
    // 检查是否已存在星星背景，避免重复创建
    if (document.querySelector('.star-background')) return;
    
    // 创建星星容器
    const starBackground = document.createElement('div');
    starBackground.classList.add('star-background');
    document.body.appendChild(starBackground);
    
    const numberOfStars = 350; // 增加星星数量，使效果更明显
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // 随机位置
        const x = Math.random() * 100; // 使用百分比定位
        const y = Math.random() * 100;
        
        // 随机大小类
        const sizeClass = Math.random();
        if (sizeClass < 0.6) {
            star.classList.add('star-small');
        } else if (sizeClass < 0.9) {
            star.classList.add('star-medium');
        } else {
            star.classList.add('star-large');
        }
        
        // 随机动画时间和延迟
        const duration = 1.5 + Math.random() * 3; // 缩短动画时间
        const delay = Math.random() * 3;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--twinkle-duration', `${duration}s`);
        star.style.setProperty('--twinkle-delay', `${delay}s`);
        
        // 随机初始透明度
        star.style.opacity = (0.3 + Math.random() * 0.7).toString();
        
        starBackground.appendChild(star);
    }
    
    console.log('星星已创建:', document.querySelectorAll('.star').length);
}

// 确保星星在页面加载时立即创建，不等待DOMContentLoaded
(function() {
    // 在页面加载时立即执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createStars);
    } else {
        createStars();
    }
})();

// 处理滚动效果
function handleScroll() {
    const scrollPosition = window.scrollY;
    const items = document.querySelectorAll('.structure-item');
    const planetSections = document.querySelectorAll('.planet-detail-section');
    
    items.forEach((item, index) => {
        const delay = index * 0.1;
        const triggerPosition = item.offsetTop - window.innerHeight * 0.8;
        
        if (scrollPosition > triggerPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transitionDelay = `${delay}s`;
        }
    });
    
    // 处理行星详细信息部分的显示
    planetSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

// 平滑滚动
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 视差效果
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

// 页面切换动画
function setupPageTransitions() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 只有当点击的不是当前活动页面时才执行动画
            if (!this.classList.contains('active')) {
                e.preventDefault();
                
                const targetHref = this.getAttribute('href');
                const currentPage = document.body;
                
                // 根据目标页面类型选择不同的过渡效果
                let transitionClass = 'fade-out';
                
                if (this.classList.contains('structure-link')) {
                    transitionClass = 'slide-left-out';
                } else if (this.classList.contains('planet-link')) {
                    transitionClass = 'zoom-out';
                } else if (this.classList.contains('sun-link')) {
                    transitionClass = 'fade-out-bright';
                } else if (this.classList.contains('moon-link')) {
                    transitionClass = 'slide-right-out';
                }
                
                // 添加过渡动画类
                currentPage.classList.add(transitionClass);
                
                // 动画结束后跳转到新页面
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500); // 与CSS动画时间匹配
            }
        });
    });
}

// 添加星星跟随鼠标移动的效果
function setupStarMouseEffect() {
    const starBackground = document.querySelector('.star-background');
    if (!starBackground) {
        // 如果没有星星背景，则不执行
        console.log('未找到星星背景，无法应用鼠标效果');
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let movementTimeout;
    let animationFrameId;
    
    // 捕获鼠标位置
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        isMoving = true;
        clearTimeout(movementTimeout);
        
        // 如果鼠标停止移动3秒，重置isMoving
        movementTimeout = setTimeout(() => {
            isMoving = false;
        }, 3000);
    });
    
    // 星星跟随鼠标微移动
    function animateStars() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            // 每颗星星的移动幅度不同，形成视差效果
            const moveFactorX = ((index % 5) - 2) * 0.3; // 增大移动范围
            const moveFactorY = (Math.floor(index / 5) % 5 - 2) * 0.3;
            
            // 计算移动距离
            const moveX = (mouseX - 0.5) * moveFactorX; 
            const moveY = (mouseY - 0.5) * moveFactorY;
            
            // 平滑移动
            star.style.transform = `translate(${moveX}%, ${moveY}%)`;
        });
        
        animationFrameId = requestAnimationFrame(animateStars);
    }
    
    // 启动动画
    animateStars();
    console.log('星星鼠标跟随效果已初始化');
}

// 自动启动星星鼠标跟随效果
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupStarMouseEffect);
    } else {
        setupStarMouseEffect();
    }
})();

// 随机创建流星
function createMeteors() {
    // 确保有星星背景容器
    let starBackground = document.querySelector('.star-background');
    if (!starBackground) {
        // 如果没有星星背景，先创建一个
        createStars();
        starBackground = document.querySelector('.star-background');
        if (!starBackground) return; // 仍然失败则退出
    }
    
    // 清除可能存在的旧定时器
    if (window.meteorInterval) {
        clearInterval(window.meteorInterval);
    }
    
    // 每隔一段时间创建一个流星
    window.meteorInterval = setInterval(() => {
        // 30%的概率创建流星，提高出现概率
        if (Math.random() > 0.3) return;
        
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        
        // 随机位置和角度
        const startX = Math.random() * 100;
        const startY = -5; // 从顶部开始
        const angle = 15 + Math.random() * 30; // 15-45度角
        const length = 100 + Math.random() * 150; // 流星长度
        
        // 设置流星位置和样式
        meteor.style.left = `${startX}%`;
        meteor.style.top = `${startY}%`;
        meteor.style.transform = `rotate(${angle}deg)`;
        meteor.style.setProperty('--meteor-length', `${length}px`);
        
        // 添加到背景
        starBackground.appendChild(meteor);
        
        // 流星动画结束后移除元素
        setTimeout(() => {
            try {
                starBackground.removeChild(meteor);
            } catch(e) {
                // 忽略可能的移除错误
            }
        }, 2000);
    }, 5000); // 每5秒创建一次流星的机会，调整更适合移动设备
}

// 初始化移动导航菜单
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // 确保这些元素存在
    if (!menuToggle || !navLinks) {
        console.log('移动菜单元素不存在，无法初始化导航菜单');
        return;
    }
    
    // 确保菜单按钮可见
    menuToggle.style.display = 'flex';
    
    // 点击事件处理
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // 更改图标，如果有子元素
        if (this.querySelector('i')) {
            if (navLinks.classList.contains('active')) {
                this.querySelector('i').classList.remove('fa-bars');
                this.querySelector('i').classList.add('fa-times');
            } else {
                this.querySelector('i').classList.remove('fa-times');
                this.querySelector('i').classList.add('fa-bars');
            }
        }
    });
    
    // 点击导航链接也关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle.querySelector('i')) {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle.querySelector('i')) {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        }
    });
    
    // 窗口大小变化处理
    window.addEventListener('resize', () => {
        // 如果窗口宽度大于移动屏幕宽度，不论菜单状态都恢复原始状态
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle.querySelector('i')) {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        }
    });
    
    console.log('移动菜单已成功初始化');
}

// 确保所有功能在DOM加载后启动
document.addEventListener('DOMContentLoaded', function() {
    // 星空和视觉效果
    createStars();
    createMeteors();
    setupStarMouseEffect();
    
    // 导航和交互
    smoothScroll();
    parallaxEffect();
    setupPageTransitions();
    
    // 滚动效果
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始触发一次滚动处理
    
    // 移动导航
    initMobileMenu();
    
    // 额外检查，确保移动菜单按钮可见，可能被其他CSS规则覆盖
    setTimeout(() => {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (menuToggle && menuToggle.style.display !== 'flex') {
            console.log('修正移动菜单按钮可见性');
            menuToggle.style.display = 'flex';
        }
    }, 1000);
    
    console.log('页面功能已完全初始化');
});

// 在窗口大小变化时重新计算星星效果，优化性能
window.addEventListener('resize', function() {
    if (window.resizeTimeout) {
        clearTimeout(window.resizeTimeout);
    }
    
    window.resizeTimeout = setTimeout(() => {
        // 移除旧星星和流星
        const oldStarBackground = document.querySelector('.star-background');
        if (oldStarBackground) {
            document.body.removeChild(oldStarBackground);
        }
        
        // 清除现有流星定时器
        if (window.meteorInterval) {
            clearInterval(window.meteorInterval);
        }
        
        // 重新创建星星和流星
        createStars();
        createMeteors();
        setupStarMouseEffect();
    }, 300);
});

// 为不同页面添加特定类
function setPageClasses() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('planet.html')) {
        document.body.classList.add('planet-page');
    } else if (currentPath.includes('sun.html')) {
        document.body.classList.add('sun-page');
    } else if (currentPath.includes('moon.html')) {
        document.body.classList.add('moon-page');
    } else {
        document.body.classList.add('structure-page');
    }
}

// 在DOM加载时设置页面特定类
document.addEventListener('DOMContentLoaded', setPageClasses); 