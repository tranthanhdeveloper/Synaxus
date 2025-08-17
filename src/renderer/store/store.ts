import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { AppState } from '../types/types';
import { node } from 'webpack';

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
      if (change.type === 'select' && !change.selected) {
        if (get().nodes.every(nodeItem => !nodeItem.selected)) {
          set({ selectedNode: null });
        }
      }
      if (change.type === 'select' && change.selected) {
        get().nodes.forEach((node) => {
          if (node.id === change.id) {
            set({ selectedNode: node });
          }
        });
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
