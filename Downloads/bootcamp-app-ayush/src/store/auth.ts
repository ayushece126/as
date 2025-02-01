// // src/store/auth.ts
// import { create } from "zustand";
// import jwt from "jsonwebtoken";

// interface AuthState {
//     token: string | null;
//     user: { id: number; name: string; email: string; role: string } | null;
//     setAuth: (token: string, user: { id: number; name: string; email: string; role: string }) => void;
//     logout: () => void;
//     initializeAuth: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//     token: null,
//     user: null,
//     setAuth: (token, user) => set({ token, user }),
//     logout: () => {
//         localStorage.removeItem("token");
//         set({ token: null, user: null });
//     },
//     initializeAuth: () => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             const decoded = jwt.decode(token) as jwt.JwtPayload | null;

//             if (decoded && typeof decoded === "object" && "id" in decoded && "name" in decoded && "email" in decoded && "role" in decoded) {
//                 const { id, name, email, role } = decoded;
//                 set({ token, user: { id, name, email, role } });
//             } else {
//                 localStorage.removeItem("token");
//                 set({ token: null, user: null });
//             }
//         }
//     },
// }));


import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwt from "jsonwebtoken";

interface AuthState {
    token: string | null;
    user: { id: number; name: string; email: string; role: string } | null;
    setAuth: (token: string, user: { id: number; name: string; email: string; role: string }) => void;
    isAuthLoading: boolean;
    logout: () => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthLoading: true,
            setAuth: (token, user) => set({ token, user, isAuthLoading: false }),
            logout: () => {
                localStorage.removeItem("token");
                set({ token: null, user: null, isAuthLoading: false });
            },
            initializeAuth: () => {
                set({ isAuthLoading: true });

                const token = localStorage.getItem("token");
                if (token) {
                    const decoded = jwt.decode(token) as jwt.JwtPayload | null;

                    if (
                        decoded &&
                        typeof decoded === "object" &&
                        "id" in decoded &&
                        "name" in decoded &&
                        "email" in decoded &&
                        "role" in decoded
                    ) {
                        const { id, name, email, role } = decoded;
                        set({ token, user: { id, name, email, role }, isAuthLoading: false });
                    } else {
                        localStorage.removeItem("token");
                        set({ token: null, user: null, isAuthLoading: false });
                    }
                } else {
                    set({ isAuthLoading: false }); // No token found, stop loading
                }
            },
        }),
        {
            name: "auth", // key name
            partialize: (state) => ({ token: state.token, user: state.user }), // persist token and user
        }
    )
);

// Ensure the store is initialized with the persisted data.
export const initializeAuthState = () => {
    useAuthStore.getState().initializeAuth();
};
