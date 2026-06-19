import type { Component } from "solid-js";
import type { Flow } from "@/flows";

interface FlowRunnerProps {
    flow: Flow;
}

const FlowRunner: Component<FlowRunnerProps> = (props) => {
    return (
        <div>
            <h1 class="text-xl font-bold mb-4">{props.flow.name}</h1>
        </div>
    );
};

export default FlowRunner;