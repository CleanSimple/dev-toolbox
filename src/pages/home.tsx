import FlowRunner from "@/components/FlowRunner";
import FlowSelector from "@/components/FlowSelector";
import { Flows } from "@/flows";
import { useParams } from "@solidjs/router";
import { Match, Switch, type Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { hasKey } from "@/utils";
import { Frown } from "lucide-solid";
import Button from "@/components/controls/Button";


const Home: Component = () => {
    const params = useParams<{ flowId?: string }>();
    const navigate = useNavigate();

    return (
        <div class="w-full flex flex-col">
            <Switch>
                <Match when={!params.flowId}>
                    <FlowSelector onSelectFlow={(id) => navigate(`/${id}`)} />
                </Match>
                <Match when={params.flowId && hasKey(Flows, params.flowId)}>
                    <FlowRunner flow={Flows[params.flowId!]} onBack={() => navigate("/")} />
                </Match>
                <Match when={params.flowId && !hasKey(Flows, params.flowId)}>
                    <div class="flex flex-col items-center justify-center text-main/70 py-16 bg-surface border border-subtle border-dashed rounded-xl">
                        <Frown class="h-10 w-10 mb-2" />
                        <p class="text-sm font-medium">Flow not found</p>
                        <Button variant="primary" class="mt-4" onclick={() => navigate("/")}>
                            Back to flows
                        </Button>
                    </div>
                </Match>
            </Switch>
        </div>
    )
}

export default Home;