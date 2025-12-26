export const useLocalStorage = ({ graphData, setGraphData }) => {
  // Minimal localStorage sync: restore on load, save when graphData changes
  // Only run on client-side
  if (typeof window === 'undefined') {
    return; // SSR context, skip localStorage
  }
  
  try {
    if (!graphData) {
      const saved = localStorage.getItem('graphData');
      if (saved) {
        setGraphData(JSON.parse(saved));
      }
    } else {
      localStorage.setItem('graphData', JSON.stringify(graphData));
    }
  } catch (e) {
    // ignore storage errors in private mode or other issues
    console.warn('LocalStorage sync error', e);
  }
};
