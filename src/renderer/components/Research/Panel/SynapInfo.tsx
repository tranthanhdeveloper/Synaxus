import React, { useState, useRef, useCallback } from 'react';
import { Box, Typography, Container } from '@mui/material';
import useAppStore from 'renderer/store/store';
import PromptInput from 'renderer/components/Shared/PromtInput/PromptInput';

function SynapStudyPanel() {
    const selectedNode = useAppStore((state) => state.selectedNode);
    if (!selectedNode) return null;

    return (<Container>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
            
            <Typography>{selectedNode.data.label}</Typography>
            <Container sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            </Container>
            <PromptInput />
        </Box>


    </Container>);
}

export default SynapStudyPanel;