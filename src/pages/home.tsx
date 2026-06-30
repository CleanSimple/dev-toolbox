import type { Component } from 'solid-js';

import FlowRunner from '@/components/flow/FlowRunner';
import FlowSelector from '@/components/flow/FlowSelector';
import { Flows } from '@/flows';
import { hasKey } from '@cleansimple/utils-js';
import { useNavigate, useParams } from '@solidjs/router';
import { createEffect, Match, Switch } from 'solid-js';

const Home: Component = () => {
    const params = useParams<{ flowId?: string }>();
    const navigate = useNavigate();

    createEffect(() => {
        if (params.flowId && !hasKey(Flows, params.flowId)) {
            navigate('/');
        }
    });

    return (
        <div class='w-full flex flex-col'>
            <Switch>
                <Match when={!params.flowId}>
                    <FlowSelector onSelectFlow={(id) => navigate(`/${id}`)} />
                </Match>
                <Match when={params.flowId && hasKey(Flows, params.flowId)}>
                    <FlowRunner flow={Flows[params.flowId!]} onBack={() => navigate('/')} />
                </Match>
            </Switch>
        </div>
    );
};

export default Home;
