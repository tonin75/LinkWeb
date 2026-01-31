// DOM元素
const elements = {
  homeSection: document.getElementById('home-section'),
  aboutSection: document.getElementById('about-section'),
  adminSection: document.getElementById('admin-section'),
  categoryTitle: document.getElementById('category-title'),
  linksGrid: document.getElementById('links-grid'),
  linkForm: document.getElementById('link-form'),
  linkId: document.getElementById('link-id'),
  formTitle: document.getElementById('form-title'),
  submitBtn: document.getElementById('submit-btn'),
  cancelBtn: document.getElementById('cancel-btn'),
  linksList: document.getElementById('links-list'),
  categorySelect: document.getElementById('categoryId'),
  navLinks: document.querySelectorAll('.nav-link'),
  adminLink: document.querySelector('.admin-link'),
  aboutLink: document.querySelector('.top-nav-links a:nth-child(2)')
};

// 更新导航链接引用
function updateNavLinks() {
  elements.navLinks = document.querySelectorAll('.nav-link');
}

export { elements, updateNavLinks };