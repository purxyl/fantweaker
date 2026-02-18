// @ts-ignore
const extensionApi = (globalThis as any).browser ?? chrome;

const toggles = [
  ['enabled', 'FT-enabled'],
  ['hide_header', 'FT-hide_header'],
  ['hide_sidebar', 'FT-hide_sidebar'],
  ['hide_footer', 'FT-hide_footer'],
  ['hide_rail', 'FT-hide_rail']
  
  // Syntax: ['edit_name', 'popup_element_id']
]

function restoreEdits() {
  extensionApi.storage.local.get(toggles.map(toggle => toggle[1])).then((result: { [key: string]: any }) => {
    toggles.forEach(toggle => {
      const toggleElement = document.getElementById(toggle[1]) as HTMLInputElement;
      if (toggleElement) {
        toggleElement.checked = result[toggle[1]] ?? false;
      }
    });
    
    sendEdits();
  });
}

function saveEdits() {
  const togglesToSave: { [key: string]: boolean } = {};
  toggles.forEach(toggle => {
    const toggleElement = document.getElementById(toggle[1]) as HTMLInputElement;
    if (toggleElement) {
      togglesToSave[toggle[1]] = toggleElement.checked;
    }
  });
  
  extensionApi.storage.local.set(togglesToSave);
}

function sendEdits() {
  console.log('filtering edits');
  const activeToggles = toggles.map(toggle => {
    let toggleElement = document.getElementById(toggle[1]) as HTMLInputElement;
    if (toggleElement?.checked) {
      return toggle[0];
    };
  }).filter(toggle => toggle !== undefined);
  
  console.log('sending edits');
  extensionApi.tabs.query({ active: true, currentWindow: true }).then((tabs: Array<{ id?: number }>) => {
    const activeTabId = tabs[0]?.id;
    if (activeTabId === undefined) return;

    extensionApi.tabs.sendMessage(activeTabId, { action: 'applyEdits', toggles: activeToggles });
  });
}

// Initialize: restore saved toggles on popup open
restoreEdits();

// Setup: save on each toggle change
toggles.forEach(toggle => {
  const toggleElement = document.getElementById(toggle[1]) as HTMLInputElement;
  toggleElement?.addEventListener('change', () => {
    saveEdits();
    sendEdits();
  });
});