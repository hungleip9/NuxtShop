export const useDrop = () => 
  useState(() => ({
    dataDrop: {
      id: '',
      data: null,
    } as {id: string, data: any}
  }))