const aside = document.querySelector('aside');
const asideToggle = document.querySelectorAll('.aside-toggle');

asideToggle.forEach(toggle => {
  toggle.addEventListener('click', () => {
    aside?.classList.toggle('active');
  });
});

// @ts-ignore
const extensionApi = (globalThis as any).browser ?? chrome;

const version = extensionApi.runtime.getManifest().version;
const versionSpan = document.getElementById('FT-version');
if (versionSpan) {
  versionSpan.textContent = version;
}

const toggles = [
  ['enabled', 'FT-enabled'],
  ['hide_header', 'FT-hide_header'],
  ['hide_sidebar', 'FT-hide_sidebar'],
  ['hide_footer', 'FT-hide_footer'],
  ['hide_rail', 'FT-hide_rail']
  
  // Syntax: ['edit_name', 'popup_element_id']
]

const defaultToggles: { [key: string]: boolean } = {
  'enabled': false,
  'hide_header': true,
  'hide_sidebar': true,
  'hide_footer': false,
  'hide_rail': false
};

function restoreEdits() {
  extensionApi.storage.local.get(toggles.map(toggle => toggle[0])).then((result: { [key: string]: any }) => {
    toggles.forEach(toggle => {
      const toggleElement = document.getElementById(toggle[1]) as HTMLInputElement;
      if (toggleElement) {
        toggleElement.checked = result[toggle[0]] ?? result[toggle[1]] ?? defaultToggles[toggle[0]] ?? false;
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
      togglesToSave[toggle[0]] = toggleElement.checked;
    }
  });
  
  extensionApi.storage.local.set(togglesToSave);
}

function sendEdits() {
  const activeToggles = toggles.map(toggle => {
    let toggleElement = document.getElementById(toggle[1]) as HTMLInputElement;
    if (toggleElement?.checked) {
      return toggle[0];
    };
  }).filter(toggle => toggle !== undefined);
  
  extensionApi.tabs.query({ active: true, currentWindow: true }).then((tabs: Array<{ id?: number }>) => {
    const activeTabId = tabs[0]?.id;
    if (activeTabId === undefined) return;

    extensionApi.tabs.sendMessage(activeTabId, { action: 'applyEdits', toggles: activeToggles });
  });
}

restoreEdits();

toggles.forEach(toggle => {
  const toggleElement = document.getElementById(toggle[1]) as HTMLInputElement;
  toggleElement?.addEventListener('change', () => {
    saveEdits();
    sendEdits();
  });
});