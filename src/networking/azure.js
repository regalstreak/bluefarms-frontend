// potato

export function fetchPotato(date, market) {

    var potatoHeaders = new Headers();
    potatoHeaders.append("Content-Type", "application/json");
    potatoHeaders.append("Authorization", "Bearer GoupXkPQUMt30oSeOCXOuCekMO3GeaH580sBPFvHuM2zHoSr4qE1SiAbnUXkbXUqxd6qZgcS8L0kOw+nN/L3JA==");

    var raw = "{\n    \"Inputs\": {\n        \"input1\": {\n            \"ColumnNames\": [\n                \"Arrival Date\",\n                \"Market\"\n            ],\n            \"Values\": [\n                [\n                    \"24/12/2019\",\n                    \"Murbad\"\n                ]\n            ]\n        }\n    },\n    \"GlobalParameters\": {}\n}";

    let potatoBody = {
        "Inputs": {
            "input1": {
                "ColumnNames": [
                    "Arrival Date",
                    "Market"
                ],
                "Values": [
                    [
                        "24/12/2019",
                        "Murbad"
                    ]
                ]
            }
        },
        "GlobalParameters": {}
    }

    var requestOptions = {
        method: 'POST',
        headers: potatoHeaders,
        body: potatoBody,
        redirect: 'follow'
    };

    fetch('https://ussouthcentral.services.azureml.net/workspaces/3be0c54730e74cf99286d2daca27b5a7/services/d00b14b521124f6ab2175e8f12ae8190/execute?api-version=2.0&details=true', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}