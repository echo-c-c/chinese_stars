// 月球页面专用脚本

document.addEventListener('DOMContentLoaded', () => {
    // 初始化页面
    initMoonPage();
    
    // 添加滚动监听
    window.addEventListener('scroll', handleMoonScroll);
    
    // 初始触发一次滚动处理
    handleMoonScroll();
    
    // 初始化视差效果
    moonParallaxEffect();
    
    // 初始化月相动画
    initPhaseAnimations();
    
    // 初始化时间线交互
    initTimelineInteraction();
    
    // 初始化事实轮播功能
    initFactCarousel();
    
    // 初始化全景图查看功能
    initPanoramaViewer();
});

// 初始化月球页面
function initMoonPage() {
    console.log('月球页面已初始化');
    
    // 添加页面入场动画
    document.body.classList.add('fade-in');
    
    // 初始化卡片浮动效果
    initCardFloating();
}

// 处理月球页面滚动效果
function handleMoonScroll() {
    const scrollPosition = window.scrollY;
    
    // 视差效果处理
    const moonHero = document.querySelector('.moon-hero');
    const moonImage = document.querySelector('.moon-image');
    const starsLayer = document.querySelector('.stars-layer');
    const cloudsLayer = document.querySelector('.clouds-layer');
    
    if (moonHero && moonImage && starsLayer && cloudsLayer) {
        const heroHeight = moonHero.offsetHeight;
        const scrollRatio = Math.min(scrollPosition / heroHeight, 1);
        
        // 月亮上移效果
        moonImage.style.transform = `translateY(calc(-50% - ${scrollRatio * 30}px))`;
        
        // 云层速度调整
        cloudsLayer.style.animationDuration = `${60 - scrollRatio * 20}s`;
        
        // 星星层视差
        starsLayer.style.transform = `translateY(${scrollRatio * 50}px)`;
    }
    
    // 检测并触发元素动画
    animateOnScroll('.moon-card', 'card-visible', 0.8);
    animateOnScroll('.moon-earth-section', 'section-visible', 0.7);
    animateOnScroll('.footer-navigation', 'nav-visible', 0.9);
}

// 滚动到视图中时添加动画类
function animateOnScroll(selector, className, threshold = 0.8) {
    const elements = document.querySelectorAll(selector);
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = windowHeight * threshold;
        
        if (elementTop < elementVisible) {
            element.classList.add(className);
        }
    });
}

// 月球页面视差效果
function moonParallaxEffect() {
    const moonParallax = document.querySelector('.moon-parallax');
    
    if (moonParallax) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moonImage = document.querySelector('.moon-image');
            const starsLayer = document.querySelector('.stars-layer');
            
            if (moonImage && starsLayer) {
                // 月亮轻微移动
                const moveX = (mouseX - 0.5) * 20;
                const moveY = (mouseY - 0.5) * 20;
                
                moonImage.style.transform = `translateY(-50%) translate(${moveX}px, ${moveY}px)`;
                
                // 星星层反向移动
                starsLayer.style.transform = `translate(${-moveX * 0.5}px, ${-moveY * 0.5}px)`;
            }
        });
    }
}

// 初始化月相动画
function initPhaseAnimations() {
    const phaseItems = document.querySelectorAll('.phase-item');
    
    phaseItems.forEach(item => {
        const phase = item.querySelector('.phase-animation');
        const phaseImg = item.querySelector('.phase-img');
        
        if (phase) {
            item.addEventListener('mouseenter', () => {
                // 添加悬停时的脉动效果
                phase.style.transform = 'scale(1.1)';
                phase.style.boxShadow = '0 0 30px rgba(143, 184, 255, 0.5)';
                phase.style.transition = 'all 0.3s ease';
                
                // 为特定的月相添加特殊效果
                if (item.querySelector('h3').textContent === '满月') {
                    phaseImg.style.filter = 'brightness(1.2)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                // 恢复原始状态
                phase.style.transform = 'scale(1)';
                phase.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                
                if (item.querySelector('h3').textContent === '满月') {
                    phaseImg.style.filter = 'brightness(1)';
                }
            });
        }
    });
    
    // 为月相图片添加加载完成后的过渡效果
    const phaseImages = document.querySelectorAll('.phase-img');
    phaseImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
            }, 100);
        });
        
        // 如果图片已经在缓存中，则手动触发加载事件
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // 添加月相循环动画
    setupPhaseSequence();
}

