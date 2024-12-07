"use client";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { useRkAccountModal } from "@/lib/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
import Navigation from "./Navigation";
import { ABI, CONTRACT_ADDRESS } from "../lib/contract";

export default function Container() {
  const { openAccountModal } = useRkAccountModal();
  const { isConnected } = useAccount();
  const result = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "hello_world"
  });

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="mx-auto">
        <Navigation />
      </div>
      <div className="w-full flex justify-center">
        {result.data ? (
          <div className="text-2xl">{result?.data}</div>
        ) : (
          <div className="text-2xl">Cargandoooo!!!</div>
        )}
      </div>

      <section className="max-w-2xl mt-12 mx-auto">
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="w-full p-0 border border-b-2 grid grid-cols-2">
            <TabsTrigger className="h-full" value="feed">
              Everything
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                if (!isConnected) {
                  // Abrimos el modal de conectar wallet
                  // si no está conectado
                  openAccountModal?.();
                }
              }}
              className="h-full"
              value="personal"
            >
              My publications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feed">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <section key={Date.now() * i} className="p-4 border rounded-lg">
                  <nav className="flex items-center gap-1">
                    <strong>0x03242</strong>
                    <span className="opacity-70">posted</span>
                  </nav>
                  <p className="text-black/70 mt-2">
                    This is the feed where you can see all the posts from
                    everyone.
                  </p>
                </section>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="personal">My publications</TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
