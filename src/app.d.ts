// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	type Item = import('svelte-dnd-action').Item;
	type DndEvent<ItemType = Item> = import('svelte-dnd-action').DndEvent<ItemType>;
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:consider'?: (event: CustomEvent<DndEvent<Item>> & { target: EventTarget & T }) => void;
			'on:finalize'?: (event: CustomEvent<DndEvent<Item>> & { target: EventTarget & T }) => void;
		}
	}
}

export {};
