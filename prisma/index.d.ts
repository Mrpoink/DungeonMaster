
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Monster
 * 
 */
export type Monster = $Result.DefaultSelection<Prisma.$MonsterPayload>
/**
 * Model Race
 * 
 */
export type Race = $Result.DefaultSelection<Prisma.$RacePayload>
/**
 * Model Spell
 * 
 */
export type Spell = $Result.DefaultSelection<Prisma.$SpellPayload>
/**
 * Model Class
 * 
 */
export type Class = $Result.DefaultSelection<Prisma.$ClassPayload>
/**
 * Model MagicItem
 * 
 */
export type MagicItem = $Result.DefaultSelection<Prisma.$MagicItemPayload>
/**
 * Model GeneralEquipment
 * 
 */
export type GeneralEquipment = $Result.DefaultSelection<Prisma.$GeneralEquipmentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Monsters
 * const monsters = await prisma.monster.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Monsters
   * const monsters = await prisma.monster.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.monster`: Exposes CRUD operations for the **Monster** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Monsters
    * const monsters = await prisma.monster.findMany()
    * ```
    */
  get monster(): Prisma.MonsterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.race`: Exposes CRUD operations for the **Race** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Races
    * const races = await prisma.race.findMany()
    * ```
    */
  get race(): Prisma.RaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spell`: Exposes CRUD operations for the **Spell** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spells
    * const spells = await prisma.spell.findMany()
    * ```
    */
  get spell(): Prisma.SpellDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.class.findMany()
    * ```
    */
  get class(): Prisma.ClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.magicItem`: Exposes CRUD operations for the **MagicItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MagicItems
    * const magicItems = await prisma.magicItem.findMany()
    * ```
    */
  get magicItem(): Prisma.MagicItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.generalEquipment`: Exposes CRUD operations for the **GeneralEquipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeneralEquipments
    * const generalEquipments = await prisma.generalEquipment.findMany()
    * ```
    */
  get generalEquipment(): Prisma.GeneralEquipmentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 393aa359c9ad4a4bb28630fb5613f9c281cde053
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Monster: 'Monster',
    Race: 'Race',
    Spell: 'Spell',
    Class: 'Class',
    MagicItem: 'MagicItem',
    GeneralEquipment: 'GeneralEquipment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "monster" | "race" | "spell" | "class" | "magicItem" | "generalEquipment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Monster: {
        payload: Prisma.$MonsterPayload<ExtArgs>
        fields: Prisma.MonsterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonsterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonsterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonsterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonsterPayload>
          }
          findFirst: {
            args: Prisma.MonsterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonsterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonsterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonsterPayload>
          }
          findMany: {
            args: Prisma.MonsterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonsterPayload>[]
          }
          create: {
            args: Prisma.MonsterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonsterPayload>
          }
          createMany: {
            args: Prisma.MonsterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonsterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonsterPayload>[]
          }
          delete: {
            args: Prisma.MonsterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonsterPayload>
          }
          update: {
            args: Prisma.MonsterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonsterPayload>
          }
          deleteMany: {
            args: Prisma.MonsterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MonsterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MonsterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonsterPayload>
          }
          aggregate: {
            args: Prisma.MonsterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMonster>
          }
          groupBy: {
            args: Prisma.MonsterGroupByArgs<ExtArgs>
            result: $Utils.Optional<MonsterGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonsterCountArgs<ExtArgs>
            result: $Utils.Optional<MonsterCountAggregateOutputType> | number
          }
        }
      }
      Race: {
        payload: Prisma.$RacePayload<ExtArgs>
        fields: Prisma.RaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          findFirst: {
            args: Prisma.RaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          findMany: {
            args: Prisma.RaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>[]
          }
          create: {
            args: Prisma.RaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          createMany: {
            args: Prisma.RaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>[]
          }
          delete: {
            args: Prisma.RaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          update: {
            args: Prisma.RaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          deleteMany: {
            args: Prisma.RaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          aggregate: {
            args: Prisma.RaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRace>
          }
          groupBy: {
            args: Prisma.RaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<RaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.RaceCountArgs<ExtArgs>
            result: $Utils.Optional<RaceCountAggregateOutputType> | number
          }
        }
      }
      Spell: {
        payload: Prisma.$SpellPayload<ExtArgs>
        fields: Prisma.SpellFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpellFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpellFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          findFirst: {
            args: Prisma.SpellFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpellFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          findMany: {
            args: Prisma.SpellFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>[]
          }
          create: {
            args: Prisma.SpellCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          createMany: {
            args: Prisma.SpellCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpellCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>[]
          }
          delete: {
            args: Prisma.SpellDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          update: {
            args: Prisma.SpellUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          deleteMany: {
            args: Prisma.SpellDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpellUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SpellUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpellPayload>
          }
          aggregate: {
            args: Prisma.SpellAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpell>
          }
          groupBy: {
            args: Prisma.SpellGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpellGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpellCountArgs<ExtArgs>
            result: $Utils.Optional<SpellCountAggregateOutputType> | number
          }
        }
      }
      Class: {
        payload: Prisma.$ClassPayload<ExtArgs>
        fields: Prisma.ClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findFirst: {
            args: Prisma.ClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findMany: {
            args: Prisma.ClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          create: {
            args: Prisma.ClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          createMany: {
            args: Prisma.ClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          delete: {
            args: Prisma.ClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          update: {
            args: Prisma.ClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          deleteMany: {
            args: Prisma.ClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          aggregate: {
            args: Prisma.ClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass>
          }
          groupBy: {
            args: Prisma.ClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassCountArgs<ExtArgs>
            result: $Utils.Optional<ClassCountAggregateOutputType> | number
          }
        }
      }
      MagicItem: {
        payload: Prisma.$MagicItemPayload<ExtArgs>
        fields: Prisma.MagicItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MagicItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MagicItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicItemPayload>
          }
          findFirst: {
            args: Prisma.MagicItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MagicItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicItemPayload>
          }
          findMany: {
            args: Prisma.MagicItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicItemPayload>[]
          }
          create: {
            args: Prisma.MagicItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicItemPayload>
          }
          createMany: {
            args: Prisma.MagicItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MagicItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicItemPayload>[]
          }
          delete: {
            args: Prisma.MagicItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicItemPayload>
          }
          update: {
            args: Prisma.MagicItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicItemPayload>
          }
          deleteMany: {
            args: Prisma.MagicItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MagicItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MagicItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MagicItemPayload>
          }
          aggregate: {
            args: Prisma.MagicItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMagicItem>
          }
          groupBy: {
            args: Prisma.MagicItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MagicItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MagicItemCountArgs<ExtArgs>
            result: $Utils.Optional<MagicItemCountAggregateOutputType> | number
          }
        }
      }
      GeneralEquipment: {
        payload: Prisma.$GeneralEquipmentPayload<ExtArgs>
        fields: Prisma.GeneralEquipmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeneralEquipmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralEquipmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeneralEquipmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralEquipmentPayload>
          }
          findFirst: {
            args: Prisma.GeneralEquipmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralEquipmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeneralEquipmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralEquipmentPayload>
          }
          findMany: {
            args: Prisma.GeneralEquipmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralEquipmentPayload>[]
          }
          create: {
            args: Prisma.GeneralEquipmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralEquipmentPayload>
          }
          createMany: {
            args: Prisma.GeneralEquipmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GeneralEquipmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralEquipmentPayload>[]
          }
          delete: {
            args: Prisma.GeneralEquipmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralEquipmentPayload>
          }
          update: {
            args: Prisma.GeneralEquipmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralEquipmentPayload>
          }
          deleteMany: {
            args: Prisma.GeneralEquipmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeneralEquipmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GeneralEquipmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralEquipmentPayload>
          }
          aggregate: {
            args: Prisma.GeneralEquipmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeneralEquipment>
          }
          groupBy: {
            args: Prisma.GeneralEquipmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeneralEquipmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeneralEquipmentCountArgs<ExtArgs>
            result: $Utils.Optional<GeneralEquipmentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    monster?: MonsterOmit
    race?: RaceOmit
    spell?: SpellOmit
    class?: ClassOmit
    magicItem?: MagicItemOmit
    generalEquipment?: GeneralEquipmentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Monster
   */

  export type AggregateMonster = {
    _count: MonsterCountAggregateOutputType | null
    _min: MonsterMinAggregateOutputType | null
    _max: MonsterMaxAggregateOutputType | null
  }

  export type MonsterMinAggregateOutputType = {
    id: string | null
    name: string | null
    size: string | null
    type: string | null
    alignment: string | null
    habitat: string | null
    mainHabitat: string | null
    otherHabitat: string | null
    treasure: string | null
    ac: string | null
    hp: string | null
    initiative: string | null
    walk: string | null
    burrow: string | null
    climb: string | null
    fly: string | null
    hover: string | null
    swim: string | null
    strMod: string | null
    intMod: string | null
    dexMod: string | null
    wisMod: string | null
    conMod: string | null
    chaMod: string | null
    strSave: string | null
    intSave: string | null
    dexSave: string | null
    wisSave: string | null
    conSave: string | null
    chaSave: string | null
    proficient: string | null
    expertise: string | null
    vulnerabilities: string | null
    slashing: string | null
    immunitiesConditions: string | null
    immunitiesDamage: string | null
    blindsight: string | null
    darkvision: string | null
    truesight: string | null
    tremorsense: string | null
    passivePerception: string | null
    languages: string | null
    cr: string | null
    xpVal: string | null
    pb: string | null
    traits: string | null
    legendaryResistanceCount: string | null
    numberOfAtk: string | null
    atk1Type: string | null
    atk1Mod: string | null
    atk1Range: string | null
    atk1RangeShort: string | null
    atk1Dam: string | null
    atk1DamageType: string | null
    atk2Type: string | null
    atk2Mod: string | null
    atk2Range: string | null
    atk2RangeShort: string | null
    atk2Dam: string | null
    atk2DamageType: string | null
    atk3Type: string | null
    atk3Mod: string | null
    atk3Range: string | null
    atk3RangeShort: string | null
    atk3Dam: string | null
    atk3DamageType: string | null
    atk4Type: string | null
    atk4Mod: string | null
    atk4Range: string | null
    atk4RangeShort: string | null
    atk4Dam: string | null
    atk4DamageType: string | null
    saveDC: string | null
    savingThrow: string | null
    actionNotes: string | null
    ability: string | null
    spellSaveDC: string | null
    spellSavingThrows: string | null
    spellAttack: string | null
    atWillSpells: string | null
    threePerDaySpells: string | null
    twoPerDaySpells: string | null
    onePerDaySpells: string | null
    bonusAction: string | null
    reaction: string | null
    amount: string | null
    legendaryActionSaveDC: string | null
    legendaryActionSavingThrow: string | null
    legendaryActions: string | null
    lair: string | null
    xpLair: string | null
    legendaryResistance: string | null
    legendaryActionsLair: string | null
    lairSaveDC: string | null
    lairSavingThrows: string | null
    other: string | null
    align: string | null
    speeds: string | null
    strScore: string | null
    dexScore: string | null
    conScore: string | null
    intScore: string | null
    wisScore: string | null
    chaScore: string | null
    savThrows: string | null
    skills: string | null
    wri: string | null
    senses: string | null
    additional: string | null
    font: string | null
    additionalInfo: string | null
    author: string | null
  }

  export type MonsterMaxAggregateOutputType = {
    id: string | null
    name: string | null
    size: string | null
    type: string | null
    alignment: string | null
    habitat: string | null
    mainHabitat: string | null
    otherHabitat: string | null
    treasure: string | null
    ac: string | null
    hp: string | null
    initiative: string | null
    walk: string | null
    burrow: string | null
    climb: string | null
    fly: string | null
    hover: string | null
    swim: string | null
    strMod: string | null
    intMod: string | null
    dexMod: string | null
    wisMod: string | null
    conMod: string | null
    chaMod: string | null
    strSave: string | null
    intSave: string | null
    dexSave: string | null
    wisSave: string | null
    conSave: string | null
    chaSave: string | null
    proficient: string | null
    expertise: string | null
    vulnerabilities: string | null
    slashing: string | null
    immunitiesConditions: string | null
    immunitiesDamage: string | null
    blindsight: string | null
    darkvision: string | null
    truesight: string | null
    tremorsense: string | null
    passivePerception: string | null
    languages: string | null
    cr: string | null
    xpVal: string | null
    pb: string | null
    traits: string | null
    legendaryResistanceCount: string | null
    numberOfAtk: string | null
    atk1Type: string | null
    atk1Mod: string | null
    atk1Range: string | null
    atk1RangeShort: string | null
    atk1Dam: string | null
    atk1DamageType: string | null
    atk2Type: string | null
    atk2Mod: string | null
    atk2Range: string | null
    atk2RangeShort: string | null
    atk2Dam: string | null
    atk2DamageType: string | null
    atk3Type: string | null
    atk3Mod: string | null
    atk3Range: string | null
    atk3RangeShort: string | null
    atk3Dam: string | null
    atk3DamageType: string | null
    atk4Type: string | null
    atk4Mod: string | null
    atk4Range: string | null
    atk4RangeShort: string | null
    atk4Dam: string | null
    atk4DamageType: string | null
    saveDC: string | null
    savingThrow: string | null
    actionNotes: string | null
    ability: string | null
    spellSaveDC: string | null
    spellSavingThrows: string | null
    spellAttack: string | null
    atWillSpells: string | null
    threePerDaySpells: string | null
    twoPerDaySpells: string | null
    onePerDaySpells: string | null
    bonusAction: string | null
    reaction: string | null
    amount: string | null
    legendaryActionSaveDC: string | null
    legendaryActionSavingThrow: string | null
    legendaryActions: string | null
    lair: string | null
    xpLair: string | null
    legendaryResistance: string | null
    legendaryActionsLair: string | null
    lairSaveDC: string | null
    lairSavingThrows: string | null
    other: string | null
    align: string | null
    speeds: string | null
    strScore: string | null
    dexScore: string | null
    conScore: string | null
    intScore: string | null
    wisScore: string | null
    chaScore: string | null
    savThrows: string | null
    skills: string | null
    wri: string | null
    senses: string | null
    additional: string | null
    font: string | null
    additionalInfo: string | null
    author: string | null
  }

  export type MonsterCountAggregateOutputType = {
    id: number
    name: number
    size: number
    type: number
    alignment: number
    habitat: number
    mainHabitat: number
    otherHabitat: number
    treasure: number
    ac: number
    hp: number
    initiative: number
    walk: number
    burrow: number
    climb: number
    fly: number
    hover: number
    swim: number
    strMod: number
    intMod: number
    dexMod: number
    wisMod: number
    conMod: number
    chaMod: number
    strSave: number
    intSave: number
    dexSave: number
    wisSave: number
    conSave: number
    chaSave: number
    proficient: number
    expertise: number
    vulnerabilities: number
    slashing: number
    immunitiesConditions: number
    immunitiesDamage: number
    blindsight: number
    darkvision: number
    truesight: number
    tremorsense: number
    passivePerception: number
    languages: number
    cr: number
    xpVal: number
    pb: number
    traits: number
    legendaryResistanceCount: number
    numberOfAtk: number
    atk1Type: number
    atk1Mod: number
    atk1Range: number
    atk1RangeShort: number
    atk1Dam: number
    atk1DamageType: number
    atk2Type: number
    atk2Mod: number
    atk2Range: number
    atk2RangeShort: number
    atk2Dam: number
    atk2DamageType: number
    atk3Type: number
    atk3Mod: number
    atk3Range: number
    atk3RangeShort: number
    atk3Dam: number
    atk3DamageType: number
    atk4Type: number
    atk4Mod: number
    atk4Range: number
    atk4RangeShort: number
    atk4Dam: number
    atk4DamageType: number
    saveDC: number
    savingThrow: number
    actionNotes: number
    ability: number
    spellSaveDC: number
    spellSavingThrows: number
    spellAttack: number
    atWillSpells: number
    threePerDaySpells: number
    twoPerDaySpells: number
    onePerDaySpells: number
    bonusAction: number
    reaction: number
    amount: number
    legendaryActionSaveDC: number
    legendaryActionSavingThrow: number
    legendaryActions: number
    lair: number
    xpLair: number
    legendaryResistance: number
    legendaryActionsLair: number
    lairSaveDC: number
    lairSavingThrows: number
    other: number
    align: number
    speeds: number
    strScore: number
    dexScore: number
    conScore: number
    intScore: number
    wisScore: number
    chaScore: number
    savThrows: number
    skills: number
    wri: number
    senses: number
    additional: number
    font: number
    additionalInfo: number
    author: number
    _all: number
  }


  export type MonsterMinAggregateInputType = {
    id?: true
    name?: true
    size?: true
    type?: true
    alignment?: true
    habitat?: true
    mainHabitat?: true
    otherHabitat?: true
    treasure?: true
    ac?: true
    hp?: true
    initiative?: true
    walk?: true
    burrow?: true
    climb?: true
    fly?: true
    hover?: true
    swim?: true
    strMod?: true
    intMod?: true
    dexMod?: true
    wisMod?: true
    conMod?: true
    chaMod?: true
    strSave?: true
    intSave?: true
    dexSave?: true
    wisSave?: true
    conSave?: true
    chaSave?: true
    proficient?: true
    expertise?: true
    vulnerabilities?: true
    slashing?: true
    immunitiesConditions?: true
    immunitiesDamage?: true
    blindsight?: true
    darkvision?: true
    truesight?: true
    tremorsense?: true
    passivePerception?: true
    languages?: true
    cr?: true
    xpVal?: true
    pb?: true
    traits?: true
    legendaryResistanceCount?: true
    numberOfAtk?: true
    atk1Type?: true
    atk1Mod?: true
    atk1Range?: true
    atk1RangeShort?: true
    atk1Dam?: true
    atk1DamageType?: true
    atk2Type?: true
    atk2Mod?: true
    atk2Range?: true
    atk2RangeShort?: true
    atk2Dam?: true
    atk2DamageType?: true
    atk3Type?: true
    atk3Mod?: true
    atk3Range?: true
    atk3RangeShort?: true
    atk3Dam?: true
    atk3DamageType?: true
    atk4Type?: true
    atk4Mod?: true
    atk4Range?: true
    atk4RangeShort?: true
    atk4Dam?: true
    atk4DamageType?: true
    saveDC?: true
    savingThrow?: true
    actionNotes?: true
    ability?: true
    spellSaveDC?: true
    spellSavingThrows?: true
    spellAttack?: true
    atWillSpells?: true
    threePerDaySpells?: true
    twoPerDaySpells?: true
    onePerDaySpells?: true
    bonusAction?: true
    reaction?: true
    amount?: true
    legendaryActionSaveDC?: true
    legendaryActionSavingThrow?: true
    legendaryActions?: true
    lair?: true
    xpLair?: true
    legendaryResistance?: true
    legendaryActionsLair?: true
    lairSaveDC?: true
    lairSavingThrows?: true
    other?: true
    align?: true
    speeds?: true
    strScore?: true
    dexScore?: true
    conScore?: true
    intScore?: true
    wisScore?: true
    chaScore?: true
    savThrows?: true
    skills?: true
    wri?: true
    senses?: true
    additional?: true
    font?: true
    additionalInfo?: true
    author?: true
  }

  export type MonsterMaxAggregateInputType = {
    id?: true
    name?: true
    size?: true
    type?: true
    alignment?: true
    habitat?: true
    mainHabitat?: true
    otherHabitat?: true
    treasure?: true
    ac?: true
    hp?: true
    initiative?: true
    walk?: true
    burrow?: true
    climb?: true
    fly?: true
    hover?: true
    swim?: true
    strMod?: true
    intMod?: true
    dexMod?: true
    wisMod?: true
    conMod?: true
    chaMod?: true
    strSave?: true
    intSave?: true
    dexSave?: true
    wisSave?: true
    conSave?: true
    chaSave?: true
    proficient?: true
    expertise?: true
    vulnerabilities?: true
    slashing?: true
    immunitiesConditions?: true
    immunitiesDamage?: true
    blindsight?: true
    darkvision?: true
    truesight?: true
    tremorsense?: true
    passivePerception?: true
    languages?: true
    cr?: true
    xpVal?: true
    pb?: true
    traits?: true
    legendaryResistanceCount?: true
    numberOfAtk?: true
    atk1Type?: true
    atk1Mod?: true
    atk1Range?: true
    atk1RangeShort?: true
    atk1Dam?: true
    atk1DamageType?: true
    atk2Type?: true
    atk2Mod?: true
    atk2Range?: true
    atk2RangeShort?: true
    atk2Dam?: true
    atk2DamageType?: true
    atk3Type?: true
    atk3Mod?: true
    atk3Range?: true
    atk3RangeShort?: true
    atk3Dam?: true
    atk3DamageType?: true
    atk4Type?: true
    atk4Mod?: true
    atk4Range?: true
    atk4RangeShort?: true
    atk4Dam?: true
    atk4DamageType?: true
    saveDC?: true
    savingThrow?: true
    actionNotes?: true
    ability?: true
    spellSaveDC?: true
    spellSavingThrows?: true
    spellAttack?: true
    atWillSpells?: true
    threePerDaySpells?: true
    twoPerDaySpells?: true
    onePerDaySpells?: true
    bonusAction?: true
    reaction?: true
    amount?: true
    legendaryActionSaveDC?: true
    legendaryActionSavingThrow?: true
    legendaryActions?: true
    lair?: true
    xpLair?: true
    legendaryResistance?: true
    legendaryActionsLair?: true
    lairSaveDC?: true
    lairSavingThrows?: true
    other?: true
    align?: true
    speeds?: true
    strScore?: true
    dexScore?: true
    conScore?: true
    intScore?: true
    wisScore?: true
    chaScore?: true
    savThrows?: true
    skills?: true
    wri?: true
    senses?: true
    additional?: true
    font?: true
    additionalInfo?: true
    author?: true
  }

  export type MonsterCountAggregateInputType = {
    id?: true
    name?: true
    size?: true
    type?: true
    alignment?: true
    habitat?: true
    mainHabitat?: true
    otherHabitat?: true
    treasure?: true
    ac?: true
    hp?: true
    initiative?: true
    walk?: true
    burrow?: true
    climb?: true
    fly?: true
    hover?: true
    swim?: true
    strMod?: true
    intMod?: true
    dexMod?: true
    wisMod?: true
    conMod?: true
    chaMod?: true
    strSave?: true
    intSave?: true
    dexSave?: true
    wisSave?: true
    conSave?: true
    chaSave?: true
    proficient?: true
    expertise?: true
    vulnerabilities?: true
    slashing?: true
    immunitiesConditions?: true
    immunitiesDamage?: true
    blindsight?: true
    darkvision?: true
    truesight?: true
    tremorsense?: true
    passivePerception?: true
    languages?: true
    cr?: true
    xpVal?: true
    pb?: true
    traits?: true
    legendaryResistanceCount?: true
    numberOfAtk?: true
    atk1Type?: true
    atk1Mod?: true
    atk1Range?: true
    atk1RangeShort?: true
    atk1Dam?: true
    atk1DamageType?: true
    atk2Type?: true
    atk2Mod?: true
    atk2Range?: true
    atk2RangeShort?: true
    atk2Dam?: true
    atk2DamageType?: true
    atk3Type?: true
    atk3Mod?: true
    atk3Range?: true
    atk3RangeShort?: true
    atk3Dam?: true
    atk3DamageType?: true
    atk4Type?: true
    atk4Mod?: true
    atk4Range?: true
    atk4RangeShort?: true
    atk4Dam?: true
    atk4DamageType?: true
    saveDC?: true
    savingThrow?: true
    actionNotes?: true
    ability?: true
    spellSaveDC?: true
    spellSavingThrows?: true
    spellAttack?: true
    atWillSpells?: true
    threePerDaySpells?: true
    twoPerDaySpells?: true
    onePerDaySpells?: true
    bonusAction?: true
    reaction?: true
    amount?: true
    legendaryActionSaveDC?: true
    legendaryActionSavingThrow?: true
    legendaryActions?: true
    lair?: true
    xpLair?: true
    legendaryResistance?: true
    legendaryActionsLair?: true
    lairSaveDC?: true
    lairSavingThrows?: true
    other?: true
    align?: true
    speeds?: true
    strScore?: true
    dexScore?: true
    conScore?: true
    intScore?: true
    wisScore?: true
    chaScore?: true
    savThrows?: true
    skills?: true
    wri?: true
    senses?: true
    additional?: true
    font?: true
    additionalInfo?: true
    author?: true
    _all?: true
  }

  export type MonsterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Monster to aggregate.
     */
    where?: MonsterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Monsters to fetch.
     */
    orderBy?: MonsterOrderByWithRelationInput | MonsterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonsterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Monsters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Monsters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Monsters
    **/
    _count?: true | MonsterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonsterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonsterMaxAggregateInputType
  }

  export type GetMonsterAggregateType<T extends MonsterAggregateArgs> = {
        [P in keyof T & keyof AggregateMonster]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonster[P]>
      : GetScalarType<T[P], AggregateMonster[P]>
  }




  export type MonsterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonsterWhereInput
    orderBy?: MonsterOrderByWithAggregationInput | MonsterOrderByWithAggregationInput[]
    by: MonsterScalarFieldEnum[] | MonsterScalarFieldEnum
    having?: MonsterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonsterCountAggregateInputType | true
    _min?: MonsterMinAggregateInputType
    _max?: MonsterMaxAggregateInputType
  }

  export type MonsterGroupByOutputType = {
    id: string
    name: string
    size: string | null
    type: string | null
    alignment: string | null
    habitat: string | null
    mainHabitat: string | null
    otherHabitat: string | null
    treasure: string | null
    ac: string | null
    hp: string | null
    initiative: string | null
    walk: string | null
    burrow: string | null
    climb: string | null
    fly: string | null
    hover: string | null
    swim: string | null
    strMod: string | null
    intMod: string | null
    dexMod: string | null
    wisMod: string | null
    conMod: string | null
    chaMod: string | null
    strSave: string | null
    intSave: string | null
    dexSave: string | null
    wisSave: string | null
    conSave: string | null
    chaSave: string | null
    proficient: string | null
    expertise: string | null
    vulnerabilities: string | null
    slashing: string | null
    immunitiesConditions: string | null
    immunitiesDamage: string | null
    blindsight: string | null
    darkvision: string | null
    truesight: string | null
    tremorsense: string | null
    passivePerception: string | null
    languages: string | null
    cr: string | null
    xpVal: string | null
    pb: string | null
    traits: string | null
    legendaryResistanceCount: string | null
    numberOfAtk: string | null
    atk1Type: string | null
    atk1Mod: string | null
    atk1Range: string | null
    atk1RangeShort: string | null
    atk1Dam: string | null
    atk1DamageType: string | null
    atk2Type: string | null
    atk2Mod: string | null
    atk2Range: string | null
    atk2RangeShort: string | null
    atk2Dam: string | null
    atk2DamageType: string | null
    atk3Type: string | null
    atk3Mod: string | null
    atk3Range: string | null
    atk3RangeShort: string | null
    atk3Dam: string | null
    atk3DamageType: string | null
    atk4Type: string | null
    atk4Mod: string | null
    atk4Range: string | null
    atk4RangeShort: string | null
    atk4Dam: string | null
    atk4DamageType: string | null
    saveDC: string | null
    savingThrow: string | null
    actionNotes: string | null
    ability: string | null
    spellSaveDC: string | null
    spellSavingThrows: string | null
    spellAttack: string | null
    atWillSpells: string | null
    threePerDaySpells: string | null
    twoPerDaySpells: string | null
    onePerDaySpells: string | null
    bonusAction: string | null
    reaction: string | null
    amount: string | null
    legendaryActionSaveDC: string | null
    legendaryActionSavingThrow: string | null
    legendaryActions: string | null
    lair: string | null
    xpLair: string | null
    legendaryResistance: string | null
    legendaryActionsLair: string | null
    lairSaveDC: string | null
    lairSavingThrows: string | null
    other: string | null
    align: string | null
    speeds: string | null
    strScore: string | null
    dexScore: string | null
    conScore: string | null
    intScore: string | null
    wisScore: string | null
    chaScore: string | null
    savThrows: string | null
    skills: string | null
    wri: string | null
    senses: string | null
    additional: string | null
    font: string | null
    additionalInfo: string | null
    author: string | null
    _count: MonsterCountAggregateOutputType | null
    _min: MonsterMinAggregateOutputType | null
    _max: MonsterMaxAggregateOutputType | null
  }

  type GetMonsterGroupByPayload<T extends MonsterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonsterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonsterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonsterGroupByOutputType[P]>
            : GetScalarType<T[P], MonsterGroupByOutputType[P]>
        }
      >
    >


  export type MonsterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    type?: boolean
    alignment?: boolean
    habitat?: boolean
    mainHabitat?: boolean
    otherHabitat?: boolean
    treasure?: boolean
    ac?: boolean
    hp?: boolean
    initiative?: boolean
    walk?: boolean
    burrow?: boolean
    climb?: boolean
    fly?: boolean
    hover?: boolean
    swim?: boolean
    strMod?: boolean
    intMod?: boolean
    dexMod?: boolean
    wisMod?: boolean
    conMod?: boolean
    chaMod?: boolean
    strSave?: boolean
    intSave?: boolean
    dexSave?: boolean
    wisSave?: boolean
    conSave?: boolean
    chaSave?: boolean
    proficient?: boolean
    expertise?: boolean
    vulnerabilities?: boolean
    slashing?: boolean
    immunitiesConditions?: boolean
    immunitiesDamage?: boolean
    blindsight?: boolean
    darkvision?: boolean
    truesight?: boolean
    tremorsense?: boolean
    passivePerception?: boolean
    languages?: boolean
    cr?: boolean
    xpVal?: boolean
    pb?: boolean
    traits?: boolean
    legendaryResistanceCount?: boolean
    numberOfAtk?: boolean
    atk1Type?: boolean
    atk1Mod?: boolean
    atk1Range?: boolean
    atk1RangeShort?: boolean
    atk1Dam?: boolean
    atk1DamageType?: boolean
    atk2Type?: boolean
    atk2Mod?: boolean
    atk2Range?: boolean
    atk2RangeShort?: boolean
    atk2Dam?: boolean
    atk2DamageType?: boolean
    atk3Type?: boolean
    atk3Mod?: boolean
    atk3Range?: boolean
    atk3RangeShort?: boolean
    atk3Dam?: boolean
    atk3DamageType?: boolean
    atk4Type?: boolean
    atk4Mod?: boolean
    atk4Range?: boolean
    atk4RangeShort?: boolean
    atk4Dam?: boolean
    atk4DamageType?: boolean
    saveDC?: boolean
    savingThrow?: boolean
    actionNotes?: boolean
    ability?: boolean
    spellSaveDC?: boolean
    spellSavingThrows?: boolean
    spellAttack?: boolean
    atWillSpells?: boolean
    threePerDaySpells?: boolean
    twoPerDaySpells?: boolean
    onePerDaySpells?: boolean
    bonusAction?: boolean
    reaction?: boolean
    amount?: boolean
    legendaryActionSaveDC?: boolean
    legendaryActionSavingThrow?: boolean
    legendaryActions?: boolean
    lair?: boolean
    xpLair?: boolean
    legendaryResistance?: boolean
    legendaryActionsLair?: boolean
    lairSaveDC?: boolean
    lairSavingThrows?: boolean
    other?: boolean
    align?: boolean
    speeds?: boolean
    strScore?: boolean
    dexScore?: boolean
    conScore?: boolean
    intScore?: boolean
    wisScore?: boolean
    chaScore?: boolean
    savThrows?: boolean
    skills?: boolean
    wri?: boolean
    senses?: boolean
    additional?: boolean
    font?: boolean
    additionalInfo?: boolean
    author?: boolean
  }, ExtArgs["result"]["monster"]>

  export type MonsterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    type?: boolean
    alignment?: boolean
    habitat?: boolean
    mainHabitat?: boolean
    otherHabitat?: boolean
    treasure?: boolean
    ac?: boolean
    hp?: boolean
    initiative?: boolean
    walk?: boolean
    burrow?: boolean
    climb?: boolean
    fly?: boolean
    hover?: boolean
    swim?: boolean
    strMod?: boolean
    intMod?: boolean
    dexMod?: boolean
    wisMod?: boolean
    conMod?: boolean
    chaMod?: boolean
    strSave?: boolean
    intSave?: boolean
    dexSave?: boolean
    wisSave?: boolean
    conSave?: boolean
    chaSave?: boolean
    proficient?: boolean
    expertise?: boolean
    vulnerabilities?: boolean
    slashing?: boolean
    immunitiesConditions?: boolean
    immunitiesDamage?: boolean
    blindsight?: boolean
    darkvision?: boolean
    truesight?: boolean
    tremorsense?: boolean
    passivePerception?: boolean
    languages?: boolean
    cr?: boolean
    xpVal?: boolean
    pb?: boolean
    traits?: boolean
    legendaryResistanceCount?: boolean
    numberOfAtk?: boolean
    atk1Type?: boolean
    atk1Mod?: boolean
    atk1Range?: boolean
    atk1RangeShort?: boolean
    atk1Dam?: boolean
    atk1DamageType?: boolean
    atk2Type?: boolean
    atk2Mod?: boolean
    atk2Range?: boolean
    atk2RangeShort?: boolean
    atk2Dam?: boolean
    atk2DamageType?: boolean
    atk3Type?: boolean
    atk3Mod?: boolean
    atk3Range?: boolean
    atk3RangeShort?: boolean
    atk3Dam?: boolean
    atk3DamageType?: boolean
    atk4Type?: boolean
    atk4Mod?: boolean
    atk4Range?: boolean
    atk4RangeShort?: boolean
    atk4Dam?: boolean
    atk4DamageType?: boolean
    saveDC?: boolean
    savingThrow?: boolean
    actionNotes?: boolean
    ability?: boolean
    spellSaveDC?: boolean
    spellSavingThrows?: boolean
    spellAttack?: boolean
    atWillSpells?: boolean
    threePerDaySpells?: boolean
    twoPerDaySpells?: boolean
    onePerDaySpells?: boolean
    bonusAction?: boolean
    reaction?: boolean
    amount?: boolean
    legendaryActionSaveDC?: boolean
    legendaryActionSavingThrow?: boolean
    legendaryActions?: boolean
    lair?: boolean
    xpLair?: boolean
    legendaryResistance?: boolean
    legendaryActionsLair?: boolean
    lairSaveDC?: boolean
    lairSavingThrows?: boolean
    other?: boolean
    align?: boolean
    speeds?: boolean
    strScore?: boolean
    dexScore?: boolean
    conScore?: boolean
    intScore?: boolean
    wisScore?: boolean
    chaScore?: boolean
    savThrows?: boolean
    skills?: boolean
    wri?: boolean
    senses?: boolean
    additional?: boolean
    font?: boolean
    additionalInfo?: boolean
    author?: boolean
  }, ExtArgs["result"]["monster"]>


  export type MonsterSelectScalar = {
    id?: boolean
    name?: boolean
    size?: boolean
    type?: boolean
    alignment?: boolean
    habitat?: boolean
    mainHabitat?: boolean
    otherHabitat?: boolean
    treasure?: boolean
    ac?: boolean
    hp?: boolean
    initiative?: boolean
    walk?: boolean
    burrow?: boolean
    climb?: boolean
    fly?: boolean
    hover?: boolean
    swim?: boolean
    strMod?: boolean
    intMod?: boolean
    dexMod?: boolean
    wisMod?: boolean
    conMod?: boolean
    chaMod?: boolean
    strSave?: boolean
    intSave?: boolean
    dexSave?: boolean
    wisSave?: boolean
    conSave?: boolean
    chaSave?: boolean
    proficient?: boolean
    expertise?: boolean
    vulnerabilities?: boolean
    slashing?: boolean
    immunitiesConditions?: boolean
    immunitiesDamage?: boolean
    blindsight?: boolean
    darkvision?: boolean
    truesight?: boolean
    tremorsense?: boolean
    passivePerception?: boolean
    languages?: boolean
    cr?: boolean
    xpVal?: boolean
    pb?: boolean
    traits?: boolean
    legendaryResistanceCount?: boolean
    numberOfAtk?: boolean
    atk1Type?: boolean
    atk1Mod?: boolean
    atk1Range?: boolean
    atk1RangeShort?: boolean
    atk1Dam?: boolean
    atk1DamageType?: boolean
    atk2Type?: boolean
    atk2Mod?: boolean
    atk2Range?: boolean
    atk2RangeShort?: boolean
    atk2Dam?: boolean
    atk2DamageType?: boolean
    atk3Type?: boolean
    atk3Mod?: boolean
    atk3Range?: boolean
    atk3RangeShort?: boolean
    atk3Dam?: boolean
    atk3DamageType?: boolean
    atk4Type?: boolean
    atk4Mod?: boolean
    atk4Range?: boolean
    atk4RangeShort?: boolean
    atk4Dam?: boolean
    atk4DamageType?: boolean
    saveDC?: boolean
    savingThrow?: boolean
    actionNotes?: boolean
    ability?: boolean
    spellSaveDC?: boolean
    spellSavingThrows?: boolean
    spellAttack?: boolean
    atWillSpells?: boolean
    threePerDaySpells?: boolean
    twoPerDaySpells?: boolean
    onePerDaySpells?: boolean
    bonusAction?: boolean
    reaction?: boolean
    amount?: boolean
    legendaryActionSaveDC?: boolean
    legendaryActionSavingThrow?: boolean
    legendaryActions?: boolean
    lair?: boolean
    xpLair?: boolean
    legendaryResistance?: boolean
    legendaryActionsLair?: boolean
    lairSaveDC?: boolean
    lairSavingThrows?: boolean
    other?: boolean
    align?: boolean
    speeds?: boolean
    strScore?: boolean
    dexScore?: boolean
    conScore?: boolean
    intScore?: boolean
    wisScore?: boolean
    chaScore?: boolean
    savThrows?: boolean
    skills?: boolean
    wri?: boolean
    senses?: boolean
    additional?: boolean
    font?: boolean
    additionalInfo?: boolean
    author?: boolean
  }

  export type MonsterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "size" | "type" | "alignment" | "habitat" | "mainHabitat" | "otherHabitat" | "treasure" | "ac" | "hp" | "initiative" | "walk" | "burrow" | "climb" | "fly" | "hover" | "swim" | "strMod" | "intMod" | "dexMod" | "wisMod" | "conMod" | "chaMod" | "strSave" | "intSave" | "dexSave" | "wisSave" | "conSave" | "chaSave" | "proficient" | "expertise" | "vulnerabilities" | "slashing" | "immunitiesConditions" | "immunitiesDamage" | "blindsight" | "darkvision" | "truesight" | "tremorsense" | "passivePerception" | "languages" | "cr" | "xpVal" | "pb" | "traits" | "legendaryResistanceCount" | "numberOfAtk" | "atk1Type" | "atk1Mod" | "atk1Range" | "atk1RangeShort" | "atk1Dam" | "atk1DamageType" | "atk2Type" | "atk2Mod" | "atk2Range" | "atk2RangeShort" | "atk2Dam" | "atk2DamageType" | "atk3Type" | "atk3Mod" | "atk3Range" | "atk3RangeShort" | "atk3Dam" | "atk3DamageType" | "atk4Type" | "atk4Mod" | "atk4Range" | "atk4RangeShort" | "atk4Dam" | "atk4DamageType" | "saveDC" | "savingThrow" | "actionNotes" | "ability" | "spellSaveDC" | "spellSavingThrows" | "spellAttack" | "atWillSpells" | "threePerDaySpells" | "twoPerDaySpells" | "onePerDaySpells" | "bonusAction" | "reaction" | "amount" | "legendaryActionSaveDC" | "legendaryActionSavingThrow" | "legendaryActions" | "lair" | "xpLair" | "legendaryResistance" | "legendaryActionsLair" | "lairSaveDC" | "lairSavingThrows" | "other" | "align" | "speeds" | "strScore" | "dexScore" | "conScore" | "intScore" | "wisScore" | "chaScore" | "savThrows" | "skills" | "wri" | "senses" | "additional" | "font" | "additionalInfo" | "author", ExtArgs["result"]["monster"]>

  export type $MonsterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Monster"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      size: string | null
      type: string | null
      alignment: string | null
      habitat: string | null
      mainHabitat: string | null
      otherHabitat: string | null
      treasure: string | null
      ac: string | null
      hp: string | null
      initiative: string | null
      walk: string | null
      burrow: string | null
      climb: string | null
      fly: string | null
      hover: string | null
      swim: string | null
      strMod: string | null
      intMod: string | null
      dexMod: string | null
      wisMod: string | null
      conMod: string | null
      chaMod: string | null
      strSave: string | null
      intSave: string | null
      dexSave: string | null
      wisSave: string | null
      conSave: string | null
      chaSave: string | null
      proficient: string | null
      expertise: string | null
      vulnerabilities: string | null
      slashing: string | null
      immunitiesConditions: string | null
      immunitiesDamage: string | null
      blindsight: string | null
      darkvision: string | null
      truesight: string | null
      tremorsense: string | null
      passivePerception: string | null
      languages: string | null
      cr: string | null
      xpVal: string | null
      pb: string | null
      traits: string | null
      legendaryResistanceCount: string | null
      numberOfAtk: string | null
      atk1Type: string | null
      atk1Mod: string | null
      atk1Range: string | null
      atk1RangeShort: string | null
      atk1Dam: string | null
      atk1DamageType: string | null
      atk2Type: string | null
      atk2Mod: string | null
      atk2Range: string | null
      atk2RangeShort: string | null
      atk2Dam: string | null
      atk2DamageType: string | null
      atk3Type: string | null
      atk3Mod: string | null
      atk3Range: string | null
      atk3RangeShort: string | null
      atk3Dam: string | null
      atk3DamageType: string | null
      atk4Type: string | null
      atk4Mod: string | null
      atk4Range: string | null
      atk4RangeShort: string | null
      atk4Dam: string | null
      atk4DamageType: string | null
      saveDC: string | null
      savingThrow: string | null
      actionNotes: string | null
      ability: string | null
      spellSaveDC: string | null
      spellSavingThrows: string | null
      spellAttack: string | null
      atWillSpells: string | null
      threePerDaySpells: string | null
      twoPerDaySpells: string | null
      onePerDaySpells: string | null
      bonusAction: string | null
      reaction: string | null
      amount: string | null
      legendaryActionSaveDC: string | null
      legendaryActionSavingThrow: string | null
      legendaryActions: string | null
      lair: string | null
      xpLair: string | null
      legendaryResistance: string | null
      legendaryActionsLair: string | null
      lairSaveDC: string | null
      lairSavingThrows: string | null
      other: string | null
      align: string | null
      speeds: string | null
      strScore: string | null
      dexScore: string | null
      conScore: string | null
      intScore: string | null
      wisScore: string | null
      chaScore: string | null
      savThrows: string | null
      skills: string | null
      wri: string | null
      senses: string | null
      additional: string | null
      font: string | null
      additionalInfo: string | null
      author: string | null
    }, ExtArgs["result"]["monster"]>
    composites: {}
  }

  type MonsterGetPayload<S extends boolean | null | undefined | MonsterDefaultArgs> = $Result.GetResult<Prisma.$MonsterPayload, S>

  type MonsterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MonsterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MonsterCountAggregateInputType | true
    }

  export interface MonsterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Monster'], meta: { name: 'Monster' } }
    /**
     * Find zero or one Monster that matches the filter.
     * @param {MonsterFindUniqueArgs} args - Arguments to find a Monster
     * @example
     * // Get one Monster
     * const monster = await prisma.monster.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MonsterFindUniqueArgs>(args: SelectSubset<T, MonsterFindUniqueArgs<ExtArgs>>): Prisma__MonsterClient<$Result.GetResult<Prisma.$MonsterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Monster that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MonsterFindUniqueOrThrowArgs} args - Arguments to find a Monster
     * @example
     * // Get one Monster
     * const monster = await prisma.monster.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MonsterFindUniqueOrThrowArgs>(args: SelectSubset<T, MonsterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MonsterClient<$Result.GetResult<Prisma.$MonsterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Monster that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonsterFindFirstArgs} args - Arguments to find a Monster
     * @example
     * // Get one Monster
     * const monster = await prisma.monster.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MonsterFindFirstArgs>(args?: SelectSubset<T, MonsterFindFirstArgs<ExtArgs>>): Prisma__MonsterClient<$Result.GetResult<Prisma.$MonsterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Monster that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonsterFindFirstOrThrowArgs} args - Arguments to find a Monster
     * @example
     * // Get one Monster
     * const monster = await prisma.monster.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MonsterFindFirstOrThrowArgs>(args?: SelectSubset<T, MonsterFindFirstOrThrowArgs<ExtArgs>>): Prisma__MonsterClient<$Result.GetResult<Prisma.$MonsterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Monsters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonsterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Monsters
     * const monsters = await prisma.monster.findMany()
     * 
     * // Get first 10 Monsters
     * const monsters = await prisma.monster.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monsterWithIdOnly = await prisma.monster.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MonsterFindManyArgs>(args?: SelectSubset<T, MonsterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonsterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Monster.
     * @param {MonsterCreateArgs} args - Arguments to create a Monster.
     * @example
     * // Create one Monster
     * const Monster = await prisma.monster.create({
     *   data: {
     *     // ... data to create a Monster
     *   }
     * })
     * 
     */
    create<T extends MonsterCreateArgs>(args: SelectSubset<T, MonsterCreateArgs<ExtArgs>>): Prisma__MonsterClient<$Result.GetResult<Prisma.$MonsterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Monsters.
     * @param {MonsterCreateManyArgs} args - Arguments to create many Monsters.
     * @example
     * // Create many Monsters
     * const monster = await prisma.monster.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MonsterCreateManyArgs>(args?: SelectSubset<T, MonsterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Monsters and returns the data saved in the database.
     * @param {MonsterCreateManyAndReturnArgs} args - Arguments to create many Monsters.
     * @example
     * // Create many Monsters
     * const monster = await prisma.monster.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Monsters and only return the `id`
     * const monsterWithIdOnly = await prisma.monster.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MonsterCreateManyAndReturnArgs>(args?: SelectSubset<T, MonsterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonsterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Monster.
     * @param {MonsterDeleteArgs} args - Arguments to delete one Monster.
     * @example
     * // Delete one Monster
     * const Monster = await prisma.monster.delete({
     *   where: {
     *     // ... filter to delete one Monster
     *   }
     * })
     * 
     */
    delete<T extends MonsterDeleteArgs>(args: SelectSubset<T, MonsterDeleteArgs<ExtArgs>>): Prisma__MonsterClient<$Result.GetResult<Prisma.$MonsterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Monster.
     * @param {MonsterUpdateArgs} args - Arguments to update one Monster.
     * @example
     * // Update one Monster
     * const monster = await prisma.monster.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MonsterUpdateArgs>(args: SelectSubset<T, MonsterUpdateArgs<ExtArgs>>): Prisma__MonsterClient<$Result.GetResult<Prisma.$MonsterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Monsters.
     * @param {MonsterDeleteManyArgs} args - Arguments to filter Monsters to delete.
     * @example
     * // Delete a few Monsters
     * const { count } = await prisma.monster.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MonsterDeleteManyArgs>(args?: SelectSubset<T, MonsterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Monsters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonsterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Monsters
     * const monster = await prisma.monster.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MonsterUpdateManyArgs>(args: SelectSubset<T, MonsterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Monster.
     * @param {MonsterUpsertArgs} args - Arguments to update or create a Monster.
     * @example
     * // Update or create a Monster
     * const monster = await prisma.monster.upsert({
     *   create: {
     *     // ... data to create a Monster
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Monster we want to update
     *   }
     * })
     */
    upsert<T extends MonsterUpsertArgs>(args: SelectSubset<T, MonsterUpsertArgs<ExtArgs>>): Prisma__MonsterClient<$Result.GetResult<Prisma.$MonsterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Monsters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonsterCountArgs} args - Arguments to filter Monsters to count.
     * @example
     * // Count the number of Monsters
     * const count = await prisma.monster.count({
     *   where: {
     *     // ... the filter for the Monsters we want to count
     *   }
     * })
    **/
    count<T extends MonsterCountArgs>(
      args?: Subset<T, MonsterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonsterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Monster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonsterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonsterAggregateArgs>(args: Subset<T, MonsterAggregateArgs>): Prisma.PrismaPromise<GetMonsterAggregateType<T>>

    /**
     * Group by Monster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonsterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonsterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonsterGroupByArgs['orderBy'] }
        : { orderBy?: MonsterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonsterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonsterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Monster model
   */
  readonly fields: MonsterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Monster.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonsterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Monster model
   */
  interface MonsterFieldRefs {
    readonly id: FieldRef<"Monster", 'String'>
    readonly name: FieldRef<"Monster", 'String'>
    readonly size: FieldRef<"Monster", 'String'>
    readonly type: FieldRef<"Monster", 'String'>
    readonly alignment: FieldRef<"Monster", 'String'>
    readonly habitat: FieldRef<"Monster", 'String'>
    readonly mainHabitat: FieldRef<"Monster", 'String'>
    readonly otherHabitat: FieldRef<"Monster", 'String'>
    readonly treasure: FieldRef<"Monster", 'String'>
    readonly ac: FieldRef<"Monster", 'String'>
    readonly hp: FieldRef<"Monster", 'String'>
    readonly initiative: FieldRef<"Monster", 'String'>
    readonly walk: FieldRef<"Monster", 'String'>
    readonly burrow: FieldRef<"Monster", 'String'>
    readonly climb: FieldRef<"Monster", 'String'>
    readonly fly: FieldRef<"Monster", 'String'>
    readonly hover: FieldRef<"Monster", 'String'>
    readonly swim: FieldRef<"Monster", 'String'>
    readonly strMod: FieldRef<"Monster", 'String'>
    readonly intMod: FieldRef<"Monster", 'String'>
    readonly dexMod: FieldRef<"Monster", 'String'>
    readonly wisMod: FieldRef<"Monster", 'String'>
    readonly conMod: FieldRef<"Monster", 'String'>
    readonly chaMod: FieldRef<"Monster", 'String'>
    readonly strSave: FieldRef<"Monster", 'String'>
    readonly intSave: FieldRef<"Monster", 'String'>
    readonly dexSave: FieldRef<"Monster", 'String'>
    readonly wisSave: FieldRef<"Monster", 'String'>
    readonly conSave: FieldRef<"Monster", 'String'>
    readonly chaSave: FieldRef<"Monster", 'String'>
    readonly proficient: FieldRef<"Monster", 'String'>
    readonly expertise: FieldRef<"Monster", 'String'>
    readonly vulnerabilities: FieldRef<"Monster", 'String'>
    readonly slashing: FieldRef<"Monster", 'String'>
    readonly immunitiesConditions: FieldRef<"Monster", 'String'>
    readonly immunitiesDamage: FieldRef<"Monster", 'String'>
    readonly blindsight: FieldRef<"Monster", 'String'>
    readonly darkvision: FieldRef<"Monster", 'String'>
    readonly truesight: FieldRef<"Monster", 'String'>
    readonly tremorsense: FieldRef<"Monster", 'String'>
    readonly passivePerception: FieldRef<"Monster", 'String'>
    readonly languages: FieldRef<"Monster", 'String'>
    readonly cr: FieldRef<"Monster", 'String'>
    readonly xpVal: FieldRef<"Monster", 'String'>
    readonly pb: FieldRef<"Monster", 'String'>
    readonly traits: FieldRef<"Monster", 'String'>
    readonly legendaryResistanceCount: FieldRef<"Monster", 'String'>
    readonly numberOfAtk: FieldRef<"Monster", 'String'>
    readonly atk1Type: FieldRef<"Monster", 'String'>
    readonly atk1Mod: FieldRef<"Monster", 'String'>
    readonly atk1Range: FieldRef<"Monster", 'String'>
    readonly atk1RangeShort: FieldRef<"Monster", 'String'>
    readonly atk1Dam: FieldRef<"Monster", 'String'>
    readonly atk1DamageType: FieldRef<"Monster", 'String'>
    readonly atk2Type: FieldRef<"Monster", 'String'>
    readonly atk2Mod: FieldRef<"Monster", 'String'>
    readonly atk2Range: FieldRef<"Monster", 'String'>
    readonly atk2RangeShort: FieldRef<"Monster", 'String'>
    readonly atk2Dam: FieldRef<"Monster", 'String'>
    readonly atk2DamageType: FieldRef<"Monster", 'String'>
    readonly atk3Type: FieldRef<"Monster", 'String'>
    readonly atk3Mod: FieldRef<"Monster", 'String'>
    readonly atk3Range: FieldRef<"Monster", 'String'>
    readonly atk3RangeShort: FieldRef<"Monster", 'String'>
    readonly atk3Dam: FieldRef<"Monster", 'String'>
    readonly atk3DamageType: FieldRef<"Monster", 'String'>
    readonly atk4Type: FieldRef<"Monster", 'String'>
    readonly atk4Mod: FieldRef<"Monster", 'String'>
    readonly atk4Range: FieldRef<"Monster", 'String'>
    readonly atk4RangeShort: FieldRef<"Monster", 'String'>
    readonly atk4Dam: FieldRef<"Monster", 'String'>
    readonly atk4DamageType: FieldRef<"Monster", 'String'>
    readonly saveDC: FieldRef<"Monster", 'String'>
    readonly savingThrow: FieldRef<"Monster", 'String'>
    readonly actionNotes: FieldRef<"Monster", 'String'>
    readonly ability: FieldRef<"Monster", 'String'>
    readonly spellSaveDC: FieldRef<"Monster", 'String'>
    readonly spellSavingThrows: FieldRef<"Monster", 'String'>
    readonly spellAttack: FieldRef<"Monster", 'String'>
    readonly atWillSpells: FieldRef<"Monster", 'String'>
    readonly threePerDaySpells: FieldRef<"Monster", 'String'>
    readonly twoPerDaySpells: FieldRef<"Monster", 'String'>
    readonly onePerDaySpells: FieldRef<"Monster", 'String'>
    readonly bonusAction: FieldRef<"Monster", 'String'>
    readonly reaction: FieldRef<"Monster", 'String'>
    readonly amount: FieldRef<"Monster", 'String'>
    readonly legendaryActionSaveDC: FieldRef<"Monster", 'String'>
    readonly legendaryActionSavingThrow: FieldRef<"Monster", 'String'>
    readonly legendaryActions: FieldRef<"Monster", 'String'>
    readonly lair: FieldRef<"Monster", 'String'>
    readonly xpLair: FieldRef<"Monster", 'String'>
    readonly legendaryResistance: FieldRef<"Monster", 'String'>
    readonly legendaryActionsLair: FieldRef<"Monster", 'String'>
    readonly lairSaveDC: FieldRef<"Monster", 'String'>
    readonly lairSavingThrows: FieldRef<"Monster", 'String'>
    readonly other: FieldRef<"Monster", 'String'>
    readonly align: FieldRef<"Monster", 'String'>
    readonly speeds: FieldRef<"Monster", 'String'>
    readonly strScore: FieldRef<"Monster", 'String'>
    readonly dexScore: FieldRef<"Monster", 'String'>
    readonly conScore: FieldRef<"Monster", 'String'>
    readonly intScore: FieldRef<"Monster", 'String'>
    readonly wisScore: FieldRef<"Monster", 'String'>
    readonly chaScore: FieldRef<"Monster", 'String'>
    readonly savThrows: FieldRef<"Monster", 'String'>
    readonly skills: FieldRef<"Monster", 'String'>
    readonly wri: FieldRef<"Monster", 'String'>
    readonly senses: FieldRef<"Monster", 'String'>
    readonly additional: FieldRef<"Monster", 'String'>
    readonly font: FieldRef<"Monster", 'String'>
    readonly additionalInfo: FieldRef<"Monster", 'String'>
    readonly author: FieldRef<"Monster", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Monster findUnique
   */
  export type MonsterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
    /**
     * Filter, which Monster to fetch.
     */
    where: MonsterWhereUniqueInput
  }

  /**
   * Monster findUniqueOrThrow
   */
  export type MonsterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
    /**
     * Filter, which Monster to fetch.
     */
    where: MonsterWhereUniqueInput
  }

  /**
   * Monster findFirst
   */
  export type MonsterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
    /**
     * Filter, which Monster to fetch.
     */
    where?: MonsterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Monsters to fetch.
     */
    orderBy?: MonsterOrderByWithRelationInput | MonsterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Monsters.
     */
    cursor?: MonsterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Monsters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Monsters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Monsters.
     */
    distinct?: MonsterScalarFieldEnum | MonsterScalarFieldEnum[]
  }

  /**
   * Monster findFirstOrThrow
   */
  export type MonsterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
    /**
     * Filter, which Monster to fetch.
     */
    where?: MonsterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Monsters to fetch.
     */
    orderBy?: MonsterOrderByWithRelationInput | MonsterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Monsters.
     */
    cursor?: MonsterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Monsters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Monsters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Monsters.
     */
    distinct?: MonsterScalarFieldEnum | MonsterScalarFieldEnum[]
  }

  /**
   * Monster findMany
   */
  export type MonsterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
    /**
     * Filter, which Monsters to fetch.
     */
    where?: MonsterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Monsters to fetch.
     */
    orderBy?: MonsterOrderByWithRelationInput | MonsterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Monsters.
     */
    cursor?: MonsterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Monsters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Monsters.
     */
    skip?: number
    distinct?: MonsterScalarFieldEnum | MonsterScalarFieldEnum[]
  }

  /**
   * Monster create
   */
  export type MonsterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
    /**
     * The data needed to create a Monster.
     */
    data: XOR<MonsterCreateInput, MonsterUncheckedCreateInput>
  }

  /**
   * Monster createMany
   */
  export type MonsterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Monsters.
     */
    data: MonsterCreateManyInput | MonsterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Monster createManyAndReturn
   */
  export type MonsterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
    /**
     * The data used to create many Monsters.
     */
    data: MonsterCreateManyInput | MonsterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Monster update
   */
  export type MonsterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
    /**
     * The data needed to update a Monster.
     */
    data: XOR<MonsterUpdateInput, MonsterUncheckedUpdateInput>
    /**
     * Choose, which Monster to update.
     */
    where: MonsterWhereUniqueInput
  }

  /**
   * Monster updateMany
   */
  export type MonsterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Monsters.
     */
    data: XOR<MonsterUpdateManyMutationInput, MonsterUncheckedUpdateManyInput>
    /**
     * Filter which Monsters to update
     */
    where?: MonsterWhereInput
  }

  /**
   * Monster upsert
   */
  export type MonsterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
    /**
     * The filter to search for the Monster to update in case it exists.
     */
    where: MonsterWhereUniqueInput
    /**
     * In case the Monster found by the `where` argument doesn't exist, create a new Monster with this data.
     */
    create: XOR<MonsterCreateInput, MonsterUncheckedCreateInput>
    /**
     * In case the Monster was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonsterUpdateInput, MonsterUncheckedUpdateInput>
  }

  /**
   * Monster delete
   */
  export type MonsterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
    /**
     * Filter which Monster to delete.
     */
    where: MonsterWhereUniqueInput
  }

  /**
   * Monster deleteMany
   */
  export type MonsterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Monsters to delete
     */
    where?: MonsterWhereInput
  }

  /**
   * Monster without action
   */
  export type MonsterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Monster
     */
    select?: MonsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Monster
     */
    omit?: MonsterOmit<ExtArgs> | null
  }


  /**
   * Model Race
   */

  export type AggregateRace = {
    _count: RaceCountAggregateOutputType | null
    _avg: RaceAvgAggregateOutputType | null
    _sum: RaceSumAggregateOutputType | null
    _min: RaceMinAggregateOutputType | null
    _max: RaceMaxAggregateOutputType | null
  }

  export type RaceAvgAggregateOutputType = {
    id: number | null
  }

  export type RaceSumAggregateOutputType = {
    id: number | null
  }

  export type RaceMinAggregateOutputType = {
    id: number | null
    race: string | null
    str: string | null
    dex: string | null
    con: string | null
    int: string | null
    wis: string | null
    cha: string | null
    special: string | null
    source: string | null
    notes: string | null
  }

  export type RaceMaxAggregateOutputType = {
    id: number | null
    race: string | null
    str: string | null
    dex: string | null
    con: string | null
    int: string | null
    wis: string | null
    cha: string | null
    special: string | null
    source: string | null
    notes: string | null
  }

  export type RaceCountAggregateOutputType = {
    id: number
    race: number
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
    special: number
    source: number
    notes: number
    _all: number
  }


  export type RaceAvgAggregateInputType = {
    id?: true
  }

  export type RaceSumAggregateInputType = {
    id?: true
  }

  export type RaceMinAggregateInputType = {
    id?: true
    race?: true
    str?: true
    dex?: true
    con?: true
    int?: true
    wis?: true
    cha?: true
    special?: true
    source?: true
    notes?: true
  }

  export type RaceMaxAggregateInputType = {
    id?: true
    race?: true
    str?: true
    dex?: true
    con?: true
    int?: true
    wis?: true
    cha?: true
    special?: true
    source?: true
    notes?: true
  }

  export type RaceCountAggregateInputType = {
    id?: true
    race?: true
    str?: true
    dex?: true
    con?: true
    int?: true
    wis?: true
    cha?: true
    special?: true
    source?: true
    notes?: true
    _all?: true
  }

  export type RaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Race to aggregate.
     */
    where?: RaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Races to fetch.
     */
    orderBy?: RaceOrderByWithRelationInput | RaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Races from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Races.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Races
    **/
    _count?: true | RaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RaceMaxAggregateInputType
  }

  export type GetRaceAggregateType<T extends RaceAggregateArgs> = {
        [P in keyof T & keyof AggregateRace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRace[P]>
      : GetScalarType<T[P], AggregateRace[P]>
  }




  export type RaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RaceWhereInput
    orderBy?: RaceOrderByWithAggregationInput | RaceOrderByWithAggregationInput[]
    by: RaceScalarFieldEnum[] | RaceScalarFieldEnum
    having?: RaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RaceCountAggregateInputType | true
    _avg?: RaceAvgAggregateInputType
    _sum?: RaceSumAggregateInputType
    _min?: RaceMinAggregateInputType
    _max?: RaceMaxAggregateInputType
  }

  export type RaceGroupByOutputType = {
    id: number
    race: string
    str: string | null
    dex: string | null
    con: string | null
    int: string | null
    wis: string | null
    cha: string | null
    special: string | null
    source: string
    notes: string | null
    _count: RaceCountAggregateOutputType | null
    _avg: RaceAvgAggregateOutputType | null
    _sum: RaceSumAggregateOutputType | null
    _min: RaceMinAggregateOutputType | null
    _max: RaceMaxAggregateOutputType | null
  }

  type GetRaceGroupByPayload<T extends RaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RaceGroupByOutputType[P]>
            : GetScalarType<T[P], RaceGroupByOutputType[P]>
        }
      >
    >


  export type RaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    race?: boolean
    str?: boolean
    dex?: boolean
    con?: boolean
    int?: boolean
    wis?: boolean
    cha?: boolean
    special?: boolean
    source?: boolean
    notes?: boolean
  }, ExtArgs["result"]["race"]>

  export type RaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    race?: boolean
    str?: boolean
    dex?: boolean
    con?: boolean
    int?: boolean
    wis?: boolean
    cha?: boolean
    special?: boolean
    source?: boolean
    notes?: boolean
  }, ExtArgs["result"]["race"]>


  export type RaceSelectScalar = {
    id?: boolean
    race?: boolean
    str?: boolean
    dex?: boolean
    con?: boolean
    int?: boolean
    wis?: boolean
    cha?: boolean
    special?: boolean
    source?: boolean
    notes?: boolean
  }

  export type RaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "race" | "str" | "dex" | "con" | "int" | "wis" | "cha" | "special" | "source" | "notes", ExtArgs["result"]["race"]>

  export type $RacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Race"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      race: string
      str: string | null
      dex: string | null
      con: string | null
      int: string | null
      wis: string | null
      cha: string | null
      special: string | null
      source: string
      notes: string | null
    }, ExtArgs["result"]["race"]>
    composites: {}
  }

  type RaceGetPayload<S extends boolean | null | undefined | RaceDefaultArgs> = $Result.GetResult<Prisma.$RacePayload, S>

  type RaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RaceCountAggregateInputType | true
    }

  export interface RaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Race'], meta: { name: 'Race' } }
    /**
     * Find zero or one Race that matches the filter.
     * @param {RaceFindUniqueArgs} args - Arguments to find a Race
     * @example
     * // Get one Race
     * const race = await prisma.race.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RaceFindUniqueArgs>(args: SelectSubset<T, RaceFindUniqueArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Race that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RaceFindUniqueOrThrowArgs} args - Arguments to find a Race
     * @example
     * // Get one Race
     * const race = await prisma.race.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RaceFindUniqueOrThrowArgs>(args: SelectSubset<T, RaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Race that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceFindFirstArgs} args - Arguments to find a Race
     * @example
     * // Get one Race
     * const race = await prisma.race.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RaceFindFirstArgs>(args?: SelectSubset<T, RaceFindFirstArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Race that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceFindFirstOrThrowArgs} args - Arguments to find a Race
     * @example
     * // Get one Race
     * const race = await prisma.race.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RaceFindFirstOrThrowArgs>(args?: SelectSubset<T, RaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Races that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Races
     * const races = await prisma.race.findMany()
     * 
     * // Get first 10 Races
     * const races = await prisma.race.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const raceWithIdOnly = await prisma.race.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RaceFindManyArgs>(args?: SelectSubset<T, RaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Race.
     * @param {RaceCreateArgs} args - Arguments to create a Race.
     * @example
     * // Create one Race
     * const Race = await prisma.race.create({
     *   data: {
     *     // ... data to create a Race
     *   }
     * })
     * 
     */
    create<T extends RaceCreateArgs>(args: SelectSubset<T, RaceCreateArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Races.
     * @param {RaceCreateManyArgs} args - Arguments to create many Races.
     * @example
     * // Create many Races
     * const race = await prisma.race.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RaceCreateManyArgs>(args?: SelectSubset<T, RaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Races and returns the data saved in the database.
     * @param {RaceCreateManyAndReturnArgs} args - Arguments to create many Races.
     * @example
     * // Create many Races
     * const race = await prisma.race.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Races and only return the `id`
     * const raceWithIdOnly = await prisma.race.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RaceCreateManyAndReturnArgs>(args?: SelectSubset<T, RaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Race.
     * @param {RaceDeleteArgs} args - Arguments to delete one Race.
     * @example
     * // Delete one Race
     * const Race = await prisma.race.delete({
     *   where: {
     *     // ... filter to delete one Race
     *   }
     * })
     * 
     */
    delete<T extends RaceDeleteArgs>(args: SelectSubset<T, RaceDeleteArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Race.
     * @param {RaceUpdateArgs} args - Arguments to update one Race.
     * @example
     * // Update one Race
     * const race = await prisma.race.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RaceUpdateArgs>(args: SelectSubset<T, RaceUpdateArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Races.
     * @param {RaceDeleteManyArgs} args - Arguments to filter Races to delete.
     * @example
     * // Delete a few Races
     * const { count } = await prisma.race.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RaceDeleteManyArgs>(args?: SelectSubset<T, RaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Races.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Races
     * const race = await prisma.race.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RaceUpdateManyArgs>(args: SelectSubset<T, RaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Race.
     * @param {RaceUpsertArgs} args - Arguments to update or create a Race.
     * @example
     * // Update or create a Race
     * const race = await prisma.race.upsert({
     *   create: {
     *     // ... data to create a Race
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Race we want to update
     *   }
     * })
     */
    upsert<T extends RaceUpsertArgs>(args: SelectSubset<T, RaceUpsertArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Races.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceCountArgs} args - Arguments to filter Races to count.
     * @example
     * // Count the number of Races
     * const count = await prisma.race.count({
     *   where: {
     *     // ... the filter for the Races we want to count
     *   }
     * })
    **/
    count<T extends RaceCountArgs>(
      args?: Subset<T, RaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Race.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RaceAggregateArgs>(args: Subset<T, RaceAggregateArgs>): Prisma.PrismaPromise<GetRaceAggregateType<T>>

    /**
     * Group by Race.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RaceGroupByArgs['orderBy'] }
        : { orderBy?: RaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Race model
   */
  readonly fields: RaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Race.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Race model
   */
  interface RaceFieldRefs {
    readonly id: FieldRef<"Race", 'Int'>
    readonly race: FieldRef<"Race", 'String'>
    readonly str: FieldRef<"Race", 'String'>
    readonly dex: FieldRef<"Race", 'String'>
    readonly con: FieldRef<"Race", 'String'>
    readonly int: FieldRef<"Race", 'String'>
    readonly wis: FieldRef<"Race", 'String'>
    readonly cha: FieldRef<"Race", 'String'>
    readonly special: FieldRef<"Race", 'String'>
    readonly source: FieldRef<"Race", 'String'>
    readonly notes: FieldRef<"Race", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Race findUnique
   */
  export type RaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter, which Race to fetch.
     */
    where: RaceWhereUniqueInput
  }

  /**
   * Race findUniqueOrThrow
   */
  export type RaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter, which Race to fetch.
     */
    where: RaceWhereUniqueInput
  }

  /**
   * Race findFirst
   */
  export type RaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter, which Race to fetch.
     */
    where?: RaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Races to fetch.
     */
    orderBy?: RaceOrderByWithRelationInput | RaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Races.
     */
    cursor?: RaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Races from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Races.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Races.
     */
    distinct?: RaceScalarFieldEnum | RaceScalarFieldEnum[]
  }

  /**
   * Race findFirstOrThrow
   */
  export type RaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter, which Race to fetch.
     */
    where?: RaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Races to fetch.
     */
    orderBy?: RaceOrderByWithRelationInput | RaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Races.
     */
    cursor?: RaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Races from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Races.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Races.
     */
    distinct?: RaceScalarFieldEnum | RaceScalarFieldEnum[]
  }

  /**
   * Race findMany
   */
  export type RaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter, which Races to fetch.
     */
    where?: RaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Races to fetch.
     */
    orderBy?: RaceOrderByWithRelationInput | RaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Races.
     */
    cursor?: RaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Races from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Races.
     */
    skip?: number
    distinct?: RaceScalarFieldEnum | RaceScalarFieldEnum[]
  }

  /**
   * Race create
   */
  export type RaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * The data needed to create a Race.
     */
    data: XOR<RaceCreateInput, RaceUncheckedCreateInput>
  }

  /**
   * Race createMany
   */
  export type RaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Races.
     */
    data: RaceCreateManyInput | RaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Race createManyAndReturn
   */
  export type RaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * The data used to create many Races.
     */
    data: RaceCreateManyInput | RaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Race update
   */
  export type RaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * The data needed to update a Race.
     */
    data: XOR<RaceUpdateInput, RaceUncheckedUpdateInput>
    /**
     * Choose, which Race to update.
     */
    where: RaceWhereUniqueInput
  }

  /**
   * Race updateMany
   */
  export type RaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Races.
     */
    data: XOR<RaceUpdateManyMutationInput, RaceUncheckedUpdateManyInput>
    /**
     * Filter which Races to update
     */
    where?: RaceWhereInput
  }

  /**
   * Race upsert
   */
  export type RaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * The filter to search for the Race to update in case it exists.
     */
    where: RaceWhereUniqueInput
    /**
     * In case the Race found by the `where` argument doesn't exist, create a new Race with this data.
     */
    create: XOR<RaceCreateInput, RaceUncheckedCreateInput>
    /**
     * In case the Race was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RaceUpdateInput, RaceUncheckedUpdateInput>
  }

  /**
   * Race delete
   */
  export type RaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter which Race to delete.
     */
    where: RaceWhereUniqueInput
  }

  /**
   * Race deleteMany
   */
  export type RaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Races to delete
     */
    where?: RaceWhereInput
  }

  /**
   * Race without action
   */
  export type RaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
  }


  /**
   * Model Spell
   */

  export type AggregateSpell = {
    _count: SpellCountAggregateOutputType | null
    _avg: SpellAvgAggregateOutputType | null
    _sum: SpellSumAggregateOutputType | null
    _min: SpellMinAggregateOutputType | null
    _max: SpellMaxAggregateOutputType | null
  }

  export type SpellAvgAggregateOutputType = {
    id: number | null
  }

  export type SpellSumAggregateOutputType = {
    id: number | null
  }

  export type SpellMinAggregateOutputType = {
    id: number | null
    name: string | null
    level: string | null
    school: string | null
    castingTime: string | null
    duration: string | null
    range: string | null
    area: string | null
    attack: string | null
    save: string | null
    damageEffect: string | null
    ritual: string | null
    concentration: string | null
    verbal: string | null
    somatic: string | null
    material: string | null
    materialDetails: string | null
    source: string | null
    details: string | null
    link: string | null
  }

  export type SpellMaxAggregateOutputType = {
    id: number | null
    name: string | null
    level: string | null
    school: string | null
    castingTime: string | null
    duration: string | null
    range: string | null
    area: string | null
    attack: string | null
    save: string | null
    damageEffect: string | null
    ritual: string | null
    concentration: string | null
    verbal: string | null
    somatic: string | null
    material: string | null
    materialDetails: string | null
    source: string | null
    details: string | null
    link: string | null
  }

  export type SpellCountAggregateOutputType = {
    id: number
    name: number
    level: number
    school: number
    castingTime: number
    duration: number
    range: number
    area: number
    attack: number
    save: number
    damageEffect: number
    ritual: number
    concentration: number
    verbal: number
    somatic: number
    material: number
    materialDetails: number
    source: number
    details: number
    link: number
    _all: number
  }


  export type SpellAvgAggregateInputType = {
    id?: true
  }

  export type SpellSumAggregateInputType = {
    id?: true
  }

  export type SpellMinAggregateInputType = {
    id?: true
    name?: true
    level?: true
    school?: true
    castingTime?: true
    duration?: true
    range?: true
    area?: true
    attack?: true
    save?: true
    damageEffect?: true
    ritual?: true
    concentration?: true
    verbal?: true
    somatic?: true
    material?: true
    materialDetails?: true
    source?: true
    details?: true
    link?: true
  }

  export type SpellMaxAggregateInputType = {
    id?: true
    name?: true
    level?: true
    school?: true
    castingTime?: true
    duration?: true
    range?: true
    area?: true
    attack?: true
    save?: true
    damageEffect?: true
    ritual?: true
    concentration?: true
    verbal?: true
    somatic?: true
    material?: true
    materialDetails?: true
    source?: true
    details?: true
    link?: true
  }

  export type SpellCountAggregateInputType = {
    id?: true
    name?: true
    level?: true
    school?: true
    castingTime?: true
    duration?: true
    range?: true
    area?: true
    attack?: true
    save?: true
    damageEffect?: true
    ritual?: true
    concentration?: true
    verbal?: true
    somatic?: true
    material?: true
    materialDetails?: true
    source?: true
    details?: true
    link?: true
    _all?: true
  }

  export type SpellAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spell to aggregate.
     */
    where?: SpellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spells to fetch.
     */
    orderBy?: SpellOrderByWithRelationInput | SpellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spells.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Spells
    **/
    _count?: true | SpellCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpellAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpellSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpellMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpellMaxAggregateInputType
  }

  export type GetSpellAggregateType<T extends SpellAggregateArgs> = {
        [P in keyof T & keyof AggregateSpell]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpell[P]>
      : GetScalarType<T[P], AggregateSpell[P]>
  }




  export type SpellGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpellWhereInput
    orderBy?: SpellOrderByWithAggregationInput | SpellOrderByWithAggregationInput[]
    by: SpellScalarFieldEnum[] | SpellScalarFieldEnum
    having?: SpellScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpellCountAggregateInputType | true
    _avg?: SpellAvgAggregateInputType
    _sum?: SpellSumAggregateInputType
    _min?: SpellMinAggregateInputType
    _max?: SpellMaxAggregateInputType
  }

  export type SpellGroupByOutputType = {
    id: number
    name: string
    level: string
    school: string
    castingTime: string
    duration: string
    range: string
    area: string | null
    attack: string | null
    save: string | null
    damageEffect: string
    ritual: string | null
    concentration: string | null
    verbal: string | null
    somatic: string | null
    material: string | null
    materialDetails: string | null
    source: string
    details: string
    link: string
    _count: SpellCountAggregateOutputType | null
    _avg: SpellAvgAggregateOutputType | null
    _sum: SpellSumAggregateOutputType | null
    _min: SpellMinAggregateOutputType | null
    _max: SpellMaxAggregateOutputType | null
  }

  type GetSpellGroupByPayload<T extends SpellGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpellGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpellGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpellGroupByOutputType[P]>
            : GetScalarType<T[P], SpellGroupByOutputType[P]>
        }
      >
    >


  export type SpellSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    school?: boolean
    castingTime?: boolean
    duration?: boolean
    range?: boolean
    area?: boolean
    attack?: boolean
    save?: boolean
    damageEffect?: boolean
    ritual?: boolean
    concentration?: boolean
    verbal?: boolean
    somatic?: boolean
    material?: boolean
    materialDetails?: boolean
    source?: boolean
    details?: boolean
    link?: boolean
  }, ExtArgs["result"]["spell"]>

  export type SpellSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    school?: boolean
    castingTime?: boolean
    duration?: boolean
    range?: boolean
    area?: boolean
    attack?: boolean
    save?: boolean
    damageEffect?: boolean
    ritual?: boolean
    concentration?: boolean
    verbal?: boolean
    somatic?: boolean
    material?: boolean
    materialDetails?: boolean
    source?: boolean
    details?: boolean
    link?: boolean
  }, ExtArgs["result"]["spell"]>


  export type SpellSelectScalar = {
    id?: boolean
    name?: boolean
    level?: boolean
    school?: boolean
    castingTime?: boolean
    duration?: boolean
    range?: boolean
    area?: boolean
    attack?: boolean
    save?: boolean
    damageEffect?: boolean
    ritual?: boolean
    concentration?: boolean
    verbal?: boolean
    somatic?: boolean
    material?: boolean
    materialDetails?: boolean
    source?: boolean
    details?: boolean
    link?: boolean
  }

  export type SpellOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "level" | "school" | "castingTime" | "duration" | "range" | "area" | "attack" | "save" | "damageEffect" | "ritual" | "concentration" | "verbal" | "somatic" | "material" | "materialDetails" | "source" | "details" | "link", ExtArgs["result"]["spell"]>

  export type $SpellPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Spell"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      level: string
      school: string
      castingTime: string
      duration: string
      range: string
      area: string | null
      attack: string | null
      save: string | null
      damageEffect: string
      ritual: string | null
      concentration: string | null
      verbal: string | null
      somatic: string | null
      material: string | null
      materialDetails: string | null
      source: string
      details: string
      link: string
    }, ExtArgs["result"]["spell"]>
    composites: {}
  }

  type SpellGetPayload<S extends boolean | null | undefined | SpellDefaultArgs> = $Result.GetResult<Prisma.$SpellPayload, S>

  type SpellCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpellFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpellCountAggregateInputType | true
    }

  export interface SpellDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Spell'], meta: { name: 'Spell' } }
    /**
     * Find zero or one Spell that matches the filter.
     * @param {SpellFindUniqueArgs} args - Arguments to find a Spell
     * @example
     * // Get one Spell
     * const spell = await prisma.spell.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpellFindUniqueArgs>(args: SelectSubset<T, SpellFindUniqueArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Spell that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpellFindUniqueOrThrowArgs} args - Arguments to find a Spell
     * @example
     * // Get one Spell
     * const spell = await prisma.spell.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpellFindUniqueOrThrowArgs>(args: SelectSubset<T, SpellFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spell that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellFindFirstArgs} args - Arguments to find a Spell
     * @example
     * // Get one Spell
     * const spell = await prisma.spell.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpellFindFirstArgs>(args?: SelectSubset<T, SpellFindFirstArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spell that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellFindFirstOrThrowArgs} args - Arguments to find a Spell
     * @example
     * // Get one Spell
     * const spell = await prisma.spell.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpellFindFirstOrThrowArgs>(args?: SelectSubset<T, SpellFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spells that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spells
     * const spells = await prisma.spell.findMany()
     * 
     * // Get first 10 Spells
     * const spells = await prisma.spell.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spellWithIdOnly = await prisma.spell.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpellFindManyArgs>(args?: SelectSubset<T, SpellFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Spell.
     * @param {SpellCreateArgs} args - Arguments to create a Spell.
     * @example
     * // Create one Spell
     * const Spell = await prisma.spell.create({
     *   data: {
     *     // ... data to create a Spell
     *   }
     * })
     * 
     */
    create<T extends SpellCreateArgs>(args: SelectSubset<T, SpellCreateArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spells.
     * @param {SpellCreateManyArgs} args - Arguments to create many Spells.
     * @example
     * // Create many Spells
     * const spell = await prisma.spell.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpellCreateManyArgs>(args?: SelectSubset<T, SpellCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Spells and returns the data saved in the database.
     * @param {SpellCreateManyAndReturnArgs} args - Arguments to create many Spells.
     * @example
     * // Create many Spells
     * const spell = await prisma.spell.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Spells and only return the `id`
     * const spellWithIdOnly = await prisma.spell.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpellCreateManyAndReturnArgs>(args?: SelectSubset<T, SpellCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Spell.
     * @param {SpellDeleteArgs} args - Arguments to delete one Spell.
     * @example
     * // Delete one Spell
     * const Spell = await prisma.spell.delete({
     *   where: {
     *     // ... filter to delete one Spell
     *   }
     * })
     * 
     */
    delete<T extends SpellDeleteArgs>(args: SelectSubset<T, SpellDeleteArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Spell.
     * @param {SpellUpdateArgs} args - Arguments to update one Spell.
     * @example
     * // Update one Spell
     * const spell = await prisma.spell.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpellUpdateArgs>(args: SelectSubset<T, SpellUpdateArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spells.
     * @param {SpellDeleteManyArgs} args - Arguments to filter Spells to delete.
     * @example
     * // Delete a few Spells
     * const { count } = await prisma.spell.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpellDeleteManyArgs>(args?: SelectSubset<T, SpellDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spells.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spells
     * const spell = await prisma.spell.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpellUpdateManyArgs>(args: SelectSubset<T, SpellUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Spell.
     * @param {SpellUpsertArgs} args - Arguments to update or create a Spell.
     * @example
     * // Update or create a Spell
     * const spell = await prisma.spell.upsert({
     *   create: {
     *     // ... data to create a Spell
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spell we want to update
     *   }
     * })
     */
    upsert<T extends SpellUpsertArgs>(args: SelectSubset<T, SpellUpsertArgs<ExtArgs>>): Prisma__SpellClient<$Result.GetResult<Prisma.$SpellPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spells.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellCountArgs} args - Arguments to filter Spells to count.
     * @example
     * // Count the number of Spells
     * const count = await prisma.spell.count({
     *   where: {
     *     // ... the filter for the Spells we want to count
     *   }
     * })
    **/
    count<T extends SpellCountArgs>(
      args?: Subset<T, SpellCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpellCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spell.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpellAggregateArgs>(args: Subset<T, SpellAggregateArgs>): Prisma.PrismaPromise<GetSpellAggregateType<T>>

    /**
     * Group by Spell.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpellGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpellGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpellGroupByArgs['orderBy'] }
        : { orderBy?: SpellGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpellGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpellGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Spell model
   */
  readonly fields: SpellFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Spell.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpellClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Spell model
   */
  interface SpellFieldRefs {
    readonly id: FieldRef<"Spell", 'Int'>
    readonly name: FieldRef<"Spell", 'String'>
    readonly level: FieldRef<"Spell", 'String'>
    readonly school: FieldRef<"Spell", 'String'>
    readonly castingTime: FieldRef<"Spell", 'String'>
    readonly duration: FieldRef<"Spell", 'String'>
    readonly range: FieldRef<"Spell", 'String'>
    readonly area: FieldRef<"Spell", 'String'>
    readonly attack: FieldRef<"Spell", 'String'>
    readonly save: FieldRef<"Spell", 'String'>
    readonly damageEffect: FieldRef<"Spell", 'String'>
    readonly ritual: FieldRef<"Spell", 'String'>
    readonly concentration: FieldRef<"Spell", 'String'>
    readonly verbal: FieldRef<"Spell", 'String'>
    readonly somatic: FieldRef<"Spell", 'String'>
    readonly material: FieldRef<"Spell", 'String'>
    readonly materialDetails: FieldRef<"Spell", 'String'>
    readonly source: FieldRef<"Spell", 'String'>
    readonly details: FieldRef<"Spell", 'String'>
    readonly link: FieldRef<"Spell", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Spell findUnique
   */
  export type SpellFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
    /**
     * Filter, which Spell to fetch.
     */
    where: SpellWhereUniqueInput
  }

  /**
   * Spell findUniqueOrThrow
   */
  export type SpellFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
    /**
     * Filter, which Spell to fetch.
     */
    where: SpellWhereUniqueInput
  }

  /**
   * Spell findFirst
   */
  export type SpellFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
    /**
     * Filter, which Spell to fetch.
     */
    where?: SpellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spells to fetch.
     */
    orderBy?: SpellOrderByWithRelationInput | SpellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spells.
     */
    cursor?: SpellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spells.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spells.
     */
    distinct?: SpellScalarFieldEnum | SpellScalarFieldEnum[]
  }

  /**
   * Spell findFirstOrThrow
   */
  export type SpellFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
    /**
     * Filter, which Spell to fetch.
     */
    where?: SpellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spells to fetch.
     */
    orderBy?: SpellOrderByWithRelationInput | SpellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spells.
     */
    cursor?: SpellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spells.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spells.
     */
    distinct?: SpellScalarFieldEnum | SpellScalarFieldEnum[]
  }

  /**
   * Spell findMany
   */
  export type SpellFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
    /**
     * Filter, which Spells to fetch.
     */
    where?: SpellWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spells to fetch.
     */
    orderBy?: SpellOrderByWithRelationInput | SpellOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Spells.
     */
    cursor?: SpellWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spells from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spells.
     */
    skip?: number
    distinct?: SpellScalarFieldEnum | SpellScalarFieldEnum[]
  }

  /**
   * Spell create
   */
  export type SpellCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
    /**
     * The data needed to create a Spell.
     */
    data: XOR<SpellCreateInput, SpellUncheckedCreateInput>
  }

  /**
   * Spell createMany
   */
  export type SpellCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Spells.
     */
    data: SpellCreateManyInput | SpellCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Spell createManyAndReturn
   */
  export type SpellCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
    /**
     * The data used to create many Spells.
     */
    data: SpellCreateManyInput | SpellCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Spell update
   */
  export type SpellUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
    /**
     * The data needed to update a Spell.
     */
    data: XOR<SpellUpdateInput, SpellUncheckedUpdateInput>
    /**
     * Choose, which Spell to update.
     */
    where: SpellWhereUniqueInput
  }

  /**
   * Spell updateMany
   */
  export type SpellUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Spells.
     */
    data: XOR<SpellUpdateManyMutationInput, SpellUncheckedUpdateManyInput>
    /**
     * Filter which Spells to update
     */
    where?: SpellWhereInput
  }

  /**
   * Spell upsert
   */
  export type SpellUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
    /**
     * The filter to search for the Spell to update in case it exists.
     */
    where: SpellWhereUniqueInput
    /**
     * In case the Spell found by the `where` argument doesn't exist, create a new Spell with this data.
     */
    create: XOR<SpellCreateInput, SpellUncheckedCreateInput>
    /**
     * In case the Spell was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpellUpdateInput, SpellUncheckedUpdateInput>
  }

  /**
   * Spell delete
   */
  export type SpellDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
    /**
     * Filter which Spell to delete.
     */
    where: SpellWhereUniqueInput
  }

  /**
   * Spell deleteMany
   */
  export type SpellDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spells to delete
     */
    where?: SpellWhereInput
  }

  /**
   * Spell without action
   */
  export type SpellDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spell
     */
    select?: SpellSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spell
     */
    omit?: SpellOmit<ExtArgs> | null
  }


  /**
   * Model Class
   */

  export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  export type ClassAvgAggregateOutputType = {
    id: number | null
  }

  export type ClassSumAggregateOutputType = {
    id: number | null
  }

  export type ClassMinAggregateOutputType = {
    id: number | null
    class: string | null
    subclass: string | null
    source: string | null
    notes: string | null
    features: string | null
    level: string | null
    description: string | null
  }

  export type ClassMaxAggregateOutputType = {
    id: number | null
    class: string | null
    subclass: string | null
    source: string | null
    notes: string | null
    features: string | null
    level: string | null
    description: string | null
  }

  export type ClassCountAggregateOutputType = {
    id: number
    class: number
    subclass: number
    source: number
    notes: number
    features: number
    level: number
    description: number
    _all: number
  }


  export type ClassAvgAggregateInputType = {
    id?: true
  }

  export type ClassSumAggregateInputType = {
    id?: true
  }

  export type ClassMinAggregateInputType = {
    id?: true
    class?: true
    subclass?: true
    source?: true
    notes?: true
    features?: true
    level?: true
    description?: true
  }

  export type ClassMaxAggregateInputType = {
    id?: true
    class?: true
    subclass?: true
    source?: true
    notes?: true
    features?: true
    level?: true
    description?: true
  }

  export type ClassCountAggregateInputType = {
    id?: true
    class?: true
    subclass?: true
    source?: true
    notes?: true
    features?: true
    level?: true
    description?: true
    _all?: true
  }

  export type ClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class to aggregate.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classes
    **/
    _count?: true | ClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassMaxAggregateInputType
  }

  export type GetClassAggregateType<T extends ClassAggregateArgs> = {
        [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass[P]>
      : GetScalarType<T[P], AggregateClass[P]>
  }




  export type ClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithAggregationInput | ClassOrderByWithAggregationInput[]
    by: ClassScalarFieldEnum[] | ClassScalarFieldEnum
    having?: ClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassCountAggregateInputType | true
    _avg?: ClassAvgAggregateInputType
    _sum?: ClassSumAggregateInputType
    _min?: ClassMinAggregateInputType
    _max?: ClassMaxAggregateInputType
  }

  export type ClassGroupByOutputType = {
    id: number
    class: string
    subclass: string
    source: string | null
    notes: string | null
    features: string | null
    level: string | null
    description: string | null
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassGroupByOutputType[P]>
            : GetScalarType<T[P], ClassGroupByOutputType[P]>
        }
      >
    >


  export type ClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    class?: boolean
    subclass?: boolean
    source?: boolean
    notes?: boolean
    features?: boolean
    level?: boolean
    description?: boolean
  }, ExtArgs["result"]["class"]>

  export type ClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    class?: boolean
    subclass?: boolean
    source?: boolean
    notes?: boolean
    features?: boolean
    level?: boolean
    description?: boolean
  }, ExtArgs["result"]["class"]>


  export type ClassSelectScalar = {
    id?: boolean
    class?: boolean
    subclass?: boolean
    source?: boolean
    notes?: boolean
    features?: boolean
    level?: boolean
    description?: boolean
  }

  export type ClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "class" | "subclass" | "source" | "notes" | "features" | "level" | "description", ExtArgs["result"]["class"]>

  export type $ClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      class: string
      subclass: string
      source: string | null
      notes: string | null
      features: string | null
      level: string | null
      description: string | null
    }, ExtArgs["result"]["class"]>
    composites: {}
  }

  type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = $Result.GetResult<Prisma.$ClassPayload, S>

  type ClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassCountAggregateInputType | true
    }

  export interface ClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class'], meta: { name: 'Class' } }
    /**
     * Find zero or one Class that matches the filter.
     * @param {ClassFindUniqueArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassFindUniqueArgs>(args: SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Class that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassFindUniqueOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassFindFirstArgs>(args?: SelectSubset<T, ClassFindFirstArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.class.findMany()
     * 
     * // Get first 10 Classes
     * const classes = await prisma.class.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classWithIdOnly = await prisma.class.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassFindManyArgs>(args?: SelectSubset<T, ClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Class.
     * @param {ClassCreateArgs} args - Arguments to create a Class.
     * @example
     * // Create one Class
     * const Class = await prisma.class.create({
     *   data: {
     *     // ... data to create a Class
     *   }
     * })
     * 
     */
    create<T extends ClassCreateArgs>(args: SelectSubset<T, ClassCreateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Classes.
     * @param {ClassCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassCreateManyArgs>(args?: SelectSubset<T, ClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classes and returns the data saved in the database.
     * @param {ClassCreateManyAndReturnArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Class.
     * @param {ClassDeleteArgs} args - Arguments to delete one Class.
     * @example
     * // Delete one Class
     * const Class = await prisma.class.delete({
     *   where: {
     *     // ... filter to delete one Class
     *   }
     * })
     * 
     */
    delete<T extends ClassDeleteArgs>(args: SelectSubset<T, ClassDeleteArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Class.
     * @param {ClassUpdateArgs} args - Arguments to update one Class.
     * @example
     * // Update one Class
     * const class = await prisma.class.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassUpdateArgs>(args: SelectSubset<T, ClassUpdateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Classes.
     * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.class.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassDeleteManyArgs>(args?: SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassUpdateManyArgs>(args: SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Class.
     * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
     * @example
     * // Update or create a Class
     * const class = await prisma.class.upsert({
     *   create: {
     *     // ... data to create a Class
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class we want to update
     *   }
     * })
     */
    upsert<T extends ClassUpsertArgs>(args: SelectSubset<T, ClassUpsertArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.class.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
    **/
    count<T extends ClassCountArgs>(
      args?: Subset<T, ClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassAggregateArgs>(args: Subset<T, ClassAggregateArgs>): Prisma.PrismaPromise<GetClassAggregateType<T>>

    /**
     * Group by Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class model
   */
  readonly fields: ClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class model
   */
  interface ClassFieldRefs {
    readonly id: FieldRef<"Class", 'Int'>
    readonly class: FieldRef<"Class", 'String'>
    readonly subclass: FieldRef<"Class", 'String'>
    readonly source: FieldRef<"Class", 'String'>
    readonly notes: FieldRef<"Class", 'String'>
    readonly features: FieldRef<"Class", 'String'>
    readonly level: FieldRef<"Class", 'String'>
    readonly description: FieldRef<"Class", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Class findUnique
   */
  export type ClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findUniqueOrThrow
   */
  export type ClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findFirst
   */
  export type ClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findFirstOrThrow
   */
  export type ClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findMany
   */
  export type ClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Filter, which Classes to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class create
   */
  export type ClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data needed to create a Class.
     */
    data: XOR<ClassCreateInput, ClassUncheckedCreateInput>
  }

  /**
   * Class createMany
   */
  export type ClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class createManyAndReturn
   */
  export type ClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class update
   */
  export type ClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data needed to update a Class.
     */
    data: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
    /**
     * Choose, which Class to update.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class updateMany
   */
  export type ClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
  }

  /**
   * Class upsert
   */
  export type ClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The filter to search for the Class to update in case it exists.
     */
    where: ClassWhereUniqueInput
    /**
     * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
     */
    create: XOR<ClassCreateInput, ClassUncheckedCreateInput>
    /**
     * In case the Class was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
  }

  /**
   * Class delete
   */
  export type ClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Filter which Class to delete.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class deleteMany
   */
  export type ClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classes to delete
     */
    where?: ClassWhereInput
  }

  /**
   * Class without action
   */
  export type ClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
  }


  /**
   * Model MagicItem
   */

  export type AggregateMagicItem = {
    _count: MagicItemCountAggregateOutputType | null
    _avg: MagicItemAvgAggregateOutputType | null
    _sum: MagicItemSumAggregateOutputType | null
    _min: MagicItemMinAggregateOutputType | null
    _max: MagicItemMaxAggregateOutputType | null
  }

  export type MagicItemAvgAggregateOutputType = {
    id: number | null
    costGp: number | null
    armorCost: number | null
    acBonus: number | null
    saveBonus: number | null
    setScoreModifier: number | null
    weaponBonus: number | null
    spellLevel: number | null
    chargesPerDay: number | null
    chargesPerItem: number | null
    spellsShareCharges: number | null
    consumableDamageAvg: number | null
    semiPermanentDamageAvg: number | null
    durationMinutes: number | null
    permanentDamageAvg: number | null
    restoreHpAvg: number | null
    miscCosts: number | null
    secondSpellLevel: number | null
    secondChargesPerDay: number | null
    thirdSpellLevel: number | null
    thirdChargesPerDay: number | null
    matCost: number | null
    acCost: number | null
    saveCost: number | null
    setScoreCost: number | null
    bonusScoreCost: number | null
    weaponCost: number | null
    consumSpellCost: number | null
    permChargesCost: number | null
    chargesDestroyed: number | null
    spellShareChargesCost: number | null
    conditionCost: number | null
    consDMGCost: number | null
    smPrDMGCost: number | null
    perDMGCost: number | null
    avgHPCost: number | null
    miscCost: number | null
    secondConsumSpellCost: number | null
    secondPermChargesCost: number | null
    thirdConsumSpellCost: number | null
    thirdPermChargesCost: number | null
  }

  export type MagicItemSumAggregateOutputType = {
    id: number | null
    costGp: number | null
    armorCost: number | null
    acBonus: number | null
    saveBonus: number | null
    setScoreModifier: number | null
    weaponBonus: number | null
    spellLevel: number | null
    chargesPerDay: number | null
    chargesPerItem: number | null
    spellsShareCharges: number | null
    consumableDamageAvg: number | null
    semiPermanentDamageAvg: number | null
    durationMinutes: number | null
    permanentDamageAvg: number | null
    restoreHpAvg: number | null
    miscCosts: number | null
    secondSpellLevel: number | null
    secondChargesPerDay: number | null
    thirdSpellLevel: number | null
    thirdChargesPerDay: number | null
    matCost: number | null
    acCost: number | null
    saveCost: number | null
    setScoreCost: number | null
    bonusScoreCost: number | null
    weaponCost: number | null
    consumSpellCost: number | null
    permChargesCost: number | null
    chargesDestroyed: number | null
    spellShareChargesCost: number | null
    conditionCost: number | null
    consDMGCost: number | null
    smPrDMGCost: number | null
    perDMGCost: number | null
    avgHPCost: number | null
    miscCost: number | null
    secondConsumSpellCost: number | null
    secondPermChargesCost: number | null
    thirdConsumSpellCost: number | null
    thirdPermChargesCost: number | null
  }

  export type MagicItemMinAggregateOutputType = {
    id: number | null
    name: string | null
    rarity: string | null
    attunement: string | null
    costGp: number | null
    note: string | null
    armorCost: number | null
    rareMaterial: string | null
    acBonus: number | null
    saveBonus: number | null
    setScoreModifier: number | null
    plusTwoBonusToScore: string | null
    weaponBonus: number | null
    spellLevel: number | null
    unlimitedCharges: string | null
    chargesPerDay: number | null
    chargesPerItem: number | null
    spellsShareCharges: number | null
    condition: string | null
    consumableDamageAvg: number | null
    consumableSave: string | null
    semiPermanentDamageAvg: number | null
    semiPermSave: string | null
    durationMinutes: number | null
    permanentDamageAvg: number | null
    permSave: string | null
    specificSituations: string | null
    restoreHpAvg: number | null
    miscCosts: number | null
    secondSpellLevel: number | null
    secondUnlimitedCharges: string | null
    secondChargesPerDay: number | null
    thirdSpellLevel: number | null
    thirdUnlimitedCharges: string | null
    thirdChargesPerDay: number | null
    matCost: number | null
    acCost: number | null
    saveCost: number | null
    setScoreCost: number | null
    bonusScoreCost: number | null
    weaponCost: number | null
    consumSpellCost: number | null
    permChargesCost: number | null
    chargesDestroyed: number | null
    spellShareChargesCost: number | null
    conditionCost: number | null
    consDMGCost: number | null
    smPrDMGCost: number | null
    perDMGCost: number | null
    avgHPCost: number | null
    miscCost: number | null
    secondConsumSpellCost: number | null
    secondPermChargesCost: number | null
    thirdConsumSpellCost: number | null
    thirdPermChargesCost: number | null
  }

  export type MagicItemMaxAggregateOutputType = {
    id: number | null
    name: string | null
    rarity: string | null
    attunement: string | null
    costGp: number | null
    note: string | null
    armorCost: number | null
    rareMaterial: string | null
    acBonus: number | null
    saveBonus: number | null
    setScoreModifier: number | null
    plusTwoBonusToScore: string | null
    weaponBonus: number | null
    spellLevel: number | null
    unlimitedCharges: string | null
    chargesPerDay: number | null
    chargesPerItem: number | null
    spellsShareCharges: number | null
    condition: string | null
    consumableDamageAvg: number | null
    consumableSave: string | null
    semiPermanentDamageAvg: number | null
    semiPermSave: string | null
    durationMinutes: number | null
    permanentDamageAvg: number | null
    permSave: string | null
    specificSituations: string | null
    restoreHpAvg: number | null
    miscCosts: number | null
    secondSpellLevel: number | null
    secondUnlimitedCharges: string | null
    secondChargesPerDay: number | null
    thirdSpellLevel: number | null
    thirdUnlimitedCharges: string | null
    thirdChargesPerDay: number | null
    matCost: number | null
    acCost: number | null
    saveCost: number | null
    setScoreCost: number | null
    bonusScoreCost: number | null
    weaponCost: number | null
    consumSpellCost: number | null
    permChargesCost: number | null
    chargesDestroyed: number | null
    spellShareChargesCost: number | null
    conditionCost: number | null
    consDMGCost: number | null
    smPrDMGCost: number | null
    perDMGCost: number | null
    avgHPCost: number | null
    miscCost: number | null
    secondConsumSpellCost: number | null
    secondPermChargesCost: number | null
    thirdConsumSpellCost: number | null
    thirdPermChargesCost: number | null
  }

  export type MagicItemCountAggregateOutputType = {
    id: number
    name: number
    rarity: number
    attunement: number
    costGp: number
    note: number
    armorCost: number
    rareMaterial: number
    acBonus: number
    saveBonus: number
    setScoreModifier: number
    plusTwoBonusToScore: number
    weaponBonus: number
    spellLevel: number
    unlimitedCharges: number
    chargesPerDay: number
    chargesPerItem: number
    spellsShareCharges: number
    condition: number
    consumableDamageAvg: number
    consumableSave: number
    semiPermanentDamageAvg: number
    semiPermSave: number
    durationMinutes: number
    permanentDamageAvg: number
    permSave: number
    specificSituations: number
    restoreHpAvg: number
    miscCosts: number
    secondSpellLevel: number
    secondUnlimitedCharges: number
    secondChargesPerDay: number
    thirdSpellLevel: number
    thirdUnlimitedCharges: number
    thirdChargesPerDay: number
    matCost: number
    acCost: number
    saveCost: number
    setScoreCost: number
    bonusScoreCost: number
    weaponCost: number
    consumSpellCost: number
    permChargesCost: number
    chargesDestroyed: number
    spellShareChargesCost: number
    conditionCost: number
    consDMGCost: number
    smPrDMGCost: number
    perDMGCost: number
    avgHPCost: number
    miscCost: number
    secondConsumSpellCost: number
    secondPermChargesCost: number
    thirdConsumSpellCost: number
    thirdPermChargesCost: number
    _all: number
  }


  export type MagicItemAvgAggregateInputType = {
    id?: true
    costGp?: true
    armorCost?: true
    acBonus?: true
    saveBonus?: true
    setScoreModifier?: true
    weaponBonus?: true
    spellLevel?: true
    chargesPerDay?: true
    chargesPerItem?: true
    spellsShareCharges?: true
    consumableDamageAvg?: true
    semiPermanentDamageAvg?: true
    durationMinutes?: true
    permanentDamageAvg?: true
    restoreHpAvg?: true
    miscCosts?: true
    secondSpellLevel?: true
    secondChargesPerDay?: true
    thirdSpellLevel?: true
    thirdChargesPerDay?: true
    matCost?: true
    acCost?: true
    saveCost?: true
    setScoreCost?: true
    bonusScoreCost?: true
    weaponCost?: true
    consumSpellCost?: true
    permChargesCost?: true
    chargesDestroyed?: true
    spellShareChargesCost?: true
    conditionCost?: true
    consDMGCost?: true
    smPrDMGCost?: true
    perDMGCost?: true
    avgHPCost?: true
    miscCost?: true
    secondConsumSpellCost?: true
    secondPermChargesCost?: true
    thirdConsumSpellCost?: true
    thirdPermChargesCost?: true
  }

  export type MagicItemSumAggregateInputType = {
    id?: true
    costGp?: true
    armorCost?: true
    acBonus?: true
    saveBonus?: true
    setScoreModifier?: true
    weaponBonus?: true
    spellLevel?: true
    chargesPerDay?: true
    chargesPerItem?: true
    spellsShareCharges?: true
    consumableDamageAvg?: true
    semiPermanentDamageAvg?: true
    durationMinutes?: true
    permanentDamageAvg?: true
    restoreHpAvg?: true
    miscCosts?: true
    secondSpellLevel?: true
    secondChargesPerDay?: true
    thirdSpellLevel?: true
    thirdChargesPerDay?: true
    matCost?: true
    acCost?: true
    saveCost?: true
    setScoreCost?: true
    bonusScoreCost?: true
    weaponCost?: true
    consumSpellCost?: true
    permChargesCost?: true
    chargesDestroyed?: true
    spellShareChargesCost?: true
    conditionCost?: true
    consDMGCost?: true
    smPrDMGCost?: true
    perDMGCost?: true
    avgHPCost?: true
    miscCost?: true
    secondConsumSpellCost?: true
    secondPermChargesCost?: true
    thirdConsumSpellCost?: true
    thirdPermChargesCost?: true
  }

  export type MagicItemMinAggregateInputType = {
    id?: true
    name?: true
    rarity?: true
    attunement?: true
    costGp?: true
    note?: true
    armorCost?: true
    rareMaterial?: true
    acBonus?: true
    saveBonus?: true
    setScoreModifier?: true
    plusTwoBonusToScore?: true
    weaponBonus?: true
    spellLevel?: true
    unlimitedCharges?: true
    chargesPerDay?: true
    chargesPerItem?: true
    spellsShareCharges?: true
    condition?: true
    consumableDamageAvg?: true
    consumableSave?: true
    semiPermanentDamageAvg?: true
    semiPermSave?: true
    durationMinutes?: true
    permanentDamageAvg?: true
    permSave?: true
    specificSituations?: true
    restoreHpAvg?: true
    miscCosts?: true
    secondSpellLevel?: true
    secondUnlimitedCharges?: true
    secondChargesPerDay?: true
    thirdSpellLevel?: true
    thirdUnlimitedCharges?: true
    thirdChargesPerDay?: true
    matCost?: true
    acCost?: true
    saveCost?: true
    setScoreCost?: true
    bonusScoreCost?: true
    weaponCost?: true
    consumSpellCost?: true
    permChargesCost?: true
    chargesDestroyed?: true
    spellShareChargesCost?: true
    conditionCost?: true
    consDMGCost?: true
    smPrDMGCost?: true
    perDMGCost?: true
    avgHPCost?: true
    miscCost?: true
    secondConsumSpellCost?: true
    secondPermChargesCost?: true
    thirdConsumSpellCost?: true
    thirdPermChargesCost?: true
  }

  export type MagicItemMaxAggregateInputType = {
    id?: true
    name?: true
    rarity?: true
    attunement?: true
    costGp?: true
    note?: true
    armorCost?: true
    rareMaterial?: true
    acBonus?: true
    saveBonus?: true
    setScoreModifier?: true
    plusTwoBonusToScore?: true
    weaponBonus?: true
    spellLevel?: true
    unlimitedCharges?: true
    chargesPerDay?: true
    chargesPerItem?: true
    spellsShareCharges?: true
    condition?: true
    consumableDamageAvg?: true
    consumableSave?: true
    semiPermanentDamageAvg?: true
    semiPermSave?: true
    durationMinutes?: true
    permanentDamageAvg?: true
    permSave?: true
    specificSituations?: true
    restoreHpAvg?: true
    miscCosts?: true
    secondSpellLevel?: true
    secondUnlimitedCharges?: true
    secondChargesPerDay?: true
    thirdSpellLevel?: true
    thirdUnlimitedCharges?: true
    thirdChargesPerDay?: true
    matCost?: true
    acCost?: true
    saveCost?: true
    setScoreCost?: true
    bonusScoreCost?: true
    weaponCost?: true
    consumSpellCost?: true
    permChargesCost?: true
    chargesDestroyed?: true
    spellShareChargesCost?: true
    conditionCost?: true
    consDMGCost?: true
    smPrDMGCost?: true
    perDMGCost?: true
    avgHPCost?: true
    miscCost?: true
    secondConsumSpellCost?: true
    secondPermChargesCost?: true
    thirdConsumSpellCost?: true
    thirdPermChargesCost?: true
  }

  export type MagicItemCountAggregateInputType = {
    id?: true
    name?: true
    rarity?: true
    attunement?: true
    costGp?: true
    note?: true
    armorCost?: true
    rareMaterial?: true
    acBonus?: true
    saveBonus?: true
    setScoreModifier?: true
    plusTwoBonusToScore?: true
    weaponBonus?: true
    spellLevel?: true
    unlimitedCharges?: true
    chargesPerDay?: true
    chargesPerItem?: true
    spellsShareCharges?: true
    condition?: true
    consumableDamageAvg?: true
    consumableSave?: true
    semiPermanentDamageAvg?: true
    semiPermSave?: true
    durationMinutes?: true
    permanentDamageAvg?: true
    permSave?: true
    specificSituations?: true
    restoreHpAvg?: true
    miscCosts?: true
    secondSpellLevel?: true
    secondUnlimitedCharges?: true
    secondChargesPerDay?: true
    thirdSpellLevel?: true
    thirdUnlimitedCharges?: true
    thirdChargesPerDay?: true
    matCost?: true
    acCost?: true
    saveCost?: true
    setScoreCost?: true
    bonusScoreCost?: true
    weaponCost?: true
    consumSpellCost?: true
    permChargesCost?: true
    chargesDestroyed?: true
    spellShareChargesCost?: true
    conditionCost?: true
    consDMGCost?: true
    smPrDMGCost?: true
    perDMGCost?: true
    avgHPCost?: true
    miscCost?: true
    secondConsumSpellCost?: true
    secondPermChargesCost?: true
    thirdConsumSpellCost?: true
    thirdPermChargesCost?: true
    _all?: true
  }

  export type MagicItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MagicItem to aggregate.
     */
    where?: MagicItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MagicItems to fetch.
     */
    orderBy?: MagicItemOrderByWithRelationInput | MagicItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MagicItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MagicItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MagicItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MagicItems
    **/
    _count?: true | MagicItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MagicItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MagicItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MagicItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MagicItemMaxAggregateInputType
  }

  export type GetMagicItemAggregateType<T extends MagicItemAggregateArgs> = {
        [P in keyof T & keyof AggregateMagicItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMagicItem[P]>
      : GetScalarType<T[P], AggregateMagicItem[P]>
  }




  export type MagicItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MagicItemWhereInput
    orderBy?: MagicItemOrderByWithAggregationInput | MagicItemOrderByWithAggregationInput[]
    by: MagicItemScalarFieldEnum[] | MagicItemScalarFieldEnum
    having?: MagicItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MagicItemCountAggregateInputType | true
    _avg?: MagicItemAvgAggregateInputType
    _sum?: MagicItemSumAggregateInputType
    _min?: MagicItemMinAggregateInputType
    _max?: MagicItemMaxAggregateInputType
  }

  export type MagicItemGroupByOutputType = {
    id: number
    name: string
    rarity: string | null
    attunement: string | null
    costGp: number | null
    note: string | null
    armorCost: number | null
    rareMaterial: string | null
    acBonus: number | null
    saveBonus: number | null
    setScoreModifier: number | null
    plusTwoBonusToScore: string | null
    weaponBonus: number | null
    spellLevel: number | null
    unlimitedCharges: string | null
    chargesPerDay: number | null
    chargesPerItem: number | null
    spellsShareCharges: number | null
    condition: string | null
    consumableDamageAvg: number | null
    consumableSave: string | null
    semiPermanentDamageAvg: number | null
    semiPermSave: string | null
    durationMinutes: number | null
    permanentDamageAvg: number | null
    permSave: string | null
    specificSituations: string | null
    restoreHpAvg: number | null
    miscCosts: number | null
    secondSpellLevel: number | null
    secondUnlimitedCharges: string | null
    secondChargesPerDay: number | null
    thirdSpellLevel: number | null
    thirdUnlimitedCharges: string | null
    thirdChargesPerDay: number | null
    matCost: number | null
    acCost: number | null
    saveCost: number | null
    setScoreCost: number | null
    bonusScoreCost: number | null
    weaponCost: number | null
    consumSpellCost: number | null
    permChargesCost: number | null
    chargesDestroyed: number | null
    spellShareChargesCost: number | null
    conditionCost: number | null
    consDMGCost: number | null
    smPrDMGCost: number | null
    perDMGCost: number | null
    avgHPCost: number | null
    miscCost: number | null
    secondConsumSpellCost: number | null
    secondPermChargesCost: number | null
    thirdConsumSpellCost: number | null
    thirdPermChargesCost: number | null
    _count: MagicItemCountAggregateOutputType | null
    _avg: MagicItemAvgAggregateOutputType | null
    _sum: MagicItemSumAggregateOutputType | null
    _min: MagicItemMinAggregateOutputType | null
    _max: MagicItemMaxAggregateOutputType | null
  }

  type GetMagicItemGroupByPayload<T extends MagicItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MagicItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MagicItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MagicItemGroupByOutputType[P]>
            : GetScalarType<T[P], MagicItemGroupByOutputType[P]>
        }
      >
    >


  export type MagicItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rarity?: boolean
    attunement?: boolean
    costGp?: boolean
    note?: boolean
    armorCost?: boolean
    rareMaterial?: boolean
    acBonus?: boolean
    saveBonus?: boolean
    setScoreModifier?: boolean
    plusTwoBonusToScore?: boolean
    weaponBonus?: boolean
    spellLevel?: boolean
    unlimitedCharges?: boolean
    chargesPerDay?: boolean
    chargesPerItem?: boolean
    spellsShareCharges?: boolean
    condition?: boolean
    consumableDamageAvg?: boolean
    consumableSave?: boolean
    semiPermanentDamageAvg?: boolean
    semiPermSave?: boolean
    durationMinutes?: boolean
    permanentDamageAvg?: boolean
    permSave?: boolean
    specificSituations?: boolean
    restoreHpAvg?: boolean
    miscCosts?: boolean
    secondSpellLevel?: boolean
    secondUnlimitedCharges?: boolean
    secondChargesPerDay?: boolean
    thirdSpellLevel?: boolean
    thirdUnlimitedCharges?: boolean
    thirdChargesPerDay?: boolean
    matCost?: boolean
    acCost?: boolean
    saveCost?: boolean
    setScoreCost?: boolean
    bonusScoreCost?: boolean
    weaponCost?: boolean
    consumSpellCost?: boolean
    permChargesCost?: boolean
    chargesDestroyed?: boolean
    spellShareChargesCost?: boolean
    conditionCost?: boolean
    consDMGCost?: boolean
    smPrDMGCost?: boolean
    perDMGCost?: boolean
    avgHPCost?: boolean
    miscCost?: boolean
    secondConsumSpellCost?: boolean
    secondPermChargesCost?: boolean
    thirdConsumSpellCost?: boolean
    thirdPermChargesCost?: boolean
  }, ExtArgs["result"]["magicItem"]>

  export type MagicItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rarity?: boolean
    attunement?: boolean
    costGp?: boolean
    note?: boolean
    armorCost?: boolean
    rareMaterial?: boolean
    acBonus?: boolean
    saveBonus?: boolean
    setScoreModifier?: boolean
    plusTwoBonusToScore?: boolean
    weaponBonus?: boolean
    spellLevel?: boolean
    unlimitedCharges?: boolean
    chargesPerDay?: boolean
    chargesPerItem?: boolean
    spellsShareCharges?: boolean
    condition?: boolean
    consumableDamageAvg?: boolean
    consumableSave?: boolean
    semiPermanentDamageAvg?: boolean
    semiPermSave?: boolean
    durationMinutes?: boolean
    permanentDamageAvg?: boolean
    permSave?: boolean
    specificSituations?: boolean
    restoreHpAvg?: boolean
    miscCosts?: boolean
    secondSpellLevel?: boolean
    secondUnlimitedCharges?: boolean
    secondChargesPerDay?: boolean
    thirdSpellLevel?: boolean
    thirdUnlimitedCharges?: boolean
    thirdChargesPerDay?: boolean
    matCost?: boolean
    acCost?: boolean
    saveCost?: boolean
    setScoreCost?: boolean
    bonusScoreCost?: boolean
    weaponCost?: boolean
    consumSpellCost?: boolean
    permChargesCost?: boolean
    chargesDestroyed?: boolean
    spellShareChargesCost?: boolean
    conditionCost?: boolean
    consDMGCost?: boolean
    smPrDMGCost?: boolean
    perDMGCost?: boolean
    avgHPCost?: boolean
    miscCost?: boolean
    secondConsumSpellCost?: boolean
    secondPermChargesCost?: boolean
    thirdConsumSpellCost?: boolean
    thirdPermChargesCost?: boolean
  }, ExtArgs["result"]["magicItem"]>


  export type MagicItemSelectScalar = {
    id?: boolean
    name?: boolean
    rarity?: boolean
    attunement?: boolean
    costGp?: boolean
    note?: boolean
    armorCost?: boolean
    rareMaterial?: boolean
    acBonus?: boolean
    saveBonus?: boolean
    setScoreModifier?: boolean
    plusTwoBonusToScore?: boolean
    weaponBonus?: boolean
    spellLevel?: boolean
    unlimitedCharges?: boolean
    chargesPerDay?: boolean
    chargesPerItem?: boolean
    spellsShareCharges?: boolean
    condition?: boolean
    consumableDamageAvg?: boolean
    consumableSave?: boolean
    semiPermanentDamageAvg?: boolean
    semiPermSave?: boolean
    durationMinutes?: boolean
    permanentDamageAvg?: boolean
    permSave?: boolean
    specificSituations?: boolean
    restoreHpAvg?: boolean
    miscCosts?: boolean
    secondSpellLevel?: boolean
    secondUnlimitedCharges?: boolean
    secondChargesPerDay?: boolean
    thirdSpellLevel?: boolean
    thirdUnlimitedCharges?: boolean
    thirdChargesPerDay?: boolean
    matCost?: boolean
    acCost?: boolean
    saveCost?: boolean
    setScoreCost?: boolean
    bonusScoreCost?: boolean
    weaponCost?: boolean
    consumSpellCost?: boolean
    permChargesCost?: boolean
    chargesDestroyed?: boolean
    spellShareChargesCost?: boolean
    conditionCost?: boolean
    consDMGCost?: boolean
    smPrDMGCost?: boolean
    perDMGCost?: boolean
    avgHPCost?: boolean
    miscCost?: boolean
    secondConsumSpellCost?: boolean
    secondPermChargesCost?: boolean
    thirdConsumSpellCost?: boolean
    thirdPermChargesCost?: boolean
  }

  export type MagicItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "rarity" | "attunement" | "costGp" | "note" | "armorCost" | "rareMaterial" | "acBonus" | "saveBonus" | "setScoreModifier" | "plusTwoBonusToScore" | "weaponBonus" | "spellLevel" | "unlimitedCharges" | "chargesPerDay" | "chargesPerItem" | "spellsShareCharges" | "condition" | "consumableDamageAvg" | "consumableSave" | "semiPermanentDamageAvg" | "semiPermSave" | "durationMinutes" | "permanentDamageAvg" | "permSave" | "specificSituations" | "restoreHpAvg" | "miscCosts" | "secondSpellLevel" | "secondUnlimitedCharges" | "secondChargesPerDay" | "thirdSpellLevel" | "thirdUnlimitedCharges" | "thirdChargesPerDay" | "matCost" | "acCost" | "saveCost" | "setScoreCost" | "bonusScoreCost" | "weaponCost" | "consumSpellCost" | "permChargesCost" | "chargesDestroyed" | "spellShareChargesCost" | "conditionCost" | "consDMGCost" | "smPrDMGCost" | "perDMGCost" | "avgHPCost" | "miscCost" | "secondConsumSpellCost" | "secondPermChargesCost" | "thirdConsumSpellCost" | "thirdPermChargesCost", ExtArgs["result"]["magicItem"]>

  export type $MagicItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MagicItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      rarity: string | null
      attunement: string | null
      costGp: number | null
      note: string | null
      armorCost: number | null
      rareMaterial: string | null
      acBonus: number | null
      saveBonus: number | null
      setScoreModifier: number | null
      plusTwoBonusToScore: string | null
      weaponBonus: number | null
      spellLevel: number | null
      unlimitedCharges: string | null
      chargesPerDay: number | null
      chargesPerItem: number | null
      spellsShareCharges: number | null
      condition: string | null
      consumableDamageAvg: number | null
      consumableSave: string | null
      semiPermanentDamageAvg: number | null
      semiPermSave: string | null
      durationMinutes: number | null
      permanentDamageAvg: number | null
      permSave: string | null
      specificSituations: string | null
      restoreHpAvg: number | null
      miscCosts: number | null
      secondSpellLevel: number | null
      secondUnlimitedCharges: string | null
      secondChargesPerDay: number | null
      thirdSpellLevel: number | null
      thirdUnlimitedCharges: string | null
      thirdChargesPerDay: number | null
      matCost: number | null
      acCost: number | null
      saveCost: number | null
      setScoreCost: number | null
      bonusScoreCost: number | null
      weaponCost: number | null
      consumSpellCost: number | null
      permChargesCost: number | null
      chargesDestroyed: number | null
      spellShareChargesCost: number | null
      conditionCost: number | null
      consDMGCost: number | null
      smPrDMGCost: number | null
      perDMGCost: number | null
      avgHPCost: number | null
      miscCost: number | null
      secondConsumSpellCost: number | null
      secondPermChargesCost: number | null
      thirdConsumSpellCost: number | null
      thirdPermChargesCost: number | null
    }, ExtArgs["result"]["magicItem"]>
    composites: {}
  }

  type MagicItemGetPayload<S extends boolean | null | undefined | MagicItemDefaultArgs> = $Result.GetResult<Prisma.$MagicItemPayload, S>

  type MagicItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MagicItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MagicItemCountAggregateInputType | true
    }

  export interface MagicItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MagicItem'], meta: { name: 'MagicItem' } }
    /**
     * Find zero or one MagicItem that matches the filter.
     * @param {MagicItemFindUniqueArgs} args - Arguments to find a MagicItem
     * @example
     * // Get one MagicItem
     * const magicItem = await prisma.magicItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MagicItemFindUniqueArgs>(args: SelectSubset<T, MagicItemFindUniqueArgs<ExtArgs>>): Prisma__MagicItemClient<$Result.GetResult<Prisma.$MagicItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MagicItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MagicItemFindUniqueOrThrowArgs} args - Arguments to find a MagicItem
     * @example
     * // Get one MagicItem
     * const magicItem = await prisma.magicItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MagicItemFindUniqueOrThrowArgs>(args: SelectSubset<T, MagicItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MagicItemClient<$Result.GetResult<Prisma.$MagicItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MagicItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicItemFindFirstArgs} args - Arguments to find a MagicItem
     * @example
     * // Get one MagicItem
     * const magicItem = await prisma.magicItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MagicItemFindFirstArgs>(args?: SelectSubset<T, MagicItemFindFirstArgs<ExtArgs>>): Prisma__MagicItemClient<$Result.GetResult<Prisma.$MagicItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MagicItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicItemFindFirstOrThrowArgs} args - Arguments to find a MagicItem
     * @example
     * // Get one MagicItem
     * const magicItem = await prisma.magicItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MagicItemFindFirstOrThrowArgs>(args?: SelectSubset<T, MagicItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MagicItemClient<$Result.GetResult<Prisma.$MagicItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MagicItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MagicItems
     * const magicItems = await prisma.magicItem.findMany()
     * 
     * // Get first 10 MagicItems
     * const magicItems = await prisma.magicItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const magicItemWithIdOnly = await prisma.magicItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MagicItemFindManyArgs>(args?: SelectSubset<T, MagicItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MagicItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MagicItem.
     * @param {MagicItemCreateArgs} args - Arguments to create a MagicItem.
     * @example
     * // Create one MagicItem
     * const MagicItem = await prisma.magicItem.create({
     *   data: {
     *     // ... data to create a MagicItem
     *   }
     * })
     * 
     */
    create<T extends MagicItemCreateArgs>(args: SelectSubset<T, MagicItemCreateArgs<ExtArgs>>): Prisma__MagicItemClient<$Result.GetResult<Prisma.$MagicItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MagicItems.
     * @param {MagicItemCreateManyArgs} args - Arguments to create many MagicItems.
     * @example
     * // Create many MagicItems
     * const magicItem = await prisma.magicItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MagicItemCreateManyArgs>(args?: SelectSubset<T, MagicItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MagicItems and returns the data saved in the database.
     * @param {MagicItemCreateManyAndReturnArgs} args - Arguments to create many MagicItems.
     * @example
     * // Create many MagicItems
     * const magicItem = await prisma.magicItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MagicItems and only return the `id`
     * const magicItemWithIdOnly = await prisma.magicItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MagicItemCreateManyAndReturnArgs>(args?: SelectSubset<T, MagicItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MagicItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MagicItem.
     * @param {MagicItemDeleteArgs} args - Arguments to delete one MagicItem.
     * @example
     * // Delete one MagicItem
     * const MagicItem = await prisma.magicItem.delete({
     *   where: {
     *     // ... filter to delete one MagicItem
     *   }
     * })
     * 
     */
    delete<T extends MagicItemDeleteArgs>(args: SelectSubset<T, MagicItemDeleteArgs<ExtArgs>>): Prisma__MagicItemClient<$Result.GetResult<Prisma.$MagicItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MagicItem.
     * @param {MagicItemUpdateArgs} args - Arguments to update one MagicItem.
     * @example
     * // Update one MagicItem
     * const magicItem = await prisma.magicItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MagicItemUpdateArgs>(args: SelectSubset<T, MagicItemUpdateArgs<ExtArgs>>): Prisma__MagicItemClient<$Result.GetResult<Prisma.$MagicItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MagicItems.
     * @param {MagicItemDeleteManyArgs} args - Arguments to filter MagicItems to delete.
     * @example
     * // Delete a few MagicItems
     * const { count } = await prisma.magicItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MagicItemDeleteManyArgs>(args?: SelectSubset<T, MagicItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MagicItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MagicItems
     * const magicItem = await prisma.magicItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MagicItemUpdateManyArgs>(args: SelectSubset<T, MagicItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MagicItem.
     * @param {MagicItemUpsertArgs} args - Arguments to update or create a MagicItem.
     * @example
     * // Update or create a MagicItem
     * const magicItem = await prisma.magicItem.upsert({
     *   create: {
     *     // ... data to create a MagicItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MagicItem we want to update
     *   }
     * })
     */
    upsert<T extends MagicItemUpsertArgs>(args: SelectSubset<T, MagicItemUpsertArgs<ExtArgs>>): Prisma__MagicItemClient<$Result.GetResult<Prisma.$MagicItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MagicItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicItemCountArgs} args - Arguments to filter MagicItems to count.
     * @example
     * // Count the number of MagicItems
     * const count = await prisma.magicItem.count({
     *   where: {
     *     // ... the filter for the MagicItems we want to count
     *   }
     * })
    **/
    count<T extends MagicItemCountArgs>(
      args?: Subset<T, MagicItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MagicItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MagicItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MagicItemAggregateArgs>(args: Subset<T, MagicItemAggregateArgs>): Prisma.PrismaPromise<GetMagicItemAggregateType<T>>

    /**
     * Group by MagicItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MagicItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MagicItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MagicItemGroupByArgs['orderBy'] }
        : { orderBy?: MagicItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MagicItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMagicItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MagicItem model
   */
  readonly fields: MagicItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MagicItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MagicItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MagicItem model
   */
  interface MagicItemFieldRefs {
    readonly id: FieldRef<"MagicItem", 'Int'>
    readonly name: FieldRef<"MagicItem", 'String'>
    readonly rarity: FieldRef<"MagicItem", 'String'>
    readonly attunement: FieldRef<"MagicItem", 'String'>
    readonly costGp: FieldRef<"MagicItem", 'Int'>
    readonly note: FieldRef<"MagicItem", 'String'>
    readonly armorCost: FieldRef<"MagicItem", 'Int'>
    readonly rareMaterial: FieldRef<"MagicItem", 'String'>
    readonly acBonus: FieldRef<"MagicItem", 'Int'>
    readonly saveBonus: FieldRef<"MagicItem", 'Int'>
    readonly setScoreModifier: FieldRef<"MagicItem", 'Int'>
    readonly plusTwoBonusToScore: FieldRef<"MagicItem", 'String'>
    readonly weaponBonus: FieldRef<"MagicItem", 'Int'>
    readonly spellLevel: FieldRef<"MagicItem", 'Int'>
    readonly unlimitedCharges: FieldRef<"MagicItem", 'String'>
    readonly chargesPerDay: FieldRef<"MagicItem", 'Int'>
    readonly chargesPerItem: FieldRef<"MagicItem", 'Int'>
    readonly spellsShareCharges: FieldRef<"MagicItem", 'Int'>
    readonly condition: FieldRef<"MagicItem", 'String'>
    readonly consumableDamageAvg: FieldRef<"MagicItem", 'Int'>
    readonly consumableSave: FieldRef<"MagicItem", 'String'>
    readonly semiPermanentDamageAvg: FieldRef<"MagicItem", 'Int'>
    readonly semiPermSave: FieldRef<"MagicItem", 'String'>
    readonly durationMinutes: FieldRef<"MagicItem", 'Int'>
    readonly permanentDamageAvg: FieldRef<"MagicItem", 'Int'>
    readonly permSave: FieldRef<"MagicItem", 'String'>
    readonly specificSituations: FieldRef<"MagicItem", 'String'>
    readonly restoreHpAvg: FieldRef<"MagicItem", 'Int'>
    readonly miscCosts: FieldRef<"MagicItem", 'Int'>
    readonly secondSpellLevel: FieldRef<"MagicItem", 'Int'>
    readonly secondUnlimitedCharges: FieldRef<"MagicItem", 'String'>
    readonly secondChargesPerDay: FieldRef<"MagicItem", 'Int'>
    readonly thirdSpellLevel: FieldRef<"MagicItem", 'Int'>
    readonly thirdUnlimitedCharges: FieldRef<"MagicItem", 'String'>
    readonly thirdChargesPerDay: FieldRef<"MagicItem", 'Int'>
    readonly matCost: FieldRef<"MagicItem", 'Int'>
    readonly acCost: FieldRef<"MagicItem", 'Int'>
    readonly saveCost: FieldRef<"MagicItem", 'Int'>
    readonly setScoreCost: FieldRef<"MagicItem", 'Int'>
    readonly bonusScoreCost: FieldRef<"MagicItem", 'Int'>
    readonly weaponCost: FieldRef<"MagicItem", 'Int'>
    readonly consumSpellCost: FieldRef<"MagicItem", 'Int'>
    readonly permChargesCost: FieldRef<"MagicItem", 'Int'>
    readonly chargesDestroyed: FieldRef<"MagicItem", 'Int'>
    readonly spellShareChargesCost: FieldRef<"MagicItem", 'Int'>
    readonly conditionCost: FieldRef<"MagicItem", 'Int'>
    readonly consDMGCost: FieldRef<"MagicItem", 'Int'>
    readonly smPrDMGCost: FieldRef<"MagicItem", 'Int'>
    readonly perDMGCost: FieldRef<"MagicItem", 'Int'>
    readonly avgHPCost: FieldRef<"MagicItem", 'Int'>
    readonly miscCost: FieldRef<"MagicItem", 'Int'>
    readonly secondConsumSpellCost: FieldRef<"MagicItem", 'Int'>
    readonly secondPermChargesCost: FieldRef<"MagicItem", 'Int'>
    readonly thirdConsumSpellCost: FieldRef<"MagicItem", 'Int'>
    readonly thirdPermChargesCost: FieldRef<"MagicItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MagicItem findUnique
   */
  export type MagicItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
    /**
     * Filter, which MagicItem to fetch.
     */
    where: MagicItemWhereUniqueInput
  }

  /**
   * MagicItem findUniqueOrThrow
   */
  export type MagicItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
    /**
     * Filter, which MagicItem to fetch.
     */
    where: MagicItemWhereUniqueInput
  }

  /**
   * MagicItem findFirst
   */
  export type MagicItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
    /**
     * Filter, which MagicItem to fetch.
     */
    where?: MagicItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MagicItems to fetch.
     */
    orderBy?: MagicItemOrderByWithRelationInput | MagicItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MagicItems.
     */
    cursor?: MagicItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MagicItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MagicItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MagicItems.
     */
    distinct?: MagicItemScalarFieldEnum | MagicItemScalarFieldEnum[]
  }

  /**
   * MagicItem findFirstOrThrow
   */
  export type MagicItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
    /**
     * Filter, which MagicItem to fetch.
     */
    where?: MagicItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MagicItems to fetch.
     */
    orderBy?: MagicItemOrderByWithRelationInput | MagicItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MagicItems.
     */
    cursor?: MagicItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MagicItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MagicItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MagicItems.
     */
    distinct?: MagicItemScalarFieldEnum | MagicItemScalarFieldEnum[]
  }

  /**
   * MagicItem findMany
   */
  export type MagicItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
    /**
     * Filter, which MagicItems to fetch.
     */
    where?: MagicItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MagicItems to fetch.
     */
    orderBy?: MagicItemOrderByWithRelationInput | MagicItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MagicItems.
     */
    cursor?: MagicItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MagicItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MagicItems.
     */
    skip?: number
    distinct?: MagicItemScalarFieldEnum | MagicItemScalarFieldEnum[]
  }

  /**
   * MagicItem create
   */
  export type MagicItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
    /**
     * The data needed to create a MagicItem.
     */
    data: XOR<MagicItemCreateInput, MagicItemUncheckedCreateInput>
  }

  /**
   * MagicItem createMany
   */
  export type MagicItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MagicItems.
     */
    data: MagicItemCreateManyInput | MagicItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MagicItem createManyAndReturn
   */
  export type MagicItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
    /**
     * The data used to create many MagicItems.
     */
    data: MagicItemCreateManyInput | MagicItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MagicItem update
   */
  export type MagicItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
    /**
     * The data needed to update a MagicItem.
     */
    data: XOR<MagicItemUpdateInput, MagicItemUncheckedUpdateInput>
    /**
     * Choose, which MagicItem to update.
     */
    where: MagicItemWhereUniqueInput
  }

  /**
   * MagicItem updateMany
   */
  export type MagicItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MagicItems.
     */
    data: XOR<MagicItemUpdateManyMutationInput, MagicItemUncheckedUpdateManyInput>
    /**
     * Filter which MagicItems to update
     */
    where?: MagicItemWhereInput
  }

  /**
   * MagicItem upsert
   */
  export type MagicItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
    /**
     * The filter to search for the MagicItem to update in case it exists.
     */
    where: MagicItemWhereUniqueInput
    /**
     * In case the MagicItem found by the `where` argument doesn't exist, create a new MagicItem with this data.
     */
    create: XOR<MagicItemCreateInput, MagicItemUncheckedCreateInput>
    /**
     * In case the MagicItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MagicItemUpdateInput, MagicItemUncheckedUpdateInput>
  }

  /**
   * MagicItem delete
   */
  export type MagicItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
    /**
     * Filter which MagicItem to delete.
     */
    where: MagicItemWhereUniqueInput
  }

  /**
   * MagicItem deleteMany
   */
  export type MagicItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MagicItems to delete
     */
    where?: MagicItemWhereInput
  }

  /**
   * MagicItem without action
   */
  export type MagicItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MagicItem
     */
    select?: MagicItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MagicItem
     */
    omit?: MagicItemOmit<ExtArgs> | null
  }


  /**
   * Model GeneralEquipment
   */

  export type AggregateGeneralEquipment = {
    _count: GeneralEquipmentCountAggregateOutputType | null
    _avg: GeneralEquipmentAvgAggregateOutputType | null
    _sum: GeneralEquipmentSumAggregateOutputType | null
    _min: GeneralEquipmentMinAggregateOutputType | null
    _max: GeneralEquipmentMaxAggregateOutputType | null
  }

  export type GeneralEquipmentAvgAggregateOutputType = {
    id: number | null
  }

  export type GeneralEquipmentSumAggregateOutputType = {
    id: number | null
  }

  export type GeneralEquipmentMinAggregateOutputType = {
    id: number | null
    name: string | null
    cost: string | null
    weightLbs: string | null
  }

  export type GeneralEquipmentMaxAggregateOutputType = {
    id: number | null
    name: string | null
    cost: string | null
    weightLbs: string | null
  }

  export type GeneralEquipmentCountAggregateOutputType = {
    id: number
    name: number
    cost: number
    weightLbs: number
    _all: number
  }


  export type GeneralEquipmentAvgAggregateInputType = {
    id?: true
  }

  export type GeneralEquipmentSumAggregateInputType = {
    id?: true
  }

  export type GeneralEquipmentMinAggregateInputType = {
    id?: true
    name?: true
    cost?: true
    weightLbs?: true
  }

  export type GeneralEquipmentMaxAggregateInputType = {
    id?: true
    name?: true
    cost?: true
    weightLbs?: true
  }

  export type GeneralEquipmentCountAggregateInputType = {
    id?: true
    name?: true
    cost?: true
    weightLbs?: true
    _all?: true
  }

  export type GeneralEquipmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneralEquipment to aggregate.
     */
    where?: GeneralEquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralEquipments to fetch.
     */
    orderBy?: GeneralEquipmentOrderByWithRelationInput | GeneralEquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeneralEquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralEquipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralEquipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeneralEquipments
    **/
    _count?: true | GeneralEquipmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GeneralEquipmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GeneralEquipmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeneralEquipmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeneralEquipmentMaxAggregateInputType
  }

  export type GetGeneralEquipmentAggregateType<T extends GeneralEquipmentAggregateArgs> = {
        [P in keyof T & keyof AggregateGeneralEquipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeneralEquipment[P]>
      : GetScalarType<T[P], AggregateGeneralEquipment[P]>
  }




  export type GeneralEquipmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneralEquipmentWhereInput
    orderBy?: GeneralEquipmentOrderByWithAggregationInput | GeneralEquipmentOrderByWithAggregationInput[]
    by: GeneralEquipmentScalarFieldEnum[] | GeneralEquipmentScalarFieldEnum
    having?: GeneralEquipmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeneralEquipmentCountAggregateInputType | true
    _avg?: GeneralEquipmentAvgAggregateInputType
    _sum?: GeneralEquipmentSumAggregateInputType
    _min?: GeneralEquipmentMinAggregateInputType
    _max?: GeneralEquipmentMaxAggregateInputType
  }

  export type GeneralEquipmentGroupByOutputType = {
    id: number
    name: string
    cost: string
    weightLbs: string | null
    _count: GeneralEquipmentCountAggregateOutputType | null
    _avg: GeneralEquipmentAvgAggregateOutputType | null
    _sum: GeneralEquipmentSumAggregateOutputType | null
    _min: GeneralEquipmentMinAggregateOutputType | null
    _max: GeneralEquipmentMaxAggregateOutputType | null
  }

  type GetGeneralEquipmentGroupByPayload<T extends GeneralEquipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeneralEquipmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeneralEquipmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeneralEquipmentGroupByOutputType[P]>
            : GetScalarType<T[P], GeneralEquipmentGroupByOutputType[P]>
        }
      >
    >


  export type GeneralEquipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    cost?: boolean
    weightLbs?: boolean
  }, ExtArgs["result"]["generalEquipment"]>

  export type GeneralEquipmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    cost?: boolean
    weightLbs?: boolean
  }, ExtArgs["result"]["generalEquipment"]>


  export type GeneralEquipmentSelectScalar = {
    id?: boolean
    name?: boolean
    cost?: boolean
    weightLbs?: boolean
  }

  export type GeneralEquipmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "cost" | "weightLbs", ExtArgs["result"]["generalEquipment"]>

  export type $GeneralEquipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeneralEquipment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      cost: string
      weightLbs: string | null
    }, ExtArgs["result"]["generalEquipment"]>
    composites: {}
  }

  type GeneralEquipmentGetPayload<S extends boolean | null | undefined | GeneralEquipmentDefaultArgs> = $Result.GetResult<Prisma.$GeneralEquipmentPayload, S>

  type GeneralEquipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GeneralEquipmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GeneralEquipmentCountAggregateInputType | true
    }

  export interface GeneralEquipmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeneralEquipment'], meta: { name: 'GeneralEquipment' } }
    /**
     * Find zero or one GeneralEquipment that matches the filter.
     * @param {GeneralEquipmentFindUniqueArgs} args - Arguments to find a GeneralEquipment
     * @example
     * // Get one GeneralEquipment
     * const generalEquipment = await prisma.generalEquipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeneralEquipmentFindUniqueArgs>(args: SelectSubset<T, GeneralEquipmentFindUniqueArgs<ExtArgs>>): Prisma__GeneralEquipmentClient<$Result.GetResult<Prisma.$GeneralEquipmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GeneralEquipment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GeneralEquipmentFindUniqueOrThrowArgs} args - Arguments to find a GeneralEquipment
     * @example
     * // Get one GeneralEquipment
     * const generalEquipment = await prisma.generalEquipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeneralEquipmentFindUniqueOrThrowArgs>(args: SelectSubset<T, GeneralEquipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeneralEquipmentClient<$Result.GetResult<Prisma.$GeneralEquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneralEquipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralEquipmentFindFirstArgs} args - Arguments to find a GeneralEquipment
     * @example
     * // Get one GeneralEquipment
     * const generalEquipment = await prisma.generalEquipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeneralEquipmentFindFirstArgs>(args?: SelectSubset<T, GeneralEquipmentFindFirstArgs<ExtArgs>>): Prisma__GeneralEquipmentClient<$Result.GetResult<Prisma.$GeneralEquipmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneralEquipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralEquipmentFindFirstOrThrowArgs} args - Arguments to find a GeneralEquipment
     * @example
     * // Get one GeneralEquipment
     * const generalEquipment = await prisma.generalEquipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeneralEquipmentFindFirstOrThrowArgs>(args?: SelectSubset<T, GeneralEquipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeneralEquipmentClient<$Result.GetResult<Prisma.$GeneralEquipmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GeneralEquipments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralEquipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeneralEquipments
     * const generalEquipments = await prisma.generalEquipment.findMany()
     * 
     * // Get first 10 GeneralEquipments
     * const generalEquipments = await prisma.generalEquipment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const generalEquipmentWithIdOnly = await prisma.generalEquipment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeneralEquipmentFindManyArgs>(args?: SelectSubset<T, GeneralEquipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneralEquipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GeneralEquipment.
     * @param {GeneralEquipmentCreateArgs} args - Arguments to create a GeneralEquipment.
     * @example
     * // Create one GeneralEquipment
     * const GeneralEquipment = await prisma.generalEquipment.create({
     *   data: {
     *     // ... data to create a GeneralEquipment
     *   }
     * })
     * 
     */
    create<T extends GeneralEquipmentCreateArgs>(args: SelectSubset<T, GeneralEquipmentCreateArgs<ExtArgs>>): Prisma__GeneralEquipmentClient<$Result.GetResult<Prisma.$GeneralEquipmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GeneralEquipments.
     * @param {GeneralEquipmentCreateManyArgs} args - Arguments to create many GeneralEquipments.
     * @example
     * // Create many GeneralEquipments
     * const generalEquipment = await prisma.generalEquipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeneralEquipmentCreateManyArgs>(args?: SelectSubset<T, GeneralEquipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GeneralEquipments and returns the data saved in the database.
     * @param {GeneralEquipmentCreateManyAndReturnArgs} args - Arguments to create many GeneralEquipments.
     * @example
     * // Create many GeneralEquipments
     * const generalEquipment = await prisma.generalEquipment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GeneralEquipments and only return the `id`
     * const generalEquipmentWithIdOnly = await prisma.generalEquipment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GeneralEquipmentCreateManyAndReturnArgs>(args?: SelectSubset<T, GeneralEquipmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneralEquipmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GeneralEquipment.
     * @param {GeneralEquipmentDeleteArgs} args - Arguments to delete one GeneralEquipment.
     * @example
     * // Delete one GeneralEquipment
     * const GeneralEquipment = await prisma.generalEquipment.delete({
     *   where: {
     *     // ... filter to delete one GeneralEquipment
     *   }
     * })
     * 
     */
    delete<T extends GeneralEquipmentDeleteArgs>(args: SelectSubset<T, GeneralEquipmentDeleteArgs<ExtArgs>>): Prisma__GeneralEquipmentClient<$Result.GetResult<Prisma.$GeneralEquipmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GeneralEquipment.
     * @param {GeneralEquipmentUpdateArgs} args - Arguments to update one GeneralEquipment.
     * @example
     * // Update one GeneralEquipment
     * const generalEquipment = await prisma.generalEquipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeneralEquipmentUpdateArgs>(args: SelectSubset<T, GeneralEquipmentUpdateArgs<ExtArgs>>): Prisma__GeneralEquipmentClient<$Result.GetResult<Prisma.$GeneralEquipmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GeneralEquipments.
     * @param {GeneralEquipmentDeleteManyArgs} args - Arguments to filter GeneralEquipments to delete.
     * @example
     * // Delete a few GeneralEquipments
     * const { count } = await prisma.generalEquipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeneralEquipmentDeleteManyArgs>(args?: SelectSubset<T, GeneralEquipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneralEquipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralEquipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeneralEquipments
     * const generalEquipment = await prisma.generalEquipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeneralEquipmentUpdateManyArgs>(args: SelectSubset<T, GeneralEquipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GeneralEquipment.
     * @param {GeneralEquipmentUpsertArgs} args - Arguments to update or create a GeneralEquipment.
     * @example
     * // Update or create a GeneralEquipment
     * const generalEquipment = await prisma.generalEquipment.upsert({
     *   create: {
     *     // ... data to create a GeneralEquipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeneralEquipment we want to update
     *   }
     * })
     */
    upsert<T extends GeneralEquipmentUpsertArgs>(args: SelectSubset<T, GeneralEquipmentUpsertArgs<ExtArgs>>): Prisma__GeneralEquipmentClient<$Result.GetResult<Prisma.$GeneralEquipmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GeneralEquipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralEquipmentCountArgs} args - Arguments to filter GeneralEquipments to count.
     * @example
     * // Count the number of GeneralEquipments
     * const count = await prisma.generalEquipment.count({
     *   where: {
     *     // ... the filter for the GeneralEquipments we want to count
     *   }
     * })
    **/
    count<T extends GeneralEquipmentCountArgs>(
      args?: Subset<T, GeneralEquipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeneralEquipmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeneralEquipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralEquipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GeneralEquipmentAggregateArgs>(args: Subset<T, GeneralEquipmentAggregateArgs>): Prisma.PrismaPromise<GetGeneralEquipmentAggregateType<T>>

    /**
     * Group by GeneralEquipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralEquipmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GeneralEquipmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeneralEquipmentGroupByArgs['orderBy'] }
        : { orderBy?: GeneralEquipmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GeneralEquipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeneralEquipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeneralEquipment model
   */
  readonly fields: GeneralEquipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeneralEquipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeneralEquipmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GeneralEquipment model
   */
  interface GeneralEquipmentFieldRefs {
    readonly id: FieldRef<"GeneralEquipment", 'Int'>
    readonly name: FieldRef<"GeneralEquipment", 'String'>
    readonly cost: FieldRef<"GeneralEquipment", 'String'>
    readonly weightLbs: FieldRef<"GeneralEquipment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GeneralEquipment findUnique
   */
  export type GeneralEquipmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
    /**
     * Filter, which GeneralEquipment to fetch.
     */
    where: GeneralEquipmentWhereUniqueInput
  }

  /**
   * GeneralEquipment findUniqueOrThrow
   */
  export type GeneralEquipmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
    /**
     * Filter, which GeneralEquipment to fetch.
     */
    where: GeneralEquipmentWhereUniqueInput
  }

  /**
   * GeneralEquipment findFirst
   */
  export type GeneralEquipmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
    /**
     * Filter, which GeneralEquipment to fetch.
     */
    where?: GeneralEquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralEquipments to fetch.
     */
    orderBy?: GeneralEquipmentOrderByWithRelationInput | GeneralEquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneralEquipments.
     */
    cursor?: GeneralEquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralEquipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralEquipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneralEquipments.
     */
    distinct?: GeneralEquipmentScalarFieldEnum | GeneralEquipmentScalarFieldEnum[]
  }

  /**
   * GeneralEquipment findFirstOrThrow
   */
  export type GeneralEquipmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
    /**
     * Filter, which GeneralEquipment to fetch.
     */
    where?: GeneralEquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralEquipments to fetch.
     */
    orderBy?: GeneralEquipmentOrderByWithRelationInput | GeneralEquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneralEquipments.
     */
    cursor?: GeneralEquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralEquipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralEquipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneralEquipments.
     */
    distinct?: GeneralEquipmentScalarFieldEnum | GeneralEquipmentScalarFieldEnum[]
  }

  /**
   * GeneralEquipment findMany
   */
  export type GeneralEquipmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
    /**
     * Filter, which GeneralEquipments to fetch.
     */
    where?: GeneralEquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralEquipments to fetch.
     */
    orderBy?: GeneralEquipmentOrderByWithRelationInput | GeneralEquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeneralEquipments.
     */
    cursor?: GeneralEquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralEquipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralEquipments.
     */
    skip?: number
    distinct?: GeneralEquipmentScalarFieldEnum | GeneralEquipmentScalarFieldEnum[]
  }

  /**
   * GeneralEquipment create
   */
  export type GeneralEquipmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
    /**
     * The data needed to create a GeneralEquipment.
     */
    data: XOR<GeneralEquipmentCreateInput, GeneralEquipmentUncheckedCreateInput>
  }

  /**
   * GeneralEquipment createMany
   */
  export type GeneralEquipmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeneralEquipments.
     */
    data: GeneralEquipmentCreateManyInput | GeneralEquipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeneralEquipment createManyAndReturn
   */
  export type GeneralEquipmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
    /**
     * The data used to create many GeneralEquipments.
     */
    data: GeneralEquipmentCreateManyInput | GeneralEquipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeneralEquipment update
   */
  export type GeneralEquipmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
    /**
     * The data needed to update a GeneralEquipment.
     */
    data: XOR<GeneralEquipmentUpdateInput, GeneralEquipmentUncheckedUpdateInput>
    /**
     * Choose, which GeneralEquipment to update.
     */
    where: GeneralEquipmentWhereUniqueInput
  }

  /**
   * GeneralEquipment updateMany
   */
  export type GeneralEquipmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeneralEquipments.
     */
    data: XOR<GeneralEquipmentUpdateManyMutationInput, GeneralEquipmentUncheckedUpdateManyInput>
    /**
     * Filter which GeneralEquipments to update
     */
    where?: GeneralEquipmentWhereInput
  }

  /**
   * GeneralEquipment upsert
   */
  export type GeneralEquipmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
    /**
     * The filter to search for the GeneralEquipment to update in case it exists.
     */
    where: GeneralEquipmentWhereUniqueInput
    /**
     * In case the GeneralEquipment found by the `where` argument doesn't exist, create a new GeneralEquipment with this data.
     */
    create: XOR<GeneralEquipmentCreateInput, GeneralEquipmentUncheckedCreateInput>
    /**
     * In case the GeneralEquipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeneralEquipmentUpdateInput, GeneralEquipmentUncheckedUpdateInput>
  }

  /**
   * GeneralEquipment delete
   */
  export type GeneralEquipmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
    /**
     * Filter which GeneralEquipment to delete.
     */
    where: GeneralEquipmentWhereUniqueInput
  }

  /**
   * GeneralEquipment deleteMany
   */
  export type GeneralEquipmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneralEquipments to delete
     */
    where?: GeneralEquipmentWhereInput
  }

  /**
   * GeneralEquipment without action
   */
  export type GeneralEquipmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralEquipment
     */
    select?: GeneralEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralEquipment
     */
    omit?: GeneralEquipmentOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MonsterScalarFieldEnum: {
    id: 'id',
    name: 'name',
    size: 'size',
    type: 'type',
    alignment: 'alignment',
    habitat: 'habitat',
    mainHabitat: 'mainHabitat',
    otherHabitat: 'otherHabitat',
    treasure: 'treasure',
    ac: 'ac',
    hp: 'hp',
    initiative: 'initiative',
    walk: 'walk',
    burrow: 'burrow',
    climb: 'climb',
    fly: 'fly',
    hover: 'hover',
    swim: 'swim',
    strMod: 'strMod',
    intMod: 'intMod',
    dexMod: 'dexMod',
    wisMod: 'wisMod',
    conMod: 'conMod',
    chaMod: 'chaMod',
    strSave: 'strSave',
    intSave: 'intSave',
    dexSave: 'dexSave',
    wisSave: 'wisSave',
    conSave: 'conSave',
    chaSave: 'chaSave',
    proficient: 'proficient',
    expertise: 'expertise',
    vulnerabilities: 'vulnerabilities',
    slashing: 'slashing',
    immunitiesConditions: 'immunitiesConditions',
    immunitiesDamage: 'immunitiesDamage',
    blindsight: 'blindsight',
    darkvision: 'darkvision',
    truesight: 'truesight',
    tremorsense: 'tremorsense',
    passivePerception: 'passivePerception',
    languages: 'languages',
    cr: 'cr',
    xpVal: 'xpVal',
    pb: 'pb',
    traits: 'traits',
    legendaryResistanceCount: 'legendaryResistanceCount',
    numberOfAtk: 'numberOfAtk',
    atk1Type: 'atk1Type',
    atk1Mod: 'atk1Mod',
    atk1Range: 'atk1Range',
    atk1RangeShort: 'atk1RangeShort',
    atk1Dam: 'atk1Dam',
    atk1DamageType: 'atk1DamageType',
    atk2Type: 'atk2Type',
    atk2Mod: 'atk2Mod',
    atk2Range: 'atk2Range',
    atk2RangeShort: 'atk2RangeShort',
    atk2Dam: 'atk2Dam',
    atk2DamageType: 'atk2DamageType',
    atk3Type: 'atk3Type',
    atk3Mod: 'atk3Mod',
    atk3Range: 'atk3Range',
    atk3RangeShort: 'atk3RangeShort',
    atk3Dam: 'atk3Dam',
    atk3DamageType: 'atk3DamageType',
    atk4Type: 'atk4Type',
    atk4Mod: 'atk4Mod',
    atk4Range: 'atk4Range',
    atk4RangeShort: 'atk4RangeShort',
    atk4Dam: 'atk4Dam',
    atk4DamageType: 'atk4DamageType',
    saveDC: 'saveDC',
    savingThrow: 'savingThrow',
    actionNotes: 'actionNotes',
    ability: 'ability',
    spellSaveDC: 'spellSaveDC',
    spellSavingThrows: 'spellSavingThrows',
    spellAttack: 'spellAttack',
    atWillSpells: 'atWillSpells',
    threePerDaySpells: 'threePerDaySpells',
    twoPerDaySpells: 'twoPerDaySpells',
    onePerDaySpells: 'onePerDaySpells',
    bonusAction: 'bonusAction',
    reaction: 'reaction',
    amount: 'amount',
    legendaryActionSaveDC: 'legendaryActionSaveDC',
    legendaryActionSavingThrow: 'legendaryActionSavingThrow',
    legendaryActions: 'legendaryActions',
    lair: 'lair',
    xpLair: 'xpLair',
    legendaryResistance: 'legendaryResistance',
    legendaryActionsLair: 'legendaryActionsLair',
    lairSaveDC: 'lairSaveDC',
    lairSavingThrows: 'lairSavingThrows',
    other: 'other',
    align: 'align',
    speeds: 'speeds',
    strScore: 'strScore',
    dexScore: 'dexScore',
    conScore: 'conScore',
    intScore: 'intScore',
    wisScore: 'wisScore',
    chaScore: 'chaScore',
    savThrows: 'savThrows',
    skills: 'skills',
    wri: 'wri',
    senses: 'senses',
    additional: 'additional',
    font: 'font',
    additionalInfo: 'additionalInfo',
    author: 'author'
  };

  export type MonsterScalarFieldEnum = (typeof MonsterScalarFieldEnum)[keyof typeof MonsterScalarFieldEnum]


  export const RaceScalarFieldEnum: {
    id: 'id',
    race: 'race',
    str: 'str',
    dex: 'dex',
    con: 'con',
    int: 'int',
    wis: 'wis',
    cha: 'cha',
    special: 'special',
    source: 'source',
    notes: 'notes'
  };

  export type RaceScalarFieldEnum = (typeof RaceScalarFieldEnum)[keyof typeof RaceScalarFieldEnum]


  export const SpellScalarFieldEnum: {
    id: 'id',
    name: 'name',
    level: 'level',
    school: 'school',
    castingTime: 'castingTime',
    duration: 'duration',
    range: 'range',
    area: 'area',
    attack: 'attack',
    save: 'save',
    damageEffect: 'damageEffect',
    ritual: 'ritual',
    concentration: 'concentration',
    verbal: 'verbal',
    somatic: 'somatic',
    material: 'material',
    materialDetails: 'materialDetails',
    source: 'source',
    details: 'details',
    link: 'link'
  };

  export type SpellScalarFieldEnum = (typeof SpellScalarFieldEnum)[keyof typeof SpellScalarFieldEnum]


  export const ClassScalarFieldEnum: {
    id: 'id',
    class: 'class',
    subclass: 'subclass',
    source: 'source',
    notes: 'notes',
    features: 'features',
    level: 'level',
    description: 'description'
  };

  export type ClassScalarFieldEnum = (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum]


  export const MagicItemScalarFieldEnum: {
    id: 'id',
    name: 'name',
    rarity: 'rarity',
    attunement: 'attunement',
    costGp: 'costGp',
    note: 'note',
    armorCost: 'armorCost',
    rareMaterial: 'rareMaterial',
    acBonus: 'acBonus',
    saveBonus: 'saveBonus',
    setScoreModifier: 'setScoreModifier',
    plusTwoBonusToScore: 'plusTwoBonusToScore',
    weaponBonus: 'weaponBonus',
    spellLevel: 'spellLevel',
    unlimitedCharges: 'unlimitedCharges',
    chargesPerDay: 'chargesPerDay',
    chargesPerItem: 'chargesPerItem',
    spellsShareCharges: 'spellsShareCharges',
    condition: 'condition',
    consumableDamageAvg: 'consumableDamageAvg',
    consumableSave: 'consumableSave',
    semiPermanentDamageAvg: 'semiPermanentDamageAvg',
    semiPermSave: 'semiPermSave',
    durationMinutes: 'durationMinutes',
    permanentDamageAvg: 'permanentDamageAvg',
    permSave: 'permSave',
    specificSituations: 'specificSituations',
    restoreHpAvg: 'restoreHpAvg',
    miscCosts: 'miscCosts',
    secondSpellLevel: 'secondSpellLevel',
    secondUnlimitedCharges: 'secondUnlimitedCharges',
    secondChargesPerDay: 'secondChargesPerDay',
    thirdSpellLevel: 'thirdSpellLevel',
    thirdUnlimitedCharges: 'thirdUnlimitedCharges',
    thirdChargesPerDay: 'thirdChargesPerDay',
    matCost: 'matCost',
    acCost: 'acCost',
    saveCost: 'saveCost',
    setScoreCost: 'setScoreCost',
    bonusScoreCost: 'bonusScoreCost',
    weaponCost: 'weaponCost',
    consumSpellCost: 'consumSpellCost',
    permChargesCost: 'permChargesCost',
    chargesDestroyed: 'chargesDestroyed',
    spellShareChargesCost: 'spellShareChargesCost',
    conditionCost: 'conditionCost',
    consDMGCost: 'consDMGCost',
    smPrDMGCost: 'smPrDMGCost',
    perDMGCost: 'perDMGCost',
    avgHPCost: 'avgHPCost',
    miscCost: 'miscCost',
    secondConsumSpellCost: 'secondConsumSpellCost',
    secondPermChargesCost: 'secondPermChargesCost',
    thirdConsumSpellCost: 'thirdConsumSpellCost',
    thirdPermChargesCost: 'thirdPermChargesCost'
  };

  export type MagicItemScalarFieldEnum = (typeof MagicItemScalarFieldEnum)[keyof typeof MagicItemScalarFieldEnum]


  export const GeneralEquipmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    cost: 'cost',
    weightLbs: 'weightLbs'
  };

  export type GeneralEquipmentScalarFieldEnum = (typeof GeneralEquipmentScalarFieldEnum)[keyof typeof GeneralEquipmentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MonsterWhereInput = {
    AND?: MonsterWhereInput | MonsterWhereInput[]
    OR?: MonsterWhereInput[]
    NOT?: MonsterWhereInput | MonsterWhereInput[]
    id?: StringFilter<"Monster"> | string
    name?: StringFilter<"Monster"> | string
    size?: StringNullableFilter<"Monster"> | string | null
    type?: StringNullableFilter<"Monster"> | string | null
    alignment?: StringNullableFilter<"Monster"> | string | null
    habitat?: StringNullableFilter<"Monster"> | string | null
    mainHabitat?: StringNullableFilter<"Monster"> | string | null
    otherHabitat?: StringNullableFilter<"Monster"> | string | null
    treasure?: StringNullableFilter<"Monster"> | string | null
    ac?: StringNullableFilter<"Monster"> | string | null
    hp?: StringNullableFilter<"Monster"> | string | null
    initiative?: StringNullableFilter<"Monster"> | string | null
    walk?: StringNullableFilter<"Monster"> | string | null
    burrow?: StringNullableFilter<"Monster"> | string | null
    climb?: StringNullableFilter<"Monster"> | string | null
    fly?: StringNullableFilter<"Monster"> | string | null
    hover?: StringNullableFilter<"Monster"> | string | null
    swim?: StringNullableFilter<"Monster"> | string | null
    strMod?: StringNullableFilter<"Monster"> | string | null
    intMod?: StringNullableFilter<"Monster"> | string | null
    dexMod?: StringNullableFilter<"Monster"> | string | null
    wisMod?: StringNullableFilter<"Monster"> | string | null
    conMod?: StringNullableFilter<"Monster"> | string | null
    chaMod?: StringNullableFilter<"Monster"> | string | null
    strSave?: StringNullableFilter<"Monster"> | string | null
    intSave?: StringNullableFilter<"Monster"> | string | null
    dexSave?: StringNullableFilter<"Monster"> | string | null
    wisSave?: StringNullableFilter<"Monster"> | string | null
    conSave?: StringNullableFilter<"Monster"> | string | null
    chaSave?: StringNullableFilter<"Monster"> | string | null
    proficient?: StringNullableFilter<"Monster"> | string | null
    expertise?: StringNullableFilter<"Monster"> | string | null
    vulnerabilities?: StringNullableFilter<"Monster"> | string | null
    slashing?: StringNullableFilter<"Monster"> | string | null
    immunitiesConditions?: StringNullableFilter<"Monster"> | string | null
    immunitiesDamage?: StringNullableFilter<"Monster"> | string | null
    blindsight?: StringNullableFilter<"Monster"> | string | null
    darkvision?: StringNullableFilter<"Monster"> | string | null
    truesight?: StringNullableFilter<"Monster"> | string | null
    tremorsense?: StringNullableFilter<"Monster"> | string | null
    passivePerception?: StringNullableFilter<"Monster"> | string | null
    languages?: StringNullableFilter<"Monster"> | string | null
    cr?: StringNullableFilter<"Monster"> | string | null
    xpVal?: StringNullableFilter<"Monster"> | string | null
    pb?: StringNullableFilter<"Monster"> | string | null
    traits?: StringNullableFilter<"Monster"> | string | null
    legendaryResistanceCount?: StringNullableFilter<"Monster"> | string | null
    numberOfAtk?: StringNullableFilter<"Monster"> | string | null
    atk1Type?: StringNullableFilter<"Monster"> | string | null
    atk1Mod?: StringNullableFilter<"Monster"> | string | null
    atk1Range?: StringNullableFilter<"Monster"> | string | null
    atk1RangeShort?: StringNullableFilter<"Monster"> | string | null
    atk1Dam?: StringNullableFilter<"Monster"> | string | null
    atk1DamageType?: StringNullableFilter<"Monster"> | string | null
    atk2Type?: StringNullableFilter<"Monster"> | string | null
    atk2Mod?: StringNullableFilter<"Monster"> | string | null
    atk2Range?: StringNullableFilter<"Monster"> | string | null
    atk2RangeShort?: StringNullableFilter<"Monster"> | string | null
    atk2Dam?: StringNullableFilter<"Monster"> | string | null
    atk2DamageType?: StringNullableFilter<"Monster"> | string | null
    atk3Type?: StringNullableFilter<"Monster"> | string | null
    atk3Mod?: StringNullableFilter<"Monster"> | string | null
    atk3Range?: StringNullableFilter<"Monster"> | string | null
    atk3RangeShort?: StringNullableFilter<"Monster"> | string | null
    atk3Dam?: StringNullableFilter<"Monster"> | string | null
    atk3DamageType?: StringNullableFilter<"Monster"> | string | null
    atk4Type?: StringNullableFilter<"Monster"> | string | null
    atk4Mod?: StringNullableFilter<"Monster"> | string | null
    atk4Range?: StringNullableFilter<"Monster"> | string | null
    atk4RangeShort?: StringNullableFilter<"Monster"> | string | null
    atk4Dam?: StringNullableFilter<"Monster"> | string | null
    atk4DamageType?: StringNullableFilter<"Monster"> | string | null
    saveDC?: StringNullableFilter<"Monster"> | string | null
    savingThrow?: StringNullableFilter<"Monster"> | string | null
    actionNotes?: StringNullableFilter<"Monster"> | string | null
    ability?: StringNullableFilter<"Monster"> | string | null
    spellSaveDC?: StringNullableFilter<"Monster"> | string | null
    spellSavingThrows?: StringNullableFilter<"Monster"> | string | null
    spellAttack?: StringNullableFilter<"Monster"> | string | null
    atWillSpells?: StringNullableFilter<"Monster"> | string | null
    threePerDaySpells?: StringNullableFilter<"Monster"> | string | null
    twoPerDaySpells?: StringNullableFilter<"Monster"> | string | null
    onePerDaySpells?: StringNullableFilter<"Monster"> | string | null
    bonusAction?: StringNullableFilter<"Monster"> | string | null
    reaction?: StringNullableFilter<"Monster"> | string | null
    amount?: StringNullableFilter<"Monster"> | string | null
    legendaryActionSaveDC?: StringNullableFilter<"Monster"> | string | null
    legendaryActionSavingThrow?: StringNullableFilter<"Monster"> | string | null
    legendaryActions?: StringNullableFilter<"Monster"> | string | null
    lair?: StringNullableFilter<"Monster"> | string | null
    xpLair?: StringNullableFilter<"Monster"> | string | null
    legendaryResistance?: StringNullableFilter<"Monster"> | string | null
    legendaryActionsLair?: StringNullableFilter<"Monster"> | string | null
    lairSaveDC?: StringNullableFilter<"Monster"> | string | null
    lairSavingThrows?: StringNullableFilter<"Monster"> | string | null
    other?: StringNullableFilter<"Monster"> | string | null
    align?: StringNullableFilter<"Monster"> | string | null
    speeds?: StringNullableFilter<"Monster"> | string | null
    strScore?: StringNullableFilter<"Monster"> | string | null
    dexScore?: StringNullableFilter<"Monster"> | string | null
    conScore?: StringNullableFilter<"Monster"> | string | null
    intScore?: StringNullableFilter<"Monster"> | string | null
    wisScore?: StringNullableFilter<"Monster"> | string | null
    chaScore?: StringNullableFilter<"Monster"> | string | null
    savThrows?: StringNullableFilter<"Monster"> | string | null
    skills?: StringNullableFilter<"Monster"> | string | null
    wri?: StringNullableFilter<"Monster"> | string | null
    senses?: StringNullableFilter<"Monster"> | string | null
    additional?: StringNullableFilter<"Monster"> | string | null
    font?: StringNullableFilter<"Monster"> | string | null
    additionalInfo?: StringNullableFilter<"Monster"> | string | null
    author?: StringNullableFilter<"Monster"> | string | null
  }

  export type MonsterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    alignment?: SortOrderInput | SortOrder
    habitat?: SortOrderInput | SortOrder
    mainHabitat?: SortOrderInput | SortOrder
    otherHabitat?: SortOrderInput | SortOrder
    treasure?: SortOrderInput | SortOrder
    ac?: SortOrderInput | SortOrder
    hp?: SortOrderInput | SortOrder
    initiative?: SortOrderInput | SortOrder
    walk?: SortOrderInput | SortOrder
    burrow?: SortOrderInput | SortOrder
    climb?: SortOrderInput | SortOrder
    fly?: SortOrderInput | SortOrder
    hover?: SortOrderInput | SortOrder
    swim?: SortOrderInput | SortOrder
    strMod?: SortOrderInput | SortOrder
    intMod?: SortOrderInput | SortOrder
    dexMod?: SortOrderInput | SortOrder
    wisMod?: SortOrderInput | SortOrder
    conMod?: SortOrderInput | SortOrder
    chaMod?: SortOrderInput | SortOrder
    strSave?: SortOrderInput | SortOrder
    intSave?: SortOrderInput | SortOrder
    dexSave?: SortOrderInput | SortOrder
    wisSave?: SortOrderInput | SortOrder
    conSave?: SortOrderInput | SortOrder
    chaSave?: SortOrderInput | SortOrder
    proficient?: SortOrderInput | SortOrder
    expertise?: SortOrderInput | SortOrder
    vulnerabilities?: SortOrderInput | SortOrder
    slashing?: SortOrderInput | SortOrder
    immunitiesConditions?: SortOrderInput | SortOrder
    immunitiesDamage?: SortOrderInput | SortOrder
    blindsight?: SortOrderInput | SortOrder
    darkvision?: SortOrderInput | SortOrder
    truesight?: SortOrderInput | SortOrder
    tremorsense?: SortOrderInput | SortOrder
    passivePerception?: SortOrderInput | SortOrder
    languages?: SortOrderInput | SortOrder
    cr?: SortOrderInput | SortOrder
    xpVal?: SortOrderInput | SortOrder
    pb?: SortOrderInput | SortOrder
    traits?: SortOrderInput | SortOrder
    legendaryResistanceCount?: SortOrderInput | SortOrder
    numberOfAtk?: SortOrderInput | SortOrder
    atk1Type?: SortOrderInput | SortOrder
    atk1Mod?: SortOrderInput | SortOrder
    atk1Range?: SortOrderInput | SortOrder
    atk1RangeShort?: SortOrderInput | SortOrder
    atk1Dam?: SortOrderInput | SortOrder
    atk1DamageType?: SortOrderInput | SortOrder
    atk2Type?: SortOrderInput | SortOrder
    atk2Mod?: SortOrderInput | SortOrder
    atk2Range?: SortOrderInput | SortOrder
    atk2RangeShort?: SortOrderInput | SortOrder
    atk2Dam?: SortOrderInput | SortOrder
    atk2DamageType?: SortOrderInput | SortOrder
    atk3Type?: SortOrderInput | SortOrder
    atk3Mod?: SortOrderInput | SortOrder
    atk3Range?: SortOrderInput | SortOrder
    atk3RangeShort?: SortOrderInput | SortOrder
    atk3Dam?: SortOrderInput | SortOrder
    atk3DamageType?: SortOrderInput | SortOrder
    atk4Type?: SortOrderInput | SortOrder
    atk4Mod?: SortOrderInput | SortOrder
    atk4Range?: SortOrderInput | SortOrder
    atk4RangeShort?: SortOrderInput | SortOrder
    atk4Dam?: SortOrderInput | SortOrder
    atk4DamageType?: SortOrderInput | SortOrder
    saveDC?: SortOrderInput | SortOrder
    savingThrow?: SortOrderInput | SortOrder
    actionNotes?: SortOrderInput | SortOrder
    ability?: SortOrderInput | SortOrder
    spellSaveDC?: SortOrderInput | SortOrder
    spellSavingThrows?: SortOrderInput | SortOrder
    spellAttack?: SortOrderInput | SortOrder
    atWillSpells?: SortOrderInput | SortOrder
    threePerDaySpells?: SortOrderInput | SortOrder
    twoPerDaySpells?: SortOrderInput | SortOrder
    onePerDaySpells?: SortOrderInput | SortOrder
    bonusAction?: SortOrderInput | SortOrder
    reaction?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    legendaryActionSaveDC?: SortOrderInput | SortOrder
    legendaryActionSavingThrow?: SortOrderInput | SortOrder
    legendaryActions?: SortOrderInput | SortOrder
    lair?: SortOrderInput | SortOrder
    xpLair?: SortOrderInput | SortOrder
    legendaryResistance?: SortOrderInput | SortOrder
    legendaryActionsLair?: SortOrderInput | SortOrder
    lairSaveDC?: SortOrderInput | SortOrder
    lairSavingThrows?: SortOrderInput | SortOrder
    other?: SortOrderInput | SortOrder
    align?: SortOrderInput | SortOrder
    speeds?: SortOrderInput | SortOrder
    strScore?: SortOrderInput | SortOrder
    dexScore?: SortOrderInput | SortOrder
    conScore?: SortOrderInput | SortOrder
    intScore?: SortOrderInput | SortOrder
    wisScore?: SortOrderInput | SortOrder
    chaScore?: SortOrderInput | SortOrder
    savThrows?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    wri?: SortOrderInput | SortOrder
    senses?: SortOrderInput | SortOrder
    additional?: SortOrderInput | SortOrder
    font?: SortOrderInput | SortOrder
    additionalInfo?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
  }

  export type MonsterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MonsterWhereInput | MonsterWhereInput[]
    OR?: MonsterWhereInput[]
    NOT?: MonsterWhereInput | MonsterWhereInput[]
    name?: StringFilter<"Monster"> | string
    size?: StringNullableFilter<"Monster"> | string | null
    type?: StringNullableFilter<"Monster"> | string | null
    alignment?: StringNullableFilter<"Monster"> | string | null
    habitat?: StringNullableFilter<"Monster"> | string | null
    mainHabitat?: StringNullableFilter<"Monster"> | string | null
    otherHabitat?: StringNullableFilter<"Monster"> | string | null
    treasure?: StringNullableFilter<"Monster"> | string | null
    ac?: StringNullableFilter<"Monster"> | string | null
    hp?: StringNullableFilter<"Monster"> | string | null
    initiative?: StringNullableFilter<"Monster"> | string | null
    walk?: StringNullableFilter<"Monster"> | string | null
    burrow?: StringNullableFilter<"Monster"> | string | null
    climb?: StringNullableFilter<"Monster"> | string | null
    fly?: StringNullableFilter<"Monster"> | string | null
    hover?: StringNullableFilter<"Monster"> | string | null
    swim?: StringNullableFilter<"Monster"> | string | null
    strMod?: StringNullableFilter<"Monster"> | string | null
    intMod?: StringNullableFilter<"Monster"> | string | null
    dexMod?: StringNullableFilter<"Monster"> | string | null
    wisMod?: StringNullableFilter<"Monster"> | string | null
    conMod?: StringNullableFilter<"Monster"> | string | null
    chaMod?: StringNullableFilter<"Monster"> | string | null
    strSave?: StringNullableFilter<"Monster"> | string | null
    intSave?: StringNullableFilter<"Monster"> | string | null
    dexSave?: StringNullableFilter<"Monster"> | string | null
    wisSave?: StringNullableFilter<"Monster"> | string | null
    conSave?: StringNullableFilter<"Monster"> | string | null
    chaSave?: StringNullableFilter<"Monster"> | string | null
    proficient?: StringNullableFilter<"Monster"> | string | null
    expertise?: StringNullableFilter<"Monster"> | string | null
    vulnerabilities?: StringNullableFilter<"Monster"> | string | null
    slashing?: StringNullableFilter<"Monster"> | string | null
    immunitiesConditions?: StringNullableFilter<"Monster"> | string | null
    immunitiesDamage?: StringNullableFilter<"Monster"> | string | null
    blindsight?: StringNullableFilter<"Monster"> | string | null
    darkvision?: StringNullableFilter<"Monster"> | string | null
    truesight?: StringNullableFilter<"Monster"> | string | null
    tremorsense?: StringNullableFilter<"Monster"> | string | null
    passivePerception?: StringNullableFilter<"Monster"> | string | null
    languages?: StringNullableFilter<"Monster"> | string | null
    cr?: StringNullableFilter<"Monster"> | string | null
    xpVal?: StringNullableFilter<"Monster"> | string | null
    pb?: StringNullableFilter<"Monster"> | string | null
    traits?: StringNullableFilter<"Monster"> | string | null
    legendaryResistanceCount?: StringNullableFilter<"Monster"> | string | null
    numberOfAtk?: StringNullableFilter<"Monster"> | string | null
    atk1Type?: StringNullableFilter<"Monster"> | string | null
    atk1Mod?: StringNullableFilter<"Monster"> | string | null
    atk1Range?: StringNullableFilter<"Monster"> | string | null
    atk1RangeShort?: StringNullableFilter<"Monster"> | string | null
    atk1Dam?: StringNullableFilter<"Monster"> | string | null
    atk1DamageType?: StringNullableFilter<"Monster"> | string | null
    atk2Type?: StringNullableFilter<"Monster"> | string | null
    atk2Mod?: StringNullableFilter<"Monster"> | string | null
    atk2Range?: StringNullableFilter<"Monster"> | string | null
    atk2RangeShort?: StringNullableFilter<"Monster"> | string | null
    atk2Dam?: StringNullableFilter<"Monster"> | string | null
    atk2DamageType?: StringNullableFilter<"Monster"> | string | null
    atk3Type?: StringNullableFilter<"Monster"> | string | null
    atk3Mod?: StringNullableFilter<"Monster"> | string | null
    atk3Range?: StringNullableFilter<"Monster"> | string | null
    atk3RangeShort?: StringNullableFilter<"Monster"> | string | null
    atk3Dam?: StringNullableFilter<"Monster"> | string | null
    atk3DamageType?: StringNullableFilter<"Monster"> | string | null
    atk4Type?: StringNullableFilter<"Monster"> | string | null
    atk4Mod?: StringNullableFilter<"Monster"> | string | null
    atk4Range?: StringNullableFilter<"Monster"> | string | null
    atk4RangeShort?: StringNullableFilter<"Monster"> | string | null
    atk4Dam?: StringNullableFilter<"Monster"> | string | null
    atk4DamageType?: StringNullableFilter<"Monster"> | string | null
    saveDC?: StringNullableFilter<"Monster"> | string | null
    savingThrow?: StringNullableFilter<"Monster"> | string | null
    actionNotes?: StringNullableFilter<"Monster"> | string | null
    ability?: StringNullableFilter<"Monster"> | string | null
    spellSaveDC?: StringNullableFilter<"Monster"> | string | null
    spellSavingThrows?: StringNullableFilter<"Monster"> | string | null
    spellAttack?: StringNullableFilter<"Monster"> | string | null
    atWillSpells?: StringNullableFilter<"Monster"> | string | null
    threePerDaySpells?: StringNullableFilter<"Monster"> | string | null
    twoPerDaySpells?: StringNullableFilter<"Monster"> | string | null
    onePerDaySpells?: StringNullableFilter<"Monster"> | string | null
    bonusAction?: StringNullableFilter<"Monster"> | string | null
    reaction?: StringNullableFilter<"Monster"> | string | null
    amount?: StringNullableFilter<"Monster"> | string | null
    legendaryActionSaveDC?: StringNullableFilter<"Monster"> | string | null
    legendaryActionSavingThrow?: StringNullableFilter<"Monster"> | string | null
    legendaryActions?: StringNullableFilter<"Monster"> | string | null
    lair?: StringNullableFilter<"Monster"> | string | null
    xpLair?: StringNullableFilter<"Monster"> | string | null
    legendaryResistance?: StringNullableFilter<"Monster"> | string | null
    legendaryActionsLair?: StringNullableFilter<"Monster"> | string | null
    lairSaveDC?: StringNullableFilter<"Monster"> | string | null
    lairSavingThrows?: StringNullableFilter<"Monster"> | string | null
    other?: StringNullableFilter<"Monster"> | string | null
    align?: StringNullableFilter<"Monster"> | string | null
    speeds?: StringNullableFilter<"Monster"> | string | null
    strScore?: StringNullableFilter<"Monster"> | string | null
    dexScore?: StringNullableFilter<"Monster"> | string | null
    conScore?: StringNullableFilter<"Monster"> | string | null
    intScore?: StringNullableFilter<"Monster"> | string | null
    wisScore?: StringNullableFilter<"Monster"> | string | null
    chaScore?: StringNullableFilter<"Monster"> | string | null
    savThrows?: StringNullableFilter<"Monster"> | string | null
    skills?: StringNullableFilter<"Monster"> | string | null
    wri?: StringNullableFilter<"Monster"> | string | null
    senses?: StringNullableFilter<"Monster"> | string | null
    additional?: StringNullableFilter<"Monster"> | string | null
    font?: StringNullableFilter<"Monster"> | string | null
    additionalInfo?: StringNullableFilter<"Monster"> | string | null
    author?: StringNullableFilter<"Monster"> | string | null
  }, "id">

  export type MonsterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    alignment?: SortOrderInput | SortOrder
    habitat?: SortOrderInput | SortOrder
    mainHabitat?: SortOrderInput | SortOrder
    otherHabitat?: SortOrderInput | SortOrder
    treasure?: SortOrderInput | SortOrder
    ac?: SortOrderInput | SortOrder
    hp?: SortOrderInput | SortOrder
    initiative?: SortOrderInput | SortOrder
    walk?: SortOrderInput | SortOrder
    burrow?: SortOrderInput | SortOrder
    climb?: SortOrderInput | SortOrder
    fly?: SortOrderInput | SortOrder
    hover?: SortOrderInput | SortOrder
    swim?: SortOrderInput | SortOrder
    strMod?: SortOrderInput | SortOrder
    intMod?: SortOrderInput | SortOrder
    dexMod?: SortOrderInput | SortOrder
    wisMod?: SortOrderInput | SortOrder
    conMod?: SortOrderInput | SortOrder
    chaMod?: SortOrderInput | SortOrder
    strSave?: SortOrderInput | SortOrder
    intSave?: SortOrderInput | SortOrder
    dexSave?: SortOrderInput | SortOrder
    wisSave?: SortOrderInput | SortOrder
    conSave?: SortOrderInput | SortOrder
    chaSave?: SortOrderInput | SortOrder
    proficient?: SortOrderInput | SortOrder
    expertise?: SortOrderInput | SortOrder
    vulnerabilities?: SortOrderInput | SortOrder
    slashing?: SortOrderInput | SortOrder
    immunitiesConditions?: SortOrderInput | SortOrder
    immunitiesDamage?: SortOrderInput | SortOrder
    blindsight?: SortOrderInput | SortOrder
    darkvision?: SortOrderInput | SortOrder
    truesight?: SortOrderInput | SortOrder
    tremorsense?: SortOrderInput | SortOrder
    passivePerception?: SortOrderInput | SortOrder
    languages?: SortOrderInput | SortOrder
    cr?: SortOrderInput | SortOrder
    xpVal?: SortOrderInput | SortOrder
    pb?: SortOrderInput | SortOrder
    traits?: SortOrderInput | SortOrder
    legendaryResistanceCount?: SortOrderInput | SortOrder
    numberOfAtk?: SortOrderInput | SortOrder
    atk1Type?: SortOrderInput | SortOrder
    atk1Mod?: SortOrderInput | SortOrder
    atk1Range?: SortOrderInput | SortOrder
    atk1RangeShort?: SortOrderInput | SortOrder
    atk1Dam?: SortOrderInput | SortOrder
    atk1DamageType?: SortOrderInput | SortOrder
    atk2Type?: SortOrderInput | SortOrder
    atk2Mod?: SortOrderInput | SortOrder
    atk2Range?: SortOrderInput | SortOrder
    atk2RangeShort?: SortOrderInput | SortOrder
    atk2Dam?: SortOrderInput | SortOrder
    atk2DamageType?: SortOrderInput | SortOrder
    atk3Type?: SortOrderInput | SortOrder
    atk3Mod?: SortOrderInput | SortOrder
    atk3Range?: SortOrderInput | SortOrder
    atk3RangeShort?: SortOrderInput | SortOrder
    atk3Dam?: SortOrderInput | SortOrder
    atk3DamageType?: SortOrderInput | SortOrder
    atk4Type?: SortOrderInput | SortOrder
    atk4Mod?: SortOrderInput | SortOrder
    atk4Range?: SortOrderInput | SortOrder
    atk4RangeShort?: SortOrderInput | SortOrder
    atk4Dam?: SortOrderInput | SortOrder
    atk4DamageType?: SortOrderInput | SortOrder
    saveDC?: SortOrderInput | SortOrder
    savingThrow?: SortOrderInput | SortOrder
    actionNotes?: SortOrderInput | SortOrder
    ability?: SortOrderInput | SortOrder
    spellSaveDC?: SortOrderInput | SortOrder
    spellSavingThrows?: SortOrderInput | SortOrder
    spellAttack?: SortOrderInput | SortOrder
    atWillSpells?: SortOrderInput | SortOrder
    threePerDaySpells?: SortOrderInput | SortOrder
    twoPerDaySpells?: SortOrderInput | SortOrder
    onePerDaySpells?: SortOrderInput | SortOrder
    bonusAction?: SortOrderInput | SortOrder
    reaction?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    legendaryActionSaveDC?: SortOrderInput | SortOrder
    legendaryActionSavingThrow?: SortOrderInput | SortOrder
    legendaryActions?: SortOrderInput | SortOrder
    lair?: SortOrderInput | SortOrder
    xpLair?: SortOrderInput | SortOrder
    legendaryResistance?: SortOrderInput | SortOrder
    legendaryActionsLair?: SortOrderInput | SortOrder
    lairSaveDC?: SortOrderInput | SortOrder
    lairSavingThrows?: SortOrderInput | SortOrder
    other?: SortOrderInput | SortOrder
    align?: SortOrderInput | SortOrder
    speeds?: SortOrderInput | SortOrder
    strScore?: SortOrderInput | SortOrder
    dexScore?: SortOrderInput | SortOrder
    conScore?: SortOrderInput | SortOrder
    intScore?: SortOrderInput | SortOrder
    wisScore?: SortOrderInput | SortOrder
    chaScore?: SortOrderInput | SortOrder
    savThrows?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    wri?: SortOrderInput | SortOrder
    senses?: SortOrderInput | SortOrder
    additional?: SortOrderInput | SortOrder
    font?: SortOrderInput | SortOrder
    additionalInfo?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    _count?: MonsterCountOrderByAggregateInput
    _max?: MonsterMaxOrderByAggregateInput
    _min?: MonsterMinOrderByAggregateInput
  }

  export type MonsterScalarWhereWithAggregatesInput = {
    AND?: MonsterScalarWhereWithAggregatesInput | MonsterScalarWhereWithAggregatesInput[]
    OR?: MonsterScalarWhereWithAggregatesInput[]
    NOT?: MonsterScalarWhereWithAggregatesInput | MonsterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Monster"> | string
    name?: StringWithAggregatesFilter<"Monster"> | string
    size?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    type?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    alignment?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    habitat?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    mainHabitat?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    otherHabitat?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    treasure?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    ac?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    hp?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    initiative?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    walk?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    burrow?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    climb?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    fly?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    hover?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    swim?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    strMod?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    intMod?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    dexMod?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    wisMod?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    conMod?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    chaMod?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    strSave?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    intSave?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    dexSave?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    wisSave?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    conSave?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    chaSave?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    proficient?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    expertise?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    vulnerabilities?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    slashing?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    immunitiesConditions?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    immunitiesDamage?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    blindsight?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    darkvision?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    truesight?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    tremorsense?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    passivePerception?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    languages?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    cr?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    xpVal?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    pb?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    traits?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    legendaryResistanceCount?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    numberOfAtk?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk1Type?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk1Mod?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk1Range?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk1RangeShort?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk1Dam?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk1DamageType?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk2Type?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk2Mod?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk2Range?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk2RangeShort?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk2Dam?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk2DamageType?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk3Type?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk3Mod?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk3Range?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk3RangeShort?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk3Dam?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk3DamageType?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk4Type?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk4Mod?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk4Range?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk4RangeShort?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk4Dam?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atk4DamageType?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    saveDC?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    savingThrow?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    actionNotes?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    ability?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    spellSaveDC?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    spellSavingThrows?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    spellAttack?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    atWillSpells?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    threePerDaySpells?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    twoPerDaySpells?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    onePerDaySpells?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    bonusAction?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    reaction?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    amount?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    legendaryActionSaveDC?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    legendaryActionSavingThrow?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    legendaryActions?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    lair?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    xpLair?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    legendaryResistance?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    legendaryActionsLair?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    lairSaveDC?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    lairSavingThrows?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    other?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    align?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    speeds?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    strScore?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    dexScore?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    conScore?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    intScore?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    wisScore?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    chaScore?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    savThrows?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    skills?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    wri?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    senses?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    additional?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    font?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    additionalInfo?: StringNullableWithAggregatesFilter<"Monster"> | string | null
    author?: StringNullableWithAggregatesFilter<"Monster"> | string | null
  }

  export type RaceWhereInput = {
    AND?: RaceWhereInput | RaceWhereInput[]
    OR?: RaceWhereInput[]
    NOT?: RaceWhereInput | RaceWhereInput[]
    id?: IntFilter<"Race"> | number
    race?: StringFilter<"Race"> | string
    str?: StringNullableFilter<"Race"> | string | null
    dex?: StringNullableFilter<"Race"> | string | null
    con?: StringNullableFilter<"Race"> | string | null
    int?: StringNullableFilter<"Race"> | string | null
    wis?: StringNullableFilter<"Race"> | string | null
    cha?: StringNullableFilter<"Race"> | string | null
    special?: StringNullableFilter<"Race"> | string | null
    source?: StringFilter<"Race"> | string
    notes?: StringNullableFilter<"Race"> | string | null
  }

  export type RaceOrderByWithRelationInput = {
    id?: SortOrder
    race?: SortOrder
    str?: SortOrderInput | SortOrder
    dex?: SortOrderInput | SortOrder
    con?: SortOrderInput | SortOrder
    int?: SortOrderInput | SortOrder
    wis?: SortOrderInput | SortOrder
    cha?: SortOrderInput | SortOrder
    special?: SortOrderInput | SortOrder
    source?: SortOrder
    notes?: SortOrderInput | SortOrder
  }

  export type RaceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    race?: string
    AND?: RaceWhereInput | RaceWhereInput[]
    OR?: RaceWhereInput[]
    NOT?: RaceWhereInput | RaceWhereInput[]
    str?: StringNullableFilter<"Race"> | string | null
    dex?: StringNullableFilter<"Race"> | string | null
    con?: StringNullableFilter<"Race"> | string | null
    int?: StringNullableFilter<"Race"> | string | null
    wis?: StringNullableFilter<"Race"> | string | null
    cha?: StringNullableFilter<"Race"> | string | null
    special?: StringNullableFilter<"Race"> | string | null
    source?: StringFilter<"Race"> | string
    notes?: StringNullableFilter<"Race"> | string | null
  }, "id" | "race">

  export type RaceOrderByWithAggregationInput = {
    id?: SortOrder
    race?: SortOrder
    str?: SortOrderInput | SortOrder
    dex?: SortOrderInput | SortOrder
    con?: SortOrderInput | SortOrder
    int?: SortOrderInput | SortOrder
    wis?: SortOrderInput | SortOrder
    cha?: SortOrderInput | SortOrder
    special?: SortOrderInput | SortOrder
    source?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: RaceCountOrderByAggregateInput
    _avg?: RaceAvgOrderByAggregateInput
    _max?: RaceMaxOrderByAggregateInput
    _min?: RaceMinOrderByAggregateInput
    _sum?: RaceSumOrderByAggregateInput
  }

  export type RaceScalarWhereWithAggregatesInput = {
    AND?: RaceScalarWhereWithAggregatesInput | RaceScalarWhereWithAggregatesInput[]
    OR?: RaceScalarWhereWithAggregatesInput[]
    NOT?: RaceScalarWhereWithAggregatesInput | RaceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Race"> | number
    race?: StringWithAggregatesFilter<"Race"> | string
    str?: StringNullableWithAggregatesFilter<"Race"> | string | null
    dex?: StringNullableWithAggregatesFilter<"Race"> | string | null
    con?: StringNullableWithAggregatesFilter<"Race"> | string | null
    int?: StringNullableWithAggregatesFilter<"Race"> | string | null
    wis?: StringNullableWithAggregatesFilter<"Race"> | string | null
    cha?: StringNullableWithAggregatesFilter<"Race"> | string | null
    special?: StringNullableWithAggregatesFilter<"Race"> | string | null
    source?: StringWithAggregatesFilter<"Race"> | string
    notes?: StringNullableWithAggregatesFilter<"Race"> | string | null
  }

  export type SpellWhereInput = {
    AND?: SpellWhereInput | SpellWhereInput[]
    OR?: SpellWhereInput[]
    NOT?: SpellWhereInput | SpellWhereInput[]
    id?: IntFilter<"Spell"> | number
    name?: StringFilter<"Spell"> | string
    level?: StringFilter<"Spell"> | string
    school?: StringFilter<"Spell"> | string
    castingTime?: StringFilter<"Spell"> | string
    duration?: StringFilter<"Spell"> | string
    range?: StringFilter<"Spell"> | string
    area?: StringNullableFilter<"Spell"> | string | null
    attack?: StringNullableFilter<"Spell"> | string | null
    save?: StringNullableFilter<"Spell"> | string | null
    damageEffect?: StringFilter<"Spell"> | string
    ritual?: StringNullableFilter<"Spell"> | string | null
    concentration?: StringNullableFilter<"Spell"> | string | null
    verbal?: StringNullableFilter<"Spell"> | string | null
    somatic?: StringNullableFilter<"Spell"> | string | null
    material?: StringNullableFilter<"Spell"> | string | null
    materialDetails?: StringNullableFilter<"Spell"> | string | null
    source?: StringFilter<"Spell"> | string
    details?: StringFilter<"Spell"> | string
    link?: StringFilter<"Spell"> | string
  }

  export type SpellOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    school?: SortOrder
    castingTime?: SortOrder
    duration?: SortOrder
    range?: SortOrder
    area?: SortOrderInput | SortOrder
    attack?: SortOrderInput | SortOrder
    save?: SortOrderInput | SortOrder
    damageEffect?: SortOrder
    ritual?: SortOrderInput | SortOrder
    concentration?: SortOrderInput | SortOrder
    verbal?: SortOrderInput | SortOrder
    somatic?: SortOrderInput | SortOrder
    material?: SortOrderInput | SortOrder
    materialDetails?: SortOrderInput | SortOrder
    source?: SortOrder
    details?: SortOrder
    link?: SortOrder
  }

  export type SpellWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SpellWhereInput | SpellWhereInput[]
    OR?: SpellWhereInput[]
    NOT?: SpellWhereInput | SpellWhereInput[]
    name?: StringFilter<"Spell"> | string
    level?: StringFilter<"Spell"> | string
    school?: StringFilter<"Spell"> | string
    castingTime?: StringFilter<"Spell"> | string
    duration?: StringFilter<"Spell"> | string
    range?: StringFilter<"Spell"> | string
    area?: StringNullableFilter<"Spell"> | string | null
    attack?: StringNullableFilter<"Spell"> | string | null
    save?: StringNullableFilter<"Spell"> | string | null
    damageEffect?: StringFilter<"Spell"> | string
    ritual?: StringNullableFilter<"Spell"> | string | null
    concentration?: StringNullableFilter<"Spell"> | string | null
    verbal?: StringNullableFilter<"Spell"> | string | null
    somatic?: StringNullableFilter<"Spell"> | string | null
    material?: StringNullableFilter<"Spell"> | string | null
    materialDetails?: StringNullableFilter<"Spell"> | string | null
    source?: StringFilter<"Spell"> | string
    details?: StringFilter<"Spell"> | string
    link?: StringFilter<"Spell"> | string
  }, "id">

  export type SpellOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    school?: SortOrder
    castingTime?: SortOrder
    duration?: SortOrder
    range?: SortOrder
    area?: SortOrderInput | SortOrder
    attack?: SortOrderInput | SortOrder
    save?: SortOrderInput | SortOrder
    damageEffect?: SortOrder
    ritual?: SortOrderInput | SortOrder
    concentration?: SortOrderInput | SortOrder
    verbal?: SortOrderInput | SortOrder
    somatic?: SortOrderInput | SortOrder
    material?: SortOrderInput | SortOrder
    materialDetails?: SortOrderInput | SortOrder
    source?: SortOrder
    details?: SortOrder
    link?: SortOrder
    _count?: SpellCountOrderByAggregateInput
    _avg?: SpellAvgOrderByAggregateInput
    _max?: SpellMaxOrderByAggregateInput
    _min?: SpellMinOrderByAggregateInput
    _sum?: SpellSumOrderByAggregateInput
  }

  export type SpellScalarWhereWithAggregatesInput = {
    AND?: SpellScalarWhereWithAggregatesInput | SpellScalarWhereWithAggregatesInput[]
    OR?: SpellScalarWhereWithAggregatesInput[]
    NOT?: SpellScalarWhereWithAggregatesInput | SpellScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Spell"> | number
    name?: StringWithAggregatesFilter<"Spell"> | string
    level?: StringWithAggregatesFilter<"Spell"> | string
    school?: StringWithAggregatesFilter<"Spell"> | string
    castingTime?: StringWithAggregatesFilter<"Spell"> | string
    duration?: StringWithAggregatesFilter<"Spell"> | string
    range?: StringWithAggregatesFilter<"Spell"> | string
    area?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    attack?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    save?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    damageEffect?: StringWithAggregatesFilter<"Spell"> | string
    ritual?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    concentration?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    verbal?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    somatic?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    material?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    materialDetails?: StringNullableWithAggregatesFilter<"Spell"> | string | null
    source?: StringWithAggregatesFilter<"Spell"> | string
    details?: StringWithAggregatesFilter<"Spell"> | string
    link?: StringWithAggregatesFilter<"Spell"> | string
  }

  export type ClassWhereInput = {
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    id?: IntFilter<"Class"> | number
    class?: StringFilter<"Class"> | string
    subclass?: StringFilter<"Class"> | string
    source?: StringNullableFilter<"Class"> | string | null
    notes?: StringNullableFilter<"Class"> | string | null
    features?: StringNullableFilter<"Class"> | string | null
    level?: StringNullableFilter<"Class"> | string | null
    description?: StringNullableFilter<"Class"> | string | null
  }

  export type ClassOrderByWithRelationInput = {
    id?: SortOrder
    class?: SortOrder
    subclass?: SortOrder
    source?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    features?: SortOrderInput | SortOrder
    level?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
  }

  export type ClassWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    class?: StringFilter<"Class"> | string
    subclass?: StringFilter<"Class"> | string
    source?: StringNullableFilter<"Class"> | string | null
    notes?: StringNullableFilter<"Class"> | string | null
    features?: StringNullableFilter<"Class"> | string | null
    level?: StringNullableFilter<"Class"> | string | null
    description?: StringNullableFilter<"Class"> | string | null
  }, "id">

  export type ClassOrderByWithAggregationInput = {
    id?: SortOrder
    class?: SortOrder
    subclass?: SortOrder
    source?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    features?: SortOrderInput | SortOrder
    level?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    _count?: ClassCountOrderByAggregateInput
    _avg?: ClassAvgOrderByAggregateInput
    _max?: ClassMaxOrderByAggregateInput
    _min?: ClassMinOrderByAggregateInput
    _sum?: ClassSumOrderByAggregateInput
  }

  export type ClassScalarWhereWithAggregatesInput = {
    AND?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    OR?: ClassScalarWhereWithAggregatesInput[]
    NOT?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Class"> | number
    class?: StringWithAggregatesFilter<"Class"> | string
    subclass?: StringWithAggregatesFilter<"Class"> | string
    source?: StringNullableWithAggregatesFilter<"Class"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Class"> | string | null
    features?: StringNullableWithAggregatesFilter<"Class"> | string | null
    level?: StringNullableWithAggregatesFilter<"Class"> | string | null
    description?: StringNullableWithAggregatesFilter<"Class"> | string | null
  }

  export type MagicItemWhereInput = {
    AND?: MagicItemWhereInput | MagicItemWhereInput[]
    OR?: MagicItemWhereInput[]
    NOT?: MagicItemWhereInput | MagicItemWhereInput[]
    id?: IntFilter<"MagicItem"> | number
    name?: StringFilter<"MagicItem"> | string
    rarity?: StringNullableFilter<"MagicItem"> | string | null
    attunement?: StringNullableFilter<"MagicItem"> | string | null
    costGp?: IntNullableFilter<"MagicItem"> | number | null
    note?: StringNullableFilter<"MagicItem"> | string | null
    armorCost?: IntNullableFilter<"MagicItem"> | number | null
    rareMaterial?: StringNullableFilter<"MagicItem"> | string | null
    acBonus?: IntNullableFilter<"MagicItem"> | number | null
    saveBonus?: IntNullableFilter<"MagicItem"> | number | null
    setScoreModifier?: IntNullableFilter<"MagicItem"> | number | null
    plusTwoBonusToScore?: StringNullableFilter<"MagicItem"> | string | null
    weaponBonus?: IntNullableFilter<"MagicItem"> | number | null
    spellLevel?: IntNullableFilter<"MagicItem"> | number | null
    unlimitedCharges?: StringNullableFilter<"MagicItem"> | string | null
    chargesPerDay?: IntNullableFilter<"MagicItem"> | number | null
    chargesPerItem?: IntNullableFilter<"MagicItem"> | number | null
    spellsShareCharges?: IntNullableFilter<"MagicItem"> | number | null
    condition?: StringNullableFilter<"MagicItem"> | string | null
    consumableDamageAvg?: IntNullableFilter<"MagicItem"> | number | null
    consumableSave?: StringNullableFilter<"MagicItem"> | string | null
    semiPermanentDamageAvg?: IntNullableFilter<"MagicItem"> | number | null
    semiPermSave?: StringNullableFilter<"MagicItem"> | string | null
    durationMinutes?: IntNullableFilter<"MagicItem"> | number | null
    permanentDamageAvg?: IntNullableFilter<"MagicItem"> | number | null
    permSave?: StringNullableFilter<"MagicItem"> | string | null
    specificSituations?: StringNullableFilter<"MagicItem"> | string | null
    restoreHpAvg?: IntNullableFilter<"MagicItem"> | number | null
    miscCosts?: IntNullableFilter<"MagicItem"> | number | null
    secondSpellLevel?: IntNullableFilter<"MagicItem"> | number | null
    secondUnlimitedCharges?: StringNullableFilter<"MagicItem"> | string | null
    secondChargesPerDay?: IntNullableFilter<"MagicItem"> | number | null
    thirdSpellLevel?: IntNullableFilter<"MagicItem"> | number | null
    thirdUnlimitedCharges?: StringNullableFilter<"MagicItem"> | string | null
    thirdChargesPerDay?: IntNullableFilter<"MagicItem"> | number | null
    matCost?: IntNullableFilter<"MagicItem"> | number | null
    acCost?: IntNullableFilter<"MagicItem"> | number | null
    saveCost?: IntNullableFilter<"MagicItem"> | number | null
    setScoreCost?: IntNullableFilter<"MagicItem"> | number | null
    bonusScoreCost?: IntNullableFilter<"MagicItem"> | number | null
    weaponCost?: IntNullableFilter<"MagicItem"> | number | null
    consumSpellCost?: IntNullableFilter<"MagicItem"> | number | null
    permChargesCost?: IntNullableFilter<"MagicItem"> | number | null
    chargesDestroyed?: IntNullableFilter<"MagicItem"> | number | null
    spellShareChargesCost?: IntNullableFilter<"MagicItem"> | number | null
    conditionCost?: IntNullableFilter<"MagicItem"> | number | null
    consDMGCost?: IntNullableFilter<"MagicItem"> | number | null
    smPrDMGCost?: IntNullableFilter<"MagicItem"> | number | null
    perDMGCost?: IntNullableFilter<"MagicItem"> | number | null
    avgHPCost?: IntNullableFilter<"MagicItem"> | number | null
    miscCost?: IntNullableFilter<"MagicItem"> | number | null
    secondConsumSpellCost?: IntNullableFilter<"MagicItem"> | number | null
    secondPermChargesCost?: IntNullableFilter<"MagicItem"> | number | null
    thirdConsumSpellCost?: IntNullableFilter<"MagicItem"> | number | null
    thirdPermChargesCost?: IntNullableFilter<"MagicItem"> | number | null
  }

  export type MagicItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    rarity?: SortOrderInput | SortOrder
    attunement?: SortOrderInput | SortOrder
    costGp?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    armorCost?: SortOrderInput | SortOrder
    rareMaterial?: SortOrderInput | SortOrder
    acBonus?: SortOrderInput | SortOrder
    saveBonus?: SortOrderInput | SortOrder
    setScoreModifier?: SortOrderInput | SortOrder
    plusTwoBonusToScore?: SortOrderInput | SortOrder
    weaponBonus?: SortOrderInput | SortOrder
    spellLevel?: SortOrderInput | SortOrder
    unlimitedCharges?: SortOrderInput | SortOrder
    chargesPerDay?: SortOrderInput | SortOrder
    chargesPerItem?: SortOrderInput | SortOrder
    spellsShareCharges?: SortOrderInput | SortOrder
    condition?: SortOrderInput | SortOrder
    consumableDamageAvg?: SortOrderInput | SortOrder
    consumableSave?: SortOrderInput | SortOrder
    semiPermanentDamageAvg?: SortOrderInput | SortOrder
    semiPermSave?: SortOrderInput | SortOrder
    durationMinutes?: SortOrderInput | SortOrder
    permanentDamageAvg?: SortOrderInput | SortOrder
    permSave?: SortOrderInput | SortOrder
    specificSituations?: SortOrderInput | SortOrder
    restoreHpAvg?: SortOrderInput | SortOrder
    miscCosts?: SortOrderInput | SortOrder
    secondSpellLevel?: SortOrderInput | SortOrder
    secondUnlimitedCharges?: SortOrderInput | SortOrder
    secondChargesPerDay?: SortOrderInput | SortOrder
    thirdSpellLevel?: SortOrderInput | SortOrder
    thirdUnlimitedCharges?: SortOrderInput | SortOrder
    thirdChargesPerDay?: SortOrderInput | SortOrder
    matCost?: SortOrderInput | SortOrder
    acCost?: SortOrderInput | SortOrder
    saveCost?: SortOrderInput | SortOrder
    setScoreCost?: SortOrderInput | SortOrder
    bonusScoreCost?: SortOrderInput | SortOrder
    weaponCost?: SortOrderInput | SortOrder
    consumSpellCost?: SortOrderInput | SortOrder
    permChargesCost?: SortOrderInput | SortOrder
    chargesDestroyed?: SortOrderInput | SortOrder
    spellShareChargesCost?: SortOrderInput | SortOrder
    conditionCost?: SortOrderInput | SortOrder
    consDMGCost?: SortOrderInput | SortOrder
    smPrDMGCost?: SortOrderInput | SortOrder
    perDMGCost?: SortOrderInput | SortOrder
    avgHPCost?: SortOrderInput | SortOrder
    miscCost?: SortOrderInput | SortOrder
    secondConsumSpellCost?: SortOrderInput | SortOrder
    secondPermChargesCost?: SortOrderInput | SortOrder
    thirdConsumSpellCost?: SortOrderInput | SortOrder
    thirdPermChargesCost?: SortOrderInput | SortOrder
  }

  export type MagicItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MagicItemWhereInput | MagicItemWhereInput[]
    OR?: MagicItemWhereInput[]
    NOT?: MagicItemWhereInput | MagicItemWhereInput[]
    name?: StringFilter<"MagicItem"> | string
    rarity?: StringNullableFilter<"MagicItem"> | string | null
    attunement?: StringNullableFilter<"MagicItem"> | string | null
    costGp?: IntNullableFilter<"MagicItem"> | number | null
    note?: StringNullableFilter<"MagicItem"> | string | null
    armorCost?: IntNullableFilter<"MagicItem"> | number | null
    rareMaterial?: StringNullableFilter<"MagicItem"> | string | null
    acBonus?: IntNullableFilter<"MagicItem"> | number | null
    saveBonus?: IntNullableFilter<"MagicItem"> | number | null
    setScoreModifier?: IntNullableFilter<"MagicItem"> | number | null
    plusTwoBonusToScore?: StringNullableFilter<"MagicItem"> | string | null
    weaponBonus?: IntNullableFilter<"MagicItem"> | number | null
    spellLevel?: IntNullableFilter<"MagicItem"> | number | null
    unlimitedCharges?: StringNullableFilter<"MagicItem"> | string | null
    chargesPerDay?: IntNullableFilter<"MagicItem"> | number | null
    chargesPerItem?: IntNullableFilter<"MagicItem"> | number | null
    spellsShareCharges?: IntNullableFilter<"MagicItem"> | number | null
    condition?: StringNullableFilter<"MagicItem"> | string | null
    consumableDamageAvg?: IntNullableFilter<"MagicItem"> | number | null
    consumableSave?: StringNullableFilter<"MagicItem"> | string | null
    semiPermanentDamageAvg?: IntNullableFilter<"MagicItem"> | number | null
    semiPermSave?: StringNullableFilter<"MagicItem"> | string | null
    durationMinutes?: IntNullableFilter<"MagicItem"> | number | null
    permanentDamageAvg?: IntNullableFilter<"MagicItem"> | number | null
    permSave?: StringNullableFilter<"MagicItem"> | string | null
    specificSituations?: StringNullableFilter<"MagicItem"> | string | null
    restoreHpAvg?: IntNullableFilter<"MagicItem"> | number | null
    miscCosts?: IntNullableFilter<"MagicItem"> | number | null
    secondSpellLevel?: IntNullableFilter<"MagicItem"> | number | null
    secondUnlimitedCharges?: StringNullableFilter<"MagicItem"> | string | null
    secondChargesPerDay?: IntNullableFilter<"MagicItem"> | number | null
    thirdSpellLevel?: IntNullableFilter<"MagicItem"> | number | null
    thirdUnlimitedCharges?: StringNullableFilter<"MagicItem"> | string | null
    thirdChargesPerDay?: IntNullableFilter<"MagicItem"> | number | null
    matCost?: IntNullableFilter<"MagicItem"> | number | null
    acCost?: IntNullableFilter<"MagicItem"> | number | null
    saveCost?: IntNullableFilter<"MagicItem"> | number | null
    setScoreCost?: IntNullableFilter<"MagicItem"> | number | null
    bonusScoreCost?: IntNullableFilter<"MagicItem"> | number | null
    weaponCost?: IntNullableFilter<"MagicItem"> | number | null
    consumSpellCost?: IntNullableFilter<"MagicItem"> | number | null
    permChargesCost?: IntNullableFilter<"MagicItem"> | number | null
    chargesDestroyed?: IntNullableFilter<"MagicItem"> | number | null
    spellShareChargesCost?: IntNullableFilter<"MagicItem"> | number | null
    conditionCost?: IntNullableFilter<"MagicItem"> | number | null
    consDMGCost?: IntNullableFilter<"MagicItem"> | number | null
    smPrDMGCost?: IntNullableFilter<"MagicItem"> | number | null
    perDMGCost?: IntNullableFilter<"MagicItem"> | number | null
    avgHPCost?: IntNullableFilter<"MagicItem"> | number | null
    miscCost?: IntNullableFilter<"MagicItem"> | number | null
    secondConsumSpellCost?: IntNullableFilter<"MagicItem"> | number | null
    secondPermChargesCost?: IntNullableFilter<"MagicItem"> | number | null
    thirdConsumSpellCost?: IntNullableFilter<"MagicItem"> | number | null
    thirdPermChargesCost?: IntNullableFilter<"MagicItem"> | number | null
  }, "id">

  export type MagicItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    rarity?: SortOrderInput | SortOrder
    attunement?: SortOrderInput | SortOrder
    costGp?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    armorCost?: SortOrderInput | SortOrder
    rareMaterial?: SortOrderInput | SortOrder
    acBonus?: SortOrderInput | SortOrder
    saveBonus?: SortOrderInput | SortOrder
    setScoreModifier?: SortOrderInput | SortOrder
    plusTwoBonusToScore?: SortOrderInput | SortOrder
    weaponBonus?: SortOrderInput | SortOrder
    spellLevel?: SortOrderInput | SortOrder
    unlimitedCharges?: SortOrderInput | SortOrder
    chargesPerDay?: SortOrderInput | SortOrder
    chargesPerItem?: SortOrderInput | SortOrder
    spellsShareCharges?: SortOrderInput | SortOrder
    condition?: SortOrderInput | SortOrder
    consumableDamageAvg?: SortOrderInput | SortOrder
    consumableSave?: SortOrderInput | SortOrder
    semiPermanentDamageAvg?: SortOrderInput | SortOrder
    semiPermSave?: SortOrderInput | SortOrder
    durationMinutes?: SortOrderInput | SortOrder
    permanentDamageAvg?: SortOrderInput | SortOrder
    permSave?: SortOrderInput | SortOrder
    specificSituations?: SortOrderInput | SortOrder
    restoreHpAvg?: SortOrderInput | SortOrder
    miscCosts?: SortOrderInput | SortOrder
    secondSpellLevel?: SortOrderInput | SortOrder
    secondUnlimitedCharges?: SortOrderInput | SortOrder
    secondChargesPerDay?: SortOrderInput | SortOrder
    thirdSpellLevel?: SortOrderInput | SortOrder
    thirdUnlimitedCharges?: SortOrderInput | SortOrder
    thirdChargesPerDay?: SortOrderInput | SortOrder
    matCost?: SortOrderInput | SortOrder
    acCost?: SortOrderInput | SortOrder
    saveCost?: SortOrderInput | SortOrder
    setScoreCost?: SortOrderInput | SortOrder
    bonusScoreCost?: SortOrderInput | SortOrder
    weaponCost?: SortOrderInput | SortOrder
    consumSpellCost?: SortOrderInput | SortOrder
    permChargesCost?: SortOrderInput | SortOrder
    chargesDestroyed?: SortOrderInput | SortOrder
    spellShareChargesCost?: SortOrderInput | SortOrder
    conditionCost?: SortOrderInput | SortOrder
    consDMGCost?: SortOrderInput | SortOrder
    smPrDMGCost?: SortOrderInput | SortOrder
    perDMGCost?: SortOrderInput | SortOrder
    avgHPCost?: SortOrderInput | SortOrder
    miscCost?: SortOrderInput | SortOrder
    secondConsumSpellCost?: SortOrderInput | SortOrder
    secondPermChargesCost?: SortOrderInput | SortOrder
    thirdConsumSpellCost?: SortOrderInput | SortOrder
    thirdPermChargesCost?: SortOrderInput | SortOrder
    _count?: MagicItemCountOrderByAggregateInput
    _avg?: MagicItemAvgOrderByAggregateInput
    _max?: MagicItemMaxOrderByAggregateInput
    _min?: MagicItemMinOrderByAggregateInput
    _sum?: MagicItemSumOrderByAggregateInput
  }

  export type MagicItemScalarWhereWithAggregatesInput = {
    AND?: MagicItemScalarWhereWithAggregatesInput | MagicItemScalarWhereWithAggregatesInput[]
    OR?: MagicItemScalarWhereWithAggregatesInput[]
    NOT?: MagicItemScalarWhereWithAggregatesInput | MagicItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MagicItem"> | number
    name?: StringWithAggregatesFilter<"MagicItem"> | string
    rarity?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    attunement?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    costGp?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    note?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    armorCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    rareMaterial?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    acBonus?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    saveBonus?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    setScoreModifier?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    plusTwoBonusToScore?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    weaponBonus?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    spellLevel?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    unlimitedCharges?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    chargesPerDay?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    chargesPerItem?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    spellsShareCharges?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    condition?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    consumableDamageAvg?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    consumableSave?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    semiPermanentDamageAvg?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    semiPermSave?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    durationMinutes?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    permanentDamageAvg?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    permSave?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    specificSituations?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    restoreHpAvg?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    miscCosts?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    secondSpellLevel?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    secondUnlimitedCharges?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    secondChargesPerDay?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    thirdSpellLevel?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    thirdUnlimitedCharges?: StringNullableWithAggregatesFilter<"MagicItem"> | string | null
    thirdChargesPerDay?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    matCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    acCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    saveCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    setScoreCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    bonusScoreCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    weaponCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    consumSpellCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    permChargesCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    chargesDestroyed?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    spellShareChargesCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    conditionCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    consDMGCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    smPrDMGCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    perDMGCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    avgHPCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    miscCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    secondConsumSpellCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    secondPermChargesCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    thirdConsumSpellCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
    thirdPermChargesCost?: IntNullableWithAggregatesFilter<"MagicItem"> | number | null
  }

  export type GeneralEquipmentWhereInput = {
    AND?: GeneralEquipmentWhereInput | GeneralEquipmentWhereInput[]
    OR?: GeneralEquipmentWhereInput[]
    NOT?: GeneralEquipmentWhereInput | GeneralEquipmentWhereInput[]
    id?: IntFilter<"GeneralEquipment"> | number
    name?: StringFilter<"GeneralEquipment"> | string
    cost?: StringFilter<"GeneralEquipment"> | string
    weightLbs?: StringNullableFilter<"GeneralEquipment"> | string | null
  }

  export type GeneralEquipmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    cost?: SortOrder
    weightLbs?: SortOrderInput | SortOrder
  }

  export type GeneralEquipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: GeneralEquipmentWhereInput | GeneralEquipmentWhereInput[]
    OR?: GeneralEquipmentWhereInput[]
    NOT?: GeneralEquipmentWhereInput | GeneralEquipmentWhereInput[]
    cost?: StringFilter<"GeneralEquipment"> | string
    weightLbs?: StringNullableFilter<"GeneralEquipment"> | string | null
  }, "id" | "name">

  export type GeneralEquipmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    cost?: SortOrder
    weightLbs?: SortOrderInput | SortOrder
    _count?: GeneralEquipmentCountOrderByAggregateInput
    _avg?: GeneralEquipmentAvgOrderByAggregateInput
    _max?: GeneralEquipmentMaxOrderByAggregateInput
    _min?: GeneralEquipmentMinOrderByAggregateInput
    _sum?: GeneralEquipmentSumOrderByAggregateInput
  }

  export type GeneralEquipmentScalarWhereWithAggregatesInput = {
    AND?: GeneralEquipmentScalarWhereWithAggregatesInput | GeneralEquipmentScalarWhereWithAggregatesInput[]
    OR?: GeneralEquipmentScalarWhereWithAggregatesInput[]
    NOT?: GeneralEquipmentScalarWhereWithAggregatesInput | GeneralEquipmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GeneralEquipment"> | number
    name?: StringWithAggregatesFilter<"GeneralEquipment"> | string
    cost?: StringWithAggregatesFilter<"GeneralEquipment"> | string
    weightLbs?: StringNullableWithAggregatesFilter<"GeneralEquipment"> | string | null
  }

  export type MonsterCreateInput = {
    id?: string
    name: string
    size?: string | null
    type?: string | null
    alignment?: string | null
    habitat?: string | null
    mainHabitat?: string | null
    otherHabitat?: string | null
    treasure?: string | null
    ac?: string | null
    hp?: string | null
    initiative?: string | null
    walk?: string | null
    burrow?: string | null
    climb?: string | null
    fly?: string | null
    hover?: string | null
    swim?: string | null
    strMod?: string | null
    intMod?: string | null
    dexMod?: string | null
    wisMod?: string | null
    conMod?: string | null
    chaMod?: string | null
    strSave?: string | null
    intSave?: string | null
    dexSave?: string | null
    wisSave?: string | null
    conSave?: string | null
    chaSave?: string | null
    proficient?: string | null
    expertise?: string | null
    vulnerabilities?: string | null
    slashing?: string | null
    immunitiesConditions?: string | null
    immunitiesDamage?: string | null
    blindsight?: string | null
    darkvision?: string | null
    truesight?: string | null
    tremorsense?: string | null
    passivePerception?: string | null
    languages?: string | null
    cr?: string | null
    xpVal?: string | null
    pb?: string | null
    traits?: string | null
    legendaryResistanceCount?: string | null
    numberOfAtk?: string | null
    atk1Type?: string | null
    atk1Mod?: string | null
    atk1Range?: string | null
    atk1RangeShort?: string | null
    atk1Dam?: string | null
    atk1DamageType?: string | null
    atk2Type?: string | null
    atk2Mod?: string | null
    atk2Range?: string | null
    atk2RangeShort?: string | null
    atk2Dam?: string | null
    atk2DamageType?: string | null
    atk3Type?: string | null
    atk3Mod?: string | null
    atk3Range?: string | null
    atk3RangeShort?: string | null
    atk3Dam?: string | null
    atk3DamageType?: string | null
    atk4Type?: string | null
    atk4Mod?: string | null
    atk4Range?: string | null
    atk4RangeShort?: string | null
    atk4Dam?: string | null
    atk4DamageType?: string | null
    saveDC?: string | null
    savingThrow?: string | null
    actionNotes?: string | null
    ability?: string | null
    spellSaveDC?: string | null
    spellSavingThrows?: string | null
    spellAttack?: string | null
    atWillSpells?: string | null
    threePerDaySpells?: string | null
    twoPerDaySpells?: string | null
    onePerDaySpells?: string | null
    bonusAction?: string | null
    reaction?: string | null
    amount?: string | null
    legendaryActionSaveDC?: string | null
    legendaryActionSavingThrow?: string | null
    legendaryActions?: string | null
    lair?: string | null
    xpLair?: string | null
    legendaryResistance?: string | null
    legendaryActionsLair?: string | null
    lairSaveDC?: string | null
    lairSavingThrows?: string | null
    other?: string | null
    align?: string | null
    speeds?: string | null
    strScore?: string | null
    dexScore?: string | null
    conScore?: string | null
    intScore?: string | null
    wisScore?: string | null
    chaScore?: string | null
    savThrows?: string | null
    skills?: string | null
    wri?: string | null
    senses?: string | null
    additional?: string | null
    font?: string | null
    additionalInfo?: string | null
    author?: string | null
  }

  export type MonsterUncheckedCreateInput = {
    id?: string
    name: string
    size?: string | null
    type?: string | null
    alignment?: string | null
    habitat?: string | null
    mainHabitat?: string | null
    otherHabitat?: string | null
    treasure?: string | null
    ac?: string | null
    hp?: string | null
    initiative?: string | null
    walk?: string | null
    burrow?: string | null
    climb?: string | null
    fly?: string | null
    hover?: string | null
    swim?: string | null
    strMod?: string | null
    intMod?: string | null
    dexMod?: string | null
    wisMod?: string | null
    conMod?: string | null
    chaMod?: string | null
    strSave?: string | null
    intSave?: string | null
    dexSave?: string | null
    wisSave?: string | null
    conSave?: string | null
    chaSave?: string | null
    proficient?: string | null
    expertise?: string | null
    vulnerabilities?: string | null
    slashing?: string | null
    immunitiesConditions?: string | null
    immunitiesDamage?: string | null
    blindsight?: string | null
    darkvision?: string | null
    truesight?: string | null
    tremorsense?: string | null
    passivePerception?: string | null
    languages?: string | null
    cr?: string | null
    xpVal?: string | null
    pb?: string | null
    traits?: string | null
    legendaryResistanceCount?: string | null
    numberOfAtk?: string | null
    atk1Type?: string | null
    atk1Mod?: string | null
    atk1Range?: string | null
    atk1RangeShort?: string | null
    atk1Dam?: string | null
    atk1DamageType?: string | null
    atk2Type?: string | null
    atk2Mod?: string | null
    atk2Range?: string | null
    atk2RangeShort?: string | null
    atk2Dam?: string | null
    atk2DamageType?: string | null
    atk3Type?: string | null
    atk3Mod?: string | null
    atk3Range?: string | null
    atk3RangeShort?: string | null
    atk3Dam?: string | null
    atk3DamageType?: string | null
    atk4Type?: string | null
    atk4Mod?: string | null
    atk4Range?: string | null
    atk4RangeShort?: string | null
    atk4Dam?: string | null
    atk4DamageType?: string | null
    saveDC?: string | null
    savingThrow?: string | null
    actionNotes?: string | null
    ability?: string | null
    spellSaveDC?: string | null
    spellSavingThrows?: string | null
    spellAttack?: string | null
    atWillSpells?: string | null
    threePerDaySpells?: string | null
    twoPerDaySpells?: string | null
    onePerDaySpells?: string | null
    bonusAction?: string | null
    reaction?: string | null
    amount?: string | null
    legendaryActionSaveDC?: string | null
    legendaryActionSavingThrow?: string | null
    legendaryActions?: string | null
    lair?: string | null
    xpLair?: string | null
    legendaryResistance?: string | null
    legendaryActionsLair?: string | null
    lairSaveDC?: string | null
    lairSavingThrows?: string | null
    other?: string | null
    align?: string | null
    speeds?: string | null
    strScore?: string | null
    dexScore?: string | null
    conScore?: string | null
    intScore?: string | null
    wisScore?: string | null
    chaScore?: string | null
    savThrows?: string | null
    skills?: string | null
    wri?: string | null
    senses?: string | null
    additional?: string | null
    font?: string | null
    additionalInfo?: string | null
    author?: string | null
  }

  export type MonsterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    alignment?: NullableStringFieldUpdateOperationsInput | string | null
    habitat?: NullableStringFieldUpdateOperationsInput | string | null
    mainHabitat?: NullableStringFieldUpdateOperationsInput | string | null
    otherHabitat?: NullableStringFieldUpdateOperationsInput | string | null
    treasure?: NullableStringFieldUpdateOperationsInput | string | null
    ac?: NullableStringFieldUpdateOperationsInput | string | null
    hp?: NullableStringFieldUpdateOperationsInput | string | null
    initiative?: NullableStringFieldUpdateOperationsInput | string | null
    walk?: NullableStringFieldUpdateOperationsInput | string | null
    burrow?: NullableStringFieldUpdateOperationsInput | string | null
    climb?: NullableStringFieldUpdateOperationsInput | string | null
    fly?: NullableStringFieldUpdateOperationsInput | string | null
    hover?: NullableStringFieldUpdateOperationsInput | string | null
    swim?: NullableStringFieldUpdateOperationsInput | string | null
    strMod?: NullableStringFieldUpdateOperationsInput | string | null
    intMod?: NullableStringFieldUpdateOperationsInput | string | null
    dexMod?: NullableStringFieldUpdateOperationsInput | string | null
    wisMod?: NullableStringFieldUpdateOperationsInput | string | null
    conMod?: NullableStringFieldUpdateOperationsInput | string | null
    chaMod?: NullableStringFieldUpdateOperationsInput | string | null
    strSave?: NullableStringFieldUpdateOperationsInput | string | null
    intSave?: NullableStringFieldUpdateOperationsInput | string | null
    dexSave?: NullableStringFieldUpdateOperationsInput | string | null
    wisSave?: NullableStringFieldUpdateOperationsInput | string | null
    conSave?: NullableStringFieldUpdateOperationsInput | string | null
    chaSave?: NullableStringFieldUpdateOperationsInput | string | null
    proficient?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    vulnerabilities?: NullableStringFieldUpdateOperationsInput | string | null
    slashing?: NullableStringFieldUpdateOperationsInput | string | null
    immunitiesConditions?: NullableStringFieldUpdateOperationsInput | string | null
    immunitiesDamage?: NullableStringFieldUpdateOperationsInput | string | null
    blindsight?: NullableStringFieldUpdateOperationsInput | string | null
    darkvision?: NullableStringFieldUpdateOperationsInput | string | null
    truesight?: NullableStringFieldUpdateOperationsInput | string | null
    tremorsense?: NullableStringFieldUpdateOperationsInput | string | null
    passivePerception?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableStringFieldUpdateOperationsInput | string | null
    cr?: NullableStringFieldUpdateOperationsInput | string | null
    xpVal?: NullableStringFieldUpdateOperationsInput | string | null
    pb?: NullableStringFieldUpdateOperationsInput | string | null
    traits?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryResistanceCount?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfAtk?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk1RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk1DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk2RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk2DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk3RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk3DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk4RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk4DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    saveDC?: NullableStringFieldUpdateOperationsInput | string | null
    savingThrow?: NullableStringFieldUpdateOperationsInput | string | null
    actionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    ability?: NullableStringFieldUpdateOperationsInput | string | null
    spellSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    spellSavingThrows?: NullableStringFieldUpdateOperationsInput | string | null
    spellAttack?: NullableStringFieldUpdateOperationsInput | string | null
    atWillSpells?: NullableStringFieldUpdateOperationsInput | string | null
    threePerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    twoPerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    onePerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    bonusAction?: NullableStringFieldUpdateOperationsInput | string | null
    reaction?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionSavingThrow?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActions?: NullableStringFieldUpdateOperationsInput | string | null
    lair?: NullableStringFieldUpdateOperationsInput | string | null
    xpLair?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryResistance?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionsLair?: NullableStringFieldUpdateOperationsInput | string | null
    lairSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    lairSavingThrows?: NullableStringFieldUpdateOperationsInput | string | null
    other?: NullableStringFieldUpdateOperationsInput | string | null
    align?: NullableStringFieldUpdateOperationsInput | string | null
    speeds?: NullableStringFieldUpdateOperationsInput | string | null
    strScore?: NullableStringFieldUpdateOperationsInput | string | null
    dexScore?: NullableStringFieldUpdateOperationsInput | string | null
    conScore?: NullableStringFieldUpdateOperationsInput | string | null
    intScore?: NullableStringFieldUpdateOperationsInput | string | null
    wisScore?: NullableStringFieldUpdateOperationsInput | string | null
    chaScore?: NullableStringFieldUpdateOperationsInput | string | null
    savThrows?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    wri?: NullableStringFieldUpdateOperationsInput | string | null
    senses?: NullableStringFieldUpdateOperationsInput | string | null
    additional?: NullableStringFieldUpdateOperationsInput | string | null
    font?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MonsterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    alignment?: NullableStringFieldUpdateOperationsInput | string | null
    habitat?: NullableStringFieldUpdateOperationsInput | string | null
    mainHabitat?: NullableStringFieldUpdateOperationsInput | string | null
    otherHabitat?: NullableStringFieldUpdateOperationsInput | string | null
    treasure?: NullableStringFieldUpdateOperationsInput | string | null
    ac?: NullableStringFieldUpdateOperationsInput | string | null
    hp?: NullableStringFieldUpdateOperationsInput | string | null
    initiative?: NullableStringFieldUpdateOperationsInput | string | null
    walk?: NullableStringFieldUpdateOperationsInput | string | null
    burrow?: NullableStringFieldUpdateOperationsInput | string | null
    climb?: NullableStringFieldUpdateOperationsInput | string | null
    fly?: NullableStringFieldUpdateOperationsInput | string | null
    hover?: NullableStringFieldUpdateOperationsInput | string | null
    swim?: NullableStringFieldUpdateOperationsInput | string | null
    strMod?: NullableStringFieldUpdateOperationsInput | string | null
    intMod?: NullableStringFieldUpdateOperationsInput | string | null
    dexMod?: NullableStringFieldUpdateOperationsInput | string | null
    wisMod?: NullableStringFieldUpdateOperationsInput | string | null
    conMod?: NullableStringFieldUpdateOperationsInput | string | null
    chaMod?: NullableStringFieldUpdateOperationsInput | string | null
    strSave?: NullableStringFieldUpdateOperationsInput | string | null
    intSave?: NullableStringFieldUpdateOperationsInput | string | null
    dexSave?: NullableStringFieldUpdateOperationsInput | string | null
    wisSave?: NullableStringFieldUpdateOperationsInput | string | null
    conSave?: NullableStringFieldUpdateOperationsInput | string | null
    chaSave?: NullableStringFieldUpdateOperationsInput | string | null
    proficient?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    vulnerabilities?: NullableStringFieldUpdateOperationsInput | string | null
    slashing?: NullableStringFieldUpdateOperationsInput | string | null
    immunitiesConditions?: NullableStringFieldUpdateOperationsInput | string | null
    immunitiesDamage?: NullableStringFieldUpdateOperationsInput | string | null
    blindsight?: NullableStringFieldUpdateOperationsInput | string | null
    darkvision?: NullableStringFieldUpdateOperationsInput | string | null
    truesight?: NullableStringFieldUpdateOperationsInput | string | null
    tremorsense?: NullableStringFieldUpdateOperationsInput | string | null
    passivePerception?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableStringFieldUpdateOperationsInput | string | null
    cr?: NullableStringFieldUpdateOperationsInput | string | null
    xpVal?: NullableStringFieldUpdateOperationsInput | string | null
    pb?: NullableStringFieldUpdateOperationsInput | string | null
    traits?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryResistanceCount?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfAtk?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk1RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk1DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk2RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk2DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk3RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk3DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk4RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk4DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    saveDC?: NullableStringFieldUpdateOperationsInput | string | null
    savingThrow?: NullableStringFieldUpdateOperationsInput | string | null
    actionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    ability?: NullableStringFieldUpdateOperationsInput | string | null
    spellSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    spellSavingThrows?: NullableStringFieldUpdateOperationsInput | string | null
    spellAttack?: NullableStringFieldUpdateOperationsInput | string | null
    atWillSpells?: NullableStringFieldUpdateOperationsInput | string | null
    threePerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    twoPerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    onePerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    bonusAction?: NullableStringFieldUpdateOperationsInput | string | null
    reaction?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionSavingThrow?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActions?: NullableStringFieldUpdateOperationsInput | string | null
    lair?: NullableStringFieldUpdateOperationsInput | string | null
    xpLair?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryResistance?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionsLair?: NullableStringFieldUpdateOperationsInput | string | null
    lairSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    lairSavingThrows?: NullableStringFieldUpdateOperationsInput | string | null
    other?: NullableStringFieldUpdateOperationsInput | string | null
    align?: NullableStringFieldUpdateOperationsInput | string | null
    speeds?: NullableStringFieldUpdateOperationsInput | string | null
    strScore?: NullableStringFieldUpdateOperationsInput | string | null
    dexScore?: NullableStringFieldUpdateOperationsInput | string | null
    conScore?: NullableStringFieldUpdateOperationsInput | string | null
    intScore?: NullableStringFieldUpdateOperationsInput | string | null
    wisScore?: NullableStringFieldUpdateOperationsInput | string | null
    chaScore?: NullableStringFieldUpdateOperationsInput | string | null
    savThrows?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    wri?: NullableStringFieldUpdateOperationsInput | string | null
    senses?: NullableStringFieldUpdateOperationsInput | string | null
    additional?: NullableStringFieldUpdateOperationsInput | string | null
    font?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MonsterCreateManyInput = {
    id?: string
    name: string
    size?: string | null
    type?: string | null
    alignment?: string | null
    habitat?: string | null
    mainHabitat?: string | null
    otherHabitat?: string | null
    treasure?: string | null
    ac?: string | null
    hp?: string | null
    initiative?: string | null
    walk?: string | null
    burrow?: string | null
    climb?: string | null
    fly?: string | null
    hover?: string | null
    swim?: string | null
    strMod?: string | null
    intMod?: string | null
    dexMod?: string | null
    wisMod?: string | null
    conMod?: string | null
    chaMod?: string | null
    strSave?: string | null
    intSave?: string | null
    dexSave?: string | null
    wisSave?: string | null
    conSave?: string | null
    chaSave?: string | null
    proficient?: string | null
    expertise?: string | null
    vulnerabilities?: string | null
    slashing?: string | null
    immunitiesConditions?: string | null
    immunitiesDamage?: string | null
    blindsight?: string | null
    darkvision?: string | null
    truesight?: string | null
    tremorsense?: string | null
    passivePerception?: string | null
    languages?: string | null
    cr?: string | null
    xpVal?: string | null
    pb?: string | null
    traits?: string | null
    legendaryResistanceCount?: string | null
    numberOfAtk?: string | null
    atk1Type?: string | null
    atk1Mod?: string | null
    atk1Range?: string | null
    atk1RangeShort?: string | null
    atk1Dam?: string | null
    atk1DamageType?: string | null
    atk2Type?: string | null
    atk2Mod?: string | null
    atk2Range?: string | null
    atk2RangeShort?: string | null
    atk2Dam?: string | null
    atk2DamageType?: string | null
    atk3Type?: string | null
    atk3Mod?: string | null
    atk3Range?: string | null
    atk3RangeShort?: string | null
    atk3Dam?: string | null
    atk3DamageType?: string | null
    atk4Type?: string | null
    atk4Mod?: string | null
    atk4Range?: string | null
    atk4RangeShort?: string | null
    atk4Dam?: string | null
    atk4DamageType?: string | null
    saveDC?: string | null
    savingThrow?: string | null
    actionNotes?: string | null
    ability?: string | null
    spellSaveDC?: string | null
    spellSavingThrows?: string | null
    spellAttack?: string | null
    atWillSpells?: string | null
    threePerDaySpells?: string | null
    twoPerDaySpells?: string | null
    onePerDaySpells?: string | null
    bonusAction?: string | null
    reaction?: string | null
    amount?: string | null
    legendaryActionSaveDC?: string | null
    legendaryActionSavingThrow?: string | null
    legendaryActions?: string | null
    lair?: string | null
    xpLair?: string | null
    legendaryResistance?: string | null
    legendaryActionsLair?: string | null
    lairSaveDC?: string | null
    lairSavingThrows?: string | null
    other?: string | null
    align?: string | null
    speeds?: string | null
    strScore?: string | null
    dexScore?: string | null
    conScore?: string | null
    intScore?: string | null
    wisScore?: string | null
    chaScore?: string | null
    savThrows?: string | null
    skills?: string | null
    wri?: string | null
    senses?: string | null
    additional?: string | null
    font?: string | null
    additionalInfo?: string | null
    author?: string | null
  }

  export type MonsterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    alignment?: NullableStringFieldUpdateOperationsInput | string | null
    habitat?: NullableStringFieldUpdateOperationsInput | string | null
    mainHabitat?: NullableStringFieldUpdateOperationsInput | string | null
    otherHabitat?: NullableStringFieldUpdateOperationsInput | string | null
    treasure?: NullableStringFieldUpdateOperationsInput | string | null
    ac?: NullableStringFieldUpdateOperationsInput | string | null
    hp?: NullableStringFieldUpdateOperationsInput | string | null
    initiative?: NullableStringFieldUpdateOperationsInput | string | null
    walk?: NullableStringFieldUpdateOperationsInput | string | null
    burrow?: NullableStringFieldUpdateOperationsInput | string | null
    climb?: NullableStringFieldUpdateOperationsInput | string | null
    fly?: NullableStringFieldUpdateOperationsInput | string | null
    hover?: NullableStringFieldUpdateOperationsInput | string | null
    swim?: NullableStringFieldUpdateOperationsInput | string | null
    strMod?: NullableStringFieldUpdateOperationsInput | string | null
    intMod?: NullableStringFieldUpdateOperationsInput | string | null
    dexMod?: NullableStringFieldUpdateOperationsInput | string | null
    wisMod?: NullableStringFieldUpdateOperationsInput | string | null
    conMod?: NullableStringFieldUpdateOperationsInput | string | null
    chaMod?: NullableStringFieldUpdateOperationsInput | string | null
    strSave?: NullableStringFieldUpdateOperationsInput | string | null
    intSave?: NullableStringFieldUpdateOperationsInput | string | null
    dexSave?: NullableStringFieldUpdateOperationsInput | string | null
    wisSave?: NullableStringFieldUpdateOperationsInput | string | null
    conSave?: NullableStringFieldUpdateOperationsInput | string | null
    chaSave?: NullableStringFieldUpdateOperationsInput | string | null
    proficient?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    vulnerabilities?: NullableStringFieldUpdateOperationsInput | string | null
    slashing?: NullableStringFieldUpdateOperationsInput | string | null
    immunitiesConditions?: NullableStringFieldUpdateOperationsInput | string | null
    immunitiesDamage?: NullableStringFieldUpdateOperationsInput | string | null
    blindsight?: NullableStringFieldUpdateOperationsInput | string | null
    darkvision?: NullableStringFieldUpdateOperationsInput | string | null
    truesight?: NullableStringFieldUpdateOperationsInput | string | null
    tremorsense?: NullableStringFieldUpdateOperationsInput | string | null
    passivePerception?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableStringFieldUpdateOperationsInput | string | null
    cr?: NullableStringFieldUpdateOperationsInput | string | null
    xpVal?: NullableStringFieldUpdateOperationsInput | string | null
    pb?: NullableStringFieldUpdateOperationsInput | string | null
    traits?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryResistanceCount?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfAtk?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk1RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk1DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk2RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk2DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk3RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk3DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk4RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk4DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    saveDC?: NullableStringFieldUpdateOperationsInput | string | null
    savingThrow?: NullableStringFieldUpdateOperationsInput | string | null
    actionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    ability?: NullableStringFieldUpdateOperationsInput | string | null
    spellSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    spellSavingThrows?: NullableStringFieldUpdateOperationsInput | string | null
    spellAttack?: NullableStringFieldUpdateOperationsInput | string | null
    atWillSpells?: NullableStringFieldUpdateOperationsInput | string | null
    threePerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    twoPerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    onePerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    bonusAction?: NullableStringFieldUpdateOperationsInput | string | null
    reaction?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionSavingThrow?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActions?: NullableStringFieldUpdateOperationsInput | string | null
    lair?: NullableStringFieldUpdateOperationsInput | string | null
    xpLair?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryResistance?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionsLair?: NullableStringFieldUpdateOperationsInput | string | null
    lairSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    lairSavingThrows?: NullableStringFieldUpdateOperationsInput | string | null
    other?: NullableStringFieldUpdateOperationsInput | string | null
    align?: NullableStringFieldUpdateOperationsInput | string | null
    speeds?: NullableStringFieldUpdateOperationsInput | string | null
    strScore?: NullableStringFieldUpdateOperationsInput | string | null
    dexScore?: NullableStringFieldUpdateOperationsInput | string | null
    conScore?: NullableStringFieldUpdateOperationsInput | string | null
    intScore?: NullableStringFieldUpdateOperationsInput | string | null
    wisScore?: NullableStringFieldUpdateOperationsInput | string | null
    chaScore?: NullableStringFieldUpdateOperationsInput | string | null
    savThrows?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    wri?: NullableStringFieldUpdateOperationsInput | string | null
    senses?: NullableStringFieldUpdateOperationsInput | string | null
    additional?: NullableStringFieldUpdateOperationsInput | string | null
    font?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MonsterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    alignment?: NullableStringFieldUpdateOperationsInput | string | null
    habitat?: NullableStringFieldUpdateOperationsInput | string | null
    mainHabitat?: NullableStringFieldUpdateOperationsInput | string | null
    otherHabitat?: NullableStringFieldUpdateOperationsInput | string | null
    treasure?: NullableStringFieldUpdateOperationsInput | string | null
    ac?: NullableStringFieldUpdateOperationsInput | string | null
    hp?: NullableStringFieldUpdateOperationsInput | string | null
    initiative?: NullableStringFieldUpdateOperationsInput | string | null
    walk?: NullableStringFieldUpdateOperationsInput | string | null
    burrow?: NullableStringFieldUpdateOperationsInput | string | null
    climb?: NullableStringFieldUpdateOperationsInput | string | null
    fly?: NullableStringFieldUpdateOperationsInput | string | null
    hover?: NullableStringFieldUpdateOperationsInput | string | null
    swim?: NullableStringFieldUpdateOperationsInput | string | null
    strMod?: NullableStringFieldUpdateOperationsInput | string | null
    intMod?: NullableStringFieldUpdateOperationsInput | string | null
    dexMod?: NullableStringFieldUpdateOperationsInput | string | null
    wisMod?: NullableStringFieldUpdateOperationsInput | string | null
    conMod?: NullableStringFieldUpdateOperationsInput | string | null
    chaMod?: NullableStringFieldUpdateOperationsInput | string | null
    strSave?: NullableStringFieldUpdateOperationsInput | string | null
    intSave?: NullableStringFieldUpdateOperationsInput | string | null
    dexSave?: NullableStringFieldUpdateOperationsInput | string | null
    wisSave?: NullableStringFieldUpdateOperationsInput | string | null
    conSave?: NullableStringFieldUpdateOperationsInput | string | null
    chaSave?: NullableStringFieldUpdateOperationsInput | string | null
    proficient?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    vulnerabilities?: NullableStringFieldUpdateOperationsInput | string | null
    slashing?: NullableStringFieldUpdateOperationsInput | string | null
    immunitiesConditions?: NullableStringFieldUpdateOperationsInput | string | null
    immunitiesDamage?: NullableStringFieldUpdateOperationsInput | string | null
    blindsight?: NullableStringFieldUpdateOperationsInput | string | null
    darkvision?: NullableStringFieldUpdateOperationsInput | string | null
    truesight?: NullableStringFieldUpdateOperationsInput | string | null
    tremorsense?: NullableStringFieldUpdateOperationsInput | string | null
    passivePerception?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableStringFieldUpdateOperationsInput | string | null
    cr?: NullableStringFieldUpdateOperationsInput | string | null
    xpVal?: NullableStringFieldUpdateOperationsInput | string | null
    pb?: NullableStringFieldUpdateOperationsInput | string | null
    traits?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryResistanceCount?: NullableStringFieldUpdateOperationsInput | string | null
    numberOfAtk?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk1RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk1Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk1DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk2RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk2Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk2DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk3RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk3Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk3DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Type?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Mod?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Range?: NullableStringFieldUpdateOperationsInput | string | null
    atk4RangeShort?: NullableStringFieldUpdateOperationsInput | string | null
    atk4Dam?: NullableStringFieldUpdateOperationsInput | string | null
    atk4DamageType?: NullableStringFieldUpdateOperationsInput | string | null
    saveDC?: NullableStringFieldUpdateOperationsInput | string | null
    savingThrow?: NullableStringFieldUpdateOperationsInput | string | null
    actionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    ability?: NullableStringFieldUpdateOperationsInput | string | null
    spellSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    spellSavingThrows?: NullableStringFieldUpdateOperationsInput | string | null
    spellAttack?: NullableStringFieldUpdateOperationsInput | string | null
    atWillSpells?: NullableStringFieldUpdateOperationsInput | string | null
    threePerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    twoPerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    onePerDaySpells?: NullableStringFieldUpdateOperationsInput | string | null
    bonusAction?: NullableStringFieldUpdateOperationsInput | string | null
    reaction?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionSavingThrow?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActions?: NullableStringFieldUpdateOperationsInput | string | null
    lair?: NullableStringFieldUpdateOperationsInput | string | null
    xpLair?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryResistance?: NullableStringFieldUpdateOperationsInput | string | null
    legendaryActionsLair?: NullableStringFieldUpdateOperationsInput | string | null
    lairSaveDC?: NullableStringFieldUpdateOperationsInput | string | null
    lairSavingThrows?: NullableStringFieldUpdateOperationsInput | string | null
    other?: NullableStringFieldUpdateOperationsInput | string | null
    align?: NullableStringFieldUpdateOperationsInput | string | null
    speeds?: NullableStringFieldUpdateOperationsInput | string | null
    strScore?: NullableStringFieldUpdateOperationsInput | string | null
    dexScore?: NullableStringFieldUpdateOperationsInput | string | null
    conScore?: NullableStringFieldUpdateOperationsInput | string | null
    intScore?: NullableStringFieldUpdateOperationsInput | string | null
    wisScore?: NullableStringFieldUpdateOperationsInput | string | null
    chaScore?: NullableStringFieldUpdateOperationsInput | string | null
    savThrows?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    wri?: NullableStringFieldUpdateOperationsInput | string | null
    senses?: NullableStringFieldUpdateOperationsInput | string | null
    additional?: NullableStringFieldUpdateOperationsInput | string | null
    font?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RaceCreateInput = {
    race: string
    str?: string | null
    dex?: string | null
    con?: string | null
    int?: string | null
    wis?: string | null
    cha?: string | null
    special?: string | null
    source: string
    notes?: string | null
  }

  export type RaceUncheckedCreateInput = {
    id?: number
    race: string
    str?: string | null
    dex?: string | null
    con?: string | null
    int?: string | null
    wis?: string | null
    cha?: string | null
    special?: string | null
    source: string
    notes?: string | null
  }

  export type RaceUpdateInput = {
    race?: StringFieldUpdateOperationsInput | string
    str?: NullableStringFieldUpdateOperationsInput | string | null
    dex?: NullableStringFieldUpdateOperationsInput | string | null
    con?: NullableStringFieldUpdateOperationsInput | string | null
    int?: NullableStringFieldUpdateOperationsInput | string | null
    wis?: NullableStringFieldUpdateOperationsInput | string | null
    cha?: NullableStringFieldUpdateOperationsInput | string | null
    special?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RaceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    race?: StringFieldUpdateOperationsInput | string
    str?: NullableStringFieldUpdateOperationsInput | string | null
    dex?: NullableStringFieldUpdateOperationsInput | string | null
    con?: NullableStringFieldUpdateOperationsInput | string | null
    int?: NullableStringFieldUpdateOperationsInput | string | null
    wis?: NullableStringFieldUpdateOperationsInput | string | null
    cha?: NullableStringFieldUpdateOperationsInput | string | null
    special?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RaceCreateManyInput = {
    id?: number
    race: string
    str?: string | null
    dex?: string | null
    con?: string | null
    int?: string | null
    wis?: string | null
    cha?: string | null
    special?: string | null
    source: string
    notes?: string | null
  }

  export type RaceUpdateManyMutationInput = {
    race?: StringFieldUpdateOperationsInput | string
    str?: NullableStringFieldUpdateOperationsInput | string | null
    dex?: NullableStringFieldUpdateOperationsInput | string | null
    con?: NullableStringFieldUpdateOperationsInput | string | null
    int?: NullableStringFieldUpdateOperationsInput | string | null
    wis?: NullableStringFieldUpdateOperationsInput | string | null
    cha?: NullableStringFieldUpdateOperationsInput | string | null
    special?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RaceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    race?: StringFieldUpdateOperationsInput | string
    str?: NullableStringFieldUpdateOperationsInput | string | null
    dex?: NullableStringFieldUpdateOperationsInput | string | null
    con?: NullableStringFieldUpdateOperationsInput | string | null
    int?: NullableStringFieldUpdateOperationsInput | string | null
    wis?: NullableStringFieldUpdateOperationsInput | string | null
    cha?: NullableStringFieldUpdateOperationsInput | string | null
    special?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SpellCreateInput = {
    name: string
    level: string
    school: string
    castingTime: string
    duration: string
    range: string
    area?: string | null
    attack?: string | null
    save?: string | null
    damageEffect: string
    ritual?: string | null
    concentration?: string | null
    verbal?: string | null
    somatic?: string | null
    material?: string | null
    materialDetails?: string | null
    source: string
    details: string
    link: string
  }

  export type SpellUncheckedCreateInput = {
    id?: number
    name: string
    level: string
    school: string
    castingTime: string
    duration: string
    range: string
    area?: string | null
    attack?: string | null
    save?: string | null
    damageEffect: string
    ritual?: string | null
    concentration?: string | null
    verbal?: string | null
    somatic?: string | null
    material?: string | null
    materialDetails?: string | null
    source: string
    details: string
    link: string
  }

  export type SpellUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    school?: StringFieldUpdateOperationsInput | string
    castingTime?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    range?: StringFieldUpdateOperationsInput | string
    area?: NullableStringFieldUpdateOperationsInput | string | null
    attack?: NullableStringFieldUpdateOperationsInput | string | null
    save?: NullableStringFieldUpdateOperationsInput | string | null
    damageEffect?: StringFieldUpdateOperationsInput | string
    ritual?: NullableStringFieldUpdateOperationsInput | string | null
    concentration?: NullableStringFieldUpdateOperationsInput | string | null
    verbal?: NullableStringFieldUpdateOperationsInput | string | null
    somatic?: NullableStringFieldUpdateOperationsInput | string | null
    material?: NullableStringFieldUpdateOperationsInput | string | null
    materialDetails?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
  }

  export type SpellUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    school?: StringFieldUpdateOperationsInput | string
    castingTime?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    range?: StringFieldUpdateOperationsInput | string
    area?: NullableStringFieldUpdateOperationsInput | string | null
    attack?: NullableStringFieldUpdateOperationsInput | string | null
    save?: NullableStringFieldUpdateOperationsInput | string | null
    damageEffect?: StringFieldUpdateOperationsInput | string
    ritual?: NullableStringFieldUpdateOperationsInput | string | null
    concentration?: NullableStringFieldUpdateOperationsInput | string | null
    verbal?: NullableStringFieldUpdateOperationsInput | string | null
    somatic?: NullableStringFieldUpdateOperationsInput | string | null
    material?: NullableStringFieldUpdateOperationsInput | string | null
    materialDetails?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
  }

  export type SpellCreateManyInput = {
    id?: number
    name: string
    level: string
    school: string
    castingTime: string
    duration: string
    range: string
    area?: string | null
    attack?: string | null
    save?: string | null
    damageEffect: string
    ritual?: string | null
    concentration?: string | null
    verbal?: string | null
    somatic?: string | null
    material?: string | null
    materialDetails?: string | null
    source: string
    details: string
    link: string
  }

  export type SpellUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    school?: StringFieldUpdateOperationsInput | string
    castingTime?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    range?: StringFieldUpdateOperationsInput | string
    area?: NullableStringFieldUpdateOperationsInput | string | null
    attack?: NullableStringFieldUpdateOperationsInput | string | null
    save?: NullableStringFieldUpdateOperationsInput | string | null
    damageEffect?: StringFieldUpdateOperationsInput | string
    ritual?: NullableStringFieldUpdateOperationsInput | string | null
    concentration?: NullableStringFieldUpdateOperationsInput | string | null
    verbal?: NullableStringFieldUpdateOperationsInput | string | null
    somatic?: NullableStringFieldUpdateOperationsInput | string | null
    material?: NullableStringFieldUpdateOperationsInput | string | null
    materialDetails?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
  }

  export type SpellUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    school?: StringFieldUpdateOperationsInput | string
    castingTime?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    range?: StringFieldUpdateOperationsInput | string
    area?: NullableStringFieldUpdateOperationsInput | string | null
    attack?: NullableStringFieldUpdateOperationsInput | string | null
    save?: NullableStringFieldUpdateOperationsInput | string | null
    damageEffect?: StringFieldUpdateOperationsInput | string
    ritual?: NullableStringFieldUpdateOperationsInput | string | null
    concentration?: NullableStringFieldUpdateOperationsInput | string | null
    verbal?: NullableStringFieldUpdateOperationsInput | string | null
    somatic?: NullableStringFieldUpdateOperationsInput | string | null
    material?: NullableStringFieldUpdateOperationsInput | string | null
    materialDetails?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
  }

  export type ClassCreateInput = {
    class: string
    subclass: string
    source?: string | null
    notes?: string | null
    features?: string | null
    level?: string | null
    description?: string | null
  }

  export type ClassUncheckedCreateInput = {
    id?: number
    class: string
    subclass: string
    source?: string | null
    notes?: string | null
    features?: string | null
    level?: string | null
    description?: string | null
  }

  export type ClassUpdateInput = {
    class?: StringFieldUpdateOperationsInput | string
    subclass?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    class?: StringFieldUpdateOperationsInput | string
    subclass?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassCreateManyInput = {
    id?: number
    class: string
    subclass: string
    source?: string | null
    notes?: string | null
    features?: string | null
    level?: string | null
    description?: string | null
  }

  export type ClassUpdateManyMutationInput = {
    class?: StringFieldUpdateOperationsInput | string
    subclass?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClassUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    class?: StringFieldUpdateOperationsInput | string
    subclass?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    features?: NullableStringFieldUpdateOperationsInput | string | null
    level?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MagicItemCreateInput = {
    name: string
    rarity?: string | null
    attunement?: string | null
    costGp?: number | null
    note?: string | null
    armorCost?: number | null
    rareMaterial?: string | null
    acBonus?: number | null
    saveBonus?: number | null
    setScoreModifier?: number | null
    plusTwoBonusToScore?: string | null
    weaponBonus?: number | null
    spellLevel?: number | null
    unlimitedCharges?: string | null
    chargesPerDay?: number | null
    chargesPerItem?: number | null
    spellsShareCharges?: number | null
    condition?: string | null
    consumableDamageAvg?: number | null
    consumableSave?: string | null
    semiPermanentDamageAvg?: number | null
    semiPermSave?: string | null
    durationMinutes?: number | null
    permanentDamageAvg?: number | null
    permSave?: string | null
    specificSituations?: string | null
    restoreHpAvg?: number | null
    miscCosts?: number | null
    secondSpellLevel?: number | null
    secondUnlimitedCharges?: string | null
    secondChargesPerDay?: number | null
    thirdSpellLevel?: number | null
    thirdUnlimitedCharges?: string | null
    thirdChargesPerDay?: number | null
    matCost?: number | null
    acCost?: number | null
    saveCost?: number | null
    setScoreCost?: number | null
    bonusScoreCost?: number | null
    weaponCost?: number | null
    consumSpellCost?: number | null
    permChargesCost?: number | null
    chargesDestroyed?: number | null
    spellShareChargesCost?: number | null
    conditionCost?: number | null
    consDMGCost?: number | null
    smPrDMGCost?: number | null
    perDMGCost?: number | null
    avgHPCost?: number | null
    miscCost?: number | null
    secondConsumSpellCost?: number | null
    secondPermChargesCost?: number | null
    thirdConsumSpellCost?: number | null
    thirdPermChargesCost?: number | null
  }

  export type MagicItemUncheckedCreateInput = {
    id?: number
    name: string
    rarity?: string | null
    attunement?: string | null
    costGp?: number | null
    note?: string | null
    armorCost?: number | null
    rareMaterial?: string | null
    acBonus?: number | null
    saveBonus?: number | null
    setScoreModifier?: number | null
    plusTwoBonusToScore?: string | null
    weaponBonus?: number | null
    spellLevel?: number | null
    unlimitedCharges?: string | null
    chargesPerDay?: number | null
    chargesPerItem?: number | null
    spellsShareCharges?: number | null
    condition?: string | null
    consumableDamageAvg?: number | null
    consumableSave?: string | null
    semiPermanentDamageAvg?: number | null
    semiPermSave?: string | null
    durationMinutes?: number | null
    permanentDamageAvg?: number | null
    permSave?: string | null
    specificSituations?: string | null
    restoreHpAvg?: number | null
    miscCosts?: number | null
    secondSpellLevel?: number | null
    secondUnlimitedCharges?: string | null
    secondChargesPerDay?: number | null
    thirdSpellLevel?: number | null
    thirdUnlimitedCharges?: string | null
    thirdChargesPerDay?: number | null
    matCost?: number | null
    acCost?: number | null
    saveCost?: number | null
    setScoreCost?: number | null
    bonusScoreCost?: number | null
    weaponCost?: number | null
    consumSpellCost?: number | null
    permChargesCost?: number | null
    chargesDestroyed?: number | null
    spellShareChargesCost?: number | null
    conditionCost?: number | null
    consDMGCost?: number | null
    smPrDMGCost?: number | null
    perDMGCost?: number | null
    avgHPCost?: number | null
    miscCost?: number | null
    secondConsumSpellCost?: number | null
    secondPermChargesCost?: number | null
    thirdConsumSpellCost?: number | null
    thirdPermChargesCost?: number | null
  }

  export type MagicItemUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    attunement?: NullableStringFieldUpdateOperationsInput | string | null
    costGp?: NullableIntFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    armorCost?: NullableIntFieldUpdateOperationsInput | number | null
    rareMaterial?: NullableStringFieldUpdateOperationsInput | string | null
    acBonus?: NullableIntFieldUpdateOperationsInput | number | null
    saveBonus?: NullableIntFieldUpdateOperationsInput | number | null
    setScoreModifier?: NullableIntFieldUpdateOperationsInput | number | null
    plusTwoBonusToScore?: NullableStringFieldUpdateOperationsInput | string | null
    weaponBonus?: NullableIntFieldUpdateOperationsInput | number | null
    spellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    unlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    chargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    chargesPerItem?: NullableIntFieldUpdateOperationsInput | number | null
    spellsShareCharges?: NullableIntFieldUpdateOperationsInput | number | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    consumableDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    consumableSave?: NullableStringFieldUpdateOperationsInput | string | null
    semiPermanentDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    semiPermSave?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    permanentDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    permSave?: NullableStringFieldUpdateOperationsInput | string | null
    specificSituations?: NullableStringFieldUpdateOperationsInput | string | null
    restoreHpAvg?: NullableIntFieldUpdateOperationsInput | number | null
    miscCosts?: NullableIntFieldUpdateOperationsInput | number | null
    secondSpellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    secondUnlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    secondChargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    thirdSpellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    thirdUnlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    thirdChargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    matCost?: NullableIntFieldUpdateOperationsInput | number | null
    acCost?: NullableIntFieldUpdateOperationsInput | number | null
    saveCost?: NullableIntFieldUpdateOperationsInput | number | null
    setScoreCost?: NullableIntFieldUpdateOperationsInput | number | null
    bonusScoreCost?: NullableIntFieldUpdateOperationsInput | number | null
    weaponCost?: NullableIntFieldUpdateOperationsInput | number | null
    consumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    permChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    chargesDestroyed?: NullableIntFieldUpdateOperationsInput | number | null
    spellShareChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    conditionCost?: NullableIntFieldUpdateOperationsInput | number | null
    consDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    smPrDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    perDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    avgHPCost?: NullableIntFieldUpdateOperationsInput | number | null
    miscCost?: NullableIntFieldUpdateOperationsInput | number | null
    secondConsumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    secondPermChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    thirdConsumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    thirdPermChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MagicItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    attunement?: NullableStringFieldUpdateOperationsInput | string | null
    costGp?: NullableIntFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    armorCost?: NullableIntFieldUpdateOperationsInput | number | null
    rareMaterial?: NullableStringFieldUpdateOperationsInput | string | null
    acBonus?: NullableIntFieldUpdateOperationsInput | number | null
    saveBonus?: NullableIntFieldUpdateOperationsInput | number | null
    setScoreModifier?: NullableIntFieldUpdateOperationsInput | number | null
    plusTwoBonusToScore?: NullableStringFieldUpdateOperationsInput | string | null
    weaponBonus?: NullableIntFieldUpdateOperationsInput | number | null
    spellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    unlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    chargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    chargesPerItem?: NullableIntFieldUpdateOperationsInput | number | null
    spellsShareCharges?: NullableIntFieldUpdateOperationsInput | number | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    consumableDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    consumableSave?: NullableStringFieldUpdateOperationsInput | string | null
    semiPermanentDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    semiPermSave?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    permanentDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    permSave?: NullableStringFieldUpdateOperationsInput | string | null
    specificSituations?: NullableStringFieldUpdateOperationsInput | string | null
    restoreHpAvg?: NullableIntFieldUpdateOperationsInput | number | null
    miscCosts?: NullableIntFieldUpdateOperationsInput | number | null
    secondSpellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    secondUnlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    secondChargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    thirdSpellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    thirdUnlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    thirdChargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    matCost?: NullableIntFieldUpdateOperationsInput | number | null
    acCost?: NullableIntFieldUpdateOperationsInput | number | null
    saveCost?: NullableIntFieldUpdateOperationsInput | number | null
    setScoreCost?: NullableIntFieldUpdateOperationsInput | number | null
    bonusScoreCost?: NullableIntFieldUpdateOperationsInput | number | null
    weaponCost?: NullableIntFieldUpdateOperationsInput | number | null
    consumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    permChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    chargesDestroyed?: NullableIntFieldUpdateOperationsInput | number | null
    spellShareChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    conditionCost?: NullableIntFieldUpdateOperationsInput | number | null
    consDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    smPrDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    perDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    avgHPCost?: NullableIntFieldUpdateOperationsInput | number | null
    miscCost?: NullableIntFieldUpdateOperationsInput | number | null
    secondConsumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    secondPermChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    thirdConsumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    thirdPermChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MagicItemCreateManyInput = {
    id?: number
    name: string
    rarity?: string | null
    attunement?: string | null
    costGp?: number | null
    note?: string | null
    armorCost?: number | null
    rareMaterial?: string | null
    acBonus?: number | null
    saveBonus?: number | null
    setScoreModifier?: number | null
    plusTwoBonusToScore?: string | null
    weaponBonus?: number | null
    spellLevel?: number | null
    unlimitedCharges?: string | null
    chargesPerDay?: number | null
    chargesPerItem?: number | null
    spellsShareCharges?: number | null
    condition?: string | null
    consumableDamageAvg?: number | null
    consumableSave?: string | null
    semiPermanentDamageAvg?: number | null
    semiPermSave?: string | null
    durationMinutes?: number | null
    permanentDamageAvg?: number | null
    permSave?: string | null
    specificSituations?: string | null
    restoreHpAvg?: number | null
    miscCosts?: number | null
    secondSpellLevel?: number | null
    secondUnlimitedCharges?: string | null
    secondChargesPerDay?: number | null
    thirdSpellLevel?: number | null
    thirdUnlimitedCharges?: string | null
    thirdChargesPerDay?: number | null
    matCost?: number | null
    acCost?: number | null
    saveCost?: number | null
    setScoreCost?: number | null
    bonusScoreCost?: number | null
    weaponCost?: number | null
    consumSpellCost?: number | null
    permChargesCost?: number | null
    chargesDestroyed?: number | null
    spellShareChargesCost?: number | null
    conditionCost?: number | null
    consDMGCost?: number | null
    smPrDMGCost?: number | null
    perDMGCost?: number | null
    avgHPCost?: number | null
    miscCost?: number | null
    secondConsumSpellCost?: number | null
    secondPermChargesCost?: number | null
    thirdConsumSpellCost?: number | null
    thirdPermChargesCost?: number | null
  }

  export type MagicItemUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    attunement?: NullableStringFieldUpdateOperationsInput | string | null
    costGp?: NullableIntFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    armorCost?: NullableIntFieldUpdateOperationsInput | number | null
    rareMaterial?: NullableStringFieldUpdateOperationsInput | string | null
    acBonus?: NullableIntFieldUpdateOperationsInput | number | null
    saveBonus?: NullableIntFieldUpdateOperationsInput | number | null
    setScoreModifier?: NullableIntFieldUpdateOperationsInput | number | null
    plusTwoBonusToScore?: NullableStringFieldUpdateOperationsInput | string | null
    weaponBonus?: NullableIntFieldUpdateOperationsInput | number | null
    spellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    unlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    chargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    chargesPerItem?: NullableIntFieldUpdateOperationsInput | number | null
    spellsShareCharges?: NullableIntFieldUpdateOperationsInput | number | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    consumableDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    consumableSave?: NullableStringFieldUpdateOperationsInput | string | null
    semiPermanentDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    semiPermSave?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    permanentDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    permSave?: NullableStringFieldUpdateOperationsInput | string | null
    specificSituations?: NullableStringFieldUpdateOperationsInput | string | null
    restoreHpAvg?: NullableIntFieldUpdateOperationsInput | number | null
    miscCosts?: NullableIntFieldUpdateOperationsInput | number | null
    secondSpellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    secondUnlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    secondChargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    thirdSpellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    thirdUnlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    thirdChargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    matCost?: NullableIntFieldUpdateOperationsInput | number | null
    acCost?: NullableIntFieldUpdateOperationsInput | number | null
    saveCost?: NullableIntFieldUpdateOperationsInput | number | null
    setScoreCost?: NullableIntFieldUpdateOperationsInput | number | null
    bonusScoreCost?: NullableIntFieldUpdateOperationsInput | number | null
    weaponCost?: NullableIntFieldUpdateOperationsInput | number | null
    consumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    permChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    chargesDestroyed?: NullableIntFieldUpdateOperationsInput | number | null
    spellShareChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    conditionCost?: NullableIntFieldUpdateOperationsInput | number | null
    consDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    smPrDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    perDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    avgHPCost?: NullableIntFieldUpdateOperationsInput | number | null
    miscCost?: NullableIntFieldUpdateOperationsInput | number | null
    secondConsumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    secondPermChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    thirdConsumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    thirdPermChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MagicItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rarity?: NullableStringFieldUpdateOperationsInput | string | null
    attunement?: NullableStringFieldUpdateOperationsInput | string | null
    costGp?: NullableIntFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    armorCost?: NullableIntFieldUpdateOperationsInput | number | null
    rareMaterial?: NullableStringFieldUpdateOperationsInput | string | null
    acBonus?: NullableIntFieldUpdateOperationsInput | number | null
    saveBonus?: NullableIntFieldUpdateOperationsInput | number | null
    setScoreModifier?: NullableIntFieldUpdateOperationsInput | number | null
    plusTwoBonusToScore?: NullableStringFieldUpdateOperationsInput | string | null
    weaponBonus?: NullableIntFieldUpdateOperationsInput | number | null
    spellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    unlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    chargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    chargesPerItem?: NullableIntFieldUpdateOperationsInput | number | null
    spellsShareCharges?: NullableIntFieldUpdateOperationsInput | number | null
    condition?: NullableStringFieldUpdateOperationsInput | string | null
    consumableDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    consumableSave?: NullableStringFieldUpdateOperationsInput | string | null
    semiPermanentDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    semiPermSave?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    permanentDamageAvg?: NullableIntFieldUpdateOperationsInput | number | null
    permSave?: NullableStringFieldUpdateOperationsInput | string | null
    specificSituations?: NullableStringFieldUpdateOperationsInput | string | null
    restoreHpAvg?: NullableIntFieldUpdateOperationsInput | number | null
    miscCosts?: NullableIntFieldUpdateOperationsInput | number | null
    secondSpellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    secondUnlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    secondChargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    thirdSpellLevel?: NullableIntFieldUpdateOperationsInput | number | null
    thirdUnlimitedCharges?: NullableStringFieldUpdateOperationsInput | string | null
    thirdChargesPerDay?: NullableIntFieldUpdateOperationsInput | number | null
    matCost?: NullableIntFieldUpdateOperationsInput | number | null
    acCost?: NullableIntFieldUpdateOperationsInput | number | null
    saveCost?: NullableIntFieldUpdateOperationsInput | number | null
    setScoreCost?: NullableIntFieldUpdateOperationsInput | number | null
    bonusScoreCost?: NullableIntFieldUpdateOperationsInput | number | null
    weaponCost?: NullableIntFieldUpdateOperationsInput | number | null
    consumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    permChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    chargesDestroyed?: NullableIntFieldUpdateOperationsInput | number | null
    spellShareChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    conditionCost?: NullableIntFieldUpdateOperationsInput | number | null
    consDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    smPrDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    perDMGCost?: NullableIntFieldUpdateOperationsInput | number | null
    avgHPCost?: NullableIntFieldUpdateOperationsInput | number | null
    miscCost?: NullableIntFieldUpdateOperationsInput | number | null
    secondConsumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    secondPermChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
    thirdConsumSpellCost?: NullableIntFieldUpdateOperationsInput | number | null
    thirdPermChargesCost?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GeneralEquipmentCreateInput = {
    name: string
    cost: string
    weightLbs?: string | null
  }

  export type GeneralEquipmentUncheckedCreateInput = {
    id?: number
    name: string
    cost: string
    weightLbs?: string | null
  }

  export type GeneralEquipmentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    cost?: StringFieldUpdateOperationsInput | string
    weightLbs?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GeneralEquipmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    cost?: StringFieldUpdateOperationsInput | string
    weightLbs?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GeneralEquipmentCreateManyInput = {
    id?: number
    name: string
    cost: string
    weightLbs?: string | null
  }

  export type GeneralEquipmentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    cost?: StringFieldUpdateOperationsInput | string
    weightLbs?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GeneralEquipmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    cost?: StringFieldUpdateOperationsInput | string
    weightLbs?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MonsterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    type?: SortOrder
    alignment?: SortOrder
    habitat?: SortOrder
    mainHabitat?: SortOrder
    otherHabitat?: SortOrder
    treasure?: SortOrder
    ac?: SortOrder
    hp?: SortOrder
    initiative?: SortOrder
    walk?: SortOrder
    burrow?: SortOrder
    climb?: SortOrder
    fly?: SortOrder
    hover?: SortOrder
    swim?: SortOrder
    strMod?: SortOrder
    intMod?: SortOrder
    dexMod?: SortOrder
    wisMod?: SortOrder
    conMod?: SortOrder
    chaMod?: SortOrder
    strSave?: SortOrder
    intSave?: SortOrder
    dexSave?: SortOrder
    wisSave?: SortOrder
    conSave?: SortOrder
    chaSave?: SortOrder
    proficient?: SortOrder
    expertise?: SortOrder
    vulnerabilities?: SortOrder
    slashing?: SortOrder
    immunitiesConditions?: SortOrder
    immunitiesDamage?: SortOrder
    blindsight?: SortOrder
    darkvision?: SortOrder
    truesight?: SortOrder
    tremorsense?: SortOrder
    passivePerception?: SortOrder
    languages?: SortOrder
    cr?: SortOrder
    xpVal?: SortOrder
    pb?: SortOrder
    traits?: SortOrder
    legendaryResistanceCount?: SortOrder
    numberOfAtk?: SortOrder
    atk1Type?: SortOrder
    atk1Mod?: SortOrder
    atk1Range?: SortOrder
    atk1RangeShort?: SortOrder
    atk1Dam?: SortOrder
    atk1DamageType?: SortOrder
    atk2Type?: SortOrder
    atk2Mod?: SortOrder
    atk2Range?: SortOrder
    atk2RangeShort?: SortOrder
    atk2Dam?: SortOrder
    atk2DamageType?: SortOrder
    atk3Type?: SortOrder
    atk3Mod?: SortOrder
    atk3Range?: SortOrder
    atk3RangeShort?: SortOrder
    atk3Dam?: SortOrder
    atk3DamageType?: SortOrder
    atk4Type?: SortOrder
    atk4Mod?: SortOrder
    atk4Range?: SortOrder
    atk4RangeShort?: SortOrder
    atk4Dam?: SortOrder
    atk4DamageType?: SortOrder
    saveDC?: SortOrder
    savingThrow?: SortOrder
    actionNotes?: SortOrder
    ability?: SortOrder
    spellSaveDC?: SortOrder
    spellSavingThrows?: SortOrder
    spellAttack?: SortOrder
    atWillSpells?: SortOrder
    threePerDaySpells?: SortOrder
    twoPerDaySpells?: SortOrder
    onePerDaySpells?: SortOrder
    bonusAction?: SortOrder
    reaction?: SortOrder
    amount?: SortOrder
    legendaryActionSaveDC?: SortOrder
    legendaryActionSavingThrow?: SortOrder
    legendaryActions?: SortOrder
    lair?: SortOrder
    xpLair?: SortOrder
    legendaryResistance?: SortOrder
    legendaryActionsLair?: SortOrder
    lairSaveDC?: SortOrder
    lairSavingThrows?: SortOrder
    other?: SortOrder
    align?: SortOrder
    speeds?: SortOrder
    strScore?: SortOrder
    dexScore?: SortOrder
    conScore?: SortOrder
    intScore?: SortOrder
    wisScore?: SortOrder
    chaScore?: SortOrder
    savThrows?: SortOrder
    skills?: SortOrder
    wri?: SortOrder
    senses?: SortOrder
    additional?: SortOrder
    font?: SortOrder
    additionalInfo?: SortOrder
    author?: SortOrder
  }

  export type MonsterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    type?: SortOrder
    alignment?: SortOrder
    habitat?: SortOrder
    mainHabitat?: SortOrder
    otherHabitat?: SortOrder
    treasure?: SortOrder
    ac?: SortOrder
    hp?: SortOrder
    initiative?: SortOrder
    walk?: SortOrder
    burrow?: SortOrder
    climb?: SortOrder
    fly?: SortOrder
    hover?: SortOrder
    swim?: SortOrder
    strMod?: SortOrder
    intMod?: SortOrder
    dexMod?: SortOrder
    wisMod?: SortOrder
    conMod?: SortOrder
    chaMod?: SortOrder
    strSave?: SortOrder
    intSave?: SortOrder
    dexSave?: SortOrder
    wisSave?: SortOrder
    conSave?: SortOrder
    chaSave?: SortOrder
    proficient?: SortOrder
    expertise?: SortOrder
    vulnerabilities?: SortOrder
    slashing?: SortOrder
    immunitiesConditions?: SortOrder
    immunitiesDamage?: SortOrder
    blindsight?: SortOrder
    darkvision?: SortOrder
    truesight?: SortOrder
    tremorsense?: SortOrder
    passivePerception?: SortOrder
    languages?: SortOrder
    cr?: SortOrder
    xpVal?: SortOrder
    pb?: SortOrder
    traits?: SortOrder
    legendaryResistanceCount?: SortOrder
    numberOfAtk?: SortOrder
    atk1Type?: SortOrder
    atk1Mod?: SortOrder
    atk1Range?: SortOrder
    atk1RangeShort?: SortOrder
    atk1Dam?: SortOrder
    atk1DamageType?: SortOrder
    atk2Type?: SortOrder
    atk2Mod?: SortOrder
    atk2Range?: SortOrder
    atk2RangeShort?: SortOrder
    atk2Dam?: SortOrder
    atk2DamageType?: SortOrder
    atk3Type?: SortOrder
    atk3Mod?: SortOrder
    atk3Range?: SortOrder
    atk3RangeShort?: SortOrder
    atk3Dam?: SortOrder
    atk3DamageType?: SortOrder
    atk4Type?: SortOrder
    atk4Mod?: SortOrder
    atk4Range?: SortOrder
    atk4RangeShort?: SortOrder
    atk4Dam?: SortOrder
    atk4DamageType?: SortOrder
    saveDC?: SortOrder
    savingThrow?: SortOrder
    actionNotes?: SortOrder
    ability?: SortOrder
    spellSaveDC?: SortOrder
    spellSavingThrows?: SortOrder
    spellAttack?: SortOrder
    atWillSpells?: SortOrder
    threePerDaySpells?: SortOrder
    twoPerDaySpells?: SortOrder
    onePerDaySpells?: SortOrder
    bonusAction?: SortOrder
    reaction?: SortOrder
    amount?: SortOrder
    legendaryActionSaveDC?: SortOrder
    legendaryActionSavingThrow?: SortOrder
    legendaryActions?: SortOrder
    lair?: SortOrder
    xpLair?: SortOrder
    legendaryResistance?: SortOrder
    legendaryActionsLair?: SortOrder
    lairSaveDC?: SortOrder
    lairSavingThrows?: SortOrder
    other?: SortOrder
    align?: SortOrder
    speeds?: SortOrder
    strScore?: SortOrder
    dexScore?: SortOrder
    conScore?: SortOrder
    intScore?: SortOrder
    wisScore?: SortOrder
    chaScore?: SortOrder
    savThrows?: SortOrder
    skills?: SortOrder
    wri?: SortOrder
    senses?: SortOrder
    additional?: SortOrder
    font?: SortOrder
    additionalInfo?: SortOrder
    author?: SortOrder
  }

  export type MonsterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    type?: SortOrder
    alignment?: SortOrder
    habitat?: SortOrder
    mainHabitat?: SortOrder
    otherHabitat?: SortOrder
    treasure?: SortOrder
    ac?: SortOrder
    hp?: SortOrder
    initiative?: SortOrder
    walk?: SortOrder
    burrow?: SortOrder
    climb?: SortOrder
    fly?: SortOrder
    hover?: SortOrder
    swim?: SortOrder
    strMod?: SortOrder
    intMod?: SortOrder
    dexMod?: SortOrder
    wisMod?: SortOrder
    conMod?: SortOrder
    chaMod?: SortOrder
    strSave?: SortOrder
    intSave?: SortOrder
    dexSave?: SortOrder
    wisSave?: SortOrder
    conSave?: SortOrder
    chaSave?: SortOrder
    proficient?: SortOrder
    expertise?: SortOrder
    vulnerabilities?: SortOrder
    slashing?: SortOrder
    immunitiesConditions?: SortOrder
    immunitiesDamage?: SortOrder
    blindsight?: SortOrder
    darkvision?: SortOrder
    truesight?: SortOrder
    tremorsense?: SortOrder
    passivePerception?: SortOrder
    languages?: SortOrder
    cr?: SortOrder
    xpVal?: SortOrder
    pb?: SortOrder
    traits?: SortOrder
    legendaryResistanceCount?: SortOrder
    numberOfAtk?: SortOrder
    atk1Type?: SortOrder
    atk1Mod?: SortOrder
    atk1Range?: SortOrder
    atk1RangeShort?: SortOrder
    atk1Dam?: SortOrder
    atk1DamageType?: SortOrder
    atk2Type?: SortOrder
    atk2Mod?: SortOrder
    atk2Range?: SortOrder
    atk2RangeShort?: SortOrder
    atk2Dam?: SortOrder
    atk2DamageType?: SortOrder
    atk3Type?: SortOrder
    atk3Mod?: SortOrder
    atk3Range?: SortOrder
    atk3RangeShort?: SortOrder
    atk3Dam?: SortOrder
    atk3DamageType?: SortOrder
    atk4Type?: SortOrder
    atk4Mod?: SortOrder
    atk4Range?: SortOrder
    atk4RangeShort?: SortOrder
    atk4Dam?: SortOrder
    atk4DamageType?: SortOrder
    saveDC?: SortOrder
    savingThrow?: SortOrder
    actionNotes?: SortOrder
    ability?: SortOrder
    spellSaveDC?: SortOrder
    spellSavingThrows?: SortOrder
    spellAttack?: SortOrder
    atWillSpells?: SortOrder
    threePerDaySpells?: SortOrder
    twoPerDaySpells?: SortOrder
    onePerDaySpells?: SortOrder
    bonusAction?: SortOrder
    reaction?: SortOrder
    amount?: SortOrder
    legendaryActionSaveDC?: SortOrder
    legendaryActionSavingThrow?: SortOrder
    legendaryActions?: SortOrder
    lair?: SortOrder
    xpLair?: SortOrder
    legendaryResistance?: SortOrder
    legendaryActionsLair?: SortOrder
    lairSaveDC?: SortOrder
    lairSavingThrows?: SortOrder
    other?: SortOrder
    align?: SortOrder
    speeds?: SortOrder
    strScore?: SortOrder
    dexScore?: SortOrder
    conScore?: SortOrder
    intScore?: SortOrder
    wisScore?: SortOrder
    chaScore?: SortOrder
    savThrows?: SortOrder
    skills?: SortOrder
    wri?: SortOrder
    senses?: SortOrder
    additional?: SortOrder
    font?: SortOrder
    additionalInfo?: SortOrder
    author?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RaceCountOrderByAggregateInput = {
    id?: SortOrder
    race?: SortOrder
    str?: SortOrder
    dex?: SortOrder
    con?: SortOrder
    int?: SortOrder
    wis?: SortOrder
    cha?: SortOrder
    special?: SortOrder
    source?: SortOrder
    notes?: SortOrder
  }

  export type RaceAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RaceMaxOrderByAggregateInput = {
    id?: SortOrder
    race?: SortOrder
    str?: SortOrder
    dex?: SortOrder
    con?: SortOrder
    int?: SortOrder
    wis?: SortOrder
    cha?: SortOrder
    special?: SortOrder
    source?: SortOrder
    notes?: SortOrder
  }

  export type RaceMinOrderByAggregateInput = {
    id?: SortOrder
    race?: SortOrder
    str?: SortOrder
    dex?: SortOrder
    con?: SortOrder
    int?: SortOrder
    wis?: SortOrder
    cha?: SortOrder
    special?: SortOrder
    source?: SortOrder
    notes?: SortOrder
  }

  export type RaceSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SpellCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    school?: SortOrder
    castingTime?: SortOrder
    duration?: SortOrder
    range?: SortOrder
    area?: SortOrder
    attack?: SortOrder
    save?: SortOrder
    damageEffect?: SortOrder
    ritual?: SortOrder
    concentration?: SortOrder
    verbal?: SortOrder
    somatic?: SortOrder
    material?: SortOrder
    materialDetails?: SortOrder
    source?: SortOrder
    details?: SortOrder
    link?: SortOrder
  }

  export type SpellAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SpellMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    school?: SortOrder
    castingTime?: SortOrder
    duration?: SortOrder
    range?: SortOrder
    area?: SortOrder
    attack?: SortOrder
    save?: SortOrder
    damageEffect?: SortOrder
    ritual?: SortOrder
    concentration?: SortOrder
    verbal?: SortOrder
    somatic?: SortOrder
    material?: SortOrder
    materialDetails?: SortOrder
    source?: SortOrder
    details?: SortOrder
    link?: SortOrder
  }

  export type SpellMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    school?: SortOrder
    castingTime?: SortOrder
    duration?: SortOrder
    range?: SortOrder
    area?: SortOrder
    attack?: SortOrder
    save?: SortOrder
    damageEffect?: SortOrder
    ritual?: SortOrder
    concentration?: SortOrder
    verbal?: SortOrder
    somatic?: SortOrder
    material?: SortOrder
    materialDetails?: SortOrder
    source?: SortOrder
    details?: SortOrder
    link?: SortOrder
  }

  export type SpellSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClassCountOrderByAggregateInput = {
    id?: SortOrder
    class?: SortOrder
    subclass?: SortOrder
    source?: SortOrder
    notes?: SortOrder
    features?: SortOrder
    level?: SortOrder
    description?: SortOrder
  }

  export type ClassAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClassMaxOrderByAggregateInput = {
    id?: SortOrder
    class?: SortOrder
    subclass?: SortOrder
    source?: SortOrder
    notes?: SortOrder
    features?: SortOrder
    level?: SortOrder
    description?: SortOrder
  }

  export type ClassMinOrderByAggregateInput = {
    id?: SortOrder
    class?: SortOrder
    subclass?: SortOrder
    source?: SortOrder
    notes?: SortOrder
    features?: SortOrder
    level?: SortOrder
    description?: SortOrder
  }

  export type ClassSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MagicItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rarity?: SortOrder
    attunement?: SortOrder
    costGp?: SortOrder
    note?: SortOrder
    armorCost?: SortOrder
    rareMaterial?: SortOrder
    acBonus?: SortOrder
    saveBonus?: SortOrder
    setScoreModifier?: SortOrder
    plusTwoBonusToScore?: SortOrder
    weaponBonus?: SortOrder
    spellLevel?: SortOrder
    unlimitedCharges?: SortOrder
    chargesPerDay?: SortOrder
    chargesPerItem?: SortOrder
    spellsShareCharges?: SortOrder
    condition?: SortOrder
    consumableDamageAvg?: SortOrder
    consumableSave?: SortOrder
    semiPermanentDamageAvg?: SortOrder
    semiPermSave?: SortOrder
    durationMinutes?: SortOrder
    permanentDamageAvg?: SortOrder
    permSave?: SortOrder
    specificSituations?: SortOrder
    restoreHpAvg?: SortOrder
    miscCosts?: SortOrder
    secondSpellLevel?: SortOrder
    secondUnlimitedCharges?: SortOrder
    secondChargesPerDay?: SortOrder
    thirdSpellLevel?: SortOrder
    thirdUnlimitedCharges?: SortOrder
    thirdChargesPerDay?: SortOrder
    matCost?: SortOrder
    acCost?: SortOrder
    saveCost?: SortOrder
    setScoreCost?: SortOrder
    bonusScoreCost?: SortOrder
    weaponCost?: SortOrder
    consumSpellCost?: SortOrder
    permChargesCost?: SortOrder
    chargesDestroyed?: SortOrder
    spellShareChargesCost?: SortOrder
    conditionCost?: SortOrder
    consDMGCost?: SortOrder
    smPrDMGCost?: SortOrder
    perDMGCost?: SortOrder
    avgHPCost?: SortOrder
    miscCost?: SortOrder
    secondConsumSpellCost?: SortOrder
    secondPermChargesCost?: SortOrder
    thirdConsumSpellCost?: SortOrder
    thirdPermChargesCost?: SortOrder
  }

  export type MagicItemAvgOrderByAggregateInput = {
    id?: SortOrder
    costGp?: SortOrder
    armorCost?: SortOrder
    acBonus?: SortOrder
    saveBonus?: SortOrder
    setScoreModifier?: SortOrder
    weaponBonus?: SortOrder
    spellLevel?: SortOrder
    chargesPerDay?: SortOrder
    chargesPerItem?: SortOrder
    spellsShareCharges?: SortOrder
    consumableDamageAvg?: SortOrder
    semiPermanentDamageAvg?: SortOrder
    durationMinutes?: SortOrder
    permanentDamageAvg?: SortOrder
    restoreHpAvg?: SortOrder
    miscCosts?: SortOrder
    secondSpellLevel?: SortOrder
    secondChargesPerDay?: SortOrder
    thirdSpellLevel?: SortOrder
    thirdChargesPerDay?: SortOrder
    matCost?: SortOrder
    acCost?: SortOrder
    saveCost?: SortOrder
    setScoreCost?: SortOrder
    bonusScoreCost?: SortOrder
    weaponCost?: SortOrder
    consumSpellCost?: SortOrder
    permChargesCost?: SortOrder
    chargesDestroyed?: SortOrder
    spellShareChargesCost?: SortOrder
    conditionCost?: SortOrder
    consDMGCost?: SortOrder
    smPrDMGCost?: SortOrder
    perDMGCost?: SortOrder
    avgHPCost?: SortOrder
    miscCost?: SortOrder
    secondConsumSpellCost?: SortOrder
    secondPermChargesCost?: SortOrder
    thirdConsumSpellCost?: SortOrder
    thirdPermChargesCost?: SortOrder
  }

  export type MagicItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rarity?: SortOrder
    attunement?: SortOrder
    costGp?: SortOrder
    note?: SortOrder
    armorCost?: SortOrder
    rareMaterial?: SortOrder
    acBonus?: SortOrder
    saveBonus?: SortOrder
    setScoreModifier?: SortOrder
    plusTwoBonusToScore?: SortOrder
    weaponBonus?: SortOrder
    spellLevel?: SortOrder
    unlimitedCharges?: SortOrder
    chargesPerDay?: SortOrder
    chargesPerItem?: SortOrder
    spellsShareCharges?: SortOrder
    condition?: SortOrder
    consumableDamageAvg?: SortOrder
    consumableSave?: SortOrder
    semiPermanentDamageAvg?: SortOrder
    semiPermSave?: SortOrder
    durationMinutes?: SortOrder
    permanentDamageAvg?: SortOrder
    permSave?: SortOrder
    specificSituations?: SortOrder
    restoreHpAvg?: SortOrder
    miscCosts?: SortOrder
    secondSpellLevel?: SortOrder
    secondUnlimitedCharges?: SortOrder
    secondChargesPerDay?: SortOrder
    thirdSpellLevel?: SortOrder
    thirdUnlimitedCharges?: SortOrder
    thirdChargesPerDay?: SortOrder
    matCost?: SortOrder
    acCost?: SortOrder
    saveCost?: SortOrder
    setScoreCost?: SortOrder
    bonusScoreCost?: SortOrder
    weaponCost?: SortOrder
    consumSpellCost?: SortOrder
    permChargesCost?: SortOrder
    chargesDestroyed?: SortOrder
    spellShareChargesCost?: SortOrder
    conditionCost?: SortOrder
    consDMGCost?: SortOrder
    smPrDMGCost?: SortOrder
    perDMGCost?: SortOrder
    avgHPCost?: SortOrder
    miscCost?: SortOrder
    secondConsumSpellCost?: SortOrder
    secondPermChargesCost?: SortOrder
    thirdConsumSpellCost?: SortOrder
    thirdPermChargesCost?: SortOrder
  }

  export type MagicItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rarity?: SortOrder
    attunement?: SortOrder
    costGp?: SortOrder
    note?: SortOrder
    armorCost?: SortOrder
    rareMaterial?: SortOrder
    acBonus?: SortOrder
    saveBonus?: SortOrder
    setScoreModifier?: SortOrder
    plusTwoBonusToScore?: SortOrder
    weaponBonus?: SortOrder
    spellLevel?: SortOrder
    unlimitedCharges?: SortOrder
    chargesPerDay?: SortOrder
    chargesPerItem?: SortOrder
    spellsShareCharges?: SortOrder
    condition?: SortOrder
    consumableDamageAvg?: SortOrder
    consumableSave?: SortOrder
    semiPermanentDamageAvg?: SortOrder
    semiPermSave?: SortOrder
    durationMinutes?: SortOrder
    permanentDamageAvg?: SortOrder
    permSave?: SortOrder
    specificSituations?: SortOrder
    restoreHpAvg?: SortOrder
    miscCosts?: SortOrder
    secondSpellLevel?: SortOrder
    secondUnlimitedCharges?: SortOrder
    secondChargesPerDay?: SortOrder
    thirdSpellLevel?: SortOrder
    thirdUnlimitedCharges?: SortOrder
    thirdChargesPerDay?: SortOrder
    matCost?: SortOrder
    acCost?: SortOrder
    saveCost?: SortOrder
    setScoreCost?: SortOrder
    bonusScoreCost?: SortOrder
    weaponCost?: SortOrder
    consumSpellCost?: SortOrder
    permChargesCost?: SortOrder
    chargesDestroyed?: SortOrder
    spellShareChargesCost?: SortOrder
    conditionCost?: SortOrder
    consDMGCost?: SortOrder
    smPrDMGCost?: SortOrder
    perDMGCost?: SortOrder
    avgHPCost?: SortOrder
    miscCost?: SortOrder
    secondConsumSpellCost?: SortOrder
    secondPermChargesCost?: SortOrder
    thirdConsumSpellCost?: SortOrder
    thirdPermChargesCost?: SortOrder
  }

  export type MagicItemSumOrderByAggregateInput = {
    id?: SortOrder
    costGp?: SortOrder
    armorCost?: SortOrder
    acBonus?: SortOrder
    saveBonus?: SortOrder
    setScoreModifier?: SortOrder
    weaponBonus?: SortOrder
    spellLevel?: SortOrder
    chargesPerDay?: SortOrder
    chargesPerItem?: SortOrder
    spellsShareCharges?: SortOrder
    consumableDamageAvg?: SortOrder
    semiPermanentDamageAvg?: SortOrder
    durationMinutes?: SortOrder
    permanentDamageAvg?: SortOrder
    restoreHpAvg?: SortOrder
    miscCosts?: SortOrder
    secondSpellLevel?: SortOrder
    secondChargesPerDay?: SortOrder
    thirdSpellLevel?: SortOrder
    thirdChargesPerDay?: SortOrder
    matCost?: SortOrder
    acCost?: SortOrder
    saveCost?: SortOrder
    setScoreCost?: SortOrder
    bonusScoreCost?: SortOrder
    weaponCost?: SortOrder
    consumSpellCost?: SortOrder
    permChargesCost?: SortOrder
    chargesDestroyed?: SortOrder
    spellShareChargesCost?: SortOrder
    conditionCost?: SortOrder
    consDMGCost?: SortOrder
    smPrDMGCost?: SortOrder
    perDMGCost?: SortOrder
    avgHPCost?: SortOrder
    miscCost?: SortOrder
    secondConsumSpellCost?: SortOrder
    secondPermChargesCost?: SortOrder
    thirdConsumSpellCost?: SortOrder
    thirdPermChargesCost?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type GeneralEquipmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cost?: SortOrder
    weightLbs?: SortOrder
  }

  export type GeneralEquipmentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GeneralEquipmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cost?: SortOrder
    weightLbs?: SortOrder
  }

  export type GeneralEquipmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cost?: SortOrder
    weightLbs?: SortOrder
  }

  export type GeneralEquipmentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}