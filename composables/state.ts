export const useGlobal = () => 
  useState(() => ({
    showSidebar: true,
  }))