export interface openRazorPayPopUpTypes {
  rzpId: string;
  walletIdDetails: string;
  user: User;
  onSuccess: () => void;
  onClose: (msg?: string) => void;
}

export interface User {
  id: string;
  email: string;
  isVerified: boolean;
}
