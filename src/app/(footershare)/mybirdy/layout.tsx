export default function MybirdyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col text-black ">
      <div className="flex-1">{children}</div>
    </div>
  );
}
