import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthenticator } from "@aws-amplify/ui-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { DropDownNavigation } from "./DropDownNavigation";
import { ArrowRight } from "lucide-react";


export default function Navbar() {

    const navigate = useNavigate();
    const { authStatus, signOut } = useAuthenticator((context) => [
        context.authStatus,
    ]);

  
    return (
      <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between border-b border-zinc-100">
             <div
                onClick={() => navigate("/")}
                className="flex z-40 font-semibold cursor-pointer"
                >
                Romonas<span> Home </span> Care
                </div>
  
            <div className="h-full flex items-center space-x-4">
            {authStatus === "authenticated" ? (
                <>
                    <DropDownNavigation />
                    <Button
                    onClick={() => {
                        signOut();
                        navigate("/");
                    }}
                    variant="ghost"
                    size="sm"
                    >
                    Sign out
                    </Button>
                    {true ? (
                    <Button
                        onClick={() => navigate("/dashboard")}
                        variant="ghost"
                        size="sm"
                        className="hidden sm:flex items-center gap-1"
                    >
                        Dashboard
                    </Button>
                    ) : (
                    <Button
                        onClick={() => navigate(`/profile/joshuamahabir1402@gmail.com`)}
                        variant="ghost"
                        size="sm"
                        className="hidden sm:flex items-center gap-1"
                    >
                        View resident
                        <ArrowRight className="ml-1.5 h-5 w-5" />
                    </Button>
                    )}
                </>
                ) : (
                <>
                    <DropDownNavigation />
                    <Button
                    onClick={() => navigate("/auth")}
                    variant="ghost"
                    size="sm"
                    >
                    Login
                    </Button>
                </>
                )}
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    );
  }