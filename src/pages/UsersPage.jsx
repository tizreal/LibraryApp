import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";

function UsersPage() {
  const { users, usersLoading, usersError, removeUser, loadUsers } = useLibrary();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  function openAddForm() {
    setEditingUser(null);
    setShowForm(true);
  }

  function openEditForm(user) {
    setEditingUser(user);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingUser(null);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;
    try {
      await removeUser(id);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete user");
    }
  }

  if (usersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin w-10 h-10 border-4 border-[#3B82F6] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 text-center">
        <p className="text-red-400 font-medium">{usersError}</p>
        <button
          onClick={loadUsers}
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-slate-400 text-sm">
            {users.length} user{users.length !== 1 ? "s" : ""} registered
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full px-5 py-2 text-sm font-medium transition-colors"
        >
          + Add User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-4xl mb-3">👤</p>
          <p className="text-lg font-medium text-slate-400">No users yet</p>
          <p className="text-sm">Click '+ Add User' to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {users.map((user) => (
            <UserCard
              key={user.user_id}
              user={user}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeForm}
        >
          <div
            className="bg-[#1E293B] border border-[#334155] rounded-2xl p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <UserForm initialData={editingUser} onClose={closeForm} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
