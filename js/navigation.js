import { elements } from './elements.js';
import { categories, appState } from './data.js';
import { renderLinks, renderCategoriesList } from './render.js';
import { resetForm } from './forms.js';

// 切换到后台管理
function showAdmin() {
  elements.homeSection.style.display = 'none';
  elements.aboutSection.style.display = 'none';
  elements.adminSection.style.display = 'block';
  
  // 显示登录表单，隐藏管理内容
  document.getElementById('login-form-container').style.display = 'block';
  document.getElementById('admin-content').style.display = 'none';
  
  // 更新导航链接状态
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
  });
  elements.adminLink.classList.add('active');
}

// 切换到主页
function showHome() {
  elements.adminSection.style.display = 'none';
  elements.aboutSection.style.display = 'none';
  elements.homeSection.style.display = 'block';
  
  // 更新导航链接状态
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.category === appState.currentCategory) {
      link.classList.add('active');
    }
  });
  
  // 重置表单
  resetForm();
}

// 切换到关于我们页面
function showAbout() {
  elements.homeSection.style.display = 'none';
  elements.adminSection.style.display = 'none';
  elements.aboutSection.style.display = 'block';
  
  // 更新导航链接状态
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
  });
}

// 选择分类
function selectCategory(categoryId) {
  appState.currentCategory = categoryId.toString();
  showHome();
  renderLinks();
  
  // 更新导航链接状态
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.category === appState.currentCategory) {
      link.classList.add('active');
    }
  });
}

export { showAdmin, showHome, showAbout, selectCategory };