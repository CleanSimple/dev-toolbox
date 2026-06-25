import type { IOperation } from "@/types";
import { isSubclassOf } from "@/utils";
import { type DataFormatId, type DataFormatById, DataFormats } from "@/data-formats";
import { BytesToText } from "./BytesToText";
import { TextToBytes } from "./TextToBytes";
import { Base64Encode } from "./Base64Encode";
import { Base64Decode } from "./Base64Decode";

interface OperationRecord<TIn extends DataFormatId, TOut extends DataFormatId> {
    inDataFormatId: TIn;
    outDataFormatId: TOut;
    operation: IOperation<DataFormatById<TIn>, DataFormatById<TOut>>;
}

const operation = <TIn extends DataFormatId, TOut extends DataFormatId>(record: OperationRecord<TIn, TOut>) => record;

export const Operations = {
    'bytes-to-text': operation({
        inDataFormatId: "bytes",
        outDataFormatId: "text",
        operation: new BytesToText()
    }),
    'text-to-bytes': operation({
        inDataFormatId: "text",
        outDataFormatId: "bytes",
        operation: new TextToBytes()
    }),
    'base64-encode': operation({
        inDataFormatId: "text",
        outDataFormatId: "base64",
        operation: new Base64Encode()
    }),
    'base64-decode': operation({
        inDataFormatId: "base64",
        outDataFormatId: "text",
        operation: new Base64Decode()
    })
} as Record<string, OperationRecord<DataFormatId, DataFormatId>>;

export function getOperations(dataFormatId: DataFormatId) {
    const operations: string[] = [];

    const dataFormatType = DataFormats[dataFormatId].type;
    for (const [id, operation] of Object.entries(Operations)) {
        const operationInDataFormatType = DataFormats[operation.inDataFormatId].type;
        if (isSubclassOf(dataFormatType, operationInDataFormatType))
            operations.push(id);

    }

    return operations;
}
