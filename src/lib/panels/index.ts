import ListRecords from "$lib/panels/ListRecords.svelte";
import CreateRecord from "$lib/panels/CreateRecord.svelte";
import EditRecord from "$lib/panels/EditRecord.svelte";
import ViewRecord from "$lib/panels/ViewRecord.svelte";
import ListRelation from "$lib/panels/ListRelation.svelte";
import Page from "$lib/panels/Page.svelte";
import Panel from "$lib/panels/Panel.svelte";
import type {NavigationItem} from "$lib/panels/navigation";
import type {FormData} from "$lib/panels/forms";
import {UserProvider, type User} from "$lib/panels/auth";

export type {NavigationItem, FormData}
export {ListRecords, CreateRecord, EditRecord, ViewRecord, ListRelation, Page, Panel, UserProvider, type User}
