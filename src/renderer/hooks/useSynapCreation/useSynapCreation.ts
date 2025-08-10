import { SynapNode } from '../../types/types';
import useAppStore from 'renderer/store/store';
const { nanoid } = require('nanoid');
export function useSynapCreation() {
    const { addNode } = useAppStore();

    const createSynapNode = (label: string, rootNode?: SynapNode) => {
        const newNode: SynapNode = {
            id: nanoid(),
            type: 'synapNode',
            position: {
                x: rootNode ? rootNode.position.x + 100 : 250,
                y: rootNode ? rootNode.position.y + 100 : 250,
            },
            data: { label },
        };
        addNode(newNode);
    };

    return { createSynapNode };
}
