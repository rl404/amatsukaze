<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import ForceGraph, {
		type ForceGraphGenericInstance,
		type LinkObject,
		type NodeObject
	} from 'force-graph';
	import FamilyGraphModal from './FamilyGraphModal.svelte';

	export let data: {
		nodes: Array<{
			id: number;
			name: string;
			image: string;
			has_retired: boolean;
		}>;
		links: Array<{
			id1: number;
			id2: number;
			role: string;
		}>;
	};

	export let searchQuery: string = '';
	export let searchResultIndex: number = -1;

	$: searchQuery, searchResultIndex, focusOnSearch(searchQuery, searchResultIndex);

	interface GraphNode extends NodeObject {
		id: number;
		name: string;
		image?: HTMLImageElement;
		imageURL: string;
		hasRetired: boolean;
	}

	interface GraphLink extends LinkObject {
		sourceID: number;
		source?: string | number | NodeObject;
		targetID: number;
		target?: string | number | NodeObject;
		role: string;
		roleString: string;
	}

	let nodes: Array<GraphNode>;
	let links: Array<GraphLink>;

	$: nodes = data.nodes.map((n) => {
		return { id: n.id, name: n.name, imageURL: n.image, hasRetired: n.has_retired };
	});

	$: links = data.links.map((l) => {
		return {
			sourceID: l.id1,
			source: l.id1,
			targetID: l.id2,
			target: l.id2,
			role: l.role,
			roleString: roleToString(l.role)
		};
	});

	const NODE_RADIUS = 4;
	const NODE_COLOR = '#eab308';
	const NODE_RETIRED_COLOR = '#713e12';
	const NODE_INACTIVE_COLOR = 'rgba(0,0,0,0.1)';

	const LINK_DESIGNER_COLOR = '#3b82f6';
	const LINK_MODELER_COLOR = '#a855f7';
	const LINK_INACTIVE_COLOR = 'rgba(0,0,0,0.1)';

	const ROLE_DESIGNER = 'DESIGNER';
	const ROLE_2D_MODELER = '2D_MODELER';
	const ROLE_3D_MODELER = '3D_MODELER';

	const IMAGE_SIZE = 20;

	const MODAL_LIMIT = 5;

	let canvas: HTMLElement;
	let graph: ForceGraphGenericInstance<any>;

	let hoverNodeID: number = 0;
	let hoverNodeIDs: Array<number> = [];

	let clickNodeID: number = 0;
	let clickNodeIDs: Array<number> = [];

	let imageNodeIDs: Array<number> = [];

	let modalDatas: Array<{ id: number; title: string; x: number; y: number; z: number }> = Array(
		MODAL_LIMIT
	).fill({ id: 0 });

	onMount(() => {
		nodes = nodes.map((n) => {
			if (n.imageURL === '') {
				return n;
			}

			const img = new Image();
			img.dataset.src = '/api/wikia/image/' + n.imageURL;
			return { ...n, image: img };
		});

		graph = ForceGraph()(canvas)
			.graphData({ nodes: nodes, links: links })
			.autoPauseRedraw(false)
			.minZoom(0.5)
			.maxZoom(10)
			.onBackgroundClick(onBackgroundClick)
			.onBackgroundRightClick(onBackgroundRightClick)
			.nodeLabel('name')
			.nodeCanvasObjectMode(() => 'replace')
			.nodeCanvasObject(getNodeObject)
			.nodePointerAreaPaint(getNodeArea)
			.onNodeHover(onNodeHover)
			.onNodeClick(onNodeClick)
			.onNodeRightClick(onNodeRightClick)
			.onNodeDragEnd(onNodeDragEnd)
			.linkLabel('roleString')
			.linkColor(getLinkColor)
			.linkCurvature(getLinkCurvature)
			.linkDirectionalArrowLength(NODE_RADIUS);
	});

	onDestroy(() => {
		graph._destructor();
	});

	const onBackgroundClick = (e: MouseEvent) => {
		clickNodeID = 0;
		clickNodeIDs = [];
	};

	const onBackgroundRightClick = (e: MouseEvent) => {
		imageNodeIDs = [];
	};

	const getNodeColor = (node: GraphNode | any): string => {
		if (hoverNodeID !== 0) {
			if ([...hoverNodeIDs, hoverNodeID].includes(node.id)) {
				return node.hasRetired ? NODE_RETIRED_COLOR : NODE_COLOR;
			}
			return NODE_INACTIVE_COLOR;
		}

		if (clickNodeID !== 0) {
			if ([...clickNodeIDs, clickNodeID].includes(node.id)) {
				return node.hasRetired ? NODE_RETIRED_COLOR : NODE_COLOR;
			}
			return NODE_INACTIVE_COLOR;
		}

		if (searchQuery !== '') {
			if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return node.hasRetired ? NODE_RETIRED_COLOR : NODE_COLOR;
			}
			return NODE_INACTIVE_COLOR;
		}

		return node.hasRetired ? NODE_RETIRED_COLOR : NODE_COLOR;
	};

	const getNodeObject = (
		node: GraphNode | any,
		ctx: CanvasRenderingContext2D,
		globalScale: number
	) => {
		// Circle Node.
		if (globalScale <= 2) {
			ctx.beginPath();
			ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI);
			ctx.fillStyle = getNodeColor(node);
			ctx.fill();
			return;
		}

		// Prepare text.
		const label = node.name;
		const fontSize = 20 / globalScale;
		ctx.font = `${fontSize}px Sans-Serif`;
		const textWidth = ctx.measureText(label).width;
		[textWidth, fontSize].map((n) => n + fontSize * 0.2);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		// Image Node.
		if (imageNodeIDs.includes(node.id)) {
			if (node.image) {
				if (
					(hoverNodeID === 0 ||
						(hoverNodeID !== 0 && [...hoverNodeIDs, hoverNodeID].includes(node.id))) &&
					(hoverNodeID !== 0 ||
						clickNodeID === 0 ||
						(clickNodeID !== 0 && [...clickNodeIDs, clickNodeID].includes(node.id)))
				) {
					ctx.lineWidth = 0.5;
					ctx.strokeStyle = node.hasRetired ? NODE_RETIRED_COLOR : NODE_COLOR;
					ctx.strokeRect(node.x - IMAGE_SIZE / 2, node.y - IMAGE_SIZE / 2, IMAGE_SIZE, IMAGE_SIZE);
					ctx.fillStyle = 'white';
					ctx.fillRect(node.x - IMAGE_SIZE / 2, node.y - IMAGE_SIZE / 2, IMAGE_SIZE, IMAGE_SIZE);

					ctx.drawImage(
						node.image,
						0,
						0,
						node.image.width,
						node.image.width,
						node.x - IMAGE_SIZE / 2,
						node.y - IMAGE_SIZE / 2,
						IMAGE_SIZE,
						IMAGE_SIZE
					);

					if (globalScale <= 5) return;

					ctx.fillStyle = node.hasRetired ? NODE_RETIRED_COLOR : NODE_COLOR;
					ctx.fillRect(
						node.x - IMAGE_SIZE / 2,
						node.y + IMAGE_SIZE / 2 - fontSize - fontSize * 0.2,
						IMAGE_SIZE,
						fontSize + fontSize * 0.2
					);

					const scaledLabel = ellipsisText(ctx, label, IMAGE_SIZE - fontSize * 0.2);
					ctx.fillStyle = 'white';
					ctx.fillText(scaledLabel, node.x, node.y + IMAGE_SIZE / 2 - fontSize / 2);

					return;
				}
			}
		}

		// Text Node.
		ctx.fillStyle = 'white';
		ctx.fillRect(node.x - textWidth / 2, node.y - fontSize / 2, textWidth, fontSize);

		ctx.fillStyle = getNodeColor(node);
		ctx.fillText(label, node.x, node.y);

		node.textWidth = textWidth;
		node.fontSize = fontSize;
	};

	const getNodeArea = (node: GraphNode | any, color: string, ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = color;
		node.textWidth &&
			node.fontSize &&
			ctx.fillRect(
				node.x - node.textWidth / 2,
				node.y - node.fontSize / 2,
				node.textWidth,
				node.fontSize
			);

		if (imageNodeIDs.includes(node.id) && node.image) {
			ctx.fillRect(node.x - IMAGE_SIZE / 2, node.y - IMAGE_SIZE / 2, IMAGE_SIZE, IMAGE_SIZE);
		}
	};

	const onNodeHover = (node: GraphNode | any) => {
		if (!node) {
			hoverNodeID = 0;
			hoverNodeIDs = [];
			return;
		}

		hoverNodeID = node.id;
		links.forEach((link: GraphLink) => {
			if (link.sourceID === node.id) hoverNodeIDs.push(link.targetID);
			if (link.targetID === node.id) hoverNodeIDs.push(link.sourceID);
		});
	};

	const onNodeClick = (node: GraphNode | any, e: MouseEvent) => {
		if (clickNodeID === node.id) {
			clickNodeID = 0;
			clickNodeIDs = [];
		} else {
			graph.centerAt(node.x, node.y, 1000);

			clickNodeID = hoverNodeID;
			clickNodeIDs = hoverNodeIDs;

			showModal(node.id, node.name, e.clientX, e.clientY);
		}
	};

	const onNodeRightClick = (node: GraphNode | any, e: MouseEvent) => {
		if (!node) return;

		graph.centerAt(node.x, node.y, 1000);

		imageNodeIDs.push(hoverNodeID);
		imageNodeIDs.push(...hoverNodeIDs);

		nodes = nodes.map((n) => {
			if (!imageNodeIDs.includes(n.id)) {
				return n;
			}

			if (!n.image) return n;

			n.image.src = n.image.dataset.src || '';
			return n;
		});
	};

	const onNodeDragEnd = (node: GraphNode | any) => {
		if (!node) return;
		node.fx = node.x;
		node.fy = node.y;
	};

	const getLinkColor = (link: GraphLink | any) => {
		if (hoverNodeID !== 0) {
			if (hoverNodeID === link.sourceID || hoverNodeID === link.targetID) {
				return roleToColor(link.role);
			}
			return LINK_INACTIVE_COLOR;
		}

		if (clickNodeID !== 0) {
			if (clickNodeID === link.sourceID || clickNodeID === link.targetID) {
				return roleToColor(link.role);
			}
			return LINK_INACTIVE_COLOR;
		}

		if (searchQuery !== '') {
			return LINK_INACTIVE_COLOR;
		}

		return roleToColor(link.role);
	};

	const getLinkCurvature = (link: GraphLink | any) => {
		if (link.sourceID === link.targetID) return 0.5;
		return 0.1;
	};

	const resize = () => {
		graph.width(canvas.clientWidth).height(canvas.clientHeight);
	};

	const roleToString = (role: string): string => {
		switch (role) {
			case ROLE_DESIGNER:
				return 'Designer';
			case ROLE_2D_MODELER:
				return '2D Modeler';
			case ROLE_3D_MODELER:
				return '3D Modeler';
			default:
				return '';
		}
	};

	const roleToColor = (role: string): string => {
		switch (role) {
			case ROLE_DESIGNER:
				return LINK_DESIGNER_COLOR;
			case ROLE_2D_MODELER:
			case ROLE_3D_MODELER:
				return LINK_MODELER_COLOR;
			default:
				return '';
		}
	};

	const ellipsisText = (
		context: CanvasRenderingContext2D,
		text: string,
		length: number
	): string => {
		if (context.measureText(text).width <= length) {
			return text;
		}

		while (
			text.length > 0 &&
			context.measureText(text).width + context.measureText('...').width > length
		) {
			text = text.slice(0, -1);
		}

		return text + '...';
	};

	const showModal = (id: number, title: string, x: number, y: number) => {
		const existI = modalDatas.findIndex((m) => m.id === id);
		if (existI >= 0) return;

		const count = modalDatas.filter((m) => m.id !== 0).length;

		if (count === MODAL_LIMIT) {
			const minZ = Math.min(...modalDatas.map((m) => m.z || 0));
			const oldI = modalDatas.findIndex((m) => m.z === minZ);
			modalDatas[oldI].id = 0;
		}

		const i = modalDatas.findIndex((m) => m.id === 0);
		if (i < 0) return;

		modalDatas[i] = {
			id: id,
			title: title,
			x: x,
			y: y,
			z: Math.max(...modalDatas.map((m) => m.z || 0)) + 1
		};
	};

	const hideModal = (id: number) => {
		const i = modalDatas.findIndex((m) => m.id === id);
		if (i < 0) return;
		modalDatas[i].id = 0;
	};

	const moveModal = (e: any) => {
		const i = modalDatas.findIndex((m) => m.id === e.detail.id);
		if (i < 0) return;
		modalDatas[i].x += e.detail.x;
		modalDatas[i].y += e.detail.y;
	};

	const focusOnSearch = (s: string, i: number) => {
		if (!graph || s === '') return;

		const nodeResults = nodes.filter((n) => n.name.toLowerCase().includes(s.toLowerCase()));

		if (nodeResults.length === 0) return;

		if (nodeResults.length === 1) {
			graph.centerAt(nodeResults[0].x, nodeResults[0].y, 1000);
			graph.zoom(4, 1000);
			return;
		}

		if (i >= 0) {
			graph.centerAt(
				nodeResults[i % nodeResults.length].x,
				nodeResults[i % nodeResults.length].y,
				1000
			);
			graph.zoom(4, 1000);
		}
	};
</script>

<svelte:window on:resize={resize} />

<div bind:this={canvas} />

{#each modalDatas as modalData}
	<FamilyGraphModal
		open={modalData.id !== 0}
		id={modalData.id}
		title={modalData.title}
		x={modalData.x}
		y={modalData.y}
		z={modalData.z}
		on:close={() => hideModal(modalData.id)}
		on:move={(e) => moveModal(e)}
	/>
{/each}
