import CommonLayout from "@/components/layout/CommonLayout";

export default function SendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommonLayout noPadding>
      <main>{children}</main>
    </CommonLayout>
  );
}
