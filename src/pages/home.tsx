import FlowSelector from "@/components/FlowSelector";
import type { Component } from "solid-js";


const Home: Component = () => {
    return (
        <div class="min-h-screen p-6">
            <div class="max-w-4xl mx-auto">
                <FlowSelector />
            </div>
        </div>
    )
}

export default Home;