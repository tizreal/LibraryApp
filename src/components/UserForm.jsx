import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

const emptyForm = { firstName: "", lastName: "", userNameString: "" };

const inputClass =
  "bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#3B82F6] focus:outline-none w-full transition-colors";
const labelClass = "text-sm font-medium text-slate-300";

function UserForm({ initialData = null, onClose }) {
  const [formData, setFormData] = useState(
    initialData
      ? {
          firstName: initialData.first_name,
          lastName: initialData.last_name,
          userNameString: initialData.user_name_string,
        }
      : emptyForm,
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { addUser, editUser } = useLibrary();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (initialData) {
        await editUser(initialData.userId, formData);
      } else {
        await addUser(formData);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-white">
        {initialData ? "Edit User" : "Add New User"}
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          First Name <span className="text-red-400">*</span>
        </label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="First name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Last Name <span className="text-red-400">*</span>
        </label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="Last name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Username <span className="text-red-400">*</span>
        </label>
        <input
          name="userNameString"
          value={formData.userNameString}
          onChange={handleChange}
          required
          placeholder="Username"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Saving..." : initialData ? "Update User" : "Add User"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 border border-[#334155] text-slate-400 hover:text-white hover:border-slate-400 rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;
