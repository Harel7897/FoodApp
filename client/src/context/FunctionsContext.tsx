import React, { createContext, useContext } from 'react';


function formatCurrency(n: number, currency: string = 'ILS') {
return new Intl.NumberFormat('he-IL', { style: 'currency', currency }).format(n);
}


function phonePretty(p?: string) { return p ? p.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : ''; }


export type FunctionsBag = { formatCurrency: typeof formatCurrency; phonePretty: typeof phonePretty };


const Ctx = createContext<FunctionsBag | undefined>(undefined);


export const FunctionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
<Ctx.Provider value={{ formatCurrency, phonePretty }}>{children}</Ctx.Provider>
);


export const useFx = () => {
const ctx = useContext(Ctx); if (!ctx) throw new Error('useFx must be used inside FunctionsProvider');
return ctx;
};