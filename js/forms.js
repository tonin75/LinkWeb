import { categories, links, appState, saveData, saveLinksToJson } from './data.js';
import { elements } from './elements.js';
import { renderCategories, renderLinks, renderCategoriesList } from './render.js';
import { initialCategories } from './config.js';
import { showAdmin } from './navigation.js';



// 重置链接表单
function resetForm() {
  elements.linkForm.reset();
  elements.linkId.value = '';
  elements.formTitle.textContent = '添加新链接';
  elements.submitBtn.textContent = '添加链接';
  elements.cancelBtn.style.display = 'none';
  appState.editingLink = null;
}

// 重置分类表单
function resetCategoryForm() {
  const categoryForm = document.getElementById('category-form');
  if (categoryForm) {
    categoryForm.reset();
    document.getElementById('category-id').value = '';
    document.getElementById('category-form-title').textContent = '添加新分类';
    appState.editingCategory = null;
  }
}

// 提交表单
function submitForm(e) {
  e.preventDefault();
  
  const categoryId = document.getElementById('categoryId').value;
  
  // 验证是否选择了分类
  if (!categoryId || categoryId === '') {
    alert('请选择分类！');
    return;
  }
  
  const formData = {
    id: elements.linkId.value ? parseInt(elements.linkId.value) : Date.now(),
    title: document.getElementById('title').value,
    url: document.getElementById('url').value,
    description: document.getElementById('description').value,
    icon: document.getElementById('icon').value,
    categoryId: parseInt(categoryId),
    color: document.getElementById('color').value
  };
  
  if (appState.editingLink) {
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
  saveLinksToJson();
  renderLinks();
  resetForm();
}

// 提交分类表单
function submitCategoryForm(e) {
  e.preventDefault();
  
  const formData = {
    id: document.getElementById('category-id').value ? parseInt(document.getElementById('category-id').value) : Date.now(),
    name: document.getElementById('category-name').value,
    icon: document.getElementById('category-icon').value
  };
  
  if (appState.editingCategory) {
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
  saveLinksToJson();
  renderCategories();
  renderCategoriesList();
  renderLinks();
  resetCategoryForm();
  document.getElementById('category-form-container').style.display = 'none';
}

// 显示分类表单
function showCategoryForm() {
  const formContainer = document.getElementById('category-form-container');
  if (formContainer) {
    formContainer.style.display = 'block';
  }
}

// 编辑链接
function editLink(linkId) {
  appState.editingLink = links.find(link => link.id === linkId);
  if (!appState.editingLink) return;
  
  // 填充表单
  elements.linkId.value = appState.editingLink.id;
  document.getElementById('title').value = appState.editingLink.title;
  document.getElementById('url').value = appState.editingLink.url;
  document.getElementById('description').value = appState.editingLink.description;
  document.getElementById('icon').value = appState.editingLink.icon;
  document.getElementById('categoryId').value = appState.editingLink.categoryId;
  document.getElementById('color').value = appState.editingLink.color;
  
  // 更新表单状态
  elements.formTitle.textContent = '编辑链接';
  elements.submitBtn.textContent = '更新链接';
  elements.cancelBtn.style.display = 'inline-block';
  
  // 确保在后台管理页面
  if (elements.adminSection.style.display === 'none') {
    showAdmin();
  }
  
  // 滚动到编辑表单区域
  elements.linkForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 编辑分类
function editCategory(categoryId) {
  const category = categories.find(c => c.id === categoryId);
  if (category) {
    document.getElementById('category-id').value = category.id;
    document.getElementById('category-name').value = category.name;
    document.getElementById('category-icon').value = category.icon;
    document.getElementById('category-form-title').textContent = '编辑分类';
    appState.editingCategory = category;
  showCategoryForm();
  
  // 滚动到编辑分类表单区域
  const categoryForm = document.getElementById('category-form');
  if (categoryForm) {
    categoryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
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

export { resetForm, resetCategoryForm, submitForm, submitCategoryForm, showCategoryForm, editLink, editCategory, deleteLink, deleteCategory, resetCategories };