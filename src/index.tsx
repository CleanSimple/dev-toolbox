/* @refresh reload */
import { App } from '@/app/App';
import { render } from 'solid-js/web';
import '@/styles/index.css';

const root = document.getElementById('root');

render(() => <App />, root!);
