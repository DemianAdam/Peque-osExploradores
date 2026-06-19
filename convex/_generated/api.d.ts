/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as childrens_validators from "../childrens/validators.js";
import type * as common_validators from "../common/validators.js";
import type * as fees_validators from "../fees/validators.js";
import type * as group_teachers_validators from "../group_teachers/validators.js";
import type * as groups_validators from "../groups/validators.js";
import type * as http from "../http.js";
import type * as invoices_validators from "../invoices/validators.js";
import type * as payments_validators from "../payments/validators.js";
import type * as payslips_validators from "../payslips/validators.js";
import type * as teachers_functions from "../teachers/functions.js";
import type * as teachers_types from "../teachers/types.js";
import type * as teachers_validators from "../teachers/validators.js";
import type * as triggers from "../triggers.js";
import type * as users_functions from "../users/functions.js";
import type * as users_types from "../users/types.js";
import type * as users_validators from "../users/validators.js";
import type * as zod from "../zod.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "childrens/validators": typeof childrens_validators;
  "common/validators": typeof common_validators;
  "fees/validators": typeof fees_validators;
  "group_teachers/validators": typeof group_teachers_validators;
  "groups/validators": typeof groups_validators;
  http: typeof http;
  "invoices/validators": typeof invoices_validators;
  "payments/validators": typeof payments_validators;
  "payslips/validators": typeof payslips_validators;
  "teachers/functions": typeof teachers_functions;
  "teachers/types": typeof teachers_types;
  "teachers/validators": typeof teachers_validators;
  triggers: typeof triggers;
  "users/functions": typeof users_functions;
  "users/types": typeof users_types;
  "users/validators": typeof users_validators;
  zod: typeof zod;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
