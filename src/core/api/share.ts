import { resolveServiceURL } from "./resolve-service-url";
import { getStateValue } from "~/lib/utils";

export function createShareId(thread_id: string) {
  const token = getStateValue("state.token");
  if (!token) return;
  return fetch(resolveServiceURL(`/api/v1/chat/thread/${thread_id}/share`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch(() => {
      return null;
    });
}

export function getShareMessages(share_id: string) {
  return fetch(resolveServiceURL(`/api/share/${share_id}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch(() => {
      return null;
    });
}
