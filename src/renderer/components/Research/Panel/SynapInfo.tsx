import React, { useState, useRef, useCallback } from 'react';
import { Drawer, Box, Typography } from '@mui/material';
import useAppStore from 'renderer/store/store';

function ResizableSidebar() {
    const selectedNode = useAppStore((state) => state.selectedNode);
    const [sidebarWidth, setSidebarWidth] = useState(500); // Initial width
    const sidebarRef = useRef<HTMLDivElement>(null);
    const isResizing = useRef(false);

    const handleMouseMove = useCallback((e: any) => {
        if (!isResizing.current) return;
        const newWidth = e.clientX; // Adjust based on sidebar position
        if (newWidth > 100) { // Set min/max width
            if (sidebarRef.current) {
                sidebarRef.current.style.width = `${newWidth}px`;
            }
            setSidebarWidth(newWidth); // Update state for other components if needed
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback(() => {
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);

    return (<>
        {!selectedNode && (<></>)}
        {
            selectedNode && (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: sidebarWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: sidebarWidth,
                            boxSizing: 'border-box',
                            position: 'relative', // Necessary for resizer positioning
                        },
                    }}
                    ref={sidebarRef}
                >
                    <Box sx={{ p: 2 }}>
                        Sidebar Content
                    </Box>
                    <Box
                        onMouseDown={handleMouseDown}
                        sx={{
                            width: '5px',
                            cursor: 'ew-resize',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.1)', // Visual indicator for resizer
                        }}>
                        <Typography>{selectedNode.data.label}</Typography>
                    </Box>
                </Drawer>)
        }
    </>);
}

export default ResizableSidebar;