import Haru, {
  HaruMethod,
  HaruObject,
  HaruPbkdf2Params,
  HaruScryptParams,
} from "./haru/index.js";
import HaruPbkdf2 from "./haru/pbkdf2.js";
import HaruScrypt from "./haru/scrypt.js";

export function fromObject(obj: unknown): Haru {
  const { m } = obj as { m: HaruMethod };

  switch (m) {
    case HaruMethod.Pbkdf2:
      return HaruPbkdf2.fromObject(obj as HaruObject<HaruPbkdf2Params>);
    case HaruMethod.Scrypt:
      return HaruScrypt.fromObject(obj as HaruObject<HaruScryptParams>);
    default:
      throw new Error(`Unknown m: ${m}`);
  }
}

export function fromJSON(json: string): Haru {
  return fromObject(JSON.parse(json));
}

export async function fromPassword(
  password: string,
  method = HaruMethod.Scrypt,
  salt?: Buffer
): Promise<Haru> {
  switch (method) {
    case HaruMethod.Pbkdf2:
      return HaruPbkdf2.fromPassword(password, salt);
    case HaruMethod.Scrypt:
      return HaruScrypt.fromPassword(password, salt);
    default:
      throw new Error(`Unknown method: ${method}`);
  }
}

export async function test(
  value: string | unknown,
  password: string
): Promise<boolean> {
  const haru = typeof value === "string" ? fromJSON(value) : fromObject(value);

  return haru.test(password);
}

export function haru10to20(haru10Object: {
  h: string;
  s: string;
  c: number;
}): HaruObject<HaruPbkdf2Params> {
  const { h, s, c } = haru10Object;

  const iterations = Math.floor(c * 10000);

  return {
    v: "HARU20",
    h,
    s,
    m: HaruMethod.Pbkdf2,
    p: [iterations],
  };
}

export {
  default as Haru,
  HaruConstructorOpts,
  HaruMethod,
  HaruObject,
  HaruPbkdf2Params,
  HaruScryptParams,
} from "./haru/index.js";
