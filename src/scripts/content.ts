/**
 * Learn more about customizing these edits yourself at:
 * purxyl.github.io/fantweaker/docs#edits
 */

const REMOVE = 'REMOVE';
const EDIT = 'EDIT';

console.log('hey')

// @ts-ignore
const extensionApi = (globalThis as any).browser ?? chrome;

const edits = [
  ['hide_header', REMOVE, '.global-top-navigation'],
  ['hide_header', EDIT, '.fandom-community-header__background', ['transform', 'none', 'translateY(46px)']],
  ['hide_header', EDIT, '.resizable-container', ['top', '0', '46px']],
  
  ['hide_sidebar', REMOVE, '.global-explore-navigation'],
  ['hide_sidebar', EDIT, '.main-container', ['margin-left', '0', 'var(--left-panel-spacing)']],
  ['hide_sidebar', EDIT, '.main-container', ['width', '100%', 'calc(100% - var(--left-panel-spacing))']],
  
  ['hide_footer', REMOVE, '.global-footer'],
  
  ['hide_rail', REMOVE, '.page__right-rail'],
  
  // Syntax for edits: ['edit_name', EDIT, 'selector', ['css_property', 'new_value', 'default_value']
  // Syntax for removals: ['edit_name', REMOVE, 'selector']
]

async function applyEdits(toggles: string[]) { 
  if (!toggles.includes('enabled')) {
    resetEdits();
    return;
  };
  
  for (const edit of edits) {
    // @ts-ignore
    const element = document.querySelectorAll(edit[2]);
    if (!element || element.length == 0) continue;
    
    if (!toggles.includes(edit[0] as string)) {
      element.forEach(instance => {
        const htmlinstance = instance as HTMLElement;
        
        if (edit[1] === REMOVE) {
          htmlinstance.style.setProperty('display', 'flex');
        } else if (edit[1] === EDIT && edit[3]) {
          htmlinstance.style.setProperty((edit[3] as string[])[0], (edit[3] as string[])[2]);
        } else {
          console.warn(`Invalid edit configuration for ${edit[0]}`);
        }
      });
      continue;
    };
    
    if (edit[1] === REMOVE) {
      element.forEach(instance => (instance as HTMLElement).style.setProperty('display', 'none'));
    } else if (edit[1] === EDIT && edit[3]) {
      element.forEach(instance => (instance as HTMLElement).style.setProperty((edit[3] as string[])[0], (edit[3] as string[])[1]));
    } else {
      console.warn(`Invalid edit configuration for ${edit[0]}`);
    };
  }
}

function resetEdits() {
  window.location.reload();
}

extensionApi.storage.local.get(['FT-enabled', 'FT-hide_header', 'FT-hide_sidebar', 'FT-hide_footer', 'FT-hide_rail']).then((result: { [key: string]: any }) => {
  const activeToggles: string[] = [];
  
  if (result['FT-enabled']) activeToggles.push('enabled');
  if (result['FT-hide_header']) activeToggles.push('hide_header');
  if (result['FT-hide_sidebar']) activeToggles.push('hide_sidebar');
  if (result['FT-hide_footer']) activeToggles.push('hide_footer');
  if (result['FT-hide_rail']) activeToggles.push('hide_rail');
  
  if (activeToggles.length > 0) {
    console.log('Restoring saved edits:', activeToggles);
    applyEdits(activeToggles);
  }
});

extensionApi.runtime.onMessage.addListener((message: { action?: string, toggles?: string[] }) => {
  if (message.action === 'applyEdits') {
    console.log('call received');
    applyEdits(message.toggles || []);
  } else if (message.action === 'resetEdits') {
    resetEdits();
  }
});