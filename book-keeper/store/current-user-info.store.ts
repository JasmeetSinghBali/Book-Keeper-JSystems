import create from 'zustand';

interface CurrentUserInfoInterface {
    user: Object;
    setUserInfo: (userData: any) => void;
    resetUserInfo: () => void;
}

/**@desc set,reset rpc access token globally for current user for trpc client to make protected rpc calls to server */
export const useCurrentUserInfo = create<CurrentUserInfoInterface>((set): any => ({
    user: {},
    setUserInfo: (userData: any): void => set(
        _state => ({ user: userData})
    ),
    resetUserInfo: (): void => set({user: {}})
}));