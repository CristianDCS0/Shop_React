const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
            <p>You do not have permission to view this page.</p>
            <a href="/dashboard" className="text-blue-500">Go back</a>
        </div>
    );
};

export default Unauthorized;
