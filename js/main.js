// 侧边栏折叠
function toggleGroup(el) {
  const group = el.parentElement;
  group.classList.toggle('open');
}

// 高亮当前文档
function highlightCurrentDoc() {
  const path = location.pathname;
  document.querySelectorAll('.nav-item').forEach(link => {
    if (link.getAttribute('href') === path.split('/').slice(-1).join('/')) {
      link.classList.add('active');
      const group = link.closest('.nav-group');
      if (group) group.classList.add('open');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  highlightCurrentDoc();

  document.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-item');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || !href.startsWith('docs/')) return;

    e.preventDefault();

    // 高亮
    document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const group = link.closest('.nav-group');
    if (group) group.classList.add('open');

    // 用 iframe 加载文档
    const contentEl = document.getElementById('content');
    contentEl.innerHTML = '<iframe id="doc-iframe" style="width:100%;height:100%;border:none;background:#FFFFF0;" src="' + href + '"></iframe>';
  });
});
