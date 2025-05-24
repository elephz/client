import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { createUser, updateUser, getUser } from "@/api/user";
import { useSelector } from "react-redux"; 

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const token = useSelector((state) => state.user.access_token);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        const payload = {
          name: form.name,
          role: form.role,
        }
        await updateUser(id, payload, token);
      } else {
        await createUser(form, token);
      }
      navigate("/user");
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!isEdit) return;
      try {
        const { data } = await getUser(id, token);
        setForm({
          name: data.name || "",
          email: data.email || "",
          password: "",
          role: data.role || "user",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [id, isEdit]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">
        {isEdit ? "Update User" : "Create User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email (Create only) */}
        {!isEdit && (
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Password (Create only) */}
        {!isEdit && (
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit */}
        <div className="text-right">
          <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
        </div>
      </form>
    </div>
  );
}
