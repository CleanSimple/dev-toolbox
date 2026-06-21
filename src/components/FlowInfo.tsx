import { For, type Component } from "solid-js";
import type { Flow } from '@/flows';
import { ArrowRight } from "lucide-solid";
import Card from "./controls/Card";
import GroupBox from "./controls/GroupBox";
import Chip from "./controls/Chip";
import { Operations } from "@/operations";
import { Formatters } from "@/formatters";
import { DataFormats, nameOfDataFormat } from "@/data-formats";
import { Parsers } from "@/parsers";


interface FlowInfoProps {
    flow: Flow;
    onClick?: () => void;
}

const FlowInfo: Component<FlowInfoProps> = (props) => {
    return (
        <Card
            class="flex flex-col gap-3 hover:border-brand/50 transition-colors cursor-pointer group"
            onClick={props.onClick}
        >
            <h3 class="text-lg font-bold text-main group-hover:text-brand transition-colors">{props.flow.name}</h3>
            <For each={props.flow.pipelines}>
                {(pipeline) => (
                    <Pipeline
                        dataFormatId={props.flow.dataFormatId}
                        parserId={props.flow.parserId}
                        pipeline={pipeline} />
                )}
            </For>
        </Card>
    );
};

interface PipelineInfo {
    dataFormatId: Flow["dataFormatId"];
    parserId: Flow["parserId"];
    pipeline: Flow["pipelines"][number]
}

const Pipeline: Component<PipelineInfo> = (props) => {
    const inputFormat = DataFormats[props.dataFormatId].name;
    const parserName = Parsers[props.parserId].parser.name;

    const operations = props.pipeline.operations.map(
        op => {
            const operation = Operations[op.operationId];
            const operationName = operation.operation.name;
            const outputFormat = nameOfDataFormat(operation.outType);
            const formatterName = Formatters[op.formatterId].formatter.name;
            return { operationName, outputFormat, formatterName }
        }
    );

    return (<GroupBox class="flex flex-col gap-3">
        <span class="text-xs font-bold">{props.pipeline.name} Pipeline</span>
        <div class="flex flex-wrap items-center gap-2 text-sm">
            <Chip variant="outlined" color="neutral">
                Input: {inputFormat} {parserName !== "Default" ? ` as ${parserName}` : null}
            </Chip>
            <ArrowRight class="h-4 w-4 text-muted" />
            <For each={operations}>
                {(op, index) => (
                    <>
                        <Chip variant="outlined" color="neutral">
                            {op.operationName}: {op.outputFormat} {op.formatterName !== op.outputFormat ? ` as ${op.formatterName}` : null}
                        </Chip>
                        {index() !== props.pipeline.operations.length - 1
                            ? <ArrowRight class="h-4 w-4 text-muted" />
                            : null
                        }
                    </>
                )}
            </For>
        </div>
    </GroupBox>)
}

export default FlowInfo;