import { categories, links, appState } from './data.js';
import { elements, updateNavLinks } from './elements.js';
import { selectCategory } from './navigation.js';
import { editLink, deleteLink } from './forms.js';

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
        <img src="${category.icon}" style="width: 45px; height: 45px; margin-right: 12px; vertical-align: middle;">
        <span>${category.name}</span>
      `;
    } else {
      a.innerHTML = `
        <span style="font-size: 24px; margin-right: 12px; vertical-align: middle;">${category.icon}</span>
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
  updateNavLinks();
}

// 渲染链接
function renderLinks() {
  // 过滤链接
  const filteredLinks = appState.currentCategory === 'all' 
    ? links 
    : links.filter(link => link.categoryId === parseInt(appState.currentCategory));

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
      <div class="link-card-header">
        <div class="link-card-icon">
          ${iconHtml}
        </div>
        <h3>${link.title}</h3>
      </div>
      <p>${link.description}</p>
      <div class="link-card-footer">
        <a href="${link.url}" target="_blank" rel="noopener noreferrer">
          访问链接
        </a>
      </div>
    `;
    
    elements.linksGrid.appendChild(linkCard);
  });

  // 更新分类标题
  if (appState.currentCategory === 'all') {
    elements.categoryTitle.innerHTML = `
      <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=link%20navigation%20icon%20blue%20color&image_size=square" alt="Category Icon" style="width: 48px; height: 48px; margin-right: 15px; vertical-align: middle;">
      <span>全部链接</span>
    `;
  } else {
    const category = categories.find(c => c.id === parseInt(appState.currentCategory));
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

export { renderCategories, renderLinks, renderLinksList, renderCategoriesList };