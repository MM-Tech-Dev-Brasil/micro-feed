"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface PostComposerProps {
  onPost: (content: string) => void;
  placeholder?: string;
}

/**
 * Componente para criação de novas postagens.
 * A Card de composição se esconde ao rolar para baixo e reaparece ao rolar para cima.
 *
 * @param {object} props - As propriedades do componente.
 * @param {Function} props.onPost - Função para enviar o conteúdo da postagem.
 * @param {string} [props.placeholder] - O texto de placeholder do textarea.
 */
export function PostComposer({
  onPost,
  placeholder = "What is happening?!",
}: PostComposerProps) {
  const [content, setContent] = useState("");
  const [showComposer, setShowComposer] = useState(true);
  const maxChars = 280;
  const remainingChars = maxChars - content.length;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // Esconde a Card se o usuário rolar para baixo, mostra se rolar para cima.
      if (window.scrollY > lastScrollY + 10) {
        setShowComposer(false);
      } else if (window.scrollY < lastScrollY - 10) {
        setShowComposer(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.length > 0 && content.length <= maxChars) {
      onPost(content);
      setContent("");
    }
  };

  return (
    <div
      className={`fixed top-28 left-0 right-0 flex justify-center z-50 transition-all duration-300 ${
        showComposer
          ? "opacity-100 translate-y-0"
          : "-translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-xl px-4">
        <Card className="rounded-2xl bg-zinc-900 p-4 shadow-xl border border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-2">
            <Textarea
              className="w-full bg-zinc-900 text-white placeholder:text-zinc-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none"
              placeholder={placeholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-between items-center">
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  remainingChars < 0 ? "text-red-500" : "text-zinc-400"
                }`}
              >
                {remainingChars}
              </span>
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                Post
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
