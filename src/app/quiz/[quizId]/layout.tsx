import type { ReactNode } from "react";

export async function generateMetadata({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  return {
    title: "Completaste el módulo",
    description: `Mapa reflexivo del recorrido (${decodeURIComponent(quizId)}).`,
  };
}

export default function QuizIdLayout({ children }: { children: ReactNode }) {
  return children;
}
