export interface IModalProps {
  title?: string; // optional
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ICommonCodeModalProps {
  group: string;
  name: string;
  codeKey: string;
  description: string;
  onChange: (field: string, value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}
