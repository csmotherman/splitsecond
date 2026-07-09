"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function HomePage() {
    useEffect(() => {
        async function checkUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            console.log("USER:", user);
        }

        checkUser();
    }, []);

    return <h1>SplitSecond</h1>;
}