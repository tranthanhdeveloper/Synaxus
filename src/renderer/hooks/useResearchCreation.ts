import { resolve } from 'path';
import { useState, useEffect } from 'react';
import { createResearchFolder, getResearches, setResearches, setResearchMapData } from 'renderer/services/StoreService';
import { Research, SynapNode } from 'renderer/types/types';

interface UseResearchCreationResult {
    createResearch: (title: string, description: string) => Promise<string>;
    loading: boolean;
    error: string | null;
}

const useResearchCreation = (): UseResearchCreationResult => {
    const sanitizeFilename = (text: string): string => {
        let cleanedText = text.trim();
        cleanedText = cleanedText.replace(/\s+/g, ' ');
        cleanedText = cleanedText.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        return cleanedText.substring(0, 255); // Truncate to a max length
    }

    const [loading, setLoading] = useState<boolean>(false);
    const [researches, setResearchesState] = useState<Research[]>([]);
    const [error, setError] = useState<string>('');


    useEffect(() => {
        const loadData = async () => {
            const storedResearches = await getResearches();
            setResearchesState(storedResearches || []);
        };
        loadData();
    }, []);

    useEffect(() => {
        setResearches(researches);
    }, [researches]);

    const createResearch = async (name: string, description: string): Promise<string> => {
        setLoading(true);
        setError('');
        try {
            let folderPath = await createResearchFolder(sanitizeFilename(name))
            const newResearch: Research = {
                id: `research-${Date.now()}`,
                name,
                description,
                path: folderPath,
                createdAt: new Date().toISOString(),
            };

            const rootSynap: SynapNode = {
                type: 'synapNode',
                id: `node-${Date.now()}`,
                data: {
                    label: name,
                    links: [],
                    style: {
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        borderRadius: '5px',
                    }
                },
                position: { x: 250, y: 250 },
            };
            setResearchesState([...researches, newResearch]);
            await setResearchMapData(newResearch.path, {
                research: {
                    detail: newResearch,
                    nodes: [rootSynap],
                    edges: [],
                },
            });
            setError('');
            setLoading(false);
            return newResearch.id;

        } catch (err) {
            setError('Failed to create research.');
            setLoading(false);
            return '';
        }
    };

    return { createResearch, loading, error };
};

export default useResearchCreation;
