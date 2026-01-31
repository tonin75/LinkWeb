// 管理员账号密码（直接保存在JS中）
const adminCredentials = {
  username: '1',
  password: '1'
};

// 初始分类数据
const initialCategories = [
  { id: 1, name: '游戏网站55555', icon: '🤖' },
  { id: 2, name: '开发工具', icon: '💻' },
  { id: 3, name: '设计工具', icon: '🎨' },
  { id: 4, name: '学习资源', icon: '📚' },
  { id: 5, name: '娱乐网站', icon: '🎮' },
  { id: 6, name: '其它工具', icon: '🤖' }
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

export { adminCredentials, initialCategories, initialLinks };