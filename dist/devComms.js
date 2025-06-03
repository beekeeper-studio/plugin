export const devModeReponses = {
    getConnectionInfo: {
        connectionType: "sqlite",
        readOnlyMode: false,
        databaseName: "db.sqlite",
        defaultSchema: "",
    },
    getTables: [{ name: "countries" }, { name: "users" }],
    getColumns: [
        {
            name: "id",
            type: "integer",
        },
    ],
    getAllTabs: [],
    runQuery: {
        results: [
            {
                fields: [{ id: "id", name: "id", dataType: "integer" }],
                rows: [],
            },
        ],
    },
    expandTableResult: undefined,
    setTabTitle: undefined,
};
export async function requestDevMode(name, args) {
    if (name === "setTabTitle") {
        document.title = args?.title || "Plugin";
        return devModeReponses["setTabTitle"];
    }
    return devModeReponses[name];
}
