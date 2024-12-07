"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const interactua = async () => {
  const response = await fetch("/api/read");
  if (!response.ok) {
    throw new Error("Error!");
  }

  return await response.json();
};

export default function Page() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: interactua,
    enabled: false
  });

  return (
    <div className="w-full max-w-screen-lg p-6 mx-auto">
      <h1 className="text-3xl mb-4">Interactua con el contrato</h1>
      <div className="flex">
        <Button
          className={buttonVariants({ variant: "default" })}
          onClick={() => {
            refetch();
          }}
        >
          Interactua
        </Button>
      </div>
      <div className="my-12 text-bold text-4xl text-red-900">
        {isLoading && "Loading..."}
        {data ? data.readed : null}
      </div>
    </div>
  );
}
