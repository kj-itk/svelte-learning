<script lang="ts">
	import type { Action } from '@sveltejs/kit';
	import { animate, stagger, type AnimationControls } from 'motion';

	type Options = {
		options: AnimationControls;
		action: ({ animation }: { animation: AnimationControls }) => void;
	};
	interface Attributes {
		'on:finished'?: (event: CustomEvent) => void;
	}

	type TextAction = Action<HTMLElement, Options, Attributes>;

	const text: TextAction = (element, { options, action }) => {
		const letters = element.innerText.trim().split('');

		element.innerHTML = '';

		letters.forEach((letter) => {
			element.innerHTML += `
                <span class="letter">
                ${letter}
                </span>
            `;
		});

		const animation = animate(
			[...element.children],
			{
				color: 'blue',
				x: [0, 30, -60, 0],
				rotate: 360
			},
			{
				duration: 1,
				delay: stagger(0.1),
				...options
			}
		);

		action({ animation });

		animation.finished.then(() => {
			element.dispatchEvent(new CustomEvent('finished'));
		});
	};

	let controls: AnimationControls;
	let time = 0;

	$: if (controls) {
		controls.currentTime = time;
	}
</script>

<h1
	on:finished={() => console.log('finished')}
	use:text={{
		options: { duratiion: 2 },
		action({ animation }) {
			animation.stop();
			controls = animation;
		}
	}}
>
	Svelte
</h1>

{#if controls}
	<input type="range" bind:value={time} min={0} step="0.01" max={controls.duration * 0.6} />
{/if}

<style>
	h1 {
		display: flex;
		justify-items: center;
		align-items: center;
	}
</style>
