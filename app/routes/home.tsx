import {Game} from '../game'
import { useState } from 'react';

function Profile() {
    return (
    <img
        src="https://i.imgur.com/MK3eW3As.jpg"
        alt="Katherine Johnson"
    />
    );
}
  
export function Home() {
    return (
        <section className="flex flex-col justify-between items-center bg-[#0e347a] min-h-full min-w-min p-4 overflow-hidden">
            <Game/>
        </section>
    );
}
  
export function Test(){
    return <p className="flex text-xl text-white border border-gray-800 p-16"> Is there anyone??</p>
}
export function Button({text = ""}){
    return (
    <button className="flex text-xl text-white border border-gray-700 p-4 hover:bg-gray-800 rounded-full">
        {text}
    </button>
    )
}