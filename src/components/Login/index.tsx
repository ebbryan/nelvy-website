"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type UserAccountType = {
  username: string;
  password: string;
};

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserAccountType>();

  const onSubmit = async (data: UserAccountType) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("resume_edit_mode", "true");
      toast.success("Login successful!");
      window.location.reload();
    } else {
      toast.error(result.message || "Login failed.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign In</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your credentials to enable edit mode.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginComponent;
