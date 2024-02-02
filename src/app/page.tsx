"use client";
import { useForm } from "@conform-to/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { parseWithZod } from "@conform-to/zod";
import getUsers from "@src/server/dataLayer/getUsers";
import addUser from "@src/server/dataLayer/addUser";
import { userInsertSchema } from "@src/server/schemas";

export default function Home() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleMutation = (data: FormData) => {
    mutation.mutate({
      name: data.get("name") as string,
      email: data.get("email") as string,
    });
  };

  const [form, fields] = useForm({
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: userInsertSchema });
    },
    shouldValidate: "onBlur",
  });

  if (!data || isLoading)
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        Loading...
      </div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold text-center mb-8">Users</h1>
        {data.length === 0 && (
          <p className="w-full text-center mb-4">No data available</p>
        )}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {data.map((user) => (
            <div key={user.id} className="flex flex-col items-center">
              <p className="text-lg font-bold mt-4">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          ))}
        </div>
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={handleMutation}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-row gap-4">
            <div>
              <label htmlFor={fields.name.id}> Name </label>
              <input
                className="bg-black px-2 border border-white rounded-lg"
                name={fields.name.name}
                id={fields.name.id}
              />
              <p className="text-red-600">{fields.name.errors}</p>
            </div>
            <div>
              <label htmlFor={fields.email.id}> Email </label>
              <input
                className="bg-black px-2 border border-white rounded-lg"
                name={fields.email.name}
                id={fields.email.id}
              />
              <p className="text-red-600">{fields.email.errors}</p>
            </div>
          </div>
          <button
            type="submit"
            className="px-8 py-2 rounded-lg border-white border w-full hover:text-black hover:bg-white"
          >
            Add User
          </button>
        </form>
      </div>
    </main>
  );
}
