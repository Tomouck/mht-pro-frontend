export function useToast() {
  const toast = (options: any) => {
    console.log('Toast:', options);
  };
  
  return { toast };
}