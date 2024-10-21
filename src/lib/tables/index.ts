import Table from "$lib/tables/Table.svelte"
import {TextColumn} from "$lib/tables/text-column"
import {Column} from "$lib/tables/column"
import type {PaginatedResult, UnpaginatedResult} from "$lib/tables/utils";

export type {PaginatedResult, UnpaginatedResult}
export {Table, TextColumn, Column}