import { type ChainType, type LoginReq } from "~/lib/modal/user";
import request, { base2Api } from "~/lib/request";

import { type EmailRegisterParams, type EmailLoginParams } from "../modal/user";

export const getEmailCode = (email: string) => {
  return request<boolean>(base2Api, {
    url: `/lg/email/code`,
    method: "POST",
    data: {
      email,
    },
  });
};

export const emailRegister = (par: EmailRegisterParams) => {
  return request<{ token: string }>(base2Api, {
    url: `/lg/email/register`,
    method: "POST",
    data: par,
  });
};

export const emailLogin = (par: EmailLoginParams) => {
  return request<{ token: string }>(base2Api, {
    url: `/lg/email/login`,
    method: "POST",
    data: par,
  });
};

export const getNonce = (address: string) => {
  return request<{ nonce: string }>(base2Api, {
    url: `/lg/wallet/nonce`,
    method: "POST",
    data: { wallet: address },
  });
};

export const walletLogin = (
  signature: string,
  message: LoginReq,
  code: string,
  chain: ChainType,
  type?: string,
  google2faCode?: string,
) => {
  return request<{ token: string }>(base2Api, {
    url: `/lg/wallet/login`,
    method: "POST",
    data: { signature, message, code, chain, type, google2faCode },
  });
};

export const googleLogin = (idToken: string) => {
  return request<{ token: string }>(base2Api, {
    url: `/lg/google/login`,
    method: "POST",
    data: { idToken },
  });
};

export const googleToken = (id: string) => {
  return request<string>(base2Api, {
    url: `/lg/google/token`,
    method: "POST",
    data: { id },
  });
};
