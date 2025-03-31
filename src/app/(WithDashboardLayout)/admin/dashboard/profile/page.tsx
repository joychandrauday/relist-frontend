import Profile from '@/components/modules/dashboard/Profile/Profile';
import React from 'react';

const ProfilePage = async () => {

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <Profile />
        </div>
    );
}

export default ProfilePage;
