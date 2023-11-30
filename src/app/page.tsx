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
import { SecondaryButton } from "@/components/ui/secondaryButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import "../styles/film-grain.css";

export default function Home() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const router = useRouter();

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

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

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
        console.log("Registration successful");
        setMode("login");
        // router.push("/home");
      } else if (response.status === 409) {
        alert("User already exists");
        console.log("Registration failed");
      } else {
        alert("Error during form submission");
        console.error("Error during form submission:", response);
      }
    } catch (error) {
      alert("Error during form submission");
      console.error("Error during form submission:", error);
    }
  };

  const switchToLogin = () => {
    setMode("login");
    console.log("login");
  };

  const switchToRegister = () => {
    setMode("register");
    console.log("register");
  };

  return (
    <div className="hero">
      <div className="overlay">
        <main className="flex min-h-screen flex-col items-center text-primary">
          <div className="flex w-full flex-col items-center justify-center">
            <p className="text-[13.5rem] font-black leading-none text-primary">
              DIGITAL MASTERY
            </p>
            <div className="w-7/12 pb-[5rem]">
              <p className="text-2xl font-light uppercase text-primary">
                grind to digital mastery
              </p>

              <div className="flex flex-col pt-12">
                <SecondaryButton
                  className={`w-fit cursor-pointer ${
                    mode === "register"
                      ? "text-shadow-white"
                      : "hover:text-shadow-none blur-[1px] hover:text-primary-foreground hover:blur-0"
                  }`}
                  onClick={switchToRegister}
                >
                  Register
                </SecondaryButton>
                <SecondaryButton
                  className={`w-fit cursor-pointer ${
                    mode === "login"
                      ? "text-shadow-white"
                      : "hover:text-shadow-none blur-[1px] hover:text-primary-foreground hover:blur-0"
                  }`}
                  onClick={switchToLogin}
                >
                  Login
                </SecondaryButton>
              </div>
            </div>

            <div className="w-7/12">
              {mode === "login" ? (
                <div>
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
                                <Input
                                  placeholder="USERNAME"
                                  type="username"
                                  {...field}
                                />
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
                                <Input
                                  placeholder="PASSWORD"
                                  type="password"
                                  {...field}
                                />
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
                </div>
              ) : (
                <>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col gap-2 [&>*:nth-child(4)]:mt-8"
                    >
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="USERNAME"
                                  type="username"
                                  {...field}
                                />
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
                                <Input
                                  placeholder="PASSWORD"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="CONFIRM PASSWORD"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <Button type="submit">Register</Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
