import create from 'zustand';

interface RPCTokenInterface {
    token: string;
}

export const currentUserRPCToken = create<RPCTokenInterface>((set): any => ({
    
}));