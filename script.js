// 管理员账号密码（直接保存在JS中）
const adminCredentials = {
  username: '1',
  password: '1'
};

// 登录状态
let isLoggedIn = false;

// 初始分类数据
const initialCategories = [
  { id: 1, name: '游戏网站55555', icon: '🤖' },
  { id: 2, name: '开发工具', icon: '💻' },
  { id: 3, name: '设计工具', icon: '🎨' },
  { id: 4, name: '学习资源', icon: '📚' },
  { id: 5, name: '娱乐网站', icon: '🎮' },
  { id: 6, name: '其它工具', icon: '🤖' }
];

// 编辑中的分类
let editingCategory = null;

// 图标列表
const iconList = [
  '🎮', '💻', '🎨', '📚', '🎯', '🤖', '🔧', '📱', '🎬', '🎵',
  '🏠', '🌍', '🔍', '📧', '💼', '💰', '📅', '📊', '🎁', '🎉',
  '🔥', '⭐', '💡', '🌟', '🌈', '🌺', '🌸', '🌼', '🍀', '🌱',
  '🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🔒', '🔑', '💾', '📁', '📄', '📋', '📌', '📍', '🔗', '📎'
];

// 初始链接数据
const initialLinks = [
  {
    id: 1,
    title: 'Trae AI编程助手',
    url: 'https://trae-ai.com',
    description: 'AI辅助编程工具，提高开发效率',
    icon: '🧠',
    categoryId: 1,
    color: '#00bcd4'
  },
  {
    id: 2,
    title: 'GitHub',
    url: 'https://github.com',
    description: '全球最大的代码托管平台',
    icon: '📁',
    categoryId: 2,
    color: '#333333'
  },
  {
    id: 3,
    title: 'Figma',
    url: 'https://figma.com',
    description: '在线设计协作工具',
    icon: '🎨',
    categoryId: 3,
    color: '#ff6b6b'
  },
  {
    id: 4,
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Web开发文档',
    icon: '📚',
    categoryId: 4,
    color: '#2196f3'
  },
  {
    id: 5,
    title: 'YouTube',
    url: 'https://youtube.com',
    description: '视频分享平台',
    icon: '🎬',
    categoryId: 5,
    color: '#ff0000'
  }
];

// 全局变量
let categories = [];
let links = [];
let currentCategory = 'all';
let editingLink = null;

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

// 初始化函数
function init() {
  loadData();
  renderCategories();
  renderLinks();
  setupEventListeners();
}

// 从localStorage加载数据
function loadData() {
  // 加载分类
  const savedCategories = localStorage.getItem('categories');
  if (savedCategories) {
    const parsedCategories = JSON.parse(savedCategories);
    if (parsedCategories.length > 0) {
      categories = parsedCategories;
    } else {
      categories = initialCategories;
      localStorage.setItem('categories', JSON.stringify(initialCategories));
    }
  } else {
    categories = initialCategories;
    localStorage.setItem('categories', JSON.stringify(initialCategories));
  }

  // 加载链接
  const savedLinks = localStorage.getItem('links');
  if (savedLinks) {
    const parsedLinks = JSON.parse(savedLinks);
    if (parsedLinks.length > 0) {
      links = parsedLinks;
    } else {
      links = initialLinks;
      localStorage.setItem('links', JSON.stringify(initialLinks));
    }
  } else {
    links = initialLinks;
    localStorage.setItem('links', JSON.stringify(initialLinks));
  }
}



// 保存数据到localStorage
function saveData() {
  localStorage.setItem('categories', JSON.stringify(categories));
  localStorage.setItem('links', JSON.stringify(links));
}

// 渲染分类导航
function renderCategories() {
  // 清空现有的分类导航
  const navList = document.querySelector('.sidebar > ul:nth-child(2)');
  if (!navList) {
    console.error('无法找到分类导航容器');
    return;
  }
  navList.innerHTML = '';

  // 清空分类选择
  elements.categorySelect.innerHTML = '<option value="">选择分类</option>';

  // 渲染分类导航和选择
  categories.forEach(category => {
    // 检查是否是图片URL
    const isImageUrl = category.icon.startsWith('http://') || category.icon.startsWith('https://') || 
                      (category.icon.includes('.') && (category.icon.includes('.jpg') || category.icon.includes('.jpeg') || 
                      category.icon.includes('.png') || category.icon.includes('.gif') || category.icon.includes('.svg')));
    
    // 渲染导航项
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'nav-link';
    a.dataset.category = category.id;
    
    if (isImageUrl) {
      a.innerHTML = `
        <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 10px; display: inline-flex; align-items: center; justify-content: center; background-color: #333;">
          <img src="${category.icon}" style="width: 32px; height: 32px; object-fit: contain;">
        </div>
        <span style="vertical-align: middle;">${category.name}</span>
      `;
    } else {
      a.innerHTML = `
        <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #333; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px;">
          <span style="font-size: 20px;">${category.icon}</span>
        </div>
        <span>${category.name}</span>
      `;
    }
    
    a.addEventListener('click', (e) => {
      e.preventDefault();
      selectCategory(category.id);
    });
    li.appendChild(a);
    navList.appendChild(li);

    // 渲染选择项
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = isImageUrl ? `${category.name}` : `${category.icon} ${category.name}`;
    elements.categorySelect.appendChild(option);
  });

  // 更新导航链接引用
  elements.navLinks = document.querySelectorAll('.nav-link');
}

