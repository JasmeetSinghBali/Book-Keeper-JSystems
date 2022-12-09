import create from "zustand";

interface CurrentRpcTokenInterface {
    token: string;
    setToken: (newValue: string) => void;
    resetToken: () => void;
}

/**@desc current user rpc token for protected/tracked trpc procedures call/requests */
export const useCurrentRpcToken = create<CurrentRpcTokenInterface>((set): any => ({
    token: '',
    setToken: (newValue: string): void => set(
        _state => ({token:newValue})
    ),
    resetToken: (): void => set({token: ''})
}))