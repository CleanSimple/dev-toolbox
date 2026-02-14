import type { Operation } from './types';
import { base64Encode } from './base64Encode';
import { base64Decode } from './base64Decode';

// Compose all operations into a single list
export const operations: Operation[] = [
    base64Encode,
    base64Decode,
];

// Export types for convenience
export type { Operation, OperationType, DataFormat, Data as Result } from './types';
