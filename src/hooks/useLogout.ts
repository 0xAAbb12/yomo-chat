import { useRootStore } from "~/store";
import { useUserDetail } from "~/hooks/useUserDetail";
// import { LoginType } from "~/modal";
// import { useGoogleLogin } from "~/hooks/useGoogleLogin";

export const useLogout = () => {
  const { clearUserDetail, updateToken, setLoginModalOpen } = useRootStore();
  const { clearUser } = useUserDetail();
  // const { googleLogout } = useGoogleLogin();
  const logout = () => {
    // 清空用户信息
    clearUserDetail();
    clearUser();

    // 清空token
    updateToken("");

    // 关闭登录模态框（如果打开的话）
    setLoginModalOpen(false);

    // if (loginType === LoginType.Google) {
    //   // Google登录的退出逻辑
    //   googleLogout();
    // }

    // 清除本地存储
    localStorage.removeItem("token");
    localStorage.removeItem("userDetail");
    localStorage.removeItem("creditsInfo");
  };

  return { logout };
};
