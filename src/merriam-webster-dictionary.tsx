import { ActionPanel, Action, List, Detail, getPreferenceValues } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState } from "react";

const MW_DICT_API = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"

const { MW_DICT_API_KEY } = getPreferenceValues()
console.log(MW_DICT_API_KEY)

function Pong({ word }: { word: string }) {
    const url = `${MW_DICT_API}${word}?key=${MW_DICT_API_KEY}`
    const { isLoading, data } = useFetch(url, { method: "GET" })
    console.log(data)

    return <Detail isLoading={isLoading} markdown={JSON.stringify(data)} />;
}

export default function Command() {

    const [searchText, setSearchText] = useState("");
    return (
        <List
            searchText={searchText}
            onSearchTextChange={setSearchText}
            navigationTitle="Search Word"
            searchBarPlaceholder="Search word..."
            actions={
                <ActionPanel>
                    <Action.Push title="Word" target={<Pong word={searchText} />} />
                </ActionPanel>
            }
        >
        </List>
    );
}