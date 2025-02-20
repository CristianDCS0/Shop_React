import { useAuthStore } from '@/store/authStore';
export default function Index() {
    const user = useAuthStore((state) => state.user);
    return (
        <>
           <div>Welcome again, {user?.name}</div>
        </>
    );
}