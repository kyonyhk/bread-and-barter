-- Remove duplicate programs
DO $$ 
DECLARE
    duplicate_asian_fusion_id UUID;
    duplicate_blues_jazz_id UUID;
BEGIN
    -- Find and store the IDs of the duplicate programs (the ones without courses)
    SELECT id INTO duplicate_asian_fusion_id
    FROM teaching.programs p
    WHERE p.name = 'Asian Fusion Desserts'
    AND NOT EXISTS (
        SELECT 1 FROM teaching.courses c WHERE c.program_id = p.id
    );

    SELECT id INTO duplicate_blues_jazz_id
    FROM teaching.programs p
    WHERE p.name = 'Blues & Jazz Guitar Mastery'
    AND NOT EXISTS (
        SELECT 1 FROM teaching.courses c WHERE c.program_id = p.id
    );

    -- Delete the duplicate programs
    DELETE FROM teaching.programs
    WHERE id IN (duplicate_asian_fusion_id, duplicate_blues_jazz_id);
END $$; 