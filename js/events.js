import { elements } from './elements.js';
import { submitForm, submitCategoryForm, resetForm, resetCategoryForm, showCategoryForm, resetCategories } from './forms.js';
import { showAdmin, showHome, showAbout, selectCategory } from './navigation.js';

import { renderCategoriesList } from './render.js';
import { appState } from './data.js';

// 处理登录表单提交
function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // 验证用户名和密码
  if (username === '1' && password === '1') {
    appState.isLoggedIn = true;
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
    document.getElementById('login-error').style.display = 'none';
    
    // 渲染分类列表
    renderCategoriesList();
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
}



// 设置事件监听器
function setupEventListeners() {
  // 链接表单提交
  elements.linkForm.addEventListener('submit', submitForm);
  
  // 取消按钮
  elements.cancelBtn.addEventListener('click', resetForm);
  
  // 登录表单提交
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // 后台管理链接
  elements.adminLink.addEventListener('click', (e) => {
    e.preventDefault();
    showAdmin();
  });
  
  // 关于我们链接
  elements.aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    showAbout();
  });
  
  // 首页链接
  const homeNavLink = document.querySelector('.top-nav-links a:nth-child(1)');
  if (homeNavLink) {
    homeNavLink.addEventListener('click', (e) => {
      e.preventDefault();
      selectCategory('all');
      showHome();
    });
  }
  
  // 全部链接按钮
  const homeLink = document.querySelector('.nav-link[data-category="all"]');
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      selectCategory('all');
      showHome();
    });
  }
  
  // 添加分类按钮
  const addCategoryBtn = document.getElementById('add-category-btn');
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', () => {
      resetCategoryForm();
      showCategoryForm();
    });
  }
  
  // 重置分类按钮
  const resetCategoriesBtn = document.getElementById('reset-categories-btn');
  if (resetCategoriesBtn) {
    resetCategoriesBtn.addEventListener('click', resetCategories);
  }
  
  // 取消分类按钮
  const cancelCategoryBtn = document.getElementById('cancel-category-btn');
  if (cancelCategoryBtn) {
    cancelCategoryBtn.addEventListener('click', () => {
      document.getElementById('category-form-container').style.display = 'none';
      resetCategoryForm();
    });
  }
  
  // 分类表单提交
  const categoryForm = document.getElementById('category-form');
  if (categoryForm) {
    categoryForm.addEventListener('submit', submitCategoryForm);
  }
  
  // 标签页切换
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      // 移除所有标签页按钮的激活状态
      tabBtns.forEach(btn => btn.classList.remove('active'));
      // 添加当前标签页按钮的激活状态
      tabBtn.classList.add('active');
      
      // 获取目标标签页ID
      const targetTab = tabBtn.dataset.tab;
      
      // 隐藏所有标签页内容
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(content => content.classList.remove('active'));
      
      // 显示目标标签页内容
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
  

}

export { handleLogin, setupEventListeners };