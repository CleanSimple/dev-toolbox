import FlowRunner from "@/components/FlowRunner";
import FlowSelector from "@/components/FlowSelector";
import { Flows } from "@/flows";
import { useParams } from "@solidjs/router";
import { createEffect, Match, Switch, type Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { hasKey } from "@/utils";


const Home: Component = () => {
    const params = useParams<{ flowId?: string }>();
    const navigate = useNavigate();

    createEffect(() => {
        if (params.flowId && !hasKey(Flows, params.flowId))
            navigate("/");
    })

    return (
        <div class="w-full flex flex-col">
            <Switch>
                <Match when={!params.flowId}>
                    <FlowSelector onSelectFlow={(id) => navigate(`/${id}`)} />
                </Match>
                <Match when={params.flowId && hasKey(Flows, params.flowId)}>
                    <FlowRunner flow={Flows[params.flowId!]} onBack={() => navigate("/")} />
                </Match>
            </Switch>
        </div>
    )
}

export default Home;