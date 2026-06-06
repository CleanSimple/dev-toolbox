import type { ConstructorOf, DataFormat, IOperation, Operation } from "@/types";
import { isSubclassOf } from "@/utils";
import { Bytes, Text, Base64 } from "@/data-formats";
import { BytesToText } from "./BytesToText";
import { TextToBytes } from "./TextToBytes";
import { Base64Encode } from "./Base64Encode";
import { Base64Decode } from "./Base64Decode";


interface OperationRegistration {
    inType: ConstructorOf<any>;
    outType: ConstructorOf<any>;
    operation: Operation;
}

let _RegisteredOperations: OperationRegistration[] = [];

function registerOperation<TInType extends ConstructorOf<DataFormat>, TOutType extends ConstructorOf<DataFormat>>(
    inType: TInType, outType: TOutType, operation: IOperation<InstanceType<TInType>, InstanceType<TOutType>>
): void {
    const operationRegistration: OperationRegistration = {
        inType: inType,
        outType: outType,
        operation: operation as unknown as Operation,
    }
    _RegisteredOperations.push(operationRegistration);
}

export function getOperations<T extends DataFormat>(type: ConstructorOf<T>): Operation[] {
    const operations = [];
    for (const operationRegistration of _RegisteredOperations) {
        if (isSubclassOf(type, operationRegistration.inType)) {
            operations.push(operationRegistration.operation);
        }
    }
    return operations;
}


registerOperation(Bytes, Text, new BytesToText());
registerOperation(Text, Bytes, new TextToBytes());
registerOperation(Text, Base64, new Base64Encode());
registerOperation(Base64, Text, new Base64Decode());
