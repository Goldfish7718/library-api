import createController from "../utils/createController";
import { UserSchemaType, userSchema } from "../models/user.model";
import { ZodError } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import generateToken from "../services/generateToken";

const prisma = new PrismaClient();

export const getUsers = createController(async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
});

export const createUser = createController(async (req, res): Promise<any> => {
  try {
    let { user }: { user: UserSchemaType } = req.body;

    userSchema.parse(user);

    const potentialUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (potentialUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    user = {
      ...user,
      password: hashedPassword,
    };

    const newUser = await prisma.user.create({
      data: user,
    });

    const { id, name, email, isEmailVerified, role, isActive } = newUser;

    const payload = {
      id,
      name,
      email,
      isEmailVerified,
      role,
      isActive,
    };

    const token = generateToken(payload);

    res
      .status(200)
      .cookie("token", `Bearer ${token}`, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      })
      .json({ newUser });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const login = createController(async (req, res): Promise<any> => {
  try {
    let { user }: { user: UserSchemaType } = req.body;

    const partialUserSchema = userSchema.pick({
      email: true,
    });

    partialUserSchema.parse(user);

    const potentialUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!potentialUser) {
      return res.status(200).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(user.password, potentialUser.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect Credentials" });
    }

    const { id, name, email, isEmailVerified, role, isActive } = potentialUser;

    const payload = {
      id,
      name,
      email,
      isEmailVerified,
      role,
      isActive,
    };

    const token = generateToken(payload);

    res
      .status(200)
      .cookie("token", `Bearer ${token}`, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      })
      .json({ potentialUser });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const deleteUser = createController(async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "User deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
});

export const logout = createController(async (req, res) => {
  try {
    res.clearCookie("token").json({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
