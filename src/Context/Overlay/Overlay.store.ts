import { ReactNode } from 'react';
import {create} from 'zustand'
export interface OverlayStore {
    isOpen:boolean,
    closeOnClickOutside:boolean,
    child: ReactNode,
    open:(child: ReactNode, closeOnClickOutside?: boolean) =>void;
    close:()=>void;
}

export const useOverlay = create<OverlayStore>((set)=>({
    isOpen:false,
    closeOnClickOutside:false,
    child:null,
    open:(child: ReactNode, closeOnClickOutside: boolean=false)=>set(()=>({isOpen:true,child,closeOnClickOutside})),
    close:()=>set(()=>({isOpen:false}))
}))