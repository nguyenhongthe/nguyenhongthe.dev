import { PropsWithChildren } from 'react';

export const Input: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="relative">
            {children}
            <div className="absolute inset-0 border-b border-zinc-400 pointer-events-none"></div>
        </div>
    );
}

export const OutlinedInput: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="text-white">{children}</div>;
}

export const OutlinedInput: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="text-white">{children}</div>;
}
