import {Game} from '../game'
import { useState } from 'react';

export function Home() {
    return (
        <section className="flex flex-col justify-between items-center bg-[#0e347a] min-h-full min-w-min p-4 overflow-hidden">
            <Game/>
        </section>
    );
}