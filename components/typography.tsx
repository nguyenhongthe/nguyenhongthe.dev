import { PropsWithChildren } from "react";

export const Typography: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="text-white border-0">{children}</div>;
}
