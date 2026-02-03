import { ReactNode } from "react";

interface MobileOnlyWrapperProps {
  children: ReactNode;
}

export function MobileOnlyWrapper({ children }: MobileOnlyWrapperProps) {
  return (
    <div className="min-h-screen w-full bg-black flex items-start justify-center">
      <div 
        className="w-full max-w-[430px] min-h-screen bg-background relative mobile-frame-shadow overflow-hidden"
        style={{ maxWidth: "430px" }}
      >
        <div className="h-full overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
