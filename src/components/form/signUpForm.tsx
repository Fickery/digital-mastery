"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

const userSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(20),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
};

const onSubmit = async (values: z.infer<typeof userSchema>) => {
  try {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/sign-in");
    } else {
      console.log("Registration failed");
    }
  } catch (error) {
    console.error("Error during form submission:", error);
  }
};

const SignUpForm = () => {
  <>
    <p className="text-shadow-white">USERNAME LOGIN</p>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-16 pb-12"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input placeholder="USERNAME" type="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input placeholder="PASSWORD" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex flex-row">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
    <div className="flex cursor-pointer flex-col gap-2 font-light">
      <p>GOOGLE</p>
      <p>FACEBOOK</p>
      <p>GITHUB</p>
    </div>
  </>;
};

export default SignUpForm;
