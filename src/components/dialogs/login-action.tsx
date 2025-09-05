"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Mail } from "lucide-react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "../ui/button";
import { GoogleIcon } from "../svg";
import { useRootStore } from "~/store";
import logoImg from "~/assets/images/logo.png";
import EmailLogin from "../ui/email-login";
import Register from "../ui/register";
import { useUserDetail } from "~/hooks/useUserDetail";
import { loginWithPopup } from "~/hooks/auth-popup";
import { googleToken } from "~/lib/api/login";
import { LoginType } from "~/lib/modal/user";
import { env } from "~/env";
import { useRouter } from "next/navigation";

const loginUrl = env.NEXT_PUBLIC_GOOGLE_LOGIN_URL || "";

export enum LoginState {
  Base = "Base",
  EmailLogin = "EmailLogin",
  EmailRegister = "EmailRegister",
}
const LoginAction = () => {
  const {
    token,
    loginModalOpen,
    setLoginModalOpen,
    updateToken,
    updateLoginType,
  } = useRootStore();
  const [curState, setCurState] = useState<LoginState>(LoginState.Base);
  const { fetchUserDetail } = useUserDetail();
  const router = useRouter();
  console.log("loginUrl", loginUrl);
  const handleStateChange = (state: LoginState) => {
    setCurState(state);
  };
  useEffect(() => {
    if (token) {
      fetchUserDetail();
    }
  }, [token]);

  const handleLogin = async () => {
    try {
      const res = await loginWithPopup(loginUrl, "/auth/popup-callback");
      console.log("OAuth result:", res);
      if (res.id) {
        const gtRes = await googleToken(res.id);
        if (gtRes.code === 1 && gtRes.result) {
          updateToken(gtRes.result);
          setLoginModalOpen(false);
          updateLoginType(LoginType.Google);
          router.push("/chat");
        } else {
          console.error("Google token exchange failed:", gtRes);
        }
      }

      // …根据你的产品逻辑跳转页面
      // router.push("/dashboard");
    } catch (e: any) {
      console.error("Login failed:", e);
    }
  };

  return (
    <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
      <DialogContent>
        <div className="flex h-full flex-col p-4">
          <div className="flex-1">
            {/* base */}
            {curState === LoginState.Base && (
              <div>
                <div className="px-6 pt-1 pb-2 text-center">
                  {/* <Avatar className="w-24 h-24 mx-auto rounded-full bg-neutral-200 dark:bg-neutral-800">
                                        <AvatarImage src={logoImg || ''} />
                                    </Avatar> */}
                  <div className="mx-auto h-24 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800">
                    <img className="h-full w-full" src="/images/logo.png" />
                  </div>
                  <h2 className="font-brand-medium mt-6 text-3xl tracking-tight">
                    Log In
                  </h2>
                  <p className="mt-6 text-base text-neutral-600 dark:text-neutral-300">
                    Sign up to get{" "}
                    <span className="text-brand-primary font-medium">
                      150 free
                    </span>{" "}
                    Credits every day
                  </p>
                </div>
                {/* 登录方式 */}
                <div className="mt-2 space-y-4 px-6 pb-6">
                  <Button
                    variant="outline"
                    className="text-brand-black rounded-2 border-neutral-2 h-12 w-full justify-center gap-3 bg-white"
                    onClick={() => {
                      handleLogin();
                    }}
                    // disabled={googleLoading}
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center">
                      <GoogleIcon />
                    </span>
                    Continue with Google
                  </Button>

                  <Button
                    variant="outline"
                    className="text-brand-black rounded-2 h-12 w-full justify-center gap-3 border-neutral-200 bg-white"
                    onClick={() => setCurState(LoginState.EmailLogin)}
                  >
                    <Mail className="h-5 w-5" />
                    Continue with E-mail
                  </Button>

                  {/* <div className="flex items-center gap-3 py-2">
                                        <Separator className="flex-1" />
                                        <span className="text-sm text-neutral-500">Or</span>
                                        <Separator className="flex-1" />
                                    </div> */}

                  {/* <WalletButtonCustom /> */}

                  <div className="text-center text-sm text-neutral-700 dark:text-neutral-300">
                    Don’t have an account?{" "}
                    <a
                      href="#"
                      onClick={() =>
                        handleStateChange(LoginState.EmailRegister)
                      }
                      className="text-brand-primary font-medium underline-offset-4 hover:underline"
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
          <div className="text-muted-foreground px-6 pb-8 text-center text-xs">
            By continuing, you agree to the{" "}
            <a
              href="#"
              className="text-brand-primary underline underline-offset-4"
            >
              Terms of Use
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-brand-primary underline underline-offset-4"
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
