import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { AppState } from '../types/types';

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useAppStore = create<AppState>((set, get) => ({
  selectedNode: null,
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
    changes.forEach((change) => {
      if (change.type === 'select' && change.selected) {
        get().nodes.forEach((node) => {
          if (node.id === change.id) {
            set({ selectedNode: node });
          }
        });
        console.log('Node selected:', get().selectedNode);
      }
      if (change.type === 'select' && !change.selected) {
        set({ selectedNode: null });
        console.log('Node deselected');
      }
    })
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },
}));

export default useAppStore;
