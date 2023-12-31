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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required").max(20),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const signInData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      toast({
        title: "Error",
        description: signInData.error,
        variant: "destructive",
      });
    } else {
      router.refresh();
      router.push("/home");
    }
  };

  const handleExternalSignIn = async (provider: string) => {
    console.log("provider", provider);
    try {
      const signInData = await signIn(provider, {
        redirect: false,
      });

      if (signInData?.error) {
        toast({
          title: "Error",
          description: signInData.error,
          variant: "destructive",
        });
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error("External sign-in error:", error);
    }
  };
  return (
    <div>
      <p className="text-shadow-white pb-4">WELCOME BACK</p>
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
        <p onClick={() => handleExternalSignIn("google")}>GOOGLE</p>
        <p onClick={() => handleExternalSignIn("facebook")}>FACEBOOK</p>
        <p onClick={() => handleExternalSignIn("github")}>GITHUB</p>
      </div>
    </div>
  );
}
