export interface ModalInstance {
    show: () => boolean;
    title?: string;
    confirmText?: string;
    confirmAction: () => void;
    cancelText?: string;
    cancelAction: () => void;
}
