import type { ParentProps } from 'solid-js';

import logo from '@/assets/logo.svg';
import { A } from '@solidjs/router';
import { ThemeToggle } from './ThemeToggle';

export function Layout(props: ParentProps) {
    return (
        <div class='min-h-screen flex flex-col bg-base text-body'>
            <nav class='bg-content sticky top-0 z-40 shadow px-8 py-4 border-b border-subtle'>
                <div class='max-w-7xl mx-auto flex items-center justify-between gap-10'>
                    <a href='/' class='flex items-center gap-3 font-bold text-xl'>
                        <img src={logo} alt='Dev Toolbox Logo' class='h-8 w-auto' />
                        <span class='text-head'>Dev Toolbox</span>
                    </a>

                    <div class='flex-1 flex justify-start'>
                        <A class='text-body font-semibold hover:text-brand' href='/flows'>Flows</A>
                    </div>

                    <ThemeToggle />
                </div>
            </nav>

            <main class='flex-1 w-full max-w-7xl mx-auto p-8'>
                {props.children}
            </main>
        </div>
    );
}