// 设置月相序列动画
function setupPhaseSequence() {
    const moonPhasesSection = document.querySelector('.moon-phases-section');
    
    if (moonPhasesSection) {
        // 当滚动到月相部分时，添加序列动画
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const phaseItems = document.querySelectorAll('.phase-item');
                    
                    // 依次高亮每个月相，模拟月相变化
                    let currentIndex = 0;
                    const highlightInterval = setInterval(() => {
                        // 重置所有项
                        phaseItems.forEach(item => {
                            item.style.transform = 'translateY(0)';
                            item.style.borderColor = 'rgba(194, 197, 204, 0.1)';
                            const phaseAnimation = item.querySelector('.phase-animation');
                            if (phaseAnimation) {
                                phaseAnimation.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                            }
                        });
                        
                        // 高亮当前项
                        if (phaseItems[currentIndex]) {
                            phaseItems[currentIndex].style.transform = 'translateY(-10px)';
                            phaseItems[currentIndex].style.borderColor = 'var(--moon-accent)';
                            const phaseAnimation = phaseItems[currentIndex].querySelector('.phase-animation');
                            if (phaseAnimation) {
                                phaseAnimation.style.boxShadow = '0 0 30px rgba(143, 184, 255, 0.5)';
                            }
                        }
                        
                        currentIndex = (currentIndex + 1) % phaseItems.length;
                        
                    }, 2000); // 每2秒切换一次
                    
                    // 在用户交互时停止自动高亮
                    phaseItems.forEach(item => {
                        item.addEventListener('mouseenter', () => {
                            clearInterval(highlightInterval);
                        });
                    });
                    
                    // 当滚出视图时，清除定时器
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(moonPhasesSection);
    }
}

// 初始化卡片浮动效果
function initCardFloating() {
    const moonCards = document.querySelectorAll('.moon-card');
    
    moonCards.forEach(card => {
        // 为每个卡片添加随机浮动动画
        const floatDuration = 3 + Math.random() * 2; // 3-5秒
        const floatDelay = Math.random() * 2; // 0-2秒延迟
        const translateY = 5 + Math.random() * 5; // 5-10px上下移动
        
        card.style.animation = `float ${floatDuration}s ease-in-out ${floatDelay}s infinite alternate`;
        card.style.setProperty('--float-translate-y', `${translateY}px`);
        
        // 添加鼠标移入效果
        card.addEventListener('mouseenter', () => {
            // 暂停浮动动画
            card.style.animationPlayState = 'paused';
            
            // 添加发光效果
            const backdrop = card.querySelector('.card-backdrop');
            if (backdrop) {
                backdrop.style.opacity = '0.8';
                backdrop.style.filter = 'blur(20px)';
            }
            
            // 添加阴影
            card.style.boxShadow = '0 15px 30px rgba(143, 184, 255, 0.4)';
        });
        
        // 添加鼠标移出效果
        card.addEventListener('mouseleave', () => {
            // 恢复浮动动画
            card.style.animationPlayState = 'running';
            
            // 恢复原有样式
            const backdrop = card.querySelector('.card-backdrop');
            if (backdrop) {
                backdrop.style.opacity = '0.5';
                backdrop.style.filter = 'blur(10px)';
            }
            
            // 恢复阴影
            card.style.boxShadow = '0 10px 20px rgba(143, 184, 255, 0.2)';
        });
    });
    
    // 为特征项添加悬停效果
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// 初始化时间线交互
function initTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        // 添加悬停效果
        item.addEventListener('mouseenter', () => {
            // 高亮当前项
            item.style.transform = 'translateX(10px)';
            item.style.borderColor = 'var(--moon-accent)';
            
            // 高亮日期
            const date = item.querySelector('.date');
            if (date) {
                date.style.color = 'var(--moon-accent)';
                date.style.fontWeight = 'bold';
            }
            
            // 高亮标题
            const title = item.querySelector('h4');
            if (title) {
                title.style.color = 'white';
            }
        });
        
        // 添加移出效果
        item.addEventListener('mouseleave', () => {
            // 恢复样式
            item.style.transform = 'translateX(0)';
            item.style.borderColor = 'rgba(194, 197, 204, 0.1)';
            
            // 恢复日期样式
            const date = item.querySelector('.date');
            if (date) {
                date.style.color = 'var(--text-secondary)';
                date.style.fontWeight = 'normal';
            }
            
            // 恢复标题样式
            const title = item.querySelector('h4');
            if (title) {
                title.style.color = 'var(--text-primary)';
            }
        });
    });
    
    // 为"未来"时间线项添加特殊效果
    const futureItems = document.querySelectorAll('.timeline-item.future');
    futureItems.forEach(item => {
        // 添加脉动效果
        item.style.animation = 'pulse 2s infinite alternate';
        
        // 添加特殊边框
        item.style.borderColor = 'rgba(143, 184, 255, 0.3)';
        
        // 添加标签
        const label = document.createElement('div');
        label.className = 'future-label';
        label.innerText = '未来';
        label.style.position = 'absolute';
        label.style.top = '-10px';
        label.style.right = '10px';
        label.style.background = 'var(--moon-accent)';
        label.style.color = 'black';
        label.style.padding = '2px 8px';
        label.style.borderRadius = '10px';
        label.style.fontSize = '12px';
        label.style.fontWeight = 'bold';
        
        item.style.position = 'relative';
        item.appendChild(label);
    });
}

