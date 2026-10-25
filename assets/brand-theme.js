// Apply the existing palette preference across every page without changing storage keys.
(() => { try { const theme=localStorage.getItem('pure-select-theme'); if(['terra','forest','cobalt','nocturne'].includes(theme))document.documentElement.dataset.theme=theme; } catch (_) {} })();
