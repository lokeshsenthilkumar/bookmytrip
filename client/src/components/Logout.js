import React from 'react'

export default function Logout() {
    sessionStorage. clear();
    window.location = '/';
}
