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
import type * as teachers_validators from "../teachers/validators.js";
import type * as users_validators from "../users/validators.js";

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
  "teachers/validators": typeof teachers_validators;
  "users/validators": typeof users_validators;
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
