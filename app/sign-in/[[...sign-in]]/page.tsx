"use client";
import Image from "next/image";
import Bg from "@/public/assets/register.jpg";
import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import logo from "@/public/assets/logo-dark.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isSignedIn } = useUser();

  const router = useRouter();

  if (isSignedIn) {
    router.back();
  }
  return (
    <>
      {!isSignedIn && (
        <SignIn.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <SignIn.Step name="start" className=" space-y-2">
                <section className=" w-full flex items-center justify-center h-screen">
                  <div className="flex min-h-[80%]  w-[80%] flex-row-reverse">
                    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                      <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="mt-10">
                          <div className="space-y-2">
                            <div>
                              <Image
                                alt=""
                                src={logo}
                                className=" relative right-4"
                              />
                              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign In to Hostel Management System
                              </h2>
                            </div>

                            <Clerk.Field name="identifier">
                              <Clerk.Input type="text" asChild required>
                                <Input placeholder="Username" />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                            <Clerk.Field name="password">
                              <Clerk.Input type="password" asChild required>
                                <Input placeholder="Password" />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                            <SignIn.Action
                              submit
                              asChild
                              disabled={isGlobalLoading}
                            >
                              <Button variant={"default"} className=" w-full">
                                <Clerk.Loading>
                                  {(isLoading) => {
                                    return isLoading ? (
                                      <Loader className="size-4 animate-spin" />
                                    ) : (
                                      "LogIn"
                                    );
                                  }}
                                </Clerk.Loading>
                              </Button>
                            </SignIn.Action>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative hidden w-0 flex-1 lg:block">
                      <Image
                        className="absolute inset-0 h-full w-full object-cover"
                        src={Bg}
                        alt=""
                      />
                    </div>
                  </div>
                </section>
              </SignIn.Step>
            )}
          </Clerk.Loading>
        </SignIn.Root>
      )}
    </>
  );
}
