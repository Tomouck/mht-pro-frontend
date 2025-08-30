export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
  variant?: 'default' | 'destructive';
};

export type ToastActionElement = React.ReactElement;