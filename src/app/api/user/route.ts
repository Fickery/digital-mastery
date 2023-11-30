import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

// user signup validation schema
const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(20),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = userSchema.parse(body);

    //check if username exist
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, error: "Username already in use" },
        { status: 409 },
      );
    }

    //check if password is valid
    if (password.length < 8) {
      return NextResponse.json(
        {
          user: null,
          error: "Password must be at least 8 characters long",
        },
        { status: 400 },
      );
    }

    //create user
    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong user not created!" },
      { status: 500 },
    );
  }
}

// // user signup validation schema
// const userSchema = z.object({
//   // email: z.string().min(1, "Email is required").email("Invalid email"),
//   username: z.string().min(1, "Username is required").max(20),
//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(8, "Password must be at least 8 characters"),
//   // confirmPassword: z.string().min(1, "Confirm password is required"),
// });
// // .refine((data) => data.password === data.confirmPassword, {
// //   path: ["confirmPassword"],
// //   message: "Passwords do not match",
// // });

//check if email exist
// const existingUserByEmail = await db.user.findUnique({
//   where: { email: email },
// });
// if (existingUserByEmail) {
//   return NextResponse.json(
//     { user: null, error: "Email already in use" },
//     { status: 409 },
//   );
// }
