import { initialCategories, initialLinks } from './config.js';

// 全局变量
let categories = [];
let links = [];
let appState = {
  currentCategory: 'all',
  editingLink: null,
  editingCategory: null,
  isLoggedIn: false
};

// 从localStorage加载数据
async function loadData() {
  try {
    const response = await fetch('http://localhost:3000/api/data');
    const data = await response.json();
    
    if (data.categories && data.categories.length > 0) {
      categories = data.categories;
    } else {
      categories = initialCategories;
    }
    
    if (data.links && data.links.length > 0) {
      links = data.links;
    } else {
      links = initialLinks;
    }
    
    console.log('Data loaded from server:', data);
  } catch (error) {
    console.log('Failed to load data from server, using localStorage:', error);
    
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
}

// 保存数据到localStorage
function saveData() {
  localStorage.setItem('categories', JSON.stringify(categories));
  localStorage.setItem('links', JSON.stringify(links));
}

// 保存链接到JSON文件
async function saveLinksToJson() {
  const data = {
    categories: categories,
    links: links,
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await fetch('http://localhost:3000/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Data saved successfully to linkweb.json');
    } else {
      console.error('Failed to save data:', result.error);
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

export { categories, links, appState, loadData, saveData, saveLinksToJson };