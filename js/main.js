import { loadData } from './data.js';
import { renderCategories, renderLinks, renderCategoriesList } from './render.js';
import { setupEventListeners } from './events.js';
import { showHome, showAdmin, selectCategory } from './navigation.js';
import { editLink, deleteLink, editCategory, deleteCategory } from './forms.js';

// 初始化函数
async function init() {
  await loadData();
  renderCategories();
  renderLinks();
  setupEventListeners();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);

// 监听URL变化，处理哈希导航
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#admin') {
    showAdmin();
  } else {
    showHome();
  }
});

// 全局函数，供HTML中直接调用
window.editLink = editLink;
window.deleteLink = deleteLink;
window.editCategory = editCategory;
window.deleteCategory = deleteCategory;
window.selectCategory = selectCategory;
window.renderCategoriesList = renderCategoriesList;

