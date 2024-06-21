"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";

export default function GoogleCaptchaWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const recaptchaKey: string | undefined = "6LcY_fwpAAAAAAP0NJSQ9o4iNR5aOuJPNb_rFalo";
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}