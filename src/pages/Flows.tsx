import type { Component } from 'solid-js';

import FlowRunner from '@/components/Flow/FlowRunner';
import FlowSelector from '@/components/Flow/FlowSelector';
import { Flows as Flows_ } from '@/flows';
import { hasKey } from '@cleansimple/utils-js';
import { useNavigate, useParams } from '@solidjs/router';
import { createEffect, Match, Switch } from 'solid-js';

const Flows: Component = () => {
    const params = useParams<{ flowId?: string }>();
    const navigate = useNavigate();

    createEffect(() => {
        if (params.flowId && !hasKey(Flows_, params.flowId)) {
            navigate('/flows');
        }
    });

    return (
        <div class='w-full flex flex-col'>
            <Switch>
                <Match when={!params.flowId}>
                    <FlowSelector />
                </Match>
                <Match when={params.flowId && hasKey(Flows_, params.flowId)}>
                    <FlowRunner flow={Flows_[params.flowId!]} onBack={() => navigate('/flows')} />
                </Match>
            </Switch>
        </div>
    );
};

export default Flows;
