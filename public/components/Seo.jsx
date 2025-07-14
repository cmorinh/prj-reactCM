import React from 'react';
import { Helmet } from "react-helmet-async";

export default function Seo({title}) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content="Welcome to my amazing store" />
            </Helmet>
        </>
    )
}