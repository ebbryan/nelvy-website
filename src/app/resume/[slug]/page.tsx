import PageContent from "./PageContent";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return;
  return (
    <div>
      <PageContent id={slug} />
    </div>
  );
}
