import type { ConstructorOf, DataFormat, IOperation } from "@/types";
import { isSubclassOf } from "@/utils";
import { Bytes, Text, Base64 } from "@/data-formats";
import { BytesToText } from "./BytesToText";
import { TextToBytes } from "./TextToBytes";
import { Base64Encode } from "./Base64Encode";
import { Base64Decode } from "./Base64Decode";

interface OperationRecord<TInType extends ConstructorOf<DataFormat>, TOutType extends ConstructorOf<DataFormat>> {
    inType: TInType;
    outType: TOutType;
    operation: IOperation<InstanceType<TInType>, InstanceType<TOutType>>;
}

const operation = <TInType extends ConstructorOf<DataFormat>, TOutType extends ConstructorOf<DataFormat>>(record: OperationRecord<TInType, TOutType>) => record;

export const Operations = {
    'bytes-to-text': operation({
        inType: Bytes,
        outType: Text,
        operation: new BytesToText()
    }),
    'text-to-bytes': operation({
        inType: Text,
        outType: Bytes,
        operation: new TextToBytes()
    }),
    'base64-encode': operation({
        inType: Text,
        outType: Base64,
        operation: new Base64Encode()
    }),
    'base64-decode': operation({
        inType: Base64,
        outType: Text,
        operation: new Base64Decode()
    })
};

export function getOperations<T extends DataFormat>(type: ConstructorOf<T>) {
    const operations: string[] = [];
    for (const [id, operation] of Object.entries(Operations)) {
        if (isSubclassOf(type, operation.inType) && isSubclassOf(operation.outType, type))
            operations.push(id);
    }
    return operations;
}
