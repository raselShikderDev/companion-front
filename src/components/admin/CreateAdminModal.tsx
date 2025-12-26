"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createAdmin } from "@/services/admin/createAdmin.service";
import InputFeildError from "@/lib/inputFeildError";
import { IInputErrorState } from "@/lib/getInputFeildError";

export function CreateAdminModal() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [state, formAction, isPending] = useActionState(createAdmin, null);

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
        } else if (state?.success === false) {
            toast.error(state.message);
        }
    }, [state]);
console.log({state});

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-accent">Create Admin</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create New Admin</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="space-y-4">
                    <div className="space-y-1">
                        <div>
                            <Label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full name
                            </Label>
                            <Input name="fullName" placeholder="Rasel Shikder" required />
                        </div>
                        <InputFeildError feild="fullName" state={state as IInputErrorState} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="phone"
                            className="block text-sm font-medium text-gray-700">Phone</Label>
                        <Input name="phone" placeholder="+8801234567890" required />
                        <InputFeildError feild="phone" state={state as IInputErrorState} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email"
                            className="block text-sm font-medium text-gray-700">Email</Label>
                        <Input name="email" type="email" placeholder="your@email.com" required />
                        <InputFeildError feild="email" state={state as IInputErrorState} />
                    </div>

                    <div>
                        <Label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </Label>
                        <div className="mt-1 relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none pr-10 `}
                                placeholder="Enter your password"
                            />
                            <Button
                                type="button"
                                variant={"ghost"}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute cursor-poiner inset-y-0 right-0 px-3 flex items-center text-gray-500"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                        <InputFeildError feild="password" state={state as IInputErrorState} />
                    </div>




                    <Button type="submit" className="w-full bg-accent" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create Admin"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
