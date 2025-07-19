import React from 'react'

const Profile = () => {
  return (
    <div className="container mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="text-muted-foreground mb-6">
        Manage your account settings and preferences here.
      </p>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="text-foreground">John Doe</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="text-foreground">john.doe@example.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile