import { useAuthStore } from '@/store/authStore';
import { format } from 'date-fns';
export default function Profile() {
    const user = useAuthStore((state) => state.user);
    return (
        <>
            <div>Name: {user?.name}</div>
            <div>Email: {user?.email}</div>
            <div>Phone: {user?.phone}</div>
            <div>Gender: {user?.gender}</div>
            <div>Role: {user?.role}</div>
            <div>Birthdate: {user?.birthdate ? format(user.birthdate, 'dd-MM-yyy') : 'Not provided'}</div>
        </>
    );
}
