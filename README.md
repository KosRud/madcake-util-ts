# MadCakeUtil-ts

An assortment of convenient typescript utilities.

# Building

Use [tsup](https://tsup.egoist.dev/) for building.

At the time of writing, [rolldown]("https://rolldown.rs/") omits typescript's `declare global` from
output `.d.ts` files. This problem does not arise with [tsup]("https://tsup.egoist.dev/") or
[tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html).