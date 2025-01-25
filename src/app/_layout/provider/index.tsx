"use client";

import { type ReactNode } from "react";

import { AuthProvider } from "@/app/_layout/provider/AuthProvider";
import { useResizeViewport } from "@/app/_layout/provider/hooks";
import { useModalContainer } from "@/ui/modal/modalProvider";
import { type SessionUser } from "@/utils";
import { SessionProvider } from "next-auth/react";

type ClientProviderProps = {
  children: ReactNode;
  sessionUser: SessionUser | undefined;
};

/**
 * サイト全体に適用するcontextや、client側実行コードを設定するコンポーネント
 * @returns nested providers
 */
export const ClientProvider = ({
  children,
  sessionUser,
}: ClientProviderProps) => {
  const Modals = useModalContainer();
  useResizeViewport();
  return (
    <SessionProvider>
      <AuthProvider {...{ sessionUser }}>
        {children}
        <Modals />
      </AuthProvider>
    </SessionProvider>
  );
};
