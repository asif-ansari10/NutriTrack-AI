import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/PublicFooter";
export default function PublicLayout({children}:{children:React.ReactNode}) {
  return <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d]"><PublicNavbar/><main>{children}</main><PublicFooter/></div>;
}
