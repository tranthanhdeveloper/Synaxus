import React, { useState, useRef, useCallback, PropsWithChildren } from 'react';
import { Drawer, Box, Typography, Container } from '@mui/material';
import useAppStore from 'renderer/store/store';

function ResizablePanel(props:PropsWithChildren) {
    const [sidebarWidth, setSidebarWidth] = useState(500); // Initial width
    const sidebarRef = useRef<HTMLDivElement>(null);
    const isResizing = useRef(false);

    const handleMouseMove = useCallback((e: any) => {
        if (!isResizing.current) return;
        const newWidth = e.clientX; // Adjust based on sidebar position
        if (newWidth > 100 && window.innerWidth - newWidth > 0) { // Set min/max width
            if (sidebarRef.current) {
                sidebarRef.current.style.width = `${window.innerWidth - newWidth}px`;
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
    return (
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

            <Box
                onMouseDown={handleMouseDown}
                sx={{
                    width: '6px',
                    cursor: 'ew-resize',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    paddingLeft: '6px',
                    backgroundColor: 'rgba(120, 117, 117, 0.1)', // Visual indicator for resizer
                }}>

            </Box>
            <Container sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {props.children}
            </Container>

        </Drawer>);
}

export default ResizablePanel;