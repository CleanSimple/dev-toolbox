import { type Component, type ParentProps } from 'solid-js';
import { useRegisterSW } from 'virtual:pwa-register/solid';
import ReloadPrompt from './ReloadPrompt';
import OfflinePrompt from './OfflinePrompt';

const SWRegistrationProvider: Component<ParentProps> = (props) => {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        offlineReady: [offlineReady, setOfflineReady],
        updateServiceWorker,
    } = useRegisterSW({
        immediate: true,
        onRegisteredSW(swUrl, swRegistration) {
            console.log(`Service Worker at: ${swUrl}`);
            if (import.meta.env.DEV && swRegistration) {
                setInterval(() => {
                    console.log('Checking for sw update');
                    swRegistration.update();
                }, 20000 /* 20s for testing purposes */);
            } else {
                console.log(`Service Worker Registered.`);
            }
        },
        onRegisterError(error) {
            console.error('Service Worker registration error', error);
        },
    });

    const closeReload = () => {
        setNeedRefresh(false);
    };

    const closeOffline = () => {
        setOfflineReady(false);
    };

    return (
        <>
            {props.children}
            <ReloadPrompt
                show={needRefresh()}
                onClose={closeReload}
                onUpdate={() => updateServiceWorker(true)}
            />
            <OfflinePrompt
                show={offlineReady()}
                onClose={closeOffline}
            />
        </>
    );
};

export default SWRegistrationProvider;
