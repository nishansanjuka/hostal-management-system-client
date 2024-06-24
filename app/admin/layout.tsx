import { AdminContent } from "@/components/layouts/admin/Admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <AdminContent>{children}</AdminContent>
    </main>
  );
}
