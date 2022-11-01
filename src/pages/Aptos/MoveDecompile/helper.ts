import { WasmFs } from "@wasmer/wasmfs";
import { Disassemble } from "@starcoin/move-js";

const wasmfs = new WasmFs()
const dp = new Disassemble(wasmfs)

export const decompileMoveCode = async (bytecode: string) => {
    return new Promise<string>((resolve, reject) => {
        dp.disassemble("account_scripts", bytecode, (ok: boolean, data: string) => {
            if (ok) {
                resolve(data);
            } else {
                reject(data);
            }
        })
    })
}
