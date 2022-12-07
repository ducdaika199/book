import create from 'zustand';
import { User } from '@/types/auth';

interface UserSlice {
  user: User;
  fetchUser: (res: User) => void;
}

const userDefault = {
  email: '',
  userId: '',
  fullName: '',
  address: '',
};

const useProfileStore = create<UserSlice>()(set => ({
  user: userDefault,
  fetchUser: res => set(() => ({ user: res })),
}));

export default useProfileStore;
