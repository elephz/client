import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { createUser, updateUser, getUser } from "@/api/user";
import { useSelector } from "react-redux"; 
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .when("$isEdit", {
      is: false,
      then: yup.string().required("Email is required"),
    }),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .when("$isEdit", {
      is: false,
      then: yup.string().required("Password is required"),
    }),
  role: yup.string().oneOf(["user", "admin"]),
});

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const token = useSelector((state) => state.user.access_token);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema, { context: { isEdit } }),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });
  
  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        const payload = {
          name: data.name,
          role: data.role,
        };
        await updateUser(id, payload, token);
      } else {
        await createUser(data, token);
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
        reset({
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <Input {...register("name")} />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        {!isEdit && (
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <Input type="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>
        )}

        {/* Password */}
        {!isEdit && (
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <Input type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
        )}

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            {...register("role")}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-600 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="text-right">
          <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
        </div>
      </form>
    </div>
  );
}