// 渲染链接
function renderLinks() {
  // 过滤链接
  const filteredLinks = currentCategory === 'all' 
    ? links 
    : links.filter(link => link.categoryId === parseInt(currentCategory));

  // 清空链接网格
  elements.linksGrid.innerHTML = '';

  // 渲染链接卡片
  filteredLinks.forEach(link => {
    const linkCard = document.createElement('div');
    linkCard.className = 'link-card';
    
    const category = categories.find(c => c.id === link.categoryId);
    
    // 检测图标是否为图片URL
    const isImageUrl = link.icon.startsWith('http://') || link.icon.startsWith('https://') || 
                      (link.icon.includes('.') && (link.icon.includes('.jpg') || link.icon.includes('.jpeg') || 
                      link.icon.includes('.png') || link.icon.includes('.gif') || link.icon.includes('.svg')));
    
    const iconHtml = isImageUrl ? 
      `<img src="${link.icon}" style="width: 24px; height: 24px; object-fit: contain;">` : 
      link.icon;
    
    linkCard.innerHTML = `
      <div class="link-card-icon" style="background-color: ${link.color};">
        ${iconHtml}
      </div>
      <h3>${link.title}</h3>
      <p>${link.description}</p>
      <a href="${link.url}" target="_blank" rel="noopener noreferrer">
        访问链接
      </a>
    `;
    
    elements.linksGrid.appendChild(linkCard);
  });

  // 更新分类标题
  if (currentCategory === 'all') {
    elements.categoryTitle.innerHTML = `
      <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=link%20navigation%20icon%20blue%20color&image_size=square" alt="Category Icon" style="width: 48px; height: 48px; margin-right: 15px; vertical-align: middle;">
      <span>全部链接</span>
    `;
  } else {
    const category = categories.find(c => c.id === parseInt(currentCategory));
    if (category) {
      const isImageUrl = category.icon.startsWith('http://') || category.icon.startsWith('https://') || 
                        (category.icon.includes('.') && (category.icon.includes('.jpg') || category.icon.includes('.jpeg') || 
                        category.icon.includes('.png') || category.icon.includes('.gif') || category.icon.includes('.svg')));
      const iconHtml = isImageUrl ? 
        `<img src="${category.icon}" alt="Category Icon" style="width: 48px; height: 48px; margin-right: 15px; vertical-align: middle;">` : 
        `<span style="font-size: 48px; margin-right: 15px; vertical-align: middle;">${category.icon}</span>`;
      elements.categoryTitle.innerHTML = `
        ${iconHtml}
        <span>${category.name}</span>
      `;
    } else {
      elements.categoryTitle.innerHTML = `
        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=link%20navigation%20icon%20blue%20color&image_size=square" alt="Category Icon" style="width: 48px; height: 48px; margin-right: 15px; vertical-align: middle;">
        <span>全部链接</span>
      `;
    }
  }

  // 渲染链接列表（后台管理）
  renderLinksList();
}

// 渲染链接列表（后台管理）
function renderLinksList() {
  // 清空链接列表
  elements.linksList.innerHTML = '';

  // 渲染链接列表项
  links.forEach(link => {
    const linkItem = document.createElement('div');
    linkItem.className = 'link-item';
    
    const category = categories.find(c => c.id === link.categoryId);
    
    const categoryName = category ? `${category.icon} ${category.name}` : '未分类';
    
    // 检测图标是否为图片URL
    const isImageUrl = link.icon.startsWith('http://') || link.icon.startsWith('https://') || 
                      (link.icon.includes('.') && (link.icon.includes('.jpg') || link.icon.includes('.jpeg') || 
                      link.icon.includes('.png') || link.icon.includes('.gif') || link.icon.includes('.svg')));
    
    const iconHtml = isImageUrl ? 
      `<img src="${link.icon}" style="width: 20px; height: 20px; object-fit: contain; margin-right: 5px;">` : 
      link.icon;
    
    linkItem.innerHTML = `
      <div class="link-item-info">
        <h3>${iconHtml} ${link.title}</h3>
        <p style="font-size: 14px; color: #666; margin: 5px 0;">分类: ${categoryName}</p>
        <p>${link.description}</p>
        <p><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.url}</a></p>
      </div>
      <div class="link-item-actions">
        <button class="btn btn-primary edit-btn" data-id="${link.id}">
          编辑
        </button>
        <button class="btn btn-danger delete-btn" data-id="${link.id}">
          删除
        </button>
      </div>
    `;
    
    elements.linksList.appendChild(linkItem);
  });

  // 添加编辑和删除按钮事件
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const linkId = parseInt(btn.dataset.id);
      editLink(linkId);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const linkId = parseInt(btn.dataset.id);
      deleteLink(linkId);
    });
  });
}

