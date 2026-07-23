import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { PostRow } from "@/types/database";
import { PostForm } from "./post-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <h1 className="font-serif text-3xl">Tulisan baru</h1>
        <div className="mt-8">
          <PostForm />
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const post = data as PostRow;

  return (
    <div>
      <h1 className="font-serif text-3xl">Edit tulisan</h1>
      <p className="mt-1 text-sm text-muted">{post.title}</p>
      <div className="mt-8">
        <PostForm post={post} />
      </div>
    </div>
  );
}
