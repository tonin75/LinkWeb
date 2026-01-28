// 初始分类数据
const initialCategories = [
  { id: 1, name: '游戏网站55555', icon: '🤖' },
  { id: 2, name: '开发工具', icon: '💻' },
  { id: 3, name: '设计工具', icon: '🎨' },
  { id: 4, name: '学习资源', icon: '📚' },
  { id: 5, name: '娱乐网站', icon: '🎮' },
  { id: 6, name: 'AI工具1111', icon: '🤖' }
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
  adminLink: document.querySelector('.admin-link')
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
      // 检查localStorage中的分类是否与初始分类一致
      // 检查数量和内容
      let categoriesMatch = true;
      
      // 检查数量
      if (parsedCategories.length !== initialCategories.length) {
        categoriesMatch = false;
      } else {
        // 检查内容
        for (let i = 0; i < initialCategories.length; i++) {
          const initialCategory = initialCategories[i];
          const savedCategory = parsedCategories.find(c => c.id === initialCategory.id);
          
          if (!savedCategory || 
              savedCategory.name !== initialCategory.name || 
              savedCategory.icon !== initialCategory.icon) {
            categoriesMatch = false;
            break;
          }
        }
      }
      
      // 如果不一致，使用初始分类
      if (!categoriesMatch) {
        categories = initialCategories;
        localStorage.setItem('categories', JSON.stringify(initialCategories));
      } else {
        categories = parsedCategories;
      }
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

// 清除localStorage数据（用于调试）
function clearLocalStorage() {
  localStorage.removeItem('categories');
  localStorage.removeItem('links');
  alert('LocalStorage数据已清除，刷新页面后将加载初始数据');
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
    // 渲染导航项
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'nav-link';
    a.dataset.category = category.id;
    a.textContent = `${category.icon} ${category.name}`;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      selectCategory(category.id);
    });
    li.appendChild(a);
    navList.appendChild(li);

    // 渲染选择项
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = `${category.icon} ${category.name}`;
    elements.categorySelect.appendChild(option);
  });

  // 更新导航链接引用
  elements.navLinks = document.querySelectorAll('.nav-link');
  
  // 重新设置全部链接的点击事件
  const homeLink = document.querySelector('.nav-link[data-category="all"]');
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      selectCategory('all');
      showHome();
    });
  }
  
  // 重新设置后台管理链接的点击事件
  const adminLink = document.querySelector('.admin-link');
  if (adminLink) {
    adminLink.addEventListener('click', (e) => {
      e.preventDefault();
      showAdmin();
    });
  }
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
    
    linkCard.innerHTML = `
      <div class="link-card-icon" style="background-color: ${link.color}">
        ${link.icon}
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
    elements.categoryTitle.textContent = '全部链接';
  } else {
    const category = categories.find(c => c.id === parseInt(currentCategory));
    elements.categoryTitle.textContent = category ? category.name : '全部链接';
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
    
    linkItem.innerHTML = `
      <div class="link-item-info">
        <h3>${link.icon} ${link.title}</h3>
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
  elements.adminSection.style.display = 'block';
  
  // 更新导航链接状态
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
  });
  elements.adminLink.classList.add('active');
}

// 切换到主页
function showHome() {
  elements.adminSection.style.display = 'none';
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

// 重置表单
function resetForm() {
  elements.linkForm.reset();
  elements.linkId.value = '';
  elements.formTitle.textContent = '添加新链接';
  elements.submitBtn.textContent = '添加链接';
  elements.cancelBtn.style.display = 'none';
  editingLink = null;
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
  // 表单提交
  elements.linkForm.addEventListener('submit', submitForm);
  
  // 取消按钮
  elements.cancelBtn.addEventListener('click', resetForm);
  
  // 导航链接
  elements.adminLink.addEventListener('click', (e) => {
    e.preventDefault();
    showAdmin();
  });
  
  // 主页链接
  const homeLink = document.querySelector('.nav-link[data-category="all"]');
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      selectCategory('all');
      showHome();
    });
  }
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