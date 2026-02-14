import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { useRegisterSW } from 'virtual:pwa-register/solid'
import styles from './ReloadPrompt.module.css'

const ReloadPrompt: Component = () => {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        immediate: true,
        onRegisteredSW(swUrl, swRegistraion) {
            console.log(`Service Worker at: ${swUrl}`)
            if (import.meta.env.DEV && swRegistraion) {
                setInterval(() => {
                    console.log('Checking for sw update')
                    swRegistraion.update()
                }, 20000 /* 20s for testing purposes */)
            }
            else {
                console.log(`Service Worker Registered.`)
            }
        },
        onRegisterError(error) {
            console.error('Service Worker registration error', error)
        },
    })

    const close = () => {
        setNeedRefresh(false)
    }

    return (
        <div class={styles.Container}>
            <Show when={needRefresh()}>
                <div class={styles.Toast}>
                    <div class={styles.Message}>
                        <span>New content available, click on reload button to update.</span>
                    </div>
                    <button class={styles.ToastButton} onClick={() => updateServiceWorker()}>Reload</button>
                    <button class={styles.ToastButton} onClick={() => close()}>Close</button>
                </div>
            </Show>
        </div>
    )
}

export default ReloadPrompt