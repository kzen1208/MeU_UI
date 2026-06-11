"use client";

import { useParams } from "next/navigation";
import HubCategoryPage from "@/components/hub/HubCategoryPage";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();

  return <HubCategoryPage slug={params?.slug ?? ""} />;
}