// 初始化事实轮播功能
function initFactCarousel() {
    const factCarousel = document.querySelector('.fact-carousel');
    if (!factCarousel) return;
    
    const slides = factCarousel.querySelectorAll('.fact-slide');
    const dots = factCarousel.querySelectorAll('.fact-dot');
    let currentSlide = 0;
    let slideInterval;
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // 自动切换幻灯片
    function startSlideShow() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }, 5000);
    }
    
    // 设置点击导航
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            startSlideShow();
        });
    });
    
    // 开始自动播放
    startSlideShow();
}

// 初始化全景图查看功能
function initPanoramaViewer() {
    const panoramaOverlay = document.querySelector('.panorama-overlay');
    const panoramaImg = document.querySelector('.panorama-viewer img');
    
    if (panoramaOverlay && panoramaImg) {
        panoramaOverlay.addEventListener('click', () => {
            // 创建全屏查看器
            const viewer = document.createElement('div');
            viewer.className = 'fullscreen-panorama';
            viewer.style.position = 'fixed';
            viewer.style.top = '0';
            viewer.style.left = '0';
            viewer.style.width = '100%';
            viewer.style.height = '100%';
            viewer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            viewer.style.zIndex = '9999';
            viewer.style.display = 'flex';
            viewer.style.alignItems = 'center';
            viewer.style.justifyContent = 'center';
            viewer.style.opacity = '0';
            viewer.style.transition = 'opacity 0.3s ease';
            
            // 添加全屏图片
            const fullImg = document.createElement('img');
            fullImg.src = panoramaImg.src;
            fullImg.style.maxWidth = '90%';
            fullImg.style.maxHeight = '90%';
            fullImg.style.borderRadius = '5px';
            fullImg.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.5)';
            fullImg.style.cursor = 'move';
            
            // 添加关闭按钮
            const closeBtn = document.createElement('button');
            closeBtn.innerText = '关闭';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '20px';
            closeBtn.style.padding = '10px 20px';
            closeBtn.style.background = 'var(--moon-accent)';
            closeBtn.style.color = 'black';
            closeBtn.style.border = 'none';
            closeBtn.style.borderRadius = '5px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.fontWeight = 'bold';
            
            // 添加元素到查看器
            viewer.appendChild(fullImg);
            viewer.appendChild(closeBtn);
            
            // 添加查看器到页面
            document.body.appendChild(viewer);
            
            // 显示查看器
            setTimeout(() => {
                viewer.style.opacity = '1';
            }, 10);
            
            // 实现拖动功能
            let isDragging = false;
            let startX, startY, initialX, initialY;
            let xOffset = 0, yOffset = 0;
            
            fullImg.addEventListener('mousedown', (e) => {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
                isDragging = true;
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
            
            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    e.preventDefault();
                    xOffset = e.clientX - initialX;
                    yOffset = e.clientY - initialY;
                    
                    fullImg.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                }
            });
            
            // 关闭按钮事件
            closeBtn.addEventListener('click', () => {
                viewer.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(viewer);
                }, 300);
            });
        });
        
        // 添加悬停效果
        panoramaOverlay.addEventListener('mouseenter', () => {
            panoramaOverlay.style.opacity = '1';
        });
        
        panoramaOverlay.addEventListener('mouseleave', () => {
            panoramaOverlay.style.opacity = '0.7';
        });
    }
}

// 为全屏预览添加样式
const panoramaStyle = document.createElement('style');
panoramaStyle.textContent = `
    .fullscreen-panorama {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .fullscreen-panorama img {
        max-width: 90%;
        max-height: 90%;
        border-radius: 5px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }
    
    .fullscreen-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(26, 26, 46, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .fullscreen-close:hover {
        background: var(--moon-accent);
        transform: scale(1.1);
    }
    
    .fullscreen-close i {
        color: white;
        font-size: 20px;
    }
`;
document.head.appendChild(panoramaStyle); 