
declare namespace Gast {
    export function GasTap(msg: string, test: (t: any) => void): Session;
    export interface Session {
      counter      : number,
      succCounter  : number,
      failCounter  : number,
      skipCounter  : number,
      description  : string
      ok           : (value: boolean, msg: string) => void,
      notOk        : (value: boolean, msg: string) => void
      equal        : (v1: any, v2: any, msg: string) => void,
      notEqual     : (v1: any, v2: any, msg: string) => void,
      deepEqual    : (v1: any, v2: any, msg: string) => void,
      notDeepEqual : (v1: any, v2: any, msg: string) => void,
      throws       : ( fn: (...args: any) => any, msg: string) => void,
      notThrow     : ( fn: (...args: any) => any, msg: string) => void,
      nan          : (v1: any, msg: string) => void,
      notNan       : (v1: any, msg: string) => void,
      skip         : (msg: string) => void,
      pass         : (msg: string) => void,
      fail         : (msg: string) => void,
      reset        : () => void,
    }
}