// 选择分类
function selectCategory(categoryId) {
  currentCategory = categoryId.toString();
  
  // 更新导航链接状态
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.category === currentCategory) {
      link.classList.add('active');
    }
  });
  
  renderLinks();
}

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

// 处理登录表单提交
function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // 验证用户名和密码
  if (username === adminCredentials.username && password === adminCredentials.password) {
    isLoggedIn = true;
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
    document.getElementById('login-error').style.display = 'none';
    
    // 渲染分类列表
    renderCategoriesList();
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
}

// 切换到主页
function showHome() {
  elements.adminSection.style.display = 'none';
  elements.aboutSection.style.display = 'none';
  elements.homeSection.style.display = 'block';
  
  // 更新导航链接状态
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.category === currentCategory) {
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

// 编辑链接
function editLink(linkId) {
  editingLink = links.find(link => link.id === linkId);
  if (!editingLink) return;
  
  // 填充表单
  elements.linkId.value = editingLink.id;
  document.getElementById('title').value = editingLink.title;
  document.getElementById('url').value = editingLink.url;
  document.getElementById('description').value = editingLink.description;
  document.getElementById('icon').value = editingLink.icon;
  document.getElementById('categoryId').value = editingLink.categoryId;
  document.getElementById('color').value = editingLink.color;
  
  // 更新表单状态
  elements.formTitle.textContent = '编辑链接';
  elements.submitBtn.textContent = '更新链接';
  elements.cancelBtn.style.display = 'inline-block';
  
  // 确保在后台管理页面
  if (elements.adminSection.style.display === 'none') {
    showAdmin();
  }
}

// 删除链接
function deleteLink(linkId) {
  if (confirm('确定要删除这个链接吗？')) {
    links = links.filter(link => link.id !== linkId);
    saveData();
    renderLinks();
  }
}

// 重置链接表单
function resetForm() {
  elements.linkForm.reset();
  elements.linkId.value = '';
  elements.formTitle.textContent = '添加新链接';
  elements.submitBtn.textContent = '添加链接';
  elements.cancelBtn.style.display = 'none';
  editingLink = null;
}

// 渲染分类列表
function renderCategoriesList() {
  const categoriesList = document.getElementById('categories-list');
  if (!categoriesList) return;
  
  categoriesList.innerHTML = '';
  
  categories.forEach(category => {
    // 检查是否是图片URL
    const isImageUrl = category.icon.startsWith('http://') || category.icon.startsWith('https://') || 
                      (category.icon.includes('.') && (category.icon.includes('.jpg') || category.icon.includes('.jpeg') || 
                      category.icon.includes('.png') || category.icon.includes('.gif') || category.icon.includes('.svg')));
    
    const categoryItem = document.createElement('div');
    categoryItem.className = 'category-item';
    
    const iconHtml = isImageUrl ? `<img src="${category.icon}" style="width: 32px; height: 32px; object-fit: contain; margin-right: 15px;">` : 
                    `<span style="font-size: 24px; margin-right: 15px;">${category.icon}</span>`;
    
    categoryItem.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 20px; background-color: #2d2d2d; border-radius: 5px;">
        <div style="display: flex; align-items: center;">
          <div style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; margin-right: 20px; display: flex; align-items: center; justify-content: center; background-color: #333;">
            ${isImageUrl ? `<img src="${category.icon}" style="width: 40px; height: 40px; object-fit: contain;">` : `<span style="font-size: 24px;">${category.icon}</span>`}
          </div>
          <span style="font-size: 24px;">${category.name}</span>
        </div>
        <div style="display: flex; gap: 15px;">
          <button type="button" class="btn btn-primary" style="padding: 12px 24px; font-size: 20px;" onclick="editCategory(${category.id})">
            编辑
          </button>
          <button type="button" class="btn btn-danger" style="padding: 12px 24px; font-size: 20px;" onclick="deleteCategory(${category.id})">
            删除
          </button>
        </div>
      </div>
    `;
    
    categoriesList.appendChild(categoryItem);
  });
}

// 显示分类表单
function showCategoryForm() {
  const formContainer = document.getElementById('category-form-container');
  if (formContainer) {
    formContainer.style.display = 'block';
  }
}

// 重置分类表单
function resetCategoryForm() {
  const categoryForm = document.getElementById('category-form');
  if (categoryForm) {
    categoryForm.reset();
    document.getElementById('category-id').value = '';
    document.getElementById('category-form-title').textContent = '添加新分类';
    editingCategory = null;
  }
}

// 渲染图标选择器
function renderIconSelector() {
  const iconSelector = document.getElementById('icon-selector');
  if (!iconSelector) return;
  
  iconSelector.innerHTML = '';
  
  iconList.forEach(icon => {
    const iconItem = document.createElement('div');
    iconItem.style.fontSize = '24px';
    iconItem.style.padding = '10px';
    iconItem.style.border = '1px solid #ddd';
    iconItem.style.borderRadius = '5px';
    iconItem.style.cursor = 'pointer';
    iconItem.style.transition = 'all 0.2s ease';
    iconItem.textContent = icon;
    
    iconItem.addEventListener('click', () => {
      document.getElementById('icon').value = icon;
    });
    
    iconItem.addEventListener('mouseover', () => {
      iconItem.style.borderColor = '#00bcd4';
      iconItem.style.backgroundColor = '#f0f9ff';
    });
    
    iconItem.addEventListener('mouseout', () => {
      iconItem.style.borderColor = '#ddd';
      iconItem.style.backgroundColor = '';
    });
    
    iconSelector.appendChild(iconItem);
  });
}

// 编辑分类
function editCategory(categoryId) {
  const category = categories.find(c => c.id === categoryId);
  if (category) {
    document.getElementById('category-id').value = category.id;
    document.getElementById('category-name').value = category.name;
    document.getElementById('category-icon').value = category.icon;
    document.getElementById('category-form-title').textContent = '编辑分类';
    editingCategory = category;
    showCategoryForm();
  }
}

// 删除分类
function deleteCategory(categoryId) {
  if (confirm('确定要删除这个分类吗？删除后，该分类下的所有链接将被移动到未分类。')) {
    // 将该分类下的链接移动到默认分类（如果有）
    links.forEach(link => {
      if (link.categoryId === categoryId) {
        link.categoryId = categories.length > 0 ? categories[0].id : 0;
      }
    });
    
    // 删除分类
    categories = categories.filter(c => c.id !== categoryId);
    saveData();
    renderCategories();
    renderCategoriesList();
    renderLinks();
  }
}

// 重置分类
function resetCategories() {
  if (confirm('确定要将分类重置为初始状态吗？重置后，所有自定义分类将被删除，链接将保持不变。')) {
    // 重置分类为初始状态
    categories = [...initialCategories];
    saveData();
    renderCategories();
    renderCategoriesList();
    renderLinks();
  }
}

// 提交分类表单
function submitCategoryForm(e) {
  e.preventDefault();
  
  const formData = {
    id: document.getElementById('category-id').value ? parseInt(document.getElementById('category-id').value) : Date.now(),
    name: document.getElementById('category-name').value,
    icon: document.getElementById('category-icon').value
  };
  
  if (editingCategory) {
    // 更新分类
    const index = categories.findIndex(c => c.id === formData.id);
    if (index !== -1) {
      categories[index] = formData;
    }
  } else {
    // 添加新分类
    categories.push(formData);
  }
  
  saveData();
  renderCategories();
  renderCategoriesList();
  renderLinks();
  resetCategoryForm();
  document.getElementById('category-form-container').style.display = 'none';
}

// 提交表单
function submitForm(e) {
  e.preventDefault();
  
  const formData = {
    id: elements.linkId.value ? parseInt(elements.linkId.value) : Date.now(),
    title: document.getElementById('title').value,
    url: document.getElementById('url').value,
    description: document.getElementById('description').value,
    icon: document.getElementById('icon').value,
    categoryId: parseInt(document.getElementById('categoryId').value),
    color: document.getElementById('color').value
  };
  
  if (editingLink) {
    // 更新链接
    const index = links.findIndex(link => link.id === formData.id);
    if (index !== -1) {
      links[index] = formData;
    }
  } else {
    // 添加新链接
    links.push(formData);
  }
  
  saveData();
  renderLinks();
  resetForm();
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
  
  // 渲染图标选择器
  renderIconSelector();
}

// 选择分类并显示主页
function selectCategory(categoryId) {
  currentCategory = categoryId.toString();
  showHome();
  renderLinks();
  
  // 更新导航链接状态
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.category === currentCategory) {
      link.classList.add('active');
    }
  });
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