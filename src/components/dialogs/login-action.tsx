"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
} from "~/components/ui/dialog";
import { Mail } from "lucide-react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "../ui/button";
import { GoogleIcon } from "../svg";
import { useRootStore } from "~/store";
import logoImg from "~/assets/images/logo.png";
import EmailLogin from "../ui/email-login";
import Register from "../ui/register";
import { useUserDetail } from "~/hooks/useUserDetail";

export enum LoginState {
  Base = "Base",
  EmailLogin = "EmailLogin",
  EmailRegister = "EmailRegister",
}
const LoginAction = () => {
    const { token, loginModalOpen, setLoginModalOpen } = useRootStore();
    const [curState, setCurState] = useState<LoginState>(LoginState.Base);
    const { fetchUserDetail } = useUserDetail();
    const handleStateChange = (state: LoginState) => {
        setCurState(state);
    };
    useEffect(() => {
        if (token) {
            fetchUserDetail();
        }
    }, [token]);

    return (
        <Dialog
            open={loginModalOpen}
            onOpenChange={setLoginModalOpen}
        >
            <DialogContent>
                <div className="flex flex-col h-full p-4">
                    <div className="flex-1">
                        {/* base */}
                        {curState === LoginState.Base && (
                            <div>
                                <div className="px-6 pt-1 pb-2 text-center">
                                    {/* <Avatar className="w-24 h-24 mx-auto rounded-full bg-neutral-200 dark:bg-neutral-800">
                                        <AvatarImage src={logoImg || ''} />
                                    </Avatar> */}
                                    <div className="w-24 h-24 mx-auto rounded-full bg-neutral-200 dark:bg-neutral-800">
                                        <img
                                            className="h-full w-full"
                                            src="/images/logo.png"
                                        />
                                    </div>
                                    <h2 className="mt-6 text-3xl tracking-tight font-brand-medium">
                                        Log In
                                    </h2>
                                    <p className="mt-6 text-base text-neutral-600 dark:text-neutral-300">
                                        Sign up to get{" "}
                                        <span className="font-medium text-brand-primary">
                                            150 free
                                        </span>{" "}
                                        Credits every day
                                    </p>
                                </div>
                                {/* 登录方式 */}
                                <div className="px-6 pb-6 mt-2 space-y-4">
                                    <Button
                                        variant="outline"
                                        className="justify-center w-full h-12 gap-3 bg-white text-brand-black rounded-2 border-neutral-2"
                                        // onClick={() => {
                                        //     toGoogleLogin(GoogleLoginType.Login);
                                        // }}
                                        // disabled={googleLoading}
                                    >
                                        <span className="inline-flex items-center justify-center w-6 h-6">
                                            <GoogleIcon />
                                        </span>
                                        Continue with Google
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="justify-center w-full h-12 gap-3 bg-white text-brand-black rounded-2 border-neutral-200"
                                        onClick={() => setCurState(LoginState.EmailLogin)}
                                    >
                                        <Mail className="w-5 h-5" />
                                        Continue with E-mail
                                    </Button>

                                    {/* <div className="flex items-center gap-3 py-2">
                                        <Separator className="flex-1" />
                                        <span className="text-sm text-neutral-500">Or</span>
                                        <Separator className="flex-1" />
                                    </div> */}

                                    {/* <WalletButtonCustom /> */}

                                    <div className="text-sm text-center text-neutral-700 dark:text-neutral-300">
                                        Don’t have an account?{" "}
                                        <a
                                            href="#"
                                            onClick={() =>
                                                handleStateChange(LoginState.EmailRegister)
                                            }
                                            className="font-medium text-brand-primary underline-offset-4 hover:underline"
                                        >
                                            Sign Up
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                        {curState === LoginState.EmailRegister && (
                            <Register changeState={handleStateChange} />
                        )}
                        {curState === LoginState.EmailLogin && (
                            <EmailLogin changeState={handleStateChange} />
                        )}
                    </div>
                    {/* 协议 */}
                    <div className="px-6 pb-8 text-xs text-center text-muted-foreground">
                        By continuing, you agree to the{" "}
                        <a
                            href="#"
                            className="underline text-brand-primary underline-offset-4"
                        >
                            Terms of Use
                        </a>{" "}
                        and{" "}
                        <a
                            href="#"
                            className="underline text-brand-primary underline-offset-4"
                        >
                            Privacy Policy
                        </a>
                        .
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginAction;